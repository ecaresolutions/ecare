"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSliderProps {
  images?: string[];
}

export default function EzyComHeroSlider({ images = [] }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const fallbackImages = [
    "https://cdn.saleecom.com/upload/static/landing/LP_Image_1_PC.png",
    "https://cdn.saleecom.com/upload/static/landing/LP_Image_2_PC.png",
  ];

  const activeImages = images && images.length > 0 ? images.filter(Boolean) : fallbackImages;

  useEffect(() => {
    if (activeImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activeImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeImages]);

  useEffect(() => {
    if (currentIndex >= activeImages.length) {
      setCurrentIndex(0);
    }
  }, [activeImages, currentIndex]);

  if (activeImages.length === 0) return null;

  return (
    <div className="relative w-full max-w-2xl lg:max-w-none aspect-[16/9] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-[0_30px_60px_rgba(0,0,0,0.12)] bg-white dark:bg-slate-900">
      {/* Glow highlight */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-emerald-500/5 to-sky-500/5" />
      
      {/* Slider Viewport */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={activeImages[currentIndex]}
            alt={`EzyCom Preview Mockup ${currentIndex + 1}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Slide Indicators (Inside) */}
      {activeImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-slate-900/10 dark:bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full z-20">
          {activeImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index
                  ? "bg-primary w-4"
                  : "bg-slate-400/60 dark:bg-slate-600/60 hover:bg-slate-500 dark:hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
