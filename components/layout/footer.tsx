"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import * as React from "react";
import { 
  ChevronUp, 
  Send, 
  Store, 
  UserCheck, 
  Smile, 
  FolderKanban, 
  Mail, 
  Building2, 
  BarChart3, 
  Tablet, 
  FileText, 
  Inbox, 
  GraduationCap, 
  TrendingUp,
  ShieldCheck,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const companyLinks = [
    { key: "about_us", href: "/about" },
    { key: "testimonials", href: "/testimonials" },
    { key: "affiliates", href: "/affiliates" },
    { key: "affiliate_policy", href: "/affiliates#policy" },
    { key: "partners", href: "/partners" },
    { key: "contact_us", href: "/contact" },
    { key: "life_at_ecare", href: "/life-at-ecare" },
    { key: "ecare", href: "/services" },
  ];

  const resourceLinks = [
    { key: "support_area", href: "/support" },
    { key: "support_policy", href: "/support#policy" },
    { key: "refund_policy", href: "/refund" },
    { key: "terms", href: "/legal/terms" },
    { key: "privacy", href: "/legal/privacy" },
    { key: "brand_assets", href: "/brand-assets" },
    { key: "coupons", href: "/coupons" },
    { key: "eclab", href: "/eclab" },
    { key: "webinars", href: "/webinars" },
    { key: "careers", href: "/careers", hasHiring: true },
  ];

  const products = [
    { title: "Dokan Multivendor", href: "/services/dokan-multivendor", iconBg: "from-pink-500 to-purple-600", Icon: Store },
    { title: "WP Project Manager", href: "/services/wp-project-manager-pro", iconBg: "from-violet-500 to-indigo-600", Icon: FolderKanban },
    { title: "WP User Frontend", href: "/services/wp-user-frontend-pro", iconBg: "from-emerald-400 to-teal-600", Icon: UserCheck },
    { title: "WP ERP", href: "/services/wp-erp", iconBg: "from-cyan-500 to-blue-600", Icon: Building2 },
    { title: "Conversion Tracking", href: "/services/conversion-tracking", iconBg: "from-pink-500 to-rose-500", Icon: TrendingUp },
    { title: "wePOS", href: "/services/wepos", iconBg: "from-sky-500 to-indigo-500", Icon: Tablet },
    { title: "StoreGrowth", href: "/services/storegrowth", iconBg: "from-blue-500 to-indigo-500", Icon: TrendingUp },
    { title: "Appsero", href: "/services/appsero", iconBg: "from-indigo-500 to-blue-600", Icon: BarChart3 },
    { title: "weMail", href: "/services/wemail", iconBg: "from-blue-400 to-sky-600", Icon: Mail },
    { title: "Happy Addons", href: "/services/happy-addons", iconBg: "from-purple-500 to-pink-500", Icon: Smile },
    { title: "weDocs", href: "/services/wedocs", iconBg: "from-teal-500 to-cyan-500", Icon: FileText },
    { title: "Ecare Host", href: "/services/flywp", iconBg: "from-purple-600 to-indigo-600", Icon: Send },
    { title: "InboxWP", href: "/services/inboxwp", iconBg: "from-blue-600 to-cyan-600", Icon: Inbox },
    { title: "Klasio", href: "/services/klasio", iconBg: "from-blue-500 to-indigo-700", Icon: GraduationCap },
  ];

  return (
    <footer className="w-full border-t border-border bg-[#f5f8fc] dark:bg-[#070b13] pt-16 pb-8 mt-auto relative overflow-hidden">
      {/* Background SVG Layer */}
      <div 
        className="absolute inset-0 bg-[url('/footer-bg.svg')] bg-cover bg-top bg-no-repeat opacity-60 dark:opacity-[0.08] pointer-events-none"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 pb-12">
          
          {/* Column 1: Logo & Newsletter */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block active:scale-95 transition-all">
              <div className="relative h-8 w-32">
                <Image 
                  src="/logo.png" 
                  alt="Ecare Logo" 
                  fill 
                  className="object-contain dark:invert"
                  sizes="150px"
                />
              </div>
            </Link>
            
            <div className="space-y-3">
              <h3 className="text-base font-bold text-foreground">
                {t("subscribe")}
              </h3>
              <form 
                onSubmit={(e) => e.preventDefault()} 
                className="flex items-center gap-2 max-w-sm"
              >
                <input 
                  type="email" 
                  placeholder={t("email_placeholder")} 
                  className="flex-grow bg-white dark:bg-slate-900 border border-border/80 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground"
                  required
                />
                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  <span>{t("send")}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-90 active:scale-90 transition-all shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-black dark:bg-slate-800 text-white flex items-center justify-center hover:opacity-90 active:scale-90 transition-all shadow-sm"
                aria-label="X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90 active:scale-90 transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:opacity-90 active:scale-90 transition-all shadow-sm"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.026 0 12 0 12s0 3.974.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.524 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108c.502-1.863.502-5.837.502-5.837s0-3.974-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="flex items-center gap-1 bg-[#0f3497] text-white text-[9px] font-bold px-2 py-1 rounded shadow-sm">
                <ShieldCheck className="w-3 h-3 text-white" />
                <span>GDPR COMPLIANT</span>
              </div>
              <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[9px] font-bold px-2 py-1 rounded shadow-sm">
                <CheckCircle className="w-3 h-3" />
                <span>SECURE PAYMENT</span>
              </div>
              <div className="text-[#e2136e] font-extrabold text-xs tracking-wider border border-[#e2136e]/20 px-2.5 py-1 rounded bg-[#e2136e]/5 shadow-sm">
                bKash
              </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="col-span-6 sm:col-span-4 lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
              {t("company")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="col-span-6 sm:col-span-4 lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
              {t("resources")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {resourceLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
                  >
                    {t(link.key)}
                    {link.hasHiring && (
                      <span className="bg-primary text-primary-foreground text-[8px] font-bold px-1.5 py-0.5 rounded-full ml-1.5 uppercase tracking-wide">
                        {t("hiring")}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Products */}
          <div className="col-span-12 sm:col-span-4 lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
              {t("products")}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {products.map((prod, idx) => {
                const IconComp = prod.Icon;
                return (
                  <li key={idx}>
                    <Link 
                      href={prod.href}
                      className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                    >
                      <div className={`h-5 w-5 rounded-full bg-gradient-to-br ${prod.iconBg} flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform`}>
                        <IconComp className="w-2.5 h-2.5" />
                      </div>
                      <span className="truncate">{prod.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Bottom Bar Separator */}
        <div className="border-t border-border/60 pt-8 mt-6 relative flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Scroll to Top Button */}
          <button 
            onClick={scrollToTop}
            className="absolute left-1/2 -translate-x-1/2 -top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-border shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer active:scale-90"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Hosting Badge */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>{t("hosted_at")}</span>
            <span className="flex items-center gap-1 font-bold text-foreground">
              <Send className="w-3.5 h-3.5 text-purple-600 fill-purple-600 rotate-45" />
              Ecare Host
            </span>
          </div>

          {/* Localized Copyright */}
          <div className="text-xs text-muted-foreground text-center md:text-right max-w-md">
            {t("copyright")}
          </div>
        </div>

      </div>
    </footer>
  );
}
