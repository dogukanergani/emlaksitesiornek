"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ImagePlus,
  LoaderCircle,
  X,
  Check,
  Home,
  Trees,
  Video,
} from "lucide-react";
import { propertyInputSchema, type PropertyInput } from "@/lib/validators";
import { typeLabels, categoryLabels } from "@/lib/format";
import type { PropertyType, PropertyCategory } from "@/lib/types";

const fieldClass =
  "w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-forest-600";
const labelClass = "mb-1.5 block text-sm font-medium text-ink";
const errorClass = "mt-1 text-xs text-red-600";

// "Ev" kategorisinde gösterilecek konut tipleri (arsa hariç)
const EV_TYPES: PropertyType[] = [
  "daire",
  "villa",
  "mustakil-ev",
  "yazlik",
  "isyeri",
];

const EMPTY_VALUES: PropertyInput = {
  title: "",
  description: "",
  price: 0,
  category: "satilik",
  kind: "ev",
  type: "daire",
  city: "",
  district: "",
  area: 0,
  coverImage: "",
  imageUrls: [],
  videoUrl: "",
  badge: "",
  featured: false,
  rooms: 0,
  bathrooms: 0,
  livingRooms: 0,
  zoningStatus: "",
  parcelNo: "",
};

interface PropertyFormProps {
  initial?: PropertyInput;
  propertyId?: string;
}

