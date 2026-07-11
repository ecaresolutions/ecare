import type { Metadata } from "next";
import { Hind_Siliguri, Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import ThemeInitializer from "@/components/layout/theme-initializer";
import ThemeScript from "@/components/layout/theme-script";
import OfferPopup from "@/components/layout/offer-popup";
import BizBotChat from "@/components/layout/bizbot-chat";
import { getPageContent } from "@/lib/content";
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

  // Load Google Tag Manager configurations dynamically from admin settings
  let gtmId = "";
  let isGtmEnabled = false;
  try {
    const rawGtm = await getPageContent("gtm_settings", "en");
    if (rawGtm) {
      const gtmConfig = JSON.parse(rawGtm);
      gtmId = gtmConfig.containerId || "";
      isGtmEnabled = gtmConfig.isEnabled === "true";
    }
  } catch (e) {
    console.error("Failed to parse dynamic GTM settings:", e);
  }

  // Load Microsoft Clarity configurations dynamically from admin settings
  let clarityProjectId = "";
  let isClarityEnabled = false;
  try {
    const rawClarity = await getPageContent("clarity_settings", "en");
    if (rawClarity) {
      const clarityConfig = JSON.parse(rawClarity);
      clarityProjectId = clarityConfig.projectId || "";
      isClarityEnabled = clarityConfig.isEnabled === "true";
    }
  } catch (e) {
    console.error("Failed to parse dynamic Clarity settings:", e);
  }

  return (
    <html
      lang={locale}
      className={`${fontVariables} h-full antialiased ${initialTheme === "dark" ? "dark" : ""}`}
      style={fontStyles}
      data-brand="ecare"
      data-theme-preference={initialTheme}
      suppressHydrationWarning
    >
      <head>
        {isGtmEnabled && gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
        {isClarityEnabled && clarityProjectId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","${clarityProjectId}");`,
            }}
          />
        )}
      </head>
      <body className="min-h-full bg-background text-foreground flex flex-col" suppressHydrationWarning>
        {isGtmEnabled && gtmId && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}
        <ThemeScript />
        <ThemeInitializer />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <OfferPopup />
          <BizBotChat />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
