# Redesign validation

## Passed

- Production compilation and TypeScript checks (`npm run build`).
- Accessibility ESLint (`npm run lint`): no errors.
- Eight automated tests (`npm run test`): three content/asset checks and five React interaction checks.
- Quiz: correct/incorrect answers, answer locking, mixed final score and replay reset.
- Statistics: switching scope updates goals, appearances and goals-per-game together.
- Fan poll: local persistence and vote changes; no global vote counts.
- Milestones, childhood previous/next and number-nine easter egg.
- Four licensed local photographs exist; source and licence URLs are present.
- Local production server started; page HTML fetched, photograph returned HTTP 200, Open Graph image returned HTTP 200. Server stopped after smoke checks.
- Vercel preview `dpl_Gmp4WCn5FCqin3bqgWYXsNECG1Xd`: READY, linked in metadata to GitHub commit `dec48db89aa148f1c510b5df0ecd79897ba06a72`.

## Still requires browser QA

The existing production site was inspected visually before implementation. The new preview redirects this cloud browser to Vercel sign-in. Automatic approval review rejected a temporary share URL because it would broaden access to anyone possessing the link. No protection settings were changed, no share link was created, and production was not updated.

Desktop chapter composition, image crops, mobile/tablet layouts, scroll timing, reduced-motion appearance, console logs and actual WebGL rendering are not yet visually verified for the redesign. The earlier cloud browser also lacked WebGL, so a supported browser is needed to judge trophy materials and stadium composition. JSDOM interaction tests are not a substitute for layout or GPU testing.

The Three.js scene includes reflection environment generation, one shadow-casting key light, a stadium bowl, floodlights, golden football panel seams, a silver cup, particles, pointer controls, pause, keyboard/button rotation, offscreen/hidden-page rendering suspension, and reduced-motion initialization. A static labelled SVG fallback is provided for WebGL failure.

## Build notes

Next warns that its framework-specific ESLint plugin is not configured; the explicit accessibility ESLint configuration passes. No measured Core Web Vitals or Lighthouse score is claimed. The production build reports approximately 116 kB initial JS versus 113 kB in the previous version; desktop animation and 3D modules load separately. Four optimized photographs total about 654 kB on disk before responsive image delivery. No video, remote HDR or external 3D-model download is required.

## Release gate

Draft PR remains open. Obtain authorization for a scoped temporary preview share link (23 hours) or test as an already-authenticated Vercel owner, complete browser QA, then review production release. Do not merge or deploy to production merely because the build is READY.
