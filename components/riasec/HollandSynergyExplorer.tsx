"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Layers } from "lucide-react";
import CardTilt3D from "@/components/motion/CardTilt3D";

interface SynergyArchetype {
  code: string;
  nameId: string;
  nameEn: string;
  category: string;
  descId: string;
  descEn: string;
  rolesId: string[];
  rolesEn: string[];
  growth: string;
  color: string;
}

const SYNERGY_ARCHETYPES: SynergyArchetype[] = [
  {
    code: "RIA",
    nameId: "Inovator Teknologi & Robotika",
    nameEn: "Technological & Robotics Innovator",
    category: "Deep Tech & AI",
    descId: "Memadukan ketangkasan teknis (R), riset algoritma mendalam (I), dan kebebasan berpikir kreatif (A). Sangat dicari dalam rekayasa kecerdasan buatan, IoT, dan robotika modern.",
    descEn: "Fuses practical technical mastery (R), rigorous research (I), and creative intuition (A). Dominant in modern AI engineering, autonomous systems, and advanced robotics.",
    rolesId: ["AI Research Engineer", "Robotics Architect", "Autonomous Vehicle Dev"],
    rolesEn: ["AI Research Engineer", "Robotics Architect", "Autonomous Vehicle Dev"],
    growth: "+32% YoY",
    color: "#6366f1",
  },
  {
    code: "EAS",
    nameId: "Visioner Kreatif & Brand Leader",
    nameEn: "Creative Visionary & Brand Leader",
    category: "Creative Business",
    descId: "Menghubungkan ambisi kepemimpinan bisnis (E), kepekaan estetika visual (A), dan kecerdasan interpersonal (S) untuk memimpin produk digital dan industri kreatif global.",
    descEn: "Synthesizes entrepreneurial leadership (E), aesthetic brilliance (A), and human empathy (S) to spearhead world-class creative agencies and digital products.",
    rolesId: ["Creative Director", "VP Product Marketing", "Game Producer"],
    rolesEn: ["Creative Director", "VP Product Marketing", "Game Producer"],
    growth: "+24% YoY",
    color: "#f43f5e",
  },
  {
    code: "IRC",
    nameId: "Arsitek Data & Kuantitatif",
    nameEn: "Data & Quantitative Architect",
    category: "Data & FinTech",
    descId: "Kombinasi investigasi data analitis (I), rekayasa sistem nyata (R), dan ketelitian struktural tingkat tinggi (C). Pondasi dari arsitektur cloud, data science, dan algoritma kuantitatif.",
    descEn: "A synthesis of investigative data analysis (I), tangible system building (R), and strict structural accuracy (C). The cornerstone of cloud architectures, FinTech, and quantitative systems.",
    rolesId: ["Cloud Data Architect", "Quantitative Analyst", "Cybersecurity Auditor"],
    rolesEn: ["Cloud Data Architect", "Quantitative Analyst", "Cybersecurity Auditor"],
    growth: "+28% YoY",
    color: "#06b6d4",
  },
  {
    code: "SEC",
    nameId: "Pembangun Ekosistem & Regulasi",
    nameEn: "Ecosystem & Governance Builder",
    category: "Public & Education",
    descId: "Kombinasi kepedulian sosial tinggi (S), kepemimpinan terarah (E), dan ketertiban sistemis (C). Pilar penting dalam transformasi rumah sakit, institusi pendidikan, dan manajemen korporasi.",
    descEn: "Combines social empathy (S), directional leadership (E), and institutional order (C). Essential for healthcare governance, education reform, and organizational excellence.",
    rolesId: ["Healthcare Director", "Higher Ed Dean", "Public Policy Strategist"],
    rolesEn: ["Healthcare Director", "Higher Ed Dean", "Public Policy Strategist"],
    growth: "+19% YoY",
    color: "#10b981",
  },
];

interface HollandSynergyExplorerProps {
  locale: string;
}

export default function HollandSynergyExplorer({
  locale,
}: HollandSynergyExplorerProps) {
  const isEn = locale === "en";
  const [selectedCode, setSelectedCode] = useState<string>("RIA");

  return (
    <div className="space-y-8">
      {/* Category Navigation Pills */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {SYNERGY_ARCHETYPES.map((arch) => {
          const isSelected = arch.code === selectedCode;
          return (
            <button
              key={arch.code}
              type="button"
              onClick={() => setSelectedCode(arch.code)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2.5 border ${
                isSelected
                  ? "bg-[var(--color-ink)] text-[var(--color-surface)] border-[var(--color-ink)] shadow-md"
                  : "bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-ink)] border-[var(--color-line)]"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: arch.color }}
              />
              <span className="font-mono tracking-wider">{arch.code}</span>
              <span className="hidden sm:inline opacity-70">
                — {isEn ? arch.nameEn : arch.nameId}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Archetype Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SYNERGY_ARCHETYPES.map((arch) => {
          const isSelected = arch.code === selectedCode;

          return (
            <CardTilt3D
              key={arch.code}
              className={`p-8 rounded-3xl border transition-all duration-500 flex flex-col justify-between ${
                isSelected
                  ? "border-[var(--color-ink)] shadow-2xl bg-[var(--color-surface)]"
                  : "border-[var(--color-line)] bg-[var(--color-surface)]/60 hover:border-[var(--color-muted)]"
              }`}
            >
              <div className="space-y-6">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="px-3 py-1 rounded-md text-xs font-mono font-black tracking-widest text-white shadow-sm"
                      style={{ backgroundColor: arch.color }}
                    >
                      {arch.code}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                      {arch.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{arch.growth}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--color-ink)]">
                  {isEn ? arch.nameEn : arch.nameId}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                  {isEn ? arch.descEn : arch.descId}
                </p>

                {/* Representative Roles */}
                <div className="space-y-2 pt-4 border-t border-[var(--color-line)]">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-muted)] flex items-center gap-1.5">
                    <Layers className="w-3 h-3" />
                    {isEn ? "Core Benchmark Roles" : "Profesi Tolok Ukur"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(isEn ? arch.rolesEn : arch.rolesId).map((role) => (
                      <span
                        key={role}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--color-soft)] text-[var(--color-ink)] border border-[var(--color-line)]"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-4 border-t border-[var(--color-line)] flex items-center justify-between">
                <Link
                  href={`/${locale}/professions?search=${arch.code}`}
                  className="inline-flex items-center gap-2 text-xs font-bold transition-colors hover:underline"
                  style={{ color: arch.color }}
                >
                  <span>
                    {isEn
                      ? `View ${arch.code} Aligned Careers`
                      : `Lihat Karir Berbasis ${arch.code}`}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Sparkles
                  className="w-4 h-4 opacity-40"
                  style={{ color: arch.color }}
                />
              </div>
            </CardTilt3D>
          );
        })}
      </div>
    </div>
  );
}
