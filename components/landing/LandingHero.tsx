import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Profession } from "@/services/professions";
import KineticSplitText from "@/components/motion/KineticSplitText";
import HeroMotion from "@/components/motion/HeroMotion";
import HeroCanvasGlobe from "@/components/motion/HeroCanvasGlobe";
import MagneticButton from "@/components/motion/MagneticButton";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import HeroShrinkEffect from "@/components/motion/HeroShrinkEffect";

interface LandingHeroProps {
  locale: string;
  professions: Profession[];
}

export default async function LandingHero({ locale, professions }: LandingHeroProps) {
  const t = await getTranslations({ locale, namespace: "Landing.hero" });
  const records = professions.slice(0, 3);

  return (
    <section className="atlas-hero relative overflow-hidden" aria-labelledby="atlas-title">
      {/* Floating gradient orbs for depth — full-bleed */}
      <div
        aria-hidden="true"
        className="orb-float absolute -top-24 -left-32 h-72 w-72 rounded-full bg-[var(--color-brand)]/8 blur-3xl"
      />
      <ParallaxLayer speed={0.15} direction="down">
        <div
          aria-hidden="true"
          className="orb-float-delay absolute top-1/3 -right-20 h-64 w-64 rounded-full bg-[var(--color-brand)]/6 blur-3xl"
        />
      </ParallaxLayer>

      <div className="page-shell">
        <div className="atlas-chapter-line">
          <p className="eyebrow">01 / {t("badge")}</p>
          <span className="atlas-caption hidden sm:block">{t("edition")}</span>
        </div>

        <HeroShrinkEffect>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-7 z-10">
              <KineticSplitText
                as="h1"
                id="atlas-title"
                className="atlas-display"
                highlightClass="atlas-serif"
              >
                {`${t("titleLine1")} **${t("titleLine2")}**`}
              </KineticSplitText>

              <p className="atlas-body mt-7 max-w-lg leading-relaxed">{t("subtitle")}</p>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <MagneticButton strength={0.35}>
                  <Link href={`/${locale}/professions`} className="btn-primary min-h-12 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all">
                    {t("ctaPrimary")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </MagneticButton>

                <MagneticButton strength={0.25}>
                  <Link href={`/${locale}/mbti`} className="atlas-text-link">
                    {t("ctaSecondary")}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </MagneticButton>
              </div>
            </div>

            <HeroMotion className="min-w-0 lg:col-span-5 relative flex flex-col items-center">
              <ParallaxLayer speed={0.2} direction="up">
                <div className="w-full flex items-center justify-center -mb-8 sm:-mb-12">
                  <HeroCanvasGlobe className="h-[260px] w-[260px] sm:h-[300px] sm:w-[300px]" />
                </div>
              </ParallaxLayer>

              <div
                data-hero-art
                className="atlas-index w-full relative z-10 bg-[var(--color-surface)]/80 backdrop-blur-md rounded-2xl p-6 border border-[var(--color-line)] shadow-sm"
              >
                <div className="flex items-center justify-between gap-4 border-b border-[var(--color-line)] pb-4">
                  <h2 className="atlas-caption font-semibold">{t("indexTitle")}</h2>
                  <span className="atlas-caption font-mono">{t("indexCount", { count: records.length })}</span>
                </div>

                {records.length ? (
                  <ol className="divide-y divide-[var(--color-line)]">
                    {records.map((profession, index) => (
                      <li key={profession.id}>
                        <Link
                          href={`/${locale}/professions/${profession.slug}`}
                          className="atlas-index-row group py-4 transition-transform hover:translate-x-1.5"
                        >
                          <span className="atlas-index-number font-mono" aria-hidden="true">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0">
                            <span className="atlas-caption mb-1 block">
                              {locale === "en" ? profession.category_name_en : profession.category_name_id}
                            </span>
                            <span className="atlas-index-title text-base sm:text-lg font-semibold">
                              {locale === "en" ? profession.name_en : profession.name_id}
                            </span>
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-4 w-4 text-[var(--color-brand)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                          />
                        </Link>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="atlas-body py-8">{t("empty")}</p>
                )}

                <p className="atlas-caption mt-4 leading-relaxed opacity-75">{t("indexNote")}</p>
              </div>
            </HeroMotion>
          </div>
        </HeroShrinkEffect>

        <div className="mt-12 flex items-center justify-between">
          <a className="atlas-text-link text-xs flex items-center gap-2" href="#career-story">
            <ArrowDown aria-hidden="true" className="h-4 w-4 animate-bounce" />
            {t("scroll")}
          </a>
        </div>
      </div>
    </section>
  );
}

