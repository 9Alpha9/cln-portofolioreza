# Content Workflow

## Overview

Konten review dikelola melalui file TypeScript di dalam repository. Tidak ada database atau CMS.

## Menambah Review Baru

### 1. Siapkan Data

Buat file baru di `data/reviews.ts` dengan format:

```typescript
export const review: ReviewMetadata = {
  slug: "product-slug",
  name: "Product Name",
  brand: "Brand",
  category: "keyboard", // mouse, headset, microphone, monitor, controller, mousepad, accessories
  shortDescription: "Deskripsi singkat.",
  verdict: "Kesimpulan review.",
  score: 8.5,
  priceFrom: 1499000,
  currency: "IDR",
  featured: false,
  publishedAt: "2026-08-07",
  updatedAt: "2026-08-07",
  priceUpdatedAt: "2026-08-07",
  tags: ["wireless", "gaming"],
  thumbnail: {
    src: "/images/products/product-slug/cover.webp",
    alt: "Deskripsi gambar",
    width: 1600,
    height: 1200,
  },
  gallery: [],
  video: {
    platform: "youtube",
    url: "https://www.youtube.com/watch?v=VIDEO_ID",
    videoId: "VIDEO_ID",
  },
  pros: ["Kelebihan 1", "Kelebihan 2"],
  cons: ["Kekurangan 1"],
  specifications: [
    {
      title: "Spesifikasi",
      items: [
        { label: "Label", value: "Nilai" },
      ],
    },
  ],
  marketplaces: [
    {
      platform: "tokopedia",
      label: "Lihat di Tokopedia",
      url: "https://...",
      price: 1499000,
      storeName: "Nama Toko",
      affiliate: true,
    },
  ],
};
```

### 2. Tambahkan Gambar

Letakkan gambar di:
```
public/images/products/[slug]/
├── cover.webp
├── angle-01.webp
├── angle-02.webp
└── detail-01.webp
```

### 3. Validasi

Jalankan:
```bash
npm run typecheck
npm run lint
npm run build
```

### 4. Commit

```bash
git add .
git commit -m "feat: add [product name] review"
git push
```

## Format Harga

Gunakan format Rupiah:
```typescript
new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
}).format(value);
// Output: Rp1.499.000
```

## Aturan Harga

- Harga dimasukkan manual
- Gunakan label "mulai dari" jika ada variasi
- Sertakan tanggal pembaruan
- Sertakan disclaimer bahwa harga dapat berubah
- Tidak boleh menggunakan scraping

## Aturan Link Marketplace

- Link berasal dari content creator
- Affiliate link boleh digunakan
- Selalu buka di tab baru
- Gunakan `rel="noopener noreferrer sponsored"` untuk affiliate
- Tombol tidak boleh menyerupai checkout internal

## Naming Convention

- Slug: lowercase, kebab-case
- Gambar: deskripif, kebab-case
- Contoh: `keychron-k2-he`, `razer-viper-v3-pro`

## Checklist Sebelum Publish

- [ ] Nama produk benar
- [ ] Brand benar
- [ ] Slug unik
- [ ] Kategori valid
- [ ] Thumbnail optimal
- [ ] Gallery memiliki alt text
- [ ] Verdict singkat dan spesifik
- [ ] Pros/cons tidak generik
- [ ] Spesifikasi lengkap
- [ ] Video valid
- [ ] Harga memiliki tanggal
- [ ] Link marketplace valid
- [ ] Metadata SEO tersedia
