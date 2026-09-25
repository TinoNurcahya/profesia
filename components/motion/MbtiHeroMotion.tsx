"use client";

import { useRef, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface MbtiTypeSummary {
  code: string;
  name_id?: string;
  name_en?: string;
  group_en: string;
}

interface MbtiHeroMotionProps {
  children: ReactNode;
  types: MbtiTypeSummary[];
  locale: string;
}

const roleGlowMap: Record<string, string> = {
  Analysts: "hover:border-purple-400/80 hover:shadow-[0_8px_20px_rgba(168,125,192,0.25)] hover:bg-purple-50/50",
  Diplomats: "hover:border-emerald-400/80 hover:shadow-[0_8px_20px_rgba(52,211,153,0.25)] hover:bg-emerald-50/50",
  Sentinels: "hover:border-sky-400/80 hover:shadow-[0_8px_20px_rgba(96,165,250,0.25)] hover:bg-sky-50/50",
  Explorers: "hover:border-amber-400/80 hover:shadow-[0_8px_20px_rgba(251,191,36,0.25)] hover:bg-amber-50/50",
};

/**
 * Orchestrates entrance animation and continuous kinetic character ticker for MBTI Intro Hero.
 */
export default function MbtiHeroMotion({ children, types, locale }: MbtiHeroMotionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const headerContent = containerRef.current?.querySelector("[data-hero-content]");
      if (headerContent) {
        gsap.fromTo(
          headerContent.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }

      // Smooth horizontal kinetic ticker
      const ticker = tickerRef.current;
      if (ticker) {
        gsap.fromTo(
          ticker,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.3,
            ease: "power2.out",
            clearProps: "transform,opacity",
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="space-y-10 sm:space-y-14">
      {children}

      {/* Kinetic 16-Personality Character Reel */}
      <div ref={tickerRef} className="relative overflow-hidden pt-2 pb-4">
        {/* Ambient background wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-full max-w-5xl rounded-full bg-gradient-to-r from-purple-100/40 via-teal-100/40 to-amber-100/40 blur-2xl"
        />

        {/* Continuous horizontal track with interactive character avatar chips */}
        <div className="relative flex items-center gap-3 overflow-x-auto no-scrollbar py-2 px-1 sm:justify-center flex-wrap">
          {types.map((type) => {
            const glow = roleGlowMap[type.group_en] || "";

            return (
              <Link
                key={type.code}
                href={`/${locale}/mbti/result/${type.code}`}
                className={`group/avatar relative flex items-center gap-2.5 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/90 px-3 py-2 shadow-2xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 shrink-0 ${glow}`}
              >
                <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden bg-[var(--color-soft)] border border-[var(--color-line)]/70 p-0.5 shrink-0 shadow-2xs transition-transform duration-300 group-hover/avatar:scale-110">
                  <Image
                    src={`/images/mbti/${type.code.toLowerCase()}.png`}
                    alt={type.code}
                    width={44}
                    height={44}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="text-left min-w-0 pr-1">
                  <div className="font-mono text-xs font-bold text-[var(--color-ink)] leading-tight">
                    {type.code}
                  </div>
                  <div className="text-[10px] font-medium text-[var(--color-muted)] truncate max-w-[80px] sm:max-w-[100px]">
                    {locale === "en" ? type.name_en : type.name_id}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
