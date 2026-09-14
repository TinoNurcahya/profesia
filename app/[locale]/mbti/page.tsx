import Link from "next/link";
import mbtiTypes from "@/data/mbti-types.json";
import { Sparkles, ArrowRight } from "lucide-react";

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
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
          Tes Psikometri Kepribadian Gaya 16Personalities
        </p>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Pahami Diri & Temukan Karir yang Alami Bagi Kepribadianmu
        </h1>

        <p className="text-base text-slate-600 leading-relaxed">
          Kuis interaktif 50 pertanyaan berbasis Skala Likert 5-Poin yang mengukur 5 dimensi kepribadianmu termasuk varian identitas Assertive (-A) vs Turbulent (-T).
        </p>

        <div className="pt-2">
          <Link
            href={`/${locale}/mbti/test`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-extrabold bg-teal-700 hover:bg-teal-800 text-white transition-colors"
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
          <h2 className="text-2xl font-bold text-slate-900">
            Eksplorasi 16 Tipe Kepribadian Berdasarkan 4 Rumpun
          </h2>
          <p className="text-xs text-slate-500">
            Klik pada salah satu tipe untuk melihat deskripsi, kekuatan, kelemahan, dan profesi yang cocok.
          </p>
        </div>

        {/* Group 1: Analysts */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-purple-200 pb-2">
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            <h3 className="text-lg font-bold text-purple-900">
              Analis (Analysts) — INTJ, INTP, ENTJ, ENTP
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {analysts.map((type) => (
              <div key={type.code} className="glass-card rounded-3xl p-6 border-t-4 border-t-purple-500 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-purple-600">{type.code}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
                      {type.name_id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {type.title_id}
                  </p>
                </div>

                <Link
                  href={`/${locale}/professions?mbti=${type.code}`}
                  className="w-full text-center py-2 rounded-xl text-xs font-bold bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white transition-colors"
                >
                  Profesi Cocok {type.code}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Group 2: Diplomats */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-emerald-200 pb-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <h3 className="text-lg font-bold text-emerald-900">
              Diplomat (Diplomats) — INFJ, INFP, ENFJ, ENFP
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {diplomats.map((type) => (
              <div key={type.code} className="glass-card rounded-3xl p-6 border-t-4 border-t-emerald-500 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-emerald-600">{type.code}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                      {type.name_id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {type.title_id}
                  </p>
                </div>

                <Link
                  href={`/${locale}/professions?mbti=${type.code}`}
                  className="w-full text-center py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                >
                  Profesi Cocok {type.code}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Group 3: Sentinels */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-sky-200 pb-2">
            <span className="w-3 h-3 rounded-full bg-sky-500"></span>
            <h3 className="text-lg font-bold text-sky-900">
              Sentinel (Sentinels) — ISTJ, ISFJ, ESTJ, ESFJ
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sentinels.map((type) => (
              <div key={type.code} className="glass-card rounded-3xl p-6 border-t-4 border-t-sky-500 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-sky-600">{type.code}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-100 text-sky-700">
                      {type.name_id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {type.title_id}
                  </p>
                </div>

                <Link
                  href={`/${locale}/professions?mbti=${type.code}`}
                  className="w-full text-center py-2 rounded-xl text-xs font-bold bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white transition-colors"
                >
                  Profesi Cocok {type.code}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Group 4: Explorers */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <h3 className="text-lg font-bold text-amber-900">
              Penjelajah (Explorers) — ISTP, ISFP, ESTP, ESFP
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {explorers.map((type) => (
              <div key={type.code} className="glass-card rounded-3xl p-6 border-t-4 border-t-amber-500 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-amber-600">{type.code}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                      {type.name_id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {type.title_id}
                  </p>
                </div>

                <Link
                  href={`/${locale}/professions?mbti=${type.code}`}
                  className="w-full text-center py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white transition-colors"
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
