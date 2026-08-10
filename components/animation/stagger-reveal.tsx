"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { onTransitionEnd } from "@/lib/animation-sync";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  y?: number;
}

export function StaggerReveal({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  y = 30,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ctx: gsap.Context | null = null;

    const run = () => {
      if (!el.isConnected) return;
      ctx = gsap.context(() => {
        const items = el.querySelectorAll("[data-stagger-item]");
        if (items.length === 0) return;

        gsap.from(items, {
          y,
          opacity: 0,
          duration: 1,
          delay,
          ease: "expo.out",
          stagger,
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
  }, [stagger, delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <div data-stagger-item className={className}>
      {children}
    </div>
  );
}
