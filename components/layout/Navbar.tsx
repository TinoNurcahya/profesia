"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Brain, BriefcaseBusiness, ChevronDown, Compass, GraduationCap, Menu, Scale, Stars, User, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const focusableSelector = "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const drawerRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 15) {
        setIsVisible(true);
        setIsScrolled(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      setIsScrolled(true);

      if (isOpen) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY.current;

      if (Math.abs(diff) < 6) return;

      if (diff > 0 && currentScrollY > 70) {
        setIsVisible(false);
        setExploreOpen(false);
      } else if (diff < 0) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);
  const primaryLinks = [
    { href: `/${locale}`, label: t("home"), icon: Compass },
    { href: `/${locale}/professions`, label: t("professions"), icon: BriefcaseBusiness },
    { href: `/${locale}/mbti`, label: t("mbti"), icon: Brain },
  ];
  const exploreLinks = [
    { href: `/${locale}/majors`, label: t("majors"), icon: GraduationCap },
    { href: `/${locale}/riasec`, label: t("riasec"), icon: Compass },
    { href: `/${locale}/zodiac`, label: t("zodiac"), icon: Stars },
    { href: `/${locale}/professions/compare`, label: t("compare"), icon: Scale },
  ];
  const isActive = (href: string) => href === `/${locale}` ? pathname === href : pathname.startsWith(href);
  const closeMenus = () => { setIsOpen(false); setExploreOpen(false); };

  useEffect(() => {
    if (!isOpen) return;
    const drawer = drawerRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    drawer?.querySelector<HTMLElement>(focusableSelector)?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
      if (event.key !== "Tab" || !drawer) return;
      const items = Array.from(drawer.querySelectorAll<HTMLElement>(focusableSelector));
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, [isOpen]);

  useEffect(() => {
    if (!exploreOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !exploreRef.current?.contains(event.target)) setExploreOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setExploreOpen(false); exploreButtonRef.current?.focus(); }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape); };
  }, [exploreOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const resize = () => { setIsOpen(false); setExploreOpen(false); };
    desktop.addEventListener("change", resize);
    return () => desktop.removeEventListener("change", resize);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "border-[var(--color-line)]/60 bg-[var(--color-canvas)]/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          : "border-[var(--color-line)] bg-[var(--color-canvas)]"
      }`}
    >
      <div className="page-shell flex h-16 items-center justify-between gap-3 sm:gap-6">
        <Link href={`/${locale}`} onClick={closeMenus} className={`group flex min-h-11 shrink-0 items-center gap-2.5 transition-transform duration-300 ${isScrolled ? "scale-[0.94]" : "scale-100"}`} aria-label={`${t("brand")} — ${t("home")}`}>
          <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-teal-700 text-white transition-colors group-hover:bg-teal-800"><Compass aria-hidden="true" className="h-5 w-5" /></span>
          <span className="leading-none"><span className="block text-lg font-bold tracking-[-0.03em] text-[var(--color-ink)]">{t("brand")}</span><span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">{t("tagline")}</span></span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t("primaryNavigation")}>
          {primaryLinks.map((link) => <Link key={link.href} href={link.href} onClick={closeMenus} aria-current={isActive(link.href) ? "page" : undefined} className={`min-h-11 inline-flex items-center rounded-md px-3.5 py-2 text-sm font-semibold transition-colors ${isActive(link.href) ? "bg-[var(--color-brand)]/15 text-[var(--color-brand)]" : "text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"}`}>{link.label}</Link>)}
          <div ref={exploreRef} className="relative">
            <button ref={exploreButtonRef} type="button" onClick={() => setExploreOpen((value) => !value)} aria-expanded={exploreOpen} aria-controls="explore-navigation" className={`inline-flex items-center gap-1 min-h-11 inline-flex items-center rounded-md px-3.5 py-2 text-sm font-semibold transition-colors ${exploreLinks.some((link) => isActive(link.href)) ? "bg-[var(--color-brand)]/15 text-[var(--color-brand)]" : "text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"}`}>{t("explore")}<ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${exploreOpen ? "rotate-180" : ""}`} /></button>
            {exploreOpen && <div className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-2 shadow-[0_18px_50px_rgba(15,23,42,0.12)]" id="explore-navigation">{exploreLinks.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={closeMenus}  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-soft)] hover:text-[var(--color-brand)]"><Icon aria-hidden="true" className="h-4 w-4 text-[var(--color-brand)]" />{label}</Link>)}</div>}
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <Link href={`/${locale}/login`} className="btn-primary min-h-11">
            <User aria-hidden="true" className="h-4 w-4" />
            {t("login")}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-[10px] border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-soft)] transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={t("toggleMenu")}
          >
            {isOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mounted && isOpen && createPortal(
        <div
          className="fixed inset-0 z-[100] flex justify-end bg-black/75 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeMenus();
          }}
        >
          <div
            ref={drawerRef}
            id="mobile-navigation"
            data-lenis-prevent
            data-native-scroll
            role="dialog"
            aria-modal="true"
            aria-label={t("mobileNavigation")}
            className="relative flex h-full w-[88vw] max-w-[340px] flex-col justify-between border-l border-[var(--color-line)] bg-[var(--color-canvas)] p-5 shadow-2xl overflow-y-auto"
          >
            <div>
              {/* Header inside Mobile Drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--color-line)]/50">
                <Link
                  href={`/${locale}`}
                  onClick={closeMenus}
                  className="flex items-center gap-2.5"
                  aria-label={`${t("brand")} — ${t("home")}`}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-teal-700 text-white">
                    <Compass aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="leading-none">
                    <span className="block text-base font-bold tracking-tight text-[var(--color-ink)]">
                      {t("brand")}
                    </span>
                    <span className="mt-1 block text-[9px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">
                      {t("tagline")}
                    </span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={closeMenus}
                  className="grid h-9 w-9 place-items-center rounded-[10px] border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-soft)] transition-colors"
                  aria-label={t("closeMenu")}
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>

              {/* Primary Navigation Section */}
              <div className="pt-5 pb-3">
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  {t("primaryNavigation")}
                </p>
                <nav className="mt-2 grid gap-1" aria-label={t("primaryNavigation")}>
                  {primaryLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenus}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-12 items-center gap-3 rounded-xl px-3.5 text-sm font-semibold transition-colors ${
                          active
                            ? "bg-teal-700 text-white shadow-sm"
                            : "text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
                        }`}
                      >
                        <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Explore Section */}
              <div className="pt-3 pb-3 border-t border-[var(--color-line)]/50">
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  {t("explore")}
                </p>
                <nav className="mt-2 grid gap-1" aria-label={t("explore")}>
                  {exploreLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenus}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-12 items-center gap-3 rounded-xl px-3.5 text-sm font-semibold transition-colors ${
                          active
                            ? "bg-teal-700 text-white shadow-sm"
                            : "text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
                        }`}
                      >
                        <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="mt-6 pt-4 border-t border-[var(--color-line)]/50 space-y-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
              <LanguageSwitcher fullWidth />
              <Link
                href={`/${locale}/login`}
                onClick={closeMenus}
                className="btn-primary min-h-12 w-full flex items-center justify-center gap-2 rounded-xl text-sm font-semibold"
              >
                <User aria-hidden="true" className="h-4 w-4" />
                <span>{t("login")}</span>
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
