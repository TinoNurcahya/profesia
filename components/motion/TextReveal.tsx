"use client";

import { Fragment, useRef, type ElementType, type HTMLAttributes } from "react";
import { usePathname } from "next/navigation";
import { isExplorationRoute } from "./motionConfig";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TextRevealProps extends HTMLAttributes<HTMLElement> {
  children: string;
  as?: ElementType;
  delay?: number;
  highlightClass?: string;
}

export default function TextReveal({ children, as: Component = "div", className = "", delay = 0, highlightClass = "text-[var(--color-brand)]", ...props }: TextRevealProps) {
  const rootRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const tokens: { text: string; highlight: boolean }[] = [];
  const parts = children.split(/(\*\*[^*]+\*\*)/g);
  for (const part of parts) {
    const highlight = part.startsWith("**") && part.endsWith("**");
    const text = highlight ? part.slice(2, -2) : part;
    for (const token of text.split(/(\s+)/)) if (token) tokens.push({ text: token, highlight });
  }
  const animate = isExplorationRoute(pathname) && (Component === "h1" || Component === "h2");
  useGSAP(() => {
    if (!animate) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const words = rootRef.current?.querySelectorAll("[data-reveal-word]");
      if (!words?.length) return;
      gsap.from(words, {
        yPercent: 105, duration: 0.6, stagger: { amount: 0.18 },
        delay: Math.min(delay, 0.1), ease: "power3.out", clearProps: "transform",
        scrollTrigger: { trigger: rootRef.current, start: "top 95%", once: true },
      });
    });
    return () => media.revert();
  }, { scope: rootRef, dependencies: [children, animate, delay], revertOnUpdate: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Component as any;
  return (
    <Comp ref={rootRef} className={className} {...props}>
      {tokens.map((token, index) => /^\s+$/.test(token.text)
        ? <Fragment key={index}>{token.text}</Fragment>
        : <span key={index} className={`reveal-mask ${token.highlight ? highlightClass : ""}`}><span data-reveal-word className="inline-block">{token.text}</span></span>)}
    </Comp>
  );
}
