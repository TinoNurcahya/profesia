"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import CardTilt3D from "@/components/motion/CardTilt3D";
import MagneticButton from "@/components/motion/MagneticButton";

gsap.registerPlugin(Flip, useGSAP);

export interface TypeDetail {
  code: string;
  name: string;
  title: string;
  strengths: string[];
}

export interface RoleGroupItem {
  key: "analysts" | "diplomats" | "sentinels" | "explorers";
  title: string;
  description: string;
  types: TypeDetail[];
}

interface RoleGroupsInteractiveProps {
  locale: string;
  groups: RoleGroupItem[];
  labels: {
    eyebrow: string;
    viewProfile: string;
    exploreCareers: string;
    keyStrengths: string;
    typeCount: string;
  };
}

const roleThemes = {
  analysts: {
    accent: "#a855f7",
    glow: "rgba(168, 85, 247, 0.16)",
    border: "border-purple-500/30 hover:border-purple-500/60",
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/30",
    activePill: "bg-purple-600 text-white shadow-lg shadow-purple-600/30",
    inactivePill: "hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-300",
    gradient: "from-purple-950/20 via-transparent to-transparent",
  },
  diplomats: {
    accent: "#10b981",
    glow: "rgba(16, 185, 129, 0.16)",
    border: "border-emerald-500/30 hover:border-emerald-500/60",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30",
    activePill: "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30",
    inactivePill: "hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-300",
    gradient: "from-emerald-950/20 via-transparent to-transparent",
  },
  sentinels: {
    accent: "#0ea5e9",
    glow: "rgba(14, 165, 233, 0.16)",
    border: "border-sky-500/30 hover:border-sky-500/60",
    badge: "bg-sky-500/10 text-sky-600 dark:text-sky-300 border-sky-500/30",
    activePill: "bg-sky-600 text-white shadow-lg shadow-sky-600/30",
    inactivePill: "hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-300",
    gradient: "from-sky-950/20 via-transparent to-transparent",
  },
  explorers: {
    accent: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.16)",
    border: "border-amber-500/30 hover:border-amber-500/60",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30",
    activePill: "bg-amber-600 text-white shadow-lg shadow-amber-600/30",
    inactivePill: "hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-300",
    gradient: "from-amber-950/20 via-transparent to-transparent",
  },
};

/**
 * Awwwards-grade Role Groups showcase featuring GSAP Flip archetype morphing,
 * 3D perspective hover cards, and luminous glassmorphic aesthetics.
 */
