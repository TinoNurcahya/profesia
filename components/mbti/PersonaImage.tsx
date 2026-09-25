"use client";

import { useState } from "react";
import { Brain } from "lucide-react";
import Image from "next/image";

interface PersonaImageProps {
  mbtiCode: string;
  fullCode: string;
}

export function PersonaImage({ mbtiCode, fullCode }: PersonaImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-[var(--color-surface)] border-4 border-[var(--color-line)] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
      {!hasError ? (
        <Image
          src={`/images/mbti/${mbtiCode.toLowerCase()}.png`}
          alt={`${fullCode} Persona`}
          fill
          sizes="(min-width: 640px) 256px, 192px"
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-muted)] gap-2">
          <Brain className="w-12 h-12" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)]">
            Persona
          </span>
        </div>
      )}
    </div>
  );
}
