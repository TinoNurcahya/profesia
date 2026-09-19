import { getTranslations } from "next-intl/server";
import KineticSplitText from "@/components/motion/KineticSplitText";
import CounterScrub from "@/components/motion/CounterScrub";
import SectionReveal from "@/components/motion/SectionReveal";
import StaggerGridReveal from "@/components/motion/StaggerGridReveal";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import ScrollTextReveal from "@/components/motion/ScrollTextReveal";

export default async function LandingStats({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Landing.method" });

  const metrics = [
    { value: 50, suffix: "+", label: locale === "en" ? "Curated Careers" : "Karier Terkurasi" },
    { value: 16, suffix: "", label: locale === "en" ? "MBTI Archetypes" : "Arketipe MBTI" },
    { value: 6, suffix: "", label: locale === "en" ? "RIASEC Dimensions" : "Dimensi RIASEC" },
    { value: 100, suffix: "%", label: locale === "en" ? "Evidence Driven" : "Berbasis Bukti" },
  ];

  return (
    <SectionReveal direction="up">
      <section
        id="methodology"
        tabIndex={-1}
        className="atlas-chapter page-shell relative section-glow"
        aria-labelledby="method-title"
      >
        {/* Decorative parallax shapes */}
        <ParallaxLayer speed={0.2} direction="up">
          <div
            aria-hidden="true"
            className="gradient-pulse absolute top-12 -left-20 h-40 w-40 rounded-full bg-[var(--color-brand)]/6 blur-3xl"
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.12} direction="down">
          <div
            aria-hidden="true"
            className="orb-float absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[var(--color-brand)]/4 blur-3xl"
          />
        </ParallaxLayer>

        <div className="atlas-chapter-line">
          <p className="eyebrow">05 / {t("eyebrow")}</p>
        </div>

        <StaggerGridReveal>
          <div className="mb-14 grid grid-cols-2 gap-6 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 sm:grid-cols-4 sm:p-8 shadow-xs">
            {metrics.map((m, idx) => (
              <div key={idx} data-grid-item className="flex flex-col items-center text-center p-2">
                <span className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-brand)] font-mono">
                  <CounterScrub value={m.value} suffix={m.suffix} />
                </span>
                <span className="atlas-caption mt-2 text-xs sm:text-sm font-medium">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </StaggerGridReveal>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <KineticSplitText
            as="h2"
            id="method-title"
            className="atlas-heading lg:col-span-5"
          >
            {t("title")}
          </KineticSplitText>

          <dl className="lg:col-span-7 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            {["assessments", "reasoning", "limits"].map((key, idx) => (
              <div
                key={key}
                className="atlas-method-row py-6 transition-all hover:bg-[var(--color-surface)]/50 hover:px-3 rounded-lg"
              >
                <dt className="text-lg font-semibold flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-soft)] text-xs font-mono font-bold text-[var(--color-brand)]">
                    0{idx + 1}
                  </span>
                  {t(`${key}.title`)}
                </dt>
                <dd className="atlas-body text-base leading-relaxed mt-2 sm:mt-0">
                  <ScrollTextReveal as="span" dimOpacity={0.2}>
                    {t(`${key}.description`)}
                  </ScrollTextReveal>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </SectionReveal>
  );
}
