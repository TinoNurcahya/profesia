"use client";

import { useEffect, useState, useId } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  X,
  Sparkles,
  Compass,
  Info,
  Eye,
} from "lucide-react";
import type { ConstellationData, ConstellationStar } from "@/data/constellationsData";

interface ConstellationObservatoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  constellation: ConstellationData;
  locale: string;
}

// Background cosmic dust generator for deep sky immersion
const BACKGROUND_STARFIELD = [
  { cx: 45, cy: 35, r: 1.2, opacity: 0.4 },
  { cx: 120, cy: 40, r: 0.8, opacity: 0.3 },
  { cx: 340, cy: 50, r: 1.5, opacity: 0.5 },
  { cx: 380, cy: 110, r: 0.9, opacity: 0.35 },
  { cx: 40, cy: 160, r: 1.1, opacity: 0.4 },
  { cx: 310, cy: 220, r: 0.7, opacity: 0.25 },
  { cx: 50, cy: 260, r: 1.3, opacity: 0.45 },
  { cx: 140, cy: 280, r: 0.9, opacity: 0.3 },
  { cx: 270, cy: 275, r: 1.2, opacity: 0.4 },
  { cx: 370, cy: 260, r: 1.0, opacity: 0.35 },
  { cx: 180, cy: 30, r: 0.8, opacity: 0.3 },
  { cx: 280, cy: 35, r: 1.4, opacity: 0.5 },
  { cx: 70, cy: 110, r: 0.7, opacity: 0.25 },
  { cx: 340, cy: 160, r: 1.1, opacity: 0.4 },
  { cx: 240, cy: 290, r: 0.9, opacity: 0.35 },
];

