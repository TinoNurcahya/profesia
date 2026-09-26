import { Major } from "@/services/majorService";

export interface MajorFilter {
  search?: string;
  category?: string;
  mbti?: string;
  prospects?: string;
  sort?: "default" | "name_asc" | "prospect_desc" | "duration_asc" | string;
}

export function filterMajors(list: Major[], filter?: MajorFilter): Major[] {
  let result = [...list];

  if (filter?.search) {
    const q = filter.search.toLowerCase().trim();
    result = result.filter(
      (m) =>
        m.name_id.toLowerCase().includes(q) ||
        m.name_en.toLowerCase().includes(q) ||
        m.description_id.toLowerCase().includes(q) ||
        m.description_en.toLowerCase().includes(q) ||
        m.cip_code?.toLowerCase().includes(q) ||
        m.typical_subjects_id.some((subj) => subj.toLowerCase().includes(q)) ||
        m.typical_subjects_en.some((subj) => subj.toLowerCase().includes(q))
    );
  }

  if (filter?.category && filter.category !== "all") {
    result = result.filter(
      (m) => m.category.toLowerCase() === filter.category?.toLowerCase()
    );
  }

  if (filter?.prospects && filter.prospects !== "all") {
    result = result.filter(
      (m) => m.career_prospect.toLowerCase() === filter.prospects?.toLowerCase()
    );
  }

  if (filter?.mbti && filter.mbti !== "all") {
    const mbtiCode = filter.mbti.toUpperCase();
    result = result.filter((m) =>
      m.matched_mbti.some((code) => code.toUpperCase() === mbtiCode)
    );
  }

  if (filter?.sort) {
    if (filter.sort === "name_asc") {
      result.sort((a, b) => a.name_id.localeCompare(b.name_id));
    } else if (filter.sort === "prospect_desc") {
      const rank: Record<string, number> = { High: 3, Medium: 2, Low: 1 };
      result.sort(
        (a, b) =>
          (rank[b.career_prospect] || 0) - (rank[a.career_prospect] || 0)
      );
    } else if (filter.sort === "duration_asc") {
      result.sort((a, b) => a.avg_duration_years - b.avg_duration_years);
    }
  }

  return result;
}
