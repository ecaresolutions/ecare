"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { KeyRound, Mail, User, ShieldCheck, CheckCircle2, Phone, Loader2 } from "lucide-react";

export default function LoginClient() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/");

  useEffect(() => {
    // Read redirect parameter from query string if available
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const redir = params.get("redirect");
      if (redir) {
        setRedirectPath(redir);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!email || !password || (activeTab === "register" && (!name || !phone))) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (activeTab === "register" && !/^(01)[3-9]\d{8}$/.test(phone)) {
      setError("Please enter a valid 11-digit Bangladeshi mobile number.");
      setLoading(false);
      return;
    }

    // Simulate Auth API Delay
    setTimeout(() => {
      setLoading(false);
      if (activeTab === "login") {
        setSuccess(t("successLogin"));
        localStorage.setItem("ecare_user", JSON.stringify({ email, name: email.split("@")[0] }));
        document.cookie = `user_session=active; path=/; max-age=${60 * 60 * 24}`;
      } else {
        setSuccess(t("successRegister"));
        localStorage.setItem("ecare_user", JSON.stringify({ email, name, phone }));
        document.cookie = `user_session=active; path=/; max-age=${60 * 60 * 24}`;
      }
      
      // Dispatch event to sync header session state
      window.dispatchEvent(new Event("ecare_cart_change"));

      setTimeout(() => {
        router.push(redirectPath);
      }, 1500);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setError("");
    setSuccess("");
    setGoogleLoading(true);

    setTimeout(() => {
      setGoogleLoading(false);
      setSuccess(t("successLogin"));
      localStorage.setItem("ecare_user", JSON.stringify({ 
        email: "guest_user@gmail.com", 
        name: "Guest User", 
        phone: "01700000000" 
      }));
      document.cookie = `user_session=active; path=/; max-age=${60 * 60 * 24}`;
      
      window.dispatchEvent(new Event("ecare_cart_change"));

      setTimeout(() => {
        router.push(redirectPath);
      }, 1500);
    }, 1500);
  };

  return (
    <Container className="max-w-md">
      <div className="bg-white dark:bg-[#0c101b] border border-border/80 rounded-3xl p-8 shadow-xl space-y-6">
        
        {/* Header info */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">
            {activeTab === "login" ? t("login") : t("register")}
          </h1>
          <p className="text-xs text-muted-foreground">
            Secure access to your Ecare client account
          </p>
        </div>

        {/* Toggle Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-800/40 p-1.5 rounded-2xl">
          <button
            onClick={() => {
              setActiveTab("login");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === "login"
                ? "bg-white dark:bg-[#0c101b] text-slate-800 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            {t("login")}
          </button>
          <button
            onClick={() => {
              setActiveTab("register");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === "register"
                ? "bg-white dark:bg-[#0c101b] text-slate-800 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            {t("register")}
          </button>
        </div>

        {/* Success and Error Banners */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 p-3.5 rounded-xl text-xs font-semibold border border-red-200 dark:border-red-950/30">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 p-3.5 rounded-xl text-xs font-semibold border border-emerald-200 dark:border-emerald-950/30 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "register" && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  {t("name")}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="e.g. John Doe"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  {t("phone")}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="e.g. 01712345678"
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              {t("email")}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="e.g. john@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              {t("password")}
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full h-11 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl mt-2 tracking-wide uppercase text-xs cursor-pointer"
          >
            {loading ? "Processing..." : activeTab === "login" ? t("submitLogin") : t("submitRegister")}
          </Button>
        </form>

        {/* Separator */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-border w-full absolute" />
          <span className="relative px-3 bg-white dark:bg-[#0c101b] text-xs text-muted-foreground uppercase font-bold tracking-wider">
            {t("or")}
          </span>
        </div>

        {/* Google OAuth Button */}
        <Button
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          variant="outline"
          className="w-full h-11 rounded-xl flex items-center justify-center gap-3 border-border hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-200 text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          ) : (
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          )}
          {googleLoading ? "Processing..." : t("google")}
        </Button>

        {/* Bottom switcher helper */}
        <div className="text-center text-xs text-muted-foreground pt-2">
          {activeTab === "login" ? (
            <p>
              {t("noAccount")}{" "}
              <button
                onClick={() => setActiveTab("register")}
                className="text-primary font-bold hover:underline bg-transparent border-none cursor-pointer"
              >
                {t("register")}
              </button>
            </p>
          ) : (
            <p>
              {t("haveAccount")}{" "}
              <button
                onClick={() => setActiveTab("login")}
                className="text-primary font-bold hover:underline bg-transparent border-none cursor-pointer"
              >
                {t("login")}
              </button>
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}
