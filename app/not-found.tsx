"use client";

import "./globals.css";

// Global fallback 404 page for root-level routing errors
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">404 - Page Not Found</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">The page you are looking for does not exist.</p>
          <a href="/" className="inline-flex items-center justify-center px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-medium rounded-md hover:opacity-90 transition-opacity">
            Go Home
          </a>
        </div>
      </body>
    </html>
  );
}
