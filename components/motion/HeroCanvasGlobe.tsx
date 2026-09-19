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

    let animId: number;
    let width = 0;
    let height = 0;
    let isVisible = true;

    // Detect theme color
    const getColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return {
        brand: isDark ? "rgba(94, 234, 212, " : "rgba(15, 118, 110, ",
        line: isDark ? "rgba(82, 106, 100, " : "rgba(220, 227, 223, ",
        particle: isDark ? "rgba(255, 255, 255, " : "rgba(15, 118, 110, ",
      };
    };

    // Generate 3D sphere points (orbital rings + career nodes)
    const radius = 130;
    const nodes: Point3D[] = [];
    const numNodes = 48;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio distribution

    for (let i = 0; i < numNodes; i++) {
      const y = 1 - (i / (numNodes - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      nodes.push({
        x: Math.cos(theta) * r * radius,
        y: y * radius,
        z: Math.sin(theta) * r * radius,
      });
    }

    // Generate dust particles
    const particles: (Point3D & { size: number })[] = [];
    for (let i = 0; i < 36; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phiAngle = Math.acos(2.0 * v - 1.0);
      const r = radius * (1.1 + Math.random() * 0.45);
      const sinPhi = Math.sin(phiAngle);
      particles.push({
        x: r * sinPhi * Math.cos(theta),
        y: r * sinPhi * Math.sin(theta),
        z: r * Math.cos(phiAngle),
        size: Math.random() * 1.8 + 0.6,
      });
    }

    // Handle resize
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Visibility observer to pause RAF when off-screen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    let idleAngle = 0;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
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
      const fov = 420;

      // Project function
      const project = (p: Point3D) => {
        // Rotate around Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        // Rotate around X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const scale = fov / (fov + z2 + radius * 0.5);
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
          const rX = Math.cos(a) * (radius * 1.18);
          const rY = Math.sin(a) * (radius * 1.18) * Math.sin(tilt);
          const rZ = Math.sin(a) * (radius * 1.18) * Math.cos(tilt);
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
        if (p1.z < -radius * 0.6) continue;

        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p2 = projectedNodes[j];
          if (p2.z < -radius * 0.6) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 55) {
            const alpha = Math.max(0, (1 - dist / 55) * 0.22 * p1.scale);
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
        const alpha = Math.min(1, Math.max(0.1, (p.z + radius) / (radius * 2)));
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, 2.4 * p.scale), 0, Math.PI * 2);
        ctx.fillStyle = `${colors.brand}${alpha * 0.85})`;
        ctx.fill();
      }

      // Draw floating cosmic particles
      for (const pt of particles) {
        const projected = project(pt);
        const alpha = Math.max(0.08, (projected.z + radius * 1.5) / (radius * 3));
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, pt.size * projected.scale, 0, Math.PI * 2);
        ctx.fillStyle = `${colors.particle}${alpha * 0.7})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="h-full w-full max-h-[460px] max-w-[460px] select-none pointer-events-none"
      />
    </div>
  );
}
