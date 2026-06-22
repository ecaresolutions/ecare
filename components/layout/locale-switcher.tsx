"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

// LocaleSwitcher enables toggling between English (en) and Bengali (bn) routes.
// A client component is required here for handling the user interaction event.
export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (nextLocale: string) => {
    startTransition(() => {
      // Strip any existing locale prefixes from pathname to avoid nesting duplication
      let cleanPathname = pathname;
      
      // Remove starting /bn/ or /en/ or duplicates like /bn/bn/
      cleanPathname = cleanPathname.replace(/^\/(bn|en)+/g, "");
      
      // Ensure it starts with a single slash
      if (!cleanPathname.startsWith("/")) {
        cleanPathname = "/" + cleanPathname;
      }
      
      router.replace(cleanPathname, { locale: nextLocale });
    });
  };

  return (
    <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/60 rounded-lg border border-zinc-200/60 dark:border-zinc-700/40">
      <button
        onClick={() => handleLocaleChange("en")}
        disabled={isPending || locale === "en"}
        aria-label="Switch to English"
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${
          locale === "en"
            ? "bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 shadow-sm"
            : "text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleLocaleChange("bn")}
        disabled={isPending || locale === "bn"}
        aria-label="Switch to Bengali"
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${
          locale === "bn"
            ? "bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 shadow-sm"
            : "text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer"
        }`}
      >
        বাংলা
      </button>
    </div>
  );
}
