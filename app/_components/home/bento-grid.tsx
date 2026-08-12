"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { SplitTextLink } from "@/components/ui/split-text-link";
import { onTransitionEnd } from "@/lib/animation-sync";
import { useParallaxMedia } from "@/components/animation/use-parallax-media";
import type { ReviewSummary } from "@/types";

type BentoItem = {
  src: string;
  className: string;
  brand: string;
  name: string;
  shortDescription: string;
  href: string;
};

const BENTO_LAYOUT = [
  "md:row-span-2 md:col-span-1",
  "md:row-span-1 md:col-span-1",
  "md:row-span-2 md:col-span-1",
  "md:row-span-1 md:col-span-1",
];

function reviewToBentoItem(review: ReviewSummary, index: number): BentoItem {
  return {
    src: review.thumbnail.src,
    className: BENTO_LAYOUT[index % BENTO_LAYOUT.length],
    brand: review.brand,
    name: review.name,
    shortDescription: review.shortDescription,
    href: `/reviews/${review.slug}`,
  };
}

interface BentoGridProps {
  featuredReviews?: ReviewSummary[];
}

function BentoCard({ item }: { item: BentoItem }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const parallaxRef = useParallaxMedia(5);

  useEffect(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    const text = textRef.current;
    const img = imgRef.current;
    if (!card || !overlay || !text || !img) return;

    const ctx = gsap.context(() => {
      gsap.set(overlay, { opacity: 0 });
      gsap.set(text, { y: 20, opacity: 0 });
    }, card);

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    const img = imgRef.current;
    if (!overlay || !text || !img) return;

    gsap.killTweensOf([overlay, text, img]);

    gsap.to(overlay, { opacity: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(text, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.1 });
    gsap.to(img, { scale: 1.05, duration: 0.6, ease: "power2.out" });
  };

  const handleLeave = () => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    const img = imgRef.current;
    if (!overlay || !text || !img) return;

    gsap.killTweensOf([overlay, text, img]);

    gsap.to(overlay, { opacity: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(text, { y: 20, opacity: 0, duration: 0.3, ease: "power2.out", delay: 0 });
    gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
  };

  return (
    <Link
      href={item.href}
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative block h-full w-full overflow-hidden bg-muted"
    >
      <div ref={parallaxRef} className="absolute -inset-[5%]">
        <img
          ref={imgRef}
          src={item.src}
          alt={item.name}
          className="h-full w-full object-cover will-change-transform"
        />
      </div>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
      />
      <div
        ref={textRef}
        className="absolute inset-x-0 bottom-0 p-4 sm:p-5"
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
          {item.brand}
        </p>
        <h3 className="mt-1 text-base sm:text-lg font-bold text-white leading-tight">
          {item.name}
        </h3>
        <p className="mt-1 text-xs text-white/80 line-clamp-2">
          {item.shortDescription}
        </p>
      </div>
    </Link>
  );
}

export function BentoGrid({ featuredReviews = [] }: BentoGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bentoItems = featuredReviews.slice(0, 4).map(reviewToBentoItem);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx: gsap.Context | null = null;
    const run = () => {
      if (!section.isConnected) return;
      ctx = gsap.context(() => {
        gsap.from("[data-bento-card]", {
          y: 60,
          scale: 0.95,
          opacity: 0,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });
      }, section);
    };

    const cancel = onTransitionEnd(run);
    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="mt-24 w-full py-12 sm:mt-32 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <h1 className="font-heading text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Pilihan TahuTech</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] md:auto-rows-[300px] gap-3 sm:gap-4">
          {bentoItems.map((item, idx) => (
            <div key={idx} data-bento-card className={item.className}>
              <BentoCard item={item} />
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <SplitTextLink
            href="/reviews"
            className="h-12 w-[220px] items-center justify-center rounded-full bg-foreground px-8 text-xs uppercase tracking-wider text-background transition-opacity hover:opacity-85"
            textClassName="justify-center"
            activeTextClassName="text-background"
          >
            Lihat Lebih Banyak
          </SplitTextLink>
        </div>
      </div>
    </section>
  );
}

export default BentoGrid;
