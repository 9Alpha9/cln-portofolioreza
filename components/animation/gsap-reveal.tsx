"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { onTransitionEnd } from "@/lib/animation-sync";

interface GsapRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}

export function GsapReveal({
  children,
  className,
  delay = 0,
  y = 40,
  duration = 1.25,
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ctx: gsap.Context | null = null;

    const run = () => {
      if (!el.isConnected) return;
      ctx = gsap.context(() => {
        gsap.from(el, {
          y,
          opacity: 0,
          duration,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });
    };

    const cancel = onTransitionEnd(run);
    return () => {
      cancel();
      ctx?.revert();
    };
  }, [delay, y, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
