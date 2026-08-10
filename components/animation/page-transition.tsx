"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { markTransitionStart, markTransitionEnd } from "@/lib/animation-sync";

const EXIT_DURATION = 0.5;
const ENTER_DELAY = 0.05;
const ENTER_DURATION = 0.7;

const COLLAPSED = "inset(50% 50% 50% 50%)";
const COVERED = "inset(0% 0% 0% 0%)";

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const transitioningRef = useRef(false);
  const prevPathRef = useRef(pathname);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (overlay) {
      gsap.set(overlay, {
        visibility: "hidden",
        opacity: 1,
        clipPath: COLLAPSED,
      });
    }
  }, []);

  useLayoutEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        anchor.hasAttribute("download") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      const targetPath = href.split("?")[0].split("#")[0];
      if (!targetPath || targetPath === window.location.pathname) return;
      if (transitioningRef.current) return;

      window.dispatchEvent(new CustomEvent("close-mobile-menu"));

      const overlay = overlayRef.current;
      if (!overlay) return;

      event.preventDefault();
      transitioningRef.current = true;
      markTransitionStart();

      gsap.killTweensOf(overlay);
      gsap.set(overlay, { visibility: "visible" });

      // EXIT: collapse (invisible) → covered (visible) = cover screen
      gsap.fromTo(
        overlay,
        { clipPath: COLLAPSED },
        {
          clipPath: COVERED,
          duration: EXIT_DURATION,
          ease: "power3.inOut",
          onComplete: () => {
            router.push(href);
          },
        }
      );
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router]);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (prevPathRef.current === pathname) {
      return;
    }
    prevPathRef.current = pathname;

    gsap.killTweensOf(overlay);

    // New page loaded: overlay already covers screen (from exit onComplete).
    // Ensure overlay is visible + covered, then uncover.
    gsap.set(overlay, {
      visibility: "visible",
      clipPath: COVERED,
    });

    // Fire transition-end so page content starts animating UNDER the overlay.
    markTransitionEnd();

    // ENTRY: covered → collapsed (uncover)
    const animation = gsap.to(overlay, {
      clipPath: COLLAPSED,
      delay: ENTER_DELAY,
      duration: ENTER_DURATION,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(overlay, { visibility: "hidden" });
        transitioningRef.current = false;
      },
    });

    return () => {
      animation.kill();
      gsap.set(overlay, {
        visibility: "hidden",
        clipPath: COLLAPSED,
      });
      transitioningRef.current = false;
    };
  }, [pathname]);

  return (
    <>
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[100] bg-background pointer-events-none invisible"
      />
    </>
  );
}