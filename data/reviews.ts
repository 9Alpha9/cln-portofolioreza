import type { ReviewMetadata } from "@/types";

export const reviews: ReviewMetadata[] = [
  {
    slug: "keychron-k2-he",
    name: "Keychron K2 HE",
    brand: "Keychron",
    category: "keyboard",
    shortDescription:
      "Keyboard mekanik wireless dengan magnetic switch yang smooth dan build quality solid.",
    verdict:
      "Keychron K2 HE adalah pilihan tepat untuk yang mencari keyboard wireless premium dengan magnetic switch.",
    score: 8.5,
    priceFrom: 1499000,
    currency: "IDR",
    featured: true,
    publishedAt: "2026-08-01",
    updatedAt: "2026-08-07",
    priceUpdatedAt: "2026-08-07",
    tags: ["wireless", "magnetic-switch", "75-percent"],
    thumbnail: {
      src: "/images/products/keychron-k2-he/cover.png",
      alt: "Keychron K2 HE keyboard mekanik wireless",
      width: 1600,
      height: 1200,
    },
    gallery: [
      {
        src: "/images/products/keychron-k2-he/cover.png",
        alt: "Keychron K2 HE keyboard mekanik wireless",
        width: 1600,
        height: 1200,
      },
      {
        src: "/images/products/keychron-k2-he/angle-01.png",
        alt: "Keychron K2 HE tampilan samping",
        width: 1600,
        height: 1200,
      },
    ],
    video: {
      platform: "youtube",
      url: "https://www.youtube.com/watch?v=example1",
      videoId: "example1",
      thumbnail: "/images/products/keychron-k2-he/video-cover.png",
    },
    pros: [
      "Magnetic switch yang smooth",
      "Build quality solid",
      "Wireless connection stabil",
    ],
    cons: ["Harga cukup tinggi", "Tombol hanya 75% layout"],
    specifications: [
      {
        title: "Spesifikasi",
        items: [
          { label: "Layout", value: "75%" },
          { label: "Switch", value: "Magnetic Switch" },
          { label: "Connection", value: "USB-C, Bluetooth 5.1" },
          { label: "Battery", value: "4000mAh" },
        ],
      },
    ],
    marketplaces: [
      {
        platform: "tokopedia",
        label: "Lihat di Tokopedia",
        url: "https://tokopedia.com/example",
        price: 1499000,
        originalPrice: 1699000,
        storeName: "Keychron Official",
        affiliate: true,
      },
      {
        platform: "shopee",
        label: "Lihat di Shopee",
        url: "https://shopee.co.id/example",
        price: 1520000,
        storeName: "Keychron Store",
        affiliate: false,
      },
    ],
  },
  {
    slug: "razer-viper-v3-pro",
    name: "Razer Viper V3 Pro",
    brand: "Razer",
    category: "mouse",
    shortDescription:
      "Mouse gaming ultralight dengan sensor terbaru dan performa kompetitif.",
    verdict:
      "Razer Viper V3 Pro adalah mouse gaming terbaik untuk kompetitif dengan berat super ringan.",
    score: 9.2,
    priceFrom: 1899000,
    currency: "IDR",
    featured: true,
    publishedAt: "2026-07-15",
    updatedAt: "2026-08-05",
    priceUpdatedAt: "2026-08-05",
    tags: ["wireless", "ultralight", "kompetitif"],
    thumbnail: {
      src: "/images/products/razer-viper-v3-pro/cover.png",
      alt: "Razer Viper V3 Pro mouse gaming wireless",
      width: 1600,
      height: 1200,
    },
    gallery: [
      {
        src: "/images/products/razer-viper-v3-pro/cover.png",
        alt: "Razer Viper V3 Pro mouse gaming wireless",
        width: 1600,
        height: 1200,
      },
      {
        src: "/images/products/razer-viper-v3-pro/angle-01.png",
        alt: "Razer Viper V3 Pro tampilan samping",
        width: 1600,
        height: 1200,
      },
    ],
    video: {
      platform: "youtube",
      url: "https://www.youtube.com/watch?v=example2",
      videoId: "example2",
      thumbnail: "/images/products/razer-viper-v3-pro/video-cover.png",
    },
    pros: [
      "Berat super ringan",
      "Sensor akurasi tinggi",
      "Battery tahan lama",
    ],
    cons: ["Harga premium", "Shape tidak untuk semua grip"],
    specifications: [
      {
        title: "Spesifikasi",
        items: [
          { label: "Sensor", value: "Razer Focus Pro 3" },
          { label: "DPI", value: "35000" },
          { label: "Berat", value: "54g" },
          { label: "Battery", value: "95 jam" },
        ],
      },
    ],
    marketplaces: [
      {
        platform: "tokopedia",
        label: "Lihat di Tokopedia",
        url: "https://tokopedia.com/example",
        price: 1899000,
        originalPrice: 2199000,
        storeName: "Razer Official",
        affiliate: true,
      },
    ],
  },
  {
    slug: "logitech-g-pro-x-2",
    name: "Logitech G PRO X 2",
    brand: "Logitech",
    category: "headset",
    shortDescription:
      "Headset gaming dengan audio yang jernih dan mikrofon yang baik.",
    verdict:
      "Logitech G PRO X 2 adalah headset gaming serbaguna yang nyaman untuk sesi panjang.",
    score: 8.8,
    priceFrom: 2199000,
    currency: "IDR",
    featured: false,
    publishedAt: "2026-07-20",
    updatedAt: "2026-08-03",
    priceUpdatedAt: "2026-08-03",
    tags: ["wireless", "kompetitif", "nyaman"],
    thumbnail: {
      src: "/images/products/logitech-g-pro-x-2/cover.png",
      alt: "Logitech G PRO X 2 headset gaming wireless",
      width: 1600,
      height: 1200,
    },
    gallery: [
      {
        src: "/images/products/logitech-g-pro-x-2/cover.png",
        alt: "Logitech G PRO X 2 headset gaming wireless",
        width: 1600,
        height: 1200,
      },
      {
        src: "/images/products/logitech-g-pro-x-2/angle-01.png",
        alt: "Logitech G PRO X 2 tampilan samping",
        width: 1600,
        height: 1200,
      },
    ],
    video: {
      platform: "youtube",
      url: "https://www.youtube.com/watch?v=example3",
      videoId: "example3",
      thumbnail: "/images/products/logitech-g-pro-x-2/video-cover.png",
    },
    pros: [
      "Audio kualitas tinggi",
      "Mikrofon jernih",
      "Nyaman dipakai lama",
    ],
    cons: ["Harga cukup mahal", "ANC tidak ada"],
    specifications: [
      {
        title: "Spesifikasi",
        items: [
          { label: "Driver", value: "50mm" },
          { label: "Frequency", value: "20Hz - 20kHz" },
          { label: "Connection", value: "2.4GHz, Bluetooth" },
          { label: "Battery", value: "50 jam" },
        ],
      },
    ],
    marketplaces: [
      {
        platform: "tokopedia",
        label: "Lihat di Tokopedia",
        url: "https://tokopedia.com/example",
        price: 2199000,
        storeName: "Logitech Official",
        affiliate: true,
      },
      {
        platform: "shopee",
        label: "Lihat di Shopee",
        url: "https://shopee.co.id/example",
        price: 2250000,
        storeName: "Logitech Store",
        affiliate: false,
      },
      {
        platform: "tiktok",
        label: "Lihat di TikTok Shop",
        url: "https://tiktok.com/example",
        price: 2150000,
        affiliate: true,
      },
    ],
  },
];
