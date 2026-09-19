import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";
import "lenis/dist/lenis.css";
import "./globals.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    metadataBase: new URL(baseUrl),
    title: isEnglish ? "Profesia - Career Discovery Platform" : "Profesia - Platform Eksplorasi Karier",
    description: isEnglish ? "Explore careers through your interests, personality, and skills." : "Jelajahi pilihan karier melalui minat, kepribadian, dan kemampuanmu.",
    alternates: { canonical: `/${locale}`, languages: { id: "/id", en: "/en" } },
    openGraph: { type: "website", siteName: "Profesia", locale: isEnglish ? "en_US" : "id_ID", url: `/${locale}`, title: isEnglish ? "Profesia - Career Discovery Platform" : "Profesia - Platform Eksplorasi Karier", description: isEnglish ? "Explore careers through your interests, personality, and skills." : "Jelajahi pilihan karier melalui minat, kepribadian, dan kemampuanmu." },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },
    twitter: { card: "summary", title: isEnglish ? "Profesia - Career Discovery Platform" : "Profesia - Platform Eksplorasi Karier", description: isEnglish ? "Explore careers through your interests, personality, and skills." : "Jelajahi pilihan karier melalui minat, kepribadian, dan kemampuanmu." },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Common" });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else if (stored === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <a className="skip-link" href="#main-content">{t("skipToContent")}</a>
            <Navbar />
            <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 w-full max-w-full">{children}</main>
            <Footer />
            <Toaster position="top-right" richColors />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
