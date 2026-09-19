"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(() => callback());
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  window.addEventListener("storage", callback);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export default function ThemeSwitcher() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const t = useTranslations("Navbar");

  const toggleTheme = () => {
    const nextDark = !isDark;

    if (nextDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      try {
        localStorage.setItem("theme", "dark");
      } catch {
        // Handled in restricted browser modes
      }
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch {
        // Handled in restricted browser modes
      }
    }
  };

  const label = isDark ? t("switchToLight") : t("switchToDark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border border-[var(--color-line)] bg-[var(--color-soft)] p-1.5 transition-all hover:border-[var(--color-brand)] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-[var(--color-brand)] focus-visible:outline-offset-2"
      aria-label={label}
      title={label}
    >
      <div className="relative h-7 w-7 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
        {isDark ? (
          <Image
            src="/images/theme/moon.jpg"
            alt="Nano Banana Moon (Mode Gelap)"
            width={28}
            height={28}
            className="h-full w-full object-cover transition-opacity duration-300"
            priority
          />
        ) : (
          <Image
            src="/images/theme/sun.jpg"
            alt="Nano Banana Sun (Mode Terang)"
            width={28}
            height={28}
            className="h-full w-full object-cover transition-opacity duration-300"
            priority
          />
        )}
      </div>
    </button>
  );
}
