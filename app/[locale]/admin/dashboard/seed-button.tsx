"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database, Loader2, Check } from "lucide-react";

export default function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSeed = async () => {
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/admin/seed", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Seeding failed");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      window.location.reload(); // Reload to fetch fresh stats
    } catch (err: any) {
      setError(err.message || "Failed to initialize database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-400 rounded-2xl text-xs font-semibold flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" /> Database populated successfully! Page is reloading.
        </div>
      )}
      <Button
        onClick={handleSeed}
        disabled={loading}
        className="bg-[#e8000e] hover:bg-[#e8000e]/90 text-white font-bold inline-flex items-center gap-2 px-5 py-2.5 rounded-xl shadow-md transition-all duration-300 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Initializing...
          </>
        ) : (
          <>
            <Database className="w-4 h-4" />
            Populate Seed Data
          </>
        )}
      </Button>
    </div>
  );
}
