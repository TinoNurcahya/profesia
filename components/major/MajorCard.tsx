"use client";

import Link from "next/link";
import { Major } from "@/services/majorService";
import { ArrowRight, Clock, GraduationCap, TrendingUp, Sparkles } from "lucide-react";
import { getMbtiBadgeStyle, getMbtiRoleName } from "@/lib/mbti";

interface MajorCardProps {
  major: Major;
  locale: string;
  labels: {
    duration: string;
    detail: string;
    prospectLabel: string;
    matchedMbti: string;
  };
}

export default function MajorCard({ major, locale, labels }: MajorCardProps) {
  const isId = locale === "id";
  const name = isId ? major.name_id : major.name_en;
  const description = isId ? major.description_id : major.description_en;

  // Category badge color styles
  const categoryLower = major.category.toLowerCase();
  const categoryStyle = categoryLower.includes("saintek")
    ? "bg-sky-500/10 text-sky-400 border-sky-500/25"
    : categoryLower.includes("soshum")
    ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
    : categoryLower.includes("seni")
    ? "bg-purple-500/10 text-purple-400 border-purple-500/25"
    : "bg-teal-500/10 text-teal-400 border-teal-500/25";

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/85 dark:bg-[var(--color-surface)]/70 backdrop-blur-md p-6 transition-all duration-300 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/5 hover:-translate-y-1">
      <div className="space-y-4">
        {/* Top Badges: Category, CIP code, RIASEC & Prospects */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide border ${categoryStyle}`}
            >
              {major.category}
            </span>
            {major.cip_code && (
              <span
                title="O*NET Classification of Instructional Programs (CIP)"
                className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[var(--color-soft)] text-[var(--color-muted)] border border-[var(--color-line)]"
              >
                CIP {major.cip_code}
              </span>
            )}
            {major.riasec_code && (
              <span
                title="Holland RIASEC Code"
                className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20"
              >
                {major.riasec_code}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span>{major.career_prospect}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors line-clamp-2 leading-snug">
          {name}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[var(--color-muted)] line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Matched MBTI Chips with Role Identity Colors */}
        {major.matched_mbti && major.matched_mbti.length > 0 && (
          <div className="pt-3 border-t border-[var(--color-line)]/50">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3 h-3 text-teal-400" aria-hidden="true" />
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                {labels.matchedMbti}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {major.matched_mbti.slice(0, 4).map((code) => {
                const badgeStyle = getMbtiBadgeStyle(code);
                const roleName = getMbtiRoleName(code, locale);
                return (
                  <Link
                    key={code}
                    href={`/${locale}/mbti/result/${code}`}
                    title={`${code} (${roleName})`}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold border transition-transform hover:scale-105 ${badgeStyle}`}
                  >
                    {code}
                  </Link>
                );
              })}
              {major.matched_mbti.length > 4 && (
                <span className="px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-muted)] self-center">
                  +{major.matched_mbti.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Meta details: Minimum education & Study duration */}
        <div className="flex items-center gap-4 text-xs font-medium text-[var(--color-muted)] pt-3 border-t border-[var(--color-line)]/50">
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
            <span>{major.min_education_level}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span>
              {major.avg_duration_years} {labels.duration}
            </span>
          </span>
        </div>
      </div>

      {/* Detail Button */}
      <Link
        href={`/${locale}/majors/${major.slug}`}
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-soft)] border border-[var(--color-line)] text-xs font-bold text-[var(--color-ink)] transition-all duration-200 group-hover:bg-[var(--color-brand)] group-hover:text-[var(--color-on-brand)] group-hover:border-transparent group-hover:shadow-md"
      >
        <span>{labels.detail}</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  );
}
