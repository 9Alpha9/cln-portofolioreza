"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { getAllReviews } from "@/lib/reviews";
import type { ReviewSummary } from "@/types";

interface KierkegaardProductsProps {
  reviews?: ReviewSummary[];
  limit?: number;
}

function ProductCard({ review, index }: { review: ReviewSummary; index: number }) {
  return (
    <Link
      key={review.slug}
      href={`/reviews/${review.slug}`}
      className="kr-product-card group relative block"
      style={{ transitionDelay: `${index * 30}ms` }}
    >
      <div className="kr-media relative aspect-[4/3] overflow-hidden rounded-xl bg-surface mb-6">
        <img
          src={review.thumbnail.src}
          alt={review.thumbnail.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading={index < 3 ? "eager" : "lazy"}
        />

        <div className="kr-pixel-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
          {review.category}
        </div>

        {review.score && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-foreground text-background text-[10px] font-bold">
            {review.score}/10
          </div>
        )}

        <div className="kr-view-indicator absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>Lihat Review</span>
        </div>
      </div>

      <div className="kr-content space-y-3">
        <div className="kr-meta flex items-center gap-3 text-xs sm:text-sm text-muted">
          <span className="font-mono tracking-widest uppercase">{review.brand}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={review.publishedAt} className="font-mono">
            {new Date(review.publishedAt).toLocaleDateString("id-ID", { year: "numeric", month: "short" })}
          </time>
        </div>

        <h3 className="kr-name text-xl sm:text-2xl lg:text-3xl font-bold leading-tight tracking-tight text-foreground group-hover:text-muted transition-colors duration-300 line-clamp-2">
          {review.name}
        </h3>

        <p className="kr-desc text-sm sm:text-base text-muted leading-relaxed line-clamp-3">
          {review.shortDescription}
        </p>

        <div className="kr-tags flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
          {review.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[10px] font-medium rounded bg-surface border border-border/50 text-muted hover:text-foreground hover:border-border transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

interface KierkegaardProductsProps {
  reviews?: ReviewSummary[];
  limit?: number;
}

export function KierkegaardProducts({ reviews: allReviews, limit = 6 }: KierkegaardProductsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [reviews, setReviews] = useState<ReviewSummary[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const data = allReviews || getAllReviews();
    const limited = data.slice(0, limit);
    setReviews(limited);
  }, [allReviews, limit]);

  const categories = ["all", ...new Set(reviews.map(r => r.category))];

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
  };

  const filteredReviews = activeCategory === "all"
    ? reviews
    : reviews.filter(r => r.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (filteredReviews.length === 0) return;
      
      gsap.from(".kr-title", {
          scrollTrigger: { trigger: ".kr-title", start: "top 85%" },
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
        });

        gsap.from(".kr-subtitle", {
          scrollTrigger: { trigger: ".kr-subtitle", start: "top 85%" },
          y: 40,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        });

        gsap.from(".kr-category-pill", {
          scrollTrigger: { trigger: ".kr-categories", start: "top 85%" },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
        });

        gsap.from(".kr-product-card", {
          scrollTrigger: { trigger: ".kr-grid", start: "top 80%" },
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
        });

        gsap.set(".kr-pixel-overlay", { opacity: 0, scale: 0.8 });
      }, sectionRef);

      return () => ctx.revert();
  }, [filteredReviews.length]);

  return (
    <section
      ref={sectionRef}
      className="kr-section relative w-full py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-background"
    >
      <div className="kr-container max-w-[1400px] mx-auto">

        <div className="kr-header mb-16 sm:mb-24 lg:mb-32 text-center">
          <h2 className="kr-title text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.9] tracking-tighter text-foreground mb-6">
            Produk yang
            <br />
            <span className="text-muted">Sudah Diuji</span>
          </h2>
          <p className="kr-subtitle text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Setiap gear diuji dalam sesi gaming nyata. Tidak ada spek di kertas — hanya pengalaman jujur.
          </p>
        </div>

        <div className="kr-categories flex flex-wrap justify-center gap-2 sm:gap-3 mb-16 sm:mb-20 lg:mb-28">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`kr-category-pill px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-surface border border-border/50 hover:bg-surface-hover hover:border-border"
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {cat === "all" ? "Semua" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="kr-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {filteredReviews.length === 0
            ? (
              <div className="col-span-full text-center py-20 text-muted">
                <p className="text-lg">Belum ada review di kategori ini.</p>
              </div>
            )
            : (
              filteredReviews.map((review, index) => (
                <ProductCard key={review.slug} review={review} index={index} />
              ))
            )}
        </div>

        <div className="kr-cta mt-20 text-center">
          <Link
            href="/reviews"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-85 hover:scale-[1.02] transition-all duration-300"
          >
            Lihat Semua Review
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}