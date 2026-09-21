"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HollandHexagonRadar, {
  HEXAGON_DIMENSIONS,
} from "./HollandHexagonRadar";
import type { RiasecDimension } from "@/services/riasecService";
import { ArrowRight, Sparkles, CheckCircle2, Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);


interface HollandHexagonStoryboardProps {
  locale: string;
}

interface DimensionContent {
  key: RiasecDimension;
  badge: string;
  titleKey: string;
  descKey: string;
  traitsKey: string;
  careersKey: string;
  themeColor: string;
  accentBg: string;
  borderColor: string;
  textColor: string;
}

const DIMENSION_DATA: DimensionContent[] = [
  {
    key: "R",
    badge: "01 / REALISTIC",
    titleKey: "dimRTitle",
    descKey: "dimRDesc",
    traitsKey: "dimRTraits",
    careersKey: "dimRCareers",
    themeColor: "#f59e0b",
    accentBg: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    key: "I",
    badge: "02 / INVESTIGATIVE",
    titleKey: "dimITitle",
    descKey: "dimIDesc",
    traitsKey: "dimITraits",
    careersKey: "dimICareers",
    themeColor: "#6366f1",
    accentBg: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30",
    textColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    key: "A",
    badge: "03 / ARTISTIC",
    titleKey: "dimATitle",
    descKey: "dimADesc",
    traitsKey: "dimATraits",
    careersKey: "dimACareers",
    themeColor: "#a855f7",
    accentBg: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    key: "S",
    badge: "04 / SOCIAL",
    titleKey: "dimSTitle",
    descKey: "dimSDesc",
    traitsKey: "dimSTraits",
    careersKey: "dimSCareers",
    themeColor: "#10b981",
    accentBg: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "E",
    badge: "05 / ENTERPRISING",
    titleKey: "dimETitle",
    descKey: "dimEDesc",
    traitsKey: "dimETraits",
    careersKey: "dimECareers",
    themeColor: "#f43f5e",
    accentBg: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    textColor: "text-rose-600 dark:text-rose-400",
  },
  {
    key: "C",
    badge: "06 / CONVENTIONAL",
    titleKey: "dimCTitle",
    descKey: "dimCDesc",
    traitsKey: "dimCTraits",
    careersKey: "dimCCareers",
    themeColor: "#06b6d4",
    accentBg: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    textColor: "text-cyan-600 dark:text-cyan-400",
  },
];

