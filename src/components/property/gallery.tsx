"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";

/**
 * Detail-page gallery: one large frame plus a thumbnail strip. Thumbnails are
 * real buttons so keyboard and touch users can jump to any photo, and the strip
 * is arrow-key navigable while focus is inside it.
 */
export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const current = Math.min(index, count - 1);

  const go = (target: number) => setIndex(((target % count) + count) % count);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    go(current + (event.key === "ArrowRight" ? 1 : -1));
  };

  return (
    <div className="space-y-4">
      <div
        className="relative overflow-hidden rounded-2xl bg-navy-950 shadow-[var(--shadow-lift)]"
        onKeyDown={onKeyDown}
      >
        <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
          <SmartImage
            key={images[current]}
            src={images[current]}
            alt={`${title} — photo ${current + 1} of ${count}`}
            fill
            priority={current === 0}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(current - 1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/85 text-navy-900 shadow-sm backdrop-blur transition-colors duration-200 hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(current + 1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/85 text-navy-900 shadow-sm backdrop-blur transition-colors duration-200 hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="absolute bottom-3 right-3 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-semibold text-paper tabular">
              {current + 1} / {count}
            </p>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <ul className="grid grid-cols-4 gap-3 sm:grid-cols-6" aria-label="Photo thumbnails">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === current ? "true" : undefined}
                aria-label={`Show photo ${i + 1} of ${count}`}
                className={`block w-full cursor-pointer overflow-hidden rounded-lg border-2 transition-colors duration-200 ${
                  i === current
                    ? "border-gold-500"
                    : "border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                <SmartImage
                  src={src}
                  alt=""
                  width={300}
                  height={200}
                  sizes="(min-width: 640px) 10vw, 20vw"
                  className="aspect-[3/2] w-full"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
