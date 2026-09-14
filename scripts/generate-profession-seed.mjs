import { readFile } from "node:fs/promises";

const rows = JSON.parse(await readFile("data/professions-seed.json", "utf8"));
const quote = (value) => value == null ? "null" : `'${String(value).replaceAll("'", "''")}'`;
const json = (value) => `${quote(JSON.stringify(value))}::jsonb`;

console.log("-- Generated from data/professions-seed.json. Do not edit manually.");
console.log("insert into public.professions (slug, category_slug, category_name_id, category_name_en, name_id, name_en, description_id, description_en, salary_min, salary_max, education_id, education_en, skills_id, skills_en, work_environment_id, work_environment_en, career_path_id, career_path_en, prospects, work_life_balance, image_url, is_featured, matched_mbti)");
console.log("values");
console.log(rows.map((p) => `(${[p.slug, p.category_slug, p.category_name_id, p.category_name_en, p.name_id, p.name_en, p.description_id, p.description_en].map(quote).join(", ")}, ${p.salary_min}, ${p.salary_max}, ${[p.education_id, p.education_en].map(quote).join(", ")}, ${json(p.skills_id)}, ${json(p.skills_en)}, ${[p.work_environment_id, p.work_environment_en, p.career_path_id, p.career_path_en, p.prospects].map(quote).join(", ")}, ${p.work_life_balance}, ${quote(p.image_url)}, ${p.is_featured}, ${json(p.matched_mbti)})`).join(",\n"));
console.log("on conflict (slug) do nothing;");
