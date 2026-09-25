import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Profession } from "@/services/professions";
import KineticSplitText from "@/components/motion/KineticSplitText";
import HeroMotion from "@/components/motion/HeroMotion";
import HeroCanvasGlobe from "@/components/motion/HeroCanvasGlobe";
import MagneticButton from "@/components/motion/MagneticButton";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import HeroShrinkEffect from "@/components/motion/HeroShrinkEffect";

interface LandingHeroProps {
  locale: string;
  professions?: Profession[];
}

export default async function LandingHero({ locale }: LandingHeroProps) {
  const t = await getTranslations({ locale, namespace: "Landing.hero" });

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

            <HeroMotion className="min-w-0 lg:col-span-5 relative flex items-center justify-center">
              <ParallaxLayer speed={0.15} direction="up" className="w-full flex items-center justify-center">
                <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px] aspect-square flex items-center justify-center">
                  {/* Atmospheric cosmic ambient glow behind the globe */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-8 rounded-full bg-[var(--color-brand)]/12 blur-3xl pointer-events-none"
                  />
                  <HeroCanvasGlobe className="h-full w-full" />
                </div>
              </ParallaxLayer>
            </HeroMotion>
          </div>
        </HeroShrinkEffect>
      </div>
    </section>
  );
}

