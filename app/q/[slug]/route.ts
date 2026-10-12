import { NextResponse, after } from "next/server";
import { readManagedQR } from "@/lib/qr-manager";
import { trackQRScan } from "@/lib/qr-scan-analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = {
  "Cache-Control": "private, no-store, max-age=0",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
  "Referrer-Policy": "no-referrer",
};

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  try {
    const item = await readManagedQR(slug);
    if (!item) return new Response("QR code not found.", { status: 404, headers });
    if (!item.enabled) return new Response("This QR code is currently paused.", { status: 410, headers });
    const version = new URL(request.url).searchParams.get("v");
    // Keep redirection fast. Tracking is best-effort and must never block visitors.
    if (process.env.QR_SCAN_TRACKING_ENABLED !== "false") {
      after(async () => { try { await trackQRScan(slug, version); } catch { /* ignore tracking failure */ } });
    }
    return NextResponse.redirect(item.target, { status: 302, headers });
  } catch {
    return new Response("QR redirection is temporarily unavailable.", { status: 503, headers });
  }
}
