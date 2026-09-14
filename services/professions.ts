import professionsSeed from "@/data/professions-seed.json";
import { createClient } from "@/lib/supabase/server";

export type Profession = (typeof professionsSeed)[number];

export interface ProfessionFilter {
  search?: string;
  category?: string;
  mbti?: string;
  riasec?: string;
  prospects?: string;
  education?: string;
  salaryMin?: number;
  salaryMax?: number;
  sort?: "salary_desc" | "salary_asc" | "wlb_desc" | "name_asc";
}

const CATEGORY_RIASEC: Record<string, string[]> = {
  teknologi: ["I", "R", "C"],
  kesehatan: ["S", "I", "R"],
  "seni-desain": ["A", "I", "S"],
  pemasaran: ["E", "A", "S"],
  pendidikan: ["S", "A", "E"],
};

export function filterProfessions(list: Profession[], filter?: ProfessionFilter): Profession[] {
  let result = [...list];
  if (filter?.search) {
    const query = filter.search.toLowerCase();
    result = result.filter((p) => p.name_id.toLowerCase().includes(query) || p.name_en.toLowerCase().includes(query) || p.description_id.toLowerCase().includes(query) || p.description_en.toLowerCase().includes(query) || p.skills_id.some((skill) => skill.toLowerCase().includes(query)) || p.skills_en.some((skill) => skill.toLowerCase().includes(query)));
  }
  if (filter?.category && filter.category !== "all") result = result.filter((p) => p.category_slug === filter.category);
  if (filter?.prospects && filter.prospects !== "all") result = result.filter((p) => p.prospects === filter.prospects);
  if (filter?.education) { const education = filter.education.toLowerCase(); result = result.filter((p) => p.education_id.toLowerCase().includes(education) || p.education_en.toLowerCase().includes(education)); }
  if (filter?.salaryMin !== undefined) result = result.filter((p) => p.salary_max >= filter.salaryMin!);
  if (filter?.salaryMax !== undefined) result = result.filter((p) => p.salary_min <= filter.salaryMax!);
  if (filter?.mbti && filter.mbti !== "all") result = result.filter((p) => p.matched_mbti.some((m) => m.code === filter.mbti!.toUpperCase()));
  if (filter?.riasec && filter.riasec !== "all") result = result.filter((p) => CATEGORY_RIASEC[p.category_slug]?.includes(filter.riasec!.toUpperCase()));
  if (filter?.sort === "salary_desc") result.sort((a, b) => b.salary_max - a.salary_max);
  if (filter?.sort === "salary_asc") result.sort((a, b) => a.salary_min - b.salary_min);
  if (filter?.sort === "wlb_desc") result.sort((a, b) => b.work_life_balance - a.work_life_balance);
  if (filter?.sort === "name_asc") result.sort((a, b) => a.name_id.localeCompare(b.name_id));
  return result;
}

export function findProfessionBySlug(list: Profession[], slug: string): Profession | null {
  return list.find((profession) => profession.slug === slug) ?? null;
}

async function readFromSupabase(): Promise<Profession[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("professions").select("*").order("name_id");
    if (error || !data?.length) return null;
    return data as unknown as Profession[];
  } catch (error) {
    console.error("Profession catalog unavailable:", error);
    return null;
  }
}

export async function fetchProfessions(filter?: ProfessionFilter): Promise<Profession[]> {
  return filterProfessions((await readFromSupabase()) ?? professionsSeed, filter);
}

export async function fetchProfessionBySlug(slug: string): Promise<Profession | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("professions").select("*").eq("slug", slug).maybeSingle();
    if (!error && data) return data as unknown as Profession;
  } catch (error) {
    console.error("Profession lookup unavailable:", error);
  }
  return findProfessionBySlug(professionsSeed, slug);
}
