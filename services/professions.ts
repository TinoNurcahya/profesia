import professionsSeed from "@/data/professions-seed.json";

export interface ProfessionFilter {
  search?: string;
  category?: string;
  mbti?: string;
  prospects?: string;
  education?: string;
  salaryMin?: number;
  salaryMax?: number;
  sort?: "salary_desc" | "salary_asc" | "wlb_desc" | "name_asc";
}

export async function fetchProfessions(filter?: ProfessionFilter) {
  let list = [...professionsSeed];

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name_id.toLowerCase().includes(q) ||
        p.name_en.toLowerCase().includes(q) ||
        p.description_id.toLowerCase().includes(q) ||
        p.description_en.toLowerCase().includes(q)
    );
  }

  if (filter?.category && filter.category !== "all") {
    list = list.filter((p) => p.category_slug === filter.category);
  }

  if (filter?.prospects && filter.prospects !== "all") {
    list = list.filter((p) => p.prospects === filter.prospects);
  }

  if (filter?.mbti && filter.mbti !== "all") {
    const mbtiCode = filter.mbti.toUpperCase();
    list = list.filter((p) =>
      p.matched_mbti.some((m) => m.code === mbtiCode)
    );
  }

  if (filter?.sort) {
    if (filter.sort === "salary_desc") {
      list.sort((a, b) => b.salary_max - a.salary_max);
    } else if (filter.sort === "salary_asc") {
      list.sort((a, b) => a.salary_min - b.salary_min);
    } else if (filter.sort === "wlb_desc") {
      list.sort((a, b) => b.work_life_balance - a.work_life_balance);
    } else if (filter.sort === "name_asc") {
      list.sort((a, b) => a.name_id.localeCompare(b.name_id));
    }
  }

  return list;
}

export async function fetchProfessionBySlug(slug: string) {
  return professionsSeed.find((p) => p.slug === slug) || null;
}
