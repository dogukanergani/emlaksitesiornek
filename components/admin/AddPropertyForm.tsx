"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, LoaderCircle, X, Check } from "lucide-react";
import { propertyInputSchema, type PropertyInput } from "@/lib/validators";
import { typeLabels, categoryLabels } from "@/lib/format";
import type { PropertyType, PropertyCategory } from "@/lib/types";

const fieldClass =
  "w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-forest-600";
const labelClass = "mb-1.5 block text-sm font-medium text-ink";
const errorClass = "mt-1 text-xs text-red-600";

export default function AddPropertyForm() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PropertyInput>({
    resolver: zodResolver(propertyInputSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "satilik",
      type: "daire",
      city: "",
      district: "",
      area: 0,
      rooms: 0,
      bathrooms: 0,
      badge: "",
      featured: false,
      imageUrls: [],
    },
  });

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    setServerError(null);
    try {
      const uploaded: string[] = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: fd,
        });
        if (!res.ok) throw new Error("Yükleme başarısız.");
        const data = await res.json();
        uploaded.push(data.url);
      }
      const next = [...images, ...uploaded];
      setImages(next);
      setValue("imageUrls", next, { shouldValidate: true });
    } catch {
      setServerError("Görsel yüklenirken bir hata oluştu.");
    } finally {
      setUploading(false);
      e.target.value = ""; // aynı dosyayı tekrar seçebilmek için
    }
  }

  function removeImage(url: string) {
    const next = images.filter((u) => u !== url);
    setImages(next);
    setValue("imageUrls", next, { shouldValidate: true });
  }

  async function onSubmit(values: PropertyInput) {
    setServerError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/admin/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/ilanlarim");
          router.refresh();
        }, 900);
      } else {
        const data = await res.json().catch(() => ({}));
        setServerError(data.error ?? "İlan kaydedilemedi.");
      }
    } catch {
      setServerError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl2 bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8"
    >
      {/* Başlık */}
      <div>
        <label htmlFor="title" className={labelClass}>
          Başlık
        </label>
        <input id="title" {...register("title")} className={fieldClass} />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      {/* Kategori + Tip */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClass}>
            Kategori
          </label>
          <select
            id="category"
            {...register("category")}
            className={fieldClass}
          >
            {(Object.keys(categoryLabels) as PropertyCategory[]).map((c) => (
              <option key={c} value={c}>
                {categoryLabels[c]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="type" className={labelClass}>
            Konut Tipi
          </label>
          <select id="type" {...register("type")} className={fieldClass}>
            {(Object.keys(typeLabels) as PropertyType[]).map((t) => (
              <option key={t} value={t}>
                {typeLabels[t]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Fiyat + Etiket */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className={labelClass}>
            Fiyat (TL)
          </label>
          <input
            id="price"
            type="number"
            {...register("price", { valueAsNumber: true })}
            className={fieldClass}
          />
          {errors.price && (
            <p className={errorClass}>{errors.price.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="badge" className={labelClass}>
            Etiket (opsiyonel)
          </label>
          <select id="badge" {...register("badge")} className={fieldClass}>
            <option value="">Yok</option>
            <option value="yeni">Yeni</option>
            <option value="firsat">Fırsat</option>
            <option value="acil">Acil</option>
          </select>
        </div>
      </div>

      {/* Konum */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className={labelClass}>
            Şehir
          </label>
          <input id="city" {...register("city")} className={fieldClass} />
          {errors.city && <p className={errorClass}>{errors.city.message}</p>}
        </div>
        <div>
          <label htmlFor="district" className={labelClass}>
            İlçe
          </label>
          <input
            id="district"
            {...register("district")}
            className={fieldClass}
          />
          {errors.district && (
            <p className={errorClass}>{errors.district.message}</p>
          )}
        </div>
      </div>

      {/* m² / oda / banyo */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="area" className={labelClass}>
            Alan (m²)
          </label>
          <input
            id="area"
            type="number"
            {...register("area", { valueAsNumber: true })}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="rooms" className={labelClass}>
            Oda Sayısı
          </label>
          <input
            id="rooms"
            type="number"
            {...register("rooms", { valueAsNumber: true })}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="bathrooms" className={labelClass}>
            Banyo Sayısı
          </label>
          <input
            id="bathrooms"
            type="number"
            {...register("bathrooms", { valueAsNumber: true })}
            className={fieldClass}
          />
        </div>
      </div>

      {/* Açıklama */}
      <div>
        <label htmlFor="description" className={labelClass}>
          Açıklama
        </label>
        <textarea
          id="description"
          rows={4}
          {...register("description")}
          className={fieldClass}
        />
        {errors.description && (
          <p className={errorClass}>{errors.description.message}</p>
        )}
      </div>

      {/* Öne çıkar */}
      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          {...register("featured")}
          className="h-4 w-4 rounded border-black/20 text-forest-600 focus:ring-forest-600"
        />
        Anasayfada öne çıkar
      </label>

      {/* Görsel yükleme (Cloudinary) */}
      <div>
        <span className={labelClass}>Görseller</span>
        <div className="flex flex-wrap gap-3">
          {images.map((url) => (
            <div
              key={url}
              className="relative h-24 w-24 overflow-hidden rounded-lg ring-1 ring-black/10"
            >
              <Image
                src={url}
                alt="Yüklenen görsel"
                fill
                sizes="96px"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(url)}
                aria-label="Görseli kaldır"
                className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-stone/40 text-stone transition-colors hover:border-forest-600 hover:text-forest-600">
            {uploading ? (
              <LoaderCircle className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <ImagePlus className="h-6 w-6" />
                <span className="text-xs">Ekle</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFiles}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
        {errors.imageUrls && (
          <p className={errorClass}>{errors.imageUrls.message}</p>
        )}
      </div>

      {/* Sunucu mesajları */}
      {serverError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {serverError}
        </p>
      )}
      {success && (
        <p className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          <Check className="h-4 w-4" /> İlan kaydedildi, yönlendiriliyorsunuz…
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || uploading}
        className="flex items-center justify-center gap-2 rounded-lg bg-forest-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-forest-700 disabled:opacity-60"
      >
        {isSubmitting && <LoaderCircle className="h-5 w-5 animate-spin" />}
        İlanı Kaydet
      </button>
    </form>
  );
}
