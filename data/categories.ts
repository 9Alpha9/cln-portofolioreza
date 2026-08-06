import { type ReviewCategory } from "@/types";

export const categories: { slug: ReviewCategory; name: string; description: string }[] = [
  {
    slug: "keyboard",
    name: "Keyboard",
    description: "Review keyboard gaming dan mekanik dari berbagai brand.",
  },
  {
    slug: "mouse",
    name: "Mouse",
    description: "Review mouse gaming dengan berbagai sensor dan ergonomi.",
  },
  {
    slug: "headset",
    name: "Headset",
    description: "Review headset gaming untuk audio yang immersive.",
  },
  {
    slug: "microphone",
    name: "Microphone",
    description: "Review microphone untuk streaming dan recording.",
  },
  {
    slug: "monitor",
    name: "Monitor",
    description: "Review monitor gaming dengan refresh rate tinggi.",
  },
  {
    slug: "controller",
    name: "Controller",
    description: "Review controller gaming untuk PC dan konsol.",
  },
  {
    slug: "mousepad",
    name: "Mousepad",
    description: "Review mousepad gaming untuk presisi optimal.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "Review aksesoris gaming lainnya.",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
