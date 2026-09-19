"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPLORATION_MOTION_QUERY, isExplorationRoute } from "./motionConfig";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    if (!isExplorationRoute(pathname)) return;
    const media = window.matchMedia(EXPLORATION_MOTION_QUERY);
    let lenis: Lenis | null = null;
    const tick = (seconds: number) => lenis?.raf(seconds * 1000);
    const destroy = () => {
      gsap.ticker.remove(tick);
      lenis?.off("scroll", ScrollTrigger.update);
      lenis?.destroy();
      lenis = null;
    };
    const sync = () => {
      destroy();
      if (!media.matches) return;
      lenis = new Lenis({
        autoRaf: false, lerp: 0.14, smoothWheel: true, syncTouch: false,
        anchors: { offset: -80 },
        prevent: (node) => node.hasAttribute("data-native-scroll"),
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
    };
    sync();
    media.addEventListener("change", sync);
    return () => { media.removeEventListener("change", sync); destroy(); };
  }, [pathname]);
  return <>{children}</>;
}
