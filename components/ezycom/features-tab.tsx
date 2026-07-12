"use client";

import React, { useState } from "react";
import * as Icons from "lucide-react";

interface FeatureItem {
  title: string;
  desc: string;
}

interface FeaturesTabProps {
  tTitle: string;
  tSub: string;
  tTabAll: string;
  tTabAdvanced: string;
  tTabTech: string;
  tSeeMore: string;
  itemsAll: FeatureItem[];
  itemsAdvanced: FeatureItem[];
  itemsTech: FeatureItem[];
}

// Dynamic keyword-based icon selector to assign unique relevant Lucide icons based on feature title
const getIconForTitle = (title: string) => {
  const t = (title || "").toLowerCase();
  
  if (t.includes("mobile") || t.includes("মোবাইল")) {
    return <Icons.Smartphone className="w-5 h-5 text-primary" />;
  }
  if (t.includes("fast") || t.includes("ফাস্ট") || t.includes("গতি") || t.includes("লোড টাইম")) {
    return <Icons.Zap className="w-5 h-5 text-amber-500" />;
  }
  if (t.includes("landing") || t.includes("ল্যান্ডিং")) {
    return <Icons.Layers className="w-5 h-5 text-indigo-500" />;
  }
  if (t.includes("pixel") || t.includes("পিক্সেল") || t.includes("capi")) {
    return <Icons.Share2 className="w-5 h-5 text-sky-500" />;
  }
  if (t.includes("javascript") || t.includes("node.js") || t.includes("backend") || t.includes("ব্যাকএন্ড")) {
    return <Icons.Code2 className="w-5 h-5 text-emerald-500" />;
  }
  if (t.includes("checkout") || t.includes("চেকআউট")) {
    return <Icons.MousePointerClick className="w-5 h-5 text-primary" />;
  }
  if (t.includes("courier") || t.includes("কুরিয়ার") || t.includes("ডেলিভারি")) {
    return <Icons.Truck className="w-5 h-5 text-emerald-500" />;
  }
  if (t.includes("secure") || t.includes("সুরক্ষা") || t.includes("security") || t.includes("প্রাইভেসি") || t.includes("সিকিউরিটি")) {
    return <Icons.ShieldCheck className="w-5 h-5 text-emerald-500" />;
  }
  if (t.includes("fake") || t.includes("ফেক")) {
    return <Icons.UserX className="w-5 h-5 text-rose-500" />;
  }
  if (t.includes("invoice") || t.includes("ইনভয়েস")) {
    return <Icons.FileText className="w-5 h-5 text-slate-500" />;
  }
  if (t.includes("order") || t.includes("অর্ডার")) {
    return <Icons.ClipboardList className="w-5 h-5 text-indigo-500" />;
  }
  if (t.includes("chat") || t.includes("চ্যাট")) {
    return <Icons.MessageSquare className="w-5 h-5 text-sky-500" />;
  }
  if (t.includes("domain") || t.includes("ডোমেইন")) {
    return <Icons.Globe className="w-5 h-5 text-primary" />;
  }
  if (t.includes("stock") || t.includes("স্টক") || t.includes("ইনভেন্টরি")) {
    return <Icons.Boxes className="w-5 h-5 text-amber-500" />;
  }
  if (t.includes("admin") || t.includes("অ্যাডমিন")) {
    return <Icons.Users className="w-5 h-5 text-indigo-500" />;
  }
  if (t.includes("sms") || t.includes("এসএমএস")) {
    return <Icons.MessageSquare className="w-5 h-5 text-sky-500" />;
  }
  if (t.includes("payment") || t.includes("পেমেন্ট") || t.includes("গেটওয়ে")) {
    return <Icons.CreditCard className="w-5 h-5 text-emerald-500" />;
  }
  if (t.includes("analytics") || t.includes("অ্যানালিটিক্স")) {
    return <Icons.BarChart3 className="w-5 h-5 text-indigo-500" />;
  }
  if (t.includes("wholesale") || t.includes("হোলসেল") || t.includes("রিটেইল")) {
    return <Icons.Store className="w-5 h-5 text-amber-500" />;
  }
  if (t.includes("tracking") || t.includes("ট্র্যাকিং")) {
    return <Icons.MapPin className="w-5 h-5 text-rose-500" />;
  }
  if (t.includes("seo") || t.includes("সার্চ")) {
    return <Icons.Search className="w-5 h-5 text-sky-500" />;
  }
  if (t.includes("account") || t.includes("অ্যাকাউন্ট")) {
    return <Icons.BookOpen className="w-5 h-5 text-slate-500" />;
  }
  if (t.includes("global") || t.includes("গ্লোবাল")) {
    return <Icons.Globe className="w-5 h-5 text-primary" />;
  }
  if (t.includes("growth") || t.includes("গ্রোথ") || t.includes("বুস্টিং") || t.includes("growth")) {
    return <Icons.TrendingUp className="w-5 h-5 text-emerald-500" />;
  }
  if (t.includes("category") || t.includes("ক্যাটাগরি")) {
    return <Icons.FolderTree className="w-5 h-5 text-indigo-500" />;
  }
  if (t.includes("suggestion") || t.includes("সাজেশন")) {
    return <Icons.Sparkles className="w-5 h-5 text-amber-500" />;
  }
  if (t.includes("wishlist") || t.includes("উইশলিস্ট")) {
    return <Icons.Heart className="w-5 h-5 text-rose-500" />;
  }
  if (t.includes("compare") || t.includes("কম্পেয়ার")) {
    return <Icons.Scale className="w-5 h-5 text-slate-500" />;
  }
  if (t.includes("design") || t.includes("ডিজাইন") || t.includes("থিমস")) {
    return <Icons.Palette className="w-5 h-5 text-indigo-500" />;
  }
  if (t.includes("setup") || t.includes("সেটআপ")) {
    return <Icons.Sliders className="w-5 h-5 text-slate-500" />;
  }
  if (t.includes("ssl")) {
    return <Icons.Key className="w-5 h-5 text-amber-500" />;
  }
  if (t.includes("video") || t.includes("ভিডিও")) {
    return <Icons.PlayCircle className="w-5 h-5 text-rose-500" />;
  }
  if (t.includes("variation") || t.includes("ভেরিয়েশন")) {
    return <Icons.PlusSquare className="w-5 h-5 text-primary" />;
  }
  if (t.includes("support") || t.includes("সাপোর্ট")) {
    return <Icons.Headphones className="w-5 h-5 text-sky-500" />;
  }
  if (t.includes("popup") || t.includes("পপআপ")) {
    return <Icons.Megaphone className="w-5 h-5 text-amber-500" />;
  }
  if (t.includes("contact") || t.includes("ঠিকানা")) {
    return <Icons.Mail className="w-5 h-5 text-slate-500" />;
  }
  if (t.includes("hosting") || t.includes("হোস্টিং")) {
    return <Icons.HardDrive className="w-5 h-5 text-indigo-500" />;
  }
  if (t.includes("database") || t.includes("ডাটাবেস")) {
    return <Icons.Database className="w-5 h-5 text-sky-500" />;
  }
  if (t.includes("social") || t.includes("সোশ্যাল")) {
    return <Icons.Share2 className="w-5 h-5 text-indigo-500" />;
  }
  
  return <Icons.HelpCircle className="w-5 h-5 text-primary" />;
};

