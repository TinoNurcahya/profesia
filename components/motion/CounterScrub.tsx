"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CounterScrubProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * Animated kinetic number counter scrubbed via GSAP ScrollTrigger.
 */
export default function CounterScrub({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className = "",
}: CounterScrubProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const counterObj = useRef({ val: 0 });

  useGSAP(
    () => {
      const el = rootRef.current;
      if (!el) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        el.textContent = `${prefix}${value}${suffix}`;
        return;
      }

      gsap.fromTo(
        counterObj.current,
        { val: 0 },
        {
          val: value,
          duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
          onUpdate: () => {
            if (el) {
              el.textContent = `${prefix}${Math.round(counterObj.current.val)}${suffix}`;
            }
          },
        }
      );
    },
    { scope: rootRef, dependencies: [value] }
  );

  return (
    <span ref={rootRef} className={`tabular-nums inline-block ${className}`}>
      {prefix}0{suffix}
    </span>
  );
}
