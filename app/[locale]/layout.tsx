import type { Metadata } from "next";
import { Hind_Siliguri, Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import ThemeInitializer from "@/components/layout/theme-initializer";
import ThemeScript from "@/components/layout/theme-script";
import OfferPopup from "@/components/layout/offer-popup";
import "../globals.css";

export const dynamic = "force-dynamic";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ecare - Developer Agency",
  description: "Production Multilingual Developer Agency Website",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate the incoming locale
  const locales = ["en", "bn"];
  if (!locales.includes(locale)) {
    notFound();
  }

  // Load locale messages
  const messages = await getMessages({ locale });

  // Read theme cookie on server to render correct theme attributes immediately
  const cookieStore = await cookies();
  const initialTheme = (cookieStore.get("theme")?.value as "light" | "dark" | "system") || "system";

  // Determine dynamic font variables
  const fontVariables = `${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable}`;
  const fontStyles = {
    "--font-family-sans": locale === "bn" ? "var(--font-hind-siliguri)" : "var(--font-geist-sans)",
  } as React.CSSProperties;

  return (
    <html
      lang={locale}
      className={`${fontVariables} h-full antialiased ${initialTheme === "dark" ? "dark" : ""}`}
      style={fontStyles}
      data-brand="ecare"
      data-theme-preference={initialTheme}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-full bg-background text-foreground flex flex-col" suppressHydrationWarning>
        <ThemeScript />
        <ThemeInitializer />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <OfferPopup />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
