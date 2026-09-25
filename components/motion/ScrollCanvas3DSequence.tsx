"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface NarrativeStep {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  detail?: string;
  tags?: string[];
}

interface ScrollCanvas3DSequenceProps {
  steps: NarrativeStep[];
  frameUrls?: string[];
  className?: string;
  children?: ReactNode;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  originX: number;
  originY: number;
  originZ: number;
  size: number;
  hue: number;
  speed: number;
}

interface Node4D {
  x: number;
  y: number;
  z: number;
  w: number;
  cluster: number;
}

interface Edge4D {
  i1: number;
  i2: number;
  isHyperEdge: boolean;
}

/**
 * Pinned 3D Canvas Image/Scroll Sequence engine driven by GSAP ScrollTrigger.
 * Features frame sequence rendering with procedural 3D vector and particle sequence fallback.
 */
export default function ScrollCanvas3DSequence({
  steps,
  frameUrls,
  className = "",
}: ScrollCanvas3DSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeStepRef = useRef<number>(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Preloaded image frames (if frameUrls are provided)
  const framesRef = useRef<HTMLImageElement[]>([]);
  const hasFrames = Boolean(frameUrls && frameUrls.length > 0);

  const progressRef = useRef(0);

  // Preload frame images if provided
  useEffect(() => {
    if (!frameUrls || frameUrls.length === 0) return;

    const loadedImages: HTMLImageElement[] = [];

    frameUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      loadedImages.push(img);
    });

    framesRef.current = loadedImages;

    return () => {
      framesRef.current = [];
    };
  }, [frameUrls]);

  // Set up GSAP ScrollTrigger pinning and step transitions
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced || !containerRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=240%",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          const stepCount = steps.length;
          const currentStep = Math.min(
            stepCount - 1,
            Math.floor(self.progress * stepCount)
          );

          if (currentStep !== activeStepRef.current) {
            activeStepRef.current = currentStep;
            setActiveStepIndex(currentStep);
          }
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef, dependencies: [steps.length] }
  );

  // Interactive 3D Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let isVisible = false;
    let isTabActive = typeof document !== "undefined" ? !document.hidden : true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const startLoop = () => {
      if (!animationFrameId && isVisible && isTabActive) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    // Pre-warm IntersectionObserver (200px lookahead buffer)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { rootMargin: "200px 0px 200px 0px", threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Pause RAF when browser tab is inactive
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive && isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Handle high DPI resize
    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Initialize 3D particles
    const particleCount = 120;
    const particles: Particle3D[] = [];
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 100 + Math.random() * 220;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      particles.push({
        x,
        y,
        z,
        originX: x,
        originY: y,
        originZ: z,
        size: 1 + Math.random() * 2,
        hue: 160 + Math.random() * 80,
        speed: 0.2 + Math.random() * 0.8,
      });
    }

    // 16 vertices of the 4D Hypercube (Tesseract)
    const nodes4D: Node4D[] = [];
    for (let w = -1; w <= 1; w += 2) {
      for (let z = -1; z <= 1; z += 2) {
        for (let y = -1; y <= 1; y += 2) {
          for (let x = -1; x <= 1; x += 2) {
            nodes4D.push({
              x,
              y,
              z,
              w,
              cluster: w === -1 ? 0 : 1,
            });
          }
        }
      }
    }

    // 32 edges connecting the 4D Hypercube vertices
    const edges4D: Edge4D[] = [];
    for (let i = 0; i < nodes4D.length; i++) {
      for (let j = i + 1; j < nodes4D.length; j++) {
        const a = nodes4D[i];
        const b = nodes4D[j];
        const diff =
          (a.x !== b.x ? 1 : 0) +
          (a.y !== b.y ? 1 : 0) +
          (a.z !== b.z ? 1 : 0) +
          (a.w !== b.w ? 1 : 0);
        if (diff === 1) {
          edges4D.push({
            i1: i,
            i2: j,
            isHyperEdge: a.w !== b.w,
          });
        }
      }
    }

    let angleY = 0;
    let angleX = 0;
    let ambientRotation = 0;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const progress = progressRef.current;

      // Mode A: Image Sequence (if frame images exist)
      if (hasFrames && framesRef.current.length > 0) {
        const total = framesRef.current.length;
        const frameIndex = Math.min(total - 1, Math.floor(progress * (total - 1)));
        const frame = framesRef.current[frameIndex];

        if (frame && frame.complete && frame.naturalWidth > 0) {
          const imgAspect = frame.naturalWidth / frame.naturalHeight;
          const canvasAspect = width / height;
          let drawW = width;
          let drawH = height;
          let offX = 0;
          let offY = 0;

          if (canvasAspect > imgAspect) {
            drawH = width / imgAspect;
            offY = (height - drawH) / 2;
          } else {
            drawW = height * imgAspect;
            offX = (width - drawW) / 2;
          }

          ctx.drawImage(frame, offX, offY, drawW, drawH);
        }
      }

      // Mode B: Procedural 3D Astrolabe & Cognitive Lattice Sequence
      const fov = 450;
      const centerX = width < 768 ? width * 0.5 : width * 0.58;
      const centerY = height * 0.5;

      // Natural Globe Yaw: exactly 360 degrees (2 * PI) across scroll + subtle ambient idle spin
      ambientRotation += 0.0025;
      angleY = progress * Math.PI * 2 + ambientRotation;
      const angleX = 0.35; // Fixed elegant isometric tilt (approx 20 degrees), no irregular wobble

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // 1. Ambient Background Core Glow
      const isDark = document.documentElement.classList.contains("dark");
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        width * 0.45
      );

      const glowColor =
        progress < 0.33
          ? "rgba(13, 148, 136, " // Teal
          : progress < 0.66
          ? "rgba(168, 85, 247, " // Purple
          : "rgba(14, 165, 233, "; // Cyan

      glowGrad.addColorStop(0, `${glowColor}${isDark ? 0.22 : 0.12})`);
      glowGrad.addColorStop(0.5, `${glowColor}${isDark ? 0.08 : 0.04})`);
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, width * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // 4D Dimensional Fold Angle (Morphing rotation through hyper-space)
      const angle4D = progress * Math.PI * 2 + ambientRotation * 0.4;
      const cos4D = Math.cos(angle4D);
      const sin4D = Math.sin(angle4D);

      const distance4D = 2.4;
      const baseHyperScale = width < 768 ? 140 : 175;

      // 2. Render 2 Thin Celestial Gyroscope Rings surrounding the 4D Hypercube
      const ringConfigs = [
        { radius: 215, inclination: 0.22, opacity: 0.22 },
        { radius: 240, inclination: -0.75, opacity: 0.16 },
      ];

      for (let r = 0; r < ringConfigs.length; r++) {
        const { radius: ringRadius, inclination: ringRotZ, opacity } = ringConfigs[r];
        const segments = 64;

        ctx.beginPath();
        let first = true;

        for (let s = 0; s <= segments; s++) {
          const a = (s / segments) * Math.PI * 2;
          const rx = Math.cos(a) * ringRadius;
          const ry = Math.sin(a) * ringRadius * Math.sin(ringRotZ);
          const rz = Math.sin(a) * ringRadius * Math.cos(ringRotZ);

          // 3D turntable rotation
          const x1 = rx * cosY + rz * sinY;
          const z1 = -rx * sinY + rz * cosY;
          const y1 = ry * cosX - z1 * sinX;
          const z2 = ry * sinX + z1 * cosX + fov;

          if (z2 <= 20) continue;
          const scale = fov / z2;
          const px = centerX + x1 * scale;
          const py = centerY + y1 * scale;

          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else {
            ctx.lineTo(px, py);
          }
        }

        ctx.strokeStyle = `${glowColor}${opacity})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 3. Project 4D Tesseract Vertices to 3D and 2D Screen
      const projectedNodes: ({ px: number; py: number; scale: number; isInner: boolean } | null)[] =
        new Array(nodes4D.length).fill(null);

      nodes4D.forEach((node, index) => {
        // Rotate in 4D hyper-plane (Z-W plane)
        const zRot = node.z * cos4D - node.w * sin4D;
        const wRot = node.z * sin4D + node.w * cos4D;
        const xRot = node.x;
        const yRot = node.y;

        // 4D to 3D stereographic perspective projection
        const k = 1 / (distance4D - wRot);
        const x3 = xRot * baseHyperScale * k;
        const y3 = yRot * baseHyperScale * k;
        const z3 = zRot * baseHyperScale * k;

        // 3D Turntable rotation
        const x1 = x3 * cosY + z3 * sinY;
        const z1 = -x3 * sinY + z3 * cosY;
        const y1 = y3 * cosX - z1 * sinX;
        const z2 = y3 * sinX + z1 * cosX + fov;

        if (z2 > 20) {
          const scale = fov / z2;
          projectedNodes[index] = {
            px: centerX + x1 * scale,
            py: centerY + y1 * scale,
            scale,
            isInner: wRot < 0,
          };
        }
      });

      // 4. Draw 4D Tesseract Edges (Glowing Cyber-Lattice)
      edges4D.forEach(({ i1, i2, isHyperEdge }) => {
        const p1 = projectedNodes[i1];
        const p2 = projectedNodes[i2];
        if (!p1 || !p2) return;

        const edgeGrad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
        if (isHyperEdge) {
          // Cross-connecting 4D hyper-edges (connecting inner & outer corners)
          ctx.lineWidth = 1.3;
          edgeGrad.addColorStop(0, `${glowColor}0.5)`);
          edgeGrad.addColorStop(1, `${glowColor}0.25)`);
        } else {
          // Primary cube frame edges
          ctx.lineWidth = 2.0;
          edgeGrad.addColorStop(0, `${glowColor}0.85)`);
          edgeGrad.addColorStop(1, `${glowColor}0.5)`);
        }

        ctx.strokeStyle = edgeGrad;
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      });

      // 5. Draw 4D Tesseract Vertices (Glowing Nodes)
      projectedNodes.forEach((p) => {
        if (!p) return;
        const { px, py, scale, isInner } = p;
        const nodeRadius = Math.max(2.5, (isInner ? 3.5 : 5.0) * scale);
        ctx.fillStyle = isDark ? "#ffffff" : "#0d9488";
        ctx.beginPath();
        ctx.arc(px, py, nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node aura pulse
        ctx.strokeStyle = `${glowColor}0.75)`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(px, py, nodeRadius * 2, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 4. Render Starfield Particles
      particles.forEach((p) => {
        // Rotate particle
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX + fov;

        if (z2 > 20) {
          const scale = fov / z2;
          const px = centerX + x1 * scale;
          const py = centerY + y1 * scale;

          const alpha = Math.min(1, Math.max(0.1, (scale - 0.4) * 1.5));
          ctx.fillStyle = isDark
            ? `rgba(255, 255, 255, ${alpha * 0.7})`
            : `rgba(13, 148, 136, ${alpha * 0.6})`;

          ctx.beginPath();
          ctx.arc(px, py, p.size * scale, 0, Math.PI * 2);
          ctx.fill();
        }

        // Particle orbital orbit
        p.x += p.speed * 0.3;
        if (p.x > 300) p.x = -300;
      });

      if (isVisible && isTabActive) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        stopLoop();
      }
    };

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      stopLoop();
    };
  }, [hasFrames]);

  return (
    <div
      ref={containerRef}
      className={`relative h-screen w-full overflow-hidden bg-[var(--color-canvas)] ${className}`}
    >
      {/* 3D Visual Stage Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none z-0"
      />

      {/* Grid overlay lines for high-tech HUD feeling */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] opacity-25"
      />

      {/* Top & Bottom Vignette / Shadow Transitions for smooth entry & exit */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-36 sm:h-56 bg-gradient-to-b from-[var(--color-canvas)] via-[var(--color-canvas)]/75 to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-36 sm:h-56 bg-gradient-to-t from-[var(--color-canvas)] via-[var(--color-canvas)]/75 to-transparent z-10"
      />

      {/* Foreground Narrative Overlay Container */}
      <div className="page-shell relative z-20 h-full flex flex-col justify-center pointer-events-none">
        {/* Narrative Milestones - Sheer crystal glassmorphism on mobile only, untouched on desktop */}
        <div className="my-auto w-full max-w-2xl pointer-events-auto rounded-2xl sm:rounded-3xl border border-white/15 bg-[var(--color-surface)]/25 p-5 sm:p-7 backdrop-blur-[3px] shadow-lg ring-1 ring-white/10 md:rounded-none md:border-none md:bg-transparent md:p-0 md:backdrop-blur-none md:shadow-none md:ring-0">
          <div className="grid grid-cols-1 grid-rows-1 items-center">
            {steps.map((step, index) => {
              const isCurrent = index === activeStepIndex;
              const isPast = index < activeStepIndex;

              return (
                <div
                  key={step.id}
                  className={`col-start-1 row-start-1 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isCurrent
                      ? "opacity-100 translate-y-0 scale-100 blur-0 z-20 pointer-events-auto"
                      : isPast
                      ? "opacity-0 -translate-y-16 scale-95 blur-[3px] z-10 pointer-events-none"
                      : "opacity-0 translate-y-20 scale-105 blur-[2px] z-0 pointer-events-none"
                  }`}
                >
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-4xl lg:text-5xl leading-snug md:leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      {step.title}
                    </h3>

                    <p className="atlas-body text-sm sm:text-base md:text-lg leading-relaxed text-[var(--color-muted)] max-w-lg drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
                      {step.subtitle}
                    </p>

                    {step.detail && (
                      <p className="text-xs sm:text-sm md:text-base font-medium leading-relaxed text-[var(--color-brand)] max-w-md pt-0.5 sm:pt-1 drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
                        {step.detail}
                      </p>
                    )}

                    {step.tags && step.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[var(--color-surface)]/70 px-3.5 py-1 text-xs font-medium text-[var(--color-ink)] border border-[var(--color-line)]/50 backdrop-blur-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
