"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface BentoMotionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Orchestrates scroll-triggered stagger and gauge fills for the Bento Grid section.
 */
export default function BentoMotion({ children, className }: BentoMotionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const cards = containerRef.current?.querySelectorAll("[data-bento-card]");
      const gauges = containerRef.current?.querySelectorAll("[data-gauge-target]");

      if (!cards || cards.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Stagger entrance for the 4 bento cards
      tl.fromTo(
        cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );

      // Animate the vocational gauges
      if (gauges && gauges.length > 0) {
        gauges.forEach((gauge) => {
          const targetWidth = (gauge as HTMLElement).dataset.gaugeTarget || "100%";
          tl.fromTo(
            gauge,
            { width: "0%" },
            {
              width: targetWidth,
              duration: 1.0,
              ease: "power2.out",
            },
            "-=0.5"
          );
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
