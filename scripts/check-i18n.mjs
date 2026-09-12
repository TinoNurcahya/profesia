import { readFile } from "node:fs/promises";

const readMessages = async (locale) => JSON.parse(await readFile(`messages/${locale}.json`, "utf8"));
const keys = (value, prefix = "") => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return prefix ? [prefix] : [];
  return Object.entries(value).flatMap(([key, child]) => keys(child, prefix ? `${prefix}.${key}` : key));
};

const idKeys = keys(await readMessages("id")).sort();
const enKeys = keys(await readMessages("en")).sort();
if (JSON.stringify(idKeys) !== JSON.stringify(enKeys)) {
  const missingInEnglish = idKeys.filter((key) => !enKeys.includes(key));
  const missingInIndonesian = enKeys.filter((key) => !idKeys.includes(key));
  throw new Error(`Translation keys differ. Missing EN: ${missingInEnglish.join(", ")}; missing ID: ${missingInIndonesian.join(", ")}`);
}

const hasPath = (value, path) => path.split(".").every((part) => {
  if (!value || typeof value !== "object" || !(part in value)) return false;
  value = value[part];
  return true;
});
for (const namespace of ["Landing.hero", "Landing.preview", "Landing.howItWorks", "Landing.explainable", "Landing.assessment", "Landing.skills", "Landing.exploration", "Landing.finalCta"]) {
  if (!hasPath(await readMessages("id"), namespace)) throw new Error(`Missing namespace: ${namespace}`);
}

console.log(`i18n validation passed: ${idKeys.length} matching keys`);
