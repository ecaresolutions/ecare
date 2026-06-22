"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

// ThemeToggle allows switching between light, dark, and system theme preferences.
// A client component is required for event handlers and direct DOM manipulation.
export default function ThemeToggle({
  initialTheme = "system",
}: {
  initialTheme?: "light" | "dark" | "system";
}) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(initialTheme);

  // Sync state with localStorage if it differs (client side fallback)
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
      if (savedTheme && savedTheme !== initialTheme) {
        setTheme(savedTheme);
      }
    } catch (e) {}
  }, [initialTheme]);

  // Listen to OS system theme adjustments when 'system' is selected
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      const root = document.documentElement;
      if (mediaQuery.matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme]);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    const root = document.documentElement;

    // Set cookie for server side sync
    try {
      document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    } catch (e) {}

    // Determine the target class state (dark or light)
    let isDarkTarget = false;
    if (newTheme === "system") {
      isDarkTarget = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else {
      isDarkTarget = newTheme === "dark";
    }

    const currentIsDark = root.classList.contains("dark");
    if (currentIsDark === isDarkTarget) {
      // No change in class state, just update theme preference
      setTheme(newTheme);
      try {
        localStorage.setItem("theme", newTheme);
      } catch (e) {}
      return;
    }

    // Cast document to access startViewTransition safely in TypeScript
    const doc = document as unknown as {
      startViewTransition?: (callback: () => void) => {
        ready: Promise<void>;
      };
    };

    const updateThemeState = () => {
      setTheme(newTheme);
      try {
        localStorage.setItem("theme", newTheme);
      } catch (e) {}
      root.setAttribute("data-theme-preference", newTheme);
      if (isDarkTarget) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    if (!doc.startViewTransition) {
      updateThemeState();
      return;
    }

    // Coordinates for the animation originating from the bottom-right corner
    const x = window.innerWidth;
    const y = window.innerHeight;
    const endRadius = Math.hypot(x, y);

    const transition = doc.startViewTransition(updateThemeState);

    transition.ready.then(() => {
      const isEnteringDark = isDarkTarget;

      const keyframes = isEnteringDark
        ? {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
          }
        : {
            clipPath: [`circle(${endRadius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`],
          };

      const pseudoElement = isEnteringDark
        ? "::view-transition-new(root)"
        : "::view-transition-old(root)";

      root.animate(keyframes, {
        duration: 500,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        pseudoElement,
        fill: "both",
      });
    });
  };

  return (
    <div suppressHydrationWarning className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/60 rounded-lg border border-zinc-200/60 dark:border-zinc-700/40">
      <button
        onClick={() => handleThemeChange("light")}
        aria-label="Light theme"
        className={`p-1 rounded-md transition-all duration-200 cursor-pointer ${
          theme === "light"
            ? "bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 shadow-sm"
            : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
        }`}
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleThemeChange("dark")}
        aria-label="Dark theme"
        className={`p-1 rounded-md transition-all duration-200 cursor-pointer ${
          theme === "dark"
            ? "bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 shadow-sm"
            : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
        }`}
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleThemeChange("system")}
        aria-label="System theme"
        className={`p-1 rounded-md transition-all duration-200 cursor-pointer ${
          theme === "system"
            ? "bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 shadow-sm"
            : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
        }`}
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  );
}
