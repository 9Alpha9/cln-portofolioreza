"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import { gsap } from "@/lib/gsap";
import { onTransitionEnd } from "@/lib/animation-sync";
import { Sun, Moon } from "lucide-react";
import { SplitTextLink } from "@/components/ui/split-text-link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/reviews", label: "Gear Review" },
  { href: "/tierlist", label: "Tier List" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const navRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const themeBtnRef = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const line1Ref = useRef<SVGLineElement>(null);
  const line2Ref = useRef<SVGLineElement>(null);
  const line3Ref = useRef<SVGLineElement>(null);

  useEffect(() => {
    // Avoid calling setState synchronously in effect
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    // Notify Lenis via custom event
    const event = new CustomEvent("mobile-menu-state", { detail: { open } });
    window.dispatchEvent(event);

    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    if (!bgRef.current || !linksRef.current || !ctaRef.current || !logoRef.current) return;

    let ctx: gsap.Context | null = null;
    const run = () => {
      if (!bgRef.current?.isConnected || !logoRef.current?.isConnected || !linksRef.current?.isConnected || !ctaRef.current?.isConnected) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(bgRef.current, {
          y: -40,
          opacity: 0,
          duration: 1.2,
          scale: 0.96,
        })
          .from(logoRef.current, { y: -20, opacity: 0, duration: 0.8 }, "-=0.9")
          .from(linksRef.current?.children ?? [], { y: -20, opacity: 0, duration: 0.8, stagger: 0.06 }, "-=0.7")
          .from(ctaRef.current, { y: -20, opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.5");
      });
    };

    const cancel = onTransitionEnd(run);
    return () => {
      cancel();
      ctx?.revert();
    };
  }, [mounted]);

  const isFirstRender = useRef(true);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);

  // Mobile menu: morph hamburger lines + animate full-screen menu panel
  useEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;
    if (!panel || !backdrop || !l1 || !l2 || !l3) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(panel, { x: "100%", opacity: 0 });
      gsap.set(backdrop, { opacity: 0 });
      if (!open) return;
    }

    const mobileLinks = Array.from(panel.querySelectorAll<HTMLElement>("[data-mobile-link]"));

    menuTlRef.current?.kill();
    const tl = gsap.timeline();
    menuTlRef.current = tl;

    if (open) {
      // Animate Hamburger to X & slide left from 100%
      tl.to(l2, { opacity: 0, scaleX: 0, transformOrigin: "center", duration: 0.3, ease: "power2.inOut" })
        .to(l1, { y: 6, rotation: 45, transformOrigin: "center", duration: 0.3, ease: "power2.inOut" }, 0)
        .to(l3, { y: -6, rotation: -45, transformOrigin: "center", duration: 0.3, ease: "power2.inOut" }, 0)
        .to(backdrop, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0)
        .to(panel, { x: 0, opacity: 1, duration: 0.6, ease: "power4.out" }, "<0.05")
        .fromTo(
          mobileLinks,
          { y: 30, x: 0, opacity: 0 },
          { y: 0, x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
          "-=0.35"
        );
    } else {
      // Morph X back to Hamburger & slide right to 100% to close
      tl.to(mobileLinks, {
        x: 60,
        opacity: 0,
        duration: 0.3,
        stagger: 0.08,
        ease: "power3.in",
      })
        .to(l2, { opacity: 1, scaleX: 1, duration: 0.35, ease: "power2.inOut" }, "-=0.1")
        .to(l1, { y: 0, rotation: 0, duration: 0.35, ease: "power2.inOut" }, "<")
        .to(l3, { y: 0, rotation: 0, duration: 0.35, ease: "power2.inOut" }, "<")
        .to(panel, { x: "100%", opacity: 0, duration: 0.6, ease: "power4.in" }, "-=0.2")
        .to(backdrop, { opacity: 0, duration: 0.4, ease: "power2.in" }, "<");
    }

    return () => {
      menuTlRef.current?.kill();
      menuTlRef.current = null;
    };
  }, [open]);

  // Close mobile menu on route change & custom event
  useEffect(() => {
    const handleCloseMenu = () => setOpen(false);
    window.addEventListener("close-mobile-menu", handleCloseMenu);
    window.addEventListener("popstate", handleCloseMenu);
    return () => {
      window.removeEventListener("close-mobile-menu", handleCloseMenu);
      window.removeEventListener("popstate", handleCloseMenu);
    };
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Desktop Navbar */}
      <header
        ref={navRef}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1440px] px-4 transition-all duration-300"
      >
        <div
          ref={bgRef}
          className={`relative flex h-16 items-center justify-between rounded-[100px] border transition-all duration-500 ease-out px-3 sm:px-3 ${scrolled
            ? "border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "border-white/20 bg-white/70 backdrop-blur-xl dark:bg-black/50 dark:border-white/10"
            }`}
        >
          {/* Logo */}
          <Link
            ref={logoRef}
            href="/"
            className="flex h-11 items-center justify-center overflow-hidden transition-opacity duration-300 hover:opacity-70"
            aria-label="TahuTech beranda"
          >
            <img
              src="/logos/tahutechs-logos.png"
              alt="TahuTech"
              className="max-w-none w-[90px]"
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            ref={linksRef}
            className="hidden md:flex items-center gap-1 lg:gap-2"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <SplitTextLink
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${scrolled ? "text-muted-foreground" : "text-white dark:text-muted-foreground"}`}
                activeTextClassName={`font-semibold transition-colors duration-300 ${scrolled ? "text-foreground" : "text-white dark:text-foreground"}`}
              >
                {item.label}
              </SplitTextLink>
            ))}
          </nav>

          {/* Right Section: Theme Toggle + CTA */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Theme Toggle */}
            {mounted ? (
              <button
                ref={themeBtnRef}
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className={`relative cursor-pointer flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-accent/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  open ? "text-foreground" : !scrolled ? "text-white dark:text-foreground" : "text-foreground"
                }`}
                aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
              >
                <Sun
                  className="absolute h-5 w-5 rotate-0 scale-100 transition-all duration-300"
                  style={{
                    opacity: resolvedTheme === "dark" ? 0 : 1,
                    transform: resolvedTheme === "dark" ? "rotate(-90deg) scale(0.8)" : "rotate(0deg) scale(1)",
                  }}
                />
                <Moon
                  className="absolute h-5 w-5 rotate-90 scale-80 transition-all duration-300"
                  style={{
                    opacity: resolvedTheme === "dark" ? 1 : 0,
                    transform: resolvedTheme === "dark" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0.8)",
                  }}
                />
              </button>
            ) : (
              <div className="h-10 w-10" aria-hidden="true" />
            )}

            {/* CTA Button */}
            <SplitTextLink
              ref={ctaRef}
              target="_blank"
              href="https://www.instagram.com/tahutech.idn"
              className={`hidden sm:inline-flex items-center px-5 h-10 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-lg group ${!scrolled ? "bg-foreground text-background" : "bg-foreground text-background"}`}
              textClassName={`flex items-center transition-colors duration-300 text-background`}
              activeTextClassName={`transition-colors duration-300 text-background`}
            >
              Watch Reviews
            </SplitTextLink>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className={`relative md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition-colors duration-300 hover:bg-accent/10 active:scale-95 z-[60] ${
                open ? "text-foreground" : !scrolled ? "text-white dark:text-foreground" : "text-foreground"
              }`}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-current"
              >
                <line ref={line1Ref} x1="3" y1="6" x2="21" y2="6" />
                <line ref={line2Ref} x1="3" y1="12" x2="21" y2="12" />
                <line ref={line3Ref} x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        {/* Backdrop */}
        <div
          ref={backdropRef}
          className="absolute inset-0 bg-background/95 backdrop-blur-md"
          style={{ opacity: 0 }}
          onClick={handleClose}
          aria-hidden="true"
        />

        {/* Menu Panel - full screen height and width */}
        <div
          ref={panelRef}
          className="fixed inset-0 flex flex-col justify-center bg-transparent px-8"
          style={{ transform: "translateX(100%)", opacity: 0 }}
        >
          <div className="flex flex-col space-y-6 text-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-mobile-link
                onClick={handleClose}
                className="block py-2 text-4xl font-heading font-black uppercase tracking-tight text-foreground hover:text-muted-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              data-mobile-link
              href="https://www.youtube.com/@tahu_tech"
              onClick={handleClose}
              className="block py-2 text-4xl font-heading font-black uppercase tracking-tight text-foreground hover:text-muted-foreground transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;