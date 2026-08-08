"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export function TextReveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll("[data-reveal-line]");
      if (lines.length === 0) return;

      gsap.from(lines, {
        yPercent: 100,
        duration: 1.25,
        delay,
        ease: "expo.out",
        stagger: 0.075,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    // @ts-expect-error Tag is a valid HTML element
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

interface TextRevealLineProps {
  children: ReactNode;
  className?: string;
}

export function TextRevealLine({ children, className }: TextRevealLineProps) {
  return (
    <span className={`block overflow-hidden ${className || ""}`}>
      <span className="block" data-reveal-line>
        {children}
      </span>
    </span>
  );
}
