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
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <Compass className="w-16 h-16 text-emerald-500 mx-auto animate-pulse" />
        <h1 className="text-2xl font-bold text-slate-900">
          {t("noResult")}
        </h1>
        <p className="text-slate-600">
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
      <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
        <p className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-emerald-700">
          {t("calculated")}
        </p>

        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
            {t("topThree")}
          </p>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-slate-900 drop-shadow-sm">
            {result.top_3_code}
          </h1>
        </div>

        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-slate-700 font-bold hover:bg-slate-50 transition-colors border border-slate-300 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            {t("retake")}
          </Link>
        </div>
      </div>

      {/* Breakdown 6 Dimension Bars */}
      <div className="bg-white border border-slate-200 p-8 rounded-2xl space-y-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
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
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm">
                      {key}
                    </span>
                    <span className="font-bold text-sm text-slate-900">
                      {locale === "id" ? info.name_id : info.name_en}
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-600">
                    {score}%
                  </span>
                </div>

                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-teal-600 rounded-full"
                    style={{ width: `${score}%` }}
                  />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
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
