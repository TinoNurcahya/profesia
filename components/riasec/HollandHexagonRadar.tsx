"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import type { RiasecDimension, RiasecScores } from "@/services/riasecService";

export interface HexagonDimensionConfig {
  key: RiasecDimension;
  label: string;
  shortName: string;
  fullNameId: string;
  fullNameEn: string;
  colorHex: string;
  glowClass: string;
  angleDeg: number;
}

export const HEXAGON_DIMENSIONS: HexagonDimensionConfig[] = [
  {
    key: "R",
    label: "R",
    shortName: "Realistic",
    fullNameId: "Praktikal & Mekanikal",
    fullNameEn: "Practical & Mechanical",
    colorHex: "#f59e0b", // amber
    glowClass: "drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]",
    angleDeg: -90,
  },
  {
    key: "I",
    label: "I",
    shortName: "Investigative",
    fullNameId: "Analitis & Riset",
    fullNameEn: "Analytical & Research",
    colorHex: "#6366f1", // indigo
    glowClass: "drop-shadow-[0_0_12px_rgba(99,102,241,0.6)]",
    angleDeg: -30,
  },
  {
    key: "A",
    label: "A",
    shortName: "Artistic",
    fullNameId: "Kreatif & Ekspresif",
    fullNameEn: "Creative & Expressive",
    colorHex: "#a855f7", // purple
    glowClass: "drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]",
    angleDeg: 30,
  },
  {
    key: "S",
    label: "S",
    shortName: "Social",
    fullNameId: "Membantu & Mengajar",
    fullNameEn: "Helping & Teaching",
    colorHex: "#10b981", // emerald
    glowClass: "drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]",
    angleDeg: 90,
  },
  {
    key: "E",
    label: "E",
    shortName: "Enterprising",
    fullNameId: "Kepemimpinan & Bisnis",
    fullNameEn: "Leadership & Business",
    colorHex: "#f43f5e", // rose
    glowClass: "drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]",
    angleDeg: 150,
  },
  {
    key: "C",
    label: "C",
    shortName: "Conventional",
    fullNameId: "Terstruktur & Detail",
    fullNameEn: "Structured & Detail",
    colorHex: "#06b6d4", // cyan
    glowClass: "drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]",
    angleDeg: 210,
  },
];

interface HollandHexagonRadarProps {
  activeDimension?: RiasecDimension | null;
  scores?: RiasecScores | null;
  mode?: "story" | "result";
  locale?: string;
  className?: string;
  size?: number;
  interactive?: boolean;
  onSelectDimension?: (dim: RiasecDimension) => void;
}

const CENTER_X = 250;
const CENTER_Y = 250;
const MAX_RADIUS = 142;

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function getPointCoords(deg: number, ratio: number): { x: number; y: number } {
  const rad = degToRad(deg);
  const r = MAX_RADIUS * Math.max(0.08, Math.min(1.0, ratio));
  return {
    x: CENTER_X + r * Math.cos(rad),
    y: CENTER_Y + r * Math.sin(rad),
  };
}

