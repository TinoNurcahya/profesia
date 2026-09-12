import Link from "next/link";
import mbtiTypes from "@/data/mbti-types.json";
import { Brain, Sparkles, ArrowRight } from "lucide-react";

export default async function MbtiIntroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const analysts = mbtiTypes.filter((t) => t.group_en === "Analysts");
  const diplomats = mbtiTypes.filter((t) => t.group_en === "Diplomats");
  const sentinels = mbtiTypes.filter((t) => t.group_en === "Sentinels");
  const explorers = mbtiTypes.filter((t) => t.group_en === "Explorers");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold shadow-sm">
          <Brain className="w-4 h-4 text-purple-500" />
          Tes Psikometri Kepribadian Gaya 16Personalities
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Pahami Diri & Temukan Karir yang Alami Bagi Kepribadianmu
        </h1>

        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Kuis interaktif 50 pertanyaan berbasis Skala Likert 5-Poin yang mengukur 5 dimensi kepribadianmu termasuk varian identitas Assertive (-A) vs Turbulent (-T).
        </p>

        <div className="pt-2">
          <Link
            href={`/${locale}/mbti/test`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 text-white shadow-xl shadow-purple-500/25 hover:scale-105 transition-transform"
          >
            <Sparkles className="w-5 h-5" />
            Mulai Kuis MBTI (Gratis 5-7 Menit)
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* 4 Role Groups Showcase */}
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Eksplorasi 16 Tipe Kepribadian Berdasarkan 4 Rumpun
          </h2>
          <p className="text-xs text-slate-500">
            Klik pada salah satu tipe untuk melihat deskripsi, kekuatan, kelemahan, dan profesi yang cocok.
          </p>
        </div>

        {/* Group 1: Analysts */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-purple-200 dark:border-purple-800 pb-2">
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            <h3 className="text-lg font-bold text-purple-900 dark:text-purple-300">
              Analis (Analysts) — INTJ, INTP, ENTJ, ENTP
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {analysts.map((type) => (
              <div key={type.code} className="glass-card rounded-3xl p-6 border-t-4 border-t-purple-500 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-purple-600 dark:text-purple-400">{type.code}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                      {type.name_id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {type.title_id}
                  </p>
                </div>

                <Link
                  href={`/${locale}/professions?mbti=${type.code}`}
                  className="w-full text-center py-2 rounded-xl text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
                >
                  Profesi Cocok {type.code}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Group 2: Diplomats */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-emerald-200 dark:border-emerald-800 pb-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300">
              Diplomat (Diplomats) — INFJ, INFP, ENFJ, ENFP
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {diplomats.map((type) => (
              <div key={type.code} className="glass-card rounded-3xl p-6 border-t-4 border-t-emerald-500 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{type.code}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {type.name_id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {type.title_id}
                  </p>
                </div>

                <Link
                  href={`/${locale}/professions?mbti=${type.code}`}
                  className="w-full text-center py-2 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white transition-colors"
                >
                  Profesi Cocok {type.code}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Group 3: Sentinels */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-sky-200 dark:border-sky-800 pb-2">
            <span className="w-3 h-3 rounded-full bg-sky-500"></span>
            <h3 className="text-lg font-bold text-sky-900 dark:text-sky-300">
              Sentinel (Sentinels) — ISTJ, ISFJ, ESTJ, ESFJ
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sentinels.map((type) => (
              <div key={type.code} className="glass-card rounded-3xl p-6 border-t-4 border-t-sky-500 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-sky-600 dark:text-sky-400">{type.code}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                      {type.name_id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {type.title_id}
                  </p>
                </div>

                <Link
                  href={`/${locale}/professions?mbti=${type.code}`}
                  className="w-full text-center py-2 rounded-xl text-xs font-bold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 hover:bg-sky-600 hover:text-white transition-colors"
                >
                  Profesi Cocok {type.code}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Group 4: Explorers */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-amber-200 dark:border-amber-800 pb-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300">
              Penjelajah (Explorers) — ISTP, ISFP, ESTP, ESFP
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {explorers.map((type) => (
              <div key={type.code} className="glass-card rounded-3xl p-6 border-t-4 border-t-amber-500 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{type.code}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                      {type.name_id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {type.title_id}
                  </p>
                </div>

                <Link
                  href={`/${locale}/professions?mbti=${type.code}`}
                  className="w-full text-center py-2 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 hover:bg-amber-600 hover:text-white transition-colors"
                >
                  Profesi Cocok {type.code}
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
