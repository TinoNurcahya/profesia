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
    <div className="glass-card rounded-3xl p-6 space-y-6">
      
      {/* Top Bar: Search Input & Sort */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchExample")}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
          />
        </div>

        {/* Sort Select */}
        <div className="w-full sm:w-auto min-w-[200px]">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
        
        {/* Category Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-teal-600" />
            {t("categoryLabel")}
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
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
          <label className="text-xs font-bold text-slate-600">{t("riasecFilterLabel")}</label>
          <select value={riasec} onChange={(event) => setRiasec(event.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600">
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
            className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50 border border-purple-200 text-xs font-bold text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          <label className="text-xs font-bold text-slate-600" htmlFor="education-filter">{t("educationFilterLabel")}</label>
          <input id="education-filter" value={education} onChange={(event) => setEducation(event.target.value)} placeholder={t("educationFilterPlaceholder")} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600" />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600">{t("salaryFilterLabel")}</label>
          <div className="grid grid-cols-2 gap-2">
            <input type="number" min="0" inputMode="numeric" value={salaryMin} onChange={(event) => setSalaryMin(event.target.value)} placeholder={t("salaryMinPlaceholder")} aria-label={t("salaryMinLabel")} className="w-full px-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-600" />
            <input type="number" min="0" inputMode="numeric" value={salaryMax} onChange={(event) => setSalaryMax(event.target.value)} placeholder={t("salaryMaxPlaceholder")} aria-label={t("salaryMaxLabel")} className="w-full px-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-600" />
          </div>
        </div>

        {/* Prospects Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600">
            {t("prospectsLabel")}
          </label>
          <select
            value={prospects}
            onChange={(e) => setProspects(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
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
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t("resetFilter")}
          </button>
        </div>

      </div>
    </div>
  );
}
