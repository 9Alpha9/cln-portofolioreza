import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/ui/navbar";
import { LenisProvider } from "@/components/lenis-provider";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gaming Gear Review",
    template: "%s | Gaming Gear Review",
  },
  description:
    "Portfolio review peripheral dan gaming gear. Temukan gear, pahami hasil review, tonton videonya, lalu pilih tempat membeli.",
  metadataBase: new URL("https://gaminggear.review"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Gaming Gear Review",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${dmSerifDisplay.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-accent focus:text-accent-foreground"
          >
            Lewati ke konten utama
          </a>
          <Navbar />
          <LenisProvider>
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
