"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  /** Reveal direction. Default "up" */
  direction?: "up" | "down" | "scale";
}

/**
 * Subtle section entry animation using scrub-driven opacity and transform.
 * Content is ALWAYS partially visible (starts at opacity 0.5) so there
 * is never a blank gap. As user scrolls the section into view,
 * it smoothly animates to full opacity and resting position.
 * Uses scrub for buttery-smooth, scroll-linked motion rather than
 * a jarring pop-in trigger.
 */
export default function SectionReveal({
  children,
  className = "",
  direction = "up",
}: SectionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const yFrom = direction === "up" ? 30 : direction === "down" ? -30 : 0;
    const scaleFrom = direction === "scale" ? 0.95 : 0.98;

    gsap.fromTo(
      el,
      {
        y: yFrom,
        scale: scaleFrom,
        opacity: 0.5,
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          end: "top 55%",
          scrub: 0.4,
        },
        clearProps: "transform,opacity",
      }
    );
  });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
