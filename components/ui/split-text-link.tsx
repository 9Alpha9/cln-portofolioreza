"use client";

import { forwardRef, useCallback, useRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface SplitTextLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> {
  href: string;
  children: string;
  className?: string;
  textClassName?: string;
  activeTextClassName?: string;
  icon?: ReactNode;
  iconClassName?: string;
}

export const SplitTextLink = forwardRef<HTMLAnchorElement, SplitTextLinkProps>(
  (
    {
      href,
      children,
      className,
      textClassName,
      activeTextClassName,
      icon,
      iconClassName,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const trackRef = useRef<HTMLSpanElement>(null);
    const iconRef = useRef<HTMLSpanElement>(null);

    const animateTo = useCallback((yPercent: number) => {
      const track = trackRef.current;
      if (!track) return;

      gsap.killTweensOf(track);
      gsap.to(track, {
        yPercent,
        duration: 0.55,
        ease: "power3.inOut",
        overwrite: true,
      });

      const iconElement = iconRef.current;
      if (iconElement) {
        gsap.killTweensOf(iconElement);
        gsap.to(iconElement, {
          x: yPercent < 0 ? 3 : 0,
          y: yPercent < 0 ? -3 : 0,
          duration: 0.4,
          delay: yPercent < 0 ? 0.12 : 0,
          ease: "power3.out",
          overwrite: true,
        });
      }
    }, []);

    return (
      <Link
        ref={ref}
        href={href}
        className={cn("inline-flex overflow-hidden", className)}
        onMouseEnter={(event) => {
          animateTo(-50);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          animateTo(0);
          onMouseLeave?.(event);
        }}
        {...props}
      >
        <span className="relative block h-[1.25em] overflow-hidden leading-[1.25]">
          <span ref={trackRef} className="block will-change-transform">
            <span className={cn("flex h-[1.25em] items-center whitespace-nowrap transition-colors duration-300", textClassName)}>
              {children}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "flex h-[1.25em] items-center whitespace-nowrap transition-colors duration-300",
                textClassName,
                activeTextClassName
              )}
            >
              {children}
            </span>
          </span>
        </span>
        {icon && (
          <span ref={iconRef} aria-hidden="true" className={cn("shrink-0 will-change-transform", iconClassName)}>
            {icon}
          </span>
        )}
      </Link>
    );
  }
);

SplitTextLink.displayName = "SplitTextLink";

export default SplitTextLink;
