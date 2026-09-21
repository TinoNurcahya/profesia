"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ZODIAC_CONSTELLATIONS,
  type ConstellationData,
} from "@/data/constellationsData";

interface ZodiacConstellationSvgProps {
  slug: string;
  className?: string;
  size?: number | string;
  interactive?: boolean;
}

export default function ZodiacConstellationSvg({
  slug,
  className = "",
  size = "100%",
  interactive = true,
}: ZodiacConstellationSvgProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const data: ConstellationData =
    ZODIAC_CONSTELLATIONS[slug.toLowerCase()] || ZODIAC_CONSTELLATIONS.aries;

  useEffect(() => {
    if (!containerRef.current) return;

    const svg = containerRef.current;
    const paths = svg.querySelectorAll<SVGLineElement>(".constellation-line");
    const stars = svg.querySelectorAll<SVGCircleElement>(".constellation-star");

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // 1. Reset stroke dash array and offset for lines
    paths.forEach((line) => {
      const x1 = parseFloat(line.getAttribute("x1") || "0");
      const y1 = parseFloat(line.getAttribute("y1") || "0");
      const x2 = parseFloat(line.getAttribute("x2") || "0");
      const y2 = parseFloat(line.getAttribute("y2") || "0");
      const len = Math.hypot(x2 - x1, y2 - y1);

      line.style.strokeDasharray = `${len}`;
      line.style.strokeDashoffset = `${len}`;
    });

    // 2. Animate stars fade-in smoothly without any transform displacement
    tl.fromTo(
      stars,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, stagger: 0.04 }
    );

    // 3. Draw lines connecting stars (DrawSVG effect)
    tl.to(
      paths,
      {
        strokeDashoffset: 0,
        duration: 0.85,
        stagger: 0.08,
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, [slug]);

  return (
    <div
      className={`relative flex items-center justify-center select-none overflow-hidden rounded-2xl ${className}`}
      style={{ width: size, maxWidth: "100%", aspectRatio: "4 / 3" }}
    >
      {/* Ambient Celestial Nebula Glow */}
      <div
        className="absolute inset-0 rounded-full opacity-25 filter blur-3xl pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: data.colorHex }}
      />

      <svg
        ref={containerRef}
        viewBox="0 0 400 300"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <filter id={`starGlow-${slug}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Subtle Background Grid Orbit */}
        <ellipse
          cx="200"
          cy="150"
          rx="180"
          ry="120"
          className="stroke-[var(--color-line)] stroke-[1px] fill-none opacity-20 stroke-dasharray-[3_6]"
        />

        {/* Constellation Connecting Lines */}
        {data.lines.map(([idx1, idx2], lineIdx) => {
          const s1 = data.stars[idx1];
          const s2 = data.stars[idx2];
          if (!s1 || !s2) return null;

          return (
            <line
              key={`line-${lineIdx}`}
              x1={s1.x}
              y1={s1.y}
              x2={s2.x}
              y2={s2.y}
              stroke={data.colorHex}
              strokeWidth="1.75"
              strokeLinecap="round"
              className="constellation-line transition-all duration-300 opacity-80"
              style={{ filter: `drop-shadow(0 0 4px ${data.colorHex})` }}
            />
          );
        })}

        {/* Star Coordinate Nodes */}
        {data.stars.map((star, idx) => {
          return (
            <g key={`star-${idx}`} className={interactive ? "cursor-pointer group" : ""}>
              {/* Outer Core */}
              <circle
                cx={star.x}
                cy={star.y}
                r={star.r}
                fill={star.isMajor ? "#ffffff" : data.colorHex}
                stroke={data.colorHex}
                strokeWidth={star.isMajor ? 2 : 1}
                filter={`url(#starGlow-${slug})`}
                className="constellation-star transition-opacity duration-200 group-hover:opacity-90"
              />

              {/* Star Label on Hover */}
              {star.name && (
                <text
                  x={star.x}
                  y={star.y - (star.r + 6)}
                  textAnchor="middle"
                  className="text-[9px] font-mono font-medium fill-[var(--color-muted)] opacity-60 group-hover:opacity-100 transition-opacity select-none pointer-events-none"
                >
                  {star.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
