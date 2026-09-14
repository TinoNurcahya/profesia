"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Compass, Menu, X, Sparkles, User, Briefcase, Brain, Stars, GraduationCap } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  const navLinks = [
    { href: `/${locale}`, label: t("home"), icon: Compass },
    { href: `/${locale}/professions`, label: t("professions"), icon: Briefcase },
    { href: `/${locale}/majors`, label: t("majors"), icon: GraduationCap },
    { href: `/${locale}/mbti`, label: t("mbti"), icon: Brain },
    { href: `/${locale}/riasec/test`, label: t("riasec"), icon: Compass },
    { href: `/${locale}/zodiac`, label: t("zodiac"), icon: Stars },
    { href: `/${locale}/professions/compare`, label: t("compare"), icon: Sparkles },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-teal-700 flex items-center justify-center transition-colors duration-200 group-hover:bg-teal-800">
              <div className="w-full h-full rounded-lg flex items-center justify-center">
                <Compass aria-hidden="true" className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-slate-900">
                {t("brand")}
              </span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase -mt-1">
              {t("tagline")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 xl:px-4 py-2.5 rounded-full text-[13px] xl:text-sm font-bold tracking-wide transition-all duration-300 ${
                    active
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href={`/${locale}/login`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-sm hover:shadow transition-all duration-300"
            >
              <User className="w-4 h-4" />
              {t("login")}
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label={t("toggleMenu")}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-4 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  active
                    ? "bg-teal-50 text-teal-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-5 h-5 text-teal-600" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-200">
            <Link
              href={`/${locale}/login`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-base font-bold bg-teal-700 hover:bg-teal-800 text-white transition-all duration-300"
            >
              <User className="w-5 h-5" />
              {t("login")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
