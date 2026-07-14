import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Page } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Auto-create contact_info page settings if not present
    const contactInfo = await Page.findOne({ key: "contact_info" });
    if (!contactInfo) {
      await Page.create({
        key: "contact_info",
        content: {
          en: JSON.stringify({
            phone: "+880 1234 56789",
            email: "info@ecare.com",
            address: "Dhanmondi, Dhaka",
            hours: "Sat - Thu: 9 AM - 6 PM",
          }),
          bn: JSON.stringify({
            phone: "+৮৮০ ১২৩৪ ৫৬৭৮৯",
            email: "info@ecare.com",
            address: "ধানমন্ডি, ঢাকা",
            hours: "শনি - বৃহস্পতি: সকাল ৯টা - সন্ধ্যা ৬টা",
          }),
        }
      });
    }

    // Auto-create offer_popup settings if not present
    const offerPopup = await Page.findOne({ key: "offer_popup" });
    if (!offerPopup) {
      await Page.create({
        key: "offer_popup",
        content: {
          en: JSON.stringify({
            title: "Special Welcome Offer! 🎉",
            subtitle: "Get 20% flat discount on your first service with us. Subscribe to our newsletter to unlock your discount code.",
            discountPercent: "20",
            discountCode: "GROWTH20",
            isActive: "true"
          }),
          bn: JSON.stringify({
            title: "বিশেষ স্বাগতম অফার! 🎉",
            subtitle: "আমাদের সাথে আপনার প্রথম সার্ভিসে ফ্ল্যাট ২০% ডিসকাউন্ট পান। আপনার ডিসকাউন্ট কোডটি আনলক করতে আমাদের নিউজলেটারে সাবস্ক্রাইব করুন।",
            discountPercent: "২০",
            discountCode: "GROWTH20",
            isActive: "true"
          }),
        }
      });
    }

    // Auto-create home_solutions settings if not present
    const homeSolutions = await Page.findOne({ key: "home_solutions" });
    if (!homeSolutions) {
      const defaultSolutionsEn = [
        { name: "WP User Frontend", desc: "Ultimate Frontend Solution for WordPress", color: "text-[#00a884] hover:text-[#008c6e]", logoUrl: "/user-frontend-logo.svg", learnMoreUrl: "/services" },
        { name: "WP ERP", desc: "Open source ERP solution built specially for small businesses", color: "text-[#007cf5] hover:text-[#0064c7]", logoUrl: "/erp-logo-color.svg", learnMoreUrl: "/services" },
        { name: "dokan", desc: "Build your dream multi vendor marketplace", color: "text-[#f35c7e] hover:text-[#d74567]", logoUrl: "/dokan-logo.svg", learnMoreUrl: "/services" },
        { name: "appsero", desc: "Perfect companion for WordPress developers", color: "text-[#06b6d4] hover:text-[#0891b2]", logoUrl: "/appsero-logo.svg", learnMoreUrl: "/services" },
        { name: "wePOS", desc: "Fastest POS System for WooCommerce", color: "text-[#007cf5] hover:text-[#0064c7]", logoUrl: "/wepos-logo.png", learnMoreUrl: "/services" },
        { name: "WP Project Manager", desc: "Project Management tool for your team", color: "text-[#7a58f4] hover:text-[#5d3be3]", logoUrl: "/pm-logo.svg", learnMoreUrl: "/services" },
        { name: "Conversion Tracking", desc: "Track WooCommerce conversion data without any coding", color: "text-[#b06ab3] hover:text-[#97539a]", logoUrl: "/wct-logo.svg", learnMoreUrl: "/services" }
      ];

      const defaultSolutionsBn = [
        { name: "WP User Frontend", desc: "ওয়ার্ডপ্রেসের জন্য সেরা ফ্রন্টএন্ড সমাধান", color: "text-[#00a884] hover:text-[#008c6e]", logoUrl: "/user-frontend-logo.svg", learnMoreUrl: "/services" },
        { name: "WP ERP", desc: "ক্ষুদ্র ব্যবসার জন্য বিশেষভাবে তৈরি ওপেন সোর্স ইআরপি সমাধান", color: "text-[#007cf5] hover:text-[#0064c7]", logoUrl: "/erp-logo-color.svg", learnMoreUrl: "/services" },
        { name: "dokan", desc: "আপনার স্বপ্নের মাল্টি-ভেন্ডর মার্কেটপ্লেস তৈরি করুন", color: "text-[#f35c7e] hover:text-[#d74567]", logoUrl: "/dokan-logo.svg", learnMoreUrl: "/services" },
        { name: "appsero", desc: "ওয়ার্ডপ্রেস ডেভেলপারদের জন্য উপযুক্ত সহযোগী", color: "text-[#06b6d4] hover:text-[#0891b2]", logoUrl: "/appsero-logo.svg", learnMoreUrl: "/services" },
        { name: "wePOS", desc: "উকমার্সের জন্য দ্রুততম পিওএস সিস্টেম", color: "text-[#007cf5] hover:text-[#0064c7]", logoUrl: "/wepos-logo.png", learnMoreUrl: "/services" },
        { name: "WP Project Manager", desc: "আপনার টিমের জন্য প্রজেক্ট ম্যানেজমেন্ট টুল", color: "text-[#7a58f4] hover:text-[#5d3be3]", logoUrl: "/pm-logo.svg", learnMoreUrl: "/services" },
        { name: "Conversion Tracking", desc: "কোন কোডিং ছাড়াই উকমার্স কনভার্শন ডাটা ট্র্যাক করুন", color: "text-[#b06ab3] hover:text-[#97539a]", logoUrl: "/wct-logo.svg", learnMoreUrl: "/services" }
      ];

      await Page.create({
        key: "home_solutions",
        content: {
          en: JSON.stringify(defaultSolutionsEn),
          bn: JSON.stringify(defaultSolutionsBn),
        }
      });
    }

    // Auto-create home_at_glance settings if not present
    const homeAtGlance = await Page.findOne({ key: "home_at_glance" });
    if (!homeAtGlance) {
      const defaultAtGlanceEn = [
        { val: "98+", lbl: "Team Members", icon: "Users" },
        { val: "20+", lbl: "Amazing Products", icon: "Puzzle" },
        { val: "8.5 M+", lbl: "Free Downloads", icon: "Download" },
        { val: "424k+", lbl: "Happy Customers", icon: "Smile" },
        { val: "160+", lbl: "Countries Worldwide", icon: "Globe" },
        { val: "15+", lbl: "Years of Journey", icon: "Award" }
      ];

      const defaultAtGlanceBn = [
        { val: "৯৮+", lbl: "টিম মেম্বার", icon: "Users" },
        { val: "২০+", lbl: "অসাধারণ প্রোডাক্ট", "icon": "Puzzle" },
        { val: "৮.৫ মি.+", lbl: "ফ্রি ডাউনলোড", icon: "Download" },
        { val: "৪২৪কে+", lbl: "সন্তুষ্ট কাস্টমার", icon: "Smile" },
        { val: "১৬০+", lbl: "বিশ্বজুড়ে দেশসমূহ", icon: "Globe" },
        { val: "১৫+", lbl: "বছরের পথচলা", icon: "Award" }
      ];

      await Page.create({
        key: "home_at_glance",
        content: {
          en: JSON.stringify(defaultAtGlanceEn),
          bn: JSON.stringify(defaultAtGlanceBn),
        }
      });
    }

    // Auto-create ezy_checkout settings if not present
    const ezyCheckout = await Page.findOne({ key: "ezy_checkout" });
    if (!ezyCheckout) {
      await Page.create({
        key: "ezy_checkout",
        content: {
          en: JSON.stringify({
            // Hero Section
            heroBadge: "WooCommerce PopUp Checkout",
            heroTitle: "Increase WooCommerce Conversion by 40% with PopUp Checkout",
            heroSub: "Ezy Checkout is the ultimate WooCommerce PopUp checkout plugin. Simplify checking out in less than 15 seconds.",
            heroCtaText: "Try Ezy Checkout Free",
            heroImage: "/heroimage-transparent.png",
            
            // Features Section
            featuresBadge: "Unique Features",
            featuresTitle: "Supercharge WooCommerce Experience",
            featuresList: [
              { title: "One Page Popup Checkout", desc: "No more multi-step redirect friction. Customers complete checkout on the spot.", icon: "ShoppingBag" },
              { title: "Smart Coupon Engine", desc: "Validate discount codes instantly inside the popup form to reduce order abandonment.", icon: "Sparkles" },
              { title: "Address Validation", desc: "Verify shipping inputs and calculate dynamic shipping rates in real-time.", icon: "ShieldCheck" },
              { title: "Ajax Processing", desc: "Fast asynchronous form submission ensures zero page reload delays.", icon: "Cpu" },
              { title: "Multi-site Licensing", desc: "Easily integrate Ezy Checkout across multiple staging or production client stores.", icon: "Layers" },
              { title: "Developer Hook Filters", desc: "Extensible codebase allowing developers to add custom checkout fields and rules.", icon: "Clock" }
            ],
            
            // Product Overview
            aboutBadge: "Product Overview",
            aboutTitle: "Beautiful PopUp Form & Settings Dashboard",
            aboutImage: "https://www.youtube.com/watch?v=s8m6oHByjjI",
            
            // Feature Details (Section 3)
            sec3Badge: "WooCommerce PopUp Checkout",
            sec3Title: "Quick checkout & boost WooCommerce sales",
            sec3Desc: "Ezy Checkout is a simple yet extremely powerful popup checkout plugin for WooCommerce that allows your customers to complete purchases without leaving the page.",
            sec3Feature1Title: "Instant checkout popup",
            sec3Feature1Desc: "Let your customers check out instantly via a beautifully designed checkout popup window.",
            sec3Feature2Title: "Coupon & shipping rules",
            sec3Feature2Desc: "Use WooCommerce coupon codes with live validation directly inside the popup checkout form.",
            sec3CtaText: "Buy Ezycheckout",
            sec3Image: "/ezy-checkout-hero.png",
            
            // Feature Details 2 (Section 4)
            sec4Badge: "Schedule Meeting",
            sec4Title: "Full Control Over Checkout Styling & Fields",
            sec4Desc: "Customize checkout fields, borders, colors, and button animations directly from your WordPress admin dashboard to perfectly align with your brand identity.",
            sec4Point1: "Interactive Color Picker for modal overlays, backgrounds, and buttons",
            sec4Point2: "Choose between 6+ button micro-animations and typography configurations",
            sec4Point3: "Ajax-powered settings panel with instant save capabilities",
            sec4CtaText: "Download Now",
            sec4Image: "/ezy-checkout-hero.png",

            // Feature Details 3 (Section 5)
            sec5Badge: "Advanced Logic",
            sec5Title: "Optimized for Checkout Speed & Compatibility",
            sec5Desc: "Ezy Checkout handles WooCommerce integrations gracefully, from coupon abuse protection to CartFlows compatibility options.",
            sec5Point1: "Replace default WooCommerce checkout automatically",
            sec5Point2: "CartFlows compatibility options to avoid layout conflicts",
            sec5Point3: "Quantity selectors and order notes support inside popup",
            sec5CtaText: "Buy Ezycheckout",
            sec5Image: "/ezy-checkout-hero.png",
            
            // Pricing Details
            pricingTitle: "Flexible License Plans",
            pricingSub: "Start improving your checkout experience for your business today.",
            planFree: "Free Version",
            planFreeDesc: "Basic popup layout and standard checkout form features.",
            freePrice: "0",
            freeLifetime: "Lifetime",
            freeFeature1: "Ready-to-use checkout popup layout",
            freeFeature2: "Instant warnings for incorrect details",
            freeFeature3: "Superfast checkout without page reloads",
            freeFeature4: "Change product quantity inside the popup",
            freeFeature5: "Enable or disable extra order notes field",
            downloadNow: "Download Now",
            planPro: "Pro Version",
            planProDesc: "Unlimited styling control, coupon validation, priority support and multi-site licenses.",
            proPrice: "2,800",
            proLifetime: "Lifetime (3 Sites)",
            proFeature1: "Fully customize colors, borders & styling",
            proFeature2: "Show instant discounts when coupons are applied",
            proFeature3: "Calculate shipping charges automatically by address",
            proFeature4: "Show extra attractive offers to boost sales",
            proFeature5: "Compatible with bKash, Rocket, Nagad & standard gateways",
            proFeature6: "Works smoothly with any theme or page builder",
            proFeature7: "1 year of direct priority support & updates",
            getPro: "Ezy Checkout Pro",
            recTag: "Recommended",
            
            // FAQs
            faqTitle: "Frequently Asked Questions",
            faqsList: [
              { q: "Is WooCommerce required?", a: "Yes. Ezy Checkout is specifically built as a popup addition for WooCommerce shops." },
              { q: "Does it replace default checkout?", a: "No. It provides a quick checkout popup alternative, keeping your standard page functional." },
              { q: "Is my customer data safe?", a: "Completely. All calculations and submissions process securely on your own server." }
            ]
          }),
          bn: JSON.stringify({
            // Hero Section
            heroBadge: "পপআপ উকমার্স চেকআউট",
            heroTitle: "পপআপ চেকআউট দিয়ে আপনার সেলস বৃদ্ধি করুন ৪০% পর্যন্ত",
            heroSub: "Ezy Checkout হলো উকমার্সের জন্য চূড়ান্ত পপআপ চেকআউট প্লাগইন। অর্ডার সম্পন্ন করুন ১৫ সেকেন্ডের মধ্যে।",
            heroCtaText: "ফ্রি ট্রায়াল শুরু করুন",
            heroImage: "/heroimage-transparent.png",
            
            // Features Section
            featuresBadge: "ইউনিক ফিচারসমূহ",
            featuresTitle: "আমাদের প্লাগিনের শক্তিশালী ফিচারসমূহ",
            featuresList: [
              { title: "পপআপ উকমার্স চেকআউট", desc: "পপআপ চেকআউট ফ্লো কাস্টমারকে এক পেজেই অর্ডার কমপ্লিট করার সুবিধা দেয়।", icon: "ShoppingBag" },
              { title: "স্মার্ট কুপন ইঞ্জিন", desc: "পপআপ চেকআউটের ভেতরেই সরাসরি কুপন কোড ব্যবহার করার সুবিধা ও সিকিউরিটি চেক।", icon: "Sparkles" },
              { title: "শিপিং এবং ভ্যালিডেশন", desc: "অ্যাড্রেস ইনপুটের লাইভ সার্ভার-সাইড ভ্যালিডেশন এবং ডায়নামিক শিপিং মেথড আপডেট।", icon: "ShieldCheck" },
              { title: "অ্যাডমিন এজ্যাক্স সেটিংস", desc: "খুব সহজেই প্লাগিনের স্টাইল, কালার, লেআউট এবং টেক্সট কন্ট্রোল করার জন্য ড্যাশবোর্ড সেটিংস।", icon: "Cpu" },
              { title: "মাল্টি-সাইট লাইসেন্সিং", desc: "খুব সহজেই একাধিক ক্লায়েন্ট WooCommerce স্টোরে পপআপ চেকআউট রান করুন।", icon: "Layers" },
              { title: "ডেভেলপার ডকুমেন্টেশন", desc: "সহজেই প্লাগিনের ডাটা ও ফিল্ড কাস্টমাইজ করতে এক্সটেনসিবল হুক ও ফিল্টার সুবিধা।", icon: "Clock" }
            ],
            
            // Product Overview
            aboutBadge: "প্রোডাক্ট ওভারভিউ",
            aboutTitle: "আকর্ষণীয় পপআপ ফর্ম এবং সেটিংস ড্যাশবোর্ড",
            aboutImage: "https://www.youtube.com/watch?v=s8m6oHByjjI",
            
            // Feature Details (Section 3)
            sec3Badge: "পপআপ চেকআউট",
            sec3Title: "দ্রুত চেকআউট এবং WooCommerce বিক্রয় বৃদ্ধি",
            sec3Desc: "Ezy Checkout হলো WooCommerce-এর জন্য একটি সহজ অথচ অত্যন্ত শক্তিশালী প্লাগিন যা গ্রাহকদের পেজ না ছেড়েই সরাসরি একটি পপআপ মডালের মাধ্যমে তাদের কেনাকাটা সম্পন্ন করতে সাহায্য করে।",
            sec3Feature1Title: "তাৎক্ষণিক চেকআউট মডাল",
            sec3Feature1Desc: "একটি চমৎকার ডিজাইনের চেকআউট পপআপ মডাল উইন্ডোর মাধ্যমে গ্রাহকদের মুহূর্তেই চেকআউট করতে দিন।",
            sec3Feature2Title: "কুপন ও শিপিং নিয়মাবলী",
            sec3Feature2Desc: "চেকআউট মডালের ভেতরেই সরাসরি লাইভ ভ্যালিডেশন সহ WooCommerce কুপন কোড ব্যবহার করুন।",
            sec3CtaText: "Buy Ezycheckout",
            sec3Image: "/ezy-checkout-hero.png",
            
            // Feature Details 2 (Section 4)
            sec4Badge: "মিটিং শিডিউল করুন",
            sec4Title: "চেকআউট স্টাইলিং এবং ফিল্ড সমূহের উপর পূর্ণ নিয়ন্ত্রণ",
            sec4Desc: "আপনার ব্র্যান্ডের সাথে মানানসই করতে আপনার ওয়ার্ডপ্রেস অ্যাডমিন ড্যাশবোর্ড থেকে সরাসরি চেকআউট ফিল্ড, বর্ডার, কালার এবং বোতামের অ্যানিমেশন কাস্টমাইজ করুন।",
            sec4Point1: "মডাল ওভারলে, ব্যাকগ্রাউন্ড এবং বাটনের জন্য ইন্টারেক্টিভ কালার পিকার",
            sec4Point2: "৬+ বাটনের মাইক্রো-অ্যানিমেশন এবং টাইপোগ্রাফি কনফিগারেশন",
            sec4Point3: "তাৎক্ষণিকভাবে সেভ করার সুবিধাযুক্ত এজ্যাক্স-চালিত সেটিংস প্যানেল",
            sec4CtaText: "এখনই ডাউনলোড করুন",
            sec4Image: "/ezy-checkout-hero.png",

            // Feature Details 3 (Section 5)
            sec5Badge: "অ্যাডভান্সড লজিক",
            sec5Title: "দ্রুততম চেকআউট স্পিড এবং সর্বোচ্চ সামঞ্জস্যতা",
            sec5Desc: "ইজি চেকআউট কুপনের অপব্যবহার রোধ থেকে শুরু করে কার্টফ্লো (CartFlows) প্লাগিনের সাথে সামঞ্জস্য রেখে অত্যন্ত নিখুঁতভাবে অর্ডার প্রসেস করে।",
            sec5Point1: "ডিফল্ট WooCommerce চেকআউট পেজ অটো-রিপ্লেস করার সুবিধা",
            sec5Point2: "কনফ্লিক্ট এড়াতে CartFlows পেজগুলোতে পপআপ বন্ধ করার অপশন",
            sec5Point3: "পপআপের ভেতরেই প্রোডাক্ট কোয়ান্টিটি সিলেক্টর এবং অর্ডার নোট সাপোর্ট",
            sec5CtaText: "Buy Ezycheckout",
            sec5Image: "/ezy-checkout-hero.png",
            
            // Pricing Details
            pricingTitle: "সহজ ও সাশ্রয়ী লাইসেন্স প্ল্যান",
            pricingSub: "আপনার ব্যবসার জন্য সেরা পপআপ চেকআউট অভিজ্ঞতা নিয়ে কাজ শুরু করুন এখনই।",
            planFree: "ফ্রি ভার্সন",
            planFreeDesc: "বেসিক পপআপ লেআউট এবং স্ট্যান্ডার্ড চেকআউট ফর্ম সুবিধা।",
            freePrice: "০",
            freeLifetime: "আজীবন",
            freeFeature1: "সহজ ও সুন্দর রেডিমেড পপআপ ফর্ম",
            freeFeature2: "ভুল তথ্য দিলে স্বয়ংক্রিয় সতর্কবার্তা",
            freeFeature3: "পেজ লোড ছাড়াই দ্রুত অর্ডার সম্পন্ন করা",
            freeFeature4: "পপআপ থেকেই পণ্যের সংখ্যা কমানো-বাড়ানোর সুবিধা",
            freeFeature5: "অর্ডারের সাথে বাড়তি মেসেজ লেখার ঘর অন/অফ করার সুবিধা",
            downloadNow: "এখনই ডাউনলোড করুন",
            planPro: "প্রো ভার্সন",
            planProDesc: "আনলিমিটেড স্টাইলিং কন্ট্রোল, কুপন ভ্যালিডেশন, প্রায়োরিটি সাপোর্ট এবং মাল্টি-সাইট লাইসেন্স।",
            proPrice: "২,৮০০",
            proLifetime: "আজীবন (৩টি সাইট)",
            proFeature1: "প্লাগিনের রঙ ও ডিজাইন মনের মতো সাজানোর সুবিধা",
            proFeature2: "কুপন কোড লিখলেই সাথে সাথে ডিসকাউন্ট হিসাব",
            proFeature3: "ঠিকানা অনুযায়ী শিপিং চার্জ স্বয়ংক্রিয়ভাবে হিসাব করা",
            proFeature4: "অর্ডার করার সময় অতিরিক্ত আকর্ষণীয় অফার দেখানোর সুযোগ",
            proFeature5: "বিকাশ, রকেট, নগদ বা যেকোনো পেমেন্ট গেটওয়ের সাথে কাজ করার সুবিধা",
            proFeature6: "যেকোনো থিম বা পেজ বিল্ডারের সাথে ঝামেলাহীনভাবে কাজ করার সুবিধা",
            proFeature7: "১ বছর যেকোনো প্রয়োজনে সরাসরি আমাদের সাপোর্ট ও আপডেট",
            getPro: "Ezy Checkout প্রো নিন",
            recTag: "প্রস্তাবিত",
            
            // FAQs
            faqTitle: "সচরাচর জিজ্ঞাস্য প্রশ্নাবলী",
            faqsList: [
              { q: "Ezy Checkout ব্যবহার করতে কি WooCommerce প্রয়োজন?", a: "হ্যাঁ, এটি সরাসরি WooCommerce-এর সাথে কাজ করে। WooCommerce-এর ব্যাকএন্ড এপিআই ব্যবহার করে নিরাপদভাবে অর্ডার তৈরি করা হয়।" },
              { q: "এটি কি ডিফল্ট WooCommerce চেকআউট পেজকে রিপ্লেস করে?", a: "না, এটি দ্রুত পপআপ চেকআউটের একটি বিকল্প অপশন যোগ করে, তবে আপনার ডিফল্ট চেকআউট পেজটি আগের মতোই সচল থাকবে।" },
              { q: "গ্রাহকের তথ্য কি এখানে নিরাপদ?", a: "হ্যাঁ। সকল তথ্য সরাসরি আপনার নিজস্ব হোস্টিং সার্ভারে প্রসেস করা হয়। প্লাগিনটি বাইরের কোনো সার্ভারে গ্রাহকের তথ্য পাঠায় না।" }
            ]
          }),
        }
      });
    }

    // Auto-create bkash_settings if not present
    const bkashSettings = await Page.findOne({ key: "bkash_settings" });
    if (!bkashSettings) {
      await Page.create({
        key: "bkash_settings",
        content: {
          en: JSON.stringify({
            apiUrl: process.env.BKASH_API_URL || "https://tokenized.sandbox.bka.sh/v1.2.0-beta",
            username: process.env.BKASH_USERNAME || "",
            password: process.env.BKASH_PASSWORD || "",
            appKey: process.env.BKASH_APP_KEY || "",
            appSecret: process.env.BKASH_APP_SECRET || ""
          }),
          bn: JSON.stringify({
            apiUrl: process.env.BKASH_API_URL || "https://tokenized.sandbox.bka.sh/v1.2.0-beta",
            username: process.env.BKASH_USERNAME || "",
            password: process.env.BKASH_PASSWORD || "",
            appKey: process.env.BKASH_APP_KEY || "",
            appSecret: process.env.BKASH_APP_SECRET || ""
          })
        }
      });
    }

    // Auto-create smtp_settings if not present
    const smtpSettings = await Page.findOne({ key: "smtp_settings" });
    if (!smtpSettings) {
      await Page.create({
        key: "smtp_settings",
        content: {
          en: JSON.stringify({
            host: "smtp.gmail.com",
            port: "465",
            secure: "true",
            authEmail: "",
            authPass: "",
            senderEmail: "no-reply@ecare.com",
            adminNoticeEmail: "admin@ecare.com"
          }),
          bn: JSON.stringify({
            host: "smtp.gmail.com",
            port: "465",
            secure: "true",
            authEmail: "",
            authPass: "",
            senderEmail: "no-reply@ecare.com",
            adminNoticeEmail: "admin@ecare.com"
          })
        }
      });
    }

    // Auto-create gtm_settings if not present
    const gtmSettings = await Page.findOne({ key: "gtm_settings" });
    if (!gtmSettings) {
      await Page.create({
        key: "gtm_settings",
        content: {
          en: JSON.stringify({
            containerId: "",
            isEnabled: "false"
          }),
          bn: JSON.stringify({
            containerId: "",
            isEnabled: "false"
          })
        }
      });
    }

    // Auto-create clarity_settings if not present
    const claritySettings = await Page.findOne({ key: "clarity_settings" });
    if (!claritySettings) {
      await Page.create({
        key: "clarity_settings",
        content: {
          en: JSON.stringify({
            projectId: "",
            isEnabled: "false"
          }),
          bn: JSON.stringify({
            projectId: "",
            isEnabled: "false"
          })
        }
      });
    }

    // Auto-create elevenlabs_settings if not present
    const elevenlabsSettings = await Page.findOne({ key: "elevenlabs_settings" });
    if (!elevenlabsSettings) {
      await Page.create({
        key: "elevenlabs_settings",
        content: {
          en: JSON.stringify({
            agentId: "",
            isEnabled: "false"
          }),
          bn: JSON.stringify({
            agentId: "",
            isEnabled: "false"
          })
        }
      });
    }

    // Auto-create ezycom settings if not present
    const ezycom = await Page.findOne({ key: "ezycom" });
    if (!ezycom) {
      await Page.create({
        key: "ezycom",
        content: {
          en: JSON.stringify({
  "stickyNavLinks": {
    "problem": "Problems",
    "features": "Local Features",
    "demos": "Demos",
    "compare": "Compare",
    "faq": "FAQ"
  },
  "stickyNavCta": "Get Started",
  "heroBadge": "Best eCommerce Website Guarantee",
  "heroTitleHtml": "Your Website Should <span class=\"text-primary\">Sell More</span>, <br class=\"hidden sm:inline\" />Not Just Look <span class=\"text-primary\">Beautiful.</span>",
  "heroSub": "A ready-to-launch eCommerce system built specifically for Bangladeshi businesses.",
  "heroCtaFree": "Start 1-Day Free Trial",
  "heroCtaBuild": "Build Your Store",
  "tickerTitle": "Who is Ezycom for?",
  "tickerItems": [
    "Direct-to-Consumer (DTC) Brands",
    "High-Volume F-Commerce Shops",
    "Fashion, Apparel & Beauty Stores",
    "Gadgets, Tech & Electronics",
    "Organic Groceries & Food Outlets",
    "Local & Global Dropshipping",
    "No Coding Experience Required",
    "Launch Your Store in 24 Hours",
    "Maximize Conversions & Automation"
  ],
  "demosSectionBadge": "Live Demo Stores",
  "demosSectionTitleHtml": "Premium <span class=\"text-primary\">Pre-Build</span> Demos",
  "demosSectionSub": "Test checkout flows, verify page load speeds, and explore the backend custom admin panels live.",
  "demosSectionPlaceholder": "Looking for a specific demo? Type here...",
  "demosSectionCatAll": "All Together",
  "demosSectionCatWordPress": "Woocom",
  "demosSectionCatLaravel": "Laracom",
  "demosSectionBtnLive": "Live Site",
  "demosSectionBtnAdmin": "Admin Panel",
  "compareSectionBadge": "Platform Comparison",
  "compareSectionTitleHtml": "<span class=\"text-blue-600 dark:text-blue-400\">Woocom</span> vs <span class=\"text-primary\">Laracom</span> Comparison",
  "compareSectionSub": "Choose the platform that matches your business volume, performance goals, and hosting preferences.",
  "compareSectionColFeatures": "Core Features",
  "compareSectionColWp": "Core WordPress",
  "compareSectionColLaravel": "Core Laravel",
  "compareSectionRows": [
    {
      "name": "Business Size",
      "desc": "Target business volume best handled by architecture.",
      "wp": "Growing (Up to ৳5L/mo)",
      "laravel": "Scaling (৳5L - ৳50L+/mo)"
    },
    {
      "name": "Checkout Speed",
      "desc": "Time taken to complete purchase steps.",
      "wp": "Under 2 Seconds",
      "laravel": "Sub-second (Instant)"
    },
    {
      "name": "Security & Anti-DDoS",
      "desc": "Built-in firewall, security, and spam filters.",
      "wp": "Standard Plugin Defense",
      "laravel": "Enterprise Node & DB Shield"
    },
    {
      "name": "AI Voice Order Confirm",
      "desc": "AI calls customers to verify addresses and reduce returns.",
      "wp": "❌ Not Available",
      "laravel": "✅ Fully Automated Integration"
    },
    {
      "name": "Courier Auto Entry",
      "desc": "Direct syncing with Pathao, Steadfast, and RedX.",
      "wp": "✅ Standard Manual Click",
      "laravel": "✅ 100% Automated Background API"
    },
    {
      "name": "Facebook API Integration",
      "desc": "Facebook Ads Server-Side tracking.",
      "wp": "✅ CAPI Plugin Setup",
      "laravel": "✅ Built-in Meta SDK (Zero drop)"
    },
    {
      "name": "Accounting Ledger",
      "desc": "Track net profits, Courier charges, and COD cash flows.",
      "wp": "❌ Basic Sales Tracking",
      "laravel": "✅ Advanced Cashbook & Expense Logs"
    },
    {
      "name": "Role-Permissions Matrix",
      "desc": "Restrict staff to view specific orders or export lists.",
      "wp": "Basic Role Manager",
      "laravel": "Granular Staff Access Matrix"
    },
    {
      "name": "Upgrade Migration",
      "desc": "Move your data without restarting from scratch.",
      "wp": "Ready for Laravel Migration",
      "laravel": "Ultimate Scale Architecture"
    },
    {
      "name": "License Type",
      "desc": "One-time cost, no monthly SaaS subscriptions.",
      "wp": "Lifetime License",
      "laravel": "Lifetime License"
    },
    {
      "name": "Server Requirements",
      "desc": "Recommended hosting for maximum output.",
      "wp": "Standard cPanel Shared Hosting",
      "laravel": "Optimized VPS / Cloud Server"
    },
    {
      "name": "Support Period",
      "desc": "Direct WhatsApp support and bug fixing assistance.",
      "wp": "30 Days Setup Support",
      "laravel": "30 Days Premium Tech Support"
    }
  ],
  "finalCtaBadge": "Immediate Business Growth",
  "finalCtaTitle": "Choose the Right E-commerce Platform for Your Business",
  "finalCtaSub": "Launch a fast, localized store connected natively to Steadfast, Facebook Conversion APIs, and local gateways. Get your lifetime license.",
  "finalCtaCtaDemo": "Book Live Demo",
  "finalCtaCtaExpert": "Talk to an Expert",
  "finalCtaNote": "One-Time Payment. Lifetime License. No Subscription Traps."
}),
          bn: JSON.stringify({
  "stickyNavLinks": {
    "problem": "সমস্যাসমূহ",
    "features": "লোকাল ফিচারসমূহ",
    "demos": "ডেমো স্টোর",
    "compare": "ফিচার তুলনা",
    "faq": "প্রশ্নোত্তর"
  },
  "stickyNavCta": "শুরু করুন",
  "heroBadge": "সেরা ই-কমার্স ওয়েবসাইট গ্যারান্টি!",
  "heroTitleHtml": "অর্ডার হবে এখন <br class=\"hidden sm:inline\" /><span class=\"text-primary\">নিজের ওয়েবসাইটে!</span>",
  "heroSub": "বাংলাদেশি অনলাইন ব্যবসার জন্য বিশেষভাবে তৈরি একটি রেডি-টু-লঞ্চ ই-কমার্স সিএমএস সিস্টেম।",
  "heroCtaFree": "১ দিনের ফ্রি ট্রায়াল শুরু করুন",
  "heroCtaBuild": "ই-কমার্স তৈরি করুন",
  "tickerTitle": "কাদের জন্য Ezycom?",
  "tickerItems": [
    "ডিটিসি ব্র্যান্ডস (DTC Brands)",
    "এফ-কমার্স বিজনেস (F-Commerce)",
    "ফ্যাশন ও কসমেটিক্স (Fashion & Beauty)",
    "গ্যাজেটস ও ইলেকট্রনিক্স (Gadgets)",
    "অর্গানিক ও গ্রোসারি ফুডস (Foods)",
    "লোকাল ড্রপশিপিং (Dropshipping)",
    "কোডিং জানার প্রয়োজন নেই (No Coding)",
    "২৪ ঘণ্টায় আপনার স্টোর লাইভ",
    "সেলস বৃদ্ধি ও কুরিয়ার অটোমেশন"
  ],
  "demosSectionBadge": "লাইভ ডেমো স্টোরসমূহ",
  "demosSectionTitleHtml": "প্রিমিয়াম <span class=\"text-primary\">রেডি-বিল্ড</span> ডেমো স্টোর",
  "demosSectionSub": "চেকআউট ফ্লো টেস্ট করুন, পেজের স্পিড যাচাই করুন এবং কাস্টম এডমিন প্যানেল ঘুরে দেখুন।",
  "demosSectionPlaceholder": "কোন নির্দিষ্ট ডেমো খুঁজছেন? টাইপ করুন...",
  "demosSectionCatAll": "সবগুলো একসাথে",
  "demosSectionCatWordPress": "উকম (Woocom)",
  "demosSectionCatLaravel": "লারা কম (Laracom)",
  "demosSectionBtnLive": "লাইভ সাইট",
  "demosSectionBtnAdmin": "অ্যাডমিন প্যানেল",
  "compareSectionBadge": "ফিচার তুলনা",
  "compareSectionTitleHtml": "<span class=\"text-blue-600 dark:text-blue-400\">Woocom</span> বনাম <span class=\"text-primary\">Laracom</span> তুলনা",
  "compareSectionSub": "আপনার ব্যবসার গতি, স্কেল এবং বাজেট অনুযায়ী সঠিক প্ল্যাটফর্মটি নির্বাচন করুন।",
  "compareSectionColFeatures": "ফিচার সমূহ",
  "compareSectionColWp": "Woocom (WordPress)",
  "compareSectionColLaravel": "Laracom (Laravel)",
  "compareSectionRows": [
    {
      "name": "ব্যবসার সাইজ",
      "desc": "ডিজাইন অনুযায়ী কোন ভলিউমের ব্যবসা হ্যান্ডেল করতে সক্ষম।",
      "wp": "ক্রমবর্ধমান (মাসিক ৫ লাখ পর্যন্ত)",
      "laravel": "স্কেলিং (মাসিক ৫ লাখ - ৫০ লাখ+)"
    },
    {
      "name": "চেকআউট স্পিড",
      "desc": "অর্ডার সম্পন্ন করতে গ্রাহকের কতটুকু সময় লাগবে।",
      "wp": "২ সেকেন্ডের নিচে",
      "laravel": "১ সেকেন্ডের নিচে (তাত্ক্ষণিক)"
    },
    {
      "name": "নিরাপত্তা ও স্প্যাম প্রোটেকশন",
      "desc": "হ্যাকিং এবং রোবট বা ফেক অর্ডার আটকাতে নিজস্ব সিকিউরিটি।",
      "wp": "প্লাগইন নির্ভর ডিফেন্স",
      "laravel": "এন্টারপ্রাইজ ডাটাবেস ও নোড শিল্ড"
    },
    {
      "name": "AI ভয়েস কল অর্ডার ভেরিফিকেশন",
      "desc": "গ্রাহকের ঠিকানার সত্যতা ও ডেলিভারি সফল করতে স্বয়ংক্রিয় কল।",
      "wp": "❌ উপলব্ধ নয়",
      "laravel": "✅ সম্পূর্ণ অটোমেটেড ইন্টিগ্রেশন"
    },
    {
      "name": "কুরিয়ার এপিআই কানেকশন",
      "desc": "অর্ডার সরাসরি Steadfast বা Pathao প্যানেলে বুকিং করা।",
      "wp": "✅ ওয়ান-ক্লিক ম্যানুয়াল বুকিং",
      "laravel": "✅ ১০০% অটোমেটেড ব্যাকগ্রাউন্ড বুকিং"
    },
    {
      "name": "ফেসবুক কনভার্সন এপিআই (CAPI)",
      "desc": "বিজ্ঞাপনের সঠিক ডাটা ও পারফরম্যান্স ট্র্যাকিং।",
      "wp": "✅ প্লাগইনের মাধ্যমে CAPI সেটআপ",
      "laravel": "✅ ইনবিল্ট নেটিভ SDK (ডাটা লস নেই)"
    },
    {
      "name": "অ্যাকাউন্টিং লেজার ও ক্যাশ বুক",
      "desc": "অর্ডারের পাশাপাশি প্রফিট-লস হিসাব করার খাতা।",
      "wp": "❌ বেসিক সেলস রিপোর্ট",
      "laravel": "✅ অ্যাডভান্সড ক্যাশবুক ও কুরিয়ার হিসাব"
    },
    {
      "name": "স্টাফ অ্যাক্সেস কন্ট্রোল",
      "desc": "ম্যানেজার বা ডাটা এন্ট্রি স্টাফদের লিমিটেড অ্যাক্সেস দেওয়া।",
      "wp": "বেসিক রোল ম্যানেজার",
      "laravel": "অ্যাডভান্সড স্টাফ পারমিশন গ্রিড"
    },
    {
      "name": "ভবিষ্যৎ আপগ্রেড সুবিধা",
      "desc": "ব্যবসা বড় হলে এক প্ল্যাটফর্ম থেকে অন্য প্ল্যাটফর্মে রূপান্তর।",
      "wp": "লারাভেলে আপগ্রেড করার অপশন",
      "laravel": "সর্বোচ্চ লেভেলের স্কেল আর্কিটেকচার"
    },
    {
      "name": "লাইসেন্সের ধরণ",
      "desc": "কোনো মাসিক ফিস আছে নাকি ওয়ান-টাইম পেমেন্ট।",
      "wp": "লাইফটাইম লাইসেন্স (এককালীন)",
      "laravel": "লাইফটাইম লাইসেন্স (এককালীন)"
    },
    {
      "name": "হোস্টিং প্রয়োজনীয়তা",
      "desc": "স্টোর রান করার জন্য কোন সার্ভার কনফিগারেশন রিকমেন্ডেড।",
      "wp": "শেয়ার্ড বা cPanel হোস্টিং",
      "laravel": "ভিপিএস (VPS) বা ক্লাউড হোস্টিং"
    },
    {
      "name": "টেকনিক্যাল সাপোর্ট",
      "desc": "ক্রয়ের পর কত দিন পর্যন্ত ফ্রি সেটআপ সাহায্য দেওয়া হয়।",
      "wp": "৩০ দিন পর্যন্ত ফ্রি সেটআপ সহায়তা",
      "laravel": "৩০ দিন পর্যন্ত প্রিমিয়াম টেক সাপোর্ট"
    }
  ],
  "finalCtaBadge": "ব্যবসায়িক প্রবৃদ্ধি নিশ্চিত করুন",
  "finalCtaTitle": "আপনার ব্যবসার জন্য সঠিক ই-কমার্স প্ল্যাটফর্মটি বেছে নিন",
  "finalCtaSub": "Steadfast, Facebook Conversion APIs এবং লোকাল গেটওয়ের সাথে সরাসরি কানেক্টেড সুপার-ফাস্ট স্টোর চালু করুন আজই। আজীবন লাইসেন্স পান।",
  "finalCtaCtaDemo": "লাইভ ডেমো বুক করুন",
  "finalCtaCtaExpert": "এক্সপার্ট এর সাথে কথা বলুন",
  "finalCtaNote": "এককালীন পেমেন্ট। লাইফটাইম লাইসেন্স। কোনো মাসিক চার্জ বা সাবস্ক্রিপশন ট্র্যাপ নেই।"
})
        }
      });
    }

    const pages = await Page.find({});
    return NextResponse.json({ success: true, data: pages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();

    if (!body.key || !body.content || !body.content.en || !body.content.bn) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Check if key exists
    const existing = await Page.findOne({ key: body.key });
    if (existing) {
      return NextResponse.json({ success: false, error: "Page key already exists" }, { status: 400 });
    }

    const page = await Page.create(body);
    return NextResponse.json({ success: true, data: page });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
