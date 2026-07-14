"use client";

import React, { useState } from "react";
import * as Icons from "lucide-react";

interface VideoTab {
  title: string;
  desc: string;
}

interface VideoSectionProps {
  tTitle: string;
  tSub: string;
  tabs: VideoTab[];
  locale?: string;
}

// Custom thumbnail image URLs for each video slot
const thumbnails = [
  "https://cdn.saleecom.com/upload/static/landing/thumb/01.png",
  "https://cdn.saleecom.com/upload/static/banner/youtube_banner-1.webp",
  "https://cdn.saleecom.com/upload/static/banner/youtube_banner-1.webp",
  "https://cdn.saleecom.com/upload/static/landing/thumb/01.png"
];

// Editable default YouTube IDs for the playlist tabs
const videoIds = [
  "dQw4w9WgXcQ", // Tab 1: Admin Panel
  "dQw4w9WgXcQ", // Tab 2: Dashboard & Overview
  "dQw4w9WgXcQ", // Tab 3: Detailed Features
  "dQw4w9WgXcQ"  // Tab 4: Front View Details
];

export default function EzyComVideoSection({ tTitle, tSub, tabs, locale }: VideoSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const safeTabs = Array.isArray(tabs) ? tabs : [];

  return (
    <section className="py-16 px-6 bg-slate-50/50 dark:bg-[#0b0f19]/40 border-y border-slate-200/40 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-black text-primary bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 px-4 py-1.5 rounded-full uppercase tracking-wider block w-fit mx-auto">
            {locale === "bn" ? "সিস্টেম ভিডিও ট্যুর" : "System Walkthrough"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight relative z-10 font-sans">
            {locale === "bn" ? (
              <>
                সিস্টেম <span className="text-primary">ভিডিও ট্যুর</span>
              </>
            ) : (
              <>
                System <span className="text-primary">Walkthrough</span>
              </>
            )}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base max-w-xl mx-auto">
            {tSub}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {safeTabs.map((tab, idx) => {
            // Determine Bento Span sizes:
            // Tab 0 (Admin Panel) -> spans 4 cols on lg, spans 2 on md
            // Tab 1 (Dashboard) -> spans 2 cols on lg, spans 1 on md
            // Tab 2 (Features) -> spans 2 cols on lg, spans 1 on md
            // Tab 3 (Front View) -> spans 4 cols on lg, spans 2 on md
            const isLarge = idx === 0 || idx === 3;
            const spanClass = isLarge 
              ? "lg:col-span-4 md:col-span-2 col-span-1" 
              : "lg:col-span-2 md:col-span-1 col-span-1";

            return (
              <div
                key={idx}
                onClick={() => setSelectedVideo(videoIds[idx])}
                className={`group relative bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:border-primary/20 dark:hover:border-primary/30 transition-all duration-300 cursor-pointer select-none ${spanClass}`}
              >
                {/* Visual Preview Thumbnail container */}
                <div className={`relative w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 ${isLarge ? "aspect-[21/9]" : "aspect-[4/3]"} mb-6`}>
                  <img
                    src={thumbnails[idx]}
                    alt={tab.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Backdrop Gradient Overlay */}
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300" />
                  
                  {/* Pulsing Play Button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/95 dark:bg-slate-900/95 text-primary rounded-full flex items-center justify-center shadow-lg group-hover:bg-primary group-hover:text-white group-hover:scale-115 active:scale-95 transition-all duration-300">
                      <Icons.Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Text Content inside Card */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-primary bg-primary/5 dark:bg-primary/10 px-2.5 py-1 rounded-full w-fit block">
                    {idx === 0 && (locale === "bn" ? "পার্ট ০১: সেটিংস" : "Part 01: Setup")}
                    {idx === 1 && (locale === "bn" ? "পার্ট ০২: ড্যাশবোর্ড" : "Part 02: Overview")}
                    {idx === 2 && (locale === "bn" ? "পার্ট ০৩: ফিচারস" : "Part 03: Features")}
                    {idx === 3 && (locale === "bn" ? "পার্ট ০৪: কাস্টমার ভিউ" : "Part 04: UI/UX")}
                  </span>
                  <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-200 transition-colors group-hover:text-primary leading-snug">
                    {tab.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {tab.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cinematic Modal Lightbox Overlay */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          {/* Backdrop Closer */}
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setSelectedVideo(null)} 
          />
          
          {/* Modal Container */}
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10 aspect-video scale-[0.98] transition-transform duration-300">
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-primary font-bold flex items-center gap-1.5 cursor-pointer transition-colors focus:outline-none"
            >
              <Icons.X className="w-5 h-5" />
              <span className="text-xs tracking-wider uppercase">Close</span>
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="EzyCom Feature Guide"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
