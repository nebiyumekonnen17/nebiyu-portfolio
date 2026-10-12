import "server-only";
import { createHmac } from "node:crypto";
import { BlobNotFoundError, get, head, put } from "@vercel/blob";
import { hubStorageEnabled } from "@/lib/link-hub-store";

const maximum = 8;
const windowMs = 15 * 60 * 1000;
type Attempt = { count: number; resetAt: number };

function pathFor(request: Request) {
  // Use platform-reported addresses where provided; never write a raw address to storage.
  const address = (request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim().slice(0, 100);
  const key = process.env.LINK_HUB_SESSION_SECRET || "";
  const digest = createHmac("sha256", key).update(address).digest("hex").slice(0, 32);
  return "link-hub/security/login-attempts/" + digest + ".json";
}
async function safeHead(path: string) {
  try { return await head(path); }
  catch (error) { if (error instanceof BlobNotFoundError) return null; throw error; }
}
async function read(path: string) {
  const entry = await get(path, { access: "private", useCache: false });
  if (!entry) return null;
  if (entry.statusCode !== 200 || !entry.stream) throw new Error("Sign-in protection unavailable.");
  return JSON.parse(await new Response(entry.stream).text()) as Attempt;
}
function ensureStorage() {
  if (!hubStorageEnabled()) throw new Error("Sign-in protection requires private storage.");
}
export async function checkLoginLimit(request: Request) {
  ensureStorage();
  const result = await read(pathFor(request));
  if (!result || result.resetAt <= Date.now() || result.count < maximum) return 0;
  return Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000));
}
export async function noteLoginFailure(request: Request) {
  ensureStorage();
  const path = pathFor(request);
  for (let i = 0; i < 5; i++) {
    const before = await safeHead(path);
    const old = await read(path);
    const meta = await safeHead(path);
    if (before?.etag !== meta?.etag) continue;
    const now = Date.now();
    const recent = old && old.resetAt > now ? old : { count: 0, resetAt: now + windowMs };
    const next: Attempt = { count: recent.count + 1, resetAt: recent.resetAt };
    try {
      await put(path, JSON.stringify(next), {
        access: "private", contentType: "application/json", allowOverwrite: Boolean(meta),
        ...(meta?.etag ? { ifMatch: meta.etag } : {}),
      });
      return Math.max(0, next.count >= maximum ? Math.ceil((next.resetAt - now) / 1000) : 0);
    } catch {
      // Retry if two servers try updating the counter at the same time.
      if (i === 4) throw new Error("Sign-in protection could not be updated.");
    }
  }
  throw new Error("Sign-in protection could not be updated.");
}
