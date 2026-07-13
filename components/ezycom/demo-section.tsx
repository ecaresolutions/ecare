"use client";

import React, { useState } from "react";
import * as Icons from "lucide-react";

interface DemoItem {
  title: string;
  edition: string;
  category: string;
  image: string;
  liveUrl: string;
  adminUrl: string;
  features: string[];
  gradient: string;
}

const demos: DemoItem[] = [
  {
    title: "Gadgetshob v2.0",
    edition: "wordpress",
    category: "Electronics & Tech",
    image: "🎧",
    liveUrl: "https://gadgetshob.ezycom.co",
    adminUrl: "https://gadgetshob.ezycom.co/wp-admin",
    features: ["1-Click easy checkout", "Speed score 99+", "SMS OTP Verification"],
    gradient: "from-blue-500/5 to-indigo-500/5 border-blue-500/10 hover:border-blue-500/30"
  },
  {
    title: "Halalfoods v2.0",
    edition: "wordpress",
    category: "Organic Grocery",
    image: "🥬",
    liveUrl: "https://halalfoods.ezycom.co",
    adminUrl: "https://halalfoods.ezycom.co/wp-admin",
    features: ["Quick Cart Drawer", "Smart Search Finder", "Delivery charge calculator"],
    gradient: "from-emerald-500/5 to-teal-500/5 border-emerald-500/10 hover:border-emerald-500/30"
  },
  {
    title: "Apple Studio v2.0",
    edition: "wordpress",
    category: "Premium Single Brand",
    image: "📱",
    liveUrl: "https://applestudio.ezycom.co",
    adminUrl: "https://applestudio.ezycom.co/wp-admin",
    features: ["Cinematic Product layout", "Interactive checkout", "CAPI Ads tracking"],
    gradient: "from-rose-500/5 to-pink-500/5 border-rose-500/10 hover:border-rose-500/30"
  },
  {
    title: "Fabri Life Style v2.0",
    edition: "wordpress",
    category: "Fashion & Apparel",
    image: "👕",
    liveUrl: "https://fabrilifestyle.ezycom.co",
    adminUrl: "https://fabrilifestyle.ezycom.co/wp-admin",
    features: ["Multi-attribute swatch", "Size chart popup drawer", "Upsell recommendations"],
    gradient: "from-purple-500/5 to-fuchsia-500/5 border-purple-500/10 hover:border-purple-500/30"
  },
  {
    title: "Zeroshopi v2.0",
    edition: "wordpress",
    category: "Multi-category Retail",
    image: "🛍️",
    liveUrl: "https://zeroshopi.ezycom.co",
    adminUrl: "https://zeroshopi.ezycom.co/wp-admin",
    features: ["Mega Menu navigation", "Wishlist checkout", "Coupon Campaign manager"],
    gradient: "from-sky-500/5 to-cyan-500/5 border-sky-500/10 hover:border-sky-500/30"
  },
  {
    title: "GadgetShob (Laravel)",
    edition: "laravel",
    category: "High-Volume Tech",
    image: "⚡",
    liveUrl: "https://gadgetshob.laracol.com",
    adminUrl: "https://gadgetshob.laracol.com/admin",
    features: ["AI voice order bots", "VPS optimization", "Zero database locks"],
    gradient: "from-amber-500/5 to-orange-500/5 border-amber-500/10 hover:border-amber-500/30"
  },
  {
    title: "Levoleather (Laravel)",
    edition: "laravel",
    category: "Leather Goods",
    image: "💼",
    liveUrl: "https://levoleather.laracol.com",
    adminUrl: "https://levoleather.laracol.com/admin",
    features: ["Instant conversion funnel", "Advanced invoice print", "Courier API booking"],
    gradient: "from-orange-500/5 to-red-500/5 border-orange-500/10 hover:border-orange-500/30"
  },
  {
    title: "Amerraja (Laravel)",
    edition: "laravel",
    category: "Premium Lifestyle",
    image: "🎨",
    liveUrl: "https://amerraja.laracol.com",
    adminUrl: "https://amerraja.laracol.com/admin",
    features: ["Multi-warehouse inventory", "Net profit accountant", "Custom role access"],
    gradient: "from-indigo-500/5 to-violet-500/5 border-indigo-500/10 hover:border-indigo-500/30"
  },
  {
    title: "Govaly (Laravel)",
    edition: "laravel",
    category: "Beauty & Cosmetics",
    image: "💄",
    liveUrl: "https://govaly.laracol.com",
    adminUrl: "https://govaly.laracol.com/admin",
    features: ["Customer CRM database", "Auto order validation", "Speed under 0.4s"],
    gradient: "from-pink-500/5 to-rose-500/5 border-pink-500/10 hover:border-pink-500/30"
  },
  {
    title: "Fabri Life Style (Laravel)",
    edition: "laravel",
    category: "Laravel Apparel Engine",
    image: "👗",
    liveUrl: "https://fabrilifestyle.laracol.com",
    adminUrl: "https://fabrilifestyle.laracol.com/admin",
    features: ["High concurrent loads", "Real-time stock sync", "Advanced campaign builder"],
    gradient: "from-teal-500/5 to-emerald-500/5 border-teal-500/10 hover:border-teal-500/30"
  }
];

