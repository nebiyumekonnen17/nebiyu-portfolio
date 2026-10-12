import { NextResponse } from "next/server";
import { hasHubSession, hubAuthEnabled, sameOrigin, startHubSession, stopHubSession, verifyPassword } from "@/lib/link-hub-auth";
import { checkLoginLimit, noteLoginFailure } from "@/lib/link-hub-attempts";
import { consumeTwoFactorCode, twoFactorEnabled } from "@/lib/link-hub-mfa";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store" };

export async function GET() {
  try {
    const configured = hubAuthEnabled();
    const twoFactor = configured ? await twoFactorEnabled() : false;
    const authenticated = configured ? await hasHubSession() : false;
    return NextResponse.json({ authenticated, configured, twoFactorEnabled: twoFactor }, { headers });
  } catch {
    return NextResponse.json({ error: "Sign-in security storage temporarily unavailable." }, { status: 503, headers });
  }
}
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Invalid origin" }, { status: 403, headers });
  if (!hubAuthEnabled()) return NextResponse.json({ error: "Admin sign-in is not configured." }, { status: 503, headers });
  if (Number(req.headers.get("content-length") || 0) > 2000) {
    return NextResponse.json({ error: "Request too large." }, { status: 413, headers });
  }
  try {
    const retry = await checkLoginLimit(req);
    if (retry) return NextResponse.json({ error: "Too many sign-in attempts. Try again later." }, { status: 429, headers: { ...headers, "Retry-After": String(retry) } });
    const body = await req.json().catch(() => null);
    const password = body?.password;
    const totp = body?.code;
    // Both factors must be accepted before issuing a session.
    const passwordValid = typeof password === "string" && verifyPassword(password);
    const mfaEnabled = await twoFactorEnabled();
    const valid = passwordValid && (!mfaEnabled || await consumeTwoFactorCode(totp));
    if (!valid) {
      const delay = await noteLoginFailure(req);
      return NextResponse.json({ error: "Invalid sign-in credentials." }, {
        status: delay ? 429 : 401,
        headers: delay ? { ...headers, "Retry-After": String(delay) } : headers,
      });
    }
    await startHubSession(mfaEnabled);
    return NextResponse.json({ authenticated: true }, { headers });
  } catch {
    return NextResponse.json({ error: "Sign-in protection temporarily unavailable. Try again later." }, { status: 503, headers });
  }
}
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Invalid origin" }, { status: 403, headers });
  await stopHubSession();
  return NextResponse.json({ authenticated: false }, { headers });
}