export default function EzyComFeaturesTab({
  tTitle,
  tSub,
  tTabAll,
  tTabAdvanced,
  tTabTech,
  tSeeMore,
  itemsAll,
  itemsAdvanced,
  itemsTech
}: FeaturesTabProps) {
  const [activeTab, setActiveTab] = useState<"all" | "advanced" | "tech">("all");
  const [visibleCount, setVisibleCount] = useState(8);

  const getActiveData = () => {
    // Fallback to empty array if raw values fail to load during builds
    const safeAll = Array.isArray(itemsAll) ? itemsAll : [];
    const safeAdvanced = Array.isArray(itemsAdvanced) ? itemsAdvanced : [];
    const safeTech = Array.isArray(itemsTech) ? itemsTech : [];

    switch (activeTab) {
      case "all":
        return { items: safeAll };
      case "advanced":
        return { items: safeAdvanced };
      case "tech":
        return { items: safeTech };
      default:
        return { items: safeAll };
    }
  };

  const { items } = getActiveData();

  const handleTabChange = (tab: "all" | "advanced" | "tech") => {
    setActiveTab(tab);
    setVisibleCount(8); // Reset count back to 8 on tab change
  };

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 8); // Increment count by 8 in-place
  };

  const displayedItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div className="space-y-12">
      {/* Title & Subtitle */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight !font-sans">
          {tTitle}
        </h2>
        <p className="text-slate-500 font-medium text-base">
          {tSub}
        </p>
      </div>

      {/* Tabs Selector Bar */}
      <div className="flex justify-center">
        <div className="inline-flex bg-slate-100 p-1.5 rounded-full border border-slate-200/50 shadow-sm max-w-full overflow-x-auto">
          <button
            onClick={() => handleTabChange("all")}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "all"
                ? "bg-primary text-white shadow-md shadow-primary/10"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tTabAll}
          </button>
          <button
            onClick={() => handleTabChange("advanced")}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "advanced"
                ? "bg-primary text-white shadow-md shadow-primary/10"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tTabAdvanced}
          </button>
          <button
            onClick={() => handleTabChange("tech")}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "tech"
                ? "bg-primary text-white shadow-md shadow-primary/10"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tTabTech}
          </button>
        </div>
      </div>

      {/* 8-Card Grid View with In-place Pagination */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/60 rounded-3xl p-7 hover:border-primary/30 hover:bg-rose-50/20 transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Card Icon Wrapper */}
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center transition-colors group-hover:bg-white group-hover:border-primary/20">
                {getIconForTitle(item.title)}
              </div>
              {/* Card Title & Desc */}
              <h3 className="text-base font-bold text-slate-800 tracking-tight transition-colors group-hover:text-primary">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button (In-place pagination increment) */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleSeeMore}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-primary text-primary hover:bg-primary hover:text-white rounded-full font-bold text-sm transition-all duration-300 shadow-sm shadow-primary/5 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            {tSeeMore}
            <Icons.ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
