import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { hasHubSession, sameOrigin } from "@/lib/link-hub-auth";
import { hubStorageEnabled } from "@/lib/link-hub-store";
export const runtime = "nodejs";
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  if (!(await hasHubSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hubStorageEnabled()) return NextResponse.json({ error: "Connect private Blob storage before uploading" }, { status: 503 });
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose a file" }, { status: 400 });
    if (file.size > 3_500_000 || file.size === 0) return NextResponse.json({ error: "File must be smaller than 3.5 MB" }, { status: 413 });
    const allowed: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "application/pdf": "pdf" };
    const ext = allowed[file.type];
    if (!ext) return NextResponse.json({ error: "Only JPG, PNG, WebP and PDF allowed" }, { status: 400 });
    const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    const isPng = ext === "png" && bytes.slice(0, 8).join(",") === "137,80,78,71,13,10,26,10";
    const isJpg = ext === "jpg" && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
    const isWebp = ext === "webp" && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
    const isPdf = ext === "pdf" && String.fromCharCode(...bytes.slice(0, 4)) === "%PDF";
    if (!(isPng || isJpg || isWebp || isPdf)) return NextResponse.json({ error: "Invalid file content" }, { status: 400 });
    const key = "link-hub/media/" + crypto.randomUUID() + "." + ext;
    await put(key, file, { access: "private", contentType: file.type });
    return NextResponse.json({ path: "/api/link-hub/media/" + key.slice("link-hub/media/".length) });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
