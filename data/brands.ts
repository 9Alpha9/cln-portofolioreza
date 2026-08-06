export const brands = [
  {
    slug: "keychron",
    name: "Keychron",
    description: "Keyboard mekanik premium dengan fitur wireless.",
  },
  {
    slug: "razer",
    name: "Razer",
    description: "Perangkat gaming dengan performa tinggi.",
  },
  {
    slug: "logitech",
    name: "Logitech",
    description: "Peripheral gaming dan productivity.",
  },
  {
    slug: "steelseries",
    name: "SteelSeries",
    description: "Headset dan aksesoris gaming.",
  },
  {
    slug: "hyperx",
    name: "HyperX",
    description: "Headset dan keyboard gaming.",
  },
] as const;

export function getBrandBySlug(slug: string) {
  return brands.find((b) => b.slug === slug);
}
