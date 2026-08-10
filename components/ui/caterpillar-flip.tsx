"use client";

import { useState, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatters";
import type { ReviewSummary } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, Flip } from "@/lib/gsap";

function useVisibleCount() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mqls = [
        window.matchMedia("(min-width: 1024px)"),
        window.matchMedia("(min-width: 640px)"),
      ];
      const listener = () => onStoreChange();
      mqls.forEach((mql) => mql.addEventListener("change", listener));
      return () => {
        mqls.forEach((mql) => mql.removeEventListener("change", listener));
      };
    },
    () =>
      window.matchMedia("(min-width: 1024px)").matches
        ? 4
        : window.matchMedia("(min-width: 640px)").matches
          ? 2
          : 1,
    () => 4
  );
}

function cardWidthClass(count: number) {
  if (count === 4) return "w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]";
  if (count === 2) return "w-full sm:w-[calc(50%-0.5rem)]";
  return "w-full";
}

export function CaterpillarFlip({ items }: { items: ReviewSummary[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visibleCount = useVisibleCount();
  const [orderedItems, setOrderedItems] = useState(items);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const isAnimatingRef = useRef(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const moveForward = () => {
    if (isAnimatingRef.current || orderedItems.length <= visibleCount) return;
    isAnimatingRef.current = true;
    setDirection("forward");

    if (containerRef.current) {
      const q = gsap.utils.selector(containerRef);
      flipStateRef.current = Flip.getState(q(".flip-card"));
    }

    setOrderedItems((prev) => {
      const next = [...prev];
      const first = next.shift();
      if (first) next.push(first);
      return next;
    });
  };

  const moveBackward = () => {
    if (isAnimatingRef.current || orderedItems.length <= visibleCount) return;
    isAnimatingRef.current = true;
    setDirection("backward");

    if (containerRef.current) {
      const q = gsap.utils.selector(containerRef);
      flipStateRef.current = Flip.getState(q(".flip-card"));
    }

    setOrderedItems((prev) => {
      const next = [...prev];
      const last = next.pop();
      if (last) next.unshift(last);
      return next;
    });
  };

  useLayoutEffect(() => {
    const state = flipStateRef.current;
    const container = containerRef.current;
    if (!state || !container || !container.isConnected) return;

    const targets = Array.from(container.querySelectorAll<HTMLElement>(".flip-card")).filter(
      (element) => element.isConnected
    );
    if (targets.length === 0) {
      isAnimatingRef.current = false;
      flipStateRef.current = null;
      return;
    }

    const forward = direction === "forward";
    const animation = Flip.from(state, {
      targets,
      fade: true,
      absoluteOnLeave: true,
      duration: 0.6,
      ease: "power2.out",
      onEnter: (elements) => {
        const connected = elements.filter((element) => element.isConnected);
        if (connected.length === 0) return;
        gsap.fromTo(
          connected,
          {
            opacity: 0,
            scale: 0.8,
            transformOrigin: forward ? "bottom right" : "bottom left",
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          }
        );
      },
      onLeave: (elements) => {
        const connected = elements.filter((element) => element.isConnected);
        if (connected.length === 0) return;
        gsap.to(connected, {
          opacity: 0,
          scale: 0.8,
          transformOrigin: forward ? "bottom left" : "bottom right",
          duration: 0.6,
          ease: "power2.out",
        });
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        flipStateRef.current = null;
      },
    });

    return () => {
      animation.kill();
      isAnimatingRef.current = false;
      flipStateRef.current = null;
    };
  }, [orderedItems, direction]);

  if (items.length <= visibleCount) {
    return (
      <div className="flex flex-wrap gap-4">
        {items.map((item) => (
          <div key={item.slug} className={cardWidthClass(visibleCount)}>
            <FlipCard item={item} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative group/swiper">
      <button
        onClick={moveBackward}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 flex items-center justify-center border border-border bg-background/95 backdrop-blur-sm opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-foreground hover:text-background"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={moveForward}
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 flex items-center justify-center border border-border bg-background/95 backdrop-blur-sm opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-foreground hover:text-background"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="overflow-hidden pb-10">
        <div ref={containerRef} className="flex gap-4">
          {orderedItems.map((item, index) => {
            const isVisible = index < visibleCount;
            return (
              <div
                key={item.slug}
                className={`flip-card ${cardWidthClass(visibleCount)} shrink-0 ${
                  !isVisible ? "hidden" : "block"
                }`}
                data-flip-id={item.slug}
              >
                <FlipCard item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FlipCard({ item }: { item: ReviewSummary }) {
  return (
    <Link
      href={`/reviews/${item.slug}`}
      className="group/card flex flex-col h-full border border-border hover:border-foreground/50 bg-background transition-colors overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-alt">
        <img
          src={item.thumbnail.src}
          alt={item.thumbnail.alt}
          className="tier-card-image h-full w-full object-cover group-hover/card:scale-[1.015]"
        />
        <div className="absolute left-0 top-0 flex flex-wrap gap-px">
          <span className="bg-background/95 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-foreground">
            {item.category}
          </span>
        </div>
        {item.score && (
          <span className="absolute right-2 top-2 border border-border bg-background/95 px-2 py-0.5 font-mono text-[10px] font-bold tabular-nums text-foreground">
            {item.score.toFixed(1)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
          {item.brand}
        </span>
        <h3 className="font-heading text-sm font-semibold leading-tight text-foreground transition-colors group-hover/card:text-muted-foreground mt-0.5 line-clamp-2">
          {item.name}
        </h3>
        <div className="mt-auto pt-2 border-t border-border flex items-center justify-between">
          <span className="text-xs font-bold font-mono">
            {item.priceFrom ? formatCurrency(item.priceFrom) : "N/A"}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted group-hover/card:text-foreground">
            Baca
          </span>
        </div>
      </div>
    </Link>
  );
}
