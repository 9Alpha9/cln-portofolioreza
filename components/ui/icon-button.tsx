import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "ghost", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-transparent text-foreground hover:bg-surface": variant === "ghost",
            "border border-border bg-transparent text-foreground hover:bg-surface": variant === "outline",
          },
          {
            "h-8 w-8": size === "sm",
            "h-10 w-10": size === "md",
            "h-12 w-12": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

IconButton.displayName = "IconButton";
