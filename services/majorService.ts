import majorsSeed from "@/data/majors.json";

export interface Major {
  id: string;
  slug: string;
  name_id: string;
  name_en: string;
  category: string;
  description_id: string;
  description_en: string;
  typical_subjects_id: string[];
  typical_subjects_en: string[];
  min_education_level: string;
  avg_duration_years: number;
  career_prospect: "High" | "Medium" | "Low";
  matched_mbti: string[];
  matched_professions_slugs: string[];
}

export interface MajorFilter {
  search?: string;
  category?: string;
  mbti?: string;
  prospects?: string;
}

export async function fetchMajors(filter?: MajorFilter): Promise<Major[]> {
  let list = [...(majorsSeed as Major[])];

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (m) =>
        m.name_id.toLowerCase().includes(q) ||
        m.name_en.toLowerCase().includes(q) ||
        m.description_id.toLowerCase().includes(q) ||
        m.description_en.toLowerCase().includes(q)
    );
  }

  if (filter?.category && filter.category !== "all") {
    list = list.filter((m) => m.category.toLowerCase() === filter.category?.toLowerCase());
  }

  if (filter?.prospects && filter.prospects !== "all") {
    list = list.filter((m) => m.career_prospect.toLowerCase() === filter.prospects?.toLowerCase());
  }

  if (filter?.mbti && filter.mbti !== "all") {
    const mbtiCode = filter.mbti.toUpperCase();
    list = list.filter((m) => m.matched_mbti.some((code) => mbtiCode.startsWith(code)));
  }

  return list;
}

export async function fetchMajorBySlug(slug: string): Promise<Major | null> {
  const found = (majorsSeed as Major[]).find((m) => m.slug === slug);
  return found || null;
}
