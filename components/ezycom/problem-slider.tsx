"use client";

import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";

interface ProblemCard {
  icon: string;
  title: string;
  desc: string;
  badge: string;
}

interface ProblemSliderProps {
  cards: ProblemCard[];
}

export default function EzyComProblemSlider({ cards }: ProblemSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = cards.length - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // Auto-play / Auto-slide effect loop (runs every 4 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full space-y-8">
      {/* Slider Viewport Container */}
      <div className="relative overflow-hidden w-full px-2 py-4">
        {/* Sliding Track */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {/* Card loops */}
          {cards.map((item, idx) => (
            <div
              key={idx}
              className="w-full shrink-0 px-2 sm:px-4"
            >
              {/* Desktop view: we can show them grouped, but on mobile/tablet they slide 1-by-1.
                  To support 3-in-a-row on desktop, 2-in-a-row on tablet, and 1-in-a-row on mobile naturally,
                  we can build a fully responsive slider container */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* We display the current card, and the next 2 cards offset dynamically to fill the grid row */}
                {[0, 1, 2].map((offset) => {
                  const cardIndex = (idx + offset) % cards.length;
                  const card = cards[cardIndex];
                  
                  // Hide extra cards on smaller screens to match grid columns
                  let visibilityClass = "";
                  if (offset === 1) visibilityClass = "hidden md:flex";
                  if (offset === 2) visibilityClass = "hidden lg:flex";

                  return (
                    <div
                      key={offset}
                      className={`relative overflow-hidden bg-white border border-slate-200/60 rounded-3xl p-8 hover:border-rose-200 hover:bg-rose-50/30 transition-all duration-300 group flex flex-col justify-between h-full min-h-[280px] ${visibilityClass}`}
                    >
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <div className="w-16 h-16 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-rose-100">
                            <img src={card.icon} alt={card.title} className="w-10 h-10 object-contain" />
                          </div>
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-full uppercase">
                            {card.badge}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 tracking-tight">{card.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">{card.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls (Arrows & Indicators) */}
      <div className="flex items-center justify-between px-4">
        {/* Indicators Dots */}
        <div className="flex gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index
                  ? "bg-rose-600 w-6"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="w-11 h-11 bg-white border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-rose-50 shadow-sm cursor-pointer"
          >
            <Icons.ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-11 h-11 bg-white border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-rose-50 shadow-sm cursor-pointer"
          >
            <Icons.ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
