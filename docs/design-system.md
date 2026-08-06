# Design System

## Design Tokens

Warna dan nilai desain didefinisikan di `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 24% 10%;
  --surface: 220 20% 97%;
  --surface-strong: 220 14% 93%;
  --muted: 220 9% 46%;
  --border: 220 14% 88%;
  --accent: 258 85% 58%;
  --accent-foreground: 0 0% 100%;
  --success: 146 60% 36%;
  --warning: 36 90% 48%;
  --danger: 0 72% 52%;
  --radius-sm: 0.5rem;
  --radius-md: 0.875rem;
  --radius-lg: 1.25rem;
}
```

## Typography

- **Font**: Geist (Sans), Geist Mono
- **Heading**: font-bold, tracking-tight
- **Body**: font-normal, text-foreground
- **Muted**: text-muted

## Spacing Scale

```
4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
```

## Container

- Mobile: px-4 (16px)
- Tablet: px-6 (24px)
- Desktop: px-8 (32px), max-w-7xl

## Components

### Button

Variants:
- `primary` — bg-accent, text-accent-foreground
- `secondary` — bg-surface, text-foreground
- `ghost` — transparent, hover:bg-surface
- `outline` — border, transparent

Sizes:
- `sm` — h-8, px-3, text-sm
- `md` — h-10, px-4, text-sm
- `lg` — h-12, px-6, text-base

### Badge

Variants:
- `default` — bg-surface
- `accent` — bg-accent
- `success` — bg-success
- `warning` — bg-warning
- `danger` — bg-danger

### Input

- Border: border-border
- Focus: ring-2 ring-accent
- Error: border-danger, ring-danger

### Card

Variants:
- `standard` — Border card dengan hover
- `featured` — Horizontal layout
- `compact` — Row layout dengan thumbnail kecil

## Animation Tokens

```
Fast: 120–180 ms
Normal: 200–300 ms
Slow: 400–600 ms
```

## Motion Components

### FadeIn

```tsx
<FadeIn delay={0.1}>
  <Component />
</FadeIn>
```

### StaggerChildren

```tsx
<StaggerChildren>
  <StaggerItem>Item 1</StaggerItem>
  <StaggerItem>Item 2</StaggerItem>
</StaggerChildren>
```

## Responsive Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## Accessibility

- Focus visible: ring-2 ring-accent
- Skip link: "Lewati ke konten utama"
- Semantic HTML: header, nav, main, article, section
- Alt text: semua gambar
- Aria labels: tombol ikon, navigation
- Reduced motion: dihormati via CSS

## Color Palette

| Token | Light | Dark | Usage |
|---|---|---|---|
| background | white | #1a1b1e | Background utama |
| foreground | #1a2233 | white | Teks utama |
| surface | #f5f7fa | #25272b | Background sekunder |
| surface-strong | #e8ebef | #2d3034 | Hover state |
| muted | #6b7280 | #9ca3af | Teks sekunder |
| border | #d1d5db | #374151 | Border |
| accent | #7c3aed | #8b5cf6 | Aksen utama |
| success | #059669 | #10b981 | Sukses |
| warning | #d97706 | #f59e0b | Warning |
| danger | #dc2626 | #ef4444 | Error |
