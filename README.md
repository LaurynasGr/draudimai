# Draudimai

Insurance explained and compared: what each Lithuanian insurer actually covers, summarised from the insurers' own
policy rules, with links to the source documents. In Lithuanian and English.

- **Life insurance** (`/life-insurance/<insurer>`): Swedbank, SEB and ERGO. Every insurer lists the same set of
  coverages (life, accidental death, critical illness, cancer, children's critical illness, permanent incapacity,
  disability and severe injuries from an accident, injuries, daily and hospital allowance, medical expenses), each
  marked as offered, included in another cover, or not in the reviewed policies, with the
  insured event, payout, eligibility and timing, main exclusions and policy references.
- **Home insurance** (`/home-insurance`): placeholder, content to come.

Every page is public. Google sign-in (`/login`) is wired up but optional, kept for user-specific features later.

Built on a Next.js (App Router) + Convex scaffold: Tailwind v4 + shadcn, Convex Auth, next-intl, react-hook-form +
zod, Biome, Bun workspaces. Deploys to Vercel with `convex deploy` in the build step.

## Insurance content

The summaries are copy, not data: they live in `packages/i18n/src/translations/<locale>/life-insurance.json`, with
one object per insurer, and `apps/web/src/app/(app)/life-insurance/insurers.ts` lists each insurer's product page,
source documents and the status of every coverage. `RETRIEVED_ON` there is the date shown on the page.

- The documents the summaries were written from are kept under `apps/web/src/public/life/` (not served; the page
  links to the insurers' hosted copies). `docs/life-insurance-audit.md` records what was checked against them,
  the conflicts found between documents, and SHA-256 fingerprints of the editions reviewed.
- To add an insurer: add its documents, an entry in `insurers.ts` (every coverage id, so gaps show as such) and its
  object in both locale files. The translator is typed from the English messages, so `bun run lint` catches a
  missing English key, and `bun test` (`translations.test.ts`) catches a locale that does not mirror `en`. When an insurer
  brings a coverage nobody had, add the id to `COVERAGE_IDS` and a section for it to every other insurer.
- To add an insurance type: create its route under `apps/web/src/app/(app)/`, add it to
  `apps/web/src/lib/sections.ts` (which feeds both the header nav and the home page cards), and add `nav.<key>` and
  `home.sections.<key>.title` / `.description` in both locales.
- The summaries are not advice and do not replace the policy terms; re-check them when an insurer publishes new
  rules and update `RETRIEVED_ON`.

## Repository layout

Bun workspaces monorepo. The Convex functions live at the repo root; the Convex
CLI runs from `apps/web` (its `convex.json` points at `../../convex`) so the
Next.js app's `.env.local` is the single env file.

- `convex/` — Convex schema, queries, mutations and auth (shared backend)
- `packages/core/` — `@scaffold/core`: Convex API re-exports, zod form-schema
  helpers and other React-free shared code; React hooks under `@scaffold/core/hooks`,
  helpers for Convex functions under `@scaffold/core/server`
- `packages/i18n/` — `@scaffold/i18n`: every user-facing string, as next-intl messages per locale
- `packages/ui/` — `@scaffold/ui`: shadcn components, layouts built from them
  (data table, confirm dialog, sidebar layout, …), `cn`, Tailwind theme
- `packages/forms/` — `@scaffold/forms`: typed react-hook-form fields
- `apps/web/` — the Next.js app

Root scripts: `bun run dev` (web + convex), `bun run build`, `bun run lint`
(biome + typecheck of every package, after `next typegen`), `bun test`. Tests are colocated
(`*.test.ts` next to the code). See `CLAUDE.md` for the coding conventions.

## Local setup

1. `bun install`
2. `cd apps/web && bunx convex dev` once — it creates a local (anonymous)
   deployment and writes `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` into
   `apps/web/.env.local` (see `.env.example`).
3. Generate the deployment variables (one-time): `make env`, run from the repo root, prints `JWT_PRIVATE_KEY`, `JWKS`, `SITE_URL`
   and, if you enter them, the Google OAuth pair, and copies them to the clipboard when `pbcopy` (macOS) or `xclip` (Linux) is available. Paste them into the deployment's environment (`bunx convex env set NAME value`
   from `apps/web`, or the dashboard). Every deployment needs its own set.
4. Optional, only needed to sign in (every page works without it): set up Google OAuth ([Convex Auth docs](https://labs.convex.dev/auth/config/oauth/google)):
   - In Google Cloud Console create an OAuth client (web application) with
     authorized redirect URI `<convex site url>/api/auth/callback/google`
     (`http://127.0.0.1:3211/api/auth/callback/google` for a local deployment).
   - `bunx convex env set AUTH_GOOGLE_ID <client-id>`
   - `bunx convex env set AUTH_GOOGLE_SECRET <client-secret>`
5. `bun run dev` — Next.js on :3100 (3000 tends to be taken by other projects; change it in
   `apps/web/package.json`, and keep `SITE_URL` on the dev deployment in step with it) and `convex dev` side by side.

## Dev sign-in without Google

A local deployment can offer a shortcut on the sign-in page:

```sh
cd apps/web && bunx convex env set DEV_SIGN_IN_AS you@example.com   # or "first" for the first user
```

The user is created if it does not exist yet. The provider only activates when
the deployment's site URL is a loopback address, so the variable is harmless
on cloud deployments — still, never set it on production.

## Deploying to Vercel

Create the Vercel project with **Root Directory = `apps/web`** (keep "Include
source files outside of the Root Directory" enabled). `apps/web/vercel.json`
builds with `bunx convex deploy --cmd 'bun run build'`, which deploys the
Convex functions to prod and passes the prod URL to the Next.js build as
`NEXT_PUBLIC_CONVEX_URL`.

On Vercel set:

- `CONVEX_DEPLOY_KEY` — production deploy key from the Convex dashboard.

On the **production** Convex deployment set (dashboard or `bunx convex env set --prod`):

- `SITE_URL` — the Vercel app URL (OAuth redirects back to it)
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — only if Google sign-in should work in production
- `JWT_PRIVATE_KEY` / `JWKS` — a key pair of its own (`make env` prints a fresh one).

For Google sign-in, also add the prod redirect URI to the Google OAuth client:
`https://<prod-deployment-name>.convex.site/api/auth/callback/google`.

Note: Vercel's Hobby plan is for non-commercial use only.
