"use client";

import { useState, useMemo, use, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import ProfessionCard from "@/components/profession/ProfessionCard";
import FilterBar from "@/components/profession/FilterBar";
import professionsSeed from "@/data/professions-seed.json";
import { SearchX } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import KineticSplitText from "@/components/motion/KineticSplitText";
import TextReveal from "@/components/motion/TextReveal";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";
import SectionReveal from "@/components/motion/SectionReveal";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

export default function ProfessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ mbti?: string; riasec?: string; category?: string; search?: string; education?: string; sort?: string }>;
}) {
  const initialParams = use(searchParams);
  const t = useTranslations("Profession");
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState(initialParams.search || "");
  const [category, setCategory] = useState(initialParams.category || "all");
  const [mbti, setMbti] = useState(initialParams.mbti || "all");
  const [riasec, setRiasec] = useState(initialParams.riasec || "all");
  const [education, setEducation] = useState(initialParams.education || "");
  const [sort, setSort] = useState(initialParams.sort || "default");
  const [professions, setProfessions] = useState(professionsSeed);
  const [catalogState, setCatalogState] = useState<"loading" | "ready" | "fallback">("loading");

  const gridRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/professions")
      .then((response) => response.json() as Promise<{ success?: boolean; data?: typeof professionsSeed }>)
      .then((result) => { if (!active) return; if (result.success && result.data?.length) { setProfessions(result.data); setCatalogState("ready"); } else setCatalogState("fallback"); })
      .catch(() => { if (active) setCatalogState("fallback"); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    const values = { search: search.trim(), category, mbti, riasec, education: education.trim(), sort };
    Object.entries(values).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "default") params.set(key, value);
    });
    const query = params.toString();
    const timer = window.setTimeout(() => router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false }), 200);
    return () => window.clearTimeout(timer);
  }, [category, education, mbti, pathname, riasec, router, search, sort]);

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setMbti("all");
    setRiasec("all");
    setEducation("");
    setSort("default");
  };

  // Capture GSAP Flip state BEFORE filter changes
  const captureFlipState = useCallback(() => {
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll("[data-flip-id]");
      if (items.length > 0) {
        flipStateRef.current = Flip.getState(items);
      }
    }
  }, []);

  // Wrapper setters that capture flip state before updating
  const setSearchWithFlip = useCallback((v: string) => { captureFlipState(); setSearch(v); }, [captureFlipState]);
  const setCategoryWithFlip = useCallback((v: string) => { captureFlipState(); setCategory(v); }, [captureFlipState]);
  const setMbtiWithFlip = useCallback((v: string) => { captureFlipState(); setMbti(v); }, [captureFlipState]);
  const setRiasecWithFlip = useCallback((v: string) => { captureFlipState(); setRiasec(v); }, [captureFlipState]);
  const setSortWithFlip = useCallback((v: string) => { captureFlipState(); setSort(v); }, [captureFlipState]);
  const setEducationWithFlip = useCallback((v: string) => { captureFlipState(); setEducation(v); }, [captureFlipState]);
  const handleResetWithFlip = useCallback(() => { captureFlipState(); handleReset(); }, [captureFlipState]);

  const filteredProfessions = useMemo(() => {
    let list = [...professions];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name_id.toLowerCase().includes(q) ||
          p.name_en.toLowerCase().includes(q) ||
          p.description_id.toLowerCase().includes(q) ||
          p.description_en.toLowerCase().includes(q) ||
          p.skills_id.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (category !== "all") {
      list = list.filter((p) => p.category_slug === category);
    }

    if (mbti !== "all") {
      const code = mbti.toUpperCase();
      list = list.filter((p) => p.matched_mbti.some((m) => m.code === code));
    }

    if (riasec !== "all") {
      const categoryRiasec: Record<string, string[]> = { teknologi: ["I", "R", "C"], kesehatan: ["S", "I", "R"], "seni-desain": ["A", "I", "S"], pemasaran: ["E", "A", "S"], pendidikan: ["S", "A", "E"] };
      list = list.filter((profession) => categoryRiasec[profession.category_slug]?.includes(riasec));
    }

    if (education.trim()) {
      const value = education.toLowerCase();
      list = list.filter((profession) => profession.education_id.toLowerCase().includes(value) || profession.education_en.toLowerCase().includes(value));
    }

    if (sort === "wlb_desc") {
      list.sort((a, b) => b.work_life_balance - a.work_life_balance);
    } else if (sort === "name_asc") {
      list.sort((a, b) => a.name_id.localeCompare(b.name_id));
    }

    return list;
  }, [search, category, mbti, riasec, education, sort, professions]);

  // Apply GSAP Flip animation AFTER render with new filtered results
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    if (flipStateRef.current && gridRef.current) {
      const items = gridRef.current.querySelectorAll("[data-flip-id]");
      if (items.length > 0) {
        Flip.from(flipStateRef.current, {
          targets: items,
          duration: 0.5,
          ease: "power2.inOut",
          stagger: 0.04,
          absolute: true,
          scale: true,
          fade: true,
          onComplete: () => {
            gsap.set(items, { clearProps: "transform,opacity" });
          },
        });
      }
      flipStateRef.current = null;
    }
  }, [filteredProfessions]);

  return (
    <div className="page-shell space-y-10 py-12 sm:py-16">
      <ScrollProgressBar />

      {/* Header Page */}
      <SectionReveal direction="up">
        <div className="page-intro">
          <p className="eyebrow">
            {t("catalogBadge")}
          </p>
          <KineticSplitText as="h1" className="page-title">
            {t("catalogTitle")}
          </KineticSplitText>
          <TextReveal as="p" delay={0.1} className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            {t("catalogSubtitle")}
          </TextReveal>
        </div>
      </SectionReveal>

      {catalogState === "loading" && <p className="text-xs text-[var(--color-muted)]" role="status">{t("catalogLoading")}</p>}
      {catalogState === "fallback" && <p className="text-xs text-amber-700" role="status">{t("catalogError")}</p>}

      {/* Filter Component */}
      <FilterBar
        search={search}
        setSearch={setSearchWithFlip}
        category={category}
        setCategory={setCategoryWithFlip}
        mbti={mbti}
        setMbti={setMbtiWithFlip}
        riasec={riasec}
        setRiasec={setRiasecWithFlip}
        sort={sort}
        setSort={setSortWithFlip}
        education={education}
        setEducation={setEducationWithFlip}
        onReset={handleResetWithFlip}
      />

      {/* Results Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] pb-4 text-xs font-semibold text-[var(--color-muted)]">
        <span>{t("showing", { shown: filteredProfessions.length, total: professions.length })}</span>
        {mbti !== "all" && (
          <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-700 font-bold">
            {t("activeMbti", { value: mbti })}
          </span>
        )}
      </div>

      {/* Professions Grid with GSAP Flip */}
      {filteredProfessions.length > 0 ? (
        <div ref={gridRef} className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredProfessions.map((prof) => (
            <ProfessionCard key={prof.id} profession={prof} />
          ))}
        </div>
      ) : (
        <div className="surface mx-auto my-12 max-w-md space-y-4 p-8 text-center sm:p-12">
          <div className="w-12 h-12 mx-auto rounded-full bg-[var(--color-soft)] flex items-center justify-center text-[var(--color-muted)]">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">{t("notFound")}</h3>
          <p className="text-xs text-[var(--color-muted)]">
            {t("notFoundDescription")}
          </p>
          <button
            onClick={handleResetWithFlip}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-700 text-white hover:bg-teal-800 transition-colors"
          >
            {t("resetFilter")}
          </button>
        </div>
      )}

    </div>
  );
}
