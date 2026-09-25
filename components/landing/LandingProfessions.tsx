import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Profession } from "@/services/professions";
import KineticSplitText from "@/components/motion/KineticSplitText";
import CardTilt3D from "@/components/motion/CardTilt3D";
import MagneticButton from "@/components/motion/MagneticButton";
import GsapScrollStagger from "@/components/motion/GsapScrollStagger";
import SectionReveal from "@/components/motion/SectionReveal";
import ParallaxLayer from "@/components/motion/ParallaxLayer";

export default async function LandingProfessions({
  locale,
  professions,
}: {
  locale: string;
  professions: Profession[];
}) {
  const t = await getTranslations({ locale, namespace: "Landing.exploration" });
  const [featured, ...others] = professions.slice(0, 3);

  return (
    <SectionReveal direction="scale">
      <section
        id="career-atlas"
        tabIndex={-1}
        className="atlas-chapter page-shell relative section-glow"
        aria-labelledby="professions-title"
      >
        {/* Decorative parallax orb */}
        <ParallaxLayer speed={0.2} direction="down">
          <div
            aria-hidden="true"
            className="gradient-pulse absolute -top-16 right-0 h-48 w-48 rounded-full bg-[var(--color-brand)]/6 blur-3xl"
          />
        </ParallaxLayer>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <KineticSplitText as="h2" id="professions-title" className="atlas-heading">
              {t("title")}
            </KineticSplitText>
          </div>
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <p className="atlas-body leading-relaxed">
              {t("subtitle")}
            </p>
            <MagneticButton strength={0.2}>
              <Link href={`/${locale}/professions`} className="atlas-text-link text-sm">
                {t("viewAll")}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </MagneticButton>
          </div>
        </div>

        {featured ? (
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <CardTilt3D maxAngle={6} scale={1.015}>
                <article className="relative rounded-3xl border border-white/10 bg-[var(--color-surface)]/60 p-7 sm:p-10 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-white/20 hover:bg-[var(--color-surface)]/75 hover:shadow-2xl">
                  <p className="atlas-caption text-[var(--color-brand)] font-semibold tracking-wider">
                    {t("spotlight")}
                  </p>

                  <p className="atlas-caption mt-8 text-[var(--color-brand)] font-semibold tracking-wider">
                    {locale === "en" ? featured.category_name_en : featured.category_name_id}
                  </p>

                  <h3 className="mt-3 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
                    {locale === "en" ? featured.name_en : featured.name_id}
                  </h3>

                  <p className="atlas-body mt-5 max-w-lg leading-relaxed">
                    {locale === "en" ? featured.description_en : featured.description_id}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {(locale === "en" ? featured.skills_en : featured.skills_id).slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-medium text-[var(--color-ink)] bg-white/5 border border-white/10 backdrop-blur-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 pt-4 border-t border-[var(--color-line)]/50">
                    <MagneticButton strength={0.3}>
                      <Link
                        href={`/${locale}/professions/${featured.slug}`}
                        className="btn-primary min-h-11 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold shadow-xs"
                      >
                        {t("detailCta")}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </MagneticButton>
                  </div>
                </article>
              </CardTilt3D>
            </div>

            <div className="lg:col-span-5">
              <p className="atlas-caption border-b border-[var(--color-line)] pb-4 font-semibold">
                {t("otherPaths")}
              </p>

              <GsapScrollStagger selector="[data-gsap='item']" stagger={0.15} yOffset={32}>
                <div className="divide-y divide-[var(--color-line)]">
                  {others.map((profession, index) => (
                    <article key={profession.id} data-gsap="item" className="py-6 group transition-transform hover:translate-x-1">
                      <p className="atlas-caption text-xs font-mono">
                        {String(index + 2).padStart(2, "0")} / {locale === "en" ? profession.category_name_en : profession.category_name_id}
                      </p>

                      <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight">
                        <Link
                          href={`/${locale}/professions/${profession.slug}`}
                          className="atlas-row-link group-hover:text-[var(--color-brand)] transition-colors"
                        >
                          {locale === "en" ? profession.name_en : profession.name_id}
                          <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                      </h3>

                      <p className="atlas-body mt-2.5 text-sm line-clamp-2 leading-relaxed">
                        {locale === "en" ? profession.description_en : profession.description_id}
                      </p>
                    </article>
                  ))}
                </div>
              </GsapScrollStagger>

              <p className="atlas-caption mt-6 leading-relaxed opacity-75">{t("sourceNote")}</p>
            </div>
          </div>
        ) : (
          <p className="atlas-body border-y border-[var(--color-line)] py-8 mt-10">{t("empty")}</p>
        )}
      </section>
    </SectionReveal>
  );
}
