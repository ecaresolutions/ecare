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
