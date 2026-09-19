"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HeroShrinkEffectProps {
  children: ReactNode;
  className?: string;
}

/**
 * Scroll-driven shrink effect for the hero content area.
 * As user scrolls past the hero section, content scales down and fades slightly,
 * creating a receding/depth perception effect.
 */
export default function HeroShrinkEffect({ children, className = "" }: HeroShrinkEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.to(el, {
      scale: 0.92,
      opacity: 0.6,
      yPercent: -5,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: 0.3,
      },
    });
  });

  return (
    <div ref={containerRef} className={`hero-shrink-target ${className}`}>
      {children}
    </div>
  );
}
