"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Compass, Heart, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("Footer");

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-700 p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-teal-300" />
                </div>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">{t("brand")}</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t("tagline")}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" aria-label={t("github")}>
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" aria-label={t("twitter")}>
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" aria-label={t("linkedin")}>
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={`/${locale}/professions`} className="hover:text-teal-400 transition-colors">
                  {t("professionCatalog")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/mbti`} className="hover:text-teal-400 transition-colors">
                  {t("mbtiTest")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/zodiac`} className="hover:text-teal-400 transition-colors">
                  {t("zodiacExploration")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/professions/compare`} className="hover:text-teal-400 transition-colors">
                  {t("professionComparison")}
                </Link>
              </li>
            </ul>
          </div>

          {/* 16P Role Groups Legend Col */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">{t("personalityGroups")}</h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <span className="text-slate-300 font-medium">{t("analysts")}</span> INTJ, INTP, ENTJ, ENTP
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-300 font-medium">{t("diplomats")}</span> INFJ, INFP, ENFJ, ENFP
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                <span className="text-slate-300 font-medium">{t("sentinels")}</span> ISTJ, ISFJ, ESTJ, ESFJ
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="text-slate-300 font-medium">{t("explorers")}</span> ISTP, ISFP, ESTP, ESFP
              </li>
            </ul>
          </div>

          {/* Legal Col */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">{t("legal")}</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">{t("privacy")}</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">{t("terms")}</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">{t("methodology")}</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 mt-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t("copyright")} {t("rights")}</p>
          <p className="flex items-center gap-1">
            {t("builtFor")} <Heart aria-hidden="true" className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {t("audience")}
          </p>
        </div>
      </div>
    </footer>
  );
}
