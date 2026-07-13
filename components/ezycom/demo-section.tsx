"use client";

import React, { useState, useMemo } from "react";
import * as Icons from "lucide-react";

interface DemoItem {
  title: string;
  edition: "wordpress" | "laravel" | "coming-soon";
  category: string;
  categoryKey: string; // 'tech', 'grocery', 'fashion', 'beauty', 'lifestyle'
  image: string; // Icon or emoji identifier for the CSS mockup
  liveUrl?: string;
  adminUrl?: string;
  features: string[];
  gradient: string;
  themeColor: string; // tailwind color configuration name
  slug: string;
}

const demos: DemoItem[] = [
  {
    title: "Gadgetshob v2.0",
    edition: "wordpress",
    category: "Electronics & Tech",
    categoryKey: "tech",
    image: "headphones",
    liveUrl: "https://gadgetshob.ezycom.co",
    adminUrl: "https://gadgetshob.ezycom.co/wp-admin",
    features: ["1-Click checkout", "Speed score 99+", "SMS OTP verification"],
    gradient: "from-blue-500/10 to-indigo-500/5",
    themeColor: "blue",
    slug: "gadgetshob-wp"
  },
  {
    title: "Halalfoods v2.0",
    edition: "wordpress",
    category: "Organic Grocery",
    categoryKey: "grocery",
    image: "apple",
    liveUrl: "https://halalfoods.ezycom.co",
    adminUrl: "https://halalfoods.ezycom.co/wp-admin",
    features: ["Quick Cart drawer", "Smart search finder", "COD charge calculator"],
    gradient: "from-emerald-500/10 to-teal-500/5",
    themeColor: "emerald",
    slug: "halalfoods-wp"
  },
  {
    title: "Apple Studio v2.0",
    edition: "wordpress",
    category: "Premium Single Brand",
    categoryKey: "lifestyle",
    image: "smartphone",
    liveUrl: "https://applestudio.ezycom.co",
    adminUrl: "https://applestudio.ezycom.co/wp-admin",
    features: ["Cinematic media layout", "Interactive checkout", "CAPI Ads tracking"],
    gradient: "from-rose-500/10 to-pink-500/5",
    themeColor: "rose",
    slug: "applestudio-wp"
  },
  {
    title: "Fabri Life Style v2.0",
    edition: "wordpress",
    category: "Fashion & Apparel",
    categoryKey: "fashion",
    image: "shirt",
    liveUrl: "https://fabrilifestyle.ezycom.co",
    adminUrl: "https://fabrilifestyle.ezycom.co/wp-admin",
    features: ["Multi-attribute swatch", "Size chart drawer", "Upsell recommendation"],
    gradient: "from-purple-500/10 to-fuchsia-500/5",
    themeColor: "purple",
    slug: "fabri-wp"
  },
  {
    title: "Zeroshopi v2.0",
    edition: "wordpress",
    category: "Multi-category Retail",
    categoryKey: "lifestyle",
    image: "shopping-bag",
    liveUrl: "https://zeroshopi.ezycom.co",
    adminUrl: "https://zeroshopi.ezycom.co/wp-admin",
    features: ["Mega Menu navigation", "Wishlist checkout", "Coupon Campaign manager"],
    gradient: "from-sky-500/10 to-cyan-500/5",
    themeColor: "sky",
    slug: "zeroshopi-wp"
  },
  {
    title: "GadgetShob (Laravel)",
    edition: "laravel",
    category: "High-Volume Tech",
    categoryKey: "tech",
    image: "zap",
    liveUrl: "https://gadgetshob.laracol.com",
    adminUrl: "https://gadgetshob.laracol.com/admin",
    features: ["AI voice order bots", "VPS optimization", "Zero database locks"],
    gradient: "from-amber-500/10 to-orange-500/5",
    themeColor: "amber",
    slug: "gadgetshob-lv"
  },
  {
    title: "Levoleather (Laravel)",
    edition: "laravel",
    category: "Leather Goods",
    categoryKey: "lifestyle",
    image: "briefcase",
    liveUrl: "https://levoleather.laracol.com",
    adminUrl: "https://levoleather.laracol.com/admin",
    features: ["Instant conversion funnel", "Advanced invoice print", "Courier API booking"],
    gradient: "from-orange-500/10 to-red-500/5",
    themeColor: "orange",
    slug: "levo-lv"
  },
  {
    title: "Amerraja (Laravel)",
    edition: "laravel",
    category: "Premium Lifestyle",
    categoryKey: "lifestyle",
    image: "crown",
    liveUrl: "https://amerraja.laracol.com",
    adminUrl: "https://amerraja.laracol.com/admin",
    features: ["Multi-warehouse stock", "Net profit accountant", "Custom role access"],
    gradient: "from-indigo-500/10 to-violet-500/5",
    themeColor: "indigo",
    slug: "amer-lv"
  },
  {
    title: "Govaly (Laravel)",
    edition: "laravel",
    category: "Beauty & Cosmetics",
    categoryKey: "beauty",
    image: "sparkles",
    liveUrl: "https://govaly.laracol.com",
    adminUrl: "https://govaly.laracol.com/admin",
    features: ["Customer CRM database", "Auto order validation", "Speed under 0.4s"],
    gradient: "from-pink-500/10 to-rose-500/5",
    themeColor: "pink",
    slug: "govaly-lv"
  },
  {
    title: "Fabri Life Style (Laravel)",
    edition: "laravel",
    category: "Laravel Apparel Engine",
    categoryKey: "fashion",
    image: "dress",
    liveUrl: "https://fabrilifestyle.laracol.com",
    adminUrl: "https://fabrilifestyle.laracol.com/admin",
    features: ["High concurrent loads", "Real-time stock sync", "Campaign builder"],
    gradient: "from-teal-500/10 to-emerald-500/5",
    themeColor: "teal",
    slug: "fabri-lv"
  },
  {
    title: "JewelryBox (Laravel)",
    edition: "coming-soon",
    category: "Luxury Jewelry",
    categoryKey: "lifestyle",
    image: "diamond",
    features: ["3D Product Viewer", "Premium Gift Wrap", "Custom Engraving"],
    gradient: "from-yellow-500/10 to-amber-500/5",
    themeColor: "yellow",
    slug: "jewelry-soon"
  },
  {
    title: "FreshCart (Laravel)",
    edition: "coming-soon",
    category: "Supermarket Delivery",
    categoryKey: "grocery",
    image: "carrot",
    features: ["Slot-based delivery", "Reorder in 1-click", "Order subscriptions"],
    gradient: "from-lime-500/10 to-green-500/5",
    themeColor: "lime",
    slug: "fresh-soon"
  },
  {
    title: "FitGear (Laravel)",
    edition: "coming-soon",
    category: "Sports & Fitness",
    categoryKey: "tech",
    image: "dumbbell",
    features: ["Interactive size chart", "Bundle discount builder", "Workout guide sync"],
    gradient: "from-cyan-500/10 to-blue-500/5",
    themeColor: "cyan",
    slug: "fit-soon"
  }
];

