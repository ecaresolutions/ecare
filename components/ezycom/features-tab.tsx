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

// Custom icons list for the 8 cards in each tab
const iconList = [
  <Icons.Smartphone className="w-5 h-5 text-primary" key="1" />,
  <Icons.Zap className="w-5 h-5 text-amber-500" key="2" />,
  <Icons.Layout className="w-5 h-5 text-indigo-500" key="3" />,
  <Icons.Share2 className="w-5 h-5 text-sky-500" key="4" />,
  <Icons.Code2 className="w-5 h-5 text-emerald-500" key="5" />,
  <Icons.MousePointerClick className="w-5 h-5 text-primary" key="6" />,
  <Icons.Truck className="w-5 h-5 text-amber-500" key="7" />,
  <Icons.ShieldCheck className="w-5 h-5 text-emerald-500" key="8" />
];

const advancedIconList = [
  <Icons.Mic className="w-5 h-5 text-rose-500" key="1" />,
  <Icons.RefreshCw className="w-5 h-5 text-indigo-500" key="2" />,
  <Icons.Users className="w-5 h-5 text-sky-500" key="3" />,
  <Icons.ShoppingBag className="w-5 h-5 text-emerald-500" key="4" />,
  <Icons.MessageSquare className="w-5 h-5 text-primary" key="5" />,
  <Icons.BookOpen className="w-5 h-5 text-amber-500" key="6" />,
  <Icons.UserX className="w-5 h-5 text-rose-500" key="7" />,
  <Icons.Layers className="w-5 h-5 text-indigo-500" key="8" />
];

const techIconList = [
  <Icons.Globe className="w-5 h-5 text-sky-500" key="1" />,
  <Icons.Database className="w-5 h-5 text-emerald-500" key="2" />,
  <Icons.Palette className="w-5 h-5 text-indigo-500" key="3" />,
  <Icons.Search className="w-5 h-5 text-amber-500" key="4" />,
  <Icons.Link2 className="w-5 h-5 text-primary" key="5" />,
  <Icons.Cpu className="w-5 h-5 text-rose-500" key="6" />,
  <Icons.Server className="w-5 h-5 text-indigo-500" key="7" />,
  <Icons.Cloud className="w-5 h-5 text-sky-500" key="8" />
];

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

  const getActiveData = () => {
    switch (activeTab) {
      case "all":
        return { items: itemsAll, icons: iconList };
      case "advanced":
        return { items: itemsAdvanced, icons: advancedIconList };
      case "tech":
        return { items: itemsTech, icons: techIconList };
      default:
        return { items: itemsAll, icons: iconList };
    }
  };

  const { items, icons } = getActiveData();

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
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "all"
                ? "bg-primary text-white shadow-md shadow-primary/10"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tTabAll}
          </button>
          <button
            onClick={() => setActiveTab("advanced")}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "advanced"
                ? "bg-primary text-white shadow-md shadow-primary/10"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tTabAdvanced}
          </button>
          <button
            onClick={() => setActiveTab("tech")}
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

      {/* 8-Card Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/60 rounded-3xl p-7 hover:border-primary/30 hover:bg-rose-50/20 transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Card Icon Wrapper */}
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center transition-colors group-hover:bg-white group-hover:border-primary/20">
                {icons[idx] || icons[0]}
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

      {/* See More Button */}
      <div className="flex justify-center pt-2">
        <a href="#demos">
          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-primary text-primary hover:bg-primary hover:text-white rounded-full font-bold text-sm transition-all duration-300 shadow-sm shadow-primary/5 hover:scale-[1.02] active:scale-95 cursor-pointer">
            {tSeeMore}
            <Icons.ArrowRight className="w-4 h-4" />
          </button>
        </a>
      </div>
    </div>
  );
}
