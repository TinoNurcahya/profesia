"use client";

import { useState, useMemo, use } from "react";
import { useTranslations } from "next-intl";
import ProfessionCard from "@/components/profession/ProfessionCard";
import FilterBar from "@/components/profession/FilterBar";
import professionsSeed from "@/data/professions-seed.json";
import { Briefcase, SearchX } from "lucide-react";

export default function ProfessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ mbti?: string; category?: string; search?: string }>;
}) {
  const initialParams = use(searchParams);
  const t = useTranslations("Profession");

  const [search, setSearch] = useState(initialParams.search || "");
  const [category, setCategory] = useState(initialParams.category || "all");
  const [mbti, setMbti] = useState(initialParams.mbti || "all");
  const [prospects, setProspects] = useState("all");
  const [sort, setSort] = useState("default");

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setMbti("all");
    setProspects("all");
    setSort("default");
  };

  const filteredProfessions = useMemo(() => {
    let list = [...professionsSeed];

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
  }, [search, category, mbti, prospects, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Page */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold border border-indigo-100 dark:border-indigo-800">
          <Briefcase className="w-3.5 h-3.5" />
          {t("catalogBadge")}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t("catalogTitle")}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          {t("catalogSubtitle")}
        </p>
      </div>

      {/* Filter Component */}
      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        mbti={mbti}
        setMbti={setMbti}
        prospects={prospects}
        setProspects={setProspects}
        sort={sort}
        setSort={setSort}
        onReset={handleReset}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-3">
        <span>{t("showing", { shown: filteredProfessions.length, total: professionsSeed.length })}</span>
        {mbti !== "all" && (
          <span className="px-2.5 py-1 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
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
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t("notFound")}</h3>
          <p className="text-xs text-slate-500">
            {t("notFoundDescription")}
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
          >
            {t("resetFilter")}
          </button>
        </div>
      )}

    </div>
  );
}
