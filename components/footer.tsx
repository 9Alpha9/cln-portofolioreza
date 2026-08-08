"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

const exploreLinks = [
  { href: "/reviews", label: "Semua Review" },
  { href: "/#reviews", label: "Review Terbaru" },
  { href: "/#about", label: "Tentang Saya" },
];

const topicLinks = [
  { href: "/category/keyboard", label: "Keyboard" },
  { href: "/category/mouse", label: "Mouse" },
  { href: "/category/headset", label: "Headset" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/tahutech.idn" },
  { label: "TikTok", href: "https://www.tiktok.com/@tahutech.id" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-footer-reveal]");

      gsap.from(elements, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 98%",
          once: true,
        },
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="overflow-hidden bg-foreground text-background mt-24">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-background/15 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
          <div data-footer-reveal className="lg:col-span-6">
            <p className="mb-5 font-mono text-[10px] font-semibold tracking-[0.22em] text-background/50">
              GAMING GEAR REVIEW / 001
            </p>
            <h2 className="max-w-xl text-4xl font-bold leading-[0.94] tracking-tighter sm:text-6xl lg:text-7xl">
              Gear bagus perlu
              <br />
              bukti, bukan hype.
            </h2>
            <Link
              href="/reviews"
              className="group mt-10 inline-flex items-center gap-3 border-b border-background pb-2 text-sm font-semibold transition-opacity hover:opacity-60"
            >
              Mulai eksplorasi
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:col-start-8">
            <FooterLinks title="Eksplor" links={exploreLinks} />
            <FooterLinks title="Kategori" links={topicLinks} />
            <div data-footer-reveal className="col-span-2 sm:col-span-1">
              <p className="mb-4 font-mono text-[10px] font-semibold tracking-[0.18em] text-background/50">
                KONTAK
              </p>
              <a
                href="mailto:hello@mail.com"
                className="group inline-flex items-start gap-1 text-sm leading-relaxed transition-opacity hover:opacity-60"
              >
                hello@mail.com
                <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        <div data-footer-reveal className="flex flex-col gap-8 py-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" className="text-2xl font-bold tracking-tighter transition-opacity hover:opacity-60">
              GGR<span className="text-background/50">.</span>
            </Link>
            <p className="mt-2 text-xs text-background/50">© 2026 Gaming Gear Review. Indonesia.</p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-background/60 transition-colors hover:text-background"
              >
                {link.label === "Instagram" ? (
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
                    <path d="M19.32 5.56a5.57 5.57 0 0 1-3.15-1.76A5.48 5.48 0 0 1 14.8.94h-3.26v14.18a2.7 2.7 0 1 1-1.86-2.57V9.24a6.04 6.04 0 1 0 5.12 5.98V8.03a8.76 8.76 0 0 0 5.12 1.65V6.42c-.2 0-.4-.03-.6-.06Z" />
                  </svg>
                )}
              </a>
            ))}
            <p className="font-mono text-[10px] tracking-[0.18em] text-background/50">BUILT FOR BETTER SETUPS</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div data-footer-reveal>
      <p className="mb-4 font-mono text-[10px] font-semibold tracking-[0.18em] text-background/50">{title}</p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm transition-opacity hover:opacity-60">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
