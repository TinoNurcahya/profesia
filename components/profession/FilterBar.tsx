"use client";

import { Search, Filter, SlidersHorizontal, RotateCcw } from "lucide-react";
import mbtiTypes from "@/data/mbti-types.json";
import { useTranslations } from "next-intl";
import GsapScrollStagger from "@/components/motion/GsapScrollStagger";
import MagneticButton from "@/components/motion/MagneticButton";

export interface FilterBarProps {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  mbti: string;
  setMbti: (v: string) => void;
  riasec: string;
  setRiasec: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  education: string;
  setEducation: (v: string) => void;
  onReset: () => void;
}

export default function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  mbti,
  setMbti,
  riasec,
  setRiasec,
  sort,
  setSort,
  education,
  setEducation,
  onReset,
}: FilterBarProps) {
  const t = useTranslations("Profession");

  const hasActiveFilters =
    category !== "all" ||
    mbti !== "all" ||
    riasec !== "all" ||
    education.trim() !== "" ||
    search.trim() !== "" ||
    sort !== "default";

  return (
    <section
      className={`surface space-y-6 p-4 sm:p-6 transition-all duration-300 ${
        hasActiveFilters ? "border-[var(--color-brand)]/30 shadow-[0_0_20px_rgba(13,148,136,0.06)]" : ""
      }`}
      aria-label={t("catalogBadge")}
    >
      {/* Top Bar: Search Input and Sort */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 text-[var(--color-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchExample")}
            className="field-control pl-11"
          />
        </div>

        {/* Sort Select */}
        <div className="w-full sm:w-auto min-w-[200px]">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="field-control font-semibold md:min-w-56"
          >
            <option value="default">{t("sortDefault")}</option>
            <option value="wlb_desc">{t("sortWorkLife")}</option>
            <option value="name_asc">{t("sortName")}</option>
          </select>
        </div>

        {/* Reset Button (visible when any filter or search is active) */}
        {hasActiveFilters && (
          <div className="shrink-0">
            <MagneticButton strength={0.3}>
              <button
                onClick={onReset}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-[var(--color-line)] px-4 text-xs font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-soft)] sm:w-auto"
                aria-label={t("resetFilter")}
              >
                <RotateCcw className="w-3.5 h-3.5 text-teal-700" />
                <span>{t("resetFilter")}</span>
              </button>
            </MagneticButton>
          </div>
        )}
      </div>

      {/* Filter Controls Row: 4 Discovery Columns */}
      <GsapScrollStagger selector="[data-gsap='filter']" stagger={0.06} yOffset={15} triggerHook="top 95%">
        <div className="grid grid-cols-1 gap-4 border-t border-[var(--color-line)] pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Category Filter */}
          <div data-gsap="filter" className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--color-muted)] flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-teal-600" />
              {t("categoryLabel")}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="field-control text-xs font-semibold"
            >
              <option value="all">{t("filterCategory")}</option>
              <option value="teknologi">Teknologi</option>
              <option value="kesehatan">Kesehatan</option>
              <option value="seni-desain">Seni &amp; Desain</option>
              <option value="pemasaran">Pemasaran</option>
              <option value="pendidikan">Pendidikan</option>
            </select>
          </div>

          {/* RIASEC Filter */}
          <div data-gsap="filter" className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--color-muted)]">{t("riasecFilterLabel")}</label>
            <select
              value={riasec}
              onChange={(event) => setRiasec(event.target.value)}
              className="field-control text-xs font-semibold"
            >
              <option value="all">{t("allRiasec")}</option>
              {"RIASEC".split("").map((code) => (
                <option value={code} key={code}>
                  {code} — {t(`riasec${code}`)}
                </option>
              ))}
            </select>
          </div>

          {/* MBTI Quick Filter */}
          <div data-gsap="filter" className="space-y-1.5">
            <label className="text-xs font-bold text-purple-600 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-purple-500" />
              {t("mbtiFilterLabel")}
            </label>
            <select
              value={mbti}
              onChange={(e) => setMbti(e.target.value)}
              className="field-control border-purple-200 bg-purple-50 text-xs font-bold text-purple-900 focus:border-purple-600 focus:ring-purple-600/15 dark:border-purple-900/60 dark:bg-purple-950/40 dark:text-purple-300"
            >
              <option value="all">{t("allMbti")}</option>
              {mbtiTypes.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.code} - {item.name_id} ({item.group_id})
                </option>
              ))}
            </select>
          </div>

          {/* Education Filter */}
          <div data-gsap="filter" className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--color-muted)]" htmlFor="education-filter">
              {t("educationFilterLabel")}
            </label>
            <input
              id="education-filter"
              value={education}
              onChange={(event) => setEducation(event.target.value)}
              placeholder={t("educationFilterPlaceholder")}
              className="field-control text-xs"
            />
          </div>
        </div>
      </GsapScrollStagger>
    </section>
  );
}
