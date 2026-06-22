"use client";

import { useServerInsertedHTML } from "next/navigation";

export default function ThemeScript() {
  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const savedTheme = localStorage.getItem('theme') || 'system';
                const isDark = savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                document.documentElement.setAttribute('data-theme-preference', savedTheme);
                const savedBrand = localStorage.getItem('brand') || 'ecare';
                document.documentElement.setAttribute('data-brand', savedBrand);
              } catch (_) {}
            })();
          `
        }}
      />
    );
  });

  return null;
}
