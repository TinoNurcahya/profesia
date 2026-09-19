"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Fixed progress bar at top of viewport showing scroll depth.
 * Thin gradient line driven by GSAP ScrollTrigger scrub.
 * Auto-hides when near the top of the page.
 */
export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bar = barRef.current;
    const wrap = wrapRef.current;
    if (!bar || !wrap) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Progress bar width scrub
    gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      }
    );

    // Auto-hide when near top
    ScrollTrigger.create({
      start: "100px top",
      end: "max",
      onEnter: () => gsap.to(wrap, { opacity: 1, duration: 0.3 }),
      onLeaveBack: () => gsap.to(wrap, { opacity: 0, duration: 0.3 }),
    });
  });

  return (
    <div
      ref={wrapRef}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none opacity-0"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{
          background: "linear-gradient(90deg, var(--color-brand), var(--color-brand-hover))",
        }}
      />
    </div>
  );
}
