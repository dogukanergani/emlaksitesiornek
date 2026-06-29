import type { Metadata } from "next";
import Link from "next/link";
import { PlusCircle, List } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: { index: false, follow: false },
};

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium uppercase tracking-[0.2em] text-clay-500">
            Yönetim
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink">
            Panel
          </h1>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/add-property"
          className="group rounded-xl2 bg-white p-6 ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-forest-50 text-forest-600">
            <PlusCircle className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-display text-lg font-bold text-ink">
            Yeni İlan Ekle
          </h2>
          <p className="mt-1 text-sm text-stone">
            Görsel yükleyin, bilgileri girin ve ilanı yayınlayın.
          </p>
        </Link>

        <Link
          href="/admin/properties"
          className="group rounded-xl2 bg-white p-6 ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-forest-50 text-forest-600">
            <List className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-display text-lg font-bold text-ink">
            İlan Yönetimi
          </h2>
          <p className="mt-1 text-sm text-stone">
            Mevcut ilanları düzenleyin veya silin.
          </p>
        </Link>
      </div>
    </div>
  );
}
