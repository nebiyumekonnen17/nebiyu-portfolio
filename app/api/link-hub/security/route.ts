import { NextResponse } from "next/server";
import { hasHubSession, sameOrigin, stopHubSession, verifyPassword } from "@/lib/link-hub-auth";
import {
  beginTwoFactorEnrollment, confirmTwoFactorEnrollment,
  disableTwoFactor, twoFactorStatus,
} from "@/lib/link-hub-mfa";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store", "Pragma": "no-cache" };

export async function GET() {
  try {
    if (!(await hasHubSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers });
    return NextResponse.json({ ...(await twoFactorStatus()), sessionHours: 4, loginLimit: "8 failed attempts / 15 minutes" }, { headers });
  } catch {
    return NextResponse.json({ error: "Security settings temporarily unavailable." }, { status: 503, headers });
  }
}
export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403, headers });
  if (Number(request.headers.get("content-length") || 0) > 2000) {
    return NextResponse.json({ error: "Request too large." }, { status: 413, headers });
  }
  try {
    if (!(await hasHubSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers });
    const data = await request.json().catch(() => null);
    if (!data || typeof data.password !== "string" || !verifyPassword(data.password)) {
      return NextResponse.json({ error: "Current administrator password is required." }, { status: 401, headers });
    }
    if (data.action === "begin") {
      return NextResponse.json({ setup: await beginTwoFactorEnrollment() }, { headers });
    }
    if (data.action === "confirm") {
      await confirmTwoFactorEnrollment(data.code);
      await stopHubSession(); // Require a fresh login with both factors.
      return NextResponse.json({ enabled: true, signedOut: true }, { headers });
    }
    if (data.action === "disable") {
      await disableTwoFactor(data.code);
      await stopHubSession();
      return NextResponse.json({ enabled: false, signedOut: true }, { headers });
    }
    return NextResponse.json({ error: "Unknown security action." }, { status: 400, headers });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Security request failed.";
    if (/expired|code|already enabled|not enabled/i.test(msg)) {
      return NextResponse.json({ error: msg }, { status: 400, headers });
    }
    return NextResponse.json({ error: "Security storage temporarily unavailable." }, { status: 503, headers });
  }
}
