# Personal Link Hub

Routes:
- Public: https://nebiyumekonnen.com/links
- Admin: https://nebiyumekonnen.com/links/manage

Public content initially uses the checked-in defaults in lib/link-hub.ts.
The site automatically reads published content from a **private Vercel Blob** store once enabled.

## Private manager setup

1. In Vercel > nebiyu-portfolio > Storage, create a private Blob store connected to this project.
2. Set LINK_HUB_STORAGE_ENABLED=true in Production (and Preview if desired). Vercel provides the Blob token or OIDC credentials when the store is connected.
3. Set LINK_HUB_ADMIN_PASSWORD_HASH to salt:scrypt64hex and LINK_HUB_SESSION_SECRET to a cryptographically random string of >=32 characters.
4. Redeploy to apply environment variable changes.
5. Sign in at /links/manage. Draft edits do not affect the public link hub until you press Publish.

Generate password hash locally with a unique salt and strong password, without placing it into version control:

node -e "const c=require('node:crypto');const salt=c.randomBytes(16).toString('hex');process.stdout.write(salt+':'+c.scryptSync(process.env.LINK_HUB_PASSWORD,salt,64).toString('hex'))"

Admin cookies are HttpOnly, signed and expire in 8 hours. State-changing API requests require same-origin headers. Login rate limiting is instance-local, not globally distributed; add a persistent limiter or WAF for larger traffic. Never store secrets in Git.

The Vercel API connection used during initial implementation could not create the private Blob store (403), so content-editing controls intentionally remain disabled until storage is configured. Do not set LINK_HUB_STORAGE_ENABLED until the store is connected.

### Features
- Responsive dark/light public hub with saved visitor theme preference.
- Curated links, social icons, three projects, native sharing and copy fallback.
- Protected login; manage links, ordering, visibility, projects, colors, profile.
- Live private preview, draft save, publish, published version history and restore.
- Image/PDF uploads (maximum 3.5 MB) through private Blob and a public read-only proxy.
- QR PNG download, JSON backup, and SEO/social sharing.
- No analytics collection yet: counters are intentionally labeled unavailable.

GitHub Pages deploys only an independent static redirect to the Vercel domain. Vercel uses server-rendered Next.js because the admin API requires server execution.
