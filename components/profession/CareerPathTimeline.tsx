"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface CareerPathTimelineProps {
  steps: string[];
  className?: string;
}

/**
 * Animated career path timeline with DrawSVG-style connecting line
 * and staggered stage card entrance on scroll.
 */
export default function CareerPathTimeline({ steps, className = "" }: CareerPathTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const cards = containerRef.current?.querySelectorAll("[data-stage]");
      const line = lineRef.current;

      if (!cards || cards.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Animate SVG connecting line drawing
      if (line) {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(line, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
        });
      }

      // Stagger entrance for stage cards
      tl.fromTo(
        cards,
        {
          opacity: 0,
          y: 24,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "transform,opacity",
        },
        line ? "-=0.8" : 0
      );

      // Animate stage numbers counting up
      const counters = containerRef.current?.querySelectorAll("[data-counter]");
      if (counters) {
        counters.forEach((counter, idx) => {
          const el = counter as HTMLElement;
          tl.fromTo(
            el,
            { textContent: "00" },
            {
              textContent: String(idx + 1).padStart(2, "0"),
              duration: 0.4,
              ease: "power1.inOut",
              snap: { textContent: 1 },
            },
            `-=${0.5 - idx * 0.1}`
          );
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {/* SVG connecting line (desktop only) */}
      <div className="hidden lg:block relative h-6 mx-4 mb-2">
        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
          <line
            ref={lineRef}
            x1="2%"
            y1="50%"
            x2="98%"
            y2="50%"
            stroke="var(--color-brand)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <li
            key={step}
            data-stage
            className="rounded-xl border border-[var(--color-line)] bg-[var(--color-soft)] p-4 space-y-2 relative group hover:border-teal-300 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between text-xs font-mono font-bold text-teal-700">
              <span>
                STAGE <span data-counter>0{index + 1}</span>
              </span>
              {index < steps.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-[var(--color-muted)] hidden lg:block" aria-hidden="true" />
              )}
            </div>
            <h3 className="text-sm font-bold text-[var(--color-ink)] leading-snug">
              {step}
            </h3>
          </li>
        ))}
      </ol>
    </div>
  );
}
