"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { MediaIndicator, type MediaIndicatorVariant } from "./media-indicator";
import { cn } from "@/lib/utils";

interface CursorIndicatorProps {
  variant: MediaIndicatorVariant;
  className?: string;
  children?: ReactNode;
}

export function CursorIndicator({ variant, className, children }: CursorIndicatorProps) {
  const indicatorRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const indicator = indicatorRef.current;
    if (!indicator || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    gsap.to(indicator, {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      xPercent: -50,
      yPercent: -50,
      duration: 0.45,
      ease: "power3.out",
    });
  }, []);

  const handlePointerEnter = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const indicator = indicatorRef.current;
    if (!indicator || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    gsap.set(indicator, {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      xPercent: -50,
      yPercent: -50,
    });
    gsap.to(indicator, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
  }, []);

  const handlePointerLeave = useCallback(() => {
    const indicator = indicatorRef.current;
    if (!indicator) return;
    gsap.to(indicator, { scale: 0, opacity: 0, duration: 0.25, ease: "power2.in" });
  }, []);

  return (
    <div
      className={cn("relative", className)}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {children}
      <MediaIndicator
        ref={indicatorRef}
        variant={variant}
        className="absolute left-0 top-0 scale-0 opacity-0"
      />
    </div>
  );
}

export default CursorIndicator;
