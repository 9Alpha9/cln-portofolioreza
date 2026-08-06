import { cn } from "@/lib/utils";

interface ActiveFiltersProps {
  filters: { label: string; onRemove: () => void }[];
  className?: string;
}

export function ActiveFilters({ filters, className }: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {filters.map((filter, index) => (
        <span
          key={index}
          className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-sm text-accent"
        >
          {filter.label}
          <button
            type="button"
            onClick={filter.onRemove}
            className="ml-1 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
            aria-label={`Hapus filter ${filter.label}`}
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}
    </div>
  );
}
