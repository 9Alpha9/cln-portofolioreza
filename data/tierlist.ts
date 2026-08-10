import type { ReviewCategory } from "@/types";

export const TIER_ORDER = ["S+", "S", "A+", "A", "B+", "B", "C+", "C", "F"] as const;
export type TierType = (typeof TIER_ORDER)[number];

export const TIER_STYLING: Record<TierType, { bg: string; text: string }> = {
  "S+": { bg: "bg-[#c0392b]", text: "text-white" },
  S: { bg: "bg-[#e74c3c]", text: "text-white" },
  "A+": { bg: "bg-[#e67e22]", text: "text-white" },
  A: { bg: "bg-[#f1c40f]", text: "text-[#1a1a1a]" },
  "B+": { bg: "bg-[#2ecc71]", text: "text-white" },
  B: { bg: "bg-[#1abc9c]", text: "text-white" },
  "C+": { bg: "bg-[#3498db]", text: "text-white" },
  C: { bg: "bg-[#9b59b6]", text: "text-white" },
  F: { bg: "bg-[#95a5a6]", text: "text-white" },
};

export const TIER_ASSIGNMENTS: Record<string, TierType> = {
  "keychron-k2-he": "S+",
  "razer-viper-v3-pro": "S",
  "logitech-g-pro-x-2": "A",
  "logitech-g-pro-x-superlight": "A+",
  "wooting-60he": "S",
  "steelseries-arctis-nova-pro": "S",
  "dummy-keychron-q1": "A",
  "dummy-glorious-gmmk-pro": "B+",
  "dummy-razer-huntsman-v3-pro": "A+",
  "dummy-pulsar-x2v2": "B+",
  "dummy-lamzu-atlantis-og": "A",
  "dummy-vaxee-xe-wireless": "A",
};

export function getTierForProduct(slug: string): TierType | null {
  return TIER_ASSIGNMENTS[slug] ?? null;
}

export type TabValue = "All" | ReviewCategory | "keyboard-rt";

export const TABS: { label: string; value: TabValue }[] = [
  { label: "Semua", value: "All" },
  { label: "Mouse", value: "mouse" },
  { label: "Mousepad", value: "mousepad" },
  { label: "Keyboard", value: "keyboard" },
  { label: "Keyboard (RT)", value: "keyboard-rt" },
  { label: "Gamepad", value: "controller" },
  { label: "Keycaps", value: "accessories" },
  { label: "Audio", value: "headset" },
  { label: "Others", value: "microphone" },
];
