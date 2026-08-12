import type { ReviewCategory } from "@/types";

export const TIER_ORDER = ["S", "A", "B", "D"] as const;
export type TierType = (typeof TIER_ORDER)[number];

export const TIER_STYLING: Record<TierType, { bg: string; text: string }> = {
  S: { bg: "bg-[#e74c3c]", text: "text-white" },
  A: { bg: "bg-[#f1c40f]", text: "text-[#1a1a1a]" },
  B: { bg: "bg-[#1abc9c]", text: "text-white" },
  D: { bg: "bg-[#95a5a6]", text: "text-white" },
};

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
