import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={ref}
          type="search"
          value={value}
          className={cn(
            "w-full h-10 pl-10 pr-10 rounded-xl bg-surface-alt text-foreground font-medium",
            "placeholder:text-muted",
            "focus:outline-none focus:ring-2 focus:ring-foreground",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "[&::-webkit-search-cancel-button]:hidden",
            "[&::-webkit-search-decoration]:hidden",
            className
          )}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
            aria-label="Hapus pencarian"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
