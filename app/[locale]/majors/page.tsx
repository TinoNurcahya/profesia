"use client";

import { useState, useMemo, use } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import majorsSeed from "@/data/majors.json";
import { Major } from "@/services/majorService";
import { Search, SearchX, ArrowRight, BookOpen, Clock, TrendingUp } from "lucide-react";
import TextReveal from "@/components/motion/TextReveal";

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

      {/* Filter Bar */}
      <div className="surface space-y-4 p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[var(--color-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="field-control pl-10 text-xs"
            />
          </div>

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="field-control text-xs"
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
            className="field-control text-xs"
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
      <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-muted)] border-b border-[var(--color-line)] pb-3">
        <span>
          {t("showing", { shown: filteredMajors.length, total: (majorsSeed as Major[]).length })}
        </span>
      </div>

      {/* Majors Grid */}
      {filteredMajors.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredMajors.map((major) => (
            <div
              key={major.id}
              className="flex flex-col justify-between space-y-6 border-t border-[var(--color-line)] py-6 transition-colors hover:border-teal-700"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-700">
                    {major.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-muted)]">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    {t("prospectLabel")} {major.career_prospect}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--color-ink)] leading-snug">
                  {locale === "id" ? major.name_id : major.name_en}
                </h3>

                <p className="text-xs text-[var(--color-muted)] line-clamp-3 leading-relaxed">
                  {locale === "id" ? major.description_id : major.description_en}
                </p>

                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs font-medium text-[var(--color-muted)] pt-2 border-t border-[var(--color-line)]">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-teal-600" />
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
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-slate-950 text-xs font-bold text-white transition-colors hover:bg-teal-700"
              >
                {t("detail")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto my-12">
          <div className="w-12 h-12 mx-auto rounded-full bg-[var(--color-soft)] flex items-center justify-center text-[var(--color-muted)]">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            {t("notFound")}
          </h3>
          <p className="text-xs text-[var(--color-muted)]">
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
