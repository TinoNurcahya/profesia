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
    <article className="group flex min-w-0 flex-col justify-between gap-5 border-t border-[var(--color-line)] py-6 transition-colors hover:border-teal-700">
      <div className="space-y-3">
        {/* Classification and save action */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-700">
            {locale === "id" ? profession.category_name_id : profession.category_name_en}
          </span>
          
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
              <TrendingUp className="w-3.5 h-3.5" />
              {profession.prospects === "high" ? t("highProspects") : profession.prospects}
            </span>
            <button
              onClick={toggleBookmark}
              disabled={isSaving}
              className="grid h-10 w-10 place-items-center rounded-[10px] text-[var(--color-muted)] transition-colors hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)] disabled:opacity-50"
              aria-label={t("bookmarkLabel")}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isBookmarked
                    ? "text-rose-500 fill-rose-500"
                    : "text-[var(--color-muted)] hover:text-[var(--color-muted)]"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Title */}
        <Link href={`/${locale}/professions/${profession.slug}`}>
          <h3 className="text-2xl font-bold leading-tight tracking-[-0.025em] text-[var(--color-ink)] transition-colors group-hover:text-teal-700">
            {locale === "id" ? profession.name_id : profession.name_en}
          </h3>
        </Link>

        {/* Description */}
        <p className="line-clamp-3 text-sm leading-relaxed text-[var(--color-muted)]">
          {locale === "id" ? profession.description_id : profession.description_en}
        </p>

        {/* Salary */}
        <div className="flex items-end justify-between gap-4 border-l-2 border-teal-700 pl-3 text-xs">
          <span className="text-[var(--color-muted)] font-medium">{t("salaryLabel")}</span>
          <span className="flex items-center gap-1 text-right font-bold text-[var(--color-ink)]">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            Rp {(profession.salary_min / 1000000).toFixed(0)} - {(profession.salary_max / 1000000).toFixed(0)} {t("salaryUnit")}
          </span>
        </div>
      </div>

      {/* Footer Details */}
      <div className="flex items-end justify-between gap-4 border-t border-[var(--color-line)] pt-4">
        <div className="flex items-center gap-1 text-xs">
          <span className="font-semibold text-[var(--color-muted)]">{t("matchedMbti")}:</span>
          <div className="flex gap-1">
            {profession.matched_mbti.slice(0, 3).map((m) => (
              <span
                key={m.code}
                className="rounded-md bg-purple-100 px-1.5 py-0.5 text-[10px] font-bold text-purple-700"
              >
                {m.code}
              </span>
            ))}
          </div>
        </div>

        <Link
          href={`/${locale}/professions/${profession.slug}`}
          className="inline-flex min-h-10 items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900"
        >
          {t("detail")}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
