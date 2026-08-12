"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const defaultItems = [
  "PRODUCT SEEDING",
  "BRAND COLLABORATION",
  "CAMPAIGN ACTIVATION",
  "VIDEO REVIEW",
  "AFFILIATE PARTNERSHIP",
];

function MarqueeItems({ items, hidden = false }: { items: string[]; hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-center gap-x-8 pr-8 sm:gap-x-12 sm:pr-12">
      {items.map((item) => (
        <span key={item} className="flex shrink-0 items-center gap-x-8 whitespace-nowrap font-mono text-xs font-semibold tracking-[0.2em] text-muted-foreground sm:gap-x-12 sm:text-sm">
          {item}
          <span className="text-foreground">+</span>
        </span>
      ))}
    </div>
  );
}

export function CollaborationMarquee({
  items = defaultItems,
  label = "Jenis kolaborasi",
}: {
  items?: string[];
  label?: string;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const group = groupRef.current;
    if (!root || !track || !group) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let context: gsap.Context | undefined;
    let resizeObserver: ResizeObserver | undefined;

    const stop = () => {
      resizeObserver?.disconnect();
      resizeObserver = undefined;
      context?.revert();
      context = undefined;
      gsap.set(root, { clearProps: "opacity,visibility,transform" });
      gsap.set(track, { clearProps: "transform,willChange" });
    };

    const start = () => {
      stop();
      if (reducedMotion.matches) return;

      context = gsap.context(() => {
        gsap.set(root, { autoAlpha: 0, y: 16 });

        const build = () => {
          gsap.killTweensOf(track);
          const distance = group.getBoundingClientRect().width;
          if (!distance) return;

          gsap.set(track, { x: 0, force3D: true, willChange: "transform" });
          const loop = gsap.to(track, {
            x: -distance,
            duration: distance / 55,
            ease: "none",
            repeat: -1,
            force3D: true,
            paused: true,
          });

          gsap.to(root, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            onComplete: () => loop.play(),
          });
        };

        build();
        resizeObserver = new ResizeObserver(build);
        resizeObserver.observe(group);
      }, root);
    };

    start();
    reducedMotion.addEventListener("change", start);

    return () => {
      reducedMotion.removeEventListener("change", start);
      stop();
    };
  }, [items]);

  return (
    <section ref={rootRef} aria-label={label} className="border-b border-border py-6 sm:py-8">
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max">
          <div ref={groupRef} className="flex shrink-0">
            <MarqueeItems items={items} />
          </div>
          <MarqueeItems items={items} hidden />
        </div>
      </div>
    </section>
  );
}
