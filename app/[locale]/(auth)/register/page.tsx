"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  Compass,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  AtSign,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { signUp } from "@/services/auth";
import TextReveal from "@/components/motion/TextReveal";

export default function RegisterPage() {
  const t = useTranslations("Auth");
  const locale = useLocale();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(t("passwordMismatch"));
      return;
    }

    setLoading(true);
    const result = await signUp(email, password, name, username);

    if (!result.success) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="w-full text-center">
        <div className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-2xl p-10 shadow-sm">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-[var(--color-ink)] mb-2">{t("registerSuccess")}</h2>
          <Link
            href={`/${locale}/login`}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            {t("loginLink")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Brand Header */}
      <div className="mb-8 text-left">
        <Link href={`/${locale}`} className="group mb-8 inline-flex items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-700 p-0.5 group-hover:bg-teal-800 transition-colors duration-200">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Compass className="w-6 h-6 text-teal-300" />
            </div>
          </div>
          <span className="font-bold text-2xl text-[var(--color-ink)] tracking-tight">{t("brand")}</span>
        </Link>
        <TextReveal as="h1" className="text-4xl font-bold tracking-[-0.04em] text-[var(--color-ink)]">{t("registerTitle")}</TextReveal>
        <TextReveal as="p" delay={0.1} className="mt-2 text-base text-[var(--color-muted)]">{t("registerSubtitle")}</TextReveal>
      </div>

      {/* Register Card */}
      <div className="border-t-2 border-teal-700 bg-[var(--color-surface)] py-8 sm:px-8">
        <form onSubmit={handleSubmit} className="space-y-4" id="register-form">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="register-name" className="block text-sm font-medium text-[var(--color-ink)]">
              {t("nameLabel")}
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none" />
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                required
                autoComplete="name"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all duration-200 shadow-sm"
              />
            </div>
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <label htmlFor="register-username" className="block text-sm font-medium text-[var(--color-ink)]">
              {t("usernameLabel")}
            </label>
            <div className="relative">
              <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none" />
              <input
                id="register-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                placeholder={t("usernamePlaceholder")}
                required
                autoComplete="username"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all duration-200 shadow-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="register-email" className="block text-sm font-medium text-[var(--color-ink)]">
              {t("emailLabel")}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none" />
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                required
                autoComplete="email"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all duration-200 shadow-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="register-password" className="block text-sm font-medium text-[var(--color-ink)]">
              {t("passwordLabel")}
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none" />
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("passwordPlaceholder")}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all duration-200 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? t("hidePassword") : t("showPassword")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-muted)] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label htmlFor="register-confirm-password" className="block text-sm font-medium text-[var(--color-ink)]">
              {t("confirmPassword")}
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none" />
              <input
                id="register-confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t("confirmPasswordPlaceholder")}
                required
                autoComplete="new-password"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-surface)] border text-[var(--color-ink)] placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm ${
                  confirmPassword && confirmPassword !== password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-[var(--color-line)] focus:border-teal-600 focus:ring-teal-600/20"
                }`}
              />
            </div>
            {confirmPassword && confirmPassword !== password && (
              <p className="text-xs text-red-500 mt-1">{t("passwordMismatch")}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            id="register-submit-btn"
            type="submit"
            disabled={loading || (!!confirmPassword && confirmPassword !== password)}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm text-white bg-teal-700 hover:bg-teal-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("registerLoading")}
              </>
            ) : (
              <>
                {t("registerButton")}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[var(--color-muted)]">
            {t("hasAccount")}{" "}
            <Link
              href={`/${locale}/login`}
              className="text-teal-700 hover:text-teal-800 font-bold transition-colors"
            >
              {t("loginLink")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
