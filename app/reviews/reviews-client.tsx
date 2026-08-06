"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SearchInput } from "@/components/ui/search-input";
import { ReviewGrid } from "@/components/review/review-grid";
import { FilterSheet } from "@/components/filters/filter-sheet";
import { ActiveFilters } from "@/components/filters/active-filters";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
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
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

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

    // Search
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

    // Category
    if (selectedCategory) {
      result = result.filter((r) => r.category === selectedCategory);
    }

    // Brand
    if (selectedBrand) {
      result = result.filter(
        (r) => r.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    // Sort
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

  const activeFilters = useMemo(() => {
    const filters: { label: string; onRemove: () => void }[] = [];
    if (selectedCategory) {
      const cat = categories.find((c) => c.slug === selectedCategory);
      filters.push({
        label: cat?.name || selectedCategory,
        onRemove: () => handleCategoryChange(null),
      });
    }
    if (selectedBrand) {
      filters.push({
        label: selectedBrand,
        onRemove: () => handleBrandChange(null),
      });
    }
    return filters;
  }, [selectedCategory, selectedBrand, handleCategoryChange, handleBrandChange]);

  const filterContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Kategori</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.slug}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.slug}
                onChange={() =>
                  handleCategoryChange(
                    selectedCategory === cat.slug ? null : cat.slug
                  )
                }
                className="h-4 w-4 accent-accent"
              />
              <span className="text-sm">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label
              key={brand.slug}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="brand"
                checked={
                  selectedBrand?.toLowerCase() === brand.slug.toLowerCase()
                }
                onChange={() =>
                  handleBrandChange(
                    selectedBrand?.toLowerCase() === brand.slug.toLowerCase()
                      ? null
                      : brand.slug
                  )
                }
                className="h-4 w-4 accent-accent"
              />
              <span className="text-sm">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Urutkan</h3>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value as SortOption)}
          className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground text-sm"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-12">
        <SectionHeading description="Temukan review produk gaming gear yang sudah kami uji.">
          Semua Review
        </SectionHeading>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <SearchInput
              placeholder="Cari produk, brand, atau kategori..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              onClear={() => handleSearch("")}
            />
          </div>
          <button
            type="button"
            onClick={() => setFilterSheetOpen(true)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium hover:bg-surface transition-colors md:hidden"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>

        <div className="hidden md:block mt-4">
          {filterContent}
        </div>

        <ActiveFilters filters={activeFilters} className="mt-4" />

        <div className="mt-6">
          <p className="text-sm text-muted mb-4">
            {filteredReviews.length} review ditemukan
          </p>
          <ReviewGrid reviews={filteredReviews} />
        </div>
      </Container>

      <FilterSheet
        isOpen={filterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
      >
        {filterContent}
      </FilterSheet>
    </div>
  );
}
