"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Menu, X, Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/config";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-sand/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-bold text-ink"
          onClick={() => setOpen(false)}
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
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest-600 text-white">
                <Building2 className="h-5 w-5" />
              </span>
              {siteConfig.siteName}
            </>
          )}
        </Link>

        {/* Masaüstü menü */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-forest-700"
                    : "text-stone hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Masaüstü CTA */}
        <Link
          href="/iletisim"
          className="hidden items-center gap-2 rounded-full bg-forest-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-700 md:inline-flex"
        >
          <Phone className="h-4 w-4" />
          Bize Ulaşın
        </Link>

        {/* Mobil menü butonu */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          className="grid h-10 w-10 place-items-center rounded-lg text-ink transition-colors hover:bg-black/5 md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobil menü paneli */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-black/5 bg-sand md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-forest-50 text-forest-700"
                      : "text-ink hover:bg-black/5"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/iletisim"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-forest-600 px-4 py-3 text-base font-semibold text-white"
              >
                <Phone className="h-4 w-4" />
                Bize Ulaşın
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
