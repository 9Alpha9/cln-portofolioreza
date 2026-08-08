"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { GsapReveal, StaggerReveal, StaggerItem } from "@/components/animation";
import { ScoreBadge } from "@/components/review/score-badge";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { formatCurrency } from "@/lib/formatters";
import type { ReviewSummary } from "@/types";

interface ReviewsClientProps {
  reviews: ReviewSummary[];
}

type SortOption = "newest" | "oldest" | "price-low" | "price-high" | "score";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "price-low", label: "Harga Terendah" },
  { value: "price-high", label: "Harga Tertinggi" },
  { value: "score", label: "Skor Tertinggi" },
];

export function ReviewsClient({ reviews }: ReviewsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    searchParams.get("brand")
  );
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || "newest"
  );

  const updateURL = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      router.push(`/reviews?${newParams.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      updateURL({ q: value || null });
    },
    [updateURL]
  );

  const handleCategoryChange = useCallback(
    (category: string | null) => {
      setSelectedCategory(category);
      updateURL({ category });
    },
    [updateURL]
  );

  const handleBrandChange = useCallback(
    (brand: string | null) => {
      setSelectedBrand(brand);
      updateURL({ brand });
    },
    [updateURL]
  );

  const handleSortChange = useCallback(
    (sort: SortOption) => {
      setSortBy(sort);
      updateURL({ sort });
    },
    [updateURL]
  );

  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.brand.toLowerCase().includes(query) ||
          r.category.toLowerCase().includes(query) ||
          r.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      result = result.filter((r) => r.category === selectedCategory);
    }

    if (selectedBrand) {
      result = result.filter(
        (r) => r.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    switch (sortBy) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
        );
        break;
      case "price-low":
        result.sort((a, b) => (a.priceFrom ?? 0) - (b.priceFrom ?? 0));
        break;
      case "price-high":
        result.sort(
          (a, b) => (b.priceFrom ?? Infinity) - (a.priceFrom ?? Infinity)
        );
        break;
      case "score":
        result.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
        break;
    }

    return result;
  }, [reviews, search, selectedCategory, selectedBrand, sortBy]);

  const hasActiveFilters = selectedCategory || selectedBrand || search;

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="border-b border-border bg-background">
        <Container className="py-10 sm:py-14">
          <GsapReveal>
            <h1 className="text-3xl font-heading sm:text-4xl lg:text-5xl">
              Semua <span className="italic">Review</span>
            </h1>
            <p className="mt-3 text-muted max-w-lg">
              Jelajahi seluruh review gaming gear yang sudah kami uji dan
              bandingkan.
            </p>
          </GsapReveal>
        </Container>
      </section>

      <section className="border-b border-border bg-surface">
        <Container className="py-5">
          {/* Search Bar */}
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" strokeLinecap="round" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Cari produk, brand, atau kategori..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface-alt text-foreground text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-foreground"
            />
            {search && (
              <button
                type="button"
                onClick={() => handleSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-muted/20 text-muted text-xs hover:bg-muted/30 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-4">
            {/* Sort */}
            <div className="arcade-card p-4">
              <h3 className="text-xs font-medium text-muted mb-3">
                Urutkan
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1.5">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSortChange(opt.value)}
                    className={`px-3 py-2 text-xs font-medium text-left rounded-lg transition-colors ${
                      sortBy === opt.value
                        ? "bg-accent text-accent-foreground"
                        : "bg-surface-alt text-foreground hover:bg-surface-strong"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="arcade-card p-4">
              <h3 className="text-xs font-medium text-muted mb-3">
                Kategori
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() =>
                      handleCategoryChange(
                        selectedCategory === cat.slug ? null : cat.slug
                      )
                    }
                    className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                      selectedCategory === cat.slug
                        ? "bg-accent text-accent-foreground"
                        : "bg-surface-alt text-foreground hover:bg-surface-strong"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="arcade-card p-4">
              <h3 className="text-xs font-medium text-muted mb-3">
                Brand
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-1.5">
                {brands.map((brand) => (
                  <button
                    key={brand.slug}
                    type="button"
                    onClick={() =>
                      handleBrandChange(
                        selectedBrand?.toLowerCase() === brand.slug.toLowerCase()
                          ? null
                          : brand.slug
                      )
                    }
                    className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                      selectedBrand?.toLowerCase() === brand.slug.toLowerCase()
                        ? "bg-accent text-accent-foreground"
                        : "bg-surface-alt text-foreground hover:bg-surface-strong"
                    }`}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSortBy("newest");
                  router.push("/reviews", { scroll: false });
                }}
                className="arcade-btn w-full h-10 bg-surface text-foreground text-xs border border-border"
              >
                Reset Semua Filter
              </button>
            )}
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted">
                {filteredReviews.length} review ditemukan
              </p>
              {hasActiveFilters && (
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedCategory && (
                    <span className="arcade-badge bg-surface-alt px-3 py-1 text-[10px] inline-flex items-center gap-1.5 text-foreground">
                      {categories.find((c) => c.slug === selectedCategory)?.name}
                      <button type="button" onClick={() => handleCategoryChange(null)} className="text-muted hover:text-foreground transition-colors">
                        ✕
                      </button>
                    </span>
                  )}
                  {selectedBrand && (
                    <span className="arcade-badge bg-surface-alt px-3 py-1 text-[10px] inline-flex items-center gap-1.5 text-foreground">
                      {selectedBrand}
                      <button type="button" onClick={() => handleBrandChange(null)} className="text-muted hover:text-foreground transition-colors">
                        ✕
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {filteredReviews.length === 0 ? (
              <div className="arcade-card py-16 text-center">
                <p className="text-lg font-heading mb-2">Tidak ada review ditemukan</p>
                <p className="text-sm text-muted">
                  Coba filter atau pencarian yang berbeda.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory(null);
                    setSelectedBrand(null);
                    router.push("/reviews", { scroll: false });
                  }}
                  className="arcade-btn mt-4 h-10 px-5 bg-accent text-accent-foreground text-xs"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3" stagger={0.08}>
                {filteredReviews.map((review) => (
                  <StaggerItem key={review.slug}>
                    <Link
                      href={`/reviews/${review.slug}`}
                      className="arcade-card group flex flex-col overflow-hidden"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-surface-alt">
                        <img
                          src={review.thumbnail.src}
                          alt={review.thumbnail.alt}
                          className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col p-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="arcade-badge bg-surface-alt px-2 py-0.5 text-[10px] text-foreground">
                              {review.category}
                            </span>
                            {review.featured && (
                              <span className="arcade-badge bg-accent text-accent-foreground px-2 py-0.5 text-[10px]">
                                Featured
                              </span>
                            )}
                          </div>
                          {review.score && <ScoreBadge score={review.score} />}
                        </div>
                        <h3 className="mt-2 font-heading leading-snug line-clamp-2 group-hover:text-muted transition-colors">
                          {review.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted">{review.brand}</p>
                        <p className="mt-1.5 text-xs text-muted line-clamp-2">
                          {review.verdict}
                        </p>
                        <div className="mt-auto pt-2.5 flex items-center justify-between">
                          {review.priceFrom && (
                            <p className="text-sm font-semibold">
                              {formatCurrency(review.priceFrom)}
                            </p>
                          )}
                          <span className="arcade-badge bg-foreground text-background px-2.5 py-0.5 text-[10px] group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                            Baca →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
