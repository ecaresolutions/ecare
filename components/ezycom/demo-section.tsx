"use client";

import React, { useState, useMemo } from "react";
import * as Icons from "lucide-react";

interface DemoItem {
  title: string;
  edition: "wordpress" | "laravel";
  category: string;
  categoryKey: string;
  image: string; // Path to webp image
  liveUrl?: string;
  adminUrl?: string;
  features: string[];
  gradient: string;
  themeColor: string;
  slug: string;
}

const demos: DemoItem[] = [
  // --- Woocom (WordPress) ---
  {
    title: "GadgetHub (Woocom)",
    edition: "wordpress",
    category: "Electronics & Tech",
    categoryKey: "tech",
    image: "/demo/01.webp",
    liveUrl: "https://gadgethub.ezycom.co",
    adminUrl: "https://gadgethub.ezycom.co/wp-admin",
    features: ["1-Click Checkout", "Speed Score 99+", "SMS OTP Verification"],
    gradient: "from-blue-500/10 to-indigo-500/5",
    themeColor: "blue",
    slug: "gadgethub-woocom"
  },
  {
    title: "FreshMart (Woocom)",
    edition: "wordpress",
    category: "Organic Grocery",
    categoryKey: "grocery",
    image: "/demo/02.webp",
    liveUrl: "https://freshmart.ezycom.co",
    adminUrl: "https://freshmart.ezycom.co/wp-admin",
    features: ["Quick Cart Drawer", "Smart Search Finder", "COD Charge Calculator"],
    gradient: "from-emerald-500/10 to-teal-500/5",
    themeColor: "emerald",
    slug: "freshmart-woocom"
  },
  {
    title: "StyleNest (Woocom)",
    edition: "wordpress",
    category: "Fashion & Apparel",
    categoryKey: "fashion",
    image: "/demo/03.webp",
    liveUrl: "https://stylenest.ezycom.co",
    adminUrl: "https://stylenest.ezycom.co/wp-admin",
    features: ["Multi-Attribute Swatch", "Size Chart Drawer", "Upsell Recommendation"],
    gradient: "from-purple-500/10 to-fuchsia-500/5",
    themeColor: "purple",
    slug: "stylenest-woocom"
  },
  {
    title: "ElectroMart (Woocom)",
    edition: "wordpress",
    category: "Electrical & Hardware",
    categoryKey: "tech",
    image: "/demo/04.webp",
    liveUrl: "https://electromart.ezycom.co",
    adminUrl: "https://electromart.ezycom.co/wp-admin",
    features: ["Heavy Load Speed", "Smart Price Calculator", "Custom Invoice Print"],
    gradient: "from-amber-500/10 to-orange-500/5",
    themeColor: "amber",
    slug: "electromart-woocom"
  },
  {
    title: "ScentAura (Woocom)",
    edition: "wordpress",
    category: "Premium Fragrances",
    categoryKey: "beauty",
    image: "/demo/05.webp",
    liveUrl: "https://scentaura.ezycom.co",
    adminUrl: "https://scentaura.ezycom.co/wp-admin",
    features: ["Aesthetic Luxury Layout", "Gift Packaging Option", "Customer Reward Point"],
    gradient: "from-pink-500/10 to-rose-500/5",
    themeColor: "pink",
    slug: "scentaura-woocom"
  },
  {
    title: "Glowé Skincare (Woocom)",
    edition: "wordpress",
    category: "Beauty & Cosmetics",
    categoryKey: "beauty",
    image: "/demo/06.webp",
    liveUrl: "https://gloweskincare.ezycom.co",
    adminUrl: "https://gloweskincare.ezycom.co/wp-admin",
    features: ["Skincare Routine Builder", "Instant Cart Drawer", "Order Tracking SMS"],
    gradient: "from-teal-500/10 to-emerald-500/5",
    themeColor: "teal",
    slug: "gloweskincare-woocom"
  },

  // --- Laracom (Laravel) ---
  {
    title: "GadgetHub (Laracom)",
    edition: "laravel",
    category: "Electronics & Tech",
    categoryKey: "tech",
    image: "/demo/01.webp",
    liveUrl: "https://gadgethub.laracol.com",
    adminUrl: "https://gadgethub.laracol.com/admin",
    features: ["VPS Optimization", "AI Voice Order Bots", "Zero Database Locks"],
    gradient: "from-blue-500/10 to-indigo-500/5",
    themeColor: "blue",
    slug: "gadgethub-laracom"
  },
  {
    title: "FreshMart (Laracom)",
    edition: "laravel",
    category: "Organic Grocery",
    categoryKey: "grocery",
    image: "/demo/02.webp",
    liveUrl: "https://freshmart.laracol.com",
    adminUrl: "https://freshmart.laracol.com/admin",
    features: ["Slot-Based Delivery", "Instant Stock Sync", "Reorder in 1-Click"],
    gradient: "from-emerald-500/10 to-teal-500/5",
    themeColor: "emerald",
    slug: "freshmart-laracom"
  },
  {
    title: "StyleNest (Laracom)",
    edition: "laravel",
    category: "Fashion & Apparel",
    categoryKey: "fashion",
    image: "/demo/03.webp",
    liveUrl: "https://stylenest.laracol.com",
    adminUrl: "https://stylenest.laracol.com/admin",
    features: ["High Concurrent Loads", "Real-Time Stock Sync", "Campaign builder"],
    gradient: "from-purple-500/10 to-fuchsia-500/5",
    themeColor: "purple",
    slug: "stylenest-laracom"
  },
  {
    title: "ElectroMart (Laracom)",
    edition: "laravel",
    category: "Electrical & Hardware",
    categoryKey: "tech",
    image: "/demo/04.webp",
    liveUrl: "https://electromart.laracol.com",
    adminUrl: "https://electromart.laracol.com/admin",
    features: ["Instant conversion funnel", "Advanced invoice print", "Courier API booking"],
    gradient: "from-amber-500/10 to-orange-500/5",
    themeColor: "amber",
    slug: "electromart-laracom"
  },
  {
    title: "ScentAura (Laracom)",
    edition: "laravel",
    category: "Premium Fragrances",
    categoryKey: "beauty",
    image: "/demo/05.webp",
    liveUrl: "https://scentaura.laracol.com",
    adminUrl: "https://scentaura.laracol.com/admin",
    features: ["Multi-Warehouse Stock", "Net Profit Accountant", "Custom Role Access"],
    gradient: "from-pink-500/10 to-rose-500/5",
    themeColor: "pink",
    slug: "scentaura-laracom"
  },
  {
    title: "Glowé Skincare (Laracom)",
    edition: "laravel",
    category: "Beauty & Cosmetics",
    categoryKey: "beauty",
    image: "/demo/06.webp",
    liveUrl: "https://glowe.laracol.com",
    adminUrl: "https://glowe.laracol.com/admin",
    features: ["Customer CRM database", "Auto order validation", "Speed under 0.4s"],
    gradient: "from-teal-500/10 to-emerald-500/5",
    themeColor: "teal",
    slug: "gloweskincare-laracom"
  }
];

