/**
 * Central switchboard for optional/unverified contact and resume data.
 * Nothing here is invented. Fill in a value and the related UI turns on
 * automatically; leave it null and the related CTA hides itself.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://nebiyumekonnen17.github.io/nebiyu-portfolio";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/nebiyu-portfolio";

export const siteConfig = {
  siteUrl,
  basePath,
  email: "nebiyumekonnen10@gmail.com" as string | null,
  linkedin: null as string | null,
  resumeUrl: `${siteUrl.replace(/\/$/, "")}/resume/Nebiyu_Mekonnen_Resume.pdf` as string | null,
  github: "https://github.com/nebiyumekonnen17",
  credly: "https://www.credly.com/users/nebiyu-mekonnen",
};

export function assetUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.basePath}${normalizedPath}`;
}

export function absoluteUrl(path = "") {
  const normalizedPath = path && !path.startsWith("/") ? `/${path}` : path;
  return `${siteConfig.siteUrl.replace(/\/$/, "")}${normalizedPath}`;
}
