import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp, Briefcase } from "lucide-react";

export default async function LandingHero({ locale }: { locale: string }) {
  const tHero = await getTranslations("Landing.hero");
  const isEnglish = locale === "en";

  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Editorial Content */}
        <div className="lg:col-span-7 space-y-7 text-left">
          
          {/* Editorial Eyebrow */}
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
            {tHero("badge")}
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[1.08] text-slate-900">
            {tHero("titleLine1")}{" "}
            <span className="text-teal-700 block sm:inline">{tHero("titleLine2")}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
            {tHero("subtitle")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <Link
              href={`/${locale}/professions`}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-sm transition-colors duration-200"
            >
              <span>{tHero("ctaPrimary")}</span>
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>

            <Link
              href={`/${locale}/mbti`}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-sm font-semibold bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors duration-200"
            >
              {tHero("ctaSecondary")}
            </Link>
          </div>

          {/* Trust Matrix Chips */}
          <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium border-t border-slate-200/70">
            <div className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" aria-hidden="true" />
              <span>{isEnglish ? "Scientific MBTI & RIASEC" : "Asesmen Ilmiah MBTI & RIASEC"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" aria-hidden="true" />
              <span>{isEnglish ? "Curated Real-World Salaries" : "Riset Gaji Nyata Industri"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" aria-hidden="true" />
              <span>{isEnglish ? "Direct Major Pathways" : "Pemetaan Jurusan Kuliah"}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Architectural Live Preview Card */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-5">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    {isEnglish ? "Live Discovery Engine" : "Mesin Rekomendasi"}
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    {isEnglish ? "Primary Career Match" : "Kecocokan Karier Utama"}
                  </div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                96% Match
              </span>
            </div>

            {/* Featured Result Showcase */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">
                  {isEnglish ? "Software Architect" : "Software Architect"}
                </h3>
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded">
                  {isEnglish ? "Technology" : "Teknologi"}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {isEnglish
                  ? "Aligns strongly with INTJ strategic systems thinking and RIASEC Investigative (I) analytical problem-solving."
                  : "Sangat selaras dengan pola pikir strategis INTJ dan pemecahan masalah analitis RIASEC Investigative (I)."}
              </p>

              {/* Dimension Compatibility Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold">
                  MBTI: INTJ (Analyst)
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold">
                  RIASEC: I-R-C
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                  {isEnglish ? "High Market Demand" : "Prospek Tinggi"}
                </span>
              </div>

              {/* Salary Visual Metric */}
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">
                    {isEnglish ? "Salary Benchmark" : "Estimasi Rentang Gaji"}
                  </span>
                  <span className="font-bold text-slate-900">
                    Rp 25–45 Jt / bln
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200/80 overflow-hidden">
                  <div className="h-full rounded-full bg-teal-600 w-4/5" />
                </div>
              </div>
            </div>

            {/* Secondary Alternatives Preview Strip */}
            <div className="border-t border-slate-100 pt-3 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                {isEnglish ? "Alternative Trajectories" : "Alternatif Jalur Relevan"}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-2 flex items-center justify-between">
                  <div className="truncate font-semibold text-slate-700">Data Scientist</div>
                  <span className="font-mono text-[10px] font-bold text-teal-700">92%</span>
                </div>
                <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-2 flex items-center justify-between">
                  <div className="truncate font-semibold text-slate-700">Product Manager</div>
                  <span className="font-mono text-[10px] font-bold text-teal-700">89%</span>
                </div>
              </div>
            </div>

            {/* Micro Action Button */}
            <div className="pt-1">
              <Link
                href={`/${locale}/mbti`}
                className="w-full py-2.5 rounded-lg text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100/70 border border-teal-200/60 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isEnglish ? "Take Free Assessment" : "Mulai Tes Kecocokan Anda"}</span>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
