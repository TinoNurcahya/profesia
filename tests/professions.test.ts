import assert from "node:assert/strict";
import { describe, it } from "node:test";
import professionsSeed from "@/data/professions-seed.json";
import { filterProfessions, findProfessionBySlug, type Profession } from "@/services/professions";

const professions = professionsSeed as Profession[];

describe("profession filters", () => {
  it("searches localized names, descriptions, and skills", () => {
    assert.deepEqual(filterProfessions(professions, { search: "machine learning" }).map(({ slug }) => slug), ["data-scientist"]);
  });

  it("combines category, MBTI, RIASEC, education, and salary filters", () => {
    const result = filterProfessions(professions, { category: "teknologi", mbti: "INTJ", riasec: "I", education: "komputer", salaryMin: 20_000_000, salaryMax: 12_000_000 });
    assert.deepEqual(result.map(({ slug }) => slug), ["data-scientist"]);
  });

  it("sorts salary and work-life balance without mutating the source", () => {
    const originalOrder = professions.map(({ slug }) => slug);
    const salaries = filterProfessions(professions, { sort: "salary_desc" });
    assert.equal(salaries[0].slug, "dokter-umum");
    assert.deepEqual(professions.map(({ slug }) => slug), originalOrder);
  });

  it("returns a profession by slug and null for unknown slugs", () => {
    assert.equal(findProfessionBySlug(professions, "software-engineer")?.id, 1);
    assert.equal(findProfessionBySlug(professions, "not-a-profession"), null);
  });
});