export default function PropertyForm({ initial, propertyId }: PropertyFormProps) {
  const router = useRouter();
  const isEdit = Boolean(propertyId);

  const [cover, setCover] = useState<string>(initial?.coverImage ?? "");
  const [images, setImages] = useState<string[]>(initial?.imageUrls ?? []);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingExtra, setUploadingExtra] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PropertyInput>({
    resolver: zodResolver(propertyInputSchema),
    defaultValues: initial ?? EMPTY_VALUES,
  });

  const kind = watch("kind");
  const videoUrl = watch("videoUrl");
  const isArsa = kind === "arsa";

  function selectKind(k: "ev" | "arsa") {
    setValue("kind", k, { shouldValidate: true });
    if (k === "arsa") {
      setValue("type", "arsa", { shouldValidate: true });
    } else if (watch("type") === "arsa") {
      setValue("type", "daire", { shouldValidate: true });
    }
  }

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Yükleme başarısız.");
    const data = await res.json();
    return data.url as string;
  }

  async function handleCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    setServerError(null);
    try {
      const url = await uploadFile(file);
      setCover(url);
      setValue("coverImage", url, { shouldValidate: true });
    } catch {
      setServerError("Kapak görseli yüklenemedi.");
    } finally {
      setUploadingCover(false);
      e.target.value = "";
    }
  }

  async function handleExtra(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploadingExtra(true);
    setServerError(null);
    try {
      const uploaded: string[] = [];
      for (const file of files) uploaded.push(await uploadFile(file));
      const next = [...images, ...uploaded];
      setImages(next);
      setValue("imageUrls", next, { shouldValidate: true });
    } catch {
      setServerError("Ekstra görseller yüklenemedi.");
    } finally {
      setUploadingExtra(false);
      e.target.value = "";
    }
  }

  async function handleVideo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingVideo(true);
    setServerError(null);
    try {
      const url = await uploadFile(file);
      setValue("videoUrl", url, { shouldValidate: true });
    } catch {
      setServerError("Video yüklenemedi.");
    } finally {
      setUploadingVideo(false);
      e.target.value = "";
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
      const res = await fetch(
        isEdit ? `/api/admin/properties/${propertyId}` : "/api/admin/properties",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/properties");
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
      {/* Ana kategori: Ev / Arsa */}
      <div>
        <span className={labelClass}>Ana Kategori</span>
        <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
          {([
            { value: "ev", label: "Ev / Konut", Icon: Home },
            { value: "arsa", label: "Arsa", Icon: Trees },
          ] as const).map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => selectKind(value)}
              className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${
                kind === value
                  ? "border-forest-600 bg-forest-50 text-forest-700"
                  : "border-black/10 text-stone hover:border-forest-300"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Başlık */}
      <div>
        <label htmlFor="title" className={labelClass}>
          Başlık
        </label>
        <input id="title" {...register("title")} className={fieldClass} />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      {/* Satılık/Kiralık + (Ev ise) Konut Tipi */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClass}>
            Durum
          </label>
          <select id="category" {...register("category")} className={fieldClass}>
            {(Object.keys(categoryLabels) as PropertyCategory[]).map((c) => (
              <option key={c} value={c}>
                {categoryLabels[c]}
              </option>
            ))}
          </select>
        </div>
        {!isArsa && (
          <div>
            <label htmlFor="type" className={labelClass}>
              Konut Tipi
            </label>
            <select id="type" {...register("type")} className={fieldClass}>
              {EV_TYPES.map((t) => (
                <option key={t} value={t}>
                  {typeLabels[t]}
                </option>
              ))}
            </select>
            {errors.type && <p className={errorClass}>{errors.type.message}</p>}
          </div>
        )}
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
          {errors.price && <p className={errorClass}>{errors.price.message}</p>}
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
          <input id="district" {...register("district")} className={fieldClass} />
          {errors.district && (
            <p className={errorClass}>{errors.district.message}</p>
          )}
        </div>
      </div>

      {/* Metrekare (her iki tip) + EV/ARSA'ya özel alanlar */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="area" className={labelClass}>
            Metrekare (m²)
          </label>
          <input
            id="area"
            type="number"
            {...register("area", { valueAsNumber: true })}
            className={fieldClass}
          />
          {errors.area && <p className={errorClass}>{errors.area.message}</p>}
        </div>

        {!isArsa && (
          <>
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
              <label htmlFor="livingRooms" className={labelClass}>
                Salon Sayısı
              </label>
              <input
                id="livingRooms"
                type="number"
                {...register("livingRooms", { valueAsNumber: true })}
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
          </>
        )}

        {isArsa && (
          <>
            <div>
              <label htmlFor="zoningStatus" className={labelClass}>
                İmar Durumu
              </label>
              <input
                id="zoningStatus"
                placeholder="Örn. Konut imarlı"
                {...register("zoningStatus")}
                className={fieldClass}
              />
              {errors.zoningStatus && (
                <p className={errorClass}>{errors.zoningStatus.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="parcelNo" className={labelClass}>
                Ada / Parsel
              </label>
              <input
                id="parcelNo"
                placeholder="Örn. 1234 / 56"
                {...register("parcelNo")}
                className={fieldClass}
              />
              {errors.parcelNo && (
                <p className={errorClass}>{errors.parcelNo.message}</p>
              )}
            </div>
          </>
        )}
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

      {/* Kapak fotoğrafı */}
      <div>
        <span className={labelClass}>Kapak Fotoğrafı</span>
        <div className="flex flex-wrap gap-3">
          {cover ? (
            <div className="relative h-28 w-40 overflow-hidden rounded-lg ring-1 ring-black/10">
              <Image src={cover} alt="Kapak" fill sizes="160px" className="object-cover" />
              <button
                type="button"
                onClick={() => {
                  setCover("");
                  setValue("coverImage", "", { shouldValidate: true });
                }}
                aria-label="Kapağı kaldır"
                className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <label className="flex h-28 w-40 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-stone/40 text-stone transition-colors hover:border-forest-600 hover:text-forest-600">
              {uploadingCover ? (
                <LoaderCircle className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <ImagePlus className="h-6 w-6" />
                  <span className="text-xs">Kapak Seç</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleCover}
                disabled={uploadingCover}
                className="hidden"
              />
            </label>
          )}
        </div>
        {errors.coverImage && (
          <p className={errorClass}>{errors.coverImage.message}</p>
        )}
      </div>

      {/* Ekstra fotoğraflar */}
      <div>
        <span className={labelClass}>Ekstra Fotoğraflar</span>
        <div className="flex flex-wrap gap-3">
          {images.map((url) => (
            <div
              key={url}
              className="relative h-24 w-24 overflow-hidden rounded-lg ring-1 ring-black/10"
            >
              <Image src={url} alt="Ekstra görsel" fill sizes="96px" className="object-cover" />
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
            {uploadingExtra ? (
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
              onChange={handleExtra}
              disabled={uploadingExtra}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Video (URL veya dosya) */}
      <div>
        <span className={labelClass}>Video (opsiyonel)</span>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="url"
            placeholder="Video URL (örn. https://...)"
            {...register("videoUrl")}
            className={fieldClass}
          />
          <label className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-black/10 px-4 py-2.5 text-sm font-medium text-stone transition-colors hover:border-forest-600 hover:text-forest-600">
            {uploadingVideo ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Video className="h-4 w-4" />
            )}
            Dosya Yükle
            <input
              type="file"
              accept="video/*"
              onChange={handleVideo}
              disabled={uploadingVideo}
              className="hidden"
            />
          </label>
        </div>
        {videoUrl && (
          <p className="mt-1 truncate text-xs text-stone">Video: {videoUrl}</p>
        )}
        {errors.videoUrl && (
          <p className={errorClass}>Geçerli bir video URL'i girin.</p>
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
          <Check className="h-4 w-4" />{" "}
          {isEdit ? "İlan güncellendi" : "İlan kaydedildi"}, yönlendiriliyorsunuz…
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || uploadingCover || uploadingExtra || uploadingVideo}
        className="flex items-center justify-center gap-2 rounded-lg bg-forest-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-forest-700 disabled:opacity-60"
      >
        {isSubmitting && <LoaderCircle className="h-5 w-5 animate-spin" />}
        {isEdit ? "Değişiklikleri Kaydet" : "İlanı Kaydet"}
      </button>
    </form>
  );
}