export default function HollandHexagonStoryboard({
  locale,
}: HollandHexagonStoryboardProps) {
  const t = useTranslations("RiasecIntro");
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeDimension, setActiveDimension] = useState<RiasecDimension>("R");

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth < 1024;

      if (prefersReduced || isMobile || !containerRef.current) return;

      const panels = gsap.utils.toArray<HTMLElement>(".riasec-story-panel");

      panels.forEach((panel) => {
        const dimKey = panel.getAttribute("data-dimension") as RiasecDimension;
        if (!dimKey) return;

        ScrollTrigger.create({
          trigger: panel,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveDimension(dimKey),
          onEnterBack: () => setActiveDimension(dimKey),
        });
      });
    },
    { scope: containerRef }
  );

  const currentCfg = HEXAGON_DIMENSIONS.find((d) => d.key === activeDimension) || HEXAGON_DIMENSIONS[0];

  return (
    <div ref={containerRef} className="relative w-full py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: CSS sticky — works with Lenis v1 native scroll */}
        <div className="lg:col-span-6 flex flex-col items-center justify-start">
          <div className="sticky top-24 w-full max-w-[420px] p-5 sm:p-6 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)]/90 backdrop-blur-md shadow-xl transition-all duration-500">
            {/* Ambient Backlight Glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-20 filter blur-3xl pointer-events-none transition-colors duration-700"
              style={{ backgroundColor: currentCfg.colorHex }}
            />

            {/* Radar Header Telemetry */}
            <div className="relative z-10 flex items-center justify-between border-b border-[var(--color-line)] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Compass
                  className="w-4 h-4 transition-colors duration-500"
                  style={{ color: currentCfg.colorHex }}
                />
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[var(--color-muted)]">
                  Holland Hexagon Radar
                </span>
              </div>
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border transition-colors duration-500"
                style={{
                  color: currentCfg.colorHex,
                  borderColor: currentCfg.colorHex,
                  backgroundColor: `${currentCfg.colorHex}15`,
                }}
              >
                Dim: {activeDimension} ({currentCfg.shortName})
              </span>
            </div>

            {/* SVG Geometric Radar */}
            <HollandHexagonRadar
              activeDimension={activeDimension}
              mode="story"
              locale={locale}
              size={360}
              interactive={true}
              onSelectDimension={(dim) => setActiveDimension(dim)}
            />

            {/* Micro Telemetry Bar */}
            <div className="relative z-10 mt-4 pt-3 border-t border-[var(--color-line)] flex items-center justify-between text-xs">
              <span className="text-[var(--color-muted)] font-medium text-[11px]">
                {locale === "en" ? "Interactive Radar: Click any node" : "Radar Interaktif: Klik node untuk menelusuri"}
              </span>
              <span className="font-mono font-bold" style={{ color: currentCfg.colorHex }}>
                {currentCfg.angleDeg}°
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Storyboard Track */}
        <div className="lg:col-span-6 space-y-16 lg:space-y-32">
          {DIMENSION_DATA.map((dim) => {
            const isActive = dim.key === activeDimension;
            const traitsList = t(dim.traitsKey as Parameters<typeof t>[0])
              .split(",")
              .map((s) => s.trim());
            const careersList = t(dim.careersKey as Parameters<typeof t>[0])
              .split(",")
              .map((s) => s.trim());

            return (
              <div
                key={dim.key}
                data-dimension={dim.key}
                className={`riasec-story-panel p-8 sm:p-10 rounded-3xl border transition-all duration-500 ${
                  isActive
                    ? `${dim.borderColor} bg-[var(--color-surface)] shadow-xl scale-[1.01]`
                    : "border-[var(--color-line)] bg-[var(--color-surface)]/40 opacity-75 hover:opacity-100"
                }`}
              >
                {/* Chapter Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="px-3 py-1 rounded-md text-[11px] font-mono font-bold tracking-widest border"
                    style={{
                      color: dim.themeColor,
                      borderColor: `${dim.themeColor}40`,
                      backgroundColor: `${dim.themeColor}12`,
                    }}
                  >
                    {dim.badge}
                  </span>
                  <div
                    className="h-px flex-1 transition-all duration-500"
                    style={{
                      backgroundColor: isActive ? dim.themeColor : "var(--color-line)",
                      opacity: isActive ? 0.6 : 0.2,
                    }}
                  />
                </div>

                {/* Dimension Headline */}
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--color-ink)] mb-4">
                  {t(dim.titleKey as Parameters<typeof t>[0])}
                </h3>

                {/* Narrative Detail */}
                <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed mb-8">
                  {t(dim.descKey as Parameters<typeof t>[0])}
                </p>

                {/* Key Traits Chips */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-muted)]">
                    {locale === "en" ? "Key Psychological Traits" : "Ciri Psikologis Kunci"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {traitsList.map((trait) => (
                      <span
                        key={trait}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--color-soft)] text-[var(--color-ink)] border border-[var(--color-line)]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 opacity-60" />
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* High Value Roles */}
                <div className="space-y-3 pt-6 border-t border-[var(--color-line)]">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-muted)]">
                    {locale === "en" ? "Exemplar High-Impact Careers" : "Contoh Profesi Berdaya Saing Tinggi"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {careersList.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 rounded-md text-xs font-bold"
                        style={{
                          backgroundColor: `${dim.themeColor}15`,
                          color: dim.themeColor,
                        }}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Explore Professions Button */}
                <div className="mt-8 pt-6 border-t border-[var(--color-line)] flex items-center justify-between">
                  <Link
                    href={`/${locale}/professions?riasec=${dim.key}`}
                    className="inline-flex items-center gap-2 text-sm font-bold transition-transform hover:translate-x-1"
                    style={{ color: dim.themeColor }}
                  >
                    <span>
                      {locale === "en"
                        ? `Explore ${dim.key} Professions`
                        : `Jelajahi Profesi Tipe ${dim.key}`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Sparkles
                    className="w-4 h-4 transition-opacity duration-300"
                    style={{
                      color: dim.themeColor,
                      opacity: isActive ? 0.8 : 0.2,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
