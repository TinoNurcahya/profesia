"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EXPLORATION_MOTION_QUERY } from "./motionConfig";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CareerStoryMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const media = gsap.matchMedia();
      media.add(EXPLORATION_MOTION_QUERY, () => {
        const pin = root.querySelector<HTMLElement>("[data-story-pin]");
        const steps = gsap.utils.toArray<HTMLElement>("[data-story-step]", root);
        if (!pin || steps.length !== 3) return;

        root.dataset.pinned = "true";

        // Assign stacking order so newer cards sit securely on top
        steps.forEach((step, idx) => {
          step.style.zIndex = String(idx + 1);
        });

        // Initialize Card 0 visible; Cards 1 and 2 positioned below the frame (100% opaque)
        gsap.set(steps[0], { opacity: 1, yPercent: 0, scale: 1 });
        gsap.set(steps.slice(1), { opacity: 1, yPercent: 105, scale: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: "top 72px",
            end: () => `+=${window.innerHeight * 2.5}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // Generous reading hold for initial Card 0
        timeline.to({}, { duration: 1 });

        // Card 1 slides smoothly up over Card 0 (solid physical card, zero opacity bleed)
        timeline
          .to(steps[0], { scale: 0.94, filter: "brightness(0.92)", duration: 1, ease: "power2.inOut" }, "card1")
          .fromTo(
            steps[1],
            { yPercent: 105 },
            { yPercent: 0, duration: 1, ease: "power2.out" },
            "card1"
          )
          .to({}, { duration: 1 });

        // Card 2 slides smoothly up over Card 1
        timeline
          .to(steps[1], { scale: 0.94, filter: "brightness(0.92)", duration: 1, ease: "power2.inOut" }, "card2")
          .fromTo(
            steps[2],
            { yPercent: 105 },
            { yPercent: 0, duration: 1, ease: "power2.out" },
            "card2"
          )
          .to({}, { duration: 1 });

        let disposed = false;
        void document.fonts.ready.then(() => {
          if (!disposed) timeline.scrollTrigger?.refresh();
        });

        return () => {
          disposed = true;
          delete root.dataset.pinned;
          steps.forEach((s) => {
            s.style.zIndex = "";
            s.style.opacity = "";
            s.style.transform = "";
            s.style.filter = "";
          });
        };
      });

      return () => media.revert();
    },
    { scope: rootRef }
  );

  return <div ref={rootRef}>{children}</div>;
}
