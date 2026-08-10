"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { formatCurrency } from "@/lib/formatters";
import { getShopPlatform } from "@/data/shop";
import type { MarketplaceOffer } from "@/types";

interface MobilePurchaseBarProps {
  price?: number;
  offers: MarketplaceOffer[];
}

export function MobilePurchaseBar({ price, offers }: MobilePurchaseBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeSheet = useCallback(() => {
    const sheet = sheetRef.current;
    const backdrop = backdropRef.current;

    if (!isMounted || !sheet || !backdrop) {
      setIsOpen(false);
      setIsMounted(false);
      return;
    }

    timelineRef.current?.kill();
    timelineRef.current = gsap
      .timeline({
        onComplete: () => {
          setIsOpen(false);
          setIsMounted(false);
        },
      })
      .to(sheet, {
        yPercent: 105,
        duration: 0.55,
        ease: "power4.inOut",
      })
      .to(
        backdrop,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.35"
      );
  }, [isMounted]);

  const openSheet = () => {
    if (isMounted) return;
    setIsOpen(true);
    setIsMounted(true);
  };

  useLayoutEffect(() => {
    const backdrop = backdropRef.current;
    const sheet = sheetRef.current;
    if (!isMounted || !backdrop || !sheet) return;

    timelineRef.current?.kill();
    timelineRef.current = gsap
      .timeline()
      .set(backdrop, { opacity: 0 })
      .set(sheet, { yPercent: 105 })
      .to(backdrop, {
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      })
      .to(
        sheet,
        {
          yPercent: 0,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.25"
      );

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSheet();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeSheet]);

  if (!price || offers.length === 0) return null;

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 p-4 backdrop-blur-xl transition-transform duration-300 md:hidden ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
          <div className="flex min-w-0 flex-col">
            <span className="text-xs text-muted">Mulai dari</span>
            <span className="truncate text-lg font-semibold">{formatCurrency(price)}</span>
          </div>
          <button
            type="button"
            onClick={openSheet}
            className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center border border-foreground bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Pilih Toko ({offers.length})
          </button>
        </div>
      </div>

      {isMounted && (
        <div className="fixed inset-0 z-[110] md:hidden" role="dialog" aria-modal="true" aria-labelledby="purchase-sheet-title">
          <button
            ref={backdropRef}
            type="button"
            aria-label="Tutup pilihan toko"
            onClick={closeSheet}
            className="absolute inset-0 cursor-pointer bg-black/65 backdrop-blur-sm"
          />
          <div
            ref={sheetRef}
            className="absolute bottom-0 left-0 right-0 max-h-[85svh] overflow-y-auto rounded-t-3xl border-t border-border bg-background px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-5 shadow-2xl"
          >
            <div className="mx-auto max-w-lg">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Pilihan pembelian</p>
                  <h2 id="purchase-sheet-title" className="mt-1 font-heading text-2xl font-bold">
                    Pilih Marketplace
                  </h2>
                  <p className="mt-1 text-sm text-muted">Bandingkan harga dan pilih toko yang kamu inginkan.</p>
                </div>
                <button
                  type="button"
                  onClick={closeSheet}
                  className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
                  aria-label="Tutup"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-3">
                {offers.map((offer, index) => {
                  const platform = getShopPlatform(offer.platform);
                  return (
                    <a
                      key={`${offer.platform}-${offer.storeName ?? index}`}
                      href={offer.url}
                      target="_blank"
                      rel={offer.affiliate ? "noopener noreferrer sponsored" : "noopener noreferrer"}
                      className="group flex items-center gap-3 border border-border p-3 transition-colors hover:border-foreground"
                    >
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${platform.badgeColor}`}>
                        <img src={platform.logo} alt="" className="h-8 w-8 object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{platform.name}</p>
                        <p className="truncate text-xs text-muted">{offer.storeName ?? "Toko tersedia"}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-mono text-sm font-bold">
                          {offer.price ? formatCurrency(offer.price) : "Cek harga"}
                        </p>
                        {offer.originalPrice && offer.price && offer.originalPrice > offer.price && (
                          <p className="text-[10px] text-muted line-through">{formatCurrency(offer.originalPrice)}</p>
                        )}
                        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-muted group-hover:text-foreground">
                          Buka toko →
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
                Harga dan stok dapat berubah sewaktu-waktu di marketplace.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
