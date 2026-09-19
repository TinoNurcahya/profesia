"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  asChild?: boolean;
}

/**
 * Magnetic button wrapper that physically pulls toward the cursor on hover.
 * Uses GSAP quickTo for 60fps GPU-accelerated spring physics.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
}: MagneticButtonProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced || !rootRef.current) return;

      xTo.current = gsap.quickTo(rootRef.current, "x", { duration: 0.4, ease: "power3.out" });
      yTo.current = gsap.quickTo(rootRef.current, "y", { duration: 0.4, ease: "power3.out" });
    },
    { scope: rootRef }
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!rootRef.current || !xTo.current || !yTo.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    xTo.current(distanceX);
    yTo.current(distanceY);
  };

  const handleMouseLeave = () => {
    if (!xTo.current || !yTo.current) return;
    xTo.current(0);
    yTo.current(0);
  };

  return (
    <div
      ref={rootRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
