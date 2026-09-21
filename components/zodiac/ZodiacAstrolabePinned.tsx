"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ZodiacConstellationSvg from "./ZodiacConstellationSvg";
import ConstellationObservatoryModal from "./ConstellationObservatoryModal";
import { ZODIAC_CONSTELLATIONS } from "@/data/constellationsData";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Flame,
  Layers,
  Droplets,
  Wind,
  Maximize2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ZodiacSignData {
  slug: string;
  name_id: string;
  name_en: string;
  symbol: string;
  dates_id: string;
  dates_en: string;
  element_id: string;
  element_en: string;
  element_color: string;
  traits_id: string[];
  traits_en: string[];
  career_summary_id: string;
  career_summary_en: string;
  recommended_professions: string[];
}

interface ZodiacAstrolabePinnedProps {
  locale: string;
  zodiacs: ZodiacSignData[];
}

const ELEMENT_ICONS: Record<string, typeof Flame> = {
  fire: Flame,
  earth: Layers,
  air: Wind,
  water: Droplets,
};

export default function ZodiacAstrolabePinned({
  locale,
  zodiacs,
}: ZodiacAstrolabePinnedProps) {
  const isEn = locale === "en";
  const t = useTranslations("Zodiac");
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isObservatoryOpen, setIsObservatoryOpen] = useState(false);
  // Default 140 for SSR; ResizeObserver updates to 41% of actual container width on client.
  const [nodeRadius, setNodeRadius] = useState(140);

  useEffect(() => {
    const el = wheelContainerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setNodeRadius(Math.floor(entry.contentRect.width * 0.41));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const activeSign = zodiacs[activeIndex] || zodiacs[0];
  const activeConstellation =
    ZODIAC_CONSTELLATIONS[activeSign.slug] || ZODIAC_CONSTELLATIONS.aries;

  // Set up GSAP Pinned Astrolabe Timeline
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth < 1024;

      if (prefersReduced || isMobile || !containerRef.current) return;

      const totalSigns = zodiacs.length;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top+=46",
        end: `+=${totalSigns * 55}%`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIdx = Math.min(totalSigns - 1, Math.floor(progress * totalSigns));
          setActiveIndex(newIdx);

          // Rotate astrolabe wheel smoothly
          if (wheelRef.current) {
            const rot = -(progress * 330);
            gsap.set(wheelRef.current, { rotation: rot });
          }
        },
      });
    },
    { scope: containerRef, dependencies: [zodiacs.length] }
  );

  const ElementIcon =
    ELEMENT_ICONS[activeConstellation.element] || Flame;

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[88vh] flex flex-col justify-start pt-5 pb-8 lg:pt-6 lg:pb-10"
    >
      <div className="page-shell w-full">
        {/* Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] pb-3 mb-5 lg:mb-7">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-muted)]">
              {t("astrolabeBadge")}
            </span>
          </div>
          <span className="text-xs font-mono text-[var(--color-muted)]">
            {t("signProgress", { current: activeIndex + 1, total: zodiacs.length })}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center justify-center">
          {/* Column 1: Constellation Sky Canvas (Left) */}
          <div className="lg:col-span-4 order-2 lg:order-1 w-full">
            <div className="relative p-6 sm:p-8 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden">
              {/* Ambient Elemental Light Glow */}
              <div
                className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full opacity-20 filter blur-3xl pointer-events-none transition-colors duration-700"
                style={{ backgroundColor: activeConstellation.colorHex }}
              />

              <div className="relative z-10 space-y-4">
                {/* Constellation Header */}
                <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: activeConstellation.colorHex }}
                    />
                    <span
                      className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase"
                      style={{ color: activeConstellation.colorHex }}
                    >
                      Constellation {activeConstellation.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase">
                      {isEn ? activeSign.element_en : activeSign.element_id}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsObservatoryOpen(true)}
                      className="p-1 rounded-lg border border-[var(--color-line)] hover:border-amber-400/50 hover:bg-amber-400/10 text-[var(--color-muted)] hover:text-amber-400 transition-colors"
                      title={t("openObservatory")}
                      aria-label={t("openObservatory")}
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Constellation Drawing Canvas with Click-to-Expand */}
                <div
                  className="py-2 flex items-center justify-center cursor-pointer group relative rounded-2xl overflow-hidden"
                  onClick={() => setIsObservatoryOpen(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setIsObservatoryOpen(true);
                    }
                  }}
                  aria-label={t("openObservatory")}
                >
                  <ZodiacConstellationSvg
                    slug={activeSign.slug}
                    size="100%"
                    interactive={false}
                  />

                  {/* Hover Floating Overlay Badge */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-white/20 text-[11px] font-mono text-white flex items-center gap-1.5 shadow-xl transform translate-y-1 group-hover:translate-y-0 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t("openObservatory")}</span>
                    </span>
                  </div>
                </div>

                {/* Constellation Metadata Footer */}
                <div className="pt-3 border-t border-[var(--color-line)] flex items-center justify-between text-[11px] font-mono text-[var(--color-muted)]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: activeConstellation.colorHex }} />
                    <span>{activeConstellation.stars.length} Stars</span>
                  </span>
                  <span className="flex items-center gap-1.5 tracking-wide">
                    <span className="relative w-4 h-4 rounded-full overflow-hidden inline-block border border-[var(--color-line)] align-middle flex-shrink-0" aria-hidden="true">
                      <Image
                        src={`/images/zodiac/${activeSign.slug}.webp`}
                        alt=""
                        fill
                        sizes="16px"
                        className="object-cover"
                      />
                    </span>
                    <span>{isEn ? activeSign.name_en : activeSign.name_id}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Astrolabe Wheel (Centerpiece - Lingkaran di Tengah) */}
          <div className="lg:col-span-4 order-1 lg:order-2 w-full flex flex-col items-center justify-center">
            <div
              ref={wheelContainerRef}
              className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] aspect-square flex items-center justify-center mx-auto my-2"
            >
              {/* Mystic Golden Hand Base Layer (Visual foundation for the floating astrolabe) */}
              <div
                className="absolute inset-[-6%] sm:inset-[-10%] pointer-events-none select-none z-0 flex items-center justify-center overflow-visible translate-y-[14%] sm:translate-y-[16%]"
                aria-hidden="true"
              >
                {/* Dark ambient halo for contrast and seamless blend */}
                <div className="absolute inset-4 rounded-full bg-slate-950/70 dark:bg-slate-950/40 filter blur-2xl -z-10" />

                <Image
                  src="/images/golden-hand-in-the-shadows.png"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 768px) 380px, 420px"
                  className="object-contain object-center opacity-90 dark:opacity-95 mix-blend-screen drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)] pointer-events-none select-none"
                  style={{
                    maskImage:
                      "radial-gradient(ellipse 75% 75% at 50% 50%, black 45%, transparent 85%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 75% 75% at 50% 50%, black 45%, transparent 85%)",
                  }}
                />

                {/* Ethereal Elemental Energy Pulse radiating from the palm */}
                <div
                  className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full opacity-35 filter blur-2xl transition-colors duration-700 pointer-events-none"
                  style={{
                    backgroundColor: activeConstellation.colorHex,
                    top: "52%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>

              {/* Celestial Stardust Orbit Ring centered on astrolabe */}
              <div
                className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-amber-400/20 opacity-30 pointer-events-none animate-[spin_60s_linear_infinite] z-10"
                style={{ strokeDasharray: "3 9" }}
              />

              {/* Outer Celestial Rims floating above palm */}
              <div className="absolute inset-0 rounded-full border border-[var(--color-line)]/50 dark:border-amber-500/20 opacity-60 stroke-dasharray-[4_8] pointer-events-none z-10" />
              <div className="absolute inset-4 rounded-full border border-[var(--color-line)]/70 dark:border-amber-400/30 pointer-events-none z-10" />
              <div className="absolute inset-10 rounded-full border border-[var(--color-line)]/40 dark:border-amber-500/20 stroke-dasharray-[2_4] pointer-events-none z-10" />

              {/* Rotating Astrolabe Wheel Body */}
              <div
                ref={wheelRef}
                className="absolute inset-0 rounded-full flex items-center justify-center transition-transform duration-300 ease-out will-change-transform z-20"
              >
                {zodiacs.map((sign, idx) => {
                  const angle = (idx * 360) / zodiacs.length;
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.round(nodeRadius * Math.sin(rad) * 1e4) / 1e4;
                  const y = Math.round(-nodeRadius * Math.cos(rad) * 1e4) / 1e4;
                  const isActive = idx === activeIndex;

                  return (
                    <button
                      key={sign.slug}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      suppressHydrationWarning
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      className={`absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "scale-135 z-30 ring-3 ring-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.7)] bg-amber-400/20"
                          : "hover:scale-120 border border-[var(--color-line)]/70 hover:border-amber-400/50 hover:shadow-[0_0_12px_rgba(251,191,36,0.35)] bg-[var(--color-surface)]/85 backdrop-blur-sm"
                      }`}
                      aria-label={isEn ? sign.name_en : sign.name_id}
                    >
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={`/images/zodiac/${sign.slug}.webp`}
                          alt={isEn ? sign.name_en : sign.name_id}
                          fill
                          sizes="44px"
                          className="object-cover rounded-full select-none pointer-events-none"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Wheel Core Dial Hub */}
              <div className="relative z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/90 dark:bg-[var(--color-surface)]/85 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center text-center p-2 ring-1 ring-white/20">
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-lg border-2 border-amber-400/60 mb-0.5 flex-shrink-0">
                  <Image
                    src={`/images/zodiac/${activeSign.slug}.webp`}
                    alt={isEn ? activeSign.name_en : activeSign.name_id}
                    fill
                    sizes="48px"
                    priority
                    className="object-cover rounded-full"
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-black tracking-tight text-[var(--color-ink)] leading-tight">
                  {isEn ? activeSign.name_en : activeSign.name_id}
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono text-[var(--color-muted)] uppercase tracking-wider">
                  {isEn ? activeSign.element_en : activeSign.element_id}
                </span>
              </div>
            </div>

            <p className="text-[11px] font-mono text-[var(--color-muted)] mt-4 text-center max-w-xs">
              {t("astrolabeHint")}
            </p>
          </div>

          {/* Column 3: Zodiac Dossier Info Card (Right) */}
          <div className="lg:col-span-4 order-3 lg:order-3 w-full">
            <div className="relative p-6 sm:p-8 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-2xl transition-all duration-500 overflow-hidden">
              {/* Elemental Background Light */}
              <div
                className="absolute -top-16 -right-16 w-60 h-60 rounded-full opacity-20 filter blur-3xl pointer-events-none transition-colors duration-700"
                style={{ backgroundColor: activeConstellation.colorHex }}
              />

              <div className="relative z-10 space-y-5">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold border tracking-wider uppercase flex items-center gap-1.5"
                      style={{
                        color: activeConstellation.colorHex,
                        borderColor: `${activeConstellation.colorHex}40`,
                        backgroundColor: `${activeConstellation.colorHex}15`,
                      }}
                    >
                      <ElementIcon className="w-3 h-3" />
                      {isEn ? activeSign.element_en : activeSign.element_id}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-[var(--color-muted)]">
                      <Calendar className="w-3 h-3" />
                      {isEn ? activeSign.dates_en : activeSign.dates_id}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl" aria-hidden="true">
                      {activeSign.symbol}
                    </span>
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-amber-400/40 shadow-md flex-shrink-0" aria-hidden="true">
                      <Image
                        src={`/images/zodiac/${activeSign.slug}.webp`}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Sign Name */}
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--color-ink)]">
                  {isEn ? activeSign.name_en : activeSign.name_id}
                </h3>

                {/* Career Summary */}
                <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                  {isEn
                    ? activeSign.career_summary_en
                    : activeSign.career_summary_id}
                </p>

                {/* Trait Pills */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-muted)]">
                    {t("traits")}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(isEn ? activeSign.traits_en : activeSign.traits_id).map(
                      (trait) => (
                        <span
                          key={trait}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold bg-[var(--color-soft)] text-[var(--color-ink)] border border-[var(--color-line)]"
                        >
                          <CheckCircle2 className="w-3 h-3 opacity-60" />
                          {trait}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Action Links */}
                <div className="pt-4 border-t border-[var(--color-line)] flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Link
                    href={`/${locale}/zodiac/${activeSign.slug}`}
                    className="btn-primary min-h-10 px-5 text-xs sm:text-sm font-bold shadow-md"
                  >
                    <span>{t("viewFullDossier")}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>

                  <Link
                    href={`/${locale}/professions?search=${activeSign.slug}`}
                    className="btn-secondary min-h-10 px-4 text-xs sm:text-sm font-bold"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    <span>{t("exploreProfessions")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Constellation Celestial Planetarium Observatory Modal */}
      <ConstellationObservatoryModal
        isOpen={isObservatoryOpen}
        onClose={() => setIsObservatoryOpen(false)}
        constellation={activeConstellation}
        locale={locale}
      />
    </div>
  );
}
