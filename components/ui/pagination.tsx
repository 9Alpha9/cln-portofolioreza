"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  scrollToTop?: boolean;
}

export function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange, scrollToTop = true }: PaginationProps) {
  const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems, itemsPerPage]);

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    onPageChange(page);
    if (scrollToTop) {
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: false, force: true });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 w-10 flex items-center justify-center border border-border bg-background hover:bg-surface transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-muted">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page as number)}
              className={`h-10 min-w-[40px] flex items-center justify-center px-4 text-sm font-medium transition-colors cursor-pointer ${
                page === currentPage
                  ? "bg-foreground text-background"
                  : "bg-background hover:bg-surface text-foreground"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 w-10 flex items-center justify-center border border-border bg-background hover:bg-surface transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Halaman selanjutnya"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}