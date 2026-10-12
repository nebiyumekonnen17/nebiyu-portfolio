import "server-only";
import { createCipheriv, createDecipheriv, createHmac, createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { del, get, head, put } from "@vercel/blob";
import { hubStorageEnabled } from "@/lib/link-hub-store";

const activePath = "link-hub/security/totp-enabled.json";
const pendingPath = "link-hub/security/totp-pending.json";
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
type Encrypted = { iv: string; tag: string; ciphertext: string };
type Active = { encrypted: Encrypted; lastStep: number; enabledAt: string };
type Pending = { encrypted: Encrypted; expiresAt: number };
const signingKey = () => process.env.LINK_HUB_SESSION_SECRET || "";
function ensureStore() {
  if (!hubStorageEnabled() || signingKey().length < 32) throw new Error("Secure private storage is required for admin access.");
}
function encryptionKey() {
  return createHash("sha256").update("nebiyu-link-hub-totp-v1\0" + signingKey()).digest();
}
function encrypt(value: string): Encrypted {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return { iv: iv.toString("base64"), tag: cipher.getAuthTag().toString("base64"), ciphertext: ciphertext.toString("base64") };
}
function decrypt(value: Encrypted) {
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(value.iv, "base64"));
  decipher.setAuthTag(Buffer.from(value.tag, "base64"));
  return Buffer.concat([decipher.update(Buffer.from(value.ciphertext, "base64")), decipher.final()]).toString("utf8");
}
async function readPrivate<T>(path: string): Promise<T | null> {
  ensureStore();
  const response = await get(path, { access: "private", useCache: false });
  if (!response) return null;
  if (response.statusCode !== 200 || !response.stream) throw new Error("Could not read private authentication storage.");
  return JSON.parse(await new Response(response.stream).text()) as T;
}
function base32(data: Buffer) {
  let bits = 0, value = 0, output = "";
  for (const byte of data) {
    value = (value << 8) | byte; bits += 8;
    while (bits >= 5) { output += alphabet[(value >>> (bits -= 5)) & 31]; }
  }
  if (bits > 0) output += alphabet[(value << (5 - bits)) & 31];
  return output;
}
function decodeBase32(data: string) {
  let bits = 0, value = 0;
  const result: number[] = [];
  for (const char of data.toUpperCase().replace(/=+$/, "")) {
    const digit = alphabet.indexOf(char);
    if (digit < 0) throw new Error("Invalid authenticator secret");
    value = (value << 5) | digit; bits += 5;
    if (bits >= 8) { result.push((value >>> (bits -= 8)) & 255); }
  }
  return Buffer.from(result);
}
function codeFor(secret: string, step: number) {
  const message = Buffer.alloc(8);
  message.writeBigUInt64BE(BigInt(step));
  const digest = createHmac("sha1", decodeBase32(secret)).update(message).digest();
  const offset = digest[digest.length - 1] & 15;
  const code = (digest.readUInt32BE(offset) & 0x7fffffff) % 1000000;
  return String(code).padStart(6, "0");
}
function matchedStep(secret: string, input: unknown, lastStep: number) {
  if (typeof input !== "string" || !/^[0-9]{6}$/.test(input)) return null;
  const current = Math.floor(Date.now() / 30000);
  for (const step of [current - 1, current, current + 1]) {
    if (step <= lastStep) continue;
    if (timingSafeEqual(Buffer.from(codeFor(secret, step)), Buffer.from(input))) return step;
  }
  return null;
}

export async function twoFactorEnabled() {
  ensureStore();
  return Boolean(await head(activePath));
}
export async function twoFactorStatus() {
  const record = await readPrivate<Active>(activePath);
  return { enabled: Boolean(record), enabledAt: record?.enabledAt || null };
}
export async function beginTwoFactorEnrollment() {
  if (await twoFactorEnabled()) throw new Error("Two-factor authentication is already enabled.");
  const secret = base32(randomBytes(20));
  const expiresAt = Date.now() + 10 * 60 * 1000;
  const payload: Pending = { encrypted: encrypt(secret), expiresAt };
  await put(pendingPath, JSON.stringify(payload), { access: "private", contentType: "application/json", allowOverwrite: true });
  const label = encodeURIComponent("Nebiyu Links Studio");
  const uri = "otpauth://totp/" + label + "?secret=" + secret + "&issuer=" + encodeURIComponent("Nebiyu Links") + "&algorithm=SHA1&digits=6&period=30";
  return { secret, uri, expiresAt };
}
export async function confirmTwoFactorEnrollment(code: unknown) {
  if (await twoFactorEnabled()) throw new Error("Two-factor authentication is already enabled.");
  const pending = await readPrivate<Pending>(pendingPath);
  if (!pending || pending.expiresAt < Date.now()) throw new Error("Setup expired. Start again.");
  const secret = decrypt(pending.encrypted);
  const step = matchedStep(secret, code, -1);
  if (step === null) throw new Error("Incorrect verification code.");
  const active: Active = { encrypted: pending.encrypted, lastStep: step, enabledAt: new Date().toISOString() };
  await put(activePath, JSON.stringify(active), { access: "private", contentType: "application/json", allowOverwrite: false });
  await del(pendingPath).catch(() => {});
  return active.enabledAt;
}
export async function consumeTwoFactorCode(code: unknown) {
  const record = await readPrivate<Active>(activePath);
  if (!record) return true;
  const step = matchedStep(decrypt(record.encrypted), code, record.lastStep);
  if (step === null) return false;
  const info = await head(activePath);
  if (!info?.etag) throw new Error("Verification storage temporarily unavailable.");
  try {
    await put(activePath, JSON.stringify({ ...record, lastStep: step }), {
      access: "private", contentType: "application/json", allowOverwrite: true, ifMatch: info.etag,
    });
    return true;
  } catch {
    // A concurrent request may already have used this one-time code.
    return false;
  }
}
export async function disableTwoFactor(code: unknown) {
  if (!(await consumeTwoFactorCode(code))) throw new Error("Incorrect or previously used authentication code.");
  if (!(await twoFactorEnabled())) throw new Error("Two-factor authentication is not enabled.");
  await del(activePath);
  await del(pendingPath).catch(() => {});
}
