import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import LoginForm from "@/components/admin/LoginForm";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Yönetici Girişi",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-xl2 bg-white p-8 shadow-sm ring-1 ring-black/5">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-forest-600 text-white">
            <Building2 className="h-6 w-6" />
          </span>
          <h1 className="mt-4 font-display text-xl font-bold text-ink">
            {siteConfig.name} Yönetim
          </h1>
          <p className="mt-1 text-sm text-stone">
            Devam etmek için yönetici şifresini girin.
          </p>
        </div>

        <LoginForm from={from ?? "/admin"} />
      </div>
    </div>
  );
}
