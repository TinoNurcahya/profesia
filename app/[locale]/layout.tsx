import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-right" richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
