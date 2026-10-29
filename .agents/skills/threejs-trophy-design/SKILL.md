---
name: threejs-trophy-design
description: Design and implement cinematic, performant 3D football trophies for the Harry Kane Ballon d'Or scrolling documentary using Three.js, React Three Fiber and GLB assets. Use when creating or integrating trophy scenes.
---

# 3D Trophy Design — Harry Kane: The Pursuit of Gold

## Objective
Produce premium-quality, responsive, accessible 3D trophy reveals inside the existing website. Inspect the actual website source and framework before making changes. Do not rebuild or replace unrelated features.

## Asset workflow
1. Identify the trophy and distinguish trophies Kane actually won from aspirational symbols such as the Ballon d'Or.
2. Prefer properly licensed, accurate, optimized GLB/glTF models. Record asset source, author, attribution and license in the project.
3. If a suitable asset isn't available, model an original interpretation with Blender or procedural Three.js geometry. Never present an inaccurate placeholder as an exact replica.
4. Optimize mesh count, textures and file size; use compressed geometry/textures when supported. Avoid bundling huge unoptimized assets.

## Rendering and lighting
- If the website uses React, prefer `@react-three/fiber` with `@react-three/drei` and `three`; otherwise integrate with its existing framework.
- Use physically based metallic/roughness materials, careful environment reflections, soft shadows and controlled cinematic rim lighting.
- Use transparent canvases where trophies overlay story chapters; prevent 3D canvases from obscuring interactive page controls.
- Provide graceful static-image fallbacks if WebGL is unavailable.

## Cinematic interaction
- On entering a chapter, a trophy rises/fades into view with restrained rotation, scale, spotlight and text transitions.
- Tie scroll-driven animation to the established page scroll architecture. Prefer GSAP ScrollTrigger if already in use or appropriate; clean up timelines and listeners on unmount.
- For a dedicated Trophy Room, support drag-to-rotate and controlled zoom. Avoid conflicting scroll and pointer interactions.
- Maintain historically accurate labels: a Ballon d'Or reveal is a symbol of pursuit, not a claim that Kane has won it.

## Performance and accessibility
- Lazy-load 3D scenes, prefetch only when justified, optimize for mobile GPU constraints, and cap device pixel ratio.
- Preserve semantic document text and provide descriptive alt/captions and keyboard-accessible controls.
- Honor `prefers-reduced-motion`; do not force motion or autoplay with sound.
- Test desktop, mobile, slow networks, fallback states and chapter transition cleanup.

## Definition of done
- Scene looks convincing under close inspection, not like a flat rotating PNG.
- Trophies appear in the right historical chapter and do not misrepresent records.
- No broken scrolling, navigation, CLS, or unusable mobile performance.
- Build/lint/typecheck pass where configured; any limitations are documented.
- Work is reviewed on a preview deployment before production release.
