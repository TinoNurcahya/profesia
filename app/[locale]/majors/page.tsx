"use client";

import { useState, useMemo, use, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import majorsSeed from "@/data/majors.json";
import type { Major } from "@/services/majorService";
import { filterMajors } from "@/services/majorFilter";
import { Search, SearchX, X, ChevronLeft, ChevronRight } from "lucide-react";
import KineticSplitText from "@/components/motion/KineticSplitText";
import TextReveal from "@/components/motion/TextReveal";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";
import MajorCard from "@/components/major/MajorCard";
import { getMbtiBadgeStyle, getMbtiRoleName } from "@/lib/mbti";

const ITEMS_PER_PAGE = 12;

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

export default function MajorsPage({
  searchParams,
}: {
  searchParams: Promise<{
    mbti?: string;
    category?: string;
    search?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const locale = useLocale();
  const isId = locale === "id";
  const t = useTranslations("Majors");
  const pathname = usePathname();
  const router = useRouter();
  const initialParams = use(searchParams);

  const [search, setSearch] = useState(initialParams.search || "");
  const [category, setCategory] = useState(initialParams.category || "all");
  const [mbti, setMbti] = useState(initialParams.mbti || "all");
  const [sort, setSort] = useState(initialParams.sort || "default");
  const [currentPage, setCurrentPage] = useState<number>(
    Math.max(1, Number(initialParams.page) || 1)
  );

  const gridRef = useRef<HTMLDivElement>(null);

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "all" ||
    mbti !== "all" ||
    sort !== "default";

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setMbti("all");
    setSort("default");
    setCurrentPage(1);
  };

  // Filtered dataset
  const filteredMajors = useMemo(() => {
    return filterMajors(majorsSeed as Major[], {
      search,
      category,
      mbti,
      sort,
    });
  }, [search, category, mbti, sort]);

  // Total pages and valid current page
  const totalPages = Math.max(1, Math.ceil(filteredMajors.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  // Paginated slice
  const paginatedMajors = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredMajors.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMajors, safePage]);

  // Synchronize state when initialParams updates (e.g., browser back/forward or deep linking)
  useEffect(() => {
    const searchFromUrl = initialParams.search || "";
    if (searchFromUrl !== search) setSearch(searchFromUrl);

    const categoryFromUrl = initialParams.category || "all";
    if (categoryFromUrl !== category) setCategory(categoryFromUrl);

    const mbtiFromUrl = initialParams.mbti || "all";
    if (mbtiFromUrl !== mbti) setMbti(mbtiFromUrl);

    const sortFromUrl = initialParams.sort || "default";
    if (sortFromUrl !== sort) setSort(sortFromUrl);

    const pageFromUrl = initialParams.page ? Math.max(1, parseInt(initialParams.page, 10) || 1) : 1;
    if (pageFromUrl !== currentPage) setCurrentPage(pageFromUrl);
  }, [initialParams]);

  // Sync state to URL search parameters with debouncing
  useEffect(() => {
    const params = new URLSearchParams();
    const values: Record<string, string> = {
      search: search.trim(),
      category,
      mbti,
      sort,
      page: safePage > 1 ? String(safePage) : "",
    };

    Object.entries(values).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "default") {
        params.set(key, value);
      }
    });

    const query = params.toString();
    const timer = window.setTimeout(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, 200);

    return () => window.clearTimeout(timer);
  }, [category, mbti, pathname, router, search, sort, safePage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const cardLabels = {
    duration: t("duration"),
    detail: t("detail"),
    prospectLabel: t("prospectLabel"),
    matchedMbti: t("matchedMbti"),
  };

  const startIndex = filteredMajors.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(safePage * ITEMS_PER_PAGE, filteredMajors.length);

  return (
    <div className="page-shell space-y-10 py-12 sm:py-16">
      <ScrollProgressBar />

      {/* Header Page */}
      <div className="page-intro">
        <KineticSplitText as="h1" className="page-title">
          {t("catalogTitle")}
        </KineticSplitText>
        <TextReveal
          as="p"
          delay={0.1}
          className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
        >
          {t("catalogSubtitle")}
        </TextReveal>
      </div>

      {/* Filter Bar with Search, Category, MBTI, Sorting & Reset */}
      <div className="surface space-y-4 p-4 sm:p-6 shadow-sm border border-[var(--color-line)] bg-[var(--color-surface)]/85 backdrop-blur-md rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[var(--color-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={t("searchPlaceholder")}
              className="field-control pl-10 pr-8 text-xs bg-[var(--color-soft)]/50 border-[var(--color-line)] text-[var(--color-ink)]"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-3 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                aria-label="Hapus kata kunci"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="field-control text-xs bg-[var(--color-soft)]/50 border-[var(--color-line)] text-[var(--color-ink)]"
            aria-label="Filter Kelompok Rumpun"
          >
            <option value="all">{t("allCategories")}</option>
            <option value="saintek">{t("saintek")}</option>
            <option value="soshum">{t("soshum")}</option>
            <option value="seni">{t("seni")}</option>
          </select>

          {/* MBTI Filter */}
          <select
            value={mbti}
            onChange={(e) => {
              setMbti(e.target.value);
              setCurrentPage(1);
            }}
            className="field-control text-xs bg-[var(--color-soft)]/50 border-[var(--color-line)] text-[var(--color-ink)]"
            aria-label="Filter Tipe MBTI"
          >
            <option value="all">{t("allMbti")}</option>
            <optgroup label={isId ? "Analis (Analysts)" : "Analysts"}>
              {["INTJ", "INTP", "ENTJ", "ENTP"].map((code) => (
                <option key={code} value={code}>
                  {code} - {isId ? "Analis" : "Analyst"}
                </option>
              ))}
            </optgroup>
            <optgroup label={isId ? "Diplomat (Diplomats)" : "Diplomats"}>
              {["INFJ", "INFP", "ENFJ", "ENFP"].map((code) => (
                <option key={code} value={code}>
                  {code} - Diplomat
                </option>
              ))}
            </optgroup>
            <optgroup label={isId ? "Sentinel (Sentinels)" : "Sentinels"}>
              {["ISTJ", "ISFJ", "ESTJ", "ESFJ"].map((code) => (
                <option key={code} value={code}>
                  {code} - Sentinel
                </option>
              ))}
            </optgroup>
            <optgroup label={isId ? "Penjelajah (Explorers)" : "Explorers"}>
              {["ISTP", "ISFP", "ESTP", "ESFP"].map((code) => (
                <option key={code} value={code}>
                  {code} - {isId ? "Penjelajah" : "Explorer"}
                </option>
              ))}
            </optgroup>
          </select>

          {/* Sorting Dropdown */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
              className="field-control text-xs bg-[var(--color-soft)]/50 border-[var(--color-line)] text-[var(--color-ink)]"
              aria-label="Urutkan"
            >
              <option value="default">{t("sortDefault")}</option>
              <option value="name_asc">{t("sortNameAsc")}</option>
              <option value="prospect_desc">{t("sortProspectDesc")}</option>
              <option value="duration_asc">{t("sortDurationAsc")}</option>
            </select>
          </div>
        </div>

        {/* Active Filters Clear Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2.5 border-t border-[var(--color-line)]/50 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[var(--color-muted)] font-medium">
                {isId ? "Filter aktif:" : "Active filters:"}
              </span>
              {search && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[var(--color-soft)] text-[var(--color-ink)] border border-[var(--color-line)]">
                  &ldquo;{search}&rdquo;
                </span>
              )}
              {category !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/25 capitalize font-semibold">
                  {category}
                </span>
              )}
              {mbti !== "all" && (
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-mono font-bold border ${getMbtiBadgeStyle(
                    mbti
                  )}`}
                >
                  MBTI: {mbti} ({getMbtiRoleName(mbti, locale)})
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 font-bold text-teal-400 hover:text-teal-300 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t("resetFilter")}</span>
            </button>
          </div>
        )}
      </div>

      {/* Catalog Status Bar: Results Count */}
      <div ref={gridRef} className="flex items-center justify-between text-xs text-[var(--color-muted)] px-1">
        <span>
          {t("showingCount", {
            start: startIndex,
            end: endIndex,
            total: filteredMajors.length,
          })}
        </span>
      </div>

      {/* Majors Grid */}
      {paginatedMajors.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-opacity duration-300">
            {paginatedMajors.map((major) => (
              <MajorCard
                key={major.id}
                major={major}
                locale={locale}
                labels={cardLabels}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <nav
              aria-label="Paginasi Jurusan"
              className="flex flex-col items-center justify-between gap-4 border-t border-[var(--color-line)] pt-8 sm:flex-row"
            >
              <div className="text-xs text-[var(--color-muted)] font-medium">
                {t("showingCount", {
                  start: startIndex,
                  end: endIndex,
                  total: filteredMajors.length,
                })}
              </div>

              <div className="flex items-center gap-1.5">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={() => handlePageChange(safePage - 1)}
                  disabled={safePage <= 1}
                  className="inline-flex min-h-9 sm:min-h-10 items-center justify-center gap-1.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 sm:px-3 text-xs font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-soft)] disabled:pointer-events-none disabled:opacity-35"
                  aria-label={t("paginationPrev")}
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{t("paginationPrev")}</span>
                </button>

                {/* Desktop Page Numbers */}
                <div className="hidden sm:flex items-center gap-1">
                  {getDesktopPageNumbers(safePage, totalPages).map((p, idx) => {
                    if (p === "...") {
                      return (
                        <span
                          key={`desktop-ellipsis-${idx}`}
                          className="grid h-10 w-8 place-items-center text-xs font-medium text-[var(--color-muted)]"
                        >
                          ...
                        </span>
                      );
                    }

                    const pageNum = p as number;
                    const isCurrent = pageNum === safePage;

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

                {/* Mobile Page Numbers */}
                <div className="flex sm:hidden items-center gap-1">
                  {getMobilePageNumbers(safePage, totalPages).map((p, idx) => {
                    if (p === "...") {
                      return (
                        <span
                          key={`mobile-ellipsis-${idx}`}
                          className="grid h-9 w-6 place-items-center text-xs font-medium text-[var(--color-muted)]"
                        >
                          ...
                        </span>
                      );
                    }

                    const pageNum = p as number;
                    const isCurrent = pageNum === safePage;

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

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() => handlePageChange(safePage + 1)}
                  disabled={safePage >= totalPages}
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
        /* Empty State */
        <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)]/80 p-8 sm:p-12 text-center space-y-4 max-w-md mx-auto my-12 shadow-sm">
          <div className="w-12 h-12 mx-auto rounded-full bg-[var(--color-soft)] flex items-center justify-center text-[var(--color-muted)]">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            {t("notFound")}
          </h3>
          <p className="text-xs text-[var(--color-muted)] leading-relaxed">
            {t("notFoundDescription")}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-700 text-white hover:bg-teal-600 transition-colors shadow-sm"
          >
            {t("resetFilter")}
          </button>
        </div>
      )}
    </div>
  );
}
