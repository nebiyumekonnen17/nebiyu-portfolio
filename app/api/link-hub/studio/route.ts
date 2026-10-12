import { NextResponse } from "next/server";
import { hasHubSession } from "@/lib/link-hub-auth";
import { readHub } from "@/lib/link-hub-store";
import { listManagedQR } from "@/lib/qr-manager";
import { twoFactorStatus } from "@/lib/link-hub-mfa";
import { getSelectedHubTemplate } from "@/lib/link-hub";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store" };
export async function GET() {
  try {
    if (!(await hasHubSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers });
    const [draft, live, qr, security] = await Promise.all([
      readHub("draft"), readHub("live"), listManagedQR(), twoFactorStatus(),
    ]);
    const sorted = [...qr].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return NextResponse.json({
      hub: {
        visibleLinks: live.links.filter(x => x.visible).length,
        allLinks: live.links.length,
        publishedProjects: live.projects.filter(x => x.visible).length,
        draftLinks: draft.links.length,
        template: getSelectedHubTemplate(live.design).name,
      },
      qr: {
        total: qr.length,
        active: qr.filter(x => x.enabled).length,
        paused: qr.filter(x => !x.enabled).length,
        recentlyUpdated: sorted.slice(0, 6).map(x => ({
          slug: x.slug, title: x.title, target: x.target,
          updatedAt: x.updatedAt, enabled: x.enabled,
        })),
      },
      security: { twoFactorEnabled: security.enabled, sessionHours: 4 },
    }, { headers });
  } catch {
    return NextResponse.json({ error: "Dashboard data is temporarily unavailable." }, { status: 503, headers });
  }
}
