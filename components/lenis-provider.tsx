"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 5),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
      syncTouch: true,
      syncTouchLerp: 0.12,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
      if (window.__lenis === lenis) {
        window.__lenis = undefined;
      }
    };
  }, []);

  useEffect(() => {
    const handleMenuState = (event: Event) => {
      const isOpen = (event as CustomEvent<{ open: boolean }>).detail.open;
      if (isOpen) {
        lenisRef.current?.stop();
      } else {
        lenisRef.current?.start();
      }
    };

    window.addEventListener("mobile-menu-state", handleMenuState);
    return () => window.removeEventListener("mobile-menu-state", handleMenuState);
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    let frame = 0;
    let refreshFrame = 0;
    let resizeObserver: ResizeObserver | null = null;

    lenis.stop();
    lenis.scrollTo(0, { immediate: true, force: true });

    const syncLayout = () => {
      lenis.resize();
      ScrollTrigger.refresh();
      lenis.start();
    };

    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        syncLayout();
        refreshFrame = requestAnimationFrame(syncLayout);
      });
    });

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(document.body);
    }

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(refreshFrame);
      resizeObserver?.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}
