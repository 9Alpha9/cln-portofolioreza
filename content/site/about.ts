import instagramMedia from "@/content/media/instagram-media.json";

export const aboutMeta = {
  title: "About",
  description:
    "Kenali Tahutech ID, pendekatan review gaming gear, dan cara pengujian produk.",
};

export const heroKicker = "TAHUTECH ID / REVIEWER GAMING GEAR";

export const heroTitle = ["Biar pilih gear", "pakai alasan,", "bukan tebakan."];

export const heroDescription =
  "Tahutech ID membahas gaming gear untuk membantu kamu memahami produk sebelum checkout. Fokusnya: pengalaman pakai, detail yang penting, dan rekomendasi yang sesuai kebutuhan.";

export const channel = {
  kicker: "TENTANG KANAL",
  title: "Review dibuat untuk menjawab: gear ini cocok buat siapa?",
  paragraphs: [
    "Tidak semua produk mahal cocok untuk semua orang. Tahutech ID melihat tiap gear dari kebutuhan nyata, mulai dari kerja, bermain kompetitif, hingga setup harian.",
    "Konten dirancang ringkas namun tetap memberi konteks: kelebihan, kekurangan, serta hal yang perlu dipertimbangkan sebelum membeli.",
  ],
};

export const reviewProcess = {
  kicker: "CARA REVIEW",
  title: "Tiga langkah sebelum rekomendasi.",
  description:
    "Penilaian tidak berhenti pada spesifikasi. Pengalaman penggunaan dan konteks harga ikut menjadi pertimbangan.",
  steps: [
    {
      index: "01",
      title: "Pakai langsung",
      description:
        "Gear dicoba dalam penggunaan harian dan sesi bermain untuk memahami rasa pakai, kenyamanan, serta karakter utamanya.",
    },
    {
      index: "02",
      title: "Uji detail penting",
      description:
        "Fitur, build quality, konektivitas, software, dan performa dibahas dari hal yang paling relevan untuk calon pengguna.",
    },
    {
      index: "03",
      title: "Nilai dengan konteks",
      description:
        "Kesimpulan mempertimbangkan harga, alternatif, kebutuhan pengguna, dan kompromi yang perlu diketahui sebelum membeli.",
    },
  ],
};

export const coverage = ["Keyboard", "Mouse", "Headset", "Microphone", "Monitor", "Controller"];

export const socialLinks = [
  {
    label: "Instagram",
    handle: "@tahutech.idn",
    href: "https://www.instagram.com/tahutech.idn",
  },
  {
    label: "TikTok",
    handle: "@tahutech.id",
    href: "https://www.tiktok.com/@tahutech.id",
  },
  {
    label: "YouTube",
    handle: "@tahu_tech",
    href: "https://www.youtube.com/@tahu_tech",
  },
];

export const transparency = {
  title: "Transparansi",
  description:
    "Beberapa tautan pembelian dapat berupa tautan afiliasi. Komisi tidak menambah harga yang kamu bayar dan tidak mengubah penilaian produk. Kelebihan maupun kekurangan tetap disampaikan sesuai pengalaman review.",
};

type InstagramMediaItem = {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
};

export const instagramVideos = (instagramMedia as InstagramMediaItem[])
  .filter((item) => item.media_type === "VIDEO")
  .sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
  .slice(0, 3);
