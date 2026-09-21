import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Stars, Sparkles } from "lucide-react";
import zodiacs from "@/data/zodiacs.json";
import KineticSplitText from "@/components/motion/KineticSplitText";
import ScrollTextReveal from "@/components/motion/ScrollTextReveal";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";
import SectionReveal from "@/components/motion/SectionReveal";
import GsapScrollStagger from "@/components/motion/GsapScrollStagger";
import DrawSvgPath from "@/components/motion/DrawSvgPath";
import ZodiacAstrolabePinned, {
  type ZodiacSignData,
} from "@/components/zodiac/ZodiacAstrolabePinned";

export default async function ZodiacPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Zodiac" });
  const isEnglish = locale === "en";

  return (
    <main className="career-atlas min-h-screen">
      <ScrollProgressBar />

      {/* Chapter 00: Hero Header */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 border-b border-[var(--color-line)] overflow-hidden">
        <div className="page-shell">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Stars className="w-3.5 h-3.5" />
              {t("eyebrow")}
            </span>
            <span className="text-xs font-mono text-[var(--color-muted)]">
              Cosmic Archetype Exploration
            </span>
          </div>

          <div className="max-w-4xl mb-6">
            <KineticSplitText
              as="h1"
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-[var(--color-ink)] leading-[1.05]"
            >
              {t("title")}
            </KineticSplitText>
            <ScrollTextReveal className="text-lg sm:text-2xl text-[var(--color-muted)] leading-relaxed mt-6 max-w-3xl">
              {t("description")}
            </ScrollTextReveal>
          </div>

          <p className="max-w-2xl border-l-2 border-amber-500 pl-4 text-xs sm:text-sm text-[var(--color-muted)] mt-6">
            {t("disclaimer")}
          </p>
        </div>
      </section>

      {/* Chapter 01: Pinned Clockwork Astrolabe & Constellation Canvas */}
      <section className="border-b border-[var(--color-line)] bg-[var(--color-surface)]/30">
        <ZodiacAstrolabePinned
          locale={locale}
          zodiacs={zodiacs as ZodiacSignData[]}
        />
      </section>

      {/* Chapter 02: 12-Sign Quick Index Grid */}
      <SectionReveal direction="up">
        <section className="page-shell py-20 sm:py-28">
          <DrawSvgPath className="mb-6" />
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-line)] pb-6 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--color-ink)]">
                {t("quickFinder")}
              </h2>
              <p className="text-sm text-[var(--color-muted)] mt-1">
                {t("allElements")}
              </p>
            </div>
          </div>

          <GsapScrollStagger
            stagger={0.06}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {zodiacs.map((zodiac) => {
              const name = isEnglish ? zodiac.name_en : zodiac.name_id;
              const dates = isEnglish ? zodiac.dates_en : zodiac.dates_id;
              const element = isEnglish ? zodiac.element_en : zodiac.element_id;
              const traits = (isEnglish ? zodiac.traits_en : zodiac.traits_id).slice(0, 3);
              const summary = isEnglish ? zodiac.career_summary_en : zodiac.career_summary_id;

              return (
                <article
                  key={zodiac.slug}
                  className="group relative p-6 sm:p-8 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] hover:border-[var(--color-ink)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Clipped Corner Medallion (Bleeding off top-right, naturally cropped by rounded card border) */}
                  <div
                    className="absolute -top-7 -right-7 sm:-top-9 sm:-right-9 w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-amber-400/40 shadow-2xl pointer-events-none select-none z-0 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:border-amber-400/80 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                    aria-hidden="true"
                  >
                    <Image
                      src={`/images/zodiac/${zodiac.slug}.webp`}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 160px, 176px"
                      className="object-cover rounded-full"
                    />
                  </div>

                  <div className="relative z-10 space-y-4">
                    {/* Header: Symbol & Element Badge */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-4xl" aria-hidden="true">
                        {zodiac.symbol}
                      </span>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--color-soft)]/90 backdrop-blur-sm text-[var(--color-muted)] border border-[var(--color-line)]">
                        {element}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-[var(--color-ink)] group-hover:text-amber-600 transition-colors">
                        {name}
                      </h3>
                      <p className="text-xs font-medium text-[var(--color-muted)] mt-0.5">
                        {dates}
                      </p>
                    </div>

                    <p className="line-clamp-3 text-xs sm:text-sm leading-relaxed text-[var(--color-muted)]">
                      {summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {traits.map((trait) => (
                        <span
                          key={trait}
                          className="rounded-md bg-[var(--color-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-ink)] border border-[var(--color-line)]"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 mt-8 pt-4 border-t border-[var(--color-line)] flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-400">
                    <Link
                      href={`/${locale}/zodiac/${zodiac.slug}`}
                      className="inline-flex items-center gap-1.5 hover:underline"
                    >
                      <span>{t("view")}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Sparkles className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </article>
              );
            })}
          </GsapScrollStagger>
        </section>
      </SectionReveal>
    </main>
  );
}
