"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Brain, BriefcaseBusiness, ChevronDown, Compass, GraduationCap, Menu, Scale, Stars, User, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

const focusableSelector = "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])";

export default function Navbar() {
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
          {primaryLinks.map((link) => <Link key={link.href} href={link.href} onClick={closeMenus} aria-current={isActive(link.href) ? "page" : undefined} className={`min-h-11 inline-flex items-center rounded-md px-3.5 py-2 text-sm font-semibold transition-colors ${isActive(link.href) ? "bg-teal-50 text-teal-800" : "text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"}`}>{link.label}</Link>)}
          <div ref={exploreRef} className="relative">
            <button ref={exploreButtonRef} type="button" onClick={() => setExploreOpen((value) => !value)} aria-expanded={exploreOpen} aria-controls="explore-navigation" className={`inline-flex items-center gap-1 min-h-11 inline-flex items-center rounded-md px-3.5 py-2 text-sm font-semibold transition-colors ${exploreLinks.some((link) => isActive(link.href)) ? "bg-teal-50 text-teal-800" : "text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"}`}>{t("explore")}<ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${exploreOpen ? "rotate-180" : ""}`} /></button>
            {exploreOpen && <div className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-2 shadow-[0_18px_50px_rgba(15,23,42,0.12)]" id="explore-navigation">{exploreLinks.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={closeMenus}  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-soft)] hover:text-teal-800"><Icon aria-hidden="true" className="h-4 w-4 text-teal-700" />{label}</Link>)}</div>}
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Link href={`/${locale}/login`} className="btn-primary min-h-11">
            <User aria-hidden="true" className="h-4 w-4" />
            {t("login")}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <button type="button" onClick={() => setIsOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-[10px] border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)]" aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={t("toggleMenu")}>
            {isOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 top-16 bg-slate-950/30 lg:hidden" onMouseDown={(event) => { if (event.target === event.currentTarget) closeMenus(); }}>
          <div ref={drawerRef} id="mobile-navigation" data-native-scroll className="ml-auto flex h-full w-full max-w-sm flex-col gap-4 overflow-y-auto border-l border-[var(--color-line)] bg-[var(--color-canvas)] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]" role="dialog" aria-modal="true" aria-label={t("mobileNavigation")}>
            <button type="button" onClick={closeMenus} className="atlas-text-link self-end" aria-label={t("closeMenu")}>
              <X aria-hidden="true" className="h-5 w-5" />
              {t("closeMenu")}
            </button>
            <nav className="grid gap-1" aria-label={t("mobileNavigation")}>
              {[...primaryLinks, ...exploreLinks].map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href} onClick={closeMenus} aria-current={isActive(link.href) ? "page" : undefined} className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-base font-semibold ${isActive(link.href) ? "bg-teal-700 text-white" : "text-[var(--color-ink)] hover:bg-[var(--color-surface)]"}`}>
                    <Icon aria-hidden="true" className="h-5 w-5" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <Link href={`/${locale}/login`} onClick={closeMenus} className="btn-primary mt-auto min-h-12">
              <User aria-hidden="true" className="h-5 w-5" />
              {t("login")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
