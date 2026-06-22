"use client";

import * as React from "react";
import Image from "next/image";
// No Lucide imports needed anymore

interface Testimonial {
  _id: string;
  author: string;
  company: string;
  quote: string;
  rating?: number;
  avatar?: string;
  videoUrl?: string;
  content?: string;
}

interface TestimonialsGridProps {
  testimonials: Testimonial[];
}

const getYouTubeId = (url: string) => {
  if (!url) return "";
  if (url.includes("/shorts/")) {
    const parts = url.split("/shorts/");
    if (parts[1]) {
      return parts[1].split(/[?#]/)[0];
    }
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : "";
};

export default function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  const [unmutedId, setUnmutedId] = React.useState<string | null>(null);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.filter(t => !!t.videoUrl).map((test) => {
          const videoId = getYouTubeId(test.videoUrl || "");
          const isUnmuted = unmutedId === test._id;

          return (
            <div 
              key={test._id} 
              className="flex flex-col p-1.5 bg-white dark:bg-[#121824] border border-border/30 rounded-[7px] shadow-[0_15px_45px_rgba(0,0,0,0.015)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:scale-[1.005] transition-all duration-300 relative overflow-hidden group"
            >
              <div className="relative w-full aspect-[9/16] rounded-[7px] overflow-hidden bg-slate-900 border border-border/10 select-none">
                {videoId ? (
                  <>
                    <iframe
                      src={
                        isUnmuted
                          ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&controls=0&playsinline=1&modestbranding=1&rel=0`
                          : `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&playsinline=1&modestbranding=1&rel=0`
                      }
                      className="w-full h-full border-none pointer-events-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                    
                    {/* Capture click overlay to toggle mute state */}
                    <div 
                      onClick={() => setUnmutedId(isUnmuted ? null : test._id)}
                      className="absolute inset-0 bg-transparent cursor-pointer z-10"
                    />
                  </>
                ) : test.avatar ? (
                  <Image 
                    src={test.avatar} 
                    alt={test.author} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 dark:opacity-80"
                    sizes="(max-w-768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white/40 text-xl font-bold">
                    {test.author}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
