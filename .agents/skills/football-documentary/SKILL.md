---
name: football-documentary
description: Research, verify and structure the Harry Kane career documentary, sourcing rights-cleared football imagery and video with accurate match outcomes and citations.
---

# Football Documentary — Editorial and Media Skill

## Purpose
Turn the existing Harry Kane Next.js scroll story into a fact-checked, emotional football documentary. Read `app/content.ts`, `ASSETS.md`, `REDESIGN.md`, `app/film-interactions.tsx`, and `app/gold-finale.tsx` first. Respect current chapter IDs and navigation.

## Editorial standards
- Trace career events chronologically from childhood, rejection, loans, Spurs, England, Bayern and the Ballon d'Or ambition.
- Verify all scores, dates, honours, milestones and quotes using primary sources where possible (club, league, UEFA, FIFA, player interviews); record sources alongside copy.
- Separate fact from dramatic narration. Never imply Kane has already won the Ballon d'Or.
- Distinguish individual Golden Boots from team trophies; acknowledge Bayern's 2025 Bundesliga title accurately.
- Avoid invented quotations, false match imagery or footage from a different match presented as authentic.

## Five priority match moments
1. 2019 UEFA Champions League final — Tottenham 0–2 Liverpool: painful near-miss.
2. UEFA EURO 2020 final played 11 July 2021 — England lost to Italy on penalties after 1–1.
3. 2022 FIFA World Cup quarterfinal — England lost 1–2 to France.
4. UEFA EURO 2024 final — England lost 1–2 to Spain.
5. 2024/25 Bundesliga — Bayern Munich league title, Kane's first major team trophy.

## Media intake
For every user-provided clip, require a meaningful file name, event, date, rights/permission, photographer or publisher, caption, start/end trim, subtitles, poster image, and any music licence. Store the asset record in `ASSETS.md`. Use legally permitted embeds where suitable. Do not scrape or rehost broadcast footage without permission. Do not claim a licence just because footage is publicly viewable.

## Visual storytelling
- Open chapters with precise match context, a vivid but concise human headline and an authentic image.
- Use losses for tension, records and wins for release; pace emotional transitions without melodramatic fabrication.
- Pair major achievements with trophy animation only where historically appropriate.
- Preserve factual accessible text when video is missing or motion is disabled.
- Attribute Creative Commons images exactly, including ShareAlike requirements.

## Quality gates
Review dates, names, captions, sources and asset permissions before merging. Ensure video posters and fallback text are usable on slow connections. Run existing lint/typecheck/tests/build when changing code, review a Vercel preview, and obtain explicit approval before production.
