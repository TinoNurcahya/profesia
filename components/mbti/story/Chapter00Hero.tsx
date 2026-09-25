"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";
import KineticSplitText from "@/components/motion/KineticSplitText";
import MagneticButton from "@/components/motion/MagneticButton";
import HeroShrinkEffect from "@/components/motion/HeroShrinkEffect";
import ParallaxLayer from "@/components/motion/ParallaxLayer";

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
  color?: string;
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
    trustQuestions?: string;
    trustFree: string;
    trustDatabase: string;
    roleGroup: string;
    strengths: string;
    viewProfile: string;
  };
}

interface RoleStyle {
  badge: string;
  text: string;
  glow: string;
  dot: string;
}

const roleStyles: Record<string, RoleStyle> = {
  Analysts: {
    badge: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60",
    text: "text-purple-600 dark:text-purple-400",
    glow: "rgba(168, 85, 247, 0.25)",
    dot: "bg-purple-500",
  },
  Diplomats: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60",
    text: "text-emerald-600 dark:text-emerald-400",
    glow: "rgba(16, 185, 129, 0.25)",
    dot: "bg-emerald-500",
  },
  Sentinels: {
    badge: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800/60",
    text: "text-sky-600 dark:text-sky-400",
    glow: "rgba(14, 165, 233, 0.25)",
    dot: "bg-sky-500",
  },
  Explorers: {
    badge: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60",
    text: "text-amber-600 dark:text-amber-400",
    glow: "rgba(245, 158, 11, 0.25)",
    dot: "bg-amber-500",
  },
};

export default function Chapter00Hero({ types, locale, labels }: Chapter00HeroProps) {
  const isEnglish = locale === "en";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalTypes = types.length;

  // Auto-cycle through all 16 MBTI personalities every 1 second (1000ms)
  useEffect(() => {
    if (totalTypes === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalTypes);
    }, 600);

    return () => clearInterval(interval);
  }, [totalTypes, isPaused]);

  const activeType = types[currentIndex] || types[0];
  const activeGroup = activeType?.group_en || "Analysts";
  const roleStyle = useMemo(() => {
    return roleStyles[activeGroup] || roleStyles.Analysts;
  }, [activeGroup]);

  if (!activeType) return null;

  return (
    <section
      className="atlas-hero border-b border-[var(--color-line)] bg-[var(--color-canvas)] relative overflow-hidden py-12 sm:py-16 lg:py-20 transition-colors duration-1000"
      aria-labelledby="mbti-hero-title"
    >
      {/* Dynamic ambient role glow in background */}
      <ParallaxLayer speed={0.2} className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, ${roleStyle.glow} 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, ${roleStyle.glow} 0%, transparent 70%)`,
          }}
        />
      </ParallaxLayer>

      <HeroShrinkEffect className="relative z-10">
        <div className="page-shell">
          {/* 2-Column Grid Layout */}
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Editorial Headline, Description, CTAs, and Trust Badges */}
            <div className="min-w-0 lg:col-span-7 space-y-6">
              <KineticSplitText
                as="h1"
                id="mbti-hero-title"
                className="atlas-heading text-balance"
              >
                {labels.title}
              </KineticSplitText>

              <p className="atlas-body max-w-xl text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
                {labels.description}
              </p>

              {/* Primary and Secondary Assessment CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <MagneticButton strength={0.35}>
                  <Link
                    href={`/${locale}/mbti/test`}
                    className="btn-primary min-h-12 inline-flex items-center gap-2 shadow-md"
                  >
                    <Sparkles aria-hidden="true" className="h-4 w-4" />
                    {labels.start}
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.25}>
                  <Link href={`/${locale}/majors`} className="atlas-text-link">
                    <Compass aria-hidden="true" className="h-4 w-4" />
                    {labels.majors}
                  </Link>
                </MagneticButton>
              </div>

              {/* Trust Badges */}
              <div className="atlas-caption flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-[var(--color-line)] max-w-lg">
                <span>{labels.trustDuration}</span>
                {labels.trustFree && (
                  <>
                    <span aria-hidden="true">•</span>
                    <span>{labels.trustFree}</span>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Active MBTI Personality Display (No Card Frame, 1s Rotating) */}
            <div
              className="lg:col-span-5 flex flex-col items-center justify-center relative w-full"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Concentrated radial glow behind character */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-60 dark:opacity-40"
                style={{
                  background: `radial-gradient(circle, ${roleStyle.glow} 0%, transparent 65%)`,
                }}
              />

              {/* Persona Portrait Stage without Card Frame */}
              <Link
                href={`/${locale}/mbti/result/${activeType.code.toLowerCase()}`}
                className="group relative flex flex-col items-center text-center focus-visible:outline-hidden"
                aria-label={activeType.code}
              >
                {/* Character Illustration Stack for Seamless 1s Crossfade */}
                <div className="relative w-[280px] sm:w-[340px] md:w-[370px] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                  {types.map((type, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <div
                        key={type.code}
                        className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                          isActive
                            ? "opacity-100 z-10 pointer-events-auto"
                            : "opacity-0 z-0 pointer-events-none"
                        }`}
                      >
                        <Image
                          src={`/images/mbti/${type.code.toLowerCase()}.png`}
                          alt={`${type.code} — ${isEnglish ? type.name_en : type.name_id}`}
                          fill
                          sizes="(min-width: 1024px) 370px, (min-width: 640px) 340px, 280px"
                          priority={idx < 4}
                          className="object-cover object-top select-none rounded-2xl sm:rounded-3xl"
                        />
                      </div>
                    );
                  })}

                  {/* Persona Code Overlay inside bottom center of the image */}
                  <div className="absolute inset-x-0 bottom-0 pt-12 pb-4 sm:pb-5 bg-gradient-to-t from-black/75 via-black/30 to-transparent z-20 flex justify-center items-end pointer-events-none">
                    <span className="font-mono text-2xl sm:text-3xl font-black tracking-widest text-white drop-shadow-md transition-all duration-300">
                      {activeType.code}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </HeroShrinkEffect>
    </section>
  );
}
