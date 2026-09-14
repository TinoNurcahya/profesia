import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const readJson = (path) => JSON.parse(readFileSync(new URL(`../${path}`, import.meta.url), "utf8"));
const mbti = readJson("data/mbti-questions.json");
const riasec = readJson("data/riasec-questions.json");
const professions = readJson("data/professions-seed.json");
const majors = readJson("data/majors.json");
const zodiacs = readJson("data/zodiacs.json");

assert.equal(mbti.length, 50, "MBTI bank must contain 50 questions");
assert.equal(new Set(mbti.map((q) => q.id)).size, 50, "MBTI IDs must be unique");
assert.ok(mbti.every((q) => q.statement_id && q.statement_en), "MBTI locales must be complete");
assert.deepEqual([...new Set(mbti.map((q) => q.dimension))].sort(), ["AT", "EI", "JP", "SN", "TF"]);

assert.equal(riasec.length, 36, "RIASEC bank must contain 36 questions");
assert.equal(new Set(riasec.map((q) => q.id)).size, 36, "RIASEC IDs must be unique");
assert.ok(riasec.every((q) => q.statement_id && q.statement_en), "RIASEC locales must be complete");
for (const code of "RIASEC") assert.equal(riasec.filter((q) => q.dimension === code).length, 6, `RIASEC ${code} must contain six questions`);

for (const dataset of [professions, majors, zodiacs]) assert.equal(new Set(dataset.map((item) => item.slug)).size, dataset.length, "Catalog slugs must be unique");
assert.ok(professions.every((item) => item.salary_min <= item.salary_max), "Salary ranges must be ordered");
assert.ok(zodiacs.every((item) => item.recommended_professions.every((slug) => professions.some((profession) => profession.slug === slug))), "Zodiac relations must reference valid professions");

const stableTie = [{ slug: "a", score: 50 }, { slug: "b", score: 50 }].sort((a, b) => b.score - a.score);
assert.deepEqual(stableTie.map((item) => item.slug), ["a", "b"], "Tie handling must be stable");

console.log("domain validation passed");
