"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TOTAL_FRAMES = 140;

interface Chapter01PatternsProps {
  labels: {
    label?: string;
    lead: string;
    item1: string;
    item1Desc: string;
    item2: string;
    item2Desc: string;
    item3: string;
    item3Desc: string;
    item4: string;
    item4Desc: string;
  };
}

export default function Chapter01Patterns({ labels }: Chapter01PatternsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoFallbackRef = useRef<HTMLVideoElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const frameFadeRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);
  const [useVideoFallback, setUseVideoFallback] = useState<boolean>(false);

  const stage0Ref = useRef<HTMLDivElement>(null);
  const prefixHeaderRef = useRef<HTMLDivElement>(null);
  const item0Ref = useRef<HTMLDivElement>(null);
  const item1Ref = useRef<HTMLDivElement>(null);
  const item2Ref = useRef<HTMLDivElement>(null);
  const item3Ref = useRef<HTMLDivElement>(null);

  // Helper to convert ALL-CAPS to Title Case
  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Helper to split title into prefix (e.g. "Cara Kita") and suffix (e.g. "Berpikir.")
  const splitTitle = (title: string) => {
    const titleCase = toTitleCase(title.trim());
    const parts = titleCase.split(/\s+/);
    if (parts.length >= 2) {
      return {
        prefix: parts.slice(0, 2).join(" "),
        suffix: parts.slice(2).join(" "),
      };
    }
    return {
      prefix: titleCase,
      suffix: "",
    };
  };

  const parsed1 = splitTitle(labels.item1);
  const parsed2 = splitTitle(labels.item2);
  const parsed3 = splitTitle(labels.item3);
  const parsed4 = splitTitle(labels.item4);

  // Common prefix in Title Case: "Cara Kita" (or "How We")
  const commonPrefix = parsed1.prefix;

  const items = [
    {
      id: "item-1",
      suffix: parsed1.suffix,
      description: labels.item1Desc,
    },
    {
      id: "item-2",
      suffix: parsed2.suffix,
      description: labels.item2Desc,
    },
    {
      id: "item-3",
      suffix: parsed3.suffix,
      description: labels.item3Desc,
    },
    {
      id: "item-4",
      suffix: parsed4.suffix,
      description: labels.item4Desc,
    },
  ];

  // Draw current frame onto canvas with cover aspect ratio
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    if (!width || !height) return;

    ctx.clearRect(0, 0, width, height);

    const images = framesRef.current;
    let img = images[frameIndex];

    // Fallback Level 1: Find nearest loaded frame if current target frame is still pending
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = images[frameIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = images[frameIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (img && img.complete && img.naturalWidth > 0) {
      const imgAspect = img.naturalWidth / img.naturalHeight;
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

      ctx.drawImage(img, offX, offY, drawW, drawH);
    }
  };

  // Preload all 140 frames progressively, with automatic fallback to MP4 video if frames fail
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = [];

    // Preload first frame immediately for instant first paint
    const firstImg = new Image();
    firstImg.src = `/sequences/patterns/frame_001.webp`;
    firstImg.onload = () => {
      if (!isCancelled) {
        drawFrame(0);
        setIsPreloaded(true);
      }
    };

    // Fallback Level 2: If WebP frames are missing or fail to load, switch to master MP4 video
    firstImg.onerror = () => {
      if (!isCancelled) {
        setUseVideoFallback(true);
      }
    };

    loadedImages.push(firstImg);

    // Preload remaining frames
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const num = String(i).padStart(3, "0");
      const img = new Image();
      img.src = `/sequences/patterns/frame_${num}.webp`;
      loadedImages.push(img);
    }

    framesRef.current = loadedImages;

    return () => {
      isCancelled = true;
      framesRef.current = [];
    };
  }, []);

  // Handle high-dpi canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP ScrollTrigger Pinned Timeline: Pure vertical upward slide with frame-only dark fade
  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Fallback Level 3: Accessibility for users with prefers-reduced-motion
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        return;
      }

      const s0 = stage0Ref.current;
      const prefixHeader = prefixHeaderRef.current;
      const it0 = item0Ref.current;
      const it1 = item1Ref.current;
      const it2 = item2Ref.current;
      const it3 = item3Ref.current;
      const frameFade = frameFadeRef.current;

      if (!s0 || !prefixHeader || !it0 || !it1 || !it2 || !it3 || !frameFade) return;

      // Initial state: Stage 0 is visible, prefix and items are hidden below, frameFade is transparent
      gsap.set(s0, { opacity: 1, y: 0 });
      gsap.set(prefixHeader, { opacity: 0, y: 30 });
      gsap.set([it0, it1, it2, it3], { opacity: 0, y: 40, pointerEvents: "none" });
      gsap.set(frameFade, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            // Scrub canvas frame (mapped across the sequence)
            const frameIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.floor(progress * (TOTAL_FRAMES - 1))
            );
            if (frameIndex !== currentFrameRef.current) {
              currentFrameRef.current = frameIndex;
              drawFrame(frameIndex);
            }

            // Scrub fallback video if active
            const vid = videoFallbackRef.current;
            if (vid && vid.duration) {
              vid.currentTime = progress * vid.duration;
            }
          },
        },
      });

      // 1. Stage 0 (Lead title): Generous reading hold, then slides up
      tl.to(s0, { opacity: 0, y: -45, duration: 0.6, ease: "power2.inOut" }, 1.8);

      // 2. Fixed "Cara Kita" prefix slides in from below and stays fixed
      tl.to(prefixHeader, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 2.2);

      // 3. Item 1 ("Berpikir."): Enters, holds long & comfortably, then slides up away
      tl.fromTo(
        it0,
        { opacity: 0, y: 40, pointerEvents: "none" },
        { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.6, ease: "power2.out" },
        2.4
      );
      tl.to(it0, { opacity: 0, y: -40, pointerEvents: "none", duration: 0.6, ease: "power2.inOut" }, 5.2);

      // 4. Item 2 ("Memutuskan."): Enters, holds long & comfortably, then slides up away
      tl.fromTo(
        it1,
        { opacity: 0, y: 40, pointerEvents: "none" },
        { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.6, ease: "power2.out" },
        5.6
      );
      tl.to(it1, { opacity: 0, y: -40, pointerEvents: "none", duration: 0.6, ease: "power2.inOut" }, 8.4);

      // 5. Item 3 ("Berinteraksi."): Enters, holds long & comfortably, then slides up away
      tl.fromTo(
        it2,
        { opacity: 0, y: 40, pointerEvents: "none" },
        { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.6, ease: "power2.out" },
        8.8
      );
      tl.to(it2, { opacity: 0, y: -40, pointerEvents: "none", duration: 0.6, ease: "power2.inOut" }, 11.6);

      // 6. Item 4 ("Menghadapi Ketidakpastian."): Enters, holds long & stays visible
      tl.fromTo(
        it3,
        { opacity: 0, y: 40, pointerEvents: "none" },
        { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.6, ease: "power2.out" },
        12.0
      );

      // 7. Scroll past Item 4: The visual canvas frame smoothly fades to dark background, while the text STAYS clearly visible
      tl.to(frameFade, { opacity: 1, duration: 1.6, ease: "power2.inOut" }, 14.2);

      // 8. Settled hold on dark background with text before unpinning
      tl.to({}, { duration: 0.8 }, 15.8);

      return () => {
        tl.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] bg-[var(--color-canvas)] select-none overflow-hidden"
      aria-label="Pola Kognitif dan Perilaku"
    >
      {/* Background Visual: Primary Canvas (WebP Sequence) or Fallback MP4 Video */}
      <div ref={visualWrapperRef} className="absolute inset-0 z-0 h-full w-full">
        {useVideoFallback ? (
          <video
            ref={videoFallbackRef}
            src="/videos/cognitive-patterns.mp4"
            muted
            playsInline
            preload="auto"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ opacity: isPreloaded ? 1 : 0.9 }}
          />
        )}
      </div>

      {/* Very light edge blend to seamlessly connect to neighboring sections */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[var(--color-canvas)]/20 via-transparent to-[var(--color-canvas)]/30"
        aria-hidden="true"
      />

      {/* Frame-Only Fade-to-Dark Scrim (z-[2]): Placed strictly BEHIND the text (z-10) */}
      <div
        ref={frameFadeRef}
        className="pointer-events-none absolute inset-0 z-[2] bg-[var(--color-canvas)] opacity-0"
        aria-hidden="true"
      />

      {/* Center Stage Clean Editorial Typography (z-10: Sits cleanly ABOVE the frame fade overlay) */}
      <div className="relative z-10 h-full w-full flex items-center justify-center px-4 sm:px-6 pointer-events-none">
        <div className="relative w-full max-w-4xl flex flex-col items-center justify-center text-center">

          {/* Soft Localized Radial Shadow directly behind the text for crystal-clear readability */}
          <div
            className="pointer-events-none absolute -inset-6 sm:-inset-14 z-[-1] rounded-full blur-2xl opacity-90"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 45%, transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* Stage 0: Lead Statement */}
          <div
            ref={stage0Ref}
            className="absolute inset-x-0 mx-auto text-center pointer-events-auto px-4"
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.12] text-balance max-w-3xl mx-auto">
              {labels.lead}
            </h2>
          </div>

          {/* Static Header "Cara Kita" that stays fixed */}
          <div ref={prefixHeaderRef} className="w-full text-center pointer-events-none">
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.08] text-balance">
              {commonPrefix}
            </h3>
          </div>

          {/* Dynamic Suffix & Description that transitions upwards */}
          <div className="relative w-full min-h-[180px] sm:min-h-[220px] flex items-start justify-center mt-2 sm:mt-3">
            
            {/* Item 1 */}
            <div
              ref={item0Ref}
              className="absolute inset-x-0 mx-auto text-center px-4"
            >
              <span className="block text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.08] text-balance">
                {items[0].suffix}
              </span>
              <p className="mt-5 sm:mt-7 text-lg sm:text-2xl font-medium text-white/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] text-pretty leading-relaxed max-w-2xl mx-auto">
                {items[0].description}
              </p>
            </div>

            {/* Item 2 */}
            <div
              ref={item1Ref}
              className="absolute inset-x-0 mx-auto text-center px-4"
            >
              <span className="block text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.08] text-balance">
                {items[1].suffix}
              </span>
              <p className="mt-5 sm:mt-7 text-lg sm:text-2xl font-medium text-white/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] text-pretty leading-relaxed max-w-2xl mx-auto">
                {items[1].description}
              </p>
            </div>

            {/* Item 3 */}
            <div
              ref={item2Ref}
              className="absolute inset-x-0 mx-auto text-center px-4"
            >
              <span className="block text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.08] text-balance">
                {items[2].suffix}
              </span>
              <p className="mt-5 sm:mt-7 text-lg sm:text-2xl font-medium text-white/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] text-pretty leading-relaxed max-w-2xl mx-auto">
                {items[2].description}
              </p>
            </div>

            {/* Item 4 */}
            <div
              ref={item3Ref}
              className="absolute inset-x-0 mx-auto text-center px-4"
            >
              <span className="block text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.08] text-balance">
                {items[3].suffix}
              </span>
              <p className="mt-5 sm:mt-7 text-lg sm:text-2xl font-medium text-white/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] text-pretty leading-relaxed max-w-2xl mx-auto">
                {items[3].description}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
