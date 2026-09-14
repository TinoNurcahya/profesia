import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight, DollarSign, Sparkles, TrendingUp } from "lucide-react";

type Profession = {
  id: number;
  slug: string;
  category_name_id: string;
  category_name_en: string;
  name_id: string;
  name_en: string;
  description_id: string;
  description_en: string;
  prospects: string;
  salary_min: number;
  salary_max: number;
  matched_mbti: { code: string }[];
};

export default async function LandingProfessions({
  locale,
  professions,
}: {
  locale: string;
  professions: Profession[];
}) {
  const t = await getTranslations("Landing.exploration");
  const isEnglish = locale === "en";

  const spotlight = professions[0];
  const listItems = professions.slice(1, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div className="space-y-2">
          <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-teal-700">
            [ 03 // EKSPLORASI KARIER ]
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-slate-900">
            {t("title")}
          </h2>
          <p className="text-slate-600 text-sm max-w-xl">
            {t("subtitle")}
          </p>
        </div>

        <Link
          href={`/${locale}/professions`}
          className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 group"
        >
          <span>{t("viewAll")}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" aria-hidden="true" />
        </Link>
      </div>

      {/* Bento Showcase: 1 Spotlight + 4 Compact Tiles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Featured Spotlight Career (5 cols) */}
        {spotlight && (
          <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Top Meta */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  {isEnglish ? "Spotlight Career" : "Sorotan Karier"}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md">
                  <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                  {t("prospectLabel", {
                    value: spotlight.prospects === "high" ? t("highProspect") : spotlight.prospects,
                  })}
                </span>
              </div>

              {/* Title & Category */}
              <div className="space-y-1">
                <div className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
                  {isEnglish ? spotlight.category_name_en : spotlight.category_name_id}
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  {isEnglish ? spotlight.name_en : spotlight.name_id}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isEnglish ? spotlight.description_en : spotlight.description_id}
              </p>

              {/* Salary Visual Box */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{t("salaryLabel")}</span>
                  <span className="font-extrabold text-slate-900 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
                    {t("salaryValue", {
                      min: (spotlight.salary_min / 1000000).toFixed(0),
                      max: (spotlight.salary_max / 1000000).toFixed(0),
                    })}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full w-5/6" />
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{t("mbtiMatchLabel")}</span>
                <div className="flex gap-1">
                  {spotlight.matched_mbti.slice(0, 3).map((m) => (
                    <span
                      key={m.code}
                      className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-mono font-bold text-[10px]"
                    >
                      {m.code}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/${locale}/professions/${spotlight.slug}`}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white transition-colors"
              >
                {t("detailCta")}
              </Link>
            </div>

          </div>
        )}

        {/* Right: 4 Compact Tiles (7 cols in 2x2 grid) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {listItems.map((prof) => (
            <Link
              key={prof.id}
              href={`/${locale}/professions/${prof.slug}`}
              className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-teal-300 hover:shadow-md transition-all duration-200 group"
            >
              <div className="space-y-3">
                
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-md">
                    {locale === "id" ? prof.category_name_id : prof.category_name_en}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-teal-700 group-hover:border-teal-300 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </div>

                {/* Profession Name */}
                <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                  {locale === "id" ? prof.name_id : prof.name_en}
                </h4>

                {/* Short description */}
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {locale === "id" ? prof.description_id : prof.description_en}
                </p>

              </div>

              {/* Footer info */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">
                  {t("salaryValue", {
                    min: (prof.salary_min / 1000000).toFixed(0),
                    max: (prof.salary_max / 1000000).toFixed(0),
                  })}
                </span>

                <div className="flex gap-1">
                  {prof.matched_mbti.slice(0, 2).map((m) => (
                    <span
                      key={m.code}
                      className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-mono font-bold text-[10px]"
                    >
                      {m.code}
                    </span>
                  ))}
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>

    </section>
  );
}
