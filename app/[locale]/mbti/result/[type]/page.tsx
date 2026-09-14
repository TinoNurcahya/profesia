import Link from "next/link";
import mbtiTypes from "@/data/mbti-types.json";
import professionsSeed from "@/data/professions-seed.json";
import ShareCard from "@/components/mbti/ShareCard";
import { PersonaImage } from "@/components/mbti/PersonaImage";
import { Brain, CheckCircle2, AlertTriangle, Briefcase, ArrowLeft, RotateCcw } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function MbtiResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; type: string }>;
  searchParams: Promise<{ variant?: string }>;
}) {
  const { locale, type } = await params;
  const { variant } = await searchParams;
  const t = await getTranslations({ locale, namespace: "Mbti" });

  const mbtiCode = type.toUpperCase();
  const mbtiData = mbtiTypes.find((t) => t.code === mbtiCode);

  if (!mbtiData) {
    notFound();
  }

  const variantCode = variant === "T" ? "T" : "A";
  const fullCode = `${mbtiCode}-${variantCode}`;

  // Filter professions matching this MBTI type
  const matchedProfessions = professionsSeed.filter((p) =>
    p.matched_mbti.some((m) => m.code === mbtiCode)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back Button */}
      <div>
        <Link
          href={`/${locale}/mbti`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToIntro")}
        </Link>
      </div>

      {/* Result Hero Header (Editorial Identity Card) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-8 justify-between">
        
        <div className="space-y-6 flex-1 relative z-10 w-full">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-widest ${
              mbtiData.group_en === "Analysts" ? "bg-purple-100 text-purple-700 border-purple-200" :
              mbtiData.group_en === "Diplomats" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
              mbtiData.group_en === "Sentinels" ? "bg-sky-100 text-sky-700 border-sky-200" :
              "bg-amber-100 text-amber-700 border-amber-200"
            } border`}>
              {locale === "id" ? mbtiData.group_id : mbtiData.group_en}
            </span>
            <Link
              href={`/${locale}/mbti/test`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t("retake")}
            </Link>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-slate-900">
              {fullCode}
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-700">
              &ldquo;{locale === "id" ? mbtiData.name_id : mbtiData.name_en}&rdquo;
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl">
              {locale === "id" ? mbtiData.title_id : mbtiData.title_en}
            </p>
          </div>
        </div>

        {/* Persona Image Slot */}
        <PersonaImage mbtiCode={mbtiCode} fullCode={fullCode} />

      </div>

      {/* Grid: 5-Dimension Analytics & Description */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Col: 5 Dimensions Breakdown Chart */}
        <div className="md:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 space-y-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Brain className="w-5 h-5 text-teal-700" />
            {t("dimensions.breakdown")}
          </h3>

          <div className="space-y-5 text-xs font-bold">
            {/* Mind E vs I */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>{t("dimensions.extraverted")}</span>
                <span>{t("dimensions.introverted")}</span>
              </div>
              <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
                <div className="bg-teal-500 h-full" style={{ width: mbtiCode.includes("E") ? "70%" : "30%" }} />
                <div className="bg-purple-500 h-full" style={{ width: mbtiCode.includes("E") ? "30%" : "70%" }} />
              </div>
            </div>

            {/* Energy S vs N */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>{t("dimensions.intuitive")}</span>
                <span>{t("dimensions.observant")}</span>
              </div>
              <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: mbtiCode.includes("N") ? "75%" : "25%" }} />
                <div className="bg-amber-500 h-full" style={{ width: mbtiCode.includes("N") ? "25%" : "75%" }} />
              </div>
            </div>

            {/* Nature T vs F */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>{t("dimensions.thinking")}</span>
                <span>{t("dimensions.feeling")}</span>
              </div>
              <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
                <div className="bg-purple-600 h-full" style={{ width: mbtiCode.includes("T") ? "80%" : "20%" }} />
                <div className="bg-teal-500 h-full" style={{ width: mbtiCode.includes("T") ? "20%" : "80%" }} />
              </div>
            </div>

            {/* Tactics J vs P */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>{t("dimensions.judging")}</span>
                <span>{t("dimensions.prospecting")}</span>
              </div>
              <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
                <div className="bg-sky-500 h-full" style={{ width: mbtiCode.includes("J") ? "68%" : "32%" }} />
                <div className="bg-orange-500 h-full" style={{ width: mbtiCode.includes("J") ? "32%" : "68%" }} />
              </div>
            </div>

            {/* Identity A vs T */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>{t("dimensions.assertive")}</span>
                <span>{t("dimensions.turbulent")}</span>
              </div>
              <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
                <div className="bg-blue-600 h-full" style={{ width: variantCode === "A" ? "72%" : "28%" }} />
                <div className="bg-rose-500 h-full" style={{ width: variantCode === "A" ? "28%" : "72%" }} />
              </div>
            </div>

          </div>
        </div>

        {/* Right Col: Deep Personality Analysis */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Description */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3">
            <h3 className="text-lg font-bold text-slate-900">{t("personalityDescription")}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {locale === "id" ? mbtiData.description_id : mbtiData.description_en}
            </p>
          </div>

          {/* Strengths & Weaknesses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="bg-white border-l border-r border-b border-t-4 border-slate-200 border-t-emerald-500 rounded-3xl p-6 space-y-3">
              <h4 className="text-sm font-bold text-emerald-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {t("strengths")}
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {(locale === "id" ? mbtiData.strengths_id : mbtiData.strengths_en).map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-white border-l border-r border-b border-t-4 border-slate-200 border-t-rose-500 rounded-3xl p-6 space-y-3">
              <h4 className="text-sm font-bold text-rose-600 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {t("weaknesses")}
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {(locale === "id" ? mbtiData.weaknesses_id : mbtiData.weaknesses_en).map((w, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Work Style */}
          <div className="bg-white border-r border-b border-t border-l-4 border-slate-200 border-l-teal-600 rounded-3xl p-6 space-y-2">
                <h4 className="text-sm font-bold text-slate-900">{t("workStyle")}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {locale === "id" ? mbtiData.work_style_id : mbtiData.work_style_en}
            </p>
          </div>

        </div>

      </div>

      {/* Share Card Component */}
      <div className="pt-4">
        <ShareCard
          code={mbtiCode}
          variant={variantCode}
          name={locale === "id" ? mbtiData.name_id : mbtiData.name_en}
          group={locale === "id" ? mbtiData.group_id : mbtiData.group_en}
          color={mbtiData.color}
          badgeGradient={mbtiData.badge_gradient}
        />
      </div>

      {/* Recommended Professions Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-teal-700" />
              Rekomendasi Karir Cocok Untuk {fullCode}
            </h3>
            <p className="text-xs text-slate-500">
              Daftar pekerjaan dengan tingkat kesesuaian tinggi berdasarkan gaya kerja {mbtiCode}.
            </p>
          </div>
          <Link
            href={`/${locale}/professions?mbti=${mbtiCode}`}
            className="text-xs font-bold text-teal-700 hover:underline"
          >
            Lihat Semua ({matchedProfessions.length})
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedProfessions.slice(0, 3).map((prof) => (
            <div key={prof.id} className="bg-white border border-slate-200 hover:border-teal-500 transition-colors rounded-2xl p-6 space-y-3">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-100">
                {prof.category_name_id}
              </span>
              <h4 className="text-base font-bold text-slate-900">{prof.name_id}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{prof.description_id}</p>
              <Link
                href={`/${locale}/professions/${prof.slug}`}
                className="inline-block pt-2 text-xs font-bold text-teal-700 hover:underline"
              >
                {t("professionDetails")}
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
