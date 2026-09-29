# Gályász Ferenc

Personal site for photography, music, and software. Static Astro build on Cloudflare Pages.
The contact form is a Pages Function: it writes to D1 in Western Europe and rate-limits with KV.

## Requirements

- Node.js 22 or newer
- npm 10 or newer
- Wrangler authenticated against the Cloudflare account that owns the Pages project

## Scripts

```bash
npm install
npm test
npm run dev
npm run build
npm run deploy
npm run db:migrate
```

`npm run dev` serves the site at `http://localhost:4321`. The contact API runs only under
`wrangler pages dev dist` or on Cloudflare, because it needs the D1 and KV bindings.

## Cloudflare

Production is `https://galyaszferenc.pages.dev`.

| Piece | Name |
| --- | --- |
| Pages project | `galyaszferenc` |
| D1 | `galyaszferenc-contact` (`CONTACT_DB`, region WEUR) |
| KV | `CONTACT_RATE_LIMIT` |

`public/_headers` sets transport security, a content security policy, and long cache on hashed assets.
`public/_redirects` keeps the old photography paths (`/gallery`, `/about`, `/contact`).

Read stored messages:

```bash
npx wrangler d1 execute galyaszferenc-contact --remote \
  --command "SELECT created_at, name, email, topic, message FROM messages ORDER BY id DESC LIMIT 20"
```

## Custom domain

`galyaszferenc.eu` is not in the `.eu` DNS (NXDOMAIN), and it is not a zone on this Cloudflare account.
Cloudflare Registrar does not sell `.eu`. Register the name again at an EURid registrar, add the zone
here, then attach it to the Pages project. Until that happens the business-card address does not resolve.

## Content

Page copy lives in `src/pages` and `src/data`. Song titles belong in `SONGS` inside `src/data/songs.ts`.
Do not commit `.dev.vars` or `.env` files.
