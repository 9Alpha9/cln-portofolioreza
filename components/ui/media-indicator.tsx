import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type MediaIndicatorVariant = "play" | "pause" | "swipe";

interface MediaIndicatorProps {
  variant: MediaIndicatorVariant;
  className?: string;
}

export const MediaIndicator = forwardRef<HTMLDivElement, MediaIndicatorProps>(
  function MediaIndicator({ variant, className }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "pointer-events-none flex h-16 w-16 items-center justify-center rounded-full border border-white/80 bg-black/55 text-white backdrop-blur-sm",
          className
        )}
      >
        {variant === "play" && (
          <svg className="h-6 w-6 translate-x-[0.5px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M9 7.25v9.5L16.5 12 9 7.25Z" />
          </svg>
        )}
        {variant === "pause" && (
          <span className="flex items-center justify-center gap-1.5" aria-hidden="true">
            <span className="h-5 w-[3px] rounded-full bg-white" />
            <span className="h-5 w-[3px] rounded-full bg-white" />
          </span>
        )}
        {variant === "swipe" && (
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <path d="m8 7-5 5 5 5M16 7l5 5-5 5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    );
  }
);
