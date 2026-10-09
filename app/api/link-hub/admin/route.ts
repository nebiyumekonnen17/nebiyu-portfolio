import { NextResponse } from "next/server";
import { hasHubSession, sameOrigin } from "@/lib/link-hub-auth";
import { hubStorageEnabled, listHubHistory, publishHub, readHub, restoreHub, writeHub } from "@/lib/link-hub-store";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store" };
export async function GET() {
  if (!(await hasHubSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers });
  try {
    const [draft, live, history] = await Promise.all([readHub("draft"), readHub("live"), listHubHistory()]);
    return NextResponse.json({ draft, live, history, storageReady: hubStorageEnabled() }, { headers });
  } catch {
    return NextResponse.json({ error: "Content storage could not be loaded" }, { status: 503, headers });
  }
}
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Invalid origin" }, { status: 403, headers });
  if (!(await hasHubSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers });
  try {
    if (Number(req.headers.get("content-length") || 0) > 150000) return NextResponse.json({ error: "Payload too large" }, { status: 413, headers });
    const data = await req.json();
    const kind = data.action;
    if (kind === "save") return NextResponse.json({ content: await writeHub("draft", data.content) }, { headers });
    if (kind === "publish") return NextResponse.json({ content: await publishHub() }, { headers });
    if (kind === "restore") return NextResponse.json({ content: await restoreHub(String(data.path || "")) }, { headers });
    return NextResponse.json({ error: "Unsupported action" }, { status: 400, headers });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to save" }, { status: 400, headers });
  }
}
