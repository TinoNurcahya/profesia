"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  RiasecScores,
  RIASEC_DIMENSION_NAMES,
  RiasecDimension,
} from "@/services/riasecService";
import { Compass, Sparkles, RotateCcw, ArrowRight, Award } from "lucide-react";

export default function RiasecResultPage() {
  const locale = useLocale();
  const t = useTranslations("Riasec");
  const [result, setResult] = useState<RiasecScores | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("profesia_latest_riasec_result");
      if (saved) {
        setResult(JSON.parse(saved));
      }
    } catch {
      // Ignore error
    }
  }, []);

  if (!result) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <Compass className="w-16 h-16 text-emerald-500 mx-auto animate-pulse" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t("noResult")}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {t("noResultDescription")}
        </p>
        <Link
          href={`/${locale}/riasec/test`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors shadow-lg"
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6 bg-gradient-to-br from-emerald-900/40 via-slate-900/90 to-teal-950/80 border border-emerald-500/30">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          <Award className="w-4 h-4 text-emerald-400" />
          {t("calculated")}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            {t("topThree")}
          </p>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white drop-shadow-md">
            {result.top_3_code}
          </h1>
        </div>

        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          {locale === "id"
            ? `Profil Anda didominasi oleh kombinasi dimensi ${result.top_3_code[0]}, ${result.top_3_code[1]}, dan ${result.top_3_code[2]}. Kombinasi ini memberikan gambaran presisi lingkungan kerja dan tipe profesi ideal Anda.`
            : `Your profile is dominated by ${result.top_3_code[0]}, ${result.top_3_code[1]}, and ${result.top_3_code[2]}. This combination provides precise insights into your ideal work environments.`}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href={`/${locale}/professions?riasec=${result.top_3_code}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            {t("explore")}
          </Link>
          <Link
            href={`/${locale}/riasec/test`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 transition-colors border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            {t("retake")}
          </Link>
        </div>
      </div>

      {/* Breakdown 6 Dimension Bars */}
      <div className="glass-panel p-8 rounded-3xl space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-500" />
          {t("breakdown")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dimensions.map(({ key, score }) => {
            const info = RIASEC_DIMENSION_NAMES[key];
            const isTop3 = result.top_3_code.includes(key);

            return (
              <div
                key={key}
                className={`p-5 rounded-2xl border transition-all ${
                  isTop3
                    ? "bg-emerald-950/20 border-emerald-500/40"
                    : "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center text-sm">
                      {key}
                    </span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {locale === "id" ? info.name_id : info.name_en}
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    {score}%
                  </span>
                </div>

                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    style={{ width: `${score}%` }}
                  />
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {locale === "id" ? info.description_id : info.description_en}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
