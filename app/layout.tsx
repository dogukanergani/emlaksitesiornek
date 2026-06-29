import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { siteConfig } from "@/lib/config";

// Display fontu (başlıklar) — globals.css içindeki --font-sora değişkenine bağlanır
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

// Body fontu (metinler) — --font-inter değişkenine bağlanır
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Satılık & Kiralık İlanlar`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${sora.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <TopBar />
        <Navbar />
        {/* Tüm sayfa içerikleri buraya gelir */}
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Sağ altta sabit WhatsApp butonu — her sayfada görünür */}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
