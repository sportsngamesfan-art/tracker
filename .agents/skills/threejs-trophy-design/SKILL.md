---
name: threejs-trophy-design
description: Build cinematic interactive 3D trophy scenes for the Harry Kane documentary using its existing Next.js, Three.js and GSAP stack.
---

# Harry Kane — Cinematic 3D Trophy Design

## Project context
The website is a Next.js 15 / React 19 documentary on branch `feat/documentary-redesign-2026`. Three.js and GSAP are already installed. Inspect `app/gold-finale.tsx`, `app/interactive-zone.tsx`, `app/film-interactions.tsx`, `app/content.ts`, `app/globals.css`, and `ASSETS.md` before implementing. Preserve existing story, navigation, footage, and credits.

## Implementation workflow
1. Identify the story moment and its historically accurate trophy association. The Ballon d'Or is aspirational, not a trophy Kane has won.
2. Choose a legally usable GLB/glTF model with clear licence/attribution, or make an original procedural interpretation. Do not label an approximation an official replica.
3. Prefer existing Three.js implementation patterns. Introduce React Three Fiber only if its additional dependencies and migration costs are justified; do not add libraries unnecessarily.
4. Use PBR metalness/roughness, controlled environment reflections, studio-style spot/rim lighting, and subtle shadows.
5. Animate reveal/rotation/scale on scroll using existing GSAP architecture. Dispose of renderers, observers, event listeners, geometries and timelines on teardown.
6. Make the dedicated Trophy Room mouse/touch-rotatable with constrained zoom and keyboard-accessible alternatives.
7. Use static fallback visuals for unsupported WebGL and `prefers-reduced-motion`; never block reading or navigation.
8. Lazy-load heavy scenes; cap device pixel ratio and texture sizes; verify mobile performance and avoid layout shifts.
9. Document assets, attribution and licence in `ASSETS.md`. Do not use match footage without permission or a lawful embed.
10. Run existing `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` where available. Test on a Vercel preview and require approval before production.

## Acceptance criteria
- Trophy is genuinely 3D and looks premium, not a rotating flat image.
- Historically accurate story placement, captions, and award status.
- Smooth, restrained transitions with mobile/reduced-motion fallback.
- No regression to existing documentary chapters or interactive features.
- No production merge or deployment without explicit user approval.
