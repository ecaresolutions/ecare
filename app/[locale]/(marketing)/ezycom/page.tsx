import React from "react";
import { getTranslations } from "next-intl/server";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import EzyComDemos from "@/components/ezycom/demo-section";
import EzyComHeroSlider from "@/components/ezycom/hero-slider";
import EzyComFeaturesTab from "@/components/ezycom/features-tab";
import EzyComVideoSection from "@/components/ezycom/video-section";
import EzyComProblemSlider from "@/components/ezycom/problem-slider";

// --- Types & Interfaces ---
interface FeatureItem {
  name: string;
  wp: boolean | string;
  laravel: boolean | string;
  category: string;
  description: string;
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function EzyComLandingPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "EzyCom" });

  const tFeaturesTitle = t.raw("features.title");
  const tFeaturesSub = t("features.sub");
  const tFeaturesTabAll = t("features.tabs.all");
  const tFeaturesTabAdvanced = t("features.tabs.advanced");
  const tFeaturesTabTech = t("features.tabs.tech");
  const tFeaturesSeeMore = t("features.seeMore");
  const featuresAll = t.raw("features.items.all");
  const featuresAdvanced = t.raw("features.items.advanced");
  const featuresTech = t.raw("features.items.tech");

  const tVideoTitle = t.raw("videoSection.title");
  const tVideoSub = t("videoSection.sub");
  const videoTabs = t.raw("videoSection.tabs");

  const tickerItems = locale === "bn" 
    ? [
        "ডিটিসি ব্র্যান্ডস (DTC Brands)",
        "এফ-কমার্স বিজনেস (F-Commerce)",
        "ফ্যাশন ও কসমেটিক্স (Fashion & Beauty)",
        "গ্যাজেটস ও ইলেকট্রনিক্স (Gadgets)",
        "অর্গানিক ও গ্রোসারি ফুডস (Foods)",
        "লোকাল ড্রপশিপিং (Dropshipping)",
        "কোডিং জানার প্রয়োজন নেই (No Coding)",
        "২৪ ঘণ্টায় আপনার স্টোর লাইভ",
        "সেলস বৃদ্ধি ও কুরিয়ার অটোমেশন"
      ]
    : [
        "Direct-to-Consumer (DTC) Brands",
        "High-Volume F-Commerce Shops",
        "Fashion, Apparel & Beauty Stores",
        "Gadgets, Tech & Electronics",
        "Organic Groceries & Food Outlets",
        "Local & Global Dropshipping",
        "No Coding Experience Required",
        "Launch Your Store in 24 Hours",
        "Maximize Conversions & Automation"
      ];

  // --- Comparison Table Data ---
  const comparisonData: FeatureItem[] = [
    { name: "Business Size", wp: "Growing (Up to ৳5L/mo)", laravel: "Scaling (৳5L - ৳50L+/mo)", category: "Business", description: "Target business volume best handled by architecture." },
    { name: "Checkout Speed", wp: "Under 2 Seconds", laravel: "Sub-second (Instant)", category: "Performance", description: "Time taken to complete purchase steps." },
    { name: "Security & Anti-DDoS", wp: "Standard Plugin Defense", laravel: "Enterprise Node & DB Shield", category: "Performance", description: "Built-in firewall, security, and spam filters." },
    { name: "AI Voice Order Confirm", wp: "❌ Not Available", laravel: "✅ Fully Automated Integration", category: "Automation", description: "AI calls customers to verify addresses and reduce returns." },
    { name: "Courier Auto Entry", wp: "✅ Standard Manual Click", laravel: "✅ 100% Automated Background API", category: "Automation", description: "Direct syncing with Pathao, Steadfast, and RedX." },
    { name: "Facebook API Integration", wp: "✅ CAPI Plugin Setup", laravel: "✅ Built-in Meta SDK (Zero drop)", category: "Marketing", description: "Facebook Ads Server-Side tracking." },
    { name: "Accounting Ledger", wp: "❌ Basic Sales Tracking", laravel: "✅ Advanced Cashbook & Expense Logs", category: "Business", description: "Track net profits, Courier charges, and COD cash flows." },
    { name: "Role-Permissions Matrix", wp: "Basic Role Manager", laravel: "Granular Staff Access Matrix", category: "Business", description: "Restrict staff to view specific orders or export lists." },
    { name: "Upgrade Migration", wp: "Ready for Laravel Migration", laravel: "Ultimate Scale Architecture", category: "Business", description: "Move your data without restarting from scratch." },
    { name: "License Type", wp: "Lifetime License", laravel: "Lifetime License", category: "Business", description: "One-time cost, no monthly SaaS subscriptions." },
    { name: "Server Requirements", wp: "Standard cPanel Shared Hosting", laravel: "Optimized VPS / Cloud Server", category: "Performance", description: "Recommended hosting for maximum output." },
    { name: "Support Period", wp: "30 Days Setup Support", laravel: "30 Days Premium Tech Support", category: "Business", description: "Direct WhatsApp support and bug fixing assistance." },
  ];

  const getComparisonRow = (row: FeatureItem) => {
    if (locale !== "bn") {
      return {
        name: row.name,
        description: row.description,
        wp: String(row.wp),
        laravel: String(row.laravel)
      };
    }
    
    const translationMap: Record<string, { name: string; description: string; wp: string; laravel: string }> = {
      "Business Size": {
        name: "ব্যবসার পরিধি",
        description: "প্রতি মাসে যে পরিমাণ বিক্রয়ের জন্য এই প্ল্যাটফর্মের আর্কিটেকচার সেরা পারফর্ম করে।",
        wp: "উন্নতিশীল (মাসে ৫ লাখ টাকা পর্যন্ত)",
        laravel: "বৃহৎ স্কেল (মাসে ৫ থেকে ৫০+ লাখ টাকা)"
      },
      "Checkout Speed": {
        name: "চেকআউট স্পিড",
        description: "গ্রাহকের অর্ডার সম্পন্ন করতে লোডিং সময় লাগে।",
        wp: "২ সেকেন্ডের নিচে",
        laravel: "১ সেকেন্ডের কম (অত্যন্ত দ্রুত)"
      },
      "Security & Anti-DDoS": {
        name: "নিরাপত্তা ও স্প্যাম প্রোটেকশন",
        description: "হ্যাকিং এবং রোবট বা ফেক অর্ডার আটকাতে নিজস্ব সিকিউরিটি।",
        wp: "প্লাগইন নির্ভর ডিফেন্স",
        laravel: "এন্টারপ্রাইজ ডাটাবেস ও নোড শিল্ড"
      },
      "AI Voice Order Confirm": {
        name: "AI ভয়েস কল অর্ডার ভেরিফিকেশন",
        description: "গ্রাহকের ঠিকানার সত্যতা ও ডেলিভারি সফল করতে স্বয়ংক্রিয় কল।",
        wp: "❌ উপলব্ধ নয়",
        laravel: "✅ সম্পূর্ণ অটোমেটেড ইন্টিগ্রেশন"
      },
      "Courier Auto Entry": {
        name: "কুরিয়ার এপিআই কানেকশন",
        description: "অর্ডার সরাসরি Steadfast বা Pathao প্যানেলে বুকিং করা।",
        wp: "✅ ওয়ান-ক্লিক ম্যানুয়াল বুকিং",
        laravel: "✅ ১০০% অটোমেটেড ব্যাকগ্রাউন্ড বুকিং"
      },
      "Facebook API Integration": {
        name: "ফেসবুক কনভার্সন এপিআই (CAPI)",
        description: "বিজ্ঞাপনের সঠিক ডাটা ও পারফরম্যান্স ট্র্যাকিং।",
        wp: "✅ প্লাগইনের মাধ্যমে CAPI সেটআপ",
        laravel: "✅ ইনবিল্ট নেটিভ SDK (ডাটা লস নেই)"
      },
      "Accounting Ledger": {
        name: "অ্যাকাউন্টিং লেজার ও ক্যাশ বুক",
        description: "অর্ডারের পাশাপাশি প্রফিট-লস হিসাব করার খাতা।",
        wp: "❌ বেসিক সেলস রিপোর্ট",
        laravel: "✅ অ্যাডভান্সড ক্যাশবুক ও কুরিয়ার হিসাব"
      },
      "Role-Permissions Matrix": {
        name: "স্টাফ অ্যাক্সেস কন্ট্রোল",
        description: "ম্যানেজার বা ডাটা এন্ট্রি স্টাফদের লিমিটেড অ্যাক্সেস দেওয়া।",
        wp: "বেসিক রোল ম্যানেজার",
        laravel: "অ্যাডভান্সড স্টাফ পারমিশন গ্রিড"
      },
      "Upgrade Migration": {
        name: "ভবিষ্যৎ আপগ্রেড সুবিধা",
        description: "ব্যবসা বড় হলে এক প্ল্যাটফর্ম থেকে অন্য প্ল্যাটফর্মে রূপান্তর।",
        wp: "লারাভেলে আপগ্রেড করার অপশন",
        laravel: "সর্বোচ্চ লেভেলের স্কেল আর্কিটেকচার"
      },
      "License Type": {
        name: "লাইসেন্সের ধরণ",
        description: "কোনো মাসিক ফিস আছে নাকি ওয়ান-টাইম পেমেন্ট।",
        wp: "লাইফটাইম লাইসেন্স (এককালীন)",
        laravel: "লাইফটাইম লাইসেন্স (এককালীন)"
      },
      "Server Requirements": {
        name: "হোস্টিং প্রয়োজনীয়তা",
        description: "স্টোর রান করার জন্য কোন সার্ভার কনফিগারেশন রিকমেন্ডেড।",
        wp: "শেয়ার্ড বা cPanel হোস্টিং",
        laravel: "ভিপিএস (VPS) বা ক্লাউড হোস্টিং"
      },
      "Support Period": {
        name: "টেকনিক্যাল সাপোর্ট",
        description: "ক্রয়ের পর কত দিন পর্যন্ত ফ্রি সেটআপ সাহায্য দেওয়া হয়।",
        wp: "৩০ দিন পর্যন্ত ফ্রি সেটআপ সহায়তা",
        laravel: "৩০ দিন পর্যন্ত প্রিমিয়াম টেক সাপোর্ট"
      }
    };

    return translationMap[row.name] || {
      name: row.name,
      description: row.description,
      wp: String(row.wp),
      laravel: String(row.laravel)
    };
  };

  // --- FAQs Data ---
  const faqs = [
    {
      q: "Is there any monthly or yearly recurring fee?",
      a: "No! This is a one-time purchase. Once you buy EzyCom WordPress or Laravel edition, you get a lifetime license to run it on your own server/domain. You only pay for your own hosting and domain renewal directly to your providers.",
    },
    {
      q: "Can I upgrade from the WordPress Edition to the Laravel Edition later?",
      a: "Absolutely. We designed EzyCom with growth in mind. All product details, customer lists, and order histories can be migrated seamlessly to the Laravel CMS when your business reaches scale. You don't have to start from scratch.",
    },
    {
      q: "Do you integrate with Bangladeshi Couriers?",
      a: "Yes! EzyCom has built-in support for major local courier services including Steadfast, Pathao, and RedX. Orders can be automatically pushed to courier panels with one click or fully automated in the Laravel edition.",
    },
    {
      q: "How does the AI Voice Order Confirmation work in Laravel?",
      a: "When a customer places a COD (Cash on Delivery) order, our integrated AI calling bot automatically calls their phone number, reads their ordered items/total price, and asks them to press 1 to confirm or 2 to cancel. This reduces returns by up to 45%!",
    },
    {
      q: "Do I need technical skills to manage EzyCom?",
      a: "No. Both editions come with an easy-to-use, clean admin panel. We also provide step-by-step video tutorials covering product management, order processing, tracking courier statuses, and handling ads pixel settings.",
    },
    {
      q: "What payment gateways are supported?",
      a: "Out of the box, EzyCom supports local gateways like bKash, Rocket, Nagad, SSLCommerz, Shurjopay, and conventional Cash on Delivery (COD) processing.",
    },
    {
      q: "Can I track customer behavior on Facebook Ads accurately?",
      a: "Yes, both editions include Facebook Pixel and Server-Side Conversion API (CAPI). This bypasses iOS 14+ ad blocker limitations, tracking actual browser & server events to decrease your Cost Per Acquisition (CPA).",
    },
    {
      q: "What is the difference between standard themes and EzyCom?",
      a: "Standard international themes are heavy, bloated with plugins, and not optimized for Bangladeshi COD purchase behaviour. EzyCom features a custom-built check-out system, local OTP support, SMS API, and courier automation out of the box.",
    },
    {
      q: "Is domain and hosting included in the package?",
      a: "We assist you in selecting and configuring hosting and domain, but the actual ownership remains yours. We recommend and set up optimized servers to ensure maximum speed for your website.",
    },
    {
      q: "Do you offer custom feature development?",
      a: "Yes. Since both systems are fully custom-built and clean (no bloated third-party elements), our development team can build custom solutions, B2B modules, multi-vendor systems, or unique API integrations for your brand.",
    },
    {
      q: "Is there protection against fake orders?",
      a: "EzyCom includes a smart customer profiling algorithm. It tracks phone number history, matches geographical data, warns you of high-cancellation users, and sends verification codes (OTP) before validating an order.",
    },
    {
      q: "What support is included with the purchase?",
      a: "We provide 30 days of active setup support to get your site fully operational, integrate payment systems, and connect social pixels. You also receive lifetime system updates and access to our technical documentation.",
    },
    {
      q: "Will my website load fast on mobile devices?",
      a: "Yes. Speed is a core ranking and conversion metric. Both editions achieve 90+ PageSpeed Scores on mobile by using optimized code structures, image compressions, and eliminating heavy plugins.",
    },
    {
      q: "Does EzyCom support wholesale and retail pricing simultaneously?",
      a: "Yes, you can set separate retail and bulk-buying wholesale rates for individual items. Customers can automatically unlock wholesale rates when meeting minimum order quantities.",
    },
    {
      q: "Can I manage multiple staff members and their permissions?",
      a: "Yes. Laravel Scale Edition provides granular role-based permissions (e.g. Sales Staff can only confirm orders, Inventory Manager handles stock levels, and Accounting team views reports).",
    },
  ];

  return (
    <div className="bg-[#FAFBFD] text-slate-900 font-sans selection:bg-emerald-500/20 selection:text-emerald-900 min-h-screen overflow-x-hidden">
      <Header />

      {/* --- HERO SECTION OUTER WRAPPER --- */}
      <div className="w-full bg-[#FAFBFD] border-b border-slate-200/50 relative overflow-hidden bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] bg-[position:center_top]">
        {/* Radial and Linear Gradient Overlays with theme tint */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.04)_10%,#FAFBFD_80%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAFBFD] pointer-events-none" />

        {/* Glow Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="w-[500px] h-[500px] bg-rose-200/30 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] blur-[120px] absolute -top-40 -left-20 animate-blob pointer-events-none" />
          <div className="w-[550px] h-[550px] bg-primary/8 rounded-[50%_50%_30%_70%_/_50%_60%_40%_60%] blur-[130px] absolute top-20 right-[-10%] animate-blob [animation-delay:4s] pointer-events-none" />
          <div className="w-[400px] h-[400px] bg-pink-100/30 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] blur-[100px] absolute bottom-10 left-[30%] animate-blob [animation-delay:2s] pointer-events-none" />
        </div>

        <section id="hero" className="relative pt-16 pb-12 md:pt-20 md:pb-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Hero Content */}
            <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
              {/* Crown Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200/80 rounded-full text-slate-800 text-xs font-bold shadow-sm shadow-slate-100">
                <span className="text-base text-amber-500">👑</span>
                {locale === "bn" ? "সেরা ই-কমার্স ওয়েবসাইট গ্যারান্টি!" : "Best eCommerce Website Guarantee"}
              </div>
              
              {/* Localized Headline */}
              {locale === "bn" ? (
                <h1 className="text-4xl sm:text-5xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.05] !font-sans">
                  অর্ডার হবে এখন <br className="hidden sm:inline" />
                  <span className="text-primary">নিজের ওয়েবসাইটে!</span>
                </h1>
              ) : (
                <h1 className="text-4xl sm:text-5xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.05] !font-sans">
                  Your Website Should <span className="text-primary">Sell More</span>, <br className="hidden sm:inline" />
                  Not Just Look <span className="text-primary">Beautiful.</span>
                </h1>
              )}

              {/* Localized Subheadline */}
              <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {locale === "bn" ? (
                  "বাংলাদেশি অনলাইন ব্যবসার জন্য বিশেষভাবে তৈরি একটি রেডি-টু-লঞ্চ ই-কমার্স সিএমএস সিস্টেম।"
                ) : (
                  "A ready-to-launch eCommerce system built specifically for Bangladeshi businesses."
                )}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a href="#demos" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-95 text-white font-semibold text-base py-6 px-8 rounded-xl shadow-md shadow-primary/10 transition-all cursor-pointer flex items-center gap-2">
                    {locale === "bn" ? "১ দিনের ফ্রি ট্রায়াল শুরু করুন" : "Start 1-Day Free Trial"}
                    <Icons.ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <a href="#comparison" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/80 hover:bg-white hover:scale-[1.02] border-slate-200 text-slate-700 font-semibold text-base py-6 px-8 rounded-xl backdrop-blur-sm transition-all cursor-pointer">
                    {locale === "bn" ? "ই-কমার্স তৈরি করুন" : "Build Your Store"}
                  </Button>
                </a>
              </div>
            </div>

            {/* Hero Visual Slider Mockup Grid */}
            <div className="lg:col-span-7 relative w-full flex justify-center items-center">
              <EzyComHeroSlider />
            </div>
          </div>
        </section>
      </div>

      {/* --- PROBLEM SECTION --- */}
      <section id="problem" className="py-14 bg-[#FAFBFD] border-y border-slate-200/50 px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="w-[400px] h-[400px] bg-rose-200/20 rounded-full blur-[100px] absolute top-10 left-10" />
        </div>

        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black text-rose-600 bg-rose-50 border border-rose-100 px-4 py-1.5 rounded-full uppercase tracking-wider block w-fit mx-auto">
              {t("problem.badge")}
            </span>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight relative z-10 font-sans"
              dangerouslySetInnerHTML={{ __html: t.raw("problem.titleHtml") }}
            />
            <p className="text-slate-500 font-medium text-sm sm:text-base max-w-xl mx-auto">
              {t("problem.sub")}
            </p>
          </div>

          <EzyComProblemSlider
            cards={[
              {
                icon: "/ezycom/form.png",
                title: t("problem.card1.title"),
                desc: t("problem.card1.desc"),
                badge: t("problem.card1.badge"),
              },
              {
                icon: "/ezycom/no-smartphones.png",
                title: t("problem.card2.title"),
                desc: t("problem.card2.desc"),
                badge: t("problem.card2.badge"),
              },
              {
                icon: "/ezycom/danger.png",
                title: t("problem.card3.title"),
                desc: t("problem.card3.desc"),
                badge: t("problem.card3.badge"),
              },
              {
                icon: "/ezycom/spending.png",
                title: t("problem.card4.title"),
                desc: t("problem.card4.desc"),
                badge: t("problem.card4.badge"),
              },
              {
                icon: "/ezycom/sand-clock.png",
                title: t("problem.card5.title"),
                desc: t("problem.card5.desc"),
                badge: t("problem.card5.badge"),
              },
              {
                icon: "/ezycom/loss.png",
                title: t("problem.card6.title"),
                desc: t("problem.card6.desc"),
                badge: t("problem.card6.badge"),
              },
            ]}
          />
        </div>
      </section>

      {/* --- WHY BUILT FOR BANGLADESH (TABBED FEATURES) --- */}
      <section id="bangladesh" className="py-14 px-6 max-w-7xl mx-auto">
        <EzyComFeaturesTab
          tTitle={tFeaturesTitle}
          tSub={tFeaturesSub}
          tTabAll={tFeaturesTabAll}
          tTabAdvanced={tFeaturesTabAdvanced}
          tTabTech={tFeaturesTabTech}
          tSeeMore={tFeaturesSeeMore}
          itemsAll={featuresAll}
          itemsAdvanced={featuresAdvanced}
          itemsTech={featuresTech}
          locale={locale}
        />
      </section>

      {/* --- TILTED TICKER BANNER SECTION --- */}
      <div className="relative py-14 overflow-hidden bg-[#FAFBFD] select-none">
        {/* Marquee Strip Container */}
        <div className="w-[115%] -left-[7.5%] relative bg-slate-900 text-white py-5 sm:py-6.5 rotate-[-1.5deg] shadow-[0_15px_30px_rgba(0,0,0,0.12)] border-y border-white/5 flex items-center">
          {/* Tilted Theme Badge (Attached inside the rotated container to stay aligned) */}
          <div className="absolute top-[-16px] left-[10%] sm:left-[20%] z-20 bg-primary text-white text-[10px] sm:text-xs font-black tracking-wide px-4 py-1.5 rounded-full shadow-md shadow-primary/20 flex items-center gap-1.5 uppercase whitespace-nowrap">
            <span>{locale === "bn" ? "কাদের জন্য Ezycom?" : "Who is Ezycom for?"}</span>
            <Icons.Sparkles className="w-3.5 h-3.5 text-amber-300 fill-current" />
          </div>

          <div className="flex overflow-hidden w-full whitespace-nowrap">
            <div className="flex shrink-0 gap-8 sm:gap-16 animate-marquee text-lg sm:text-2xl font-black uppercase tracking-wider text-slate-100 items-center">
              {tickerItems.map((item, i) => (
                <span key={i} className="flex items-center gap-4">
                  <span>{item}</span>
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full shrink-0" />
                </span>
              ))}
            </div>
            {/* Duplicate for infinite loop */}
            <div className="flex shrink-0 gap-8 sm:gap-16 animate-marquee text-lg sm:text-2xl font-black uppercase tracking-wider text-slate-100 items-center" aria-hidden="true">
              {tickerItems.map((item, i) => (
                <span key={i} className="flex items-center gap-4">
                  <span>{item}</span>
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full shrink-0" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- WATCH VIDEO SECTION --- */}
      <EzyComVideoSection
        tTitle={tVideoTitle}
        tSub={tVideoSub}
        tabs={videoTabs}
        locale={locale}
      />

      {/* --- PRE-BUILT DEMOS SECTION --- */}
      <section id="demos" className="py-14 bg-[#FAFBFD] border-b border-slate-200/50 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <EzyComDemos locale={locale} />
        </div>
      </section>

      {/* --- OUTSTANDING DEMO IMAGE SECTION (Full Width) --- */}
      <section className="w-full overflow-hidden pt-12 bg-white">
        <img 
          src="/Outstanding Demo.webp" 
          alt={locale === "bn" ? "আউটস্ট্যান্ডিং ডেমো" : "Outstanding Demo"} 
          className="w-full h-auto block"
        />
      </section>

      {/* --- COMPARISON SECTION --- */}
      <section id="compare" className="py-14 bg-[#FAFBFD] border-t border-slate-200/50 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black text-primary bg-primary/5 border border-primary/10 px-4 py-1.5 rounded-full uppercase tracking-wider block w-fit mx-auto">
              {locale === "bn" ? "ফিচার তুলনা" : "Platform Comparison"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight relative z-10 font-sans">
              {locale === "bn" ? (
                <>
                  <span className="text-blue-600">Woocom</span> বনাম <span className="text-primary">Laracom</span> তুলনা
                </>
              ) : (
                <>
                  <span className="text-blue-600">Woocom</span> vs <span className="text-primary">Laracom</span> Comparison
                </>
              )}
            </h2>
            <p className="text-slate-500 font-medium text-sm sm:text-base max-w-xl mx-auto">
              {locale === "bn" 
                ? "আপনার ব্যবসার গতি, স্কেল এবং বাজেট অনুযায়ী সঠিক প্ল্যাটফর্মটি নির্বাচন করুন।" 
                : "Choose the platform that matches your business volume, performance goals, and hosting preferences."}
            </p>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-wider w-[40%]">
                      {locale === "bn" ? "ফিচার সমূহ" : "Core Features"}
                    </th>
                    <th className="p-6 text-xs font-black text-slate-800 uppercase tracking-wider w-[30%] text-center bg-blue-50/20">
                      Woocom (WordPress)
                    </th>
                    <th className="p-6 text-xs font-black text-primary uppercase tracking-wider w-[30%] text-center bg-primary/5">
                      Laracom (Laravel)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-medium text-xs sm:text-sm">
                  {comparisonData.map((row, idx) => {
                    const translated = getComparisonRow(row);
                    return (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-6">
                          <div className="space-y-1">
                            <p className="font-extrabold text-slate-800">{translated.name}</p>
                            <p className="text-[11px] text-slate-400 font-normal leading-relaxed">{translated.description}</p>
                          </div>
                        </td>
                        <td className="p-6 text-center bg-blue-50/10 font-semibold text-slate-700">
                          {translated.wp}
                        </td>
                        <td className="p-6 text-center bg-primary/2 font-extrabold text-slate-800">
                          {translated.laravel}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="block md:hidden divide-y divide-slate-100 p-5 space-y-6">
              {comparisonData.map((row, idx) => {
                const translated = getComparisonRow(row);
                return (
                  <div key={idx} className="pt-5 first:pt-0 space-y-3">
                    <div className="space-y-1">
                      <p className="font-extrabold text-slate-800 text-sm">{translated.name}</p>
                      <p className="text-[10px] text-slate-400 leading-relaxed">{translated.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs font-bold">
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-slate-400 block mb-1 uppercase">Woocom</span>
                        <span className="text-slate-700">{translated.wp}</span>
                      </div>
                      <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-primary block mb-1 uppercase">Laracom</span>
                        <span className="text-slate-800 font-black">{translated.laravel}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-14 bg-white border-y border-slate-100 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full uppercase tracking-wider block w-fit mx-auto">
              {locale === "bn" ? "জিজ্ঞাসিত প্রশ্নাবলী" : "Frequently Asked Questions"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight relative z-10 font-sans">
              {locale === "bn" ? (
                <>
                  সাধারণ কিছু <span className="text-primary">প্রশ্ন ও উত্তর</span>
                </>
              ) : (
                <>
                  Got Questions? <span className="text-primary">We Have Answers</span>
                </>
              )}
            </h2>
            <p className="text-slate-500 font-medium text-sm sm:text-base max-w-xl mx-auto">
              {locale === "bn" 
                ? "মালিকানা, কুরিয়ার পেমেন্ট সেটআপ এবং প্ল্যাটফর্ম কাস্টমাইজেশন সম্পর্কে বিস্তারিত জানুন।"
                : "Read details on ownership, migration paths, and courier payment setups."}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`} className="border border-slate-100 rounded-xl px-4 bg-[#FAFBFD] hover:bg-white transition-colors duration-200">
                <AccordionTrigger className="text-left font-bold text-slate-800 text-sm sm:text-base hover:no-underline py-4 cursor-pointer">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed pb-4 pt-1">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="py-14 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[120px] absolute -bottom-80 left-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full uppercase tracking-widest">Immediate Business Growth</span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-sans">
            Choose the Right E-commerce Platform for Your Business
          </h2>
          
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base font-medium">
            Launch a fast, localized store connected natively to Steadfast, Facebook Conversion APIs, and local gateways. Get your lifetime license.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/your-whatsapp-link" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-6 px-8 rounded-xl cursor-pointer">
                Book Live Demo
              </Button>
            </a>
            <a href="https://wa.me/your-whatsapp-link" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full border-white/20 hover:bg-white/10 text-white font-bold py-6 px-8 rounded-xl cursor-pointer">
                Talk to an Expert
              </Button>
            </a>
          </div>

          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            One-Time Payment. Lifetime License. No Subscription Traps.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