export default function RoleGroupsInteractive({
  locale,
  groups,
  labels,
}: RoleGroupsInteractiveProps) {
  // Store active type code for each role group
  const [activeTypes, setActiveTypes] = useState<Record<string, string>>({
    analysts: groups.find((g) => g.key === "analysts")?.types[0]?.code || "INTJ",
    diplomats: groups.find((g) => g.key === "diplomats")?.types[0]?.code || "INFJ",
    sentinels: groups.find((g) => g.key === "sentinels")?.types[0]?.code || "ISTJ",
    explorers: groups.find((g) => g.key === "explorers")?.types[0]?.code || "ISTP",
  });

  const cardsRef = useRef<Record<string, HTMLDivElement | null>>({});

  const handleSelectType = (groupKey: string, code: string) => {
    if (activeTypes[groupKey] === code) return;

    const cardEl = cardsRef.current[groupKey];
    if (!cardEl) {
      setActiveTypes((prev) => ({ ...prev, [groupKey]: code }));
      return;
    }

    // Capture layout state for GSAP Flip
    const flipElements = cardEl.querySelectorAll("[data-flip-target]");
    const state = Flip.getState(flipElements);

    setActiveTypes((prev) => ({ ...prev, [groupKey]: code }));

    // Animate transition using GSAP Flip on next tick
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.45,
        ease: "power2.out",
        scale: true,
        absolute: false,
      });
    });
  };

  return (
    <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
      {groups.map((group, index) => {
        const theme = roleThemes[group.key];
        const currentCode = activeTypes[group.key] || group.types[0]?.code;
        const currentDetail =
          group.types.find((t) => t.code === currentCode) || group.types[0];

        return (
          <CardTilt3D
            key={group.key}
            maxAngle={6}
            scale={1.01}
            className="h-full"
          >
            <div
              ref={(el) => {
                cardsRef.current[group.key] = el;
              }}
              className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border ${theme.border} bg-[var(--color-surface)]/90 p-7 sm:p-9 shadow-2xl backdrop-blur-2xl transition-colors duration-500`}
              style={{
                boxShadow: `0 20px 40px -15px ${theme.glow}`,
              }}
            >
              {/* Radiant ambient glow in background */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                style={{ backgroundColor: theme.accent }}
              />

              {/* Card Header & Archetype Pill Selector */}
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4 border-b border-[var(--color-line)] pb-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold tracking-wider opacity-60">
                      {String(index + 1).padStart(2, "0")} / 04
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-wide ${theme.badge}`}
                    >
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      {group.title}
                    </span>
                  </div>

                  <span className="atlas-caption font-mono hidden sm:inline-block">
                    {labels.typeCount}
                  </span>
                </div>

                <p className="atlas-body mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                  {group.description}
                </p>

                {/* Interactive MBTI Type Pills */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.types.map((t) => {
                    const isSelected = t.code === currentCode;
                    return (
                      <button
                        key={t.code}
                        type="button"
                        onClick={() => handleSelectType(group.key, t.code)}
                        aria-pressed={isSelected}
                        className={`group/btn relative rounded-xl border px-3.5 py-1.5 text-xs font-bold tracking-wider transition-all duration-300 ${
                          isSelected
                            ? theme.activePill
                            : `border-[var(--color-line)] bg-[var(--color-canvas)]/50 text-[var(--color-ink)] ${theme.inactivePill}`
                        }`}
                      >
                        {t.code}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Center Stage: Character Portrait & Biometric Dossier */}
              <div className="relative z-10 my-6 grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
                {/* Character Illustration with bottom fade */}
                <div className="relative sm:col-span-6 flex justify-center">
                  <div
                    data-flip-target
                    className="relative h-64 sm:h-72 w-48 sm:w-56 overflow-hidden"
                    style={{
                      maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                    }}
                  >
                    <Image
                      key={currentDetail.code}
                      src={`/images/mbti/${currentDetail.code.toLowerCase()}.png`}
                      alt={`${currentDetail.code} - ${currentDetail.name}`}
                      fill
                      sizes="(max-width: 640px) 192px, 224px"
                      priority={index < 2}
                      className="object-contain object-bottom transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Character Traits & Info */}
                <div className="sm:col-span-6 space-y-3">
                  <div data-flip-target>
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-mono text-3xl font-extrabold tracking-tight text-[var(--color-ink)]">
                        {currentDetail.code}
                      </h4>
                      <span className="text-base font-semibold text-[var(--color-ink)]">
                        {currentDetail.name}
                      </span>
                    </div>

                    <p className="atlas-body mt-2 text-xs italic leading-relaxed text-[var(--color-muted)]">
                      &ldquo;{currentDetail.title}&rdquo;
                    </p>
                  </div>

                  {/* Strengths Pills */}
                  <div className="pt-2">
                    <p className="atlas-caption mb-2 font-mono uppercase tracking-wider text-[var(--color-muted)]">
                      {labels.keyStrengths}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {currentDetail.strengths.slice(0, 3).map((strength) => (
                        <span
                          key={strength}
                          className="inline-flex items-center gap-1 rounded-lg border border-[var(--color-line)] bg-[var(--color-canvas)]/80 px-2.5 py-1 text-[11px] font-medium text-[var(--color-ink)]"
                        >
                          <CheckCircle2
                            className="h-3 w-3 shrink-0"
                            style={{ color: theme.accent }}
                            aria-hidden="true"
                          />
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Strip */}
              <div className="relative z-10 flex items-center justify-between border-t border-[var(--color-line)] pt-5">
                <MagneticButton strength={0.3}>
                  <Link
                    href={`/${locale}/mbti/result/${currentDetail.code}`}
                    className="btn-primary min-h-11 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <span>{labels.viewProfile} {currentDetail.code}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </MagneticButton>

                <MagneticButton strength={0.2}>
                  <Link
                    href={`/${locale}/professions?mbti=${currentDetail.code}`}
                    className="atlas-text-link text-xs font-semibold"
                  >
                    <span>{labels.exploreCareers}</span>
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </CardTilt3D>
        );
      })}
    </div>
  );
}
