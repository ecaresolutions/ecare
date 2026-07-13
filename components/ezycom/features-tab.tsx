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

// --- MICRO DEMO COMPONENTS FOR BENTO CARDS ---

const SpeedometerDemo = () => {
  return (
    <div className="w-full h-24 bg-slate-50 rounded-2xl flex flex-col justify-center items-center relative overflow-hidden border border-slate-100 mt-4 select-none">
      <div className="text-3xl font-black text-emerald-500 tracking-tight flex items-baseline">
        <span>0.38</span>
        <span className="text-xs font-bold text-slate-400 ml-0.5">sec</span>
      </div>
      <div className="flex items-center gap-1.5 mt-1">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
        <span className="text-[9px] font-extrabold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">Grade A+ (99%)</span>
      </div>
    </div>
  );
};

const CheckoutDemo = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  return (
    <div className="w-full h-24 bg-slate-50 rounded-2xl flex flex-col justify-center items-center px-4 relative overflow-hidden border border-slate-100 mt-4 select-none">
      {status === "idle" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setStatus("loading");
            setTimeout(() => setStatus("success"), 1200);
          }}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-md shadow-rose-500/10 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none"
        >
          <Icons.ShoppingCart className="w-3.5 h-3.5" />
          <span>১-ক্লিক অর্ডার করুন</span>
        </button>
      )}
      {status === "loading" && (
        <div className="flex items-center gap-2 text-rose-500">
          <Icons.Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-xs font-extrabold tracking-wide">অর্ডার প্রসেস হচ্ছে...</span>
        </div>
      )}
      {status === "success" && (
        <div className="flex items-center gap-2 text-emerald-500 animate-bounce">
          <Icons.CheckCircle2 className="w-5 h-5 fill-current text-emerald-500" />
          <span className="text-xs font-black tracking-wide">অর্ডার সফল হয়েছে! 🎉</span>
        </div>
      )}
    </div>
  );
};

const CapiDemo = () => {
  const [events, setEvents] = useState<string[]>([
    "[CAPI] Event: PageView - Status: Success ✅",
    "[CAPI] Event: AddToCart - Status: Sent ✅"
  ]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const newEvents = [
        "[CAPI] Event: PageView - Status: Success ✅",
        "[CAPI] Event: AddToCart - Status: Sent ✅",
        "[CAPI] Event: InitiateCheckout - Status: Synced ✅",
        "[CAPI] Event: Purchase - Value: ৳1,600 ✅"
      ];
      setEvents((prev) => {
        if (prev.length >= 4) return [newEvents[0], newEvents[1]];
        return [...prev, newEvents[prev.length]];
      });
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-24 bg-slate-900 rounded-2xl p-3.5 flex flex-col justify-start overflow-hidden border border-slate-800 font-mono text-[9px] mt-4 select-none text-emerald-400">
      <div className="text-slate-400 text-[8px] font-bold border-b border-slate-800 pb-1 mb-1.5 flex items-center justify-between">
        <span>Meta Server API Console</span>
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
      </div>
      <div className="space-y-1 overflow-y-auto max-h-[50px] scrollbar-none">
        {events.map((ev, idx) => (
          <div key={idx} className="truncate">{ev}</div>
        ))}
      </div>
    </div>
  );
};

const MobileDemo = () => {
  return (
    <div className="w-full h-24 bg-slate-50 rounded-2xl flex items-center justify-center relative overflow-hidden border border-slate-100 mt-4 select-none">
      <div className="w-16 h-20 bg-white border border-slate-200 rounded-t-lg shadow-sm p-1.5 flex flex-col justify-between absolute bottom-[-10px] transform rotate-[4deg]">
        <div className="w-full h-8 bg-slate-100 rounded" />
        <div className="w-full h-1.5 bg-primary/20 rounded" />
        <div className="w-full h-2.5 bg-primary rounded" />
      </div>
      <div className="w-16 h-20 bg-white border border-slate-200 rounded-t-lg shadow-md p-1.5 flex flex-col justify-between absolute bottom-[-10px] transform -rotate-[4deg] z-10">
        <div className="w-full h-8 bg-slate-100 rounded flex items-center justify-center">
          <span className="text-[6px] font-black text-slate-400">Checkout</span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-full h-2.5 bg-rose-500 rounded" />
      </div>
    </div>
  );
};

const SecurityDemo = () => {
  return (
    <div className="w-full h-24 bg-slate-50 rounded-2xl flex items-center justify-center gap-3 relative overflow-hidden border border-slate-100 mt-4 select-none">
      <Icons.ShieldCheck className="w-8 h-8 text-emerald-500 fill-emerald-500/10" />
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">SSL Encrypted</span>
        <span className="text-[9px] font-bold text-slate-400">AES-256 Connection</span>
      </div>
    </div>
  );
};

