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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center transition-colors duration-200 group-hover:bg-blue-700">
              <div className="w-full h-full rounded-lg flex items-center justify-center">
                <Compass aria-hidden="true" className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-slate-900">
                {t("brand")}
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase -mt-1">
              {t("tagline")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href={`/${locale}/login`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
            >
              <User className="w-4 h-4" />
              {t("login")}
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={t("toggleMenu")}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
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
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-5 h-5 text-indigo-500" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <Link
              href={`/${locale}/login`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
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
