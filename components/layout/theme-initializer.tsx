"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// ThemeInitializer re-applies the theme and brand on client-side route transitions (locale changes).
export default function ThemeInitializer() {
  const pathname = usePathname();

  // Re-apply theme class and brand attribute on client-side navigation (e.g., language changes)
  // which replaces the server-rendered HTML template.
  useEffect(() => {
    try {
      const savedTheme =
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const root = document.documentElement;

      if (savedTheme === "dark") {
        root.classList.add("dark");
      } else if (savedTheme === "light") {
        root.classList.remove("dark");
      } else {
        // System preference
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        if (systemTheme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }

      // Re-apply theme preference attribute
      const savedThemePref = localStorage.getItem("theme") || "system";
      root.setAttribute("data-theme-preference", savedThemePref);

      // Re-apply brand attribute
      const savedBrand = localStorage.getItem("brand") || "ecare";
      root.setAttribute("data-brand", savedBrand);
    } catch {}
  }, [pathname]);

  return null;
}
