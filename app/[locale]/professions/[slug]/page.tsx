import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { fetchProfessionBySlug } from "@/services/professions";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  DollarSign,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import KineticSplitText from "@/components/motion/KineticSplitText";
import ScrollTextReveal from "@/components/motion/ScrollTextReveal";
import BentoMotion from "@/components/motion/BentoMotion";
import CounterScrub from "@/components/motion/CounterScrub";
import GsapScrollStagger from "@/components/motion/GsapScrollStagger";
import SectionReveal from "@/components/motion/SectionReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";
import CareerPathTimeline from "@/components/profession/CareerPathTimeline";
import PractitionerSpotlightCard from "@/components/profession/PractitionerSpotlightCard";
import { getMbtiBadgeStyle, getMbtiRoleName } from "@/lib/mbti";

import SmartBackButton from "@/components/ui/SmartBackButton";

export default async function ProfessionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const profession = await fetchProfessionBySlug(slug);

  if (!profession) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Profession" });
  const isEnglish = locale === "en";

  const name = isEnglish ? profession.name_en : profession.name_id;
  const description = isEnglish ? profession.description_en : profession.description_id;
  const education = isEnglish ? profession.education_en : profession.education_id;
  const skills = isEnglish ? profession.skills_en : profession.skills_id;
  const careerPath = isEnglish ? profession.career_path_en : profession.career_path_id;
  const workEnv = isEnglish ? profession.work_environment_en : profession.work_environment_id;
  const categoryName = isEnglish ? profession.category_name_en : profession.category_name_id;

  const careerSteps = careerPath.split(" -> ").map((step) => step.trim());

  const salaryBarPercent = Math.min(100, Math.max(15, (profession.salary_max / 35000000) * 100));

  return (
    <div className="page-shell max-w-6xl space-y-14 py-12 sm:py-16">
      <ScrollProgressBar />

      {/* 1. Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb">
        <SmartBackButton
          fallbackHref={`/${locale}/professions`}
          label={isEnglish ? "Back to Professions Catalog" : "Kembali ke Katalog Profesi"}
        />
      </nav>

      {/* 2. Hero Editorial Header with KineticSplitText & Practitioner Card */}
      <SectionReveal direction="up">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-[var(--color-line)] pb-10 items-center">
          {/* Main Title & Description Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.16em] text-teal-700">
                {categoryName}
              </p>
              <span className="text-[var(--color-muted)]" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-2.5 py-0.5 rounded-md">
                <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                {profession.prospects === "high"
                  ? isEnglish ? "High Growth" : "Prospek Tinggi"
                  : profession.prospects === "medium"
                  ? isEnglish ? "Stable Demand" : "Prospek Sedang"
                  : isEnglish ? "Niche Demand" : "Prospek Khusus"}
              </span>
            </div>

            <KineticSplitText as="h1" className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--color-ink)]">
              {name}
            </KineticSplitText>

            <ScrollTextReveal className="max-w-2xl text-base sm:text-lg text-[var(--color-muted)] leading-relaxed" dimOpacity={0.2}>
              {description}
            </ScrollTextReveal>
          </div>

          {/* Practitioner Persona Card Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PractitionerSpotlightCard
              imageUrl={profession.image_url}
              professionName={name}
              fallbackText={t("practitionerPlaceholder")}
            />
          </div>
        </header>
      </SectionReveal>

      {/* 3. Bento Intelligence Specs with BentoMotion */}
      <BentoMotion>
        <section aria-labelledby="specs-heading" className="space-y-6">
          <h2 id="specs-heading" className="sr-only">
            {isEnglish ? "Profession Specifications" : "Spesifikasi Profesi"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Tile 1: Salary Benchmark (6 cols) */}
            <article data-bento-card className="space-y-4 border-t-2 border-teal-700 py-6 md:col-span-6">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                  <DollarSign className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-medium text-[var(--color-muted)]">{t("salaryRange")}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] tracking-tight">
                  Rp <CounterScrub value={profession.salary_min / 1000000} suffix="" />–<CounterScrub value={profession.salary_max / 1000000} suffix="" />{" "}
                  <span className="text-base sm:text-lg font-medium text-[var(--color-muted)] font-sans">
                    {isEnglish ? "mil / month" : "jt / bulan"}
                  </span>
                </div>
              </div>

              {/* Visual Bar Indicator with gauge animation */}
              <div className="space-y-1.5 pt-2">
                <div
                  className="h-2 w-full bg-[var(--color-soft)] rounded-full overflow-hidden"
                  role="meter"
                  aria-label={t("salaryRange")}
                  aria-valuemin={0}
                  aria-valuemax={35_000_000}
                  aria-valuenow={profession.salary_max}
                  aria-valuetext={`Rp ${profession.salary_min.toLocaleString(locale)}–${profession.salary_max.toLocaleString(locale)}`}
                >
                  <div
                    className="h-full bg-teal-700 rounded-full"
                    data-gauge-target={`${salaryBarPercent}%`}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-[var(--color-muted)]">
                  <span>Entry Level (Min)</span>
                  <span>Lead / Executive (Max)</span>
                </div>
              </div>
            </article>

            {/* Tile 2: Education Minimum (6 cols) */}
            <article data-bento-card className="flex flex-col justify-between space-y-4 border-t-2 border-[var(--color-line)] py-6 md:col-span-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[var(--color-soft)] border border-[var(--color-line)] flex items-center justify-center text-[var(--color-ink)]">
                    <GraduationCap className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-medium text-[var(--color-muted)]">{t("education")}</div>
                  <div className="text-lg font-bold text-[var(--color-ink)] leading-snug">
                    {education}
                  </div>
                </div>
              </div>

              {workEnv && (
                <p className="text-xs text-[var(--color-muted)] pt-2 border-t border-[var(--color-line)]">
                  <span className="font-semibold text-[var(--color-ink)]">{isEnglish ? "Environment: " : "Lingkungan Kerja: "}</span>
                  {workEnv}
                </p>
              )}
            </article>

            {/* Tile 3: Work-Life Balance (6 cols) */}
            <article data-bento-card className="space-y-3 border-t-2 border-[var(--color-line)] py-6 md:col-span-6">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-soft)] border border-[var(--color-line)] flex items-center justify-center text-[var(--color-ink)]">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <div className="text-xs font-medium text-[var(--color-muted)]">{t("workLifeBalance")}</div>
                <div className="text-xl font-extrabold text-[var(--color-ink)]">
                  <CounterScrub value={profession.work_life_balance} suffix="" /> <span className="text-xs font-normal text-[var(--color-muted)]">/ 5</span>
                </div>
              </div>

              {/* 5-bar rating meter with gauge animation */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full ${
                      index <= profession.work_life_balance
                        ? "bg-teal-700"
                        : "bg-[var(--color-soft)]"
                    }`}
                    data-gauge-target={index <= profession.work_life_balance ? "100%" : undefined}
                  />
                ))}
              </div>
            </article>

            {/* Tile 4: Matching Personality and MBTI Alignment (6 cols) */}
            <article data-bento-card className="space-y-3 border-t-2 border-teal-700 py-6 md:col-span-6">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-medium text-[var(--color-muted)]">{t("matchedMbti")}</div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {profession.matched_mbti.map((m) => {
                    const badgeStyle = getMbtiBadgeStyle(m.code);
                    const roleName = getMbtiRoleName(m.code, locale);
                    return (
                      <Link
                        key={m.code}
                        href={`/${locale}/mbti/result/${m.code}`}
                        title={`${m.code} (${roleName})`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-mono font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${badgeStyle}`}
                      >
                        <span>{m.code}</span>
                        {roleName && (
                          <span className="text-[10px] font-sans font-medium opacity-75">
                            • {roleName}
                          </span>
                        )}
                        <ArrowRight className="w-3 h-3 opacity-60" aria-hidden="true" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </article>

          </div>
        </section>
      </BentoMotion>

      {/* 4. Key Skills Matrix with stagger */}
      <GsapScrollStagger selector="[data-gsap='skill']" stagger={0.05} yOffset={16}>
        <section aria-labelledby="skills-heading" className="space-y-5 border-y border-[var(--color-line)] py-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-700" aria-hidden="true" />
              <h2 id="skills-heading" className="text-xl font-bold text-[var(--color-ink)]">
                {t("skills")}
              </h2>
            </div>
            <p className="text-xs text-[var(--color-muted)]">
              {isEnglish
                ? "Competencies and tools commonly expected by industry recruiters."
                : "Kompetensi teknis dan alat kerja yang paling dicari perusahaan pada posisi ini."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {skills.map((skill) => (
              <span
                key={skill}
                data-gsap="skill"
                className="px-3.5 py-2 rounded-md border border-[var(--color-line)] bg-[var(--color-soft)] text-[var(--color-ink)] text-xs sm:text-sm font-semibold hover:border-teal-300 hover:bg-teal-50/50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </GsapScrollStagger>

      {/* 5. Career Progression Timeline with DrawSVG */}
      <SectionReveal direction="up">
        <section aria-labelledby="career-ladder-heading" className="space-y-6 border-y border-[var(--color-line)] py-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-teal-700" aria-hidden="true" />
              <h2 id="career-ladder-heading" className="text-xl font-bold text-[var(--color-ink)]">
                {t("careerPath")}
              </h2>
            </div>
            <p className="text-xs text-[var(--color-muted)]">
              {isEnglish
                ? "Typical milestone trajectories from junior stages to senior leadership."
                : "Tahapan jenjang karier dari pemula hingga posisi pimpinan spesialis/manajemen."}
            </p>
          </div>

          <CareerPathTimeline steps={careerSteps} />
        </section>
      </SectionReveal>

      {/* 6. Action Strip with MagneticButton */}
      <SectionReveal direction="scale">
        <section
          aria-label="Next Actions"
          className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-soft)] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-[var(--color-ink)]">
              {isEnglish ? "Want to see if this career suits you?" : "Ingin tahu apakah karier ini cocok untukmu?"}
            </h3>
            <p className="text-xs text-[var(--color-muted)]">
              {isEnglish
                ? "Take the 5-minute personality assessment to measure your psychological compatibility."
                : "Ambil tes kepribadian 5 menit untuk mengukur kecocokan karakter dan minat kerjamu."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton strength={0.35}>
              <Link
                href={`/${locale}/mbti`}
                className="px-5 py-3 rounded-lg text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>{isEnglish ? "Take MBTI Test" : "Mulai Tes MBTI"}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <Link
                href={`/${locale}/majors`}
                className="px-5 py-3 rounded-lg text-xs font-semibold bg-[var(--color-surface)] border border-[var(--color-line)] hover:bg-[var(--color-soft)] text-[var(--color-ink)] transition-colors"
              >
                {isEnglish ? "Explore Relevant Majors" : "Lihat Jurusan Terkait"}
              </Link>
            </MagneticButton>
          </div>
        </section>
      </SectionReveal>

    </div>
  );
}
