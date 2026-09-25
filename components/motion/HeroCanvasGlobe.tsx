"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Interactive 3D Career Compass & Orbital Globe Canvas.
 * Renders an animated 3D celestial sphere with orbital rings and coordinate career nodes.
 * Scrubbed by GSAP ScrollTrigger and reacts dynamically to cursor physics.
 */
export default function HeroCanvasGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRotation = useRef({ x: 0, y: 0 });

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // GSAP ScrollTrigger scrubbing rotation
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        onUpdate: (self) => {
          scrollRotation.current.y = self.progress * Math.PI * 2;
          scrollRotation.current.x = Math.sin(self.progress * Math.PI) * 0.4;
        },
      });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let isVisible = false;
    let isTabActive = typeof document !== "undefined" ? !document.hidden : true;

    // Detect theme color
    const getColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return {
        brand: isDark ? "rgba(94, 234, 212, " : "rgba(15, 118, 110, ",
        line: isDark ? "rgba(82, 106, 100, " : "rgba(220, 227, 223, ",
        particle: isDark ? "rgba(255, 255, 255, " : "rgba(15, 118, 110, ",
      };
    };

    // Generate 3D sphere points (orbital rings + career nodes as unit vectors)
    let currentRadius = 180;
    const nodes: Point3D[] = [];
    const numNodes = 52;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio distribution

    for (let i = 0; i < numNodes; i++) {
      const y = 1 - (i / (numNodes - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      nodes.push({
        x: Math.cos(theta) * r,
        y: y,
        z: Math.sin(theta) * r,
      });
    }

    // Generate dust particles (unit distances)
    const particles: (Point3D & { size: number })[] = [];
    for (let i = 0; i < 40; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phiAngle = Math.acos(2.0 * v - 1.0);
      const r = 1.1 + Math.random() * 0.45;
      const sinPhi = Math.sin(phiAngle);
      particles.push({
        x: r * sinPhi * Math.cos(theta),
        y: r * sinPhi * Math.sin(theta),
        z: r * Math.cos(phiAngle),
        size: Math.random() * 2.0 + 0.6,
      });
    }

    // Handle resize
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      currentRadius = Math.min(width, height) * 0.38;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const startLoop = () => {
      if (!animId && isVisible && isTabActive) {
        animId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    };

    // Pre-warm Visibility observer (200px lookahead buffer) to pause RAF when off-screen
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
    observer.observe(canvas);

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

    let idleAngle = 0;

    const render = () => {
      if (!isVisible || !isTabActive) {
        stopLoop();
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const colors = getColors();
      idleAngle += 0.003;

      // Purely driven by scroll progression + subtle idle spin
      const totalAngleY = idleAngle + scrollRotation.current.y;
      const totalAngleX = 0.35 + scrollRotation.current.x;

      const cosY = Math.cos(totalAngleY);
      const sinY = Math.sin(totalAngleY);
      const cosX = Math.cos(totalAngleX);
      const sinX = Math.sin(totalAngleX);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = currentRadius * 3.2;

      // Project function
      const project = (p: Point3D) => {
        const px = p.x * currentRadius;
        const py = p.y * currentRadius;
        const pz = p.z * currentRadius;

        // Rotate around Y
        const x1 = px * cosY - pz * sinY;
        const z1 = pz * cosY + px * sinY;
        // Rotate around X
        const y2 = py * cosX - z1 * sinX;
        const z2 = z1 * cosX + py * sinX;

        const scale = fov / (fov + z2 + currentRadius * 0.5);
        return {
          x: centerX + x1 * scale,
          y: centerY + y2 * scale,
          scale,
          z: z2,
        };
      };

      // Draw orbital rings (3 celestial rings)
      const drawRing = (tilt: number, opacityMultiplier: number) => {
        ctx.beginPath();
        const segments = 64;
        for (let i = 0; i <= segments; i++) {
          const a = (i / segments) * Math.PI * 2;
          const rX = Math.cos(a) * 1.18;
          const rY = Math.sin(a) * 1.18 * Math.sin(tilt);
          const rZ = Math.sin(a) * 1.18 * Math.cos(tilt);
          const pt = project({ x: rX, y: rY, z: rZ });
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = `${colors.brand}${0.28 * opacityMultiplier})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      };

      drawRing(0.4, 1);
      drawRing(-0.6, 0.7);
      drawRing(1.2, 0.5);

      // Connect near nodes with subtle constellation lines
      const projectedNodes = nodes.map((n) => project(n));

      ctx.lineWidth = 0.8;
      for (let i = 0; i < projectedNodes.length; i++) {
        const p1 = projectedNodes[i];
        if (p1.z < -currentRadius * 0.6) continue;

        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p2 = projectedNodes[j];
          if (p2.z < -currentRadius * 0.6) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = currentRadius * 0.44;

          if (dist < maxDist) {
            const alpha = Math.max(0, (1 - dist / maxDist) * 0.22 * p1.scale);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${colors.brand}${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw node dots
      for (const p of projectedNodes) {
        const alpha = Math.min(1, Math.max(0.1, (p.z + currentRadius) / (currentRadius * 2)));
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.2, 2.6 * p.scale), 0, Math.PI * 2);
        ctx.fillStyle = `${colors.brand}${alpha * 0.9})`;
        ctx.fill();
      }

      // Draw floating cosmic particles
      for (const pt of particles) {
        const projected = project(pt);
        const alpha = Math.max(0.08, (projected.z + currentRadius * 1.5) / (currentRadius * 3));
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, pt.size * projected.scale, 0, Math.PI * 2);
        ctx.fillStyle = `${colors.particle}${alpha * 0.75})`;
        ctx.fill();
      }

      if (isVisible && isTabActive) {
        animId = requestAnimationFrame(render);
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
  }, []);

  return (
    <div ref={containerRef} className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="h-full w-full select-none pointer-events-none"
      />
    </div>
  );
}
