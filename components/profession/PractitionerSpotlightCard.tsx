"use client";

import { useState } from "react";
import Image from "next/image";
import { User, MapPin } from "lucide-react";

export interface PractitionerSpotlightCardProps {
  imageUrl?: string | null;
  professionName: string;
  workEnvironment?: string;
  titleLabel: string;
  badgeLabel: string;
  fallbackText: string;
  environmentLabel?: string;
}

export default function PractitionerSpotlightCard({
  imageUrl,
  professionName,
  workEnvironment,
  titleLabel,
  badgeLabel,
  fallbackText,
  environmentLabel,
}: PractitionerSpotlightCardProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const showImage = Boolean(imageUrl) && !hasError;

  return (
    <aside
      aria-label={titleLabel}
      className="w-full max-w-sm rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 shadow-sm transition-all hover:border-teal-700/50 hover:shadow-md space-y-4"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-ink)]">
          <User className="w-4 h-4 text-teal-700" aria-hidden="true" />
          <span>{titleLabel}</span>
        </div>
        <span className="rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/60 px-2.5 py-0.5 text-[10px] font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider">
          {badgeLabel}
        </span>
      </div>

      {/* Main visual frame */}
      {showImage && imageUrl ? (
        <div className="space-y-3">
          <div className="relative h-48 w-full overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-soft)]">
            <Image
              src={imageUrl}
              alt={professionName}
              fill
              sizes="(min-width: 1024px) 384px, 100vw"
              className={`object-cover transition-all duration-700 ${
                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              priority={false}
            />
            {/* Subtle bottom gradient overlay for readability */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <div className="absolute bottom-2.5 left-2.5 right-2.5">
              <span className="inline-block rounded-md bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[11px] font-medium text-white shadow-xs">
                {professionName}
              </span>
            </div>
          </div>

          {/* Contextual work environment caption */}
          {workEnvironment && (
            <div className="flex items-start gap-1.5 text-xs text-[var(--color-muted)] leading-relaxed pt-1">
              <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                {environmentLabel ? (
                  <strong className="font-semibold text-[var(--color-ink)]">{environmentLabel}: </strong>
                ) : null}
                {workEnvironment}
              </span>
            </div>
          )}
        </div>
      ) : (
        /* Fallback question mark frame */
        <div className="space-y-3">
          <div className="relative mx-auto flex h-48 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--color-line)] bg-[var(--color-soft)]/60 text-center">
            <span className="text-6xl font-black text-teal-700/40 dark:text-teal-400/40 select-none">
              ?
            </span>
          </div>
          <p className="text-center text-xs text-[var(--color-muted)] leading-relaxed">
            {fallbackText}
          </p>
        </div>
      )}
    </aside>
  );
}
