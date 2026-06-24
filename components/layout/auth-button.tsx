"use client";

import { useEffect, useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AuthButton() {
  const t = useTranslations("Header");
  const tAuth = useTranslations("Auth");
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const loadUser = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("ecare_user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }
  };

  useEffect(() => {
    loadUser();

    // Re-check when cart/auth events are dispatched
    window.addEventListener("ecare_cart_change", loadUser);
    return () => {
      window.removeEventListener("ecare_cart_change", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ecare_user");
    // Clear user session cookie
    document.cookie = "user_session=; path=/; max-age=0";
    setUser(null);
    window.dispatchEvent(new Event("ecare_cart_change"));
    router.push("/");
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 hidden lg:inline-block">
          Hi, {user.name}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-1.5 border-red-200 hover:border-red-300 hover:bg-red-50/50 dark:hover:bg-red-950/10 text-red-600 dark:text-red-400"
        >
          <LogOut className="w-3.5 h-3.5" />
          {tAuth("logout")}
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="cursor-pointer flex items-center gap-1.5"
      asChild
    >
      <Link href="/login">
        <User className="w-4 h-4" />
        {t("login")}
      </Link>
    </Button>
  );
}
