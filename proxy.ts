import { NextRequest, NextResponse } from "next/server";

const linkHost = "links.nebiyumekonnen.com";
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const path = request.nextUrl.pathname;

  if ((host === "nebiyumekonnen.com" || host === "www.nebiyumekonnen.com") &&
    (path === "/links" || path.startsWith("/links/"))) {
    const suffix = path.slice("/links".length);
    const target = new URL(suffix || "/", "https://" + linkHost);
    target.search = request.nextUrl.search;
    return NextResponse.redirect(target, 307);
  }
  if (host !== linkHost) return NextResponse.next();

  const destinations: Record<string, string> = {
    "/": "/links/",
    "/manage": "/links/manage/",
    "/manage/": "/links/manage/",
    "/manage/links": "/links/manage/links/",
    "/manage/links/": "/links/manage/links/",
    "/manage/qr": "/links/manage/qr/",
    "/manage/qr/": "/links/manage/qr/",
    "/manage/security": "/links/manage/security/",
    "/manage/security/": "/links/manage/security/",
  };
  if (destinations[path]) {
    const target = request.nextUrl.clone();
    target.pathname = destinations[path];
    return NextResponse.rewrite(target);
  }
  if (path === "/links" || path.startsWith("/links/")) {
    const target = request.nextUrl.clone();
    target.pathname = path.slice("/links".length) || "/";
    return NextResponse.redirect(target, 307);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/", "/links/:path*", "/manage/:path*"] };