const TemplatesDemo = () => {
  return (
    <div className="w-full h-24 bg-slate-50 rounded-2xl flex items-center justify-center relative overflow-hidden border border-slate-100 mt-4 select-none">
      <div className="w-20 h-14 bg-white border border-slate-200 rounded-lg shadow-sm p-1 absolute transform -rotate-12 translate-x-[-15px]" />
      <div className="w-20 h-14 bg-white border border-slate-200 rounded-lg shadow-sm p-1 absolute transform rotate-12 translate-x-[15px]" />
      <div className="w-20 h-14 bg-white border border-slate-300 rounded-lg shadow-md p-1 absolute z-10 flex flex-col justify-between">
        <div className="w-full h-4 bg-slate-100 rounded" />
        <div className="flex justify-between items-center">
          <div className="w-4 h-4 bg-primary/20 rounded" />
          <div className="w-8 h-2 bg-primary rounded" />
        </div>
      </div>
    </div>
  );
};

// --- ICON SELECTOR ---

const getIconForTitle = (title: string) => {
  const t = (title || "").toLowerCase();
  
  if (t.includes("mobile") || t.includes("মোবাইল")) {
    return <Icons.Smartphone className="w-5 h-5 text-primary" />;
  }
  if (t.includes("fast") || t.includes("ফাস্ট") || t.includes("গতি") || t.includes("লোড টাইম")) {
    return <Icons.Zap className="w-5 h-5 text-amber-500" />;
  }
  if (t.includes("landing") || t.includes("ল্যান্ডিং")) {
    return <Icons.Layers className="w-5 h-5 text-indigo-500" />;
  }
  if (t.includes("pixel") || t.includes("পিক্সেল") || t.includes("capi")) {
    return <Icons.Share2 className="w-5 h-5 text-sky-500" />;
  }
  if (t.includes("javascript") || t.includes("node.js") || t.includes("backend") || t.includes("ব্যাকএন্ড")) {
    return <Icons.Code2 className="w-5 h-5 text-emerald-500" />;
  }
  if (t.includes("checkout") || t.includes("চেকআউট")) {
    return <Icons.MousePointerClick className="w-5 h-5 text-primary" />;
  }
  if (t.includes("courier") || t.includes("কুরিয়ার") || t.includes("ডেলিভারি")) {
    return <Icons.Truck className="w-5 h-5 text-emerald-500" />;
  }
  if (t.includes("secure") || t.includes("সুরক্ষা") || t.includes("security") || t.includes("প্রাইভেসি") || t.includes("সিকিউরিটি")) {
    return <Icons.ShieldCheck className="w-5 h-5 text-emerald-500" />;
  }
  if (t.includes("fake") || t.includes("ফেক")) {
    return <Icons.UserX className="w-5 h-5 text-rose-500" />;
  }
  if (t.includes("invoice") || t.includes("ইনভয়েস")) {
    return <Icons.FileText className="w-5 h-5 text-slate-500" />;
  }
  if (t.includes("order") || t.includes("অর্ডার")) {
    return <Icons.ClipboardList className="w-5 h-5 text-indigo-500" />;
  }
  if (t.includes("chat") || t.includes("চ্যাট")) {
    return <Icons.MessageSquare className="w-5 h-5 text-sky-500" />;
  }
  if (t.includes("domain") || t.includes("ডোমেইন")) {
    return <Icons.Globe className="w-5 h-5 text-primary" />;
  }
  if (t.includes("stock") || t.includes("স্টক") || t.includes("ইনভেন্টরি")) {
    return <Icons.Boxes className="w-5 h-5 text-amber-500" />;
  }
  if (t.includes("admin") || t.includes("অ্যাডমিন")) {
    return <Icons.Users className="w-5 h-5 text-indigo-500" />;
  }
  if (t.includes("sms") || t.includes("এসএমএস")) {
    return <Icons.MessageSquare className="w-5 h-5 text-sky-500" />;
  }
  if (t.includes("payment") || t.includes("পেমেন্ট") || t.includes("গেটওয়ে")) {
    return <Icons.CreditCard className="w-5 h-5 text-emerald-500" />;
  }
  if (t.includes("analytics") || t.includes("অ্যানালিটিক্স")) {
    return <Icons.BarChart3 className="w-5 h-5 text-indigo-500" />;
  }
  if (t.includes("wholesale") || t.includes("হোলসেল") || t.includes("রিটেইল")) {
    return <Icons.Store className="w-5 h-5 text-amber-500" />;
  }
  if (t.includes("tracking") || t.includes("ট্র্যাকিং")) {
    return <Icons.MapPin className="w-5 h-5 text-rose-500" />;
  }
  if (t.includes("seo") || t.includes("সার্চ")) {
    return <Icons.Search className="w-5 h-5 text-sky-500" />;
  }
  
  return <Icons.HelpCircle className="w-5 h-5 text-primary" />;
};

