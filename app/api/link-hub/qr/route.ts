import { NextResponse } from "next/server";
import { hasHubSession, sameOrigin } from "@/lib/link-hub-auth";
import { hubStorageEnabled } from "@/lib/link-hub-store";
import { listManagedQR, listQRHistory, saveManagedQR } from "@/lib/qr-manager";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store" };

export async function GET(request: Request) {
  if (!(await hasHubSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers });
  if (!hubStorageEnabled()) return NextResponse.json({ error: "Connect your private Vercel Blob storage first." }, { status: 503, headers });
  try {
    const slug = new URL(request.url).searchParams.get("history");
    return NextResponse.json(slug ? { history: await listQRHistory(slug) } : { items: await listManagedQR() }, { headers });
  } catch {
    return NextResponse.json({ error: "Could not read QR records." }, { status: 503, headers });
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403, headers });
  if (!(await hasHubSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers });
  if (!hubStorageEnabled()) return NextResponse.json({ error: "Connect your private Vercel Blob storage first." }, { status: 503, headers });
  if (Number(request.headers.get("content-length") || 0) > 5000) {
    return NextResponse.json({ error: "Request too large" }, { status: 413, headers });
  }
  try {
    const data = await request.json();
    if (data.action !== "create" && data.action !== "update") {
      return NextResponse.json({ error: "Unsupported action" }, { status: 400, headers });
    }
    const item = await saveManagedQR(data);
    return NextResponse.json({ item }, { headers, status: data.action === "create" ? 201 : 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save QR code";
    const conflict = /already exists|precondition/i.test(message);
    return NextResponse.json({ error: message }, { status: conflict ? 409 : 400, headers });
  }
}
