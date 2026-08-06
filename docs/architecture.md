# Architecture

## Overview

Gaming Gear Review adalah website portfolio frontend-only untuk content creator yang mereview peripheral dan gaming gear.

## Tech Stack

- **Framework**: Next.js 16.3.0 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Animation**: Motion (motion/react)
- **Gallery**: Swiper
- **Deployment**: Vercel

## Key Principles

1. **Frontend-only** — Tidak ada database, API, atau backend
2. **Static Generation** — Semua halaman di-generate saat build
3. **Server Components** — Default untuk semua halaman
4. **Client Components** — Hanya untuk interaktif (motion, swiper, search, filter)
5. **Mobile-first** — Desain dimulai dari mobile, di-scale ke desktop

## Folder Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles & design tokens
│   ├── sitemap.ts         # Dynamic sitemap
│   ├── robots.ts          # Robots.txt
│   ├── not-found.tsx      # Global 404
│   ├── loading.tsx        # Global loading state
│   ├── reviews/
│   │   ├── page.tsx       # Reviews listing
│   │   ├── reviews-client.tsx  # Client-side filters
│   │   └── [slug]/
│   │       ├── page.tsx   # Review detail
│   │       └── not-found.tsx
│   ├── category/[slug]/page.tsx
│   ├── brand/[slug]/page.tsx
│   ├── search/page.tsx
│   └── about/page.tsx
├── components/
│   ├── ui/                # UI primitives (Button, Input, Badge, dll)
│   ├── layout/            # Layout components (Header, Footer, Nav)
│   ├── review/            # Review components (Card, Grid, Hero)
│   ├── product/           # Product components (Specifications)
│   ├── marketplace/       # Marketplace components (Offers, PurchaseBar)
│   ├── media/             # Media components (Gallery, YouTube)
│   ├── filters/           # Filter components (Sheet, ActiveFilters)
│   └── animation/         # Animation components (FadeIn, Stagger)
├── data/                  # Static data (reviews, categories, brands)
├── lib/                   # Utilities
│   ├── reviews/           # Review query helpers
│   ├── formatters/        # Currency & date formatters
│   └── metadata/          # Structured data components
├── types/                 # TypeScript types
├── content/               # MDX articles (future)
├── hooks/                 # Custom React hooks
├── constants/             # Constants
└── config/                # Configuration
```

## Data Flow

```
Static Data (data/reviews.ts)
  → Query Helpers (lib/reviews/)
    → Server Components (page.tsx)
      → Client Components (only where needed)
```

## Rendering Strategy

| Page | Rendering | Notes |
|---|---|---|
| `/` | Static | Featured + latest reviews |
| `/reviews` | Static + Client | Server initial, client filters |
| `/reviews/[slug]` | SSG | generateStaticParams |
| `/category/[slug]` | SSG | generateStaticParams |
| `/brand/[slug]` | SSG | generateStaticParams |
| `/search` | Client | Client-side search |
| `/about` | Static | Static content |
| `/sitemap.xml` | Dynamic | Generated per request |
| `/robots.txt` | Static | Static content |

## Image Strategy

- Semua gambar menggunakan `next/image`
- `sizes` prop dikonfigurasi per layout
- `priority` hanya untuk hero images
- Lazy loading default untuk gambar lain
- Format: WebP/AVIF (via Next.js Image Optimization)

## Video Strategy

- Thumbnail dimuat lebih dahulu
- Iframe hanya dimuat setelah klik (lazy loading)
- Aspect ratio 16:9 dijaga
- Fallback link ke YouTube

## SEO Strategy

- Metadata dinamis per halaman
- Open Graph images
- Structured data (JSON-LD)
- Sitemap.xml dinamis
- Robots.txt

## Performance

- Server Components sebagai default
- Client Components hanya untuk interaktif
- Motion animations hanya saat viewport
- Swiper hanya di gallery
- Tidak ada unused dependencies
