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
}

// Custom thumbnail image URLs for each video slot
const thumbnails = [
  "https://cdn.saleecom.com/upload/static/landing/thumb/01.png",
  "https://cdn.saleecom.com/upload/static/banner/youtube_banner-1.webp",
  "https://cdn.saleecom.com/upload/static/banner/youtube_banner-1.webp"
];

// Editable default YouTube IDs for the playlist tabs
const videoIds = [
  "dQw4w9WgXcQ", // Tab 1: Admin Panel 시작
  "dQw4w9WgXcQ", // Tab 2: Dashboard & Overview
  "dQw4w9WgXcQ"  // Tab 3: Detailed Features
];

export default function EzyComVideoSection({ tTitle, tSub, tabs }: VideoSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const safeTabs = Array.isArray(tabs) ? tabs : [];

  const handleTabChange = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(false); // Reset play state when switching videos
  };

  return (
    <section className="py-14 px-6 bg-slate-50/50 border-y border-slate-200/40">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 
            className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight !font-sans"
            dangerouslySetInnerHTML={{ __html: tTitle }}
          />
          <p className="text-slate-500 font-medium text-base">
            {tSub}
          </p>
        </div>

        {/* Video Playlist Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Video Player Mockup */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 group">
              {isPlaying ? (
                <iframe
                  className="w-full h-full absolute inset-0"
                  src={`https://www.youtube.com/embed/${videoIds[activeIndex]}?autoplay=1`}
                  title={safeTabs[activeIndex]?.title || "EzyCom Video Guide"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 w-full h-full select-none">
                  {/* Thumbnail Image */}
                  <img
                    src={thumbnails[activeIndex]}
                    alt={safeTabs[activeIndex]?.title || "EzyCom Thumbnail"}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                  {/* Subtle dark overlay for better text/button contrast */}
                  <div className="absolute inset-0 bg-slate-950/30" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 hover:bg-primary-hover active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      <Icons.Play className="w-8 h-8 fill-current ml-1" />
                    </button>
                  </div>

                  {/* Bottom title display */}
                  <div className="z-10 text-white font-bold text-sm tracking-wide bg-slate-900/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 w-fit absolute bottom-6 left-6">
                    {safeTabs[activeIndex]?.title || "Demo Video"}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Playlist Selection */}
          <div className="lg:col-span-5 space-y-4">
            {safeTabs.map((tab, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleTabChange(idx)}
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer select-none group ${
                    isActive
                      ? "border-primary bg-white shadow-xl shadow-primary/5"
                      : "border-transparent bg-white hover:bg-slate-50/50 hover:border-slate-200/50"
                  }`}
                >
                  {/* Playlist item preview thumbnail */}
                  <div className="w-16 h-12 bg-slate-100 border border-slate-200/60 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden">
                    <img
                      src={thumbnails[idx]}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-slate-950/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isActive ? (
                        <Icons.Play className="w-4 h-4 text-white fill-current" />
                      ) : (
                        <Icons.Play className="w-3.5 h-3.5 text-white/80 fill-current opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-800 transition-colors group-hover:text-primary">
                      {tab.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {tab.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
