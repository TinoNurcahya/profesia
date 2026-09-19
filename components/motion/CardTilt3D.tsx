"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CardTilt3DProps {
  children: ReactNode;
  className?: string;
  maxAngle?: number;
  scale?: number;
}

/**
 * 3D Card Hover Physics component.
 * Rotates cards in 3D perspective following cursor coordinates with smooth GSAP damping.
 */
export default function CardTilt3D({
  children,
  className = "",
  maxAngle = 8,
  scale = 1.02,
}: CardTilt3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rxTo = useRef<gsap.QuickToFunc | null>(null);
  const ryTo = useRef<gsap.QuickToFunc | null>(null);
  const scaleTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced || !cardRef.current) return;

      rxTo.current = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.35, ease: "power2.out" });
      ryTo.current = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.35, ease: "power2.out" });
      scaleTo.current = gsap.quickTo(cardRef.current, "scale", { duration: 0.35, ease: "power2.out" });
    },
    { scope: cardRef }
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !rxTo.current || !ryTo.current || !scaleTo.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((centerY - y) / centerY) * maxAngle;
    const rotY = ((x - centerX) / centerX) * maxAngle;

    rxTo.current(rotX);
    ryTo.current(rotY);
    scaleTo.current(scale);

    if (glareRef.current) {
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`;
      glareRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (!rxTo.current || !ryTo.current || !scaleTo.current) return;
    rxTo.current(0);
    ryTo.current(0);
    scaleTo.current(1);
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div className={`perspective-[1200px] ${className}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative transform-gpu preserve-3d will-change-transform h-full w-full"
      >
        {children}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300"
        />
      </div>
    </div>
  );
}