// Helper to render mock vector graphics inside preview browser
const MockStorefront = ({ themeColor, image }: { themeColor: string; image: string }) => {
  const colorMap: Record<string, { primary: string; secondary: string; bg: string }> = {
    blue: { primary: "bg-blue-600", secondary: "bg-blue-100", bg: "from-blue-50 to-indigo-50" },
    emerald: { primary: "bg-emerald-600", secondary: "bg-emerald-100", bg: "from-emerald-50 to-teal-50" },
    rose: { primary: "bg-rose-600", secondary: "bg-rose-100", bg: "from-rose-50 to-pink-50" },
    purple: { primary: "bg-purple-600", secondary: "bg-purple-100", bg: "from-purple-50 to-fuchsia-50" },
    sky: { primary: "bg-sky-600", secondary: "bg-sky-100", bg: "from-sky-50 to-cyan-50" },
    amber: { primary: "bg-amber-600", secondary: "bg-amber-100", bg: "from-amber-50 to-orange-50" },
    orange: { primary: "bg-orange-600", secondary: "bg-orange-100", bg: "from-orange-50 to-red-50" },
    indigo: { primary: "bg-indigo-600", secondary: "bg-indigo-100", bg: "from-indigo-50 to-violet-50" },
    pink: { primary: "bg-pink-600", secondary: "bg-pink-100", bg: "from-pink-50 to-rose-50" },
    teal: { primary: "bg-teal-600", secondary: "bg-teal-100", bg: "from-teal-50 to-emerald-50" },
    yellow: { primary: "bg-yellow-500", secondary: "bg-yellow-100", bg: "from-yellow-50 to-amber-50" },
    lime: { primary: "bg-lime-500", secondary: "bg-lime-100", bg: "from-lime-50 to-green-50" },
    cyan: { primary: "bg-cyan-500", secondary: "bg-cyan-100", bg: "from-cyan-50 to-blue-50" }
  };

  const scheme = colorMap[themeColor] || colorMap.blue;

  const renderIcon = () => {
    switch (image) {
      case "headphones": return <Icons.Headphones className="w-8 h-8 text-blue-600" />;
      case "apple": return <Icons.Apple className="w-8 h-8 text-emerald-600" />;
      case "smartphone": return <Icons.Smartphone className="w-8 h-8 text-rose-600" />;
      case "shirt": return <Icons.Shirt className="w-8 h-8 text-purple-600" />;
      case "shopping-bag": return <Icons.ShoppingBag className="w-8 h-8 text-sky-600" />;
      case "zap": return <Icons.Zap className="w-8 h-8 text-amber-600" />;
      case "briefcase": return <Icons.Briefcase className="w-8 h-8 text-orange-600" />;
      case "crown": return <Icons.Crown className="w-8 h-8 text-indigo-600" />;
      case "sparkles": return <Icons.Sparkles className="w-8 h-8 text-pink-600" />;
      case "dress": return <Icons.Smile className="w-8 h-8 text-teal-600" />; // Smile representing fashion/apparel context
      case "diamond": return <Icons.Gem className="w-8 h-8 text-yellow-600" />;
      case "carrot": return <Icons.CookingPot className="w-8 h-8 text-lime-600" />; // representing groceries
      case "dumbbell": return <Icons.Dumbbell className="w-8 h-8 text-cyan-600" />;
      default: return <Icons.Store className="w-8 h-8 text-slate-600" />;
    }
  };

  return (
    <div className={`w-full h-full bg-gradient-to-br ${scheme.bg} p-3 flex flex-col justify-between select-none relative group-hover:scale-102 transition-transform duration-500`}>
      {/* Mock Header */}
      <div className="flex justify-between items-center bg-white/70 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-xs border border-white/50">
        <div className="flex items-center gap-1.5">
          <div className={`w-4 h-4 rounded-full ${scheme.primary} flex items-center justify-center`}>
            <Icons.Layers className="w-2.5 h-2.5 text-white" />
          </div>
          <div className="w-10 h-2 bg-slate-200 rounded-sm" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-2 bg-slate-200 rounded-sm" />
          <Icons.ShoppingCart className="w-3 h-3 text-slate-400" />
        </div>
      </div>

      {/* Mock Hero Banner */}
      <div className="bg-white/80 border border-white/60 rounded-xl p-3 flex items-center justify-between shadow-xs mt-2 flex-1">
        <div className="space-y-2 max-w-[50%]">
          <div className={`h-3 w-16 ${scheme.primary} rounded-md opacity-25`} />
          <div className="h-4 w-20 bg-slate-800 rounded-md" />
          <div className="flex gap-1">
            <div className="h-2 w-8 bg-slate-200 rounded-sm" />
            <div className="h-2 w-6 bg-slate-200 rounded-sm" />
          </div>
          <div className={`h-3 w-12 ${scheme.primary} rounded-md opacity-80`} />
        </div>
        <div className={`w-12 h-12 rounded-full ${scheme.secondary} flex items-center justify-center shrink-0 border border-white shadow-xs animate-pulse`}>
          {renderIcon()}
        </div>
      </div>

      {/* Mock Products Grid */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/60 border border-white/40 rounded-lg p-1.5 flex flex-col justify-between shadow-xxs">
            <div className="w-full aspect-square bg-slate-100/80 rounded-md flex items-center justify-center">
              <Icons.Image className="w-3 h-3 text-slate-300" />
            </div>
            <div className="space-y-1 mt-1.5">
              <div className="h-1.5 w-full bg-slate-300 rounded-sm" />
              <div className="h-1.5 w-2/3 bg-slate-200 rounded-sm" />
              <div className={`h-1.5 w-1/2 ${scheme.primary} rounded-sm opacity-60`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function EzyComDemos({ locale = "bn" }: { locale?: string }) {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract translation labels dynamically
  const isBn = locale === "bn";

  const categories = useMemo(() => {
    return [
      { key: "all", label: isBn ? "সবগুলো একসাথে" : "All Together" },
      { key: "wordpress", label: isBn ? "ওয়ার্ডপ্রেস সিএমএস" : "WordPress CMS" },
      { key: "laravel", label: isBn ? "লারাভেল ইঞ্জিন" : "Laravel Engine" },
      { key: "tech", label: isBn ? "ইলেকট্রনিক্স ও টেক" : "Electronics & Tech" },
      { key: "fashion", label: isBn ? "ফ্যাশন ও অ্যাপারেল" : "Fashion & Apparel" },
      { key: "grocery", label: isBn ? "গ্রোসারি ও অর্গানিক" : "Organic Grocery" },
      { key: "beauty", label: isBn ? "বিউটি ও কসমেটিক্স" : "Beauty & Cosmetics" },
      { key: "lifestyle", label: isBn ? "প্রিমিয়াম লাইফস্টাইল" : "Premium Lifestyle" },
      { key: "coming-soon", label: isBn ? "কামিং সুন" : "Coming Soon" }
    ];
  }, [isBn]);

  // Compute live item counts for each filter category
  const counts = useMemo(() => {
    const list: Record<string, number> = {
      all: demos.filter(d => d.edition !== "coming-soon").length, // only active live demos
      wordpress: demos.filter(d => d.edition === "wordpress").length,
      laravel: demos.filter(d => d.edition === "laravel").length,
      tech: demos.filter(d => d.categoryKey === "tech").length,
      fashion: demos.filter(d => d.categoryKey === "fashion").length,
      grocery: demos.filter(d => d.categoryKey === "grocery").length,
      beauty: demos.filter(d => d.categoryKey === "beauty").length,
      lifestyle: demos.filter(d => d.categoryKey === "lifestyle").length,
      "coming-soon": demos.filter(d => d.edition === "coming-soon").length
    };
    return list;
  }, []);

  // Filter logic: filters by sidebar selection AND search queries
  const filteredDemos = useMemo(() => {
    return demos.filter((demo) => {
      // 1. Matches Sidebar Filter
      let matchesFilter = true;
      if (selectedType === "wordpress" || selectedType === "laravel" || selectedType === "coming-soon") {
        matchesFilter = demo.edition === selectedType;
      } else if (selectedType !== "all") {
        matchesFilter = demo.categoryKey === selectedType;
      } else {
        // 'all' selection ignores coming soon templates by default
        matchesFilter = demo.edition !== "coming-soon";
      }

      // 2. Matches Search Input
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

      {/* 2. Main Grid Wrapper (Sidebar Filter + Demos Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SIDEBAR: Filter & Refine */}
        <div className="lg:col-span-3 bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
              <Icons.SlidersHorizontal className="w-4 h-4 text-primary" />
              {isBn ? "ফিল্টার ও সার্চ" : "Filter & Refine"}
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              {filteredDemos.length} {isBn ? "টি ডেমো" : "Demos"}
            </span>
          </div>

          {/* Search box input */}
          <div className="relative">
            <Icons.Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? "ডেমো খুঁজুন..." : "Search for Demos..."}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:bg-white transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <Icons.X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter buttons list */}
          <div className="space-y-1.5">
            {categories.map((cat) => {
              const isActive = selectedType === cat.key;
              const count = counts[cat.key] || 0;

              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedType(cat.key)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/15"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <span className="tracking-wide">{cat.label}</span>
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

        {/* DEMOS GRID */}
        <div className="lg:col-span-9 space-y-6">
          {filteredDemos.length === 0 ? (
            <div className="bg-white border border-slate-200/60 rounded-3xl p-12 text-center space-y-4">
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
                const isComingSoon = demo.edition === "coming-soon";

                return (
                  <div
                    key={demo.slug}
                    className="group bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col justify-between relative"
                  >
                    <div className="flex flex-col h-full">
                      {/* Browser Mock Header */}
                      <div className="bg-slate-50 border-b border-slate-100 px-4 py-2.5 flex items-center justify-between shrink-0">
                        {/* Dot controls */}
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-rose-400" />
                          <div className="w-2 h-2 rounded-full bg-amber-400" />
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        {/* URL Bar */}
                        <div className="bg-slate-200/60 text-[8px] font-bold text-slate-400 px-5 py-0.5 rounded-full uppercase tracking-wider w-36 text-center truncate">
                          {isComingSoon ? "coming-soon.ezycom.co" : demo.liveUrl?.replace("https://", "")}
                        </div>
                        <div className="w-6" /> {/* spacer */}
                      </div>

                      {/* Mock Storefront Visual Area */}
                      <div className="relative w-full aspect-[5/4] overflow-hidden bg-white border-b border-slate-100 flex items-center justify-center">
                        <MockStorefront themeColor={demo.themeColor} image={demo.image} />
                        
                        {/* Hover Actions Glassmorphic Overlay (Hidden on Coming Soon) */}
                        {!isComingSoon && (
                          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-xs flex flex-col items-center justify-center gap-3 p-4 z-15">
                            <a
                              href={demo.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full max-w-[160px] inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/25 hover:scale-102 active:scale-98 transition-all cursor-pointer"
                            >
                              <span>{isBn ? "লাইভ প্রিভিউ দেখুন" : "Preview Demo"}</span>
                              <Icons.ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={demo.adminUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full max-w-[160px] inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-white text-slate-800 text-xs font-bold rounded-xl shadow-md hover:bg-slate-50 hover:scale-102 active:scale-98 transition-all cursor-pointer"
                            >
                              <span>{isBn ? "এডমিন প্যানেল" : "Admin Panel"}</span>
                              <Icons.Settings className="w-3.5 h-3.5 text-slate-500" />
                            </a>
                          </div>
                        )}

                        {/* Coming Soon Overlay */}
                        {isComingSoon && (
                          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xxs flex flex-col items-center justify-center gap-2 p-4 z-15">
                            <div className="bg-amber-500 text-slate-900 font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 animate-pulse">
                              <Icons.Lock className="w-3 h-3" />
                              <span>{isBn ? "কামিং সুন" : "Coming Soon"}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Details / Info */}
                      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          {/* Title & Badge */}
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-base font-black text-slate-800 tracking-tight leading-snug truncate group-hover:text-primary transition-colors">
                              {demo.title}
                            </h4>
                            <span
                              className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${
                                isComingSoon
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : isLaravel
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                              }`}
                            >
                              {isComingSoon ? (isBn ? "আসন্ন" : "Soon") : isLaravel ? "Laravel" : "WordPress"}
                            </span>
                          </div>

                          {/* Tech Specifications / Features Checklist */}
                          <ul className="space-y-1.5 text-xs text-slate-500 font-medium">
                            {demo.features.map((feat, fidx) => (
                              <li key={fidx} className="flex items-center gap-2 leading-relaxed">
                                <Icons.Check className={`w-3.5 h-3.5 shrink-0 ${isComingSoon ? "text-amber-500" : isLaravel ? "text-emerald-500" : "text-blue-500"}`} />
                                <span className="truncate">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Bottom Actions for Mobile Viewports / Fallback when not hovered */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 lg:hidden">
                          {!isComingSoon ? (
                            <>
                              <a
                                href={demo.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-primary text-white text-[10px] font-black rounded-lg cursor-pointer"
                              >
                                <span>{isBn ? "প্রিভিউ" : "Preview"}</span>
                                <Icons.ArrowUpRight className="w-3 h-3" />
                              </a>
                              <a
                                href={demo.adminUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-slate-50 text-slate-700 border border-slate-200 text-[10px] font-bold rounded-lg cursor-pointer"
                              >
                                <span>{isBn ? "এডমিন" : "Admin"}</span>
                                <Icons.Settings className="w-3 h-3" />
                              </a>
                            </>
                          ) : (
                            <div className="w-full text-center text-[10px] font-bold text-slate-400 uppercase py-1 select-none">
                              {isBn ? "শীঘ্রই আসছে" : "In Development"}
                            </div>
                          )}
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
    </div>
  );
}
