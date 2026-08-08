import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number;
  className?: string;
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  const getColor = (s: number) => {
    if (s >= 9) return "bg-green text-green-foreground";
    if (s >= 7) return "bg-accent text-accent-foreground";
    if (s >= 5) return "bg-warning text-warning-foreground";
    return "bg-danger text-danger-foreground";
  };

  return (
    <span
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold",
        getColor(score),
        className
      )}
    >
      {score.toFixed(1)}
    </span>
  );
}
