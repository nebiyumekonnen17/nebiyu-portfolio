import { NextRequest, NextResponse } from "next/server";

const linkHost = "links.nebiyumekonnen.com";

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const path = request.nextUrl.pathname;

  // Keep already-printed /links URLs usable by redirecting them to the new home.
  if ((host === "nebiyumekonnen.com" || host === "www.nebiyumekonnen.com") &&
      (path === "/links" || path.startsWith("/links/"))) {
    const suffix = path.slice("/links".length);
    const target = new URL(suffix || "/", "https://" + linkHost);
    target.search = request.nextUrl.search;
    return NextResponse.redirect(target, 307);
  }

  if (host !== linkHost) return NextResponse.next();

  // One clean public entrypoint, a private studio, and a standalone QR workspace.
  if (path === "/" || path === "/manage" || path === "/manage/" ||
      path === "/manage/qr" || path === "/manage/qr/") {
    const target = request.nextUrl.clone();
    target.pathname = path === "/" ? "/links/" : "/links" + path;
    return NextResponse.rewrite(target);
  }

  // Avoid duplicate public routes on the subdomain.
  if (path === "/links" || path.startsWith("/links/")) {
    const target = request.nextUrl.clone();
    target.pathname = path.slice("/links".length) || "/";
    return NextResponse.redirect(target, 307);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/links/:path*", "/manage/:path*"],
};
