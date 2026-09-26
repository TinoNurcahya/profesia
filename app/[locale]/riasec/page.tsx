import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ShieldCheck } from "lucide-react";
import KineticSplitText from "@/components/motion/KineticSplitText";
import ScrollTextReveal from "@/components/motion/ScrollTextReveal";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";
import SectionReveal from "@/components/motion/SectionReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import DrawSvgPath from "@/components/motion/DrawSvgPath";
import HollandHexagonStoryboard from "@/components/riasec/HollandHexagonStoryboard";
import HollandSynergyExplorer from "@/components/riasec/HollandSynergyExplorer";

export default async function RiasecPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RiasecIntro" });

  return (
    <main className="career-atlas min-h-screen">
      <ScrollProgressBar />

      {/* Chapter 00: Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 border-b border-[var(--color-line)] overflow-hidden">
        <div className="page-shell">
          {/* Kinetic Headline */}
          <div className="max-w-4xl mb-8">
            <KineticSplitText
              as="h1"
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-[var(--color-ink)] leading-[1.05]"
            >
              {t("heroTitle")}
            </KineticSplitText>
            <ScrollTextReveal className="text-lg sm:text-2xl text-[var(--color-muted)] leading-relaxed mt-6 max-w-3xl">
              {t("heroSubtitle")}
            </ScrollTextReveal>
          </div>

          {/* Action Callouts */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <MagneticButton>
              <Link
                href={`/${locale}/riasec/test`}
                className="btn-primary min-h-12 px-8 text-base shadow-lg shadow-emerald-600/20"
              >
                <span>{t("heroCtaTest")}</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </MagneticButton>

            <a
              href="#storyboard"
              className="btn-secondary min-h-12 px-6 text-base"
            >
              <span>{t("heroCtaStory")}</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-[var(--color-line)] flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-[var(--color-muted)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t("quickStats")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 01: Holland Hexagonal Philosophy */}
      <SectionReveal direction="up">
        <section className="page-shell py-16 sm:py-24 border-b border-[var(--color-line)]">
          <DrawSvgPath className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--color-ink)] leading-tight">
                {t("philosophyTitle")}
              </h2>
            </div>
            <div className="lg:col-span-6 space-y-6">
              <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
                {t("philosophyDescription")}
              </p>

              {/* Hexagonal Congruence Principle Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-soft)]">
                  <span className="text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 block mb-1">
                    {locale === "en" ? "Adjacent Synergies" : "Sinergi Berdekatan"}
                  </span>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    {locale === "en"
                      ? "Adjacent dimensions (e.g. R & I, or E & C) naturally reinforce each other in industry workflows."
                      : "Dimensi yang bersebelahan (misal R & I, atau E & C) saling memperkuat dalam alur kerja industri."}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-soft)]">
                  <span className="text-xs font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400 block mb-1">
                    {locale === "en" ? "Opposite Balances" : "Keseimbangan Berseberangan"}
                  </span>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    {locale === "en"
                      ? "Opposite pairs (e.g. Realistic vs Social) create powerful dynamic balancing in high-performing teams."
                      : "Pasangan berseberangan (misal Realistic vs Social) menciptakan penyeimbang dinamis dalam tim unggul."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Chapter 02: Pinned Holland Hexagon Storyboard */}
      <section id="storyboard" className="page-shell border-b border-[var(--color-line)]">
        <div className="pt-16 sm:pt-20">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--color-ink)]">
            {t("storyTitle")}
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] mt-4 max-w-2xl">
            {t("storySubtitle")}
          </p>
        </div>

        {/* Pinned Scroll Sequence */}
        <HollandHexagonStoryboard locale={locale} />
      </section>

      {/* Chapter 03: Synergistic Archetypes Explorer */}
      <SectionReveal direction="up">
        <section className="page-shell py-16 sm:py-24 border-b border-[var(--color-line)] relative z-10 bg-[var(--color-canvas)]">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--color-ink)]">
              {t("synergyTitle")}
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-muted)] mt-4">
              {t("synergySubtitle")}
            </p>
          </div>

          <HollandSynergyExplorer locale={locale} />
        </section>
      </SectionReveal>

      {/* Chapter 04: Final Launchpad Assessment CTA */}
      <section className="page-shell py-20 sm:py-32">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8 sm:p-16 text-center shadow-2xl">
          {/* Background Ambient Glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-500/15 filter blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--color-ink)]">
              {t("ctaTitle")}
            </h2>

            <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
              {t("ctaSubtitle")}
            </p>

            <div className="pt-6 flex justify-center">
              <MagneticButton>
                <Link
                  href={`/${locale}/riasec/test`}
                  className="btn-primary min-h-14 px-10 text-base font-bold shadow-xl shadow-emerald-600/20"
                >
                  <span>{t("ctaButton")}</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
