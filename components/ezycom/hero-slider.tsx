"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://cdn.saleecom.com/upload/static/landing/LP_Image_1_PC.png",
  "https://cdn.saleecom.com/upload/static/landing/LP_Image_2_PC.png",
];

export default function EzyComHeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-2xl lg:max-w-none aspect-[16/9] rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_30px_60px_rgba(0,0,0,0.12)] bg-white">
      {/* Glow highlight */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-emerald-500/5 to-sky-500/5" />
      
      {/* Slider Viewport */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-slate-900/10 backdrop-blur-md px-3 py-1.5 rounded-full z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === index
                ? "bg-primary w-4"
                : "bg-slate-400/60 hover:bg-slate-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