export default function EzyComDemos() {
  const [selectedDemoType, setSelectedDemoType] = useState<"all" | "wordpress" | "laravel">("all");

  const filteredDemos = demos.filter(
    (demo) => selectedDemoType === "all" || demo.edition === selectedDemoType
  );

  return (
    <div className="space-y-12">
      {/* Header and Filter Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-3 text-left">
          <span className="text-xs font-black text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Test Drive the Engines
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white !font-sans">
            Explore Live Demo Stores
          </h2>
          <p className="text-slate-400 text-sm font-medium">
            Test customer checkout flows, verify speed response times, and examine admin dashboards.
          </p>
        </div>
        
        {/* Filter Navigation */}
        <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl self-start lg:self-auto select-none">
          <button
            onClick={() => setSelectedDemoType("all")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus:outline-none ${
              selectedDemoType === "all"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Demos
          </button>
          <button
            onClick={() => setSelectedDemoType("wordpress")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus:outline-none ${
              selectedDemoType === "wordpress"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            WordPress CMS
          </button>
          <button
            onClick={() => setSelectedDemoType("laravel")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus:outline-none ${
              selectedDemoType === "laravel"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Laravel Engine
          </button>
        </div>
      </div>

      {/* Demos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDemos.map((demo, idx) => {
          const isLaravel = demo.edition === "laravel";
          return (
            <div
              key={idx}
              className={`bg-slate-950/40 border rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:bg-slate-950/65 transition-all duration-300 ${demo.gradient}`}
            >
              <div className="space-y-5">
                {/* Header Row */}
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-xl">
                    {demo.image}
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    isLaravel 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  }`}>
                    {isLaravel ? "Laravel" : "WordPress"}
                  </span>
                </div>

                {/* Info Text */}
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500 block">
                    {demo.category}
                  </span>
                  <h3 className="text-lg font-black text-white leading-snug">
                    {demo.title}
                  </h3>
                </div>

                {/* Features List */}
                <ul className="space-y-2 text-xs text-slate-400 font-medium border-t border-white/5 pt-4">
                  {demo.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-center gap-2">
                      <Icons.Check className={`w-3.5 h-3.5 shrink-0 ${isLaravel ? "text-emerald-400" : "text-blue-400"}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                <a 
                  href={demo.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-xs font-black text-white px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                    isLaravel
                      ? "bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30"
                      : "bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30"
                  }`}
                >
                  <span>Live Demo</span>
                  <Icons.ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a 
                  href={demo.adminUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-slate-400 hover:text-white hover:underline transition-all cursor-pointer"
                >
                  Admin Panel
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
