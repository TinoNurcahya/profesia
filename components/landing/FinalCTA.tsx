import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import KineticSplitText from "@/components/motion/KineticSplitText";
import MagneticButton from "@/components/motion/MagneticButton";
import SectionReveal from "@/components/motion/SectionReveal";
import ScrollTextReveal from "@/components/motion/ScrollTextReveal";
import ParallaxLayer from "@/components/motion/ParallaxLayer";

export default async function FinalCTA({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Landing.finalCta" });

  return (
    <SectionReveal direction="up">
      <section className="atlas-chapter page-shell relative overflow-hidden" aria-labelledby="closing-title">
        {/* Parallax background glow */}
        <ParallaxLayer speed={0.3} direction="up">
          <div
            aria-hidden="true"
            className="gradient-pulse absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[var(--color-brand)]/10 blur-3xl"
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.15} direction="down">
          <div
            aria-hidden="true"
            className="orb-float absolute -top-16 -left-16 h-64 w-64 rounded-full bg-[var(--color-brand)]/6 blur-3xl"
          />
        </ParallaxLayer>

        <div className="atlas-closing relative z-10 border-t border-[var(--color-line)] pt-12 pb-16">
          <KineticSplitText
            as="h2"
            id="closing-title"
            className="atlas-display max-w-4xl"
            highlightClass="atlas-serif text-[var(--color-brand)]"
            splitBy="chars"
          >
            {t("title")}
          </KineticSplitText>

          <div className="mt-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <ScrollTextReveal className="atlas-body max-w-md text-lg leading-relaxed" dimOpacity={0.12}>
              {t("description")}
            </ScrollTextReveal>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <MagneticButton strength={0.35}>
                <Link
                  href={`/${locale}/professions`}
                  className="btn-primary min-h-12 inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold shadow-md hover:shadow-xl transition-all"
                >
                  {t("primaryCta")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <Link href={`/${locale}/mbti`} className="atlas-text-link">
                  {t("secondaryCta")}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