export default function HollandHexagonRadar({
  activeDimension = "R",
  scores = null,
  mode = "story",
  locale = "id",
  className = "",
  size = 360,
  interactive = true,
  onSelectDimension,
}: HollandHexagonRadarProps) {
  const isEn = locale === "en";

  const currentRatios = useRef<number[]>([0.5, 0.5, 0.5, 0.5, 0.5, 0.5]);
  const [renderedPoints, setRenderedPoints] = useState<string>("");
  const [activeCoords, setActiveCoords] = useState<{ x: number; y: number }[]>([
    { x: 250, y: 90 },
    { x: 388, y: 170 },
    { x: 388, y: 330 },
    { x: 250, y: 410 },
    { x: 112, y: 330 },
    { x: 112, y: 170 },
  ]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Compute target ratios according to mode
  const targetRatios = useMemo<number[]>(() => {
    if (mode === "result" && scores) {
      return [
        scores.realistic / 100,
        scores.investigative / 100,
        scores.artistic / 100,
        scores.social / 100,
        scores.enterprising / 100,
        scores.conventional / 100,
      ];
    }

    // Storyboard mode: calculate psychological congruence distance
    // Active vertex gets 0.95. Adjacent vertices get 0.65. Opposite vertices get 0.30.
    const activeIdx = HEXAGON_DIMENSIONS.findIndex((d) => d.key === activeDimension);
    const validIdx = activeIdx >= 0 ? activeIdx : 0;

    return HEXAGON_DIMENSIONS.map((_, i) => {
      const dist = Math.min(Math.abs(i - validIdx), 6 - Math.abs(i - validIdx));
      if (dist === 0) return 0.95; // Active peak
      if (dist === 1) return 0.65; // High synergy
      if (dist === 2) return 0.45; // Moderate fit
      return 0.28; // Contrasting opposite
    });
  }, [mode, scores, activeDimension]);

  // Animate polygon vertex transitions using GSAP
  useEffect(() => {
    const animatedObj = {
      r0: currentRatios.current[0],
      r1: currentRatios.current[1],
      r2: currentRatios.current[2],
      r3: currentRatios.current[3],
      r4: currentRatios.current[4],
      r5: currentRatios.current[5],
    };

    const tween = gsap.to(animatedObj, {
      r0: targetRatios[0],
      r1: targetRatios[1],
      r2: targetRatios[2],
      r3: targetRatios[3],
      r4: targetRatios[4],
      r5: targetRatios[5],
      duration: 0.85,
      ease: "power3.out",
      onUpdate: () => {
        const ratios = [
          animatedObj.r0,
          animatedObj.r1,
          animatedObj.r2,
          animatedObj.r3,
          animatedObj.r4,
          animatedObj.r5,
        ];
        currentRatios.current = ratios;

        const coords = HEXAGON_DIMENSIONS.map((cfg, idx) =>
          getPointCoords(cfg.angleDeg, ratios[idx])
        );

        setActiveCoords(coords);
        setRenderedPoints(coords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" "));
      },
    });

    return () => {
      tween.kill();
    };
  }, [targetRatios]);

  // Concentric polygon grid outlines (20%, 40%, 60%, 80%, 100%)
  const gridPolygons = useMemo(() => {
    const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
    return levels.map((lvl) => {
      const pts = HEXAGON_DIMENSIONS.map((dim) => {
        const pt = getPointCoords(dim.angleDeg, lvl);
        return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
      }).join(" ");
      return { lvl, points: pts };
    });
  }, []);

  const activeColor = useMemo(() => {
    const active = HEXAGON_DIMENSIONS.find((d) => d.key === activeDimension);
    return active ? active.colorHex : "#10b981";
  }, [activeDimension]);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ maxWidth: size, width: "100%", aspectRatio: "1 / 1" }}
      role="img"
      aria-label="Holland Hexagon Vocational Radar Chart"
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="riasecGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={activeColor} stopOpacity="0.45" />
            <stop offset="100%" stopColor={activeColor} stopOpacity="0.12" />
          </linearGradient>

          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Circular Astrolabe Guides */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={MAX_RADIUS + 25}
          className="stroke-[var(--color-line)] stroke-[1px] fill-none opacity-40 stroke-dasharray-[4_8]"
        />

        {/* Concentric Hexagonal Grids */}
        {gridPolygons.map(({ lvl, points }) => (
          <polygon
            key={lvl}
            points={points}
            className={`fill-none transition-colors duration-500 ${
              lvl === 1.0
                ? "stroke-[var(--color-line)] stroke-[1.5px] opacity-80"
                : "stroke-[var(--color-line)] stroke-[1px] opacity-35"
            }`}
          />
        ))}

        {/* Radial Axis Spokes */}
        {HEXAGON_DIMENSIONS.map((dim) => {
          const outerPt = getPointCoords(dim.angleDeg, 1.0);
          const isActive = dim.key === activeDimension;
          return (
            <line
              key={dim.key}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={outerPt.x}
              y2={outerPt.y}
              className={`transition-all duration-500 ${
                isActive
                  ? "stroke-[2px] opacity-90"
                  : "stroke-[1px] stroke-[var(--color-line)] opacity-40"
              }`}
              style={{ stroke: isActive ? dim.colorHex : undefined }}
            />
          );
        })}

        {/* Morphing Holland Polygon Surface */}
        {renderedPoints && (
          <polygon
            points={renderedPoints}
            fill="url(#riasecGradient)"
            stroke={activeColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
            filter="url(#radarGlow)"
            className="transition-colors duration-500"
          />
        )}

        {/* Central Origin Anchor */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={4}
          className="fill-[var(--color-ink)] opacity-70"
        />

        {/* Vertex Coordinate Points and Interactive Rings */}
        {activeCoords.map((coord, idx) => {
          const cfg = HEXAGON_DIMENSIONS[idx];
          const isActive = cfg.key === activeDimension;
          const scoreVal = scores
            ? idx === 0
              ? scores.realistic
              : idx === 1
              ? scores.investigative
              : idx === 2
              ? scores.artistic
              : idx === 3
              ? scores.social
              : idx === 4
              ? scores.enterprising
              : scores.conventional
            : null;

          return (
            <g key={cfg.key} className="transition-transform duration-300">
              {/* Active Pulse Ring */}
              {isActive && (
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={12}
                  fill="none"
                  stroke={cfg.colorHex}
                  strokeWidth="1.5"
                  className="animate-ping opacity-60"
                />
              )}

              {/* Data Vertex Node */}
              <circle
                cx={coord.x}
                cy={coord.y}
                r={isActive ? 6 : 4.5}
                fill={cfg.colorHex}
                className="transition-all duration-300 stroke-[var(--color-surface)] stroke-2 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSelectDimension && onSelectDimension(cfg.key)}
              />

              {/* Score Value Pill for Result Mode */}
              {mode === "result" && scoreVal !== null && (
                <g transform={`translate(${coord.x}, ${coord.y - 14})`}>
                  <rect
                    x={-16}
                    y={-10}
                    width={32}
                    height={16}
                    rx={8}
                    fill="var(--color-surface)"
                    stroke={cfg.colorHex}
                    strokeWidth="1"
                    className="shadow-sm"
                  />
                  <text
                    x={0}
                    y={2}
                    textAnchor="middle"
                    className="text-[9px] font-bold fill-[var(--color-ink)] font-mono"
                  >
                    {scoreVal}%
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Dimension Labels Around Perimeter */}
        {HEXAGON_DIMENSIONS.map((dim, idx) => {
          const labelDist = 1.26;
          const pos = getPointCoords(dim.angleDeg, labelDist);
          const isActive = dim.key === activeDimension;
          const isHovered = hoveredIndex === idx;

          return (
            <g
              key={`label-${dim.key}`}
              transform={`translate(${pos.x}, ${pos.y})`}
              className={`cursor-pointer transition-all duration-300 ${
                interactive ? "hover:scale-105" : ""
              }`}
              onClick={() => onSelectDimension && onSelectDimension(dim.key)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Badge Background */}
              <circle
                r={16}
                fill={isActive ? dim.colorHex : "var(--color-soft)"}
                stroke={dim.colorHex}
                strokeWidth={isActive ? 2 : 1}
                className="transition-colors duration-300"
              />

              {/* Key Letter (R, I, A, S, E, C) */}
              <text
                textAnchor="middle"
                dy="4"
                className={`text-[12px] font-black tracking-wider transition-colors duration-300 ${
                  isActive
                    ? "fill-white"
                    : "fill-[var(--color-ink)]"
                }`}
              >
                {dim.label}
              </text>

              {/* Sub-label Title */}
              <text
                textAnchor="middle"
                dy="28"
                className={`text-[11px] font-bold tracking-tight transition-colors duration-300 ${
                  isActive || isHovered
                    ? "fill-[var(--color-ink)]"
                    : "fill-[var(--color-muted)]"
                }`}
              >
                {dim.shortName}
              </text>

              {/* Descriptor */}
              <text
                textAnchor="middle"
                dy="40"
                className="text-[9px] font-medium fill-[var(--color-muted)] opacity-80"
              >
                {isEn ? dim.fullNameEn : dim.fullNameId}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
