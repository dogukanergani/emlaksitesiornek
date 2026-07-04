import Link from "next/link";
import {
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { navLinks, siteConfig } from "@/lib/config";

const socials = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Twitter", href: "#", Icon: Twitter },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-forest-900 text-forest-50">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* Marka + kısa bilgi */}
        <div className="lg:col-span-2">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl font-bold text-white"
          >
            {siteConfig.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={siteConfig.logoUrl}
                alt={siteConfig.siteName}
                className="h-9 w-auto"
              />
            ) : (
              <>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
                  <Building2 className="h-5 w-5" />
                </span>
                {siteConfig.siteName}
              </>
            )}
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest-50/70">
            {siteConfig.footerDescription}
          </p>

          <div className="mt-6 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Hızlı linkler */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Menü
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-forest-50/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            İletişim
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-forest-50/70">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{siteConfig.address}</span>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-start gap-3 transition-colors hover:text-white"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{siteConfig.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-3 transition-colors hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{siteConfig.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Alt şerit */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-forest-50/60 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year} {siteConfig.siteName}. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-white">
              Gizlilik Politikası
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
