"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ParallaxLayerProps {
  children: ReactNode;
  /** Parallax speed multiplier. Higher = more movement. Default 0.3 */
  speed?: number;
  /** Direction of parallax movement relative to scroll. Default "up" */
  direction?: "up" | "down";
  /** Additional CSS classes */
  className?: string;
}

/**
 * Scroll-driven parallax depth wrapper.
 * Translates children along Y axis relative to scroll position
 * using GSAP ScrollTrigger scrub for smooth, GPU-accelerated movement.
 */
export default function ParallaxLayer({
  children,
  speed = 0.3,
  direction = "up",
  className = "",
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = layerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const distance = speed * 100;
    const yFrom = direction === "up" ? distance : -distance;
    const yTo = direction === "up" ? -distance : distance;

    gsap.fromTo(
      el,
      { yPercent: yFrom },
      {
        yPercent: yTo,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      }
    );
  });

  return (
    <div ref={layerRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
