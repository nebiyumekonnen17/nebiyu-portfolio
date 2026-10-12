import "server-only";
import { get, head, list, put } from "@vercel/blob";
import { hubStorageEnabled } from "@/lib/link-hub-store";

export type ManagedQR = {
  slug: string;
  title: string;
  target: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

const prefix = "link-hub/qr/records/";
const historyPrefix = "link-hub/qr/history/";
const pathnameFor = (slug: string) => prefix + slug + ".json";
const slugPattern = /^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/;

function assertStorage() {
  if (!hubStorageEnabled()) throw new Error("Private Link Hub storage is not enabled.");
}
function normalizedSlug(value: unknown) {
  const slug = String(value || "").trim().toLowerCase();
  if (!slugPattern.test(slug) || slug.includes("--")) {
    throw new Error("Slug must be 1–48 lowercase letters, numbers, or single hyphens.");
  }
  return slug;
}
function validateTitle(value: unknown) {
  const title = String(value || "").trim();
  if (!title || title.length > 90) throw new Error("A name of 1–90 characters is required.");
  return title;
}
function validateTarget(value: unknown) {
  const raw = String(value || "").trim();
  if (!raw || raw.length > 2048) throw new Error("Enter a destination URL shorter than 2,048 characters.");
  let url: URL;
  try { url = new URL(raw); } catch { throw new Error("Enter a full HTTPS URL."); }
  if (url.protocol !== "https:" || !url.hostname || url.username || url.password) {
    throw new Error("Destinations must be public HTTPS URLs without embedded credentials.");
  }
  if (url.hostname === "localhost" || url.hostname.endsWith(".localhost") ||
      url.hostname === "127.0.0.1" || url.hostname === "::1") {
    throw new Error("Local development addresses cannot be QR destinations.");
  }
  if (url.hostname === "links.nebiyumekonnen.com" && url.pathname.startsWith("/q/")) {
    throw new Error("A QR redirect cannot point to another managed QR redirect.");
  }
  return url.toString();
}

async function parseBlob(path: string): Promise<ManagedQR | null> {
  const response = await get(path, { access: "private", useCache: false });
  if (!response) return null;
  if (response.statusCode !== 200 || !response.stream) throw new Error("QR storage could not be read.");
  return JSON.parse(await new Response(response.stream).text()) as ManagedQR;
}

export async function readManagedQR(value: string): Promise<ManagedQR | null> {
  if (!slugPattern.test(value)) return null;
  assertStorage();
  return parseBlob(pathnameFor(value));
}

export async function listManagedQR(): Promise<ManagedQR[]> {
  assertStorage();
  const paths: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, limit: 1000, cursor });
    paths.push(...page.blobs.map(item => item.pathname));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  const records: ManagedQR[] = [];
  // A small concurrency cap avoids overloading private storage as the catalog grows.
  for (let i = 0; i < paths.length; i += 10) {
    const found = await Promise.all(paths.slice(i, i + 10).map(parseBlob));
    records.push(...found.filter((item): item is ManagedQR => item !== null));
  }
  return records.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function saveManagedQR(data: {
  action: "create" | "update";
  slug: unknown;
  title: unknown;
  target: unknown;
  enabled: unknown;
}): Promise<ManagedQR> {
  assertStorage();
  const slug = normalizedSlug(data.slug);
  const title = validateTitle(data.title);
  const target = validateTarget(data.target);
  if (typeof data.enabled !== "boolean") throw new Error("Invalid active status.");
  const path = pathnameFor(slug);
  const old = await parseBlob(path);
  if (data.action === "create" && old) throw new Error("This permanent QR slug already exists.");
  if (data.action === "update" && !old) throw new Error("QR code not found.");
  const now = new Date().toISOString();
  const next: ManagedQR = {
    slug, title, target, enabled: data.enabled,
    createdAt: old?.createdAt || now, updatedAt: now,
  };

  // Conditional writes prevent an older admin session from silently replacing newer edits.
  const prior = old ? await head(path) : null;
  await put(path, JSON.stringify(next), {
    access: "private", contentType: "application/json",
    allowOverwrite: Boolean(old),
    ...(prior?.etag ? { ifMatch: prior.etag } : {}),
  });
  if (old) {
    // Keep previous destinations for audit/recovery without changing the permanent slug.
    await put(historyPrefix + slug + "/" + Date.now() + "-" + crypto.randomUUID() + ".json", JSON.stringify(old), {
      access: "private", contentType: "application/json",
    });
  }
  return next;
}

export async function listQRHistory(value: string): Promise<ManagedQR[]> {
  assertStorage();
  const slug = normalizedSlug(value);
  const paths: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: historyPrefix + slug + "/", limit: 100, cursor });
    paths.push(...page.blobs.map(item => item.pathname));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  const records = (await Promise.all(paths.slice(-100).map(parseBlob))).filter((x): x is ManagedQR => !!x);
  return records.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 30);
}
