"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function HeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-hero-art]", { y: 20, duration: 0.6, ease: "power3.out", clearProps: "transform" });
    });
    return () => media.revert();
  }, { scope: rootRef });
  return <div ref={rootRef} className={className}>{children}</div>;
}
