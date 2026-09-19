"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StaggerGridRevealProps {
  children: ReactNode;
  className?: string;
  /** CSS selector for items to animate. Default "[data-grid-item]" */
  selector?: string;
  /** Duration per item. Default 0.7 */
  duration?: number;
  /** Stagger between items. Default 0.08 */
  stagger?: number;
}

/**
 * Grid-aware stagger animation that detects column positions.
 * Odd columns enter from bottom, even columns from top,
 * creating a wave-like visual effect.
 */
export default function StaggerGridReveal({
  children,
  className = "",
  selector = "[data-grid-item]",
  duration = 0.7,
  stagger = 0.08,
}: StaggerGridRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const items = gsap.utils.toArray<HTMLElement>(selector, root);
      if (!items.length) return;

      // Detect how many columns are in the grid by comparing left offsets
      const columns = new Set(items.map((item) => item.getBoundingClientRect().left));
      const sortedColumns = Array.from(columns).sort((a, b) => a - b);

      items.forEach((item) => {
        const itemLeft = item.getBoundingClientRect().left;
        const colIndex = sortedColumns.indexOf(itemLeft);
        const isEvenCol = colIndex % 2 === 0;

        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: isEvenCol ? 50 : -50,
            scale: 0.88,
            rotateX: isEvenCol ? -8 : 8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration,
            delay: colIndex * stagger,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: "top 80%",
              once: true,
            },
            clearProps: "transform,opacity",
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`perspective-[1200px] ${className}`}>
      {children}
    </div>
  );
}
