# Domain canonical

Decision: `https://arrel.eu` is the production canonical domain for Arrel.

Date: 2026-04-25

## Context

The app had mixed public references to `arrel.app` and `arrel.eu` across SEO, sitemap, robots, PWA metadata and Stripe checkout defaults.

Current DNS check from the local environment:

| Host | Result |
| --- | --- |
| `arrel.eu` | Resolves |
| `www.arrel.eu` | Resolves |
| `arrel.app` | No DNS answer |
| `www.arrel.app` | No DNS answer |

## Decision

Use `https://arrel.eu` as the only public canonical origin for:

- SEO canonical URLs
- Open Graph URLs
- sitemap and robots
- Stripe checkout return URLs
- allowed checkout origins
- support email domain

`arrel.app` may become a future alias only after DNS and redirects are configured. Until then it must not appear as a public URL in production-facing metadata.

## Implementation Notes

Stripe checkout should prefer `SITE_URL=https://arrel.eu` in production. The Netlify `URL` environment variable can point to deployment URLs, so `SITE_URL` is the explicit source of truth for payment redirects.

Native bundle identifiers such as `eu.arrel.app` are not public web domains and are intentionally outside this decision.
