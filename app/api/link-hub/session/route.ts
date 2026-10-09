import { NextResponse } from "next/server";
import { hasHubSession, hubAuthEnabled, sameOrigin, startHubSession, stopHubSession, verifyPassword } from "@/lib/link-hub-auth";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Best-effort per-instance guard. Production-grade distributed rate limiting is a later hardening task.
const attempts = new Map<string, { count: number; reset: number }>();
export async function GET() {
  return NextResponse.json({ authenticated: await hasHubSession(), configured: hubAuthEnabled() }, { headers: { "Cache-Control": "no-store" } });
}
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  if (!hubAuthEnabled()) return NextResponse.json({ error: "Admin authentication has not been configured" }, { status: 503 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const attempt = attempts.get(ip) || { count: 0, reset: now + 15 * 60 * 1000 };
  if (now > attempt.reset) { attempt.count = 0; attempt.reset = now + 15 * 60 * 1000; }
  if (attempt.count >= 8) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429, headers: { "Retry-After": String(Math.ceil((attempt.reset - now) / 1000)) } });
  let password = "";
  try { password = (await req.json()).password; } catch { /* invalid request */ }
  if (typeof password !== "string" || !verifyPassword(password)) {
    attempt.count++; attempts.set(ip, attempt);
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }
  attempts.delete(ip);
  await startHubSession();
  return NextResponse.json({ authenticated: true }, { headers: { "Cache-Control": "no-store" } });
}
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  await stopHubSession();
  return NextResponse.json({ authenticated: false });
}
