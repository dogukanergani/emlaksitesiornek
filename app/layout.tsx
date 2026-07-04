import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { siteConfig } from "@/config/site";
import { ACTIVE_THEME } from "@/theme.config";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: siteConfig.seoTitle,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.seoDescription,
};

/**
 * config'te primaryColor / accentColor doluysa, tüm site paletini bu iki
 * renkten türetir (inline CSS değişkenleri en yüksek önceliğe sahiptir, bu
 * yüzden ACTIVE_THEME'i geçersiz kılar). Boşsa ACTIVE_THEME geçerli kalır.
 */
function brandThemeStyle(): CSSProperties | undefined {
  const p = siteConfig.primaryColor?.trim();
  const a = siteConfig.accentColor?.trim();
  if (!p && !a) return undefined;

  const style: Record<string, string> = {};
  if (p) {
    style["--color-forest-50"] = `color-mix(in srgb, ${p} 10%, white)`;
    style["--color-forest-100"] = `color-mix(in srgb, ${p} 20%, white)`;
    style["--color-forest-600"] = p;
    style["--color-forest-700"] = `color-mix(in srgb, ${p} 80%, black)`;
    style["--color-forest-900"] = `color-mix(in srgb, ${p} 42%, black)`;
  }
  if (a) {
    style["--color-clay-500"] = a;
    style["--color-clay-600"] = `color-mix(in srgb, ${a} 82%, black)`;
  }
  return style as CSSProperties;
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      data-theme={ACTIVE_THEME}
      style={brandThemeStyle()}
      className={`${sora.variable} ${inter.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <TopBar />
        <Navbar />
        {/* Tüm sayfa içerikleri buraya gelir */}
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Sağ altta sabit WhatsApp butonu — her sayfada görünür */}
        <FloatingWhatsApp />
        {/* GA4 — yalnızca config'te googleAnalyticsId doluysa yüklenir */}
        <GoogleAnalytics gaId={siteConfig.googleAnalyticsId} />
      </body>
    </html>
  );
}
