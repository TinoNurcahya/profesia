"use client";

import { useState, useMemo, use } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import majorsSeed from "@/data/majors.json";
import { Major } from "@/services/majorService";
import { GraduationCap, Search, SearchX, ArrowRight, BookOpen, Clock, TrendingUp } from "lucide-react";

export default function MajorsPage({
  searchParams,
}: {
  searchParams: Promise<{ mbti?: string; category?: string; search?: string }>;
}) {
  const locale = useLocale();
  const t = useTranslations("Majors");
  const initialParams = use(searchParams);

  const [search, setSearch] = useState(initialParams.search || "");
  const [category, setCategory] = useState(initialParams.category || "all");
  const [mbti, setMbti] = useState(initialParams.mbti || "all");

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setMbti("all");
  };

  const filteredMajors = useMemo(() => {
    let list = [...(majorsSeed as Major[])];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.name_id.toLowerCase().includes(q) ||
          m.name_en.toLowerCase().includes(q) ||
          m.description_id.toLowerCase().includes(q) ||
          m.description_en.toLowerCase().includes(q) ||
          m.typical_subjects_id.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (category !== "all") {
      list = list.filter((m) => m.category.toLowerCase() === category.toLowerCase());
    }

    if (mbti !== "all") {
      const code = mbti.toUpperCase();
      list = list.filter((m) => m.matched_mbti.some((c) => code.startsWith(c)));
    }

    return list;
  }, [search, category, mbti]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Page */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-100 dark:border-emerald-800">
          <GraduationCap className="w-3.5 h-3.5" />
          {t("catalogBadge")}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t("catalogTitle")}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          {t("catalogSubtitle")}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">{t("allStreams")}</option>
            <option value="saintek">{t("saintek")}</option>
            <option value="soshum">{t("soshum")}</option>
            <option value="seni">{t("seni")}</option>
          </select>

          {/* MBTI Filter */}
          <select
            value={mbti}
            onChange={(e) => setMbti(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">{t("allMbti")}</option>
            {["INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-3">
        <span>
          {t("showing", { shown: filteredMajors.length, total: (majorsSeed as Major[]).length })}
        </span>
      </div>

      {/* Majors Grid */}
      {filteredMajors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMajors.map((major) => (
            <div
              key={major.id}
              className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-6 hover:shadow-xl transition-all border border-slate-200/60 dark:border-slate-800"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    {major.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    {t("prospectLabel")} {major.career_prospect}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {locale === "id" ? major.name_id : major.name_en}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {locale === "id" ? major.description_id : major.description_en}
                </p>

                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                    {major.min_education_level}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    {major.avg_duration_years} {t("duration")}
                  </span>
                </div>
              </div>

              <Link
                href={`/${locale}/majors/${major.slug}`}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 dark:bg-slate-800 text-white hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-colors"
              >
                {t("detail")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto my-12">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {t("notFound")}
          </h3>
          <p className="text-xs text-slate-500">
            {t("notFoundDescription")}
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
          >
            {t("resetFilter")}
          </button>
        </div>
      )}
    </div>
  );
}
