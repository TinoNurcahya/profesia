"use client";

import { useState, useMemo, use, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import ProfessionCard from "@/components/profession/ProfessionCard";
import FilterBar from "@/components/profession/FilterBar";
import professionsSeed from "@/data/professions-seed.json";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
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

function getDesktopPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, 4, "...", total];
  }

  if (current >= total - 2) {
    return [1, "...", total - 3, total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
}

function getMobilePageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 4) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 2) {
    return [1, 2, "...", total];
  }

  if (current >= total - 1) {
    return [1, "...", total - 1, total];
  }

  return [1, "...", current, "...", total];
}

export default function ProfessionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    mbti?: string;
    riasec?: string;
    category?: string;
    search?: string;
    education?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
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
  const [currentPage, setCurrentPage] = useState(
    initialParams.page ? Math.max(1, parseInt(initialParams.page, 10) || 1) : 1
  );
  const [pageSize, setPageSize] = useState<number>(
    [10, 20, 50].includes(Number(initialParams.limit)) ? Number(initialParams.limit) : 10
  );
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

  // Synchronize state when initialParams updates (e.g., browser back/forward or deep linking)
  useEffect(() => {
    const searchFromUrl = initialParams.search || "";
    if (searchFromUrl !== search) setSearch(searchFromUrl);

    const categoryFromUrl = initialParams.category || "all";
    if (categoryFromUrl !== category) setCategory(categoryFromUrl);

    const mbtiFromUrl = initialParams.mbti || "all";
    if (mbtiFromUrl !== mbti) setMbti(mbtiFromUrl);

    const riasecFromUrl = initialParams.riasec || "all";
    if (riasecFromUrl !== riasec) setRiasec(riasecFromUrl);

    const educationFromUrl = initialParams.education || "";
    if (educationFromUrl !== education) setEducation(educationFromUrl);

    const sortFromUrl = initialParams.sort || "default";
    if (sortFromUrl !== sort) setSort(sortFromUrl);

    const pageFromUrl = initialParams.page ? Math.max(1, parseInt(initialParams.page, 10) || 1) : 1;
    if (pageFromUrl !== currentPage) setCurrentPage(pageFromUrl);

    const limitFromUrl = [10, 20, 50].includes(Number(initialParams.limit)) ? Number(initialParams.limit) : 10;
    if (limitFromUrl !== pageSize) setPageSize(limitFromUrl);
  }, [initialParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    const values = {
      search: search.trim(),
      category,
      mbti,
      riasec,
      education: education.trim(),
      sort,
      page: currentPage > 1 ? String(currentPage) : undefined,
      limit: pageSize !== 10 ? String(pageSize) : undefined,
    };
    Object.entries(values).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "default") params.set(key, value);
    });
    const query = params.toString();
    const timer = window.setTimeout(
      () => router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false }),
      200
    );
    return () => window.clearTimeout(timer);
  }, [category, currentPage, education, mbti, pathname, pageSize, riasec, router, search, sort]);

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setMbti("all");
    setRiasec("all");
    setEducation("");
    setSort("default");
    setCurrentPage(1);
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

  // Wrapper setters that capture flip state before updating and reset page to 1
  const setSearchWithFlip = useCallback((v: string) => { captureFlipState(); setSearch(v); setCurrentPage(1); }, [captureFlipState]);
  const setCategoryWithFlip = useCallback((v: string) => { captureFlipState(); setCategory(v); setCurrentPage(1); }, [captureFlipState]);
  const setMbtiWithFlip = useCallback((v: string) => { captureFlipState(); setMbti(v); setCurrentPage(1); }, [captureFlipState]);
  const setRiasecWithFlip = useCallback((v: string) => { captureFlipState(); setRiasec(v); setCurrentPage(1); }, [captureFlipState]);
  const setSortWithFlip = useCallback((v: string) => { captureFlipState(); setSort(v); setCurrentPage(1); }, [captureFlipState]);
  const setEducationWithFlip = useCallback((v: string) => { captureFlipState(); setEducation(v); setCurrentPage(1); }, [captureFlipState]);
  const handleResetWithFlip = useCallback(() => { captureFlipState(); handleReset(); }, [captureFlipState]);

  const handlePageSizeChange = (size: number) => {
    captureFlipState();
    setPageSize(size);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    captureFlipState();
    setCurrentPage(page);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

  const totalPages = Math.max(1, Math.ceil(filteredProfessions.length / pageSize));

  // Ensure currentPage doesn't exceed totalPages if filtered list shrinks
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedProfessions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProfessions.slice(start, start + pageSize);
  }, [filteredProfessions, currentPage, pageSize]);

  // Apply GSAP Flip animation AFTER render with new filtered / paginated results
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
  }, [paginatedProfessions]);

  return (
    <div className="page-shell space-y-10 py-12 sm:py-16">
      <ScrollProgressBar />

      {/* Header Page - Removed catalogBadge text per user request */}
      <SectionReveal direction="up">
        <div className="page-intro">
          <KineticSplitText as="h1" className="page-title">
            {t("catalogTitle")}
          </KineticSplitText>
          <TextReveal as="p" delay={0.1} className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            {t("catalogSubtitle")}
          </TextReveal>
        </div>
      </SectionReveal>

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

      {/* Results Header with Limit Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-line)] pb-4 text-xs font-semibold text-[var(--color-muted)]">
        <div className="flex flex-wrap items-center gap-3">
          <span>
            {filteredProfessions.length > 0
              ? t("showingRange", {
                  start: (currentPage - 1) * pageSize + 1,
                  end: Math.min(currentPage * pageSize, filteredProfessions.length),
                  total: filteredProfessions.length,
                })
              : t("showing", { shown: 0, total: professions.length })}
          </span>
          {mbti !== "all" && (
            <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-700 font-bold dark:bg-purple-900/40 dark:text-purple-300">
              {t("activeMbti", { value: mbti })}
            </span>
          )}
        </div>

        {/* Limit Selector: 10, 20, 50 */}
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-muted)] font-medium">{t("itemsPerPage")}</span>
          <div className="inline-flex items-center rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-0.5 text-xs font-semibold">
            {[10, 20, 50].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handlePageSizeChange(size)}
                className={`min-h-8 min-w-8 rounded-md px-2.5 py-1 transition-colors ${
                  pageSize === size
                    ? "bg-teal-700 text-white font-bold shadow-xs"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
                aria-pressed={pageSize === size}
                aria-label={`${size} ${t("itemsPerPage")}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Professions Grid with GSAP Flip */}
      {paginatedProfessions.length > 0 ? (
        <>
          <div ref={gridRef} className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
            {paginatedProfessions.map((prof) => (
              <ProfessionCard key={prof.id} profession={prof} />
            ))}
          </div>

          {/* Pagination Navigation */}
          {totalPages > 1 && (
            <nav
              className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--color-line)]"
              aria-label={t("paginationNav")}
            >
              <p className="text-xs text-[var(--color-muted)] font-medium order-2 sm:order-1">
                {t("paginationPage", { current: currentPage, total: totalPages })}
              </p>

              <div className="flex items-center gap-1 sm:gap-1.5 order-1 sm:order-2">
                {/* Previous Page */}
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="inline-flex min-h-9 sm:min-h-10 items-center justify-center gap-1.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 sm:px-3 text-xs font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-soft)] disabled:pointer-events-none disabled:opacity-35"
                  aria-label={t("paginationPrev")}
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{t("paginationPrev")}</span>
                </button>

                {/* Mobile Numbered Page Buttons (Compact: max 4-5 items) */}
                <div className="flex sm:hidden items-center gap-1">
                  {getMobilePageNumbers(currentPage, totalPages).map((p, idx) => {
                    if (p === "...") {
                      return (
                        <span
                          key={`mobile-ellipsis-${idx}`}
                          className="grid h-9 w-6 place-items-center text-xs text-[var(--color-muted)] font-mono select-none"
                        >
                          ...
                        </span>
                      );
                    }

                    const pageNum = p as number;
                    const isCurrent = pageNum === currentPage;

                    return (
                      <button
                        key={`mobile-page-${pageNum}`}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`grid h-9 w-9 place-items-center rounded-xl text-xs font-bold transition-all ${
                          isCurrent
                            ? "bg-teal-700 text-white shadow-sm ring-1 ring-teal-500"
                            : "border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-soft)]"
                        }`}
                        aria-current={isCurrent ? "page" : undefined}
                        aria-label={`${t("paginationPageNumber")} ${pageNum}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Desktop Numbered Page Buttons with Full Ellipsis */}
                <div className="hidden sm:flex items-center gap-1.5">
                  {getDesktopPageNumbers(currentPage, totalPages).map((p, idx) => {
                    if (p === "...") {
                      return (
                        <span
                          key={`desktop-ellipsis-${idx}`}
                          className="grid h-10 w-7 place-items-center text-xs text-[var(--color-muted)] font-mono select-none"
                        >
                          ...
                        </span>
                      );
                    }

                    const pageNum = p as number;
                    const isCurrent = pageNum === currentPage;

                    return (
                      <button
                        key={`desktop-page-${pageNum}`}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`grid h-10 w-10 place-items-center rounded-xl text-xs font-bold transition-all ${
                          isCurrent
                            ? "bg-teal-700 text-white shadow-sm ring-1 ring-teal-500"
                            : "border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-soft)]"
                        }`}
                        aria-current={isCurrent ? "page" : undefined}
                        aria-label={`${t("paginationPageNumber")} ${pageNum}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next Page */}
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="inline-flex min-h-9 sm:min-h-10 items-center justify-center gap-1.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 sm:px-3 text-xs font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-soft)] disabled:pointer-events-none disabled:opacity-35"
                  aria-label={t("paginationNext")}
                >
                  <span className="hidden sm:inline">{t("paginationNext")}</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </nav>
          )}
        </>
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
