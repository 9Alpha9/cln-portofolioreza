"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { ProductImage } from "@/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  if (images.length === 0) {
    return (
      <div className="arcade-card relative w-full overflow-hidden aspect-[4/3] bg-surface-strong">
        <div className="flex h-full items-center justify-center text-muted font-bold uppercase tracking-wider">
          Tidak ada gambar
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="arcade-card overflow-hidden relative">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          className="w-full"
          aria-label={`Galeri gambar ${productName}`}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full aspect-[4/3] bg-surface-strong flex items-center justify-center overflow-hidden">
                <span className="text-muted text-sm font-medium uppercase tracking-wider absolute z-0">
                  Image Unavailable
                </span>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 h-full w-full object-cover z-10"
                  loading={index === 0 ? "eager" : "lazy"}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {images.length > 1 && (
        <div className="mt-2 flex justify-center">
          <span className="text-sm font-bold uppercase tracking-wider text-muted">
            {images.length} gambar
          </span>
        </div>
      )}
    </div>
  );
}