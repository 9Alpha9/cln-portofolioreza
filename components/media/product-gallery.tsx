"use client";

import Image from "next/image";
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
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface">
        <div className="flex h-full items-center justify-center text-muted">
          Tidak ada gambar
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1}
        className="rounded-xl"
        aria-label={`Galeri gambar ${productName}`}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <div className="mt-2 flex justify-center">
          <span className="text-sm text-muted">
            {images.length} gambar
          </span>
        </div>
      )}
    </div>
  );
}
