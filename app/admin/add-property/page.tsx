import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AddPropertyForm from "@/components/admin/PropertyForm";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Yeni İlan Ekle",
  robots: { index: false, follow: false },
};

export default function AddPropertyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Panele dön
        </Link>
        <LogoutButton />
      </div>

      <h1 className="mt-6 font-display text-3xl font-bold text-ink">
        Yeni İlan Ekle
      </h1>
      <p className="mt-2 text-stone">
        Görselleri yükleyin ve ilan bilgilerini doldurun.
      </p>

      <div className="mt-8">
        <AddPropertyForm />
      </div>
    </div>
  );
}
