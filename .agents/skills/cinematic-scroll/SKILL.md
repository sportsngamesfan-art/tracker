---
name: cinematic-scroll
description: Design restrained documentary-grade scroll transitions, football match footage reveals, emotional chapter pacing and trophy entrances for the Harry Kane Next.js site.
---

# Cinematic Scroll — Harry Kane Documentary

## Read first
Inspect `app/film-interactions.tsx` (especially `FilmMotion`), `app/gold-finale.tsx`, `app/interactive-zone.tsx`, `app/globals.css`, `app/content.ts`, `ASSETS.md` and `QA.md`. The site already uses GSAP 3.13, ScrollTrigger and Three.js. Reuse existing infrastructure rather than adding competing scroll libraries.

## Story direction
- Contrast heartbreaking defeats (2019 Champions League final, EURO 2020 final played in 2021, 2022 World Cup quarterfinal, EURO 2024 final) with records, breakthrough wins and Kane's first major team trophy in 2025.
- Confirm facts, dates, and footage rights before publication. Distinguish victories from aspirations.
- Let emotional scenes breathe; don't use a trophy pop-up for every paragraph.
- Treat the Ballon d'Or as a future ambition, not an achieved award.

## Motion grammar
1. Establish a chapter with a restrained image zoom, year label and short headline.
2. Reveal user-supplied licensed match clip or permitted official embed when available; use a still with a meaningful caption otherwise.
3. Transition via opacity, clip-path or layered parallax; avoid flashing, excessive shaking or auto-playing audio.
4. For key victories, cue the separate 3D trophy scene with a subtle entrance and controlled scroll rotation.
5. Keep navigation, reading order, links, and chapter anchors fully functional.

## Engineering
- Use the existing dynamically imported `gsap` and `gsap/ScrollTrigger` pattern in `FilmMotion`.
- Scope triggers to the appropriate component/section; clean up timelines and triggers on unmount.
- Honor `prefers-reduced-motion`, the existing small-screen fallback and pointer/keyboard accessibility.
- Do not pin long stretches on mobile or block native scrolling. Keep content visible if animation JS fails.
- Lazy-load video, use poster images, muted playsInline playback only where allowed, and pause off-screen videos. Never bundle copyrighted match clips without permission.
- Avoid layout shifts; monitor page performance and prevent scroll conflicts with interactive 3D controls.

## Asset request checklist
For each user-provided clip record: match, date, outcome, source, permission/licence, intended chapter, trim range, poster image, subtitles/captions, and whether it contains licensed music. Store attribution in `ASSETS.md`.

## Review checklist
Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` when changing code. Test desktop/mobile/reduced motion, navigation, fallback media and slow connections. Preview first; do not merge or deploy to production without user approval.
