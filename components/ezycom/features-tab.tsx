"use client";

import React from "react";
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
  locale?: string;
}

// --- Custom Mockup Graphics ---

// Graphic 1: Mobile UI/UX Mockup
const MobileMockup = () => (
  <div className="relative w-full h-44 flex items-center justify-center bg-slate-50/80 rounded-2xl overflow-hidden border border-slate-100/80 select-none">
    {/* Phone Device container */}
    <div className="w-[125px] h-[200px] bg-slate-900 border-4 border-slate-800 rounded-[1.8rem] relative shadow-lg translate-y-6 overflow-hidden">
      {/* Phone Notch */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-slate-800 rounded-full" />
      {/* App checkout screen mockup */}
      <div className="p-2.5 pt-5 space-y-1.5 text-[7px] text-slate-400">
        <div className="flex justify-between items-center border-b border-slate-800 pb-1">
          <span className="font-bold text-white">EzyCom Pay</span>
          <span className="bg-emerald-500/20 text-emerald-400 px-1 py-0.5 rounded text-[5px]">৳১,২০০</span>
        </div>
        <div className="space-y-1">
          <div className="h-1 bg-slate-800 rounded w-full" />
          <div className="h-1 bg-slate-800 rounded w-5/6" />
          <div className="h-1 bg-slate-800 rounded w-2/3" />
        </div>
        <div className="h-4.5 bg-primary text-white font-bold flex items-center justify-center rounded-md mt-2 text-[6px]">
          কনফার্ম অর্ডার করুন
        </div>
      </div>
    </div>

    {/* Floating Success widget */}
    <div className="absolute top-6 right-4 bg-white border border-slate-200/50 shadow-md rounded-xl p-2 flex items-center gap-1.5 rotate-[6deg]">
      <div className="w-5 h-5 bg-rose-50 rounded-full flex items-center justify-center">
        <Icons.CheckCircle2 className="w-3 h-3 text-primary" />
      </div>
      <div className="text-left leading-tight">
        <p className="text-[8px] font-black text-slate-800">৳১,৫০০ সাশ্রয়</p>
        <p className="text-[6px] font-medium text-slate-400">অটো ডিসকাউন্ট</p>
      </div>
    </div>

    {/* Floating Rating Widget */}
    <div className="absolute top-14 left-4 bg-white border border-slate-200/50 shadow-md rounded-xl p-1.5 flex items-center gap-1 rotate-[-8deg]">
      <Icons.Star className="w-2.5 h-2.5 text-amber-400 fill-current" />
      <span className="text-[8px] font-black text-slate-700">4.9/5 Review</span>
    </div>
  </div>
);

// Graphic 2: Super-fast load dial
const SpeedMockup = () => (
  <div className="relative w-full h-44 flex items-center justify-center bg-slate-50/80 rounded-2xl overflow-hidden border border-slate-100/80 select-none">
    <div className="relative w-28 h-28 flex items-center justify-center">
      {/* Speedometer Circle arc SVG */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#e2e8f0"
          strokeWidth="5"
          fill="transparent"
          strokeDasharray="188 251"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#speedGradient)"
          strokeWidth="7"
          fill="transparent"
          strokeDasharray="150 251"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>

      {/* Speed tag metrics */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-black text-slate-800">0.5s</span>
        <span className="text-[7px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100 mt-0.5">Speed Pass</span>
      </div>
    </div>

    {/* Speedometer metrics widget bubble */}
    <div className="absolute top-5 left-4 bg-white border border-slate-200/50 shadow-sm rounded-xl px-2 py-1 flex items-center gap-1 rotate-[-5deg]">
      <div className="w-3.5 h-3.5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[8px] font-black">99</div>
      <span className="text-[7px] font-bold text-slate-500">PageSpeed Score</span>
    </div>
  </div>
);

// Graphic 3: Overlapping sales templates stacking
const LandingPageMockup = () => (
  <div className="relative w-full h-44 flex items-center justify-center bg-slate-50/80 rounded-2xl overflow-hidden border border-slate-100/80 select-none">
    <div className="relative w-44 h-28">
      {/* Layer 1 (Backmost) */}
      <div className="absolute bottom-0 left-3 w-36 h-20 bg-white/70 border border-slate-200/40 rounded-xl shadow-sm transform -rotate-6 transition-transform duration-300 group-hover:-translate-y-1" />
      {/* Layer 2 (Middle) */}
      <div className="absolute bottom-1.5 left-5 w-36 h-20 bg-white/90 border border-slate-200/60 rounded-xl shadow-sm transform rotate-3 transition-transform duration-300 group-hover:-translate-y-1.5" />
      {/* Layer 3 (Frontmost) */}
      <div className="absolute top-1.5 left-3 w-40 h-22 bg-white border border-slate-200 shadow-md rounded-xl p-2.5 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-[6px] font-bold text-primary">Template #09</span>
            <div className="flex gap-0.5">
              <span className="w-1 h-1 bg-slate-200 rounded-full" />
              <span className="w-1 h-1 bg-slate-200 rounded-full" />
            </div>
          </div>
          <div className="h-1.5 bg-slate-100 rounded w-full" />
          <div className="h-1 bg-slate-50 rounded w-5/6" />
        </div>
        <div className="flex justify-between items-center pt-1 border-t border-slate-100">
          <span className="text-[5px] text-slate-400 font-medium">1-Click Clone</span>
          <span className="text-[5px] font-bold text-emerald-500 bg-emerald-50 px-1 py-0.2 rounded">Live</span>
        </div>
      </div>
    </div>
  </div>
);

// Graphic 4: FB CAPI server tracking chart comparison
const PixelCapiMockup = () => (
  <div className="relative w-full h-full min-h-[160px] flex items-center justify-center bg-slate-50/80 rounded-2xl overflow-hidden border border-slate-100/80 p-5 select-none">
    <div className="w-full flex flex-col sm:flex-row items-center gap-4">
      {/* Left side events matched details */}
      <div className="w-full sm:w-1/2 space-y-2">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-bold text-emerald-800">CAPI Server Event</span>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          <p className="text-base font-black text-emerald-600 mt-0.5">100% Match</p>
          <p className="text-[6px] font-medium text-slate-400">Bypasses iOS 14+ Ad-Blockers</p>
        </div>

        <div className="bg-rose-50 border border-rose-100 rounded-xl p-2.5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-bold text-rose-800">Browser Pixel</span>
            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
          </div>
          <p className="text-base font-black text-rose-600 mt-0.5">Blocked (45%)</p>
          <p className="text-[6px] font-medium text-slate-400">Lost due to Safari & Chrome extensions</p>
        </div>
      </div>

      {/* Right side line graph chart wrapper */}
      <div className="w-full sm:w-1/2 bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm h-32 flex flex-col justify-between">
        <div className="flex justify-between items-center border-b border-slate-100 pb-1">
          <span className="text-[7px] font-bold text-slate-700">Conversion Match</span>
          <span className="text-[7px] text-emerald-500 font-extrabold">+24% Accuracy</span>
        </div>
        
        {/* Mock Graphic Path */}
        <div className="h-14 flex items-end relative pb-1">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50">
            <path
              d="M 5,45 Q 25,18 45,30 T 85,5"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 5,45 Q 25,18 45,30 T 85,5 L 85,45 L 5,45 Z"
              fill="url(#capiGradient)"
              opacity="0.1"
            />
            <path
              d="M 5,45 Q 25,30 45,35 T 85,25"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="1.5"
              strokeDasharray="2.5 2.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="capiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="flex justify-between text-[5px] font-bold text-slate-400">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  </div>
);

// Graphic 5: Courier automated delivery invoice calculator
const CourierPaymentMockup = () => (
  <div className="relative w-full h-full min-h-[160px] flex items-center justify-center bg-slate-50/80 rounded-2xl overflow-hidden border border-slate-100/80 p-5 select-none">
    <div className="w-full flex flex-col sm:flex-row items-center gap-4">
      {/* Left side: invoice calculations */}
      <div className="w-full sm:w-1/2 bg-white border border-slate-200 shadow-sm rounded-xl p-2.5 h-32 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex justify-between items-center border-b border-slate-100 pb-1">
            <span className="text-[7px] font-bold text-slate-800">Checkout order invoice</span>
            <span className="text-[5px] text-slate-400">#EC-2091</span>
          </div>
          <div className="flex justify-between text-[6px] text-slate-500 pt-0.5">
            <span>প্রোডাক্ট প্রাইস</span>
            <span>৳১,২০০</span>
          </div>
          <div className="flex justify-between text-[6px] text-slate-500">
            <span>ডেলিভারি চার্জ</span>
            <span className="text-emerald-500 font-bold">৳১২০ (পেইড)</span>
          </div>
        </div>
        
        <div className="border-t border-slate-100 pt-1.5 flex justify-between items-center">
          <span className="text-[7px] font-black text-slate-800">মোট পরিশোধ</span>
          <span className="text-[8px] font-black text-primary">৳১২০</span>
        </div>
        
        <div className="flex gap-1 pt-1 border-t border-slate-50">
          <span className="text-[5px] font-extrabold bg-pink-100 text-pink-600 px-1 py-0.2 rounded">bkash</span>
          <span className="text-[5px] font-extrabold bg-orange-100 text-orange-600 px-1 py-0.2 rounded">Nagad</span>
        </div>
      </div>

      {/* Right side: Auto courier dispatcher tracking indicators */}
      <div className="w-full sm:w-1/2 space-y-2">
        <div className="bg-white border border-slate-200 rounded-xl p-2 flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
            <Icons.Truck className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-left leading-tight">
            <p className="text-[8px] font-bold text-slate-800">Pathao Courier</p>
            <p className="text-[6px] text-emerald-500 font-extrabold">1-Click Auto Dispatch</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-2 flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
            <Icons.CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-left leading-tight">
            <p className="text-[8px] font-bold text-slate-800">Steadfast Courier</p>
            <p className="text-[6px] text-emerald-500 font-extrabold">Status Sync success</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function EzyComFeaturesTab({
  tTitle,
  tSub,
  itemsAll,
  locale
}: FeaturesTabProps) {
  const safeItems = Array.isArray(itemsAll) ? itemsAll : [];

  // Map translations to local cards to ensure we get matching translations
  const card1 = safeItems[0] || { title: "Mobile Friendly UI/UX", desc: "Tailored shopping experiences on all devices." };
  const card2 = safeItems[1] || { title: "Super-fast 0.5s Load Time", desc: "Loads in half a second to boost conversions." };
  const card3 = safeItems[2] || { title: "Unlimited Landing Page", desc: "Build unlimited landing pages easily." };
  const card4 = safeItems[3] || { title: "Facebook Pixel & Server Tracking", desc: "Accurate tracking with CAPI server events." };
  
  // Custom combined courier feature card values
  const card5Title = locale === "bn" 
    ? "অটোমেটেড কুরিয়ার ও অগ্রিম ডেলিভারি পেমেন্ট" 
    : "Automated Courier & Delivery Charge Payments";
  const card5Desc = locale === "bn"
    ? "চেকআউটে বিকাশ/নগদে ডেলিভারি চার্জ পেমেন্ট কালেকশন এবং সরাসরি কুরিয়ার প্যানেল অটোমেশন।"
    : "Collect delivery charges upfront via automated gateways and dispatch to couriers in one click.";

  return (
    <div className="space-y-16">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold text-primary bg-rose-50 border border-rose-100 px-4 py-1.5 rounded-full uppercase tracking-wider">
          {locale === "bn" ? "ফিচার সমূহ" : "Core Capabilities"}
        </span>
        <h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight !font-sans"
          dangerouslySetInnerHTML={{ __html: tTitle }}
        />
        <p className="text-slate-500 font-medium text-base sm:text-lg">
          {tSub}
        </p>
      </div>

      {/* Bento Grid layout */}
      <div className="space-y-6">
        {/* Row 1: 3 Columns Grid (Equal sized cards with large top illustrations) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Mobile UI/UX */}
          <div className="group bg-white border border-slate-200/60 rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:border-primary/20 transition-all duration-300">
            <div className="space-y-6">
              <MobileMockup />
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-800 tracking-tight transition-colors group-hover:text-primary leading-snug">
                  {card1.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {card1.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Super-fast 0.5s Load Time */}
          <div className="group bg-white border border-slate-200/60 rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:border-primary/20 transition-all duration-300">
            <div className="space-y-6">
              <SpeedMockup />
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-800 tracking-tight transition-colors group-hover:text-primary leading-snug">
                  {card2.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {card2.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Unlimited Landing Pages */}
          <div className="group bg-white border border-slate-200/60 rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:border-primary/20 transition-all duration-300">
            <div className="space-y-6">
              <LandingPageMockup />
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-800 tracking-tight transition-colors group-hover:text-primary leading-snug">
                  {card3.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {card3.desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: 2 Columns Grid (Wider cards with side-by-side split layouts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 4: FB CAPI Conversion Tracking */}
          <div className="group bg-white border border-slate-200/60 rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:border-primary/20 transition-all duration-300">
            <div className="flex flex-col xl:flex-row gap-6 items-stretch h-full">
              <div className="xl:w-1/2 flex flex-col justify-center space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-primary bg-primary/5 px-2.5 py-1 rounded-full w-fit block mb-1">
                  {locale === "bn" ? "অ্যাডভান্সড ট্র্যাকিং" : "Conversion Boost"}
                </span>
                <h3 className="text-xl font-black text-slate-800 tracking-tight transition-colors group-hover:text-primary leading-snug">
                  {card4.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {card4.desc}
                </p>
              </div>
              <div className="xl:w-1/2 flex items-center">
                <PixelCapiMockup />
              </div>
            </div>
          </div>

          {/* Card 5: Courier Automated Deliveries */}
          <div className="group bg-white border border-slate-200/60 rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:border-primary/20 transition-all duration-300">
            <div className="flex flex-col xl:flex-row gap-6 items-stretch h-full">
              <div className="xl:w-1/2 flex flex-col justify-center space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full w-fit block mb-1">
                  {locale === "bn" ? "অটোমেশন ইন্টিগ্রেশন" : "Workflow Automation"}
                </span>
                <h3 className="text-xl font-black text-slate-800 tracking-tight transition-colors group-hover:text-primary leading-snug">
                  {card5Title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {card5Desc}
                </p>
              </div>
              <div className="xl:w-1/2 flex items-center">
                <CourierPaymentMockup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
