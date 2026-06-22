import { notFound } from "next/navigation";

// Catch-all route for locale-specific paths to trigger localized not-found.tsx page
export default function CatchAll() {
  notFound();
}
