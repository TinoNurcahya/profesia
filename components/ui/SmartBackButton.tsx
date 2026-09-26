"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export interface SmartBackButtonProps {
  fallbackHref: string;
  label: string;
  className?: string;
}

export default function SmartBackButton({
  fallbackHref,
  label,
  className = "inline-flex items-center gap-2 text-xs font-mono font-semibold text-[var(--color-muted)] hover:text-teal-700 transition-colors group cursor-pointer",
}: SmartBackButtonProps) {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <a href={fallbackHref} onClick={handleBack} className={className}>
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}
