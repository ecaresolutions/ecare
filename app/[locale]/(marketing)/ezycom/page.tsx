import React from "react";
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
      <div className="w-full bg-[#FAFBFD] border-b border-slate-200/50 relative overflow-hidden bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] bg-[position:center_top]">
        {/* Glow Effects */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[100px] absolute -top-40 -left-40 animate-pulse-slow" />
          <div className="w-[500px] h-[500px] bg-sky-100/30 rounded-full blur-[100px] absolute top-80 right-0" />
        </div>

        <section id="hero" className="relative pt-16 pb-12 md:pt-20 md:pb-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Hero Content */}
            <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
              {/* Crown Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200/80 rounded-full text-slate-800 text-xs font-bold shadow-sm shadow-slate-100">
                <span className="text-base text-amber-500">👑</span>
                {locale === "bn" ? "সেরা ই-কমার্স ওয়েবসাইট গ্যারান্টি!" : "Best eCommerce Website Guarantee"}
              </div>
              
              {/* Localized Headline */}
              {locale === "bn" ? (
                <h1 className="text-4xl sm:text-5xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.15] !font-sans">
                  অর্ডার হবে এখন <br className="hidden sm:inline" />
                  <span className="text-primary">নিজের ওয়েবসাইটে!</span>
                </h1>
              ) : (
                <h1 className="text-4xl sm:text-5xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.15] !font-sans">
                  Your Website Should <span className="text-primary">Sell More</span>, <br className="hidden sm:inline" />
                  Not Just Look Beautiful.
                </h1>
              )}

              {/* Localized Subheadline */}
              <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {locale === "bn"
                  ? "ব্যবহার করুন সুপার ফাস্ট ও মার্কেটিং-অপ্টিমাইজড অটোমেটেড E-Commerce সলিউশন — যা আপনার বিক্রি, মার্কেটিং ও ম্যানেজমেন্টের সর্বাধিক স্মার্ট সমাধান।"
                  : "A ready-to-launch eCommerce system built specifically for Bangladeshi businesses with optimized checkout, smart automation, local courier integrations, and scalable architecture."}
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

        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 px-4 py-1.5 rounded-full uppercase tracking-wider">
              The Reality Check
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Why Most Bangladeshi E-commerce Websites Fail
            </h2>
            <p className="text-slate-500 font-medium text-base">
              Developing a gorgeous storefront is easy, but local operations require a system optimized to solve day-to-day transaction barriers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Icons.Frown className="w-5 h-5 text-rose-600" />,
                title: "Complex Multi-Step Checkouts",
                desc: "Every extra form field reduces conversions. International checkout themes confuse local customers, leading to cart abandonment.",
                badge: "High Drop-offs",
              },
              {
                icon: <Icons.UserMinus className="w-5 h-5 text-rose-600" />,
                title: "Developers Disappear After Handover",
                desc: "Freelancers and agencies deliver a basic theme but fail to provide updates or support, leaving you stuck with critical system bugs.",
                badge: "No Support",
              },
              {
                icon: <Icons.AlertTriangle className="w-5 h-5 text-rose-600" />,
                title: "Fake Order Waste & Return Refusals",
                desc: "High percentages of fake COD (Cash on Delivery) orders drain courier delivery fee budgets and deplete inventory status.",
                badge: "Loss of Cashflow",
              },
              {
                icon: <Icons.WifiOff className="w-5 h-5 text-rose-600" />,
                title: "Broken Facebook Pixel Tracking",
                desc: "Standard pixel setups miss browser events due to iOS 14+ and Safari blockers. Your Meta Ads system trains on incomplete statistics.",
                badge: "Wasted Ad Spend",
              },
              {
                icon: <Icons.Activity className="w-5 h-5 text-rose-600" />,
                title: "Heavy Plugins Make Sites Bloated & Slow",
                desc: "Using standard platforms loaded with 30+ conflicting plugins slows page speed, causing high bounce rates on slow 3G/4G connections.",
                badge: "9-Sec Load Time",
              },
              {
                icon: <Icons.DollarSign className="w-5 h-5 text-rose-600" />,
                title: "Domain Renews but Revenue Doesn't Grow",
                desc: "E-commerce structures that are not connected to local couriers and automated confirmation pipelines generate heavy management overhead.",
                badge: "Stagnant Sales",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden bg-white border border-slate-200/60 rounded-3xl p-8 hover:shadow-[0_20px_50px_rgba(244,63,94,0.06)] hover:border-rose-200 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between h-full"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-rose-100">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-full uppercase">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY BUILT FOR BANGLADESH --- */}
      <section id="bangladesh" className="py-14 px-6 max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">Hyper-Localized Solution</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
              Why International Themes & Plugins Are Not Enough
            </h2>
            <p className="text-slate-500 font-medium">
              Bangladeshi online retail runs primarily on Cash on Delivery, WhatsApp orders, and Facebook Ads. EzyCom is engineered from the ground up to match local shopping habits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Icons.Truck className="w-5 h-5 text-emerald-600" />,
                title: "1-Click Courier Sync",
                desc: "Integrated directly with Steadfast, Pathao, and RedX. Send orders to courier panels automatically with zero manual copying.",
              },
              {
                icon: <Icons.PhoneCall className="w-5 h-5 text-sky-600" />,
                title: "WhatsApp Order Alerts",
                desc: "Send instant notifications and order confirmations directly to customer WhatsApp threads to increase pickup success rates.",
              },
              {
                icon: <Icons.Fingerprint className="w-5 h-5 text-emerald-600" />,
                title: "Local Payment Gateways",
                desc: "bKash, Nagad, Rocket, and card payments configured natively without requiring heavy, expensive international plugins.",
              },
              {
                icon: <Icons.UserCheck className="w-5 h-5 text-sky-600" />,
                title: "Anti-Fraud Detection",
                desc: "Identify repetitive cancellation phone numbers and show warnings on the dashboard before packing and sending shipments.",
              },
              {
                icon: <Icons.MessageCircle className="w-5 h-5 text-emerald-600" />,
                title: "Messenger & WA Chat Bubble",
                desc: "Built-in dynamic chat features directly connect store pages with your Facebook inbox & customer service agents.",
              },
              {
                icon: <Icons.Smartphone className="w-5 h-5 text-sky-600" />,
                title: "Ultra-Light Mobile Layout",
                desc: "Runs smoothly on average Android smartphones and handles fluctuating mobile web speeds across Bangladesh.",
              },
              {
                icon: <Icons.Share2 className="w-5 h-5 text-emerald-600" />,
                title: "Conversion API ready",
                desc: "Server-side tracking reports exact data to Facebook Ads Manager, bypassing iOS 14 blocking triggers completely.",
              },
              {
                icon: <Icons.Headphones className="w-5 h-5 text-sky-600" />,
                title: "AI Call Confirmation",
                desc: "Available in Laravel Scale: Automated verification calls trigger as soon as a checkout occurs, saving labor costs.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-800">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CHOOSE YOUR PLATFORM (PRICING CARDS) --- */}
      <section id="pricing" className="py-14 bg-slate-900 text-white px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[120px] absolute -bottom-40 -right-40" />
          <div className="w-[400px] h-[400px] bg-sky-500 rounded-full blur-[100px] absolute -top-40 -left-40" />
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-wider">Flexible System Architecture</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans">
              Select the Perfect Engine for Your Business
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              Both platforms feature high-converting checkout forms, conversion integrations, and premium layouts. Select the setup matches your growth stage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* CARD 1: WordPress Growth Edition */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-300 relative group">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Growth Edition</span>
                    <h3 className="text-2xl font-bold text-white mt-1">EzyCom WordPress CMS</h3>
                    <p className="text-xs text-slate-400 mt-1.5 font-medium">Best for emerging brands needing fast deployment & easy management.</p>
                  </div>
                  <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded-full font-bold uppercase">Lite</span>
                </div>

                <div className="border-y border-white/10 py-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white">৳16,000</span>
                    <span className="text-xs text-slate-400 font-medium">One-Time Fee</span>
                  </div>
                  <p className="text-xs text-emerald-400 mt-1 font-bold">Includes lifetime license & 30 days developer setup support.</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Growth Core Features</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-medium">
                    {[
                      "Super Fast Cart Drawer",
                      "Upsell & Cross-Sell Prompts",
                      "Wholesale & Retail Settings",
                      "WhatsApp OTP Verification",
                      "SMS Notification APIs",
                      "Facebook Conversion API",
                      "Optimized Mobile checkout",
                      "Courier Panel Automation",
                      "Anti-Fraud Checker",
                      "Speed Optimization (90+ PageSpeed)",
                      "Clean Plugin Architecture",
                      "Free Lifetime System Updates"
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Icons.Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 space-y-4">
                <a href="#demos">
                  <Button className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-6 rounded-xl cursor-pointer">
                    Preview Live WordPress Demo
                  </Button>
                </a>
                <p className="text-[10px] text-center text-slate-400 font-medium">Ready for one-click migration to Laravel scale edition as operations expand.</p>
              </div>
            </div>

            {/* CARD 2: Laravel Scale Edition */}
            <div className="bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-emerald-500 rounded-3xl p-8 flex flex-col justify-between hover:scale-[1.01] transition-all duration-300 relative shadow-2xl shadow-emerald-500/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white font-extrabold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                RECOMMENDED FOR SCALING BRAND
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-start mt-2">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Scale Edition</span>
                    <h3 className="text-2xl font-bold text-white mt-1">EzyCom Laravel Engine</h3>
                    <p className="text-xs text-slate-400 mt-1.5 font-medium">Tailored for established brands demanding robust server loads & marketing automations.</p>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase border border-emerald-500/30">Enterprise</span>
                </div>

                <div className="border-y border-white/10 py-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white">৳30,000</span>
                    <span className="text-xs text-slate-400 font-medium">One-Time Fee</span>
                  </div>
                  <p className="text-xs text-emerald-400 mt-1 font-bold">Includes Advanced Automation suite & Lifetime Upgrades.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Everything in WordPress edition plus:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-medium">
                      {[
                        "AI Voice Order confirmation bot",
                        "Real-Time Multi-Warehouse Inventory",
                        "Cashbook Ledger & Net Profits",
                        "Granular Staff Role Permissions",
                        "Direct Meta SDK Integration",
                        "Zero Plugin Core Architecture",
                        "DDoS & High Scalability Support",
                        "VPS & Load Balancing Optimization",
                        "Advanced Expense Manager",
                        "Courier COD Status Automation",
                        "High Volume Invoice Printing",
                        "Lead & CRM Tracking Module"
                      ].map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Icons.Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-4">
                <a href="#demos">
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-6 rounded-xl cursor-pointer font-semibold">
                    Preview Live Laravel Demo
                  </Button>
                </a>
                <p className="text-[10px] text-center text-slate-400 font-medium">Engineered for sub-second page loads and zero database locking bugs.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FEATURE CATEGORIES SECTION --- */}
      <section id="features" className="py-14 px-6 max-w-7xl mx-auto">
        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">Core Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
              Organized for High-Volume Operations
            </h2>
            <p className="text-slate-500 font-medium">
              We broken down fifty plus custom options into six clean modules designed to increase order numbers and streamline backend workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Icons.TrendingUp className="text-emerald-600" />,
                title: "1. Sales Growth Module",
                features: ["Video Showcase Cart integration", "Smart One-Click Upsell/Cross-sell popups", "Loyalty Reward Point configuration", "Dynamic Quantity Bulk Pricing grids", "Tiered Wholesale Discount paths"],
              },
              {
                icon: <Icons.Target className="text-sky-600" />,
                title: "2. Marketing Engine",
                features: ["Full Facebook Ads Conversion API (CAPI)", "Server side browser event triggers", "Google Analytics 4 event streams", "Bulk Marketing SMS API modules", "WhatsApp direct message marketing campaigns"],
              },
              {
                icon: <Icons.HeartHandshake className="text-emerald-600" />,
                title: "3. Customer Experience (CX)",
                features: ["Sub-second Mobile-first checkouts", "Real-time Order delivery progress trackers", "Instant visual search query results", "Flexible product wishlists", "Review system with customer media uploads"],
              },
              {
                icon: <Icons.Sliders className="text-sky-600" />,
                title: "4. Business Management",
                features: ["Unified multi-channel Order dashboards", "Multi-warehouse inventory stock counters", "Courier status return tracking analytics", "Cashbook Ledger and net profits trackers", "Print-ready packaging invoice generators"],
              },
              {
                icon: <Icons.Zap className="text-emerald-600" />,
                title: "5. Performance Shield",
                features: ["Ultra-clean code structure design", "Low database index load times", "Zero third-party bloating plugins", "Static assets CDN edge integrations", "Load-balance scaling system support"],
              },
              {
                icon: <Icons.Cpu className="text-sky-600" />,
                title: "6. Automation Pipeline",
                features: ["Automatic customer verification OTP codes", "Auto courier entry (Steadfast, Pathao)", "Laravel AI voice validation calls", "Customer profile fraud flags", "Real-time SMS system alerts"],
              },
            ].map((cat, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center">
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-slate-800">{cat.title}</h3>
                </div>
                <ul className="space-y-2 border-t border-slate-50 pt-3">
                  {cat.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2 text-xs text-slate-500 font-medium leading-relaxed">
                      <Icons.Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COMPARISON TABLE --- */}
      <section id="comparison" className="py-14 bg-white border-y border-slate-100 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">Side by Side Comparison</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
              WordPress Growth vs Laravel Scale
            </h2>
            <p className="text-slate-500 font-medium">
              Examine the detailed comparison to make an informed choice based on your daily volume and operational complexity.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-700">
                  <th className="p-4 sm:p-5">Platform Feature</th>
                  <th className="p-4 sm:p-5">WordPress Growth Edition</th>
                  <th className="p-4 sm:p-5">Laravel Scale Edition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-600">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-5 space-y-1">
                      <span className="font-bold text-slate-800 block">{row.name}</span>
                      <span className="text-[10px] text-slate-400 block sm:hidden md:block leading-snug">{row.description}</span>
                    </td>
                    <td className="p-4 sm:p-5 font-semibold">
                      {row.wp.toString().startsWith("✅") || row.wp.toString().startsWith("❌") ? (
                        <span>{row.wp}</span>
                      ) : (
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold text-[10px]">{row.wp}</span>
                      )}
                    </td>
                    <td className="p-4 sm:p-5 font-semibold">
                      {row.laravel.toString().startsWith("✅") || row.laravel.toString().startsWith("❌") ? (
                        <span className="text-emerald-700 font-bold">{row.laravel}</span>
                      ) : (
                        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold text-[10px] border border-emerald-100">{row.laravel}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- UPGRADE PATH SECTION --- */}
      <section id="path" className="py-14 px-6 max-w-6xl mx-auto">
        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">Infinite Scalability</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
              Future-Proof Upgrade Path
            </h2>
            <p className="text-slate-500 font-medium">
              Start lean and upgrade as you scale. Your investment is safe with EzyCom: you never need to rebuild your database or loose statistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-start">
            
            {/* Step 1 */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute -top-4 -left-4 w-9 h-9 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div className="space-y-3 pt-2">
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold uppercase">Launch Phase</span>
                <h3 className="text-base font-bold text-slate-800">WordPress Growth</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Quick deployment setup in 3-5 days. Handle up to 100+ orders daily using shared cPanel hosting services. Perfect to validate products.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-emerald-200 p-6 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute -top-4 -left-4 w-9 h-9 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div className="space-y-3 pt-2">
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold uppercase">Migration Path</span>
                <h3 className="text-base font-bold text-slate-800">1-Click Scale Prep</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Our developer team moves your complete customer database, product matrix, and previous order lists to Laravel with zero business downtime.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute -top-4 -left-4 w-9 h-9 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div className="space-y-3 pt-2">
                <span className="text-[10px] bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-full font-bold uppercase">Enterprise Tier</span>
                <h3 className="text-base font-bold text-slate-800">Laravel Scale CMS</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Scale your store to thousands of daily orders on a optimized cloud VPS. Deploy AI confirmations and advanced multi-role staff access.
                </p>
              </div>
            </div>

          </div>

          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-emerald-800">
              🛡️ Zero Data Loss Guarantee — Customers never rebuild database structures from scratch.
            </span>
          </div>
        </div>
      </section>

      {/* --- LIVE DEMO SECTION --- */}
      <section id="demos" className="py-14 bg-slate-900 text-white px-6">
        <div className="max-w-6xl mx-auto">
          {/* EzyComDemos Live Filter Client Component */}
          <EzyComDemos />
        </div>
      </section>

      {/* --- TRUST & SUPPORT SECTION --- */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Trust Analytics Grid */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">Proven Performance</span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">Scale Your Store with Confidence</h2>
              <p className="text-slate-500 text-sm font-medium">We design architectures that scale to high sales seasons with zero crashes or ordering bugs.</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { count: "250+", label: "Successful Businesses" },
                { count: "৳15 Crore+", label: "Orders Processed" },
                { count: "90+", label: "Average Mobile Speed" },
                { count: "99.9%", label: "System Uptime" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
                  <h3 className="text-2xl font-black text-slate-800">{stat.count}</h3>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Support Scope Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Icons.LifeBuoy className="w-5 h-5 text-emerald-600" />
                Comprehensive Developer Deployment Package
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-500">
                {[
                  { title: "30 Days Setup Support", desc: "Integrate courier panels, load SMS credentials, and sync Meta conversion pixels." },
                  { title: "Hosting Setup Support", desc: "We deploy the files directly to your cPanel hosting or optimized VPS environment." },
                  { title: "Step-by-Step Video Library", desc: "Access standard tutorials on managing categories, tracking orders, and setting discounts." },
                  { title: "Lifetime Updates", desc: "Receive critical security updates and newer editions directly to your email." },
                  { title: "Custom Development Path", desc: "Our developer team is available to construct additional unique integrations." },
                  { title: "Domain Configuration Assistance", desc: "Secure SSL settings, and config DNS routing vectors for faster loads." },
                ].map((sup, idx) => (
                  <div key={idx} className="space-y-1.5 border-l-2 border-emerald-500/20 pl-3">
                    <h4 className="font-bold text-slate-800">{sup.title}</h4>
                    <p className="leading-relaxed text-[11px]">{sup.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-14 bg-white border-y border-slate-100 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">Frequently Asked Questions</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">Got Questions? We Have Answers</h2>
            <p className="text-slate-500 text-sm font-medium">Read details on ownership, migration paths, and courier payment setups.</p>
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
            <a href="#demos" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-6 px-8 rounded-xl cursor-pointer">
                Book Live Demo
              </Button>
            </a>
            <a href="https://wa.me/your-whatsapp-link" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full border-white/20 hover:bg-white/10 text-white font-bold py-6 px-8 rounded-xl cursor-pointer">
                Talk to an Expert
              </Button>
            </a>
            <a href="#demos" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-white/5 hover:bg-white/10 text-slate-300 font-bold py-6 px-8 rounded-xl border border-white/15 cursor-pointer">
                View Admin Panel
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
