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
  detail: string;
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

interface Node3D {
  x: number;
  y: number;
  z: number;
  label: string;
  cluster: number;
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

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

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

    // Cognitive dimension nodes (Hypercube / Octahedron)
    const nodes: Node3D[] = [
      { x: -110, y: -110, z: -110, label: "Extraversion", cluster: 0 },
      { x: 110, y: -110, z: -110, label: "Introversion", cluster: 0 },
      { x: 110, y: 110, z: -110, label: "Intuition", cluster: 1 },
      { x: -110, y: 110, z: -110, label: "Sensing", cluster: 1 },
      { x: -110, y: -110, z: 110, label: "Thinking", cluster: 2 },
      { x: 110, y: -110, z: 110, label: "Feeling", cluster: 2 },
      { x: 110, y: 110, z: 110, label: "Judging", cluster: 3 },
      { x: -110, y: 110, z: 110, label: "Perceiving", cluster: 3 },
    ];

    // Edges connecting nodes
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
      [0, 6], [1, 7], [2, 4], [3, 5],
    ];

    let angleY = 0;
    let angleX = 0;

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
      const centerX = width * 0.58;
      const centerY = height * 0.5;

      // Rotation angles scrubbed purely by scroll progress
      angleY = progress * Math.PI * 3.2;
      angleX = 0.25 + progress * Math.PI * 0.9;

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

      // 2. Render 3D Celestial Astrolabe Rings
      const ringCount = 4;
      for (let r = 0; r < ringCount; r++) {
        const ringRadius = 130 + r * 55 + Math.sin(progress * Math.PI) * 35;
        const ringRotZ = (r * Math.PI) / ringCount + progress * 1.5;
        const segments = 48;

        ctx.beginPath();
        let first = true;

        for (let s = 0; s <= segments; s++) {
          const a = (s / segments) * Math.PI * 2;
          // Unrotated ring in XY
          const rx = Math.cos(a) * ringRadius;
          const ry = Math.sin(a) * ringRadius * Math.cos(ringRotZ);
          const rz = Math.sin(a) * ringRadius * Math.sin(ringRotZ);

          // 3D rotation
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

        ctx.strokeStyle = `${glowColor}${0.18 + r * 0.07})`;
        ctx.lineWidth = r === 0 ? 1.8 : 1;
        ctx.stroke();
      }

      // 3. Render 3D Connected Cognitive Nodes
      const morphFactor = Math.sin(progress * Math.PI);
      const projectedNodes: { px: number; py: number; scale: number; node: Node3D }[] = [];

      nodes.forEach((node) => {
        // Morph node position with progress
        const expansion = 1 + morphFactor * 0.45;
        const nx = node.x * expansion;
        const ny = node.y * expansion;
        const nz = node.z * expansion;

        // Apply 3D rotation
        const x1 = nx * cosY + nz * sinY;
        const z1 = -nx * sinY + nz * cosY;
        const y1 = ny * cosX - z1 * sinX;
        const z2 = ny * sinX + z1 * cosX + fov;

        if (z2 > 20) {
          const scale = fov / z2;
          projectedNodes.push({
            px: centerX + x1 * scale,
            py: centerY + y1 * scale,
            scale,
            node,
          });
        }
      });

      // Draw 3D Edges
      ctx.lineWidth = 1.2;
      edges.forEach(([i1, i2]) => {
        const p1 = projectedNodes[i1];
        const p2 = projectedNodes[i2];
        if (!p1 || !p2) return;

        const edgeGrad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
        edgeGrad.addColorStop(0, `${glowColor}0.35)`);
        edgeGrad.addColorStop(1, `${glowColor}0.1)`);

        ctx.strokeStyle = edgeGrad;
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      });

      // Draw Nodes
      projectedNodes.forEach(({ px, py, scale }) => {
        const nodeRadius = Math.max(2, 4 * scale);
        ctx.fillStyle = isDark ? "#ffffff" : "#0d9488";
        ctx.beginPath();
        ctx.arc(px, py, nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node aura pulse
        ctx.strokeStyle = `${glowColor}0.6)`;
        ctx.lineWidth = 1;
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

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
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

      {/* Foreground Narrative Overlay Container */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between p-6 sm:p-12 lg:p-16 pointer-events-none">
        {/* Top HUD bar */}
        <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--color-brand)] animate-ping" />
            <span className="atlas-caption font-mono uppercase tracking-widest text-[var(--color-brand)]">
              3D Career Sequence / Step {String(activeStepIndex + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeStepIndex
                    ? "w-8 bg-[var(--color-brand)]"
                    : "w-2 bg-[var(--color-line)]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Narrative Card Milestones */}
        <div className="my-auto max-w-xl pointer-events-auto">
          {steps.map((step, index) => {
            const isActive = index === activeStepIndex;
            return (
              <div
                key={step.id}
                className={`transition-all duration-700 ease-out ${
                  isActive
                    ? "opacity-100 translate-y-0 relative"
                    : "opacity-0 translate-y-8 absolute pointer-events-none"
                }`}
              >
                <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/85 p-8 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4 border-b border-[var(--color-line)] pb-4">
                    <span className="atlas-caption font-mono text-[var(--color-brand)] font-bold">
                      {step.badge}
                    </span>
                    <span className="atlas-caption font-mono text-[var(--color-muted)]">
                      {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
                    {step.title}
                  </h3>

                  <p className="atlas-body mt-3 text-sm leading-relaxed">
                    {step.subtitle}
                  </p>

                  <div className="mt-6 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)]/60 p-4">
                    <p className="text-sm font-medium leading-relaxed text-[var(--color-ink)]">
                      {step.detail}
                    </p>
                    {step.tags && step.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1 text-xs font-semibold text-[var(--color-brand)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Scroll Indicator */}
        <div className="flex items-center justify-between border-t border-[var(--color-line)] pt-4 text-xs font-mono text-[var(--color-muted)]">
          <span>SCRUB_DRIVEN_SEQUENCE: ACTIVE</span>
          <span className="flex items-center gap-2">
            <span>SCROLL TO ADVANCE</span>
            <span className="inline-block animate-bounce">↓</span>
          </span>
        </div>
      </div>
    </div>
  );
}
