"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { Menu, X, Sun, Moon } from "lucide-react";

const navItems = [
  { href: "/#reviews", label: "Reviews" },
  { href: "/#projects", label: "Projects" },
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const navRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const themeBtnRef = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
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

  // Entrance animation (desktop)
  useEffect(() => {
    if (!mounted) return;
    if (!bgRef.current || !linksRef.current || !ctaRef.current || !logoRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(bgRef.current, {
        y: -40,
        opacity: 0,
        duration: 1.2,
        scale: 0.96,
      })
        .from(
          logoRef.current,
          { y: -20, opacity: 0, duration: 0.8 },
          "-=0.9"
        )
        .from(
          linksRef.current?.children ?? [],
          { y: -20, opacity: 0, duration: 0.8, stagger: 0.06 },
          "-=0.7"
        )
        .from(
          ctaRef.current,
          { y: -20, opacity: 0, scale: 0.9, duration: 0.7 },
          "-=0.5"
        );
    });

    return () => ctx.revert();
  }, [mounted]);

  // Mobile menu: set open class on panel/backdrop
  useEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;

    if (open) {
      backdrop.style.opacity = "1";
      panel.style.transform = "translateX(0)";
    } else {
      backdrop.style.opacity = "0";
      panel.style.transform = "translateX(100%)";
    }
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => {
    if (!open) return;
    const handleRouteChange = () => setOpen(false);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, [open]);

  const handleOpen = () => setOpen(true);
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
          className={`relative flex h-16 items-center justify-between rounded-[100px] border transition-all duration-500 ease-out px-5 sm:px-8 ${scrolled
            ? "border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "border-white/20 bg-white/70 backdrop-blur-xl dark:bg-black/50 dark:border-white/10"
            }`}
        >
          {/* Logo */}
          <Link
            ref={logoRef}
            href="/"
            className="flex h-11 w-36 items-center justify-center overflow-hidden transition-opacity duration-300 hover:opacity-70"
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
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground rounded-full"
              >
                {item.label}
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-foreground transition-all duration-300 group-hover:w-full"
                />
              </Link>
            ))}
          </nav>

          {/* Right Section: Theme Toggle + CTA */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Theme Toggle */}
            {mounted ? (
              <button
                ref={themeBtnRef}
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-accent/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            <Link
              ref={ctaRef}
              href="/#reviews"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Watch Reviews
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={handleOpen}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-accent/10 active:scale-95"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        {/* Backdrop */}
        <div
          ref={backdropRef}
          className="absolute inset-0 bg-black/50 backdrop-blur-md"
          style={{ opacity: 0, transition: "opacity 0.3s ease" }}
          onClick={handleClose}
          aria-hidden="true"
        />

        {/* Menu Panel - slides from right */}
        <div
          ref={panelRef}
          className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background border-l border-border shadow-2xl overflow-y-auto"
          style={{ transform: "translateX(100%)", transition: "transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)" }}
        >
          {/* Close button inside panel */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border transition-all duration-300 hover:bg-accent/10 active:scale-95"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>

          <div className="pt-20 pb-16 px-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-mobile-link
                onClick={handleClose}
                className="block py-4 text-lg font-medium text-foreground hover:text-muted-foreground transition-colors border-b border-border"
              >
                {item.label}
              </Link>
            ))}
            <Link
              data-mobile-link
              href="/#reviews"
              onClick={handleClose}
              className="block py-4 text-lg font-medium text-foreground hover:text-muted-foreground transition-colors border-b border-border"
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