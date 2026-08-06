"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SearchInput } from "@/components/ui/search-input";
import { ReviewCard } from "@/components/review/review-card";
import { getAllReviews } from "@/lib/reviews";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const allReviews = useMemo(() => getAllReviews(), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    return allReviews.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.brand.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.verdict.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, allReviews]);

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
        <SectionHeading description="Cari review produk gaming gear.">
          Pencarian
        </SectionHeading>

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
            <p className="text-lg text-muted mb-2">
              Tidak ada hasil ditemukan.
            </p>
            <p className="text-sm text-muted">
              Coba kata kunci lain atau periksa ejaan.
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((review) => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
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
