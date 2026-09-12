import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";

export default async function LandingHero({ locale }: { locale: string }) {
  const tHero = await getTranslations("Landing.hero");

  return (
    <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-7 max-w-3xl mx-auto">
        <p className="text-sm font-semibold tracking-wide text-blue-600">{tHero("badge")}</p>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
          {tHero("titleLine1")}<br className="hidden sm:block" />{" "}
          <span className="text-blue-600">{tHero("titleLine2")}</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-8">{tHero("subtitle")}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href={`/${locale}/professions`} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-lg text-base font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200">
            {tHero("ctaPrimary")}<ArrowRight aria-hidden="true" className="w-5 h-5" />
          </Link>
          <Link href={`/${locale}/professions`} className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-base font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors duration-200">
            {tHero("ctaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
