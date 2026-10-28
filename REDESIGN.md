# The Pursuit of Gold — redesign audit and implementation brief

## Audit, 28 October 2026

Audited the deployed opening, chapter selectors, navigation, quiz and WebGL fallback, and all application modules and dependencies. Next.js 15 App Router / React 19 / TypeScript are retained. The only page is `/`, with robots and sitemap routes. GitHub `sportsngamesfan-art/tracker` main has a README only; earlier local changes were not synchronized. Preserve that README and create a PR based on main.

Problems: identical chapter rails, small captions, insufficient relevant images, repeated portraits, accumulated CSS overrides, chronology out of order, stale award wording, isolated 3D exhibit, no meaningful statistics comparison, no poll, no per-era image credits, invalid Next 15 lint command. The WebGL scene has no environment reflections or stadium, and its procedural shapes should be labelled interpretations rather than replicas.

Preserve: researched childhood accounts, cited career milestones, one-answer quiz scoring, reduced-motion handling, static WebGL fallback, chapter anchors, SEO routes.

## Design system

Applied UI/UX Pro Max's design-system query `cinematic sports immersive storytelling`, motion 8, variance 7, and Three.js performance/shadow recommendations. Deliberately adapt its vivid entertainment palette to the requested black/navy/white/red/gold identity. Display: Bebas Neue; prose: Inter; captions: monospace. Use 16px prose, 44px controls, visible focus, 4.5:1 text contrast, no hover-only interactions. Use one stylesheet and semantic tokens.

Reference study: Lando Norris official site (photographic rhythm, a recurring hero object and an explorable collection), OFF+BRAND award case study (athlete energy), NBA Finals VR project from m ss ng p eces (place and atmosphere). Borrow principles, not assets or layouts.

## Sequence

1. Full-screen Tottenham match photograph, bottom-aligned title, concise pinned zoom on desktop only.
2. Childhood editorial spread with numbered local-football origins; do not mislabel adult photography as childhood archive.
3. Rejection dark interlude with Arsenal/Watford steps and direct first-person source.
4. Tottenham archival strip, loan itinerary, interactive milestone selection and completed career totals.
5. England full-height portrait beside a tournament ledger. Explicit club/country overlap.
6. Navy/white to Bayern red transition, dated action photo and shirt artifact; relocation and first trophy narrative.
7. Statistics lab with season/era selection, honest denominators, a quiz, browser-local poll and hidden number-nine detail.
8. Lazy-loaded physically lit 3D golden-football/cup gallery with stadium context, reflections, pointer and keyboard rotation, restrained particles and fallback.

The finale is framed as an ambition and fan discussion as requested. Statistics are historical snapshots through 2024/25, explicitly labelled, rather than invented live totals. Later awards do not become unsourced claims.

## Engineering / verification

GSAP desktop pin, clip reveal, photo parallax, statistics counting and red transition with matchMedia cleanup. Native scroll on mobile. Expensive Three.js loads on demand; cap DPR and stop rendering offscreen. No required remote HDR or 3D model. Preserve all stories in semantic HTML. Poll is local-device-only: never present browser votes as global results. Host licensed photography locally in WebP; list original URLs, license and transformations.

Run type check, meaningful interaction tests, ESLint, production build and HTTP smoke check. Preview Vercel deployment before production. Browser QA covers navigation, image loading, timeline, statistics, quiz, poll and WebGL fallback. Explicitly report unavailable WebGL/mobile emulation rather than claiming those checks passed.
