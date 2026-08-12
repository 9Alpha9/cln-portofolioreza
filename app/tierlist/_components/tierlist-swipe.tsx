"use client";

import { useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import { formatCurrency } from "@/lib/formatters";
import { useParallaxMedia } from "@/components/animation/use-parallax-media";
import type { ReviewSummary } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export function TierListSwipe({ items }: { items: ReviewSummary[] }) {
  const visibleCount = useVisibleCount();
  const swiperRef = useRef<SwiperInstance | null>(null);

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
    <div className="relative">
      <button
        type="button"
        aria-label="Produk sebelumnya"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute -left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-border bg-background/95 backdrop-blur-sm transition-colors hover:bg-foreground hover:text-background cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Produk berikutnya"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute -right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-border bg-background/95 backdrop-blur-sm transition-colors hover:bg-foreground hover:text-background cursor-pointer"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        spaceBetween={16}
        speed={550}
        loop
        grabCursor
        watchOverflow
        className="tier-swiper pb-2"
      >
        {items.map((item) => (
          <SwiperSlide key={item.slug} className="!h-auto">
            <FlipCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function FlipCard({ item }: { item: ReviewSummary }) {
  const parallaxRef = useParallaxMedia(5);

  return (
    <Link
      href={`/reviews/${item.slug}`}
      className="group/card flex flex-col h-full border border-border hover:border-foreground/50 bg-background transition-colors overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-alt">
        <div ref={parallaxRef} className="absolute -inset-[5%]">
          <img
            src={item.thumbnail.src}
            alt={item.thumbnail.alt}
            className="tier-card-image h-full w-full object-cover group-hover/card:scale-[1.015]"
          />
        </div>
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
        <h3 className="font-heading text-sm font-semibold leading-tight text-foreground transition-colors group-hover/card:text-muted-foreground mt-2 line-clamp-2">
          {item.name}
        </h3>
        <div className="mt-4 pt-2 border-t border-border flex items-center justify-between">
          <span className="text-xs font-bold font-mono">
            {item.priceFrom ? formatCurrency(item.priceFrom) : "N/A"}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted group-hover/card:text-foreground">
            Detail
          </span>
        </div>
      </div>
    </Link>
  );
}
