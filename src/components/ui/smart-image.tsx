"use client";

import Image from "next/image";
import { useState } from "react";
import { FALLBACK_IMAGE, lqipFor } from "@/lib/images";

interface SmartImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Object-fit for `fill` layouts; ignored when width/height are given. */
  objectFit?: "cover" | "contain";
}

/**
 * `next/image` with a real blur placeholder and a local fallback, so a dead
 * remote URL degrades to a branded placeholder instead of breaking the layout.
 *
 * The fade owns `transition-property` on this element — put hover zoom on a
 * wrapper instead of adding a transform transition here, or one wins silently.
 */
export function SmartImage({
  src,
  alt,
  width = 1200,
  height = 800,
  fill = false,
  sizes,
  className,
  priority = false,
  objectFit = "cover",
}: SmartImageProps) {
  const [failedFor, setFailedFor] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const current = failedFor === src ? FALLBACK_IMAGE : src;
  const blur = lqipFor(current);

  return (
    <Image
      src={current}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      priority={priority}
      quality={75}
      loading={priority ? undefined : "lazy"}
      style={fill ? { objectFit } : undefined}
      placeholder={blur ? "blur" : "empty"}
      blurDataURL={blur}
      onLoad={() => setLoaded(true)}
      onError={() => setFailedFor(src)}
      className={`${className ?? ""} transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
