import "server-only";
import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
const cookieName = "nebiyu_hub_admin";
const maxAge = 8 * 60 * 60;
const key = () => process.env.LINK_HUB_SESSION_SECRET || "";
export const hubAuthEnabled = () => Boolean(process.env.LINK_HUB_ADMIN_PASSWORD_HASH && key().length >= 32);
const sig = (value: string) => createHmac("sha256", key()).update(value).digest("hex");
export function verifyPassword(password: string) {
  const hash = process.env.LINK_HUB_ADMIN_PASSWORD_HASH;
  if (!hubAuthEnabled() || !hash || password.length > 256) return false;
  const [salt, expected] = hash.split(":");
  if (!salt || !expected || !/^[a-f0-9]{128}$/.test(expected)) return false;
  const calculated = scryptSync(password, salt, 64);
  return timingSafeEqual(calculated, Buffer.from(expected, "hex"));
}
export async function hasHubSession() {
  if (!hubAuthEnabled()) return false;
  const token = (await cookies()).get(cookieName)?.value || "";
  const [expires, signature] = token.split(".");
  if (!expires || !signature || !/^\d+$/.test(expires)) return false;
  if (Number(expires) < Date.now() || Number(expires) > Date.now() + maxAge * 1000) return false;
  const expected = sig(expires);
  return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
export async function startHubSession() {
  const expires = String(Date.now() + maxAge * 1000);
  (await cookies()).set(cookieName, expires + "." + sig(expires), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge, path: "/" });
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
