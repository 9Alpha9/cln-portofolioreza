"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";
import { useEffect } from "react";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/reviews", label: "Semua Review" },
  { href: "/about", label: "Tentang" },
];

function CloseIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <nav
        className="absolute inset-y-0 right-0 flex w-72 flex-col bg-background border-l border-border shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="font-semibold text-accent">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1">
            {mainLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      "hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-foreground"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
            Kategori
          </p>
          <ul className="space-y-1">
            {categories.map((category) => {
              const href = `/category/${category.slug}`;
              const isActive = pathname.startsWith(href);
              return (
                <li key={category.slug}>
                  <Link
                    href={href}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm transition-colors",
                      "hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      isActive
                        ? "bg-accent/10 font-medium text-accent"
                        : "text-foreground"
                    )}
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-border p-4">
          <Link
            href="/search"
            onClick={onClose}
            className="flex h-10 items-center justify-center rounded-lg border border-accent/30 text-sm font-medium text-accent hover:bg-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Cari Review
          </Link>
        </div>
      </nav>
    </div>
  );
}
