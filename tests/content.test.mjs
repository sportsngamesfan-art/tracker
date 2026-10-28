import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import {
  filmChapters,
  goalsPerGame,
  milestones,
  photographs,
  seasons,
} from "../app/content.ts";

test("era comparisons keep completed careers separate from league seasons", () => {
  const [club, league, debut, next] = seasons;
  assert.ok(club.goals > league.goals && club.games > league.games);
  assert.equal(goalsPerGame(debut.goals, debut.games), "1.13");
  assert.equal(goalsPerGame(next.goals, next.games), "0.84");
  assert.match(debut.competition, /Bundesliga only/);
  assert.match(club.competition, /All competitive/);
  assert.equal(goalsPerGame(0, 0), "0.00");
});
test("licensed assets exist locally and have attribution and licence URLs", () => {
  for (const photo of photographs) {
    assert.ok(existsSync(`public${photo.file}`), photo.file);
    assert.ok(photo.author);
    assert.match(photo.licenseUrl, /^https:\/\/creativecommons.org/);
    assert.match(photo.url, /^https:\/\/commons.wikimedia.org/);
  }
});
test("milestones follow chronology and chapters have unique anchors", () => {
  const years = milestones.map((m) => Number(m.year));
  assert.deepEqual(
    years,
    [...years].sort((a, b) => a - b),
  );
  assert.equal(
    new Set(filmChapters.map((c) => c.id)).size,
    filmChapters.length,
  );
  for (const m of milestones) assert.match(m.source, /^https:\/\//);
});
