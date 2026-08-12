"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function useParallaxMedia(intensity = 7) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    if (reduceMotion.matches || !desktop.matches) return;

    const context = gsap.context(() => {
      gsap.set(element, { force3D: true, willChange: "transform" });

      gsap.fromTo(
        element,
        { yPercent: -intensity },
        {
          yPercent: intensity,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: element.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.25,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        }
      );
    });

    return () => context.revert();
  }, [intensity]);

  return ref;
}
