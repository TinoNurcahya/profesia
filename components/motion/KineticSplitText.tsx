"use client";

import { useRef, type ElementType, type HTMLAttributes } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface KineticSplitTextProps extends HTMLAttributes<HTMLElement> {
  children: string;
  as?: ElementType;
  delay?: number;
  highlightClass?: string;
  splitBy?: "words" | "chars";
}

/**
 * Awwwards-grade typography reveal that splits text into words/characters.
 * Renders each character in a clip-mask with 3D rotation and yPercent stagger.
 */
export default function KineticSplitText({
  children,
  as: Component = "h1",
  className = "",
  delay = 0,
  highlightClass = "text-[var(--color-brand)] font-serif italic",
  splitBy = "words",
  ...props
}: KineticSplitTextProps) {
  const rootRef = useRef<HTMLElement>(null);

  // Parse markdown bold **highlight**
  const parts = children.split(/(\*\*[^*]+\*\*)/g);
  const words: { word: string; isHighlight: boolean }[] = [];

  for (const part of parts) {
    if (!part) continue;
    const isHighlight = part.startsWith("**") && part.endsWith("**");
    const raw = isHighlight ? part.slice(2, -2) : part;
    const splitWords = raw.split(/\s+/).filter(Boolean);
    for (const w of splitWords) {
      words.push({ word: w, isHighlight });
    }
  }

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced || !rootRef.current) return;

      const items = rootRef.current.querySelectorAll("[data-split-unit]");
      if (!items.length) return;

      gsap.fromTo(
        items,
        {
          yPercent: 115,
          rotateX: -30,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.85,
          delay: delay,
          stagger: splitBy === "chars" ? 0.025 : 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 92%",
            once: true,
          },
          clearProps: "transform",
        }
      );
    },
    { scope: rootRef, dependencies: [children] }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Component as any;
  return (
    <Comp ref={rootRef} className={`perspective-[1000px] ${className}`} {...props}>
      {words.map((item, wIndex) => (
        <span
          key={wIndex}
          className={`inline-block overflow-hidden align-top mr-[0.28em] whitespace-nowrap ${
            item.isHighlight ? highlightClass : ""
          }`}
        >
          {splitBy === "chars" ? (
            <span className="inline-block">
              {item.word.split("").map((char, cIndex) => (
                <span
                  key={cIndex}
                  data-split-unit
                  className="inline-block will-change-transform origin-bottom"
                >
                  {char}
                </span>
              ))}
            </span>
          ) : (
            <span
              data-split-unit
              className="inline-block will-change-transform origin-bottom"
            >
              {item.word}
            </span>
          )}
        </span>
      ))}
    </Comp>
  );
}
