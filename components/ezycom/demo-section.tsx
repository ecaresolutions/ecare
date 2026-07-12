"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";

interface DemoItem {
  title: string;
  edition: string;
  image: string;
  liveUrl: string;
  adminUrl: string;
  features: string[];
  gradient: string;
}

const demos: DemoItem[] = [
  {
    title: "WordPress - Classic Retail Theme",
    edition: "wordpress",
    image: "🛍️",
    liveUrl: "#",
    adminUrl: "#",
    features: ["Super Fast Checkout", "Multilingual Support", "Courier API Ready"],
    gradient: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20",
  },
  {
    title: "WordPress - Grocery & Daily Needs",
    edition: "wordpress",
    image: "🥬",
    liveUrl: "#",
    adminUrl: "#",
    features: ["Cart Drawer", "Quick Search & Filter", "WhatsApp Order OTP"],
    gradient: "from-teal-500/10 to-cyan-500/10 border-teal-500/20",
  },
  {
    title: "WordPress - Fashion & Lifestyle",
    edition: "wordpress",
    image: "👗",
    liveUrl: "#",
    adminUrl: "#",
    features: ["Size & Color Swatches", "Video Cart Showcase", "Facebook Pixel"],
    gradient: "from-cyan-500/10 to-sky-500/10 border-cyan-500/20",
  },
  {
    title: "Laravel - Mega Mall Automation",
    edition: "laravel",
    image: "⚡",
    liveUrl: "#",
    adminUrl: "#",
    features: ["AI Voice Order Confirmation", "Advanced Multi-Warehouse Inventory", "Meta Ads Integration"],
    gradient: "from-sky-500/10 to-blue-500/10 border-sky-500/20",
  },
  {
    title: "Laravel - Single Product Landing",
    edition: "laravel",
    image: "🔥",
    liveUrl: "#",
    adminUrl: "#",
    features: ["One-Click Checkout", "Up-sell popup", "Anti-Fraud Verification"],
    gradient: "from-blue-500/10 to-indigo-500/10 border-blue-500/20",
  },
  {
    title: "Laravel - Electronic & Gadgets CMS",
    edition: "laravel",
    image: "🎧",
    liveUrl: "#",
    adminUrl: "#",
    features: ["Serial Number Tracking", "EMI Calculator", "Staff Role-Based Permissions"],
    gradient: "from-indigo-500/10 to-emerald-500/10 border-indigo-500/20",
  },
];

export default function EzyComDemos() {
  const [selectedDemoType, setSelectedDemoType] = useState<"all" | "wordpress" | "laravel">("all");

  const filteredDemos = demos.filter(
    (demo) => selectedDemoType === "all" || demo.edition === selectedDemoType
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-wider">Test Drive the Engines</span>
          <h2 className="text-3xl font-extrabold tracking-tight">Explore Live EzyCom Stores</h2>
          <p className="text-slate-400 text-sm font-medium">Test customer checkout flows, checkout drawer responses, and view backend admin panels.</p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl">
          {(["all", "wordpress", "laravel"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedDemoType(type)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedDemoType === type
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDemos.map((demo, idx) => (
          <div
            key={idx}
            className={`bg-white/5 border rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 ${demo.gradient}`}
          >
            <div className="space-y-4">
              <div className="text-4xl">{demo.image}</div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase border border-emerald-500/20">
                  {demo.edition} Edition
                </span>
                <h3 className="text-base font-extrabold text-white mt-2">{demo.title}</h3>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-400 font-medium">
                {demo.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-center gap-1.5">
                    <Icons.Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-white/5">
              <a href={demo.liveUrl}>
                <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer">
                  Live Demo
                </Button>
              </a>
              <a href={demo.adminUrl}>
                <Button size="sm" variant="outline" className="w-full border-white/15 hover:bg-white/5 text-slate-300 font-bold text-xs cursor-pointer">
                  Admin Demo
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
