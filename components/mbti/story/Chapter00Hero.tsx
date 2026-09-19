import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, Compass } from "lucide-react";
import StoryLabel from "./StoryLabel";
import TextReveal from "../../motion/TextReveal";

export interface MbtiTypeItem {
  code: string;
  name_id: string;
  name_en: string;
  group_id?: string;
  group_en: string;
  title_id?: string;
  title_en?: string;
  strengths_id?: string[];
  strengths_en?: string[];
}

interface Chapter00HeroProps {
  types: MbtiTypeItem[];
  locale: string;
  labels: {
    label: string;
    eyebrow: string;
    title: string;
    description: string;
    start: string;
    majors: string;
    trustDuration: string;
    trustQuestions: string;
    trustFree: string;
    trustDatabase: string;
    roleGroup: string;
    strengths: string;
    viewProfile: string;
  };
}

const roleColors: Record<string, { badge: string; text: string }> = {
  Analysts:  { badge: "bg-purple-50 text-purple-700 border-purple-200", text: "text-purple-700" },
  Diplomats: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", text: "text-emerald-700" },
  Sentinels: { badge: "bg-sky-50 text-sky-700 border-sky-200", text: "text-sky-700" },
  Explorers: { badge: "bg-amber-50 text-amber-700 border-amber-200", text: "text-amber-700" },
};

export default function Chapter00Hero({ types, locale, labels }: Chapter00HeroProps) {
  const isEnglish = locale === "en";
  const activeType = types[0];
  if (!activeType) return null;

  const activeGroup = activeType?.group_en || "Analysts";
  const colorScheme = roleColors[activeGroup] || roleColors.Analysts;

  return (
    <section className="atlas-hero border-b border-[var(--color-line)] bg-[var(--color-canvas)]" aria-labelledby="mbti-hero-title">
      <div className="page-shell">
        <div className="atlas-chapter-line">
          <div className="flex items-center gap-3">
            <StoryLabel label={labels.label} />
            <span className="atlas-caption hidden sm:block">{labels.eyebrow}</span>
          </div>
          <Link href={`/${locale}/mbti/test`} className="atlas-text-link text-sm">
            {labels.start}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">

          {/* Left: Editorial Headline and CTAs */}
          <div className="min-w-0 lg:col-span-7 space-y-7">
            <TextReveal
              as="h1"
              id="mbti-hero-title"
              className="atlas-heading"
            >
              {labels.title}
            </TextReveal>

            <p className="atlas-body max-w-lg">{labels.description}</p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
              <Link
                href={`/${locale}/mbti/test`}
                className="btn-primary min-h-12"
              >
                <Sparkles aria-hidden="true" className="h-4 w-4" />
                {labels.start}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href={`/${locale}/majors`}
                className="atlas-text-link"
              >
                <Compass aria-hidden="true" className="h-4 w-4" />
                {labels.majors}
              </Link>
            </div>

            <div className="atlas-caption flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-line)] pt-5">
              <span>{labels.trustDuration}</span>
              <span>{labels.trustQuestions}</span>
            </div>
          </div>

          {/* Right: Character Stage */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px]">

              {/* Top meta bar */}
              <div className="flex items-center justify-between gap-4 border-b border-[var(--color-line)] pb-4 mb-0">
                <div className="flex items-center gap-2">
                  <span className="atlas-caption font-mono">01 / 16</span>
                  <span className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold border ${colorScheme.badge}`}>
                    {isEnglish ? activeType.group_en : (activeType.group_id || activeType.group_en)}
                  </span>
                </div>
                <Link
                  href={`/${locale}/mbti/result/${activeType.code}`}
                  className="atlas-text-link text-xs"
                >
                  {labels.viewProfile}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

              {/* Character illustration */}
              <div className="relative h-[440px] sm:h-[500px] lg:h-[520px] border-x border-b border-[var(--color-line)] bg-[var(--color-surface)]">
                <Image
                  key={activeType.code}
                  src={`/images/mbti/${activeType.code.toLowerCase()}.png`}
                  alt={`${activeType.code} — ${isEnglish ? activeType.name_en : activeType.name_id}`}
                  fill
                  sizes="(min-width: 1024px) 420px, 360px"
                  priority
                  className="object-contain object-bottom"
                />
              </div>

              {/* Character dossier */}
              <div className="border border-[var(--color-line)] bg-[var(--color-surface)] p-4 mt-0">
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <div>
                    <span className="font-mono text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                      {activeType.code}
                    </span>
                    <span className="ml-2 text-sm font-semibold text-[var(--color-ink)]">
                      {isEnglish ? activeType.name_en : activeType.name_id}
                    </span>
                  </div>
                </div>
                <p className="atlas-body text-sm leading-snug">
                  {isEnglish
                    ? activeType.title_en || activeType.name_en
                    : activeType.title_id || activeType.name_id}
                </p>
                {activeType.strengths_en && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {(isEnglish ? activeType.strengths_en : (activeType.strengths_id || activeType.strengths_en))
                      .slice(0, 3)
                      .map((strength, i) => (
                        <span
                          key={i}
                          className="atlas-chip"
                        >
                          {strength}
                        </span>
                      ))}
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
