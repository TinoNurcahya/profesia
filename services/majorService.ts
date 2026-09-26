import majorsSeed from "@/data/majors.json";
import { createClient } from "@/lib/supabase/server";

export interface Major {
  id: string;
  slug: string;
  cip_code: string;
  name_id: string;
  name_en: string;
  category: "Saintek" | "Soshum" | "Seni" | string;
  description_id: string;
  description_en: string;
  typical_subjects_id: string[];
  typical_subjects_en: string[];
  min_education_level: string;
  avg_duration_years: number;
  career_prospect: "High" | "Medium" | "Low";
  riasec_code?: string;
  matched_mbti: string[];
  matched_professions_slugs: string[];
}

export { type MajorFilter, filterMajors } from "./majorFilter";
import { type MajorFilter, filterMajors } from "./majorFilter";

async function readFromSupabase(): Promise<Major[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("majors")
      .select("*")
      .order("name_id");

    if (error || !data || data.length === 0) {
      return null;
    }

    return data as unknown as Major[];
  } catch (error) {
    // Graceful degradation when Supabase is unconfigured or unavailable
    return null;
  }
}

export async function fetchMajors(filter?: MajorFilter): Promise<Major[]> {
  const fromDb = await readFromSupabase();
  const source = fromDb && fromDb.length > 0 ? fromDb : (majorsSeed as Major[]);
  return filterMajors(source, filter);
}

export async function fetchMajorBySlug(slug: string): Promise<Major | null> {
  const fromDb = await readFromSupabase();
  if (fromDb && fromDb.length > 0) {
    const foundInDb = fromDb.find((m) => m.slug === slug);
    if (foundInDb) return foundInDb;
  }

  const foundInSeed = (majorsSeed as Major[]).find((m) => m.slug === slug);
  return foundInSeed || null;
}
