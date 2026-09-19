"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  RiasecScores,
  RIASEC_DIMENSION_NAMES,
  RiasecDimension,
} from "@/services/riasecService";
import { Compass, Sparkles, RotateCcw, ArrowRight } from "lucide-react";

export default function RiasecResultPage() {
  const locale = useLocale();
  const t = useTranslations("Riasec");
  const [result, setResult] = useState<RiasecScores | null>(null);

  useEffect(() => {
    let restoredResult: RiasecScores | null = null;
    try {
      const saved = localStorage.getItem("profesia_latest_riasec_result");
      if (saved) {
        restoredResult = JSON.parse(saved);
      }
    } catch {
      // Ignore error
    }
    queueMicrotask(() => setResult(restoredResult));
  }, []);

  if (!result) {
    return (
      <div className="page-shell max-w-3xl space-y-6 py-20 text-center">
        <Compass className="w-16 h-16 text-emerald-500 mx-auto animate-pulse" />
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">
          {t("noResult")}
        </h1>
        <p className="text-[var(--color-muted)]">
          {t("noResultDescription")}
        </p>
        <Link
          href={`/${locale}/riasec/test`}
          className="btn-primary min-h-12"
        >
          {t("start")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const dimensions: { key: RiasecDimension; score: number }[] = [
    { key: "R", score: result.realistic },
    { key: "I", score: result.investigative },
    { key: "A", score: result.artistic },
    { key: "S", score: result.social },
    { key: "E", score: result.enterprising },
    { key: "C", score: result.conventional },
  ];

  return (
    <div className="page-shell max-w-5xl space-y-12 py-12 sm:py-16">
      {/* Top Banner */}
      <header className="space-y-6 border-y border-[var(--color-line)] py-8 text-center sm:py-12">
        <p className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-emerald-700">
          {t("calculated")}
        </p>

        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
            {t("topThree")}
          </p>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-[var(--color-ink)] drop-shadow-sm">
            {result.top_3_code}
          </h1>
        </div>

        <p className="text-sm text-[var(--color-muted)] max-w-xl mx-auto leading-relaxed">
          {locale === "id"
            ? `Profil Anda didominasi oleh kombinasi dimensi ${result.top_3_code[0]}, ${result.top_3_code[1]}, dan ${result.top_3_code[2]}. Kombinasi ini memberikan gambaran presisi lingkungan kerja dan tipe profesi ideal Anda.`
            : `Your profile is dominated by ${result.top_3_code[0]}, ${result.top_3_code[1]}, and ${result.top_3_code[2]}. This combination provides precise insights into your ideal work environments.`}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href={`/${locale}/professions?riasec=${result.top_3_code}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            {t("explore")}
          </Link>
          <Link
            href={`/${locale}/riasec/test`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[var(--color-surface)] text-[var(--color-ink)] font-bold hover:bg-[var(--color-soft)] transition-colors border border-[var(--color-line)] shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            {t("retake")}
          </Link>
        </div>
      </header>

      {/* Breakdown 6 Dimension Bars */}
      <section className="space-y-8 border-t-2 border-teal-700 py-8">
        <h2 className="text-xl font-bold text-[var(--color-ink)] flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-500" />
          {t("breakdown")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dimensions.map(({ key, score }) => {
            const info = RIASEC_DIMENSION_NAMES[key];
            const isTop3 = result.top_3_code.includes(key);

            return (
              <article
                key={key}
                className={`border-t p-5 transition-colors ${
                  isTop3
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-[var(--color-soft)] border-[var(--color-line)]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm">
                      {key}
                    </span>
                    <span className="font-bold text-sm text-[var(--color-ink)]">
                      {locale === "id" ? info.name_id : info.name_en}
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-600">
                    {score}%
                  </span>
                </div>

                <div className="w-full h-2.5 bg-[var(--color-soft)] rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-teal-600 rounded-full"
                    style={{ width: `${score}%` }}
                  />
                </div>

                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  {locale === "id" ? info.description_id : info.description_en}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
