"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, User, Lock, Sparkles } from "lucide-react";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl">
      <div className="flex flex-col items-center mb-6 text-center">
        <div className="w-12 h-12 bg-red-100 dark:bg-red-950/45 text-red-600 rounded-2xl flex items-center justify-center mb-3">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
          Admin Portal <Sparkles className="w-4 h-4 text-amber-500" />
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Authorized personnel only. Please sign in.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 rounded-2xl text-xs font-semibold mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1.5 relative">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Username</label>
          <div className="relative">
            <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-1.5 relative">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#e8000e] hover:bg-[#e8000e]/90 text-white font-bold h-11 rounded-xl shadow-md transition-all duration-300 mt-2"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
