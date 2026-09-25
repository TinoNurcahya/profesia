"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CardTilt3D from "@/components/motion/CardTilt3D";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface MbtiTypeData {
  code: string;
  group_id: string;
  group_en: string;
  name_id: string;
  name_en: string;
  title_id: string;
  title_en: string;
  description_id: string;
  description_en: string;
  strengths_id: string[];
  strengths_en: string[];
  color: string;
}

interface MbtiCharacterGridProps {
  types: MbtiTypeData[];
  locale: string;
  labels: {
    allTypes: string;
    roleAnalysts: string;
    roleDiplomats: string;
    roleSentinels: string;
    roleExplorers: string;
    viewProfile: string;
    matchedCareers: string;
    strengthsTitle: string;
    noResultsFound?: string;
    searchPlaceholder?: string;
    scrollHint?: string;
    quickFinderTitle?: string;
    quickFinderDescription?: string;
    mediaFallback?: string;
    roleProgress?: string;
  };
}

const roleKeys = ["Analysts", "Diplomats", "Sentinels", "Explorers"] as const;
type RoleKey = (typeof roleKeys)[number];

export default function MbtiCharacterGrid({
  types,
  locale,
  labels,
}: MbtiCharacterGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRoleRef = useRef<number>(0);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [activeRoleIndex, setActiveRoleIndex] = useState<number>(0);
  const [activeMobileCardIndex, setActiveMobileCardIndex] = useState<number>(0);

  const isEnglish = locale === "en";

  // Role group configurations adhering strictly to AGENTS.md theme tokens
  const roleThemes: Record<
    RoleKey,
    {
      key: RoleKey;
      name: string;
      number: string;
      color: string;
      ink: string;
      badge: string;
      activePill: string;
      inactivePill: string;
      gradientBg: string;
      cardBorder: string;
      philosophy: string;
      traits: string[];
    }
  > = useMemo(
    () => ({
      Analysts: {
        key: "Analysts",
        name: labels.roleAnalysts || "Analis",
        number: "01",
        color: "#a855f7",
        ink: "text-purple-600 dark:text-purple-400",
        badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25",
        activePill: "bg-purple-600 text-white shadow-lg shadow-purple-600/35",
        inactivePill: "hover:bg-purple-500/15 text-purple-700 dark:text-purple-300",
        gradientBg:
          "radial-gradient(circle at 18% 50%, rgba(168, 85, 247, 0.16) 0%, transparent 65%)",
        cardBorder: "border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10",
        philosophy: isEnglish
          ? "Rational, strategic thinkers who prize objective logic, systematic efficiency, and complex problem-solving."
          : "Pemikir rasional dan strategis yang mengutamakan logika objektif, efisiensi sistem, dan pemecahan masalah kompleks.",
        traits: isEnglish
          ? ["Logical & Analytical", "Strategic Vision", "Systemic Thinker"]
          : ["Logis & Analitis", "Visi Strategis", "Pemikir Sistematis"],
      },
      Diplomats: {
        key: "Diplomats",
        name: labels.roleDiplomats || "Diplomat",
        number: "02",
        color: "#10b981",
        ink: "text-emerald-600 dark:text-emerald-400",
        badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
        activePill: "bg-emerald-600 text-white shadow-lg shadow-emerald-600/35",
        inactivePill: "hover:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
        gradientBg:
          "radial-gradient(circle at 18% 50%, rgba(16, 185, 129, 0.16) 0%, transparent 65%)",
        cardBorder: "border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-emerald-500/10",
        philosophy: isEnglish
          ? "Empathetic, visionary personalities who prioritize human harmony, mutual understanding, and shared growth."
          : "Pribadi empatik dan visioner yang mengutamakan harmoni, pemahaman antarmanusia, dan pertumbuhan bersama.",
        traits: isEnglish
          ? ["Deep Empathy", "Creative Vision", "Meaning-Driven"]
          : ["Empati Mendalam", "Visi Kreatif", "Pencari Makna"],
      },
      Sentinels: {
        key: "Sentinels",
        name: labels.roleSentinels || "Sentinel",
        number: "03",
        color: "#0ea5e9",
        ink: "text-sky-600 dark:text-sky-400",
        badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25",
        activePill: "bg-sky-600 text-white shadow-lg shadow-sky-600/35",
        inactivePill: "hover:bg-sky-500/15 text-sky-700 dark:text-sky-300",
        gradientBg:
          "radial-gradient(circle at 18% 50%, rgba(14, 165, 233, 0.16) 0%, transparent 65%)",
        cardBorder: "border-sky-500/20 hover:border-sky-500/50 hover:shadow-sky-500/10",
        philosophy: isEnglish
          ? "Structured, meticulous guardians who champion organizational stability, procedural consistency, and practical reliability."
          : "Pelindung terstruktur dan teliti yang menjaga stabilitas, konsistensi prosedur, dan keandalan praktis.",
        traits: isEnglish
          ? ["Organized & Loyal", "High Consistency", "Pragmatic Anchor"]
          : ["Terorganisir & Loyal", "Konsistensi Tinggi", "Andalan Praktis"],
      },
      Explorers: {
        key: "Explorers",
        name: labels.roleExplorers || "Penjelajah",
        number: "04",
        color: "#f59e0b",
        ink: "text-amber-600 dark:text-amber-400",
        badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
        activePill: "bg-amber-600 text-white shadow-lg shadow-amber-600/35",
        inactivePill: "hover:bg-amber-500/15 text-amber-700 dark:text-amber-300",
        gradientBg:
          "radial-gradient(circle at 18% 50%, rgba(245, 158, 11, 0.16) 0%, transparent 65%)",
        cardBorder: "border-amber-500/20 hover:border-amber-500/50 hover:shadow-amber-500/10",
        philosophy: isEnglish
          ? "Spontaneous, adaptable individuals adept at hands-on action, real-world creativity, and quick situational agility."
          : "Sosok spontan dan adaptif yang terampil mengeksplorasi aksi nyata, kreativitas langsung, dan fleksibilitas.",
        traits: isEnglish
          ? ["Quick Agility", "Hands-on Creativity", "Situational Master"]
          : ["Sigap & Adaptif", "Kreativitas Nyata", "Solusi Fleksibel"],
      },
    }),
    [isEnglish, labels]
  );

  const currentRoleKey = roleKeys[activeRoleIndex];
  const currentTheme = roleThemes[currentRoleKey];

  // Types grouped by role
  const typesByRole = useMemo(() => {
    return roleKeys.map((key) => {
      return {
        roleKey: key,
        theme: roleThemes[key],
        types: types.filter((type) => type.group_en === key),
      };
    });
  }, [types, roleThemes]);

  // GSAP ScrollTrigger Pinned Scrollytelling per Role Group
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=320%",
        pin: true,
        scrub: 1.0,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const roleIdx = Math.min(3, Math.floor(progress * 4));
          if (roleIdx !== activeRoleRef.current) {
            activeRoleRef.current = roleIdx;
            setActiveRoleIndex(roleIdx);
          }
        },
      });

      triggerRef.current = trigger;

      return () => {
        trigger.kill();
        triggerRef.current = null;
      };
    },
    { scope: containerRef }
  );


  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const cardWidth = 280;
    const scrollPos = container.scrollLeft;
    const idx = Math.min(3, Math.round(scrollPos / cardWidth));
    setActiveMobileCardIndex(idx);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col justify-center transition-colors duration-700 ease-out"
    >
      {/* Ambient Lighting Background Layer feathered to eliminate harsh cut-off edges */}
      <div
        className="pointer-events-none absolute -top-56 -bottom-56 inset-x-0 transition-opacity duration-700 ease-out"
        aria-hidden="true"
      >
        {/* Soft Radial Ambient Wash */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            background: currentTheme.gradientBg,
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 160px, black calc(100% - 160px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 160px, black calc(100% - 160px), transparent 100%)",
          }}
        />

        {/* Ambient Radial Spotlight Glow */}
        <div
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 transition-all duration-700"
          style={{
            backgroundColor: currentTheme.color,
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 140px, black calc(100% - 140px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 140px, black calc(100% - 140px), transparent 100%)",
          }}
        />
      </div>

      <div className="page-shell py-8 sm:py-12 w-full max-w-7xl mx-auto flex flex-col justify-center">
        {/* Main Split Stage Layout: Left (Role Identity) & Right (Character Cards) */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
          
          {/* Left Column: Role Details & Strengths */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border ${currentTheme.badge}`}
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Rumpun {currentTheme.number}</span>
              </span>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.15]">
                {currentTheme.name}
              </h3>
            </div>

            <p className="text-[var(--color-muted)] text-base sm:text-lg leading-relaxed text-pretty">
              {currentTheme.philosophy}
            </p>

            <div className="pt-2">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-3">
                {labels.strengthsTitle || "Karakteristik Kunci"}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentTheme.traits.map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] shadow-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 4 Types in Active Role */}
          <div className="lg:col-span-8">
            
            {/* Desktop View: 2x2 Grid with 3D Tilt */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-4">
              {typesByRole[activeRoleIndex].types.map((type) => (
                <CardTilt3D
                  key={type.code}
                  className={`relative p-5 rounded-2xl bg-[var(--color-surface)]/85 dark:bg-[var(--color-surface)]/70 backdrop-blur-md border ${currentTheme.cardBorder} transition-all duration-300 shadow-sm flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className={`text-2xl lg:text-3xl font-black tracking-tight ${currentTheme.ink}`}
                        >
                          {type.code}
                        </span>
                        <h4 className="text-base lg:text-lg font-bold text-[var(--color-ink)] mt-0.5">
                          {isEnglish ? type.name_en : type.name_id}
                        </h4>
                        <p className="text-xs text-[var(--color-muted)] line-clamp-1 mt-0.5">
                          {isEnglish ? type.title_en : type.title_id}
                        </p>
                      </div>

                      <div className="relative w-16 h-16 shrink-0 pointer-events-none">
                        <Image
                          src={`/images/mbti/${type.code.toLowerCase()}.png`}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--color-muted)] line-clamp-2 mt-3 leading-relaxed">
                      {isEnglish ? type.description_en : type.description_id}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(isEnglish ? type.strengths_en : type.strengths_id)
                        .slice(0, 2)
                        .map((st) => (
                          <span
                            key={st}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-[var(--color-soft)] text-[var(--color-muted)]"
                          >
                            {st}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--color-line)] flex items-center justify-between text-xs font-semibold">
                    <Link
                      href={`/${locale}/mbti/result/${type.code}`}
                      className="inline-flex items-center gap-1 text-[var(--color-brand)] hover:underline"
                    >
                      <span>{labels.viewProfile}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>

                    <Link
                      href={`/${locale}/professions?mbti=${type.code}`}
                      className="inline-flex items-center gap-1 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                    >
                      <span>{labels.matchedCareers}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </CardTilt3D>
              ))}
            </div>

            {/* Mobile View: Horizontal Snap Swipe Carousel */}
            <div className="sm:hidden space-y-4">
              <div
                onScroll={handleMobileScroll}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory py-2 px-1 no-scrollbar"
                style={{ scrollbarWidth: "none" }}
              >
                {typesByRole[activeRoleIndex].types.map((type) => (
                  <div
                    key={type.code}
                    className={`w-[270px] shrink-0 snap-center p-5 rounded-2xl bg-[var(--color-surface)]/90 backdrop-blur-md border ${currentTheme.cardBorder} flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span
                            className={`text-2xl font-black tracking-tight ${currentTheme.ink}`}
                          >
                            {type.code}
                          </span>
                          <h4 className="text-base font-bold text-[var(--color-ink)] mt-0.5">
                            {isEnglish ? type.name_en : type.name_id}
                          </h4>
                          <p className="text-xs text-[var(--color-muted)] line-clamp-1 mt-0.5">
                            {isEnglish ? type.title_en : type.title_id}
                          </p>
                        </div>

                        <div className="relative w-14 h-14 shrink-0 pointer-events-none">
                          <Image
                            src={`/images/mbti/${type.code.toLowerCase()}.png`}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <p className="text-xs text-[var(--color-muted)] line-clamp-2 mt-3 leading-relaxed">
                        {isEnglish ? type.description_en : type.description_id}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[var(--color-line)] flex items-center justify-between text-xs font-semibold">
                      <Link
                        href={`/${locale}/mbti/result/${type.code}`}
                        className="inline-flex items-center gap-1 text-[var(--color-brand)]"
                      >
                        <span>{labels.viewProfile}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>

                      <Link
                        href={`/${locale}/professions?mbti=${type.code}`}
                        className="inline-flex items-center gap-1 text-[var(--color-muted)]"
                      >
                        <span>{labels.matchedCareers}</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Carousel Pagination Dots */}
              <div className="flex justify-center gap-1.5 pt-1">
                {typesByRole[activeRoleIndex].types.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeMobileCardIndex === idx
                        ? "w-5 bg-[var(--color-brand)]"
                        : "w-1.5 bg-[var(--color-line)]"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
