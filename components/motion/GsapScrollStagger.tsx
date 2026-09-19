"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface GsapScrollStaggerProps {
  children: ReactNode;
  selector?: string;
  yOffset?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  triggerHook?: string;
  className?: string;
}

/**
 * Universal scroll-triggered stagger animation wrapper.
 * Staggers in child elements marked with the provided selector when entering the viewport.
 * Automatically clears transform styles after animation to prevent interfering with hover states.
 */
export default function GsapScrollStagger({
  children,
  selector = "[data-gsap='item']",
  yOffset = 36,
  duration = 0.75,
  stagger = 0.12,
  delay = 0,
  triggerHook = "top 85%",
  className,
}: GsapScrollStaggerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respect user reduced-motion preference
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const items = containerRef.current?.querySelectorAll(selector);
      if (!items || items.length === 0) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: yOffset,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerHook,
            toggleActions: "play none none none",
            once: true,
          },
          clearProps: "transform,opacity",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
