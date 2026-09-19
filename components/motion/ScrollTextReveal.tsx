"use client";

import { useRef, type ElementType, type HTMLAttributes } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollTextRevealProps extends HTMLAttributes<HTMLElement> {
  children: string;
  /** Semantic HTML element. Default "p" */
  as?: ElementType;
  /** Initial dim opacity for unrevealed words. Default 0.15 */
  dimOpacity?: number;
}

/**
 * Apple-style progressive text reveal.
 * Each word transitions from dim (dimOpacity) to fully opaque
 * as the user scrolls through the section.
 * Uses scrub-based ScrollTrigger for smooth, reading-pace motion.
 */
export default function ScrollTextReveal({
  children,
  as: Component = "p",
  dimOpacity = 0.15,
  className = "",
  ...props
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  const words = children.split(/\s+/).filter(Boolean);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        // Show all words at full opacity if reduced motion preferred
        const spans = el.querySelectorAll("[data-scrub-word]");
        spans.forEach((span) => {
          (span as HTMLElement).style.opacity = "1";
        });
        return;
      }

      const wordElements = el.querySelectorAll("[data-scrub-word]");
      if (!wordElements.length) return;

      // Set initial dim state
      gsap.set(wordElements, { opacity: dimOpacity });

      // Stagger reveal each word as user scrolls through the section
      gsap.to(wordElements, {
        opacity: 1,
        duration: 1,
        stagger: {
          each: 1,
        },
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 50%",
          scrub: 0.5,
        },
      });
    },
    { scope: containerRef, dependencies: [children, dimOpacity] }
  );

  return (
    <Component ref={containerRef} className={className} {...props}>
      {words.map((word, index) => (
        <span key={index} data-scrub-word className="inline-block mr-[0.3em] transition-none">
          {word}
        </span>
      ))}
    </Component>
  );
}
