"use client";

import { Search, Filter, SlidersHorizontal, RotateCcw } from "lucide-react";
import mbtiTypes from "@/data/mbti-types.json";
import { useTranslations } from "next-intl";

export interface FilterBarProps {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  mbti: string;
  setMbti: (v: string) => void;
  riasec: string;
  setRiasec: (v: string) => void;
  prospects: string;
  setProspects: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  education: string;
  setEducation: (v: string) => void;
  salaryMin: string;
  setSalaryMin: (v: string) => void;
  salaryMax: string;
  setSalaryMax: (v: string) => void;
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
  prospects,
  setProspects,
  sort,
  setSort,
  education,
  setEducation,
  salaryMin,
  setSalaryMin,
  salaryMax,
  setSalaryMax,
  onReset,
}: FilterBarProps) {
  const t = useTranslations("Profession");
  return (
    <section className="surface space-y-6 p-4 sm:p-6" aria-label={t("catalogBadge")}>
      
      {/* Top Bar: Search Input & Sort */}
      <div className="flex flex-col gap-3 md:flex-row">
        
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
            <option value="salary_desc">{t("sortSalaryDesc")}</option>
            <option value="salary_asc">{t("sortSalaryAsc")}</option>
            <option value="wlb_desc">{t("sortWorkLife")}</option>
            <option value="name_asc">{t("sortName")}</option>
          </select>
        </div>

      </div>

      {/* Filter Controls Row */}
      <div className="grid grid-cols-1 gap-4 border-t border-[var(--color-line)] pt-5 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Category Filter */}
        <div className="space-y-1.5">
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
            <option value="seni-desain">Seni & Desain</option>
            <option value="pemasaran">Pemasaran</option>
            <option value="pendidikan">Pendidikan</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--color-muted)]">{t("riasecFilterLabel")}</label>
          <select value={riasec} onChange={(event) => setRiasec(event.target.value)} className="field-control text-xs font-semibold">
            <option value="all">{t("allRiasec")}</option>
            {"RIASEC".split("").map((code) => <option value={code} key={code}>{code} — {t(`riasec${code}`)}</option>)}
          </select>
        </div>

        {/* MBTI Quick Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-purple-600 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-500" />
            {t("mbtiFilterLabel")}
          </label>
          <select
            value={mbti}
            onChange={(e) => setMbti(e.target.value)}
            className="field-control border-purple-200 bg-purple-50 text-xs font-bold text-purple-900 focus:border-purple-600 focus:ring-purple-600/15"
          >
            <option value="all">{t("allMbti")}</option>
            {mbtiTypes.map((t) => (
              <option key={t.code} value={t.code}>
                {t.code} - {t.name_id} ({t.group_id})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--color-muted)]" htmlFor="education-filter">{t("educationFilterLabel")}</label>
          <input id="education-filter" value={education} onChange={(event) => setEducation(event.target.value)} placeholder={t("educationFilterPlaceholder")} className="field-control text-xs" />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--color-muted)]">{t("salaryFilterLabel")}</label>
          <div className="grid grid-cols-2 gap-2">
            <input type="number" min="0" inputMode="numeric" value={salaryMin} onChange={(event) => setSalaryMin(event.target.value)} placeholder={t("salaryMinPlaceholder")} aria-label={t("salaryMinLabel")} className="field-control min-w-0 text-xs" />
            <input type="number" min="0" inputMode="numeric" value={salaryMax} onChange={(event) => setSalaryMax(event.target.value)} placeholder={t("salaryMaxPlaceholder")} aria-label={t("salaryMaxLabel")} className="field-control min-w-0 text-xs" />
          </div>
        </div>

        {/* Prospects Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--color-muted)]">
            {t("prospectsLabel")}
          </label>
          <select
            value={prospects}
            onChange={(e) => setProspects(e.target.value)}
            className="field-control text-xs font-semibold"
          >
            <option value="all">{t("filterProspects")}</option>
            <option value="high">{t("highProspectsLong")}</option>
            <option value="medium">{t("mediumProspectsLong")}</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={onReset}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-[var(--color-line)] px-4 text-xs font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-soft)]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t("resetFilter")}
          </button>
        </div>

      </div>
    </section>
  );
}
