import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Profession } from "@/services/professions";
import TextReveal from "@/components/motion/TextReveal";
import HeroMotion from "@/components/motion/HeroMotion";

interface LandingHeroProps { locale: string; professions: Profession[] }

export default async function LandingHero({ locale, professions }: LandingHeroProps) {
  const t = await getTranslations({ locale, namespace: "Landing.hero" });
  const records = professions.slice(0, 3);
  return (
    <section className="atlas-hero page-shell" aria-labelledby="atlas-title">
      <div className="atlas-chapter-line"><p className="eyebrow">01 / {t("badge")}</p><span className="atlas-caption hidden sm:block">{t("edition")}</span></div>
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-7">
          <TextReveal as="h1" id="atlas-title" className="atlas-display" highlightClass="atlas-serif">{`${t("titleLine1")} **${t("titleLine2")}**`}</TextReveal>
          <p className="atlas-body mt-7 max-w-lg">{t("subtitle")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link href={`/${locale}/professions`} className="btn-primary min-h-12">{t("ctaPrimary")}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href={`/${locale}/mbti`} className="atlas-text-link">{t("ctaSecondary")}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
        <HeroMotion className="min-w-0 lg:col-span-5">
          <div data-hero-art className="atlas-index">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--color-line)] pb-5"><h2 className="atlas-caption">{t("indexTitle")}</h2><span className="atlas-caption">{t("indexCount", { count: records.length })}</span></div>
            {records.length ? <ol>{records.map((profession, index) => (
              <li key={profession.id}>
                <Link href={`/${locale}/professions/${profession.slug}`} className="atlas-index-row group">
                  <span className="atlas-index-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span className="min-w-0"><span className="atlas-caption mb-2 block">{locale === "en" ? profession.category_name_en : profession.category_name_id}</span><span className="atlas-index-title">{locale === "en" ? profession.name_en : profession.name_id}</span></span>
                  <ArrowUpRight aria-hidden="true" className="h-5 w-5 text-[var(--color-brand)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </li>
            ))}</ol> : <p className="atlas-body py-8">{t("empty")}</p>}
            <p className="atlas-caption mt-5 max-w-xs leading-relaxed">{t("indexNote")}</p>
          </div>
        </HeroMotion>
      </div>
      <a className="atlas-text-link mt-14 w-fit text-xs" href="#career-story"><ArrowDown aria-hidden="true" className="h-4 w-4" />{t("scroll")}</a>
    </section>
  );
}
