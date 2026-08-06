import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price?: number;
  currency?: "IDR";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceDisplay({
  price,
  size = "md",
  className,
}: PriceDisplayProps) {
  if (!price) {
    return (
      <span className={cn("text-sm text-muted", className)}>
        Harga tidak tersedia
      </span>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "font-semibold text-foreground",
          {
            "text-sm": size === "sm",
            "text-base": size === "md",
            "text-lg": size === "lg",
          }
        )}
      >
        Mulai dari {formatCurrency(price)}
      </span>
    </div>
  );
}
