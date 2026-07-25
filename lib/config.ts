/**
 * Central switchboard for optional/unverified contact and resume data.
 * Nothing here is invented. Fill in a value and the related UI turns on
 * automatically; leave it null and the related CTA hides itself.
 */
export const siteConfig = {
  siteUrl: "https://nebiyumekonnen.dev",
  email: "nebiyumekonnen17@gmail.com" as string | null,
  linkedin: null as string | null,
  resumeUrl: null as string | null, // e.g. "/resume/Nebiyu_Mekonnen_Resume.pdf" once added to public/resume
  github: "https://github.com/nebiyumekonnen17",
  credly: "https://www.credly.com/users/nebiyu-mekonnen",
};
