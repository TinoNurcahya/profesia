import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Compass } from "lucide-react";

export default async function FinalCTA({ locale }: { locale: string }) {
  const t = await getTranslations("Landing.finalCta");

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl border border-slate-800 bg-slate-900 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-xl space-y-8">
        
        {/* Architectural Subtle Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(#475569 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl space-y-4">
          
          {/* Editorial Eyebrow */}
          <p className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-teal-400">
            {t("badge")}
          </p>

          {/* Title */}
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-tight text-white">
            {t("title")}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            {t("description")}
          </p>

        </div>

        {/* Dual Actions */}
        <div className="relative z-10 flex flex-wrap items-center gap-3 pt-2">
          <Link
            href={`/${locale}/mbti`}
            className="px-7 py-3.5 rounded-xl font-bold bg-teal-700 hover:bg-teal-600 text-white shadow-md transition-colors text-sm inline-flex items-center gap-2.5"
          >
            <span>{t("primaryCta")}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          <Link
            href={`/${locale}/zodiac`}
            className="px-7 py-3.5 rounded-xl font-semibold bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors text-sm inline-flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-teal-400" aria-hidden="true" />
            <span>{t("secondaryCta")}</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
