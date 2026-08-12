"use client";

import { useState } from "react";
import type { ProductImage } from "@/types";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);

  const slides = images.length > 0 ? images : [];

  if (slides.length === 0) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center border border-border bg-surface-alt">
        <span className="text-sm font-medium uppercase tracking-wider text-muted">
          Tidak ada gambar
        </span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative aspect-[8/10] w-full overflow-hidden border border-border bg-surface-alt">
        {slides.map((image, index) => (
          <div
            key={index}
            aria-hidden={index !== active}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: index === active ? 1 : 0 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        <div className="absolute bottom-3 right-3 border border-border bg-background/90 px-2 py-1 font-mono text-[10px] font-semibold tracking-widest text-foreground backdrop-blur-sm">
          {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </div>

      <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
        {slides.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Lihat gambar ${index + 1}: ${image.alt}`}
            aria-current={index === active}
            className={`shrink-0 overflow-hidden border transition-colors ${index === active
              ? "border-foreground"
              : "border-border hover:border-muted-foreground"
              }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={`h-16 w-24 object-cover sm:h-20 sm:w-32 ${index === active ? "opacity-100" : "opacity-60"
                }`}
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
