"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SearchInput } from "@/components/ui/search-input";
import { ReviewCard } from "@/components/review/review-card";
import { GsapReveal, StaggerItem, StaggerReveal } from "@/components/animation";
import type { ReviewSummary } from "@/types";

interface SearchPageProps {
  reviews: ReviewSummary[];
}

export function SearchClient({ reviews }: SearchPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    return reviews.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.brand.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.verdict.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, reviews]);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      const newParams = new URLSearchParams();
      if (value) newParams.set("q", value);
      router.push(`/search?${newParams.toString()}`, { scroll: false });
    },
    [router]
  );

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-12">
        <GsapReveal delay={0.15}>
          <SectionHeading description="Cari review produk gaming gear.">
            Pencarian
          </SectionHeading>
        </GsapReveal>

        <div className="max-w-xl">
          <SearchInput
            placeholder="Cari produk, brand, atau kategori..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onClear={() => handleSearch("")}
            autoFocus
          />
        </div>

        {query.trim() && (
          <p className="mt-6 text-sm text-muted">
            {results.length} hasil ditemukan untuk &ldquo;{query}&rdquo;
          </p>
        )}

        {query.trim() && results.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-lg font-heading text-muted mb-2">
              Tidak ada hasil ditemukan.
            </p>
            <p className="text-sm text-muted">
              Coba kata kunci lain atau periksa ejaan.
            </p>
          </div>
        )}

        {results.length > 0 && (
          <StaggerReveal className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} delay={0.2}>
            {results.map((review) => (
              <StaggerItem key={review.slug}>
                <ReviewCard review={review} />
              </StaggerItem>
            ))}
          </StaggerReveal>
        )}

        {!query.trim() && (
          <div className="mt-12 text-center">
            <p className="text-muted">
              Ketik kata kunci untuk mulai mencari.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
