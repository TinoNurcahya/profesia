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

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      toast.success(
          t("bookmarkSuccess")
      );
    } else {
      toast.info(
        t("bookmarkRemoved")
      );
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-4 group">
      <div className="space-y-3">
        {/* Header Badges */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
            {locale === "id" ? profession.category_name_id : profession.category_name_en}
          </span>
          
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              {profession.prospects === "high" ? t("highProspects") : profession.prospects}
            </span>
            <button
              onClick={toggleBookmark}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={t("bookmarkLabel")}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isBookmarked
                    ? "text-rose-500 fill-rose-500"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Title */}
        <Link href={`/${locale}/professions/${profession.slug}`}>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {locale === "id" ? profession.name_id : profession.name_en}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {locale === "id" ? profession.description_id : profession.description_en}
        </p>

        {/* Salary */}
        <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium">{t("salaryLabel")}</span>
          <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            Rp {(profession.salary_min / 1000000).toFixed(0)} - {(profession.salary_max / 1000000).toFixed(0)} {t("salaryUnit")}
          </span>
        </div>
      </div>

      {/* Footer Details */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs">
          <span className="font-semibold text-slate-500">{t("matchedMbti")}:</span>
          <div className="flex gap-1">
            {profession.matched_mbti.slice(0, 3).map((m) => (
              <span
                key={m.code}
                className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-[10px]"
              >
                {m.code}
              </span>
            ))}
          </div>
        </div>

        <Link
          href={`/${locale}/professions/${profession.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
        >
          {t("detail")}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
