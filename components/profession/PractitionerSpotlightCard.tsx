"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export interface PractitionerSpotlightCardProps {
  imageUrl?: string | null;
  professionName: string;
  fallbackText?: string;
}

export default function PractitionerSpotlightCard({
  imageUrl,
  professionName,
  fallbackText,
}: PractitionerSpotlightCardProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const showImage = Boolean(imageUrl) && !hasError;

  if (!showImage || !imageUrl) {
    return (
      <div
        role="figure"
        aria-label={fallbackText || professionName}
        className="relative w-full max-w-md aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-[var(--color-line)] bg-[var(--color-soft)]/50 p-6 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] flex items-center justify-center text-teal-700 dark:text-teal-400 shadow-sm">
          <Sparkles className="w-6 h-6 stroke-[1.75]" aria-hidden="true" />
        </div>
        {fallbackText ? (
          <p className="max-w-[240px] text-xs text-[var(--color-muted)] leading-relaxed">
            {fallbackText}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <figure
      aria-label={professionName}
      className="relative w-full max-w-md aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-[var(--color-line)] bg-[var(--color-soft)] shadow-xl shadow-teal-950/5 dark:shadow-black/40 group transition-all duration-500 hover:shadow-2xl hover:border-teal-700/40"
    >
      <Image
        src={imageUrl}
        alt={professionName}
        fill
        sizes="(min-width: 1024px) 480px, 100vw"
        className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        priority
      />

      {/* Subtle glassmorphic inner border ring */}
      <div
        className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-3xl pointer-events-none"
        aria-hidden="true"
      />
    </figure>
  );
}

