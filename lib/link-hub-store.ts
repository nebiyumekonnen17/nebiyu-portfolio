import "server-only";
import { get, put, list } from "@vercel/blob";
import { initialHub, type HubContent, validateHub } from "@/lib/link-hub";
const pathFor = (kind: "draft" | "live") => "link-hub/content/" + kind + ".json";
export const hubStorageEnabled = () => process.env.LINK_HUB_STORAGE_ENABLED === "true";
export async function readHub(kind: "draft" | "live"): Promise<HubContent> {
  if (!hubStorageEnabled()) return initialHub;
  const result = await get(pathFor(kind), { access: "private", useCache: false });
  if (!result || result.statusCode === 404) return initialHub;
  if (result.statusCode !== 200 || !result.stream) throw new Error("Unable to load stored hub");
  return validateHub(JSON.parse(await new Response(result.stream).text()));
}
export async function writeHub(kind: "draft" | "live", content: HubContent): Promise<HubContent> {
  if (!hubStorageEnabled()) throw new Error("Storage is not connected. Add a private Vercel Blob store and set LINK_HUB_STORAGE_ENABLED=true.");
  const valid = validateHub(content);
  await put(pathFor(kind), JSON.stringify(valid), { access: "private", allowOverwrite: true, contentType: "application/json" });
  return valid;
}
export async function publishHub(): Promise<HubContent> {
  if (!hubStorageEnabled()) throw new Error("Storage is not connected");
  const draft = await readHub("draft");
  const existing = await readHub("live");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  await put("link-hub/history/" + timestamp + ".json", JSON.stringify(existing), { access: "private", contentType: "application/json" });
  return writeHub("live", draft);
}
export async function listHubHistory() {
  if (!hubStorageEnabled()) return [];
  const items = await list({ prefix: "link-hub/history/", limit: 20 });
  return items.blobs.map((x) => x.pathname).sort().reverse();
}
export async function restoreHub(pathname: string) {
  if (!/^link-hub\/history\/[0-9TZ-]+\.json$/.test(pathname)) throw new Error("Invalid revision");
  const result = await get(pathname, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200 || !result.stream) throw new Error("Revision not found");
  return writeHub("draft", JSON.parse(await new Response(result.stream).text()));
}
