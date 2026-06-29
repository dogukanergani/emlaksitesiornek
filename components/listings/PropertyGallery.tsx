"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80";

type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

export default function PropertyGallery({
  images,
  videoUrl,
  title,
}: {
  images: string[];
  videoUrl?: string;
  title: string;
}) {
  const imageItems: MediaItem[] = (images.length > 0 ? images : [PLACEHOLDER]).map(
    (src) => ({ type: "image", src })
  );
  const media: MediaItem[] = videoUrl
    ? [...imageItems, { type: "video", src: videoUrl }]
    : imageItems;

  const [active, setActive] = useState(0);
  const current = media[active] ?? media[0];

  return (
    <div>
      {/* Ana medya alanı */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl2 bg-black ring-1 ring-black/5">
        {current.type === "image" ? (
          <Image
            src={current.src}
            alt={`${title} — görsel ${active + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        ) : (
          <video
            src={current.src}
            controls
            playsInline
            className="h-full w-full bg-black object-contain"
          />
        )}
      </div>

      {/* Küçük görseller / video */}
      {media.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {media.map((item, i) => (
            <button
              key={item.src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={item.type === "video" ? "Video" : `Görsel ${i + 1}`}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg ring-2 transition-all ${
                i === active
                  ? "ring-forest-600"
                  : "ring-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center gap-1 bg-ink text-xs font-medium text-white">
                  <Play className="h-4 w-4" />
                  Video
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
