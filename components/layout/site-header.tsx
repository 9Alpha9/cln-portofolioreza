"use client";

import Link from "next/link";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useCallback } from "react";

function SearchIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function SiteHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleOpen = useCallback(() => setMobileNavOpen(true), []);
  const handleClose = useCallback(() => setMobileNavOpen(false), []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm md:static">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 text-base font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-lg"
          >
            <span className="text-accent">GGR</span>
            <span className="hidden sm:inline"> Gaming Gear Review</span>
          </Link>

          <DesktopNavigation />

          <div className="flex shrink-0 items-center gap-0.5 md:hidden">
            <Link
              href="/search"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Cari"
            >
              <SearchIcon />
            </Link>
            <ThemeToggle />
            <button
              type="button"
              onClick={handleOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Buka menu"
            >
              <MenuIcon />
            </button>
          </div>

          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/search"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Cari"
            >
              <SearchIcon />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <MobileNavigation isOpen={mobileNavOpen} onClose={handleClose} />
    </>
  );
}