export default function ConstellationObservatoryModal({
  isOpen,
  onClose,
  constellation,
  locale,
}: ConstellationObservatoryModalProps) {
  const isEn = locale === "en";
  const t = useTranslations("Zodiac");
  const modalId = useId();

  const [selectedStarName, setSelectedStarName] = useState<string | null>(null);
  const [showFigureOverlay, setShowFigureOverlay] = useState(true);
  const [showGridLines, setShowGridLines] = useState(true);

  // Derive the active star without synchronous setState in effect
  const activeStar: ConstellationStar | undefined =
    constellation.stars.find((s) => s.name === selectedStarName) ||
    constellation.stars.find((s) => s.isMajor) ||
    constellation.stars[0];

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${modalId}-title`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Modal Dialog Window */}
      <div
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-950/95 border border-white/15 shadow-2xl overflow-hidden transition-all duration-300"
        style={{
          boxShadow: `0 0 70px ${constellation.colorHex}25`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Elemental Color Wash */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 filter blur-3xl pointer-events-none"
          style={{ backgroundColor: constellation.colorHex }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15 filter blur-3xl pointer-events-none"
          style={{ backgroundColor: constellation.colorHex }}
        />

        {/* Modal Top Header Bar */}
        <div className="relative z-10 px-5 sm:px-7 py-4 border-b border-white/10 flex items-center justify-between gap-4 bg-white/[0.02]">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* 3D Talisman Medallion */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-amber-400/50 shadow-lg flex-shrink-0">
              <Image
                src={`/images/zodiac/${constellation.slug}.webp`}
                alt={constellation.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: constellation.colorHex }} />
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-white/50 uppercase">
                  {t("observatoryBadge")}
                </span>
              </div>
              <h2
                id={`${modalId}-title`}
                className="text-base sm:text-lg font-black text-white tracking-tight truncate flex items-center gap-2"
              >
                <span>{constellation.latinName}</span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border"
                  style={{
                    color: constellation.colorHex,
                    borderColor: `${constellation.colorHex}40`,
                    backgroundColor: `${constellation.colorHex}15`,
                  }}
                >
                  {constellation.element.toUpperCase()}
                </span>
              </h2>
            </div>
          </div>

          {/* Quick Observatory View Controls & Close Button */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Toggle Archetype Silhouette */}
            <button
              type="button"
              onClick={() => setShowFigureOverlay((prev) => !prev)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                showFigureOverlay
                  ? "bg-white/10 text-white border-white/30 shadow-inner"
                  : "bg-white/[0.02] text-white/50 border-white/10 hover:text-white hover:border-white/20"
              }`}
              title={t("toggleSilhouetteHint")}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t("toggleFigure")}</span>
            </button>

            {/* Toggle Sky Grid */}
            <button
              type="button"
              onClick={() => setShowGridLines((prev) => !prev)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                showGridLines
                  ? "bg-white/10 text-white border-white/30 shadow-inner"
                  : "bg-white/[0.02] text-white/50 border-white/10 hover:text-white hover:border-white/20"
              }`}
              title={t("toggleGridHint")}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t("toggleGrid")}</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-white/15 text-white/80 hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={t("closeObservatory")}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content: Split Observatory View */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto lg:overflow-hidden">
          {/* Left Column: Interactive Deep Sky Planetarium Canvas (7 cols) */}
          <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 p-4 sm:p-6 bg-slate-950/70">
            {/* Sky Header Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mb-3">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" style={{ color: constellation.colorHex }} />
                <span className="uppercase tracking-wider">{constellation.name} Sky Pattern</span>
              </span>
              <span>{constellation.stars.length} {t("starsMapped")}</span>
            </div>

            {/* SVG Sky Sphere Window */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl border border-white/10 bg-slate-950 shadow-inner overflow-hidden flex items-center justify-center">
              {/* Background Deep Sky Radial Gradient */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${constellation.colorHex}20 0%, transparent 70%)`,
                }}
              />

              <svg
                viewBox="0 0 400 300"
                className="w-full h-full select-none"
                aria-label={`Celestial sky map for ${constellation.name}`}
              >
                <defs>
                  {/* Star Glow Filter */}
                  <filter id={`modalStarGlow-${constellation.slug}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <radialGradient id={`haloGradient-${constellation.slug}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={constellation.colorHex} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={constellation.colorHex} stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Ambient Distant Starfield */}
                {BACKGROUND_STARFIELD.map((bStar, bIdx) => (
                  <circle
                    key={`bg-star-${bIdx}`}
                    cx={bStar.cx}
                    cy={bStar.cy}
                    r={bStar.r}
                    fill="#ffffff"
                    opacity={bStar.opacity}
                  />
                ))}

                {/* Celestial Coordinate Grid Rings */}
                {showGridLines && (
                  <g className="transition-opacity duration-300 opacity-25" stroke="#ffffff" strokeWidth="0.75" fill="none">
                    <circle cx="200" cy="150" r="130" strokeDasharray="3 6" />
                    <circle cx="200" cy="150" r="75" strokeDasharray="2 4" />
                    <line x1="200" y1="20" x2="200" y2="280" strokeDasharray="2 4" />
                    <line x1="20" y1="150" x2="380" y2="150" strokeDasharray="2 4" />
                    <ellipse cx="200" cy="150" rx="180" ry="120" strokeDasharray="4 8" />
                  </g>
                )}

                {/* Mythological Archetype Silhouette Overlay */}
                {showFigureOverlay && (
                  <g className="transition-opacity duration-500 opacity-20 pointer-events-none">
                    {/* Archetype Astrological Halo & Guide Envelope */}
                    <ellipse
                      cx="200"
                      cy="150"
                      rx="160"
                      ry="110"
                      fill={`${constellation.colorHex}15`}
                      stroke={constellation.colorHex}
                      strokeWidth="1.5"
                      strokeDasharray="4 8"
                    />
                    <text
                      x="200"
                      y="275"
                      textAnchor="middle"
                      className="text-[10px] font-mono fill-white/40 tracking-wider uppercase"
                    >
                      {constellation.name} Archetype Axis
                    </text>
                  </g>
                )}

                {/* Constellation Astronomical Line Sticks */}
                {constellation.lines.map(([idx1, idx2], lineIdx) => {
                  const s1 = constellation.stars[idx1];
                  const s2 = constellation.stars[idx2];
                  if (!s1 || !s2) return null;

                  return (
                    <line
                      key={`modal-line-${lineIdx}`}
                      x1={s1.x}
                      y1={s1.y}
                      x2={s2.x}
                      y2={s2.y}
                      stroke={constellation.colorHex}
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="transition-all duration-300"
                      style={{
                        filter: `drop-shadow(0 0 6px ${constellation.colorHex})`,
                        opacity: 0.85,
                      }}
                    />
                  );
                })}

                {/* Interactive Star Nodes */}
                {constellation.stars.map((star, idx) => {
                  const isCurrent = activeStar?.name === star.name;

                  return (
                    <g
                      key={`modal-star-${idx}`}
                      className="cursor-pointer group"
                      onClick={() => setSelectedStarName(star.name || null)}
                    >
                      {/* Generous Invisible Click Target */}
                      <circle cx={star.x} cy={star.y} r={16} fill="transparent" />

                      {/* Visible Star Core */}
                      <circle
                        cx={star.x}
                        cy={star.y}
                        r={isCurrent ? star.r + 2 : star.r}
                        fill={star.isMajor || isCurrent ? "#ffffff" : constellation.colorHex}
                        stroke={constellation.colorHex}
                        strokeWidth={star.isMajor ? 2.5 : 1.5}
                        filter={`url(#modalStarGlow-${constellation.slug})`}
                        className="transition-all duration-200"
                        style={{
                          transformBox: "fill-box",
                          transformOrigin: "center",
                        }}
                      />

                      {/* Permanent Star Label */}
                      {star.name && (
                        <text
                          x={star.x}
                          y={star.y - (star.r + 7)}
                          textAnchor="middle"
                          className={`text-[9px] font-mono tracking-wider transition-all duration-200 pointer-events-none select-none ${
                            isCurrent
                              ? "fill-white font-bold opacity-100 scale-110"
                              : "fill-white/60 group-hover:fill-white group-hover:opacity-100"
                          }`}
                        >
                          {star.name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Mobile View Toggle Bar */}
              <div className="sm:hidden absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => setShowFigureOverlay((p) => !p)}
                  className="flex items-center gap-1 text-white/70"
                >
                  <Eye className="w-3 h-3" />
                  <span>{showFigureOverlay ? t("figureOn") : t("figureOff")}</span>
                </button>
                <span className="text-white/30">|</span>
                <button
                  type="button"
                  onClick={() => setShowGridLines((p) => !p)}
                  className="flex items-center gap-1 text-white/70"
                >
                  <Compass className="w-3 h-3" />
                  <span>{showGridLines ? t("gridOn") : t("gridOff")}</span>
                </button>
              </div>
            </div>

            {/* Bottom Sky Instruction */}
            <p className="text-[11px] font-mono text-white/40 mt-3 text-center">
              {t("clickStarHint")}
            </p>
          </div>

          {/* Right Column: Star Meaning, Figure Anatomy, & Mythology (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between space-y-6 overflow-y-auto">
            <div className="space-y-5">
              {/* Selected Star Highlight Card */}
              {activeStar && (
                <div className="p-4 sm:p-5 rounded-2xl border border-white/15 bg-white/[0.03] space-y-3 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: constellation.colorHex }}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                        {t("activeStarTelemetry")}
                      </span>
                      <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                        <span>{activeStar.name}</span>
                        {activeStar.bayerDesignation && (
                          <span className="text-xs font-mono font-normal text-white/50">
                            ({activeStar.bayerDesignation})
                          </span>
                        )}
                      </h3>
                    </div>

                    {activeStar.isMajor && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                        {t("majorAnchorStar")}
                      </span>
                    )}
                  </div>

                  {/* Star Role & Meaning in the Figure */}
                  {(activeStar.meaningId || activeStar.meaningEn) && (
                    <div className="pt-1 text-xs text-white/80 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                      <p className="leading-relaxed">
                        {isEn ? activeStar.meaningEn : activeStar.meaningId}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Figure Anatomy Explanation */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span>{t("constellationAnatomy")}</span>
                </div>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  {isEn ? constellation.archetypeFigureSummaryEn : constellation.archetypeFigureSummaryId}
                </p>
              </div>

              {/* Mythology & Philosophical Career Meaning */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
                <div className="flex items-center gap-2 text-white/80 font-mono text-xs font-bold uppercase">
                  <Sparkles className="w-4 h-4" style={{ color: constellation.colorHex }} />
                  <span>{t("mythologyTitle")}</span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {isEn ? constellation.mythologyEn : constellation.mythologyId}
                </p>
              </div>
            </div>

            {/* Modal Bottom Footer Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <span className="text-[11px] font-mono text-white/40">
                IAU Standard Catalog
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold text-slate-950 bg-white hover:bg-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                {t("closeModal")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
