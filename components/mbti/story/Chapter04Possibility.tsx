"use client";

import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import KineticSplitText from "@/components/motion/KineticSplitText";
import ScrollTextReveal from "@/components/motion/ScrollTextReveal";
import MagneticButton from "@/components/motion/MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Chapter04PossibilityProps {
  labels: {
    label: string;
    title: string;
    subtitle: string;
    stepPersonality: string;
    stepPersonalityDesc: string;
    stepTendency: string;
    stepTendencyDesc: string;
    stepStrength: string;
    stepStrengthDesc: string;
    stepSkill: string;
    stepSkillDesc: string;
    stepPossibility: string;
    stepPossibilityDesc: string;
  };
}

export default function Chapter04Possibility({ labels }: Chapter04PossibilityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);
  const desktopBeamRef = useRef<SVGPathElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);
  const mobileBeamRef = useRef<SVGPathElement>(null);

  const steps = [
    {
      num: "01",
      title: labels.stepPersonality,
      desc: labels.stepPersonalityDesc,
      offsetClass: "lg:translate-y-0",
    },
    {
      num: "02",
      title: labels.stepTendency,
      desc: labels.stepTendencyDesc,
      offsetClass: "lg:translate-y-14",
    },
    {
      num: "03",
      title: labels.stepStrength,
      desc: labels.stepStrengthDesc,
      offsetClass: "lg:translate-y-0",
    },
    {
      num: "04",
      title: labels.stepSkill,
      desc: labels.stepSkillDesc,
      offsetClass: "lg:translate-y-14",
    },
    {
      num: "05",
      title: labels.stepPossibility,
      desc: labels.stepPossibilityDesc,
      offsetClass: "lg:translate-y-0",
    },
  ];

  // GSAP animation for scroll-driven path drawing and continuous flowing energy beam
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced || !containerRef.current) return;

      // Desktop Curving Line Scrub
      const dPath = desktopPathRef.current;
      const dBeam = desktopBeamRef.current;

      if (dPath) {
        const dLength = dPath.getTotalLength();
        gsap.set(dPath, {
          strokeDasharray: dLength,
          strokeDashoffset: dLength,
        });

        gsap.to(dPath, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "center 50%",
            scrub: 0.8,
          },
        });
      }

      if (dBeam) {
        gsap.set(dBeam, {
          strokeDasharray: "140 460",
          strokeDashoffset: 600,
        });
        gsap.to(dBeam, {
          strokeDashoffset: -600,
          duration: 3.2,
          repeat: -1,
          ease: "none",
        });
      }

      // Mobile Curving Vertical Line Scrub
      const mPath = mobilePathRef.current;
      const mBeam = mobileBeamRef.current;

      if (mPath) {
        const mLength = mPath.getTotalLength();
        gsap.set(mPath, {
          strokeDasharray: mLength,
          strokeDashoffset: mLength,
        });

        gsap.to(mPath, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 80%",
            scrub: 0.8,
          },
        });
      }

      if (mBeam) {
        gsap.set(mBeam, {
          strokeDasharray: "120 400",
          strokeDashoffset: 520,
        });
        gsap.to(mBeam, {
          strokeDashoffset: -520,
          duration: 3,
          repeat: -1,
          ease: "none",
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-20 lg:py-32 bg-[var(--color-surface)] relative overflow-hidden"
      aria-labelledby="possibility-heading"
    >
      {/* Subtle Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[140px] opacity-15 bg-teal-500"
        aria-hidden="true"
      />

      <div className="page-shell space-y-16 lg:space-y-24 relative z-10">
        {/* Editorial Header */}
        <div className="max-w-3xl space-y-4">
          <KineticSplitText
            as="h2"
            id="possibility-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.035em] text-[var(--color-ink)] leading-[1.1] text-balance"
          >
            {labels.title}
          </KineticSplitText>
          <ScrollTextReveal
            as="p"
            className="text-[var(--color-muted)] text-base sm:text-lg leading-relaxed text-pretty"
          >
            {labels.subtitle}
          </ScrollTextReveal>
        </div>

        {/* Connected Zigzag Timeline Stage */}
        <div className="relative pt-4 pb-12 lg:pb-20">
          
          {/* Desktop SVG Curving Waves & Flowing Energy Beam */}
          <div className="hidden lg:block absolute inset-x-0 top-0 h-[160px] pointer-events-none z-0">
            <svg
              viewBox="0 0 1000 160"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="chapter4TealTrack" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#5eead4" stopOpacity="1" />
                </linearGradient>

                <linearGradient id="chapter4PulseBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5eead4" stopOpacity="0" />
                  <stop offset="50%" stopColor="#99f6e4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                </linearGradient>

                <filter id="chapter4Glow" x="-20%" y="-40%" width="140%" height="180%">
                  <feGaussianBlur stdDeviation="4" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Guide Track (Subtle Dotted Spline) */}
              <path
                d="M 20,36 L 100,36 C 200,36 200,92 300,92 C 400,92 400,36 500,36 C 600,36 600,92 700,92 C 800,92 800,36 900,36 L 980,36"
                fill="none"
                stroke="var(--color-line)"
                strokeWidth="2"
                strokeDasharray="6 6"
                opacity="0.3"
              />

              {/* Scroll-Drawn Curving Vibrant Path */}
              <path
                ref={desktopPathRef}
                d="M 20,36 L 100,36 C 200,36 200,92 300,92 C 400,92 400,36 500,36 C 600,36 600,92 700,92 C 800,92 800,36 900,36 L 980,36"
                fill="none"
                stroke="url(#chapter4TealTrack)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Continuous Flowing Neon Energy Beam */}
              <path
                ref={desktopBeamRef}
                d="M 20,36 L 100,36 C 200,36 200,92 300,92 C 400,92 400,36 500,36 C 600,36 600,92 700,92 C 800,92 800,36 900,36 L 980,36"
                fill="none"
                stroke="url(#chapter4PulseBeam)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#chapter4Glow)"
              />
            </svg>
          </div>

          {/* Mobile SVG Curving Vertical Line */}
          <div className="lg:hidden absolute left-[35px] top-8 bottom-12 w-[30px] pointer-events-none z-0">
            <svg
              viewBox="0 0 30 800"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
              aria-hidden="true"
            >
              {/* Subtle Vertical Dotted Guide */}
              <path
                d="M 15,0 C 26,100 4,180 15,280 C 26,380 4,460 15,560 C 26,660 4,740 15,800"
                fill="none"
                stroke="var(--color-line)"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.3"
              />
              {/* Scroll-Drawn Curving Vertical Path */}
              <path
                ref={mobilePathRef}
                d="M 15,0 C 26,100 4,180 15,280 C 26,380 4,460 15,560 C 26,660 4,740 15,800"
                fill="none"
                stroke="url(#chapter4TealTrack)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Mobile Flowing Beam */}
              <path
                ref={mobileBeamRef}
                d="M 15,0 C 26,100 4,180 15,280 C 26,380 4,460 15,560 C 26,660 4,740 15,800"
                fill="none"
                stroke="url(#chapter4PulseBeam)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#chapter4Glow)"
              />
            </svg>
          </div>

          {/* Steps as Zigzag Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-0 relative z-10">
            {steps.map((step, idx) => {
              const isLast = idx === steps.length - 1;
              return (
                <div
                  key={step.num}
                  className={`relative flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center group transition-transform duration-500 ease-out ${step.offsetClass}`}
                >
                  {/* Node Box */}
                  <MagneticButton strength={0.25}>
                    <div
                      className={`step-node relative z-10 flex items-center justify-center w-[72px] h-[72px] shrink-0 rounded-2xl bg-[var(--color-surface)]/95 backdrop-blur-md border transition-all duration-300 lg:mb-6 ${
                        isLast
                          ? "border-teal-400/60 shadow-[0_0_24px_rgba(94,234,212,0.25)] ring-2 ring-teal-400/20 group-hover:shadow-[0_0_32px_rgba(94,234,212,0.4)]"
                          : "border-[var(--color-line)] group-hover:border-teal-400/70 group-hover:shadow-[0_0_20px_rgba(94,234,212,0.2)]"
                      }`}
                    >
                      {isLast ? (
                        <Sparkles
                          aria-hidden="true"
                          className="w-6 h-6 text-teal-300 drop-shadow-[0_0_8px_rgba(94,234,212,0.6)] animate-pulse"
                        />
                      ) : (
                        <span className="font-mono text-lg font-black text-teal-400 tracking-wider">
                          {step.num}
                        </span>
                      )}
                    </div>
                  </MagneticButton>

                  {/* Vertical card content */}
                  <div className="pl-5 lg:pl-0 px-0 lg:px-4 py-1 lg:py-2 max-w-[240px] space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Mobile connector icon indicator */}
                  {!isLast && (
                    <div className="lg:hidden pl-2 text-[var(--color-line)] shrink-0 self-center">
                      <ArrowRight aria-hidden="true" className="w-4 h-4 opacity-50" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
