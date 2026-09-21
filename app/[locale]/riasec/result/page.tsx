"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  RiasecScores,
  RIASEC_DIMENSION_NAMES,
  RiasecDimension,
} from "@/services/riasecService";
import professionsSeed from "@/data/professions-seed.json";
import {
  Compass,
  Sparkles,
  RotateCcw,
  ArrowRight,
  TrendingUp,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import HollandHexagonRadar, {
  HEXAGON_DIMENSIONS,
} from "@/components/riasec/HollandHexagonRadar";
import CardTilt3D from "@/components/motion/CardTilt3D";
import CounterScrub from "@/components/motion/CounterScrub";
import GsapScrollStagger from "@/components/motion/GsapScrollStagger";
import SectionReveal from "@/components/motion/SectionReveal";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";

export default function RiasecResultPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const t = useTranslations("Riasec");
  const [result, setResult] = useState<RiasecScores | null>(null);

  useEffect(() => {
    let restoredResult: RiasecScores | null = null;
    try {
      const saved = localStorage.getItem("profesia_latest_riasec_result");
      if (saved) {
        restoredResult = JSON.parse(saved);
      }
    } catch {
      // Ignore parse error
    }
    queueMicrotask(() => setResult(restoredResult));
  }, []);

  // Filter matched professions based on Holland Code
  const matchedProfessions = useMemo(() => {
    if (!result) return [];
    const code = result.top_3_code;

    return professionsSeed.filter((prof) => {
      let matches = false;
      if (code.includes("I") && prof.category_slug === "teknologi") matches = true;
      if (code.includes("R") && prof.category_slug === "teknologi") matches = true;
      if (code.includes("A") && prof.category_slug === "seni-desain") matches = true;
      if (code.includes("S") && prof.category_slug === "kesehatan") matches = true;
      if (code.includes("S") && prof.category_slug === "pendidikan") matches = true;
      if (code.includes("E") && prof.category_slug === "pemasaran") matches = true;
      return matches;
    }).slice(0, 6);
  }, [result]);

  if (!result) {
    return (
      <div className="page-shell max-w-3xl space-y-6 py-24 text-center">
        <Compass className="w-16 h-16 text-emerald-500 mx-auto animate-pulse" />
        <h1 className="text-3xl font-black text-[var(--color-ink)]">
          {t("noResult")}
        </h1>
        <p className="text-[var(--color-muted)] max-w-md mx-auto leading-relaxed">
          {t("noResultDescription")}
        </p>
        <div className="pt-4">
          <Link
            href={`/${locale}/riasec/test`}
            className="btn-primary min-h-12 px-8 font-bold"
          >
            {t("start")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  const dimensions: { key: RiasecDimension; score: number }[] = [
    { key: "R", score: result.realistic },
    { key: "I", score: result.investigative },
    { key: "A", score: result.artistic },
    { key: "S", score: result.social },
    { key: "E", score: result.enterprising },
    { key: "C", score: result.conventional },
  ];

  const primaryDim = HEXAGON_DIMENSIONS.find((d) => d.key === result.top_3_code[0]) || HEXAGON_DIMENSIONS[0];

  return (
    <main className="career-atlas min-h-screen py-12 sm:py-20">
      <ScrollProgressBar />

      <div className="page-shell max-w-6xl space-y-16">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-4">
          <Link
            href={`/${locale}/riasec`}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            {isEn ? "Back to RIASEC Explorer" : "Kembali ke Eksplorasi RIASEC"}
          </Link>

          <span className="text-xs font-mono text-[var(--color-muted)]">
            Holland Code: {result.top_3_code}
          </span>
        </div>

        {/* Hero Dossier: 3D Tilt Badge & Holland Hexagon Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* 3D Tilt Identity Dossier */}
          <div className="lg:col-span-6 space-y-6">
            <CardTilt3D className="p-8 sm:p-10 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-2xl relative overflow-hidden">
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 filter blur-3xl pointer-events-none"
                style={{ backgroundColor: primaryDim.colorHex }}
              />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold border tracking-wider uppercase"
                    style={{
                      color: primaryDim.colorHex,
                      borderColor: `${primaryDim.colorHex}40`,
                      backgroundColor: `${primaryDim.colorHex}15`,
                    }}
                  >
                    {t("shareBadge")}
                  </span>
                  <span className="text-xs font-mono text-[var(--color-muted)]">
                    Validated Assessment
                  </span>
                </div>

                <div>
                  <p className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-muted)] mb-1">
                    {t("dominantCode")}
                  </p>
                  <h1 className="text-5xl sm:text-7xl font-black tracking-[-0.04em] text-[var(--color-ink)]">
                    {result.top_3_code}
                  </h1>
                  <p
                    className="text-lg font-bold mt-2"
                    style={{ color: primaryDim.colorHex }}
                  >
                    {isEn ? primaryDim.fullNameEn : primaryDim.fullNameId}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                  {locale === "id"
                    ? `Profil vokasional Anda menunjukkan keselarasan tertinggi pada kombinasi ${result.top_3_code}. Pola ini merefleksikan perpaduan ideal antara motivasi kerja intrinsik dan lingkungan industri yang paling memberdayakan potensi Anda.`
                    : `Your vocational signature indicates dominant alignment with ${result.top_3_code}. This profile reflects a strategic synthesis between intrinsic work motives and industries where your talents thrive.`}
                </p>

                {/* Primary Metric Counters */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--color-line)]">
                  {result.top_3_code.split("").map((letter, idx) => {
                    const score =
                      letter === "R"
                        ? result.realistic
                        : letter === "I"
                        ? result.investigative
                        : letter === "A"
                        ? result.artistic
                        : letter === "S"
                        ? result.social
                        : letter === "E"
                        ? result.enterprising
                        : result.conventional;

                    return (
                      <div
                        key={letter}
                        className="p-3 rounded-2xl bg-[var(--color-soft)] border border-[var(--color-line)] text-center"
                      >
                        <span className="text-[10px] font-mono font-bold text-[var(--color-muted)] block">
                          Rank 0{idx + 1} ({letter})
                        </span>
                        <div className="text-xl sm:text-2xl font-black text-[var(--color-ink)] font-mono mt-1">
                          <CounterScrub value={score} suffix="%" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={`/${locale}/professions?riasec=${result.top_3_code}`}
                    className="btn-primary min-h-11 px-6 text-sm font-bold shadow-md"
                  >
                    <Sparkles className="w-4 h-4 mr-1.5" />
                    {t("explore")}
                  </Link>

                  <Link
                    href={`/${locale}/riasec/test`}
                    className="btn-secondary min-h-11 px-5 text-sm font-bold"
                  >
                    <RotateCcw className="w-4 h-4 mr-1.5" />
                    {t("retake")}
                  </Link>
                </div>
              </div>
            </CardTilt3D>
          </div>

          {/* Interactive Radar Result Visualizer */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-[480px] p-6 sm:p-8 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)]/80 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-ink)]">
                    {t("radarTitle")}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[var(--color-muted)]">
                  Normalized %
                </span>
              </div>

              <HollandHexagonRadar
                scores={result}
                mode="result"
                locale={locale}
                size={440}
                interactive={true}
              />

              <p className="text-center text-xs text-[var(--color-muted)] mt-4">
                {t("radarSubtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Breakdown of all 6 Dimensions */}
        <SectionReveal direction="up">
          <section className="space-y-8 pt-8">
            <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--color-ink)]">
                  {t("breakdown")}
                </h2>
                <p className="text-sm text-[var(--color-muted)] mt-1">
                  {isEn
                    ? "Detailed percentile distribution across all six Holland vocational categories."
                    : "Distribusi persentase terperinci di seluruh enam kategori vokasional Holland."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dimensions.map(({ key, score }) => {
                const info = RIASEC_DIMENSION_NAMES[key];
                const isTop3 = result.top_3_code.includes(key);
                const cfg = HEXAGON_DIMENSIONS.find((d) => d.key === key) || HEXAGON_DIMENSIONS[0];

                return (
                  <article
                    key={key}
                    className={`p-6 rounded-3xl border transition-all duration-300 ${
                      isTop3
                        ? "border-[var(--color-ink)] bg-[var(--color-surface)] shadow-lg scale-[1.01]"
                        : "border-[var(--color-line)] bg-[var(--color-soft)]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-8 h-8 rounded-xl font-black flex items-center justify-center text-sm font-mono text-white shadow-sm"
                          style={{ backgroundColor: cfg.colorHex }}
                        >
                          {key}
                        </span>
                        <div>
                          <span className="font-bold text-sm text-[var(--color-ink)] block">
                            {cfg.shortName}
                          </span>
                          <span className="text-[10px] font-mono text-[var(--color-muted)]">
                            {isEn ? cfg.fullNameEn : cfg.fullNameId}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-lg font-black font-mono" style={{ color: cfg.colorHex }}>
                          <CounterScrub value={score} suffix="%" />
                        </span>
                      </div>
                    </div>

                    {/* Score Bar */}
                    <div className="w-full h-2 rounded-full bg-[var(--color-soft)] overflow-hidden mb-4 border border-[var(--color-line)]">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${score}%`,
                          backgroundColor: cfg.colorHex,
                        }}
                      />
                    </div>

                    <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                      {isEn ? info.description_en : info.description_id}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        </SectionReveal>

        {/* High Congruence Professions Showcase */}
        {matchedProfessions.length > 0 && (
          <SectionReveal direction="up">
            <section className="space-y-8 pt-8">
              <div className="border-b border-[var(--color-line)] pb-4">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--color-ink)] flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  {t("matchedRoles")}
                </h2>
                <p className="text-sm text-[var(--color-muted)] mt-1">
                  {t("matchedRolesSubtitle", { code: result.top_3_code })}
                </p>
              </div>

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
                          {isEn ? prof.category_name_en : prof.category_name_id}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>High Fit</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-black text-[var(--color-ink)] group-hover:text-emerald-600 transition-colors">
                        {isEn ? prof.name_en : prof.name_id}
                      </h3>

                      <p className="text-xs text-[var(--color-muted)] line-clamp-2 leading-relaxed">
                        {isEn ? prof.description_en : prof.description_id}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {(isEn ? prof.skills_en : prof.skills_id).slice(0, 3).map((skill) => (
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
            </section>
          </SectionReveal>
        )}
      </div>
    </main>
  );
}
