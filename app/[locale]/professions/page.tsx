"use client";

import { useState, useMemo, use, useEffect } from "react";
import { useTranslations } from "next-intl";
import ProfessionCard from "@/components/profession/ProfessionCard";
import FilterBar from "@/components/profession/FilterBar";
import professionsSeed from "@/data/professions-seed.json";
import { SearchX } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import TextReveal from "@/components/motion/TextReveal";

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
    <div className="page-shell space-y-10 py-12 sm:py-16">
      
      {/* Header Page */}
      <div className="page-intro">
        <p className="eyebrow">
          {t("catalogBadge")}
        </p>
        <TextReveal as="h1" className="page-title">
          {t("catalogTitle")}
        </TextReveal>
        <TextReveal as="p" delay={0.1} className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
          {t("catalogSubtitle")}
        </TextReveal>
      </div>

      {catalogState === "loading" && <p className="text-xs text-[var(--color-muted)]" role="status">{t("catalogLoading")}</p>}
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
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] pb-4 text-xs font-semibold text-[var(--color-muted)]">
        <span>{t("showing", { shown: filteredProfessions.length, total: professions.length })}</span>
        {mbti !== "all" && (
          <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-700 font-bold">
            {t("activeMbti", { value: mbti })}
          </span>
        )}
      </div>

      {/* Professions Grid */}
      {filteredProfessions.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredProfessions.map((prof) => (
            <ProfessionCard key={prof.id} profession={prof} />
          ))}
        </div>
      ) : (
        <div className="surface mx-auto my-12 max-w-md space-y-4 p-8 text-center sm:p-12">
          <div className="w-12 h-12 mx-auto rounded-full bg-[var(--color-soft)] flex items-center justify-center text-[var(--color-muted)]">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">{t("notFound")}</h3>
          <p className="text-xs text-[var(--color-muted)]">
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
