"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { DollarSign, TrendingUp, Heart, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export interface ProfessionCardProps {
  profession: {
    id: number;
    slug: string;
    category_name_id: string;
    category_name_en: string;
    name_id: string;
    name_en: string;
    description_id: string;
    description_en: string;
    salary_min: number;
    salary_max: number;
    prospects: string;
    work_life_balance: number;
    matched_mbti: { code: string; match_score: number }[];
  };
}

export default function ProfessionCard({ profession }: ProfessionCardProps) {
  const locale = useLocale();
  const t = useTranslations("Profession");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const toggleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSaving) return;
    const nextValue = !isBookmarked;
    setIsBookmarked(nextValue);
    setIsSaving(true);
    try {
      const response = await fetch("/api/bookmarks", {
        method: nextValue ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ professionId: profession.id }),
      });
      if (response.status === 401) throw new Error("unauthorized");
      if (!response.ok) throw new Error("request_failed");
      toast.success(nextValue ? t("bookmarkSuccess") : t("bookmarkRemoved"));
    } catch (error) {
      setIsBookmarked(!nextValue);
      toast.error(error instanceof Error && error.message === "unauthorized" ? t("bookmarkLogin") : t("bookmarkError"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 hover:border-teal-500 transition-colors rounded-2xl p-6 flex flex-col justify-between space-y-4 group shadow-sm">
      <div className="space-y-3">
        {/* Header Badges */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-md text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-100">
            {locale === "id" ? profession.category_name_id : profession.category_name_en}
          </span>
          
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
              <TrendingUp className="w-3.5 h-3.5" />
              {profession.prospects === "high" ? t("highProspects") : profession.prospects}
            </span>
            <button
              onClick={toggleBookmark}
              disabled={isSaving}
              className="p-1.5 rounded-full hover:bg-slate-100 transition-colors disabled:opacity-50"
              aria-label={t("bookmarkLabel")}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isBookmarked
                    ? "text-rose-500 fill-rose-500"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Title */}
        <Link href={`/${locale}/professions/${profession.slug}`}>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
            {locale === "id" ? profession.name_id : profession.name_en}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {locale === "id" ? profession.description_id : profession.description_en}
        </p>

        {/* Salary */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">{t("salaryLabel")}</span>
          <span className="font-extrabold text-slate-900 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            Rp {(profession.salary_min / 1000000).toFixed(0)} - {(profession.salary_max / 1000000).toFixed(0)} {t("salaryUnit")}
          </span>
        </div>
      </div>

      {/* Footer Details */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs">
          <span className="font-semibold text-slate-500">{t("matchedMbti")}:</span>
          <div className="flex gap-1">
            {profession.matched_mbti.slice(0, 3).map((m) => (
              <span
                key={m.code}
                className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold text-[10px]"
              >
                {m.code}
              </span>
            ))}
          </div>
        </div>

        <Link
          href={`/${locale}/professions/${profession.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800"
        >
          {t("detail")}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
