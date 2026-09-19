"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EXPLORATION_MOTION_QUERY } from "./motionConfig";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CareerStoryMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add(EXPLORATION_MOTION_QUERY, () => {
      const pin = root.querySelector<HTMLElement>("[data-story-pin]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-story-step]", root);
      if (!pin || steps.length !== 3) return;
      root.dataset.pinned = "true";
      gsap.set(steps.slice(1), { opacity: 0, y: 24 });
      const timeline = gsap.timeline({ scrollTrigger: {
        trigger: pin, start: "top 64px", end: () => `+=${window.innerHeight * 2}`,
        pin: true, scrub: 0.5, invalidateOnRefresh: true,
      } });
      timeline.to({}, { duration: 1 });
      steps.slice(1).forEach((step, index) => {
        timeline.to(steps[index], { opacity: 0, y: -24, duration: 0.25 }, index + 1)
          .to(step, { opacity: 1, y: 0, duration: 0.25 }, index + 1);
      });
      timeline.to({}, { duration: 0.75 });
      const layers = root.querySelectorAll("[data-story-layer]");
      timeline.fromTo(layers, { y: 12 }, { y: -12, ease: "none", duration: 3 }, 0);
      let disposed = false;
      void document.fonts.ready.then(() => { if (!disposed) timeline.scrollTrigger?.refresh(); });
      return () => { disposed = true; delete root.dataset.pinned; };
    });
    return () => media.revert();
  }, { scope: rootRef });
  return <div ref={rootRef}>{children}</div>;
}