export default function EzyComDemos({ locale = "bn" }: { locale?: string }) {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isBn = locale === "bn";

  const categories = useMemo(() => {
    return [
      { key: "all", label: isBn ? "সবগুলো একসাথে" : "All Together" },
      { key: "wordpress", label: isBn ? "উকম" : "Woocom" },
      { key: "laravel", label: isBn ? "লারা কম" : "Laracom" }
    ];
  }, [isBn]);

  const counts = useMemo(() => {
    const list: Record<string, number> = {
      all: demos.length,
      wordpress: demos.filter(d => d.edition === "wordpress").length,
      laravel: demos.filter(d => d.edition === "laravel").length
    };
    return list;
  }, []);

  const filteredDemos = useMemo(() => {
    return demos.filter((demo) => {
      let matchesFilter = true;
      if (selectedType === "wordpress" || selectedType === "laravel") {
        matchesFilter = demo.edition === selectedType;
      }

      let matchesSearch = true;
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        matchesSearch =
          demo.title.toLowerCase().includes(query) ||
          demo.category.toLowerCase().includes(query) ||
          demo.features.some((f) => f.toLowerCase().includes(query));
      }

      return matchesFilter && matchesSearch;
    });
  }, [selectedType, searchQuery]);

  return (
    <div className="space-y-16">
      {/* 1. Header Section with large watermark backdrop */}
      <div className="relative text-center max-w-3xl mx-auto space-y-4 py-8">
        {/* Massive Backdrop watermark */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 select-none overflow-hidden">
          <span className="text-[140px] sm:text-[240px] font-black text-slate-100 leading-none tracking-tighter transition-all duration-300">
            6+
          </span>
        </div>

        {/* Float design experience badge at top-right on desktop */}
        <div className="hidden lg:flex absolute top-0 -right-24 items-center gap-1.5 rotate-6 bg-blue-50 border border-blue-100 rounded-2xl p-3 shadow-xs">
          <div className="space-y-0.5 text-left">
            <p className="font-serif italic font-extrabold text-blue-600 text-xs">Optimally Designed For</p>
            <p className="font-serif italic font-extrabold text-blue-600 text-[10px]">Access And User Experience</p>
          </div>
          <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>

        <span className="text-xs font-black text-primary bg-primary/5 border border-primary/10 px-4 py-1.5 rounded-full uppercase tracking-wider block w-fit mx-auto">
          {isBn ? "লাইভ ডেমো স্টোরসমূহ" : "Live Demo Stores"}
        </span>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight relative z-10 font-sans">
          {isBn ? "প্রিমিয়াম রেডি-বিল্ড ডেমো স্টোর" : "Premium Pre-Build Demos"}<br />
          <span className="text-slate-500 font-medium text-2xl sm:text-3xl tracking-normal font-sans">
            {isBn ? "আপনার ব্যবসা আজই শুরু করতে" : "to get started"}
          </span>
        </h2>
        
        <p className="text-slate-500 font-medium text-sm sm:text-base max-w-xl mx-auto">
          {isBn 
            ? "চেকআউট ফ্লো টেস্ট করুন, পেজের স্পিড যাচাই করুন এবং কাস্টম এডমিন প্যানেল ঘুরে দেখুন।" 
            : "Test checkout flows, verify page load speeds, and explore the backend custom admin panels live."}
        </p>
      </div>

      {/* 2. Centered Search & Filter Tabs */}
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 mb-12">
        {/* Search bar input */}
        <div className="relative w-full max-w-md">
          <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? "কোন নির্দিষ্ট ডেমো খুঁজছেন? টাইপ করুন..." : "Looking for a specific demo? Type here..."}
            className="w-full pl-11 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              <Icons.X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 select-none">
          {categories.map((cat) => {
            const isActive = selectedType === cat.key;
            const count = counts[cat.key] || 0;

            return (
              <button
                key={cat.key}
                onClick={() => setSelectedType(cat.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Demos Grid Area (Full Width) */}
      <div className="w-full">
        {filteredDemos.length === 0 ? (
          <div className="bg-white border border-slate-200/60 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto shadow-sm">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
              <Icons.AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-lg">
              {isBn ? "কোনো ডেমো খুঁজে পাওয়া যায়নি" : "No Demos Found"}
            </h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              {isBn 
                ? "আপনার সার্চ কুয়েরির সাথে মিল রয়েছে এমন কোনো ডেমো স্টোর পাওয়া যায়নি। দয়া করে অন্য কিছু লিখে সার্চ করুন।" 
                : "We couldn't find any demo stores matching your search query. Please try resetting your filters or typing another term."}
            </p>
            <button
              onClick={() => {
                setSelectedType("all");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-md shadow-primary/10 cursor-pointer hover:scale-102 transition-all"
            >
              {isBn ? "রিসেট ফিল্টার" : "Reset Filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDemos.map((demo) => {
              const isLaravel = demo.edition === "laravel";

              return (
                <div
                  key={demo.slug}
                  className="group bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xs hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex flex-col h-full justify-between">
                    {/* Mock Storefront Visual Area (Framed & rounded corners) */}
                    <div className="p-4 pb-0 shrink-0">
                      <div className="relative w-full aspect-[5/4] overflow-hidden rounded-2xl bg-white border border-slate-100 flex items-center justify-center">
                        <img 
                          src={demo.image} 
                          alt={demo.title} 
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>

                    {/* Card Details & Actions Row (Horizontal layout) */}
                    <div className="p-5 flex items-center justify-between gap-4 mt-auto">
                      {/* Left Side: Title & Subtitle */}
                      <div className="space-y-0.5 truncate text-left">
                        <h4 className="text-sm sm:text-base font-black text-slate-800 tracking-tight leading-tight truncate group-hover:text-primary transition-colors">
                          {demo.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-semibold truncate">
                          {demo.category}
                        </p>
                      </div>

                      {/* Right Side: Action Pill Buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Live Demo Pill Button */}
                        <a
                          href={demo.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[9px] font-black rounded-full uppercase tracking-wider shadow-xs hover:scale-102 active:scale-98 transition-all cursor-pointer whitespace-nowrap"
                        >
                          {isBn ? "লাইভ ডেমো" : "Live Demo"}
                        </a>
                        {/* Admin Panel Pill Button */}
                        <a
                          href={demo.adminUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[9px] font-bold rounded-full uppercase tracking-wider hover:scale-102 active:scale-98 transition-all cursor-pointer whitespace-nowrap"
                        >
                          {isBn ? "এডমিন" : "Admin"}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}