"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface DrawSvgPathProps {
  className?: string;
}

/**
 * Animated SVG line that draws itself along the scroll trajectory using ScrollTrigger scrub.
 */
export default function DrawSvgPath({ className = "" }: DrawSvgPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      const container = containerRef.current;
      if (!path || !container) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 30%",
          scrub: 0.6,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`w-full overflow-hidden pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M0 60 C 300 10, 600 110, 900 30 C 1050 -10, 1150 90, 1200 60"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-[var(--color-brand)] opacity-35"
        />
      </svg>
    </div>
  );
}
