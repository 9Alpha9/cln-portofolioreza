"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/formatters";
import type { MarketplaceOffer } from "@/types";

interface MobilePurchaseBarProps {
  price?: number;
  offers: MarketplaceOffer[];
}

export function MobilePurchaseBar({ price, offers }: MobilePurchaseBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!price || offers.length === 0) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-sm p-4 transition-transform duration-300 md:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted">Mulai dari</span>
          <span className="text-lg font-bold">{formatCurrency(price)}</span>
        </div>
        <a
          href={offers[0]?.url}
          target="_blank"
          rel={
            offers[0]?.affiliate
              ? "noopener noreferrer sponsored"
              : "noopener noreferrer"
          }
          className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-accent text-accent-foreground font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Lihat Harga
        </a>
      </div>
    </div>
  );
}
