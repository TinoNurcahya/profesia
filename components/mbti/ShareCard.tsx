"use client";

import { Sparkles, Share2, Compass } from "lucide-react";
import { toast } from "sonner";

export interface ShareCardProps {
  code: string;
  variant: string;
  name: string;
  group: string;
  color: string;
  badgeGradient: string;
}

export default function ShareCard({
  code,
  variant,
  name,
  group,
  badgeGradient,
}: ShareCardProps) {
  const fullCode = `${code}-${variant}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Hasil MBTI Profesia: ${fullCode} (${name})`,
          text: `Saya adalah seorang ${fullCode} - ${name} (${group})! Temukan tipe kepribadian dan karir cocokmu di Profesia.`,
          url: window.location.href,
        });
        toast.success("Link berhasil dibagikan!");
      } catch {
        // Share cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link hasil kuis telah disalin ke clipboard!");
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 space-y-6 max-w-md mx-auto relative overflow-hidden">
      
      {/* Visual Story Card Preview (Format 9:16 aspect) */}
      <div className={`p-8 rounded-2xl bg-gradient-to-br ${badgeGradient} text-white space-y-6 shadow-xl relative`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-xs tracking-wider uppercase opacity-90">
            <Compass className="w-4 h-4" />
            Profesia MBTI 16P
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold backdrop-blur-md">
            {group}
          </span>
        </div>

        <div className="text-center space-y-2 py-4">
          <div className="text-4xl font-black tracking-tight">{fullCode}</div>
          <div className="text-lg font-bold opacity-95">&ldquo;{name}&rdquo;</div>
        </div>

        <div className="p-4 rounded-xl bg-black/20 backdrop-blur-md text-xs space-y-1 text-center">
          <p className="font-semibold opacity-90">Varian Identitas:</p>
          <p className="font-bold">
            {variant === "A" ? "Assertive (Tegas & Percaya Diri)" : "Turbulent (Waspada & Perfeksionis)"}
          </p>
        </div>

        <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[10px] opacity-80">
          <span>profesia.com</span>
          <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Career Matcher</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleShare}
          className="flex-1 py-3 px-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Bagikan Hasil Kuis
        </button>
      </div>

    </div>
  );
}
