"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function EzyComStickyNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsVisible(heroBottom < 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 shadow-sm py-3 px-6 hidden md:flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-800 dark:text-slate-200 text-lg tracking-tight">
              EzyCom <span className="text-xs bg-primary/5 dark:bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold border border-primary/10 dark:border-primary/20">CMS</span>
            </span>
          </div>
          <div className="flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#problem" className="hover:text-primary transition-colors font-semibold">Problems</a>
            <a href="#bangladesh" className="hover:text-primary transition-colors font-semibold">Local Features</a>
            <a href="#pricing" className="hover:text-primary transition-colors font-semibold">Editions</a>
            <a href="#comparison" className="hover:text-primary transition-colors font-semibold">Compare Table</a>
            <a href="#path" className="hover:text-primary transition-colors font-semibold">Migration Path</a>
            <a href="#demos" className="hover:text-primary transition-colors font-semibold">Demos</a>
            <a href="#faq" className="hover:text-primary transition-colors font-semibold">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#pricing">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-lg cursor-pointer">
                Get Started
              </Button>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
