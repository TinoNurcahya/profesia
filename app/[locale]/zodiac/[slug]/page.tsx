import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  Compass,
  Flame,
  Layers,
  Sparkles,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import zodiacs from "@/data/zodiacs.json";
import { fetchProfessions } from "@/services/professions";
import { ZODIAC_CONSTELLATIONS } from "@/data/constellationsData";
import KineticSplitText from "@/components/motion/KineticSplitText";
import ScrollTextReveal from "@/components/motion/ScrollTextReveal";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";
import BentoMotion from "@/components/motion/BentoMotion";
import GsapScrollStagger from "@/components/motion/GsapScrollStagger";
import MagneticButton from "@/components/motion/MagneticButton";
import SectionReveal from "@/components/motion/SectionReveal";
import ZodiacConstellationSvg from "@/components/zodiac/ZodiacConstellationSvg";

export default async function ZodiacDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Zodiac" });

  const zodiac = zodiacs.find((item) => item.slug === slug);
  if (!zodiac) {
    notFound();
  }

  const allProfessions = await fetchProfessions();
  const matchedProfessions = allProfessions.filter((item) =>
    zodiac.recommended_professions.includes(item.slug)
  );

  const isEnglish = locale === "en";
  const name = isEnglish ? zodiac.name_en : zodiac.name_id;
  const dates = isEnglish ? zodiac.dates_en : zodiac.dates_id;
  const element = isEnglish ? zodiac.element_en : zodiac.element_id;
  const summary = isEnglish ? zodiac.career_summary_en : zodiac.career_summary_id;
  const traits = isEnglish ? zodiac.traits_en : zodiac.traits_id;

  const constellation =
    ZODIAC_CONSTELLATIONS[slug.toLowerCase()] || ZODIAC_CONSTELLATIONS.aries;

  return (
    <main className="career-atlas min-h-screen py-12 sm:py-20 overflow-x-hidden">
      <ScrollProgressBar />

      <div className="page-shell max-w-6xl space-y-16">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-4">
          <MagneticButton>
            <Link
              href={`/${locale}/zodiac`}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t("back")}
            </Link>
          </MagneticButton>

          <span className="text-xs font-mono text-[var(--color-muted)]">
            Cosmic Sign: {name} ({zodiac.symbol})
          </span>
        </div>

        {/* Hero: Constellation Visualizer + Archetype Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-b border-[var(--color-line)] pb-16">
          {/* Left Column: Dossier Header */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border flex items-center gap-1.5"
                style={{
                  color: constellation.colorHex,
                  borderColor: `${constellation.colorHex}40`,
                  backgroundColor: `${constellation.colorHex}15`,
                }}
              >
                <Flame className="w-3.5 h-3.5" />
                {t("element", { value: element })}
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-muted)]">
                <Calendar className="w-3.5 h-3.5" />
                {dates}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-5xl sm:text-6xl" aria-hidden="true">
                {zodiac.symbol}
              </span>
              <KineticSplitText
                as="h1"
                className="text-4xl sm:text-6xl font-black tracking-[-0.04em] text-[var(--color-ink)] leading-tight"
              >
                {name}
              </KineticSplitText>
            </div>

            <ScrollTextReveal className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
              {summary}
            </ScrollTextReveal>

            <div className="flex flex-wrap gap-2 pt-2">
              {traits.map((trait) => (
                <span
                  key={trait}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--color-soft)] text-[var(--color-ink)] border border-[var(--color-line)]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 opacity-60" />
                  {trait}
                </span>
              ))}
            </div>

            <p className="border-l-2 border-amber-500 pl-4 text-xs text-[var(--color-muted)] leading-relaxed pt-2">
              {t("disclaimer")}
            </p>
          </div>

          {/* Right Column: Animated Constellation SVG Drawing */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-[480px] p-6 sm:p-8 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-2xl relative overflow-hidden">
              <div
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-25 filter blur-3xl pointer-events-none"
                style={{ backgroundColor: constellation.colorHex }}
              />

              <div className="relative z-10 flex items-center justify-between border-b border-[var(--color-line)] pb-3 mb-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Constellation {constellation.name}
                </span>
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: constellation.colorHex }}
                >
                  Vector Astro-Cartography
                </span>
              </div>

              <ZodiacConstellationSvg
                slug={slug}
                size="100%"
                interactive={true}
              />

              <div className="relative z-10 mt-4 pt-3 border-t border-[var(--color-line)] flex items-center justify-between text-[11px] font-mono text-[var(--color-muted)]">
                <span>Coordinates: Astronomical J2000</span>
                <span>Active Starfield</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Bento Grid Professional Traits */}
        <SectionReveal direction="up">
          <section className="space-y-6">
            <div className="border-b border-[var(--color-line)] pb-4">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--color-ink)]">
                {t("strengthsTitle")}
              </h2>
            </div>

            <BentoMotion className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Key Strength */}
              <div className="p-6 sm:p-8 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-sm space-y-4">
                <span
                  className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg text-white shadow-sm"
                  style={{ backgroundColor: constellation.colorHex }}
                >
                  <Sparkles className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-black text-[var(--color-ink)]">
                  {isEnglish ? "Core Workplace Instinct" : "Insting Kerja Alami"}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                  {isEnglish
                    ? `Driven by ${traits[0]} and ${traits[1]}, ${name} thrives when empowered to express personal initiative without micromanagement.`
                    : `Didorong oleh karakter ${traits[0]} dan ${traits[1]}, ${name} bekerja paling optimal saat diberikan otonomi inisiatif tanpa pengawasan berlebihan.`}
                </p>
              </div>

              {/* Card 2: Environment */}
              <div className="p-6 sm:p-8 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-sm space-y-4">
                <span className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  <Compass className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-black text-[var(--color-ink)]">
                  {t("workStyleTitle")}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                  {isEnglish
                    ? `Prefers collaborative teams that respect individual mastery and foster constructive, transparent feedback loops.`
                    : `Menyukai dinamika tim yang menghargai keahlian individu dan membangun komunikasi konstruktif yang transparan.`}
                </p>
              </div>

              {/* Card 3: Element Synergy */}
              <div className="p-6 sm:p-8 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-sm space-y-4">
                <span className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  <Layers className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-black text-[var(--color-ink)]">
                  {isEnglish ? `Element: ${element}` : `Pengaruh Elemen: ${element}`}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                  {isEnglish
                    ? `Elemental resonance anchors long-term endurance, creative problem-solving, and adaptability under pressure.`
                    : `Energi elemen ini memberikan daya tahan jangka panjang, kreativitas dalam menyelesaikan krisis, serta adaptabilitas tinggi.`}
                </p>
              </div>
            </BentoMotion>
          </section>
        </SectionReveal>

        {/* Section 2: Matched Professions */}
        <SectionReveal direction="up">
          <section className="space-y-6 pt-4">
            <div className="border-b border-[var(--color-line)] pb-4">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--color-ink)] flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                {t("matchedCareersTitle")}
              </h2>
              <p className="text-sm text-[var(--color-muted)] mt-1">
                {t("matchedCareersSubtitle", { sign: name })}
              </p>
            </div>

            {matchedProfessions.length > 0 ? (
              <GsapScrollStagger
                stagger={0.08}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {matchedProfessions.map((prof) => (
                  <Link
                    key={prof.slug}
                    href={`/${locale}/professions/${prof.slug}`}
                    className="p-6 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] hover:border-[var(--color-ink)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                          {isEnglish ? prof.category_name_en : prof.category_name_id}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>Aligned Fit</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-black text-[var(--color-ink)] group-hover:text-amber-600 transition-colors">
                        {isEnglish ? prof.name_en : prof.name_id}
                      </h3>

                      <p className="text-xs text-[var(--color-muted)] line-clamp-2 leading-relaxed">
                        {isEnglish ? prof.description_en : prof.description_id}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {(isEnglish ? prof.skills_en : prof.skills_id).slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[var(--color-soft)] text-[var(--color-muted)]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[var(--color-line)] flex items-center justify-between text-xs font-bold text-[var(--color-ink)]">
                      <span>
                        Rp {(prof.salary_min / 1000000).toFixed(0)}jt – {(prof.salary_max / 1000000).toFixed(0)}jt
                      </span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </GsapScrollStagger>
            ) : (
              <div className="border-l-2 border-[var(--color-line)] pl-5 py-4 text-sm text-[var(--color-muted)]">
                {t("empty")}
              </div>
            )}
          </section>
        </SectionReveal>
      </div>
    </main>
  );
}
