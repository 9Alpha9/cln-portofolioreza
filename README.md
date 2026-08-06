# Gaming Gear Review

Website portfolio untuk content creator yang mereview peripheral dan gaming gear.

## Fitur

- Landing page dengan featured review
- Reviews listing dengan search & filter
- Review detail dengan gallery, video, specs, dan marketplace links
- Category & brand pages
- Search page
- About page
- SEO optimized (sitemap, structured data, Open Graph)
- Mobile-first responsive design
- Dark mode support
- Accessibility (WCAG AA)

## Tech Stack

- Next.js 16.3.0 (App Router)
- TypeScript (strict mode)
- Tailwind CSS v4
- Motion (animations)
- Swiper (gallery)
- Vercel (deployment)

## Getting Started

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint

# Type check
npm run typecheck
```

## Project Structure

```
/
├── app/              # Next.js pages
├── components/       # React components
├── data/            # Static data
├── lib/             # Utilities
├── types/           # TypeScript types
├── docs/            # Documentation
└── content/         # MDX articles (future)
```

## Adding Reviews

1. Add data to `data/reviews.ts`
2. Add images to `public/images/products/[slug]/`
3. Run `npm run typecheck && npm run lint && npm run build`
4. Commit and push

See `docs/content-workflow.md` for details.

## Documentation

- [Architecture](docs/architecture.md)
- [Content Workflow](docs/content-workflow.md)
- [Design System](docs/design-system.md)
- [Decision Log](docs/decisions.md)

## Deployment

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push to main

## License

Private project.
