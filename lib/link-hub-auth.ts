import "server-only";
import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { twoFactorEnabled } from "@/lib/link-hub-mfa";

const cookieName = "__Host-nebiyu_studio";
const maxAge = 4 * 60 * 60;
const key = () => process.env.LINK_HUB_SESSION_SECRET || "";
export const hubAuthEnabled = () => Boolean(process.env.LINK_HUB_ADMIN_PASSWORD_HASH && key().length >= 32);
const sig = (value: string) => createHmac("sha256", key()).update(value).digest("hex");
export function verifyPassword(password: string) {
  const hash = process.env.LINK_HUB_ADMIN_PASSWORD_HASH;
  if (!hubAuthEnabled() || !hash || typeof password !== "string" || password.length > 256) return false;
  const [salt, expected] = hash.split(":");
  if (!salt || !expected || !/^[a-f0-9]{128}$/.test(expected)) return false;
  const calculated = scryptSync(password, salt, 64);
  return timingSafeEqual(calculated, Buffer.from(expected, "hex"));
}
export async function hasHubSession() {
  if (!hubAuthEnabled()) return false;
  const token = (await cookies()).get(cookieName)?.value || "";
  const [version, level, expires, signature] = token.split(".");
  if (version !== "v2" || (level !== "0" && level !== "1") || !expires || !signature || !/^\d+$/.test(expires)) return false;
  const now = Date.now();
  if (Number(expires) <= now || Number(expires) > now + maxAge * 1000) return false;
  const expected = sig([version, level, expires].join("."));
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  // Enabling MFA instantly invalidates every older password-only session.
  return level === (await twoFactorEnabled() ? "1" : "0");
}
export async function startHubSession(mfaVerified: boolean) {
  const expires = String(Date.now() + maxAge * 1000);
  const payload = "v2." + (mfaVerified ? "1" : "0") + "." + expires;
  (await cookies()).set(cookieName, payload + "." + sig(payload), {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "strict", maxAge, path: "/",
  });
}
export async function stopHubSession() {
  (await cookies()).delete(cookieName);
}
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const url = new URL(req.url);
    const incoming = new URL(origin);
    return incoming.protocol === url.protocol && incoming.host === url.host;
  } catch { return false; }
}
