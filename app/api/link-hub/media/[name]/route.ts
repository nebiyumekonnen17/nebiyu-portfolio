import { get } from "@vercel/blob";
export const runtime = "nodejs";
export async function GET(_req: Request, ctx: { params: Promise<{ name: string }> }) {
  const { name } = await ctx.params;
  if (!/^[0-9a-f-]{36}\.(png|jpg|webp|pdf)$/.test(name)) return new Response("Not found", { status: 404 });
  try {
    const result = await get("link-hub/media/" + name, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) return new Response("Not found", { status: 404 });
    return new Response(result.stream, { headers: { "Content-Type": result.blob.contentType, "X-Content-Type-Options": "nosniff", "Cache-Control": "public, max-age=31536000, immutable" } });
  } catch { return new Response("Not found", { status: 404 }); }
}
