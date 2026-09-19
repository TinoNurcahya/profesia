"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface MilestoneMotionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Orchestrates scroll-triggered progression for the HowItWorks milestone pathway.
 * Animates milestone items and synchronizes the connecting timeline line.
 */
export default function MilestoneMotion({ children, className }: MilestoneMotionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const stepItems = containerRef.current?.querySelectorAll("[data-milestone-item]");
      const timelineLine = containerRef.current?.querySelector("[data-milestone-line]");

      if (!stepItems || stepItems.length === 0) return;

      // Animate the vertical timeline line growing downwards with scroll
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              end: "bottom 85%",
              scrub: 0.5,
            },
          }
        );
      }

      // Stagger each milestone card as it enters
      stepItems.forEach((item) => {
        const node = item.querySelector("[data-step-node]");
        const card = item.querySelector("[data-step-card]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            once: true,
          },
        });

        if (node) {
          tl.fromTo(
            node,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
          );
        }

        if (card) {
          tl.fromTo(
            card,
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.3"
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
