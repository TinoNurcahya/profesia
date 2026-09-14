"use client";

import { useState, useMemo, use, useEffect } from "react";
import { useTranslations } from "next-intl";
import ProfessionCard from "@/components/profession/ProfessionCard";
import FilterBar from "@/components/profession/FilterBar";
import professionsSeed from "@/data/professions-seed.json";
import { SearchX } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function ProfessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ mbti?: string; riasec?: string; category?: string; search?: string; prospects?: string; education?: string; salaryMin?: string; salaryMax?: string; sort?: string }>;
}) {
  const initialParams = use(searchParams);
  const t = useTranslations("Profession");
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState(initialParams.search || "");
  const [category, setCategory] = useState(initialParams.category || "all");
  const [mbti, setMbti] = useState(initialParams.mbti || "all");
  const [riasec, setRiasec] = useState(initialParams.riasec || "all");
  const [prospects, setProspects] = useState(initialParams.prospects || "all");
  const [education, setEducation] = useState(initialParams.education || "");
  const [salaryMin, setSalaryMin] = useState(initialParams.salaryMin || "");
  const [salaryMax, setSalaryMax] = useState(initialParams.salaryMax || "");
  const [sort, setSort] = useState(initialParams.sort || "default");
  const [professions, setProfessions] = useState(professionsSeed);
  const [catalogState, setCatalogState] = useState<"loading" | "ready" | "fallback">("loading");

  useEffect(() => {
    let active = true;
    fetch("/api/professions")
      .then((response) => response.json() as Promise<{ success?: boolean; data?: typeof professionsSeed }>)
      .then((result) => { if (!active) return; if (result.success && result.data?.length) { setProfessions(result.data); setCatalogState("ready"); } else setCatalogState("fallback"); })
      .catch(() => { if (active) setCatalogState("fallback"); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    const values = { search: search.trim(), category, mbti, riasec, prospects, education: education.trim(), salaryMin, salaryMax, sort };
    Object.entries(values).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "default") params.set(key, value);
    });
    const query = params.toString();
    const timer = window.setTimeout(() => router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false }), 200);
    return () => window.clearTimeout(timer);
  }, [category, education, mbti, pathname, prospects, riasec, router, salaryMax, salaryMin, search, sort]);

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setMbti("all");
    setRiasec("all");
    setProspects("all");
    setEducation("");
    setSalaryMin("");
    setSalaryMax("");
    setSort("default");
  };

  const filteredProfessions = useMemo(() => {
    let list = [...professions];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name_id.toLowerCase().includes(q) ||
          p.name_en.toLowerCase().includes(q) ||
          p.description_id.toLowerCase().includes(q) ||
          p.description_en.toLowerCase().includes(q) ||
          p.skills_id.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (category !== "all") {
      list = list.filter((p) => p.category_slug === category);
    }

    if (prospects !== "all") {
      list = list.filter((p) => p.prospects === prospects);
    }

    if (mbti !== "all") {
      const code = mbti.toUpperCase();
      list = list.filter((p) => p.matched_mbti.some((m) => m.code === code));
    }

    if (riasec !== "all") {
      const categoryRiasec: Record<string, string[]> = { teknologi: ["I", "R", "C"], kesehatan: ["S", "I", "R"], "seni-desain": ["A", "I", "S"], pemasaran: ["E", "A", "S"], pendidikan: ["S", "A", "E"] };
      list = list.filter((profession) => categoryRiasec[profession.category_slug]?.includes(riasec));
    }

    if (education.trim()) {
      const value = education.toLowerCase();
      list = list.filter((profession) => profession.education_id.toLowerCase().includes(value) || profession.education_en.toLowerCase().includes(value));
    }

    const minimum = Number(salaryMin);
    const maximum = Number(salaryMax);
    if (salaryMin && Number.isFinite(minimum)) list = list.filter((profession) => profession.salary_max >= minimum);
    if (salaryMax && Number.isFinite(maximum)) list = list.filter((profession) => profession.salary_min <= maximum);

    if (sort === "salary_desc") {
      list.sort((a, b) => b.salary_max - a.salary_max);
    } else if (sort === "salary_asc") {
      list.sort((a, b) => a.salary_min - b.salary_min);
    } else if (sort === "wlb_desc") {
      list.sort((a, b) => b.work_life_balance - a.work_life_balance);
    } else if (sort === "name_asc") {
      list.sort((a, b) => a.name_id.localeCompare(b.name_id));
    }

    return list;
  }, [search, category, mbti, riasec, prospects, education, salaryMin, salaryMax, sort, professions]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Page */}
      <div className="space-y-3">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
          {t("catalogBadge")}
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t("catalogTitle")}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          {t("catalogSubtitle")}
        </p>
      </div>

      {catalogState === "loading" && <p className="text-xs text-slate-500" role="status">{t("catalogLoading")}</p>}
      {catalogState === "fallback" && <p className="text-xs text-amber-700" role="status">{t("catalogError")}</p>}

      {/* Filter Component */}
      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        mbti={mbti}
        setMbti={setMbti}
        riasec={riasec}
        setRiasec={setRiasec}
        prospects={prospects}
        setProspects={setProspects}
        sort={sort}
        setSort={setSort}
        education={education}
        setEducation={setEducation}
        salaryMin={salaryMin}
        setSalaryMin={setSalaryMin}
        salaryMax={salaryMax}
        setSalaryMax={setSalaryMax}
        onReset={handleReset}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 border-b border-slate-200 pb-3">
        <span>{t("showing", { shown: filteredProfessions.length, total: professions.length })}</span>
        {mbti !== "all" && (
          <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-700 font-bold">
            {t("activeMbti", { value: mbti })}
          </span>
        )}
      </div>

      {/* Professions Grid */}
      {filteredProfessions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessions.map((prof) => (
            <ProfessionCard key={prof.id} profession={prof} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto my-12">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{t("notFound")}</h3>
          <p className="text-xs text-slate-500">
            {t("notFoundDescription")}
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-700 text-white hover:bg-teal-800 transition-colors"
          >
            {t("resetFilter")}
          </button>
        </div>
      )}

    </div>
  );
}