const renderDemoForTitle = (title: string) => {
  const t = (title || "").toLowerCase();
  if (t.includes("mobile") || t.includes("মোবাইল")) {
    return <MobileDemo />;
  }
  if (t.includes("fast") || t.includes("speed") || t.includes("গতি") || t.includes("লোড টাইম")) {
    return <SpeedometerDemo />;
  }
  if (t.includes("checkout") || t.includes("চেকআউট")) {
    return <CheckoutDemo />;
  }
  if (t.includes("pixel") || t.includes("capi") || t.includes("পিক্সেল")) {
    return <CapiDemo />;
  }
  if (t.includes("landing") || t.includes("ল্যান্ডিং")) {
    return <TemplatesDemo />;
  }
  if (t.includes("secure") || t.includes("সুরক্ষা") || t.includes("security") || t.includes("সিকিউরিটি")) {
    return <SecurityDemo />;
  }
  return null;
};

// --- MAIN COMPONENT ---

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
  const [visibleCount, setVisibleCount] = useState(8);

  const getActiveData = () => {
    const safeAll = Array.isArray(itemsAll) ? itemsAll : [];
    const safeAdvanced = Array.isArray(itemsAdvanced) ? itemsAdvanced : [];
    const safeTech = Array.isArray(itemsTech) ? itemsTech : [];

    switch (activeTab) {
      case "all":
        return { items: safeAll };
      case "advanced":
        return { items: safeAdvanced };
      case "tech":
        return { items: safeTech };
      default:
        return { items: safeAll };
    }
  };

  const { items } = getActiveData();

  const handleTabChange = (tab: "all" | "advanced" | "tech") => {
    setActiveTab(tab);
    setVisibleCount(8);
  };

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const displayedItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div className="space-y-12">
      {/* Title & Subtitle */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 
          className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight !font-sans"
          dangerouslySetInnerHTML={{ __html: tTitle }}
        />
        <p className="text-slate-500 font-medium text-base">
          {tSub}
        </p>
      </div>

      {/* Tabs Selector Bar */}
      <div className="flex justify-center">
        <div className="inline-flex bg-slate-100/60 p-1.5 rounded-2xl border border-slate-200/40 shadow-inner max-w-full overflow-x-auto gap-2">
          <button
            onClick={() => handleTabChange("all")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-0 select-none ${
              activeTab === "all"
                ? "bg-white text-primary shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tTabAll}
          </button>
          <button
            onClick={() => handleTabChange("advanced")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-0 select-none ${
              activeTab === "advanced"
                ? "bg-white text-primary shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tTabAdvanced}
          </button>
          <button
            onClick={() => handleTabChange("tech")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-0 select-none ${
              activeTab === "tech"
                ? "bg-white text-primary shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tTabTech}
          </button>
        </div>
      </div>

      {/* Bento Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedItems.map((item, idx) => {
          const hasDemo = (item.title || "").toLowerCase().includes("mobile") ||
                          (item.title || "").toLowerCase().includes("মোবাইল") ||
                          (item.title || "").toLowerCase().includes("fast") ||
                          (item.title || "").toLowerCase().includes("speed") ||
                          (item.title || "").toLowerCase().includes("গতি") ||
                          (item.title || "").toLowerCase().includes("লোড টাইম") ||
                          (item.title || "").toLowerCase().includes("checkout") ||
                          (item.title || "").toLowerCase().includes("চেকআউট") ||
                          (item.title || "").toLowerCase().includes("pixel") ||
                          (item.title || "").toLowerCase().includes("capi") ||
                          (item.title || "").toLowerCase().includes("পিক্সেল") ||
                          (item.title || "").toLowerCase().includes("landing") ||
                          (item.title || "").toLowerCase().includes("ল্যান্ডিং") ||
                          (item.title || "").toLowerCase().includes("secure") ||
                          (item.title || "").toLowerCase().includes("সুরক্ষা") ||
                          (item.title || "").toLowerCase().includes("security") ||
                          (item.title || "").toLowerCase().includes("সিকিউরিটি");

          const spanClass = hasDemo 
            ? "lg:col-span-2 md:col-span-2 col-span-1" 
            : "lg:col-span-1 md:col-span-1 col-span-1";

          return (
            <div
              key={`${activeTab}-${idx}`}
              className={`bg-white border border-slate-200/60 rounded-3xl p-6.5 hover:border-primary/20 hover:shadow-md transition-all duration-300 group flex flex-col justify-between ${spanClass}`}
            >
              <div className="space-y-4">
                {/* Card Icon Wrapper */}
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center transition-colors group-hover:bg-white group-hover:border-primary/20">
                  {getIconForTitle(item.title)}
                </div>
                
                {/* Card Title & Desc */}
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-slate-800 tracking-tight transition-colors group-hover:text-primary leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Render Interactive Demo if matched */}
              {renderDemoForTitle(item.title)}
            </div>
          );
        })}
      </div>

      {/* See More Button */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleSeeMore}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-primary text-primary hover:bg-primary hover:text-white rounded-full font-bold text-sm transition-all duration-300 shadow-sm shadow-primary/5 hover:scale-[1.02] active:scale-95 cursor-pointer focus:outline-none"
          >
            {tSeeMore}
            <Icons.ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
