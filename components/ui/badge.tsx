import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "warning" | "danger";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-surface text-foreground": variant === "default",
          "bg-accent text-accent-foreground": variant === "accent",
          "bg-success text-white": variant === "success",
          "bg-warning text-white": variant === "warning",
          "bg-danger text-white": variant === "danger",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
