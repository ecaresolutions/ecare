"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, FileText, Check, AlertTriangle, Phone, Mail, MapPin, Clock, Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronRight } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface SolutionFormItem {
  name: string;
  descEn: string;
  descBn: string;
  color: string;
  logoUrl: string;
  learnMoreUrl: string;
}

interface AtGlanceFormItem {
  valEn: string;
  valBn: string;
  lblEn: string;
  lblBn: string;
  icon: string;
}

interface PageItem {
  _id: string;
  key: string;
  content: {
    en: string;
    bn: string;
  };
}

interface ContactFields {
  phone: string;
  email: string;
  address: string;
  hours: string;
  mapUrl?: string;
}

interface BkashSettingsFields {
  apiUrl: string;
  username: string;
  password:  string;
  appKey: string;
  appSecret: string;
}

interface SmtpSettingsFields {
  host: string;
  port: string;
  secure: string;
  authEmail: string;
  authPass: string;
  senderEmail: string;
  adminNoticeEmail: string;
}

interface OfferPopupFields {
  title: string;
  subtitle: string;
  discountPercent: string;
  discountCode: string;
  isActive: string;
}

interface GtmSettingsFields {
  containerId: string;
  isEnabled: string;
}

interface ClaritySettingsFields {
  projectId: string;
  isEnabled: string;
}

interface ElevenLabsSettingsFields {
  agentId: string;
  isEnabled: string;
}

interface EzyFeatureItem {
  title: string;
  desc: string;
  icon: string;
}

interface EzyFaqItem {
  q: string;
  a: string;
}

interface HomeConsultingCtaFields {
  image: string;
  badge: string;
  title: string;
  description: string;
  trustText: string;
  btn1Text: string;
  btn1Url: string;
  btn2Text: string;
  btn2Url: string;
}

interface EzyComStickyNavLinks {
  problem: string;
  features: string;
  demos: string;
  compare: string;
  faq: string;
}

interface EzyComCompareRow {
  name: string;
  desc: string;
  wp: string;
  laravel: string;
}

interface EzyComProblemCard {
  icon: string;
  title: string;
  desc: string;
  badge: string;
}

interface EzyComBentoCard {
  tag: string;
  title: string;
  desc: string;
  image: string;
}

interface EzyComFeatureItem {
  title: string;
  desc: string;
}

interface EzyComVideoTab {
  tag: string;
  title: string;
  desc: string;
  thumbnail: string;
  youtubeId: string;
}

interface EzyComFields {
  heroImages: string[];
  problemSectionBadge: string;
  problemSectionTitleHtml: string;
  problemSectionSub: string;
  problemSectionCards: EzyComProblemCard[];
  capabilitiesSectionBadge: string;
  capabilitiesSectionTitleHtml: string;
  capabilitiesSectionSub: string;
  capabilitiesBentoCards: EzyComBentoCard[];
  capabilitiesFeatureItems: EzyComFeatureItem[];
  videoSectionBadge: string;
  videoSectionTitleHtml: string;
  videoSectionSub: string;
  videoSectionTabs: EzyComVideoTab[];
  stickyNavLinks: EzyComStickyNavLinks;
  stickyNavCta: string;
  heroBadge: string;
  heroTitleHtml: string;
  heroSub: string;
  heroCtaFree: string;
  heroCtaBuild: string;
  tickerTitle: string;
  tickerItems: string[];
  demosSectionBadge: string;
  demosSectionTitleHtml: string;
  demosSectionSub: string;
  demosSectionPlaceholder: string;
  demosSectionCatAll: string;
  demosSectionCatWordPress: string;
  demosSectionCatLaravel: string;
  demosSectionBtnLive: string;
  demosSectionBtnAdmin: string;
  compareSectionBadge: string;
  compareSectionTitleHtml: string;
  compareSectionSub: string;
  compareSectionColFeatures: string;
  compareSectionColWp: string;
  compareSectionColLaravel: string;
  compareSectionRows: EzyComCompareRow[];
  finalCtaBadge: string;
  finalCtaTitle: string;
  finalCtaSub: string;
  finalCtaCtaDemo: string;
  finalCtaCtaExpert: string;
  finalCtaNote: string;
}

interface EzyCheckoutFields {
  // Hero Section
  heroBadge: string;
  heroTitle: string;
  heroSub: string;
  heroCtaText: string;
  heroCtaUrl: string;
  heroSubCtaText: string;
  heroSubCtaUrl: string;
  heroImage: string;

  // Features Section
  featuresBadge: string;
  featuresTitle: string;
  featuresList: EzyFeatureItem[];

  // Product Overview
  aboutBadge: string;
  aboutTitle: string;
  aboutImage: string;

  // Services Section Header
  servicesBadge: string;
  servicesTitle: string;

  // Feature Details (Section 3)
  sec3Badge: string;
  sec3Title: string;
  sec3Desc: string;
  sec3Feature1Title: string;
  sec3Feature1Desc: string;
  sec3Feature2Title: string;
  sec3Feature2Desc: string;
  sec3CtaText: string;
  sec3CtaUrl: string;
  sec3Image: string;

  // Feature Details 2 (Section 4)
  sec4Badge: string;
  sec4Title: string;
  sec4Desc: string;
  sec4Point1: string;
  sec4Point2: string;
  sec4Point3: string;
  sec4CtaText: string;
  sec4CtaUrl: string;
  sec4Image: string;

  // Feature Details 3 (Section 5)
  sec5Badge: string;
  sec5Title: string;
  sec5Desc: string;
  sec5Point1: string;
  sec5Point2: string;
  sec5Point3: string;
  sec5CtaText: string;
  sec5CtaUrl: string;
  sec5Image: string;

  // Pricing Section
  pricingTitle: string;
  pricingSub: string;
  planFree: string;
  planFreeDesc: string;
  freePrice: string;
  freeLifetime: string;
  freeFeature1: string;
  freeFeature2: string;
  freeFeature3: string;
  downloadNow: string;
  planPro: string;
  planProDesc: string;
  proPrice: string;
  proLifetime: string;
  proFeature1: string;
  proFeature2: string;
  proFeature3: string;
  proFeature4: string;
  getPro: string;
  recTag: string;

  // FAQs
  faqTitle: string;
  faqsList: EzyFaqItem[];
}

import ImageUploader from "@/components/blocks/image-uploader";
import enTranslations from "@/messages/en.json";
import bnTranslations from "@/messages/bn.json";

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

interface AboutFields {
  title: string;
  subtitle: string;
  ourStoryBody: string;
  ourGoalBody: string;
  journeySubtitle: string;
  journeyMilestones: Milestone[];
  atGlanceSub: string;
  whoWeAreImg: string;
  ourGoalImg: string;
  officeImgMain: string;
  officeImgSub1: string;
  officeImgSub2: string;
}

const defaultAboutEn: AboutFields = {
  title: "About Ecare",
  subtitle: "We are a client-first developer agency delivering high-integrity software.",
  ourStoryBody: "Founded with a mission to eliminate technical debt, Ecare builds robust software systems. We combine design excellence with rigid engineering standards to build long-lasting solutions.",
  ourGoalBody: "Since day one, Ecare has been committed to utilizing modern cloud architectures and high-fidelity frameworks to solve real-world business challenges. We combine deep engineering expertise and cutting-edge technologies to build powerful, scalable custom web applications. Whether you need an enterprise eCommerce platform, a custom business SaaS, or a robust integration API, we have you covered. Over time, we have grown into a trusted technology partner, delivering solutions that meet the evolving needs of our clients.",
  journeySubtitle: "How we built a legacy of premium engineering, one milestone at a time.",
  journeyMilestones: [
    {
      year: "2026",
      title: "AI Integrations & Next-Gen Platforms",
      desc: "Expanding our elite team to support cutting-edge AI integrations and developing high-performance next-gen web architectures."
    },
    {
      year: "2025",
      title: "Global Scale & SaaS Ecosystems",
      desc: "Scaling our partner applications and SaaS platforms, serving millions of users worldwide with zero-downtime engineering."
    },
    {
      year: "2023",
      title: "The Inception of Ecare",
      desc: "Founded with a core mission to eliminate technical debt, combining rigid engineering standards with client-first design."
    }
  ],
  atGlanceSub: "Ecare is a leading name in the SaaS and web software industry, empowering hundreds of thousands of businesses globally with high-performance digital tools.",
  whoWeAreImg: "/static/images/who-we-are.png",
  ourGoalImg: "/static/images/our-goal.png",
  officeImgMain: "/nextzen_team.webp",
  officeImgSub1: "/static/images/office-work.png",
  officeImgSub2: "/static/images/office-pingpong.png"
};

const defaultAboutBn: AboutFields = {
  title: "ইকেয়ার সম্পর্কে",
  subtitle: "আমরা একটি ক্লায়েন্ট-প্রথম ডেভেলপার এজেন্সি যা উচ্চ-মানের সফটওয়্যার সরবরাহ করে।",
  ourStoryBody: "প্রযুক্তিগত জটিলতা দূর করার লক্ষ্য নিয়ে ইকেয়ার প্রতিষ্ঠিত। আমরা দীর্ঘস্থায়ী সমাধান তৈরিতে চমৎকার ডিজাইন ও কঠোর ইঞ্জিনিয়ারিং মানকে একত্রিত করি।",
  ourGoalBody: "প্রথম দিন থেকেই, ইকেয়ার বাস্তবমুখী ব্যবসায়িক চ্যালেঞ্জ সমাধানের জন্য আধুনিক ক্লাউড আর্কিটেকচার এবং শক্তিশালী ফ্রেমওয়ার্ক ব্যবহার করতে প্রতিশ্রুতিবদ্ধ। আমরা শক্তিশালী ও স্কেলেবল কাস্টম ওয়েব অ্যাপ্লিকেশন তৈরি করতে গভীর ইঞ্জিনিয়ারিং দক্ষতা এবং অত্যাধুনিক প্রযুক্তির সমন্বয় করি। আপনার এন্টারপ্রাইজ ই-কমার্স প্ল্যাটফর্ম, কাস্টম বিজনেস SaaS বা শক্তিশালী ইন্টিগ্রেশন API-ই প্রয়োজন হোক না কেন, আমরা আপনার পাশে আছি। সময়ের সাথে সাথে, আমরা একটি নির্ভরযোগ্য প্রযুক্তিগত অংশীদার হয়ে উঠেছি, যা আমাদের ক্লায়েন্টদের ক্রমবর্ধমান চাহিদা পূরণ করতে সক্ষম।",
  journeySubtitle: "কীভাবে আমরা ধাপে ধাপে প্রিমিয়াম ইঞ্জিনিয়ারিংয়ের একটি দীর্ঘস্থায়ী মান তৈরি করেছি।",
  journeyMilestones: [
    {
      year: "২০২৬",
      title: "এআই ইন্টিগ্রেশন এবং নেক্সট-জেন প্ল্যাটফর্ম",
      desc: "অত্যাধুনিক কৃত্রিম বুদ্ধিমত্তা (AI) ইন্টিগ্রেশন এবং অত্যন্ত দ্রুতগতির ওয়েব আর্কিটেকচার তৈরি করতে আমাদের বিশেষ দক্ষ ডেভেলপার টিম সম্প্রসারণ।"
    },
    {
      year: "২০২৫",
      title: "গ্লোবাল স্কেল ও SaaS ইকোসিস্টেম",
      desc: "আমাদের পার্টনার অ্যাপ্লিকেশন এবং SaaS প্ল্যাটফর্মগুলোর স্কেলিং সম্পন্ন করা, যা বিশ্বব্যাপী লক্ষ লক্ষ গ্রাহককে শূন্য-ডাউনটাইম ইঞ্জিনিয়ারিং সেবা দিচ্ছে।"
    },
    {
      year: "২০২৩",
      title: "ইকেয়ার-এর পথচলার শুরু",
      desc: "কোডের প্রযুক্তিগত ঋণ (Technical Debt) সম্পূর্ণ দূর করার লক্ষ্য নিয়ে প্রতিষ্ঠিত, যেখানে কঠোর ইঞ্জিনিয়ারিং মান ও ক্লায়েন্ট-প্রথম ডিজাইনকে একত্রিত করা হয়েছে।"
    }
  ],
  atGlanceSub: "Ecare হলো SaaS এবং ওয়েব সফটওয়্যার শিল্পের একটি শীর্ষস্থানীয় নাম, যা বিশ্বজুড়ে লাখ লাখ ব্যবসায়ীকে শক্তিশালী ডিজিটাল টুলস দিয়ে সাহায্য করছে।",
  whoWeAreImg: "/static/images/who-we-are.png",
  ourGoalImg: "/static/images/our-goal.png",
  officeImgMain: "/nextzen_team.webp",
  officeImgSub1: "/static/images/office-work.png",
  officeImgSub2: "/static/images/office-pingpong.png"
};

export default function AdminPagesPage() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  // Form Fields for standard Pages (markdown)
  const [contentEn, setContentEn] = useState("");
  const [contentBn, setContentBn] = useState("");

  // Form Fields for contact_info (structured JSON)
  const [contactEn, setContactEn] = useState<ContactFields>({ phone: "", email: "", address: "", hours: "", mapUrl: "" });
  const [contactBn, setContactBn] = useState<ContactFields>({ phone: "", email: "", address: "", hours: "", mapUrl: "" });

  // Form Fields for bkash_settings (structured JSON)
  const [bkashSettings, setBkashSettings] = useState<BkashSettingsFields>({
    apiUrl: "https://tokenized.sandbox.bka.sh/v1.2.0-beta",
    username: "",
    password: "",
    appKey: "",
    appSecret: ""
  });

  // Form Fields for smtp_settings (structured JSON)
  const [smtpSettings, setSmtpSettings] = useState<SmtpSettingsFields>({
    host: "smtp.gmail.com",
    port: "465",
    secure: "true",
    authEmail: "",
    authPass: "",
    senderEmail: "no-reply@ecare.com",
    adminNoticeEmail: "admin@ecare.com"
  });

  // Form Fields for gtm_settings (structured JSON)
  const [gtmSettings, setGtmSettings] = useState<GtmSettingsFields>({
    containerId: "",
    isEnabled: "false"
  });

  // Form Fields for clarity_settings (structured JSON)
  const [claritySettings, setClaritySettings] = useState<ClaritySettingsFields>({
    projectId: "",
    isEnabled: "false"
  });

  // Form Fields for elevenlabs_settings (structured JSON)
  const [elevenlabsSettings, setElevenlabsSettings] = useState<ElevenLabsSettingsFields>({
    agentId: "",
    isEnabled: "false"
  });

  // Form Fields for offer_popup (structured JSON)
  const [offerEn, setOfferEn] = useState<OfferPopupFields>({ title: "", subtitle: "", discountPercent: "", discountCode: "", isActive: "true" });
  const [offerBn, setOfferBn] = useState<OfferPopupFields>({ title: "", subtitle: "", discountPercent: "", discountCode: "", isActive: "true" });

  // Form Fields for home_consulting_cta (structured JSON)
  const [homeCtaEn, setHomeCtaEn] = useState<HomeConsultingCtaFields>({ image: "", badge: "", title: "", description: "", trustText: "", btn1Text: "", btn1Url: "", btn2Text: "", btn2Url: "" });
  const [homeCtaBn, setHomeCtaBn] = useState<HomeConsultingCtaFields>({ image: "", badge: "", title: "", description: "", trustText: "", btn1Text: "", btn1Url: "", btn2Text: "", btn2Url: "" });

  // Form Fields for ezy_checkout (structured JSON)
  const [ezyComEn, setEzyComEn] = useState<EzyComFields>({
    heroImages: [],
    problemSectionBadge: "",
    problemSectionTitleHtml: "",
    problemSectionSub: "",
    problemSectionCards: [],
    capabilitiesSectionBadge: "",
    capabilitiesSectionTitleHtml: "",
    capabilitiesSectionSub: "",
    capabilitiesBentoCards: [],
    capabilitiesFeatureItems: [],
    videoSectionBadge: "",
    videoSectionTitleHtml: "",
    videoSectionSub: "",
    videoSectionTabs: [],
    stickyNavLinks: { problem: "", features: "", demos: "", compare: "", faq: "" },
    stickyNavCta: "",
    heroBadge: "",
    heroTitleHtml: "",
    heroSub: "",
    heroCtaFree: "",
    heroCtaBuild: "",
    tickerTitle: "",
    tickerItems: [],
    demosSectionBadge: "",
    demosSectionTitleHtml: "",
    demosSectionSub: "",
    demosSectionPlaceholder: "",
    demosSectionCatAll: "",
    demosSectionCatWordPress: "",
    demosSectionCatLaravel: "",
    demosSectionBtnLive: "",
    demosSectionBtnAdmin: "",
    compareSectionBadge: "",
    compareSectionTitleHtml: "",
    compareSectionSub: "",
    compareSectionColFeatures: "",
    compareSectionColWp: "",
    compareSectionColLaravel: "",
    compareSectionRows: [],
    finalCtaBadge: "",
    finalCtaTitle: "",
    finalCtaSub: "",
    finalCtaCtaDemo: "",
    finalCtaCtaExpert: "",
    finalCtaNote: ""
  });
  const [ezyComBn, setEzyComBn] = useState<EzyComFields>({
    heroImages: [],
    problemSectionBadge: "",
    problemSectionTitleHtml: "",
    problemSectionSub: "",
    problemSectionCards: [],
    capabilitiesSectionBadge: "",
    capabilitiesSectionTitleHtml: "",
    capabilitiesSectionSub: "",
    capabilitiesBentoCards: [],
    capabilitiesFeatureItems: [],
    videoSectionBadge: "",
    videoSectionTitleHtml: "",
    videoSectionSub: "",
    videoSectionTabs: [],
    stickyNavLinks: { problem: "", features: "", demos: "", compare: "", faq: "" },
    stickyNavCta: "",
    heroBadge: "",
    heroTitleHtml: "",
    heroSub: "",
    heroCtaFree: "",
    heroCtaBuild: "",
    tickerTitle: "",
    tickerItems: [],
    demosSectionBadge: "",
    demosSectionTitleHtml: "",
    demosSectionSub: "",
    demosSectionPlaceholder: "",
    demosSectionCatAll: "",
    demosSectionCatWordPress: "",
    demosSectionCatLaravel: "",
    demosSectionBtnLive: "",
    demosSectionBtnAdmin: "",
    compareSectionBadge: "",
    compareSectionTitleHtml: "",
    compareSectionSub: "",
    compareSectionColFeatures: "",
    compareSectionColWp: "",
    compareSectionColLaravel: "",
    compareSectionRows: [],
    finalCtaBadge: "",
    finalCtaTitle: "",
    finalCtaSub: "",
    finalCtaCtaDemo: "",
    finalCtaCtaExpert: "",
    finalCtaNote: ""
  });
  const [ezyComTab, setEzyComTab] = useState("hero");

  const [ezyCheckoutEn, setEzyCheckoutEn] = useState<EzyCheckoutFields>({
    heroBadge: "", heroTitle: "", heroSub: "", heroCtaText: "", heroCtaUrl: "", heroSubCtaText: "", heroSubCtaUrl: "", heroImage: "",
    featuresBadge: "", featuresTitle: "", featuresList: [],
    aboutBadge: "", aboutTitle: "", aboutImage: "",
    servicesBadge: "", servicesTitle: "",
    sec3Badge: "", sec3Title: "", sec3Desc: "", sec3Feature1Title: "", sec3Feature1Desc: "", sec3Feature2Title: "", sec3Feature2Desc: "", sec3CtaText: "", sec3CtaUrl: "", sec3Image: "",
    sec4Badge: "", sec4Title: "", sec4Desc: "", sec4Point1: "", sec4Point2: "", sec4Point3: "", sec4CtaText: "", sec4CtaUrl: "", sec4Image: "",
    sec5Badge: "", sec5Title: "", sec5Desc: "", sec5Point1: "", sec5Point2: "", sec5Point3: "", sec5CtaText: "", sec5CtaUrl: "", sec5Image: "",
    pricingTitle: "", pricingSub: "", planFree: "", planFreeDesc: "", freePrice: "", freeLifetime: "",
    freeFeature1: "", freeFeature2: "", freeFeature3: "", downloadNow: "", planPro: "", planProDesc: "",
    proPrice: "", proLifetime: "", proFeature1: "", proFeature2: "", proFeature3: "", proFeature4: "", getPro: "", recTag: "",
    faqTitle: "", faqsList: []
  });
  const [ezyCheckoutBn, setEzyCheckoutBn] = useState<EzyCheckoutFields>({
    heroBadge: "", heroTitle: "", heroSub: "", heroCtaText: "", heroCtaUrl: "", heroSubCtaText: "", heroSubCtaUrl: "", heroImage: "",
    featuresBadge: "", featuresTitle: "", featuresList: [],
    aboutBadge: "", aboutTitle: "", aboutImage: "",
    servicesBadge: "", servicesTitle: "",
    sec3Badge: "", sec3Title: "", sec3Desc: "", sec3Feature1Title: "", sec3Feature1Desc: "", sec3Feature2Title: "", sec3Feature2Desc: "", sec3CtaText: "", sec3CtaUrl: "", sec3Image: "",
    sec4Badge: "", sec4Title: "", sec4Desc: "", sec4Point1: "", sec4Point2: "", sec4Point3: "", sec4CtaText: "", sec4CtaUrl: "", sec4Image: "",
    sec5Badge: "", sec5Title: "", sec5Desc: "", sec5Point1: "", sec5Point2: "", sec5Point3: "", sec5CtaText: "", sec5CtaUrl: "", sec5Image: "",
    pricingTitle: "", pricingSub: "", planFree: "", planFreeDesc: "", freePrice: "", freeLifetime: "",
    freeFeature1: "", freeFeature2: "", freeFeature3: "", downloadNow: "", planPro: "", planProDesc: "",
    proPrice: "", proLifetime: "", proFeature1: "", proFeature2: "", proFeature3: "", proFeature4: "", getPro: "", recTag: "",
    faqTitle: "", faqsList: []
  });

  const [ezyTab, setEzyTab] = useState("hero");
  const [showcase1Expanded, setShowcase1Expanded] = useState(false);
  const [showcase2Expanded, setShowcase2Expanded] = useState(false);
  const [showcase3Expanded, setShowcase3Expanded] = useState(false);
  const [duplicateTarget, setDuplicateTarget] = useState<PageItem | null>(null);
  const [newSlug, setNewSlug] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<PageItem | null>(null);

  const isLandingPage = (page?: PageItem) => {
    if (!page || !page.content || !page.content.en) return false;
    try {
      const parsed = JSON.parse(page.content.en);
      return parsed && typeof parsed === "object" && "heroTitle" in parsed;
    } catch (e) {
      return false;
    }
  };

  const handleDuplicate = (page: PageItem) => {
    setDuplicateTarget(page);
    setNewSlug("");
  };

  const handleDelete = (page: PageItem) => {
    setDeleteTarget(page);
  };

  // Form Fields for About page (structured JSON)
  const [aboutEn, setAboutEn] = useState<AboutFields>(defaultAboutEn);
  const [aboutBn, setAboutBn] = useState<AboutFields>(defaultAboutBn);

  // Form Fields for home_solutions (structured JSON array)
  const [solutions, setSolutions] = useState<SolutionFormItem[]>([]);

  // Form Fields for home_at_glance (structured JSON array)
  const [atGlance, setAtGlance] = useState<AtGlanceFormItem[]>([]);

  const [saving, setSaving] = useState(false);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/pages");
      const data = await res.json();
      if (res.ok) {
        setPages(data.data);
      } else {
        throw new Error(data.error || "Failed to load page contents");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addSolution = () => {
    setSolutions([
      ...solutions,
      {
        name: "New Solution",
        descEn: "",
        descBn: "",
        color: "text-[#00a884] hover:text-[#008c6e]",
        logoUrl: "",
        learnMoreUrl: "/services"
      }
    ]);
  };

  const removeSolution = (index: number) => {
    setSolutions(solutions.filter((_, i) => i !== index));
  };

  const moveSolution = (index: number, direction: "up" | "down") => {
    const newSolutions = [...solutions];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSolutions.length) return;
    const temp = newSolutions[index];
    newSolutions[index] = newSolutions[targetIndex];
    newSolutions[targetIndex] = temp;
    setSolutions(newSolutions);
  };

  const addAtGlance = () => {
    setAtGlance([
      ...atGlance,
      {
        valEn: "0",
        valBn: "০",
        lblEn: "New Stat",
        lblBn: "নতুন স্ট্যাট",
        icon: "Users"
      }
    ]);
  };

  const removeAtGlance = (index: number) => {
    setAtGlance(atGlance.filter((_, i) => i !== index));
  };

  const moveAtGlance = (index: number, direction: "up" | "down") => {
    const newAtGlance = [...atGlance];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newAtGlance.length) return;
    const temp = newAtGlance[index];
    newAtGlance[index] = newAtGlance[targetIndex];
    newAtGlance[targetIndex] = temp;
    setAtGlance(newAtGlance);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleEdit = (page: PageItem) => {
    setSelectedKey(page.key);
    if (page.key === "contact_info") {
      try {
        setContactEn(JSON.parse(page.content.en || "{}"));
        setContactBn(JSON.parse(page.content.bn || "{}"));
      } catch (e) {
        setContactEn({ phone: "", email: "", address: "", hours: "", mapUrl: "" });
        setContactBn({ phone: "", email: "", address: "", hours: "", mapUrl: "" });
      }
    } else if (page.key === "ezycom") {
      try {
        const parsedEn = page.content.en ? JSON.parse(page.content.en) : {};
        const parsedBn = page.content.bn ? JSON.parse(page.content.bn) : {};
        const defaultHeroImages = [
          "https://cdn.saleecom.com/upload/static/landing/LP_Image_1_PC.png",
          "https://cdn.saleecom.com/upload/static/landing/LP_Image_2_PC.png"
        ];
        const defaultProblemCardsEn = [
          { icon: "/ezycom/form.png", title: "Complex Multi-Step Checkouts", desc: "Every extra form field reduces conversions. International checkout themes confuse local customers, leading to cart abandonment.", badge: "High Drop-offs" },
          { icon: "/ezycom/no-smartphones.png", title: "Developers Disappear After Handover", desc: "Freelancers and agencies deliver a basic theme but fail to provide updates or support, leaving you stuck with critical system bugs.", badge: "No Support" },
          { icon: "/ezycom/danger.png", title: "Fake Order Waste & Return Refusals", desc: "High percentages of fake COD (Cash on Delivery) orders drain courier delivery fee budgets and deplete inventory status.", badge: "Loss of Cashflow" },
          { icon: "/ezycom/spending.png", title: "Broken Facebook Pixel Tracking", desc: "Standard pixel setups miss browser events due to iOS 14+ and Safari blockers. Your Meta Ads system trains on incomplete statistics.", badge: "Wasted Ad Spend" },
          { icon: "/ezycom/sand-clock.png", title: "Heavy Plugins Make Sites Bloated & Slow", desc: "Using standard platforms loaded with 30+ conflicting plugins slows page speed, causing high bounce rates on slow 3G/4G connections.", badge: "9-Sec Load Time" },
          { icon: "/ezycom/loss.png", title: "Domain Renews but Revenue Doesn't Grow", desc: "E-commerce structures that are not connected to local couriers and automated confirmation pipelines generate heavy management overhead.", badge: "Stagnant Sales" }
        ];
        const defaultBentoCardsEn = [
          { tag: "Mobile Friendly", title: "Mobile Friendly UI/UX", desc: "Clean, optimized, and highly custom layouts tailored for a seamless mobile shopping experience.", image: "/feature/responsive.png" },
          { tag: "Super Fast", title: "Super-fast 0.5s Load Time", desc: "Loads under half a second to guarantee customer retention and minimize page bounces.", image: "/feature/speed optimize.png" },
          { tag: "Landing Page", title: "Unlimited Landing Page", desc: "Design and launch custom sales funnels and high-converting landing pages easily.", image: "/feature/landingpage.png" },
          { tag: "Conversion Boost", title: "Facebook Pixel & Server Tracking", desc: "Server-side Conversion API tracks every event accurately bypassing block filters.", image: "/feature/facebookpixel.png" },
          { tag: "Workflow Automation", title: "Automated Courier & Delivery Charge Payments", desc: "Collect delivery charges upfront via automated gateways and dispatch to couriers in one click.", image: "/feature/ouruer.png" }
        ];
        const defaultFeatureItemsEn = enTranslations.EzyCom?.features?.items?.all || [];

        setEzyComEn({
          heroImages: (parsedEn.heroImages && parsedEn.heroImages.length > 0) ? parsedEn.heroImages : defaultHeroImages,
          problemSectionBadge: parsedEn.problemSectionBadge || "The Reality Check",
          problemSectionTitleHtml: parsedEn.problemSectionTitleHtml || "Why Most <span class=\"text-primary\">Bangladeshi E-commerce</span> Websites <span class=\"text-primary\">Fail</span>",
          problemSectionSub: parsedEn.problemSectionSub || "Developing a gorgeous storefront is easy, but local operations require a system optimized to solve day-to-day transaction barriers.",
          problemSectionCards: (parsedEn.problemSectionCards && parsedEn.problemSectionCards.length > 0) ? parsedEn.problemSectionCards : defaultProblemCardsEn,
          capabilitiesSectionBadge: parsedEn.capabilitiesSectionBadge || "Core Capabilities",
          capabilitiesSectionTitleHtml: parsedEn.capabilitiesSectionTitleHtml || "Our Core <span class=\"text-primary\">Capabilities</span>",
          capabilitiesSectionSub: parsedEn.capabilitiesSectionSub || "To manage your online business, EzyCom has everything you need: order, product, payment, courier, SEO, analytics, marketing, and security features!",
          capabilitiesBentoCards: (parsedEn.capabilitiesBentoCards && parsedEn.capabilitiesBentoCards.length > 0) ? parsedEn.capabilitiesBentoCards : defaultBentoCardsEn,
          capabilitiesFeatureItems: (parsedEn.capabilitiesFeatureItems && parsedEn.capabilitiesFeatureItems.length > 0) ? parsedEn.capabilitiesFeatureItems : defaultFeatureItemsEn,
          videoSectionBadge: parsedEn.videoSectionBadge || "System Walkthrough",
          videoSectionTitleHtml: parsedEn.videoSectionTitleHtml || "System <span class=\"text-primary\">Walkthrough</span>",
          videoSectionSub: parsedEn.videoSectionSub || "You will understand why our solution stands out!",
          videoSectionTabs: (parsedEn.videoSectionTabs && parsedEn.videoSectionTabs.length === 4) ? parsedEn.videoSectionTabs : [
            { tag: "Part 01: Setup", title: "Get Started with Admin Panel", desc: "What a new user gets initially and how to start after getting the website.", thumbnail: "https://cdn.saleecom.com/upload/static/landing/thumb/01.png", youtubeId: "dQw4w9WgXcQ" },
            { tag: "Part 02: Overview", title: "Dashboard & Website Overview", desc: "Overview of admin panel, website performance, quality, and overall system.", thumbnail: "https://cdn.saleecom.com/upload/static/banner/youtube_banner-1.webp", youtubeId: "dQw4w9WgXcQ" },
            { tag: "Part 03: Features", title: "Add Unlimited Products & Catalog", desc: "How to customize, structure tags/attributes, and control catalog configurations.", thumbnail: "https://cdn.saleecom.com/upload/static/banner/youtube_banner-1.webp", youtubeId: "dQw4w9WgXcQ" },
            { tag: "Part 04: UI/UX", title: "Fully Dynamic Customer Shopping Journey", desc: "Customizing colors, headers, pixels, banners, themes, templates, checkout options, and notifications.", thumbnail: "https://cdn.saleecom.com/upload/static/landing/thumb/01.png", youtubeId: "dQw4w9WgXcQ" }
          ],
          stickyNavLinks: parsedEn.stickyNavLinks || { problem: "", features: "", demos: "", compare: "", faq: "" },
          stickyNavCta: parsedEn.stickyNavCta || "",
          heroBadge: parsedEn.heroBadge || "",
          heroTitleHtml: parsedEn.heroTitleHtml || "",
          heroSub: parsedEn.heroSub || "",
          heroCtaFree: parsedEn.heroCtaFree || "",
          heroCtaBuild: parsedEn.heroCtaBuild || "",
          tickerTitle: parsedEn.tickerTitle || "",
          tickerItems: parsedEn.tickerItems || [],
          demosSectionBadge: parsedEn.demosSectionBadge || "",
          demosSectionTitleHtml: parsedEn.demosSectionTitleHtml || "",
          demosSectionSub: parsedEn.demosSectionSub || "",
          demosSectionPlaceholder: parsedEn.demosSectionPlaceholder || "",
          demosSectionCatAll: parsedEn.demosSectionCatAll || "",
          demosSectionCatWordPress: parsedEn.demosSectionCatWordPress || "",
          demosSectionCatLaravel: parsedEn.demosSectionCatLaravel || "",
          demosSectionBtnLive: parsedEn.demosSectionBtnLive || "",
          demosSectionBtnAdmin: parsedEn.demosSectionBtnAdmin || "",
          compareSectionBadge: parsedEn.compareSectionBadge || "",
          compareSectionTitleHtml: parsedEn.compareSectionTitleHtml || "",
          compareSectionSub: parsedEn.compareSectionSub || "",
          compareSectionColFeatures: parsedEn.compareSectionColFeatures || "",
          compareSectionColWp: parsedEn.compareSectionColWp || "",
          compareSectionColLaravel: parsedEn.compareSectionColLaravel || "",
          compareSectionRows: parsedEn.compareSectionRows || [],
          finalCtaBadge: parsedEn.finalCtaBadge || "",
          finalCtaTitle: parsedEn.finalCtaTitle || "",
          finalCtaSub: parsedEn.finalCtaSub || "",
          finalCtaCtaDemo: parsedEn.finalCtaCtaDemo || "",
          finalCtaCtaExpert: parsedEn.finalCtaCtaExpert || "",
          finalCtaNote: parsedEn.finalCtaNote || ""
        });
        const defaultProblemCardsBn = [
          { icon: "/ezycom/form.png", title: "জটিল বহু-ধাপ চেকআউট", desc: "প্রতিটি অতিরিক্ত ফর্ম ফিল্ড কনভার্সন কমিয়ে দেয়। স্থানীয় গ্রাহকদের বিভ্রান্ত করে, যার ফলে কার্ট পরিত্যক্ত হয়।", badge: "অতিরিক্ত ড্রপ-অফ" },
          { icon: "/ezycom/no-smartphones.png", title: "হ্যান্ডওভারের পর ডেভেলপাররা নিখোঁজ", desc: "ফ্রিল্যান্সার এবং এজেন্সিগুলো একটি মৌলিক থিম সরবরাহ করে কিন্তু আপডেট বা সহায়তা প্রদান করতে ব্যর্থ হয়, যার ফলে আপনি জটিল সিস্টেমে আটকে যান।", badge: "কোনো সাপোর্ট নেই" },
          { icon: "/ezycom/danger.png", title: "ফেক অর্ডার অপচয় এবং রিটার্ন প্রত্যাখ্যান", desc: "উচ্চ শতাংশ ফেক ক্যাশ অন ডেলিভারি (COD) অর্ডার কুরিয়ার ডেলিভারি ফি বাজেট ড্রেন করে এবং ইনভেন্টরি স্থিতি হ্রাস করে।", badge: "ক্যাশ ফ্লোর ক্ষতি" },
          { icon: "/ezycom/spending.png", title: "ভাঙা ফেসবুক পিক্সেল ট্র্যাকিং", desc: "iOS 14+ এবং Safari ব্লকারের কারণে স্ট্যান্ডার্ড পিক্সেল সেটআপ ব্রাউজার ইভেন্টগুলো মিস করে। আপনার মেটা অ্যাডস সিস্টেম অসম্পূর্ণ পরিসংখ্যানের উপর কাজ করে।", badge: "অ্যাড স্পেন্ডের অপচয়" },
          { icon: "/ezycom/sand-clock.png", title: "ভারী প্লাগইন সাইটকে ধীর করে দেয়", desc: "৩০টিরও বেশি প্লাগইন লোড করা সাইটের গতি ধীর করে দেয়, যার ফলে ধীরগতির ৩জি/৪জি সংযোগে পেজ বাউন্স রেট বেশি হয়।", badge: "৯ সেকেন্ডের লোড টাইম" },
          { icon: "/ezycom/loss.png", title: "ডোমেন রিনিউ হয় কিন্তু আয় বাড়ে না", desc: "ই-কমার্স কাঠামো যা স্থানীয় কুরিয়ার এবং স্বয়ংক্রিয় নিশ্চিতকরণ পাইপলাইনের সাথে সংযুক্ত নয় তা ভারী ব্যবস্থাপনা ওভারহেড তৈরি করে।", badge: "স্থবির সেলস" }
        ];
        const defaultBentoCardsBn = [
          { tag: "মোবাইল ফ্রেন্ডলি", title: "Mobile Friendly UI/UX", desc: "Clean, optimized, and highly custom layouts tailored for a seamless mobile shopping experience.", image: "/feature/responsive.png" },
          { tag: "সুপার ফাস্ট", title: "Super-fast 0.5s Load Time", desc: "Loads under half a second to guarantee customer retention and minimize page bounces.", image: "/feature/speed optimize.png" },
          { tag: "ল্যান্ডিং পেজ", title: "Unlimited Landing Page", desc: "Design and launch custom sales funnels and high-converting landing pages easily.", image: "/feature/landingpage.png" },
          { tag: "কনভার্সন বুস্ট", title: "Facebook Pixel & Server Tracking", desc: "Server-side Conversion API tracks every event accurately bypassing block filters.", image: "/feature/facebookpixel.png" },
          { tag: "অটোমেশন ইন্টিগ্রেশন", title: "অটোমেটেড কুরিয়ার ও অগ্রিম ডেলিভারি পেমেন্ট", desc: "চেকআউটে বিকাশ/নগদে ডেলিভারি চার্জ পেমেন্ট কালেকশন এবং সরাসরি কুরিয়ার প্যানেল অটোমেশন।", image: "/feature/ouruer.png" }
        ];
        const defaultFeatureItemsBn = bnTranslations.EzyCom?.features?.items?.all || [];

        setEzyComBn({
          heroImages: (parsedBn.heroImages && parsedBn.heroImages.length > 0) ? parsedBn.heroImages : defaultHeroImages,
          problemSectionBadge: parsedBn.problemSectionBadge || "সেরা ই-কমার্স ওয়েবসাইট গ্যারান্টি!",
          problemSectionTitleHtml: parsedBn.problemSectionTitleHtml || "অর্ডার হবে এখন <span class=\"text-primary\">নিজের ওয়েবসাইটে!</span>",
          problemSectionSub: parsedBn.problemSectionSub || "বাংলাদেশি অনলাইন ব্যবসার জন্য বিশেষভাবে তৈরি একটি রেডি-টু-লঞ্চ ই-কমার্স সিএমএস সিস্টেম।",
          problemSectionCards: (parsedBn.problemSectionCards && parsedBn.problemSectionCards.length > 0) ? parsedBn.problemSectionCards : defaultProblemCardsBn,
          capabilitiesSectionBadge: parsedBn.capabilitiesSectionBadge || "ফিচার সমূহ",
          capabilitiesSectionTitleHtml: parsedBn.capabilitiesSectionTitleHtml || "আমাদের কোর <span class=\"text-primary\">ক্যাপাবিলিটিজ</span>",
          capabilitiesSectionSub: parsedBn.capabilitiesSectionSub || "To manage your online business, EzyCom has everything you need: order, product, payment, courier, SEO, analytics, marketing, and security features!",
          capabilitiesBentoCards: (parsedBn.capabilitiesBentoCards && parsedBn.capabilitiesBentoCards.length > 0) ? parsedBn.capabilitiesBentoCards : defaultBentoCardsBn,
          capabilitiesFeatureItems: (parsedBn.capabilitiesFeatureItems && parsedBn.capabilitiesFeatureItems.length > 0) ? parsedBn.capabilitiesFeatureItems : defaultFeatureItemsBn,
          videoSectionBadge: parsedBn.videoSectionBadge || "সিস্টেম ভিডিও ট্যুর",
          videoSectionTitleHtml: parsedBn.videoSectionTitleHtml || "সিস্টেম <span class=\"text-primary\">ভিডিও ট্যুর</span>",
          videoSectionSub: parsedBn.videoSectionSub || "You will understand why our solution stands out!",
          videoSectionTabs: (parsedBn.videoSectionTabs && parsedBn.videoSectionTabs.length === 4) ? parsedBn.videoSectionTabs : [
            { tag: "পার্ট ০১: সেটিংস", title: "এডমিন প্যানেলে শুরু করুন", desc: "একজন নতুন ব্যবহারকারী প্রাথমিকভাবে কী পান এবং ওয়েবসাইট পাওয়ার পরে কীভাবে শুরু করবেন।", thumbnail: "https://cdn.saleecom.com/upload/static/landing/thumb/01.png", youtubeId: "dQw4w9WgXcQ" },
            { tag: "পার্ট ০২: ড্যাশবোর্ড", title: "ড্যাশবোর্ড এবং ওয়েবসাইট পরিচিতি", desc: "অ্যাডমিন প্যানেল, ওয়েবসাইটের পারফরম্যান্স, গুণমান এবং সামগ্রিক সিস্টেমের সংক্ষিপ্ত বিবরণ।", thumbnail: "https://cdn.saleecom.com/upload/static/banner/youtube_banner-1.webp", youtubeId: "dQw4w9WgXcQ" },
            { tag: "পার্ট ০৩: ফিচারস", title: "আনলিমিটেড প্রোডাক্ট ও ক্যাটালগ যোগ করুন", desc: "কীভাবে কাস্টমাইজ করবেন, ট্যাগ/অ্যাট্রিবিউট গঠন করবেন এবং ক্যাটালগ কনফিগারেশন নিয়ন্ত্রণ করবেন।", thumbnail: "https://cdn.saleecom.com/upload/static/banner/youtube_banner-1.webp", youtubeId: "dQw4w9WgXcQ" },
            { tag: "পার্ট ০৪: কাস্টমার ভিউ", title: "সম্পূর্ণ ডাইনামিক কাস্টমার শপিং জার্নি", desc: "কালার, হেডার, পিক্সেল, ব্যানার, থিম, টেমপ্লেট, চেকআউট অপশন এবং নোটিফিকেশন কাস্টমাইজ করুন।", thumbnail: "https://cdn.saleecom.com/upload/static/landing/thumb/01.png", youtubeId: "dQw4w9WgXcQ" }
          ],
          stickyNavLinks: parsedBn.stickyNavLinks || { problem: "", features: "", demos: "", compare: "", faq: "" },
          stickyNavCta: parsedBn.stickyNavCta || "",
          heroBadge: parsedBn.heroBadge || "",
          heroTitleHtml: parsedBn.heroTitleHtml || "",
          heroSub: parsedBn.heroSub || "",
          heroCtaFree: parsedBn.heroCtaFree || "",
          heroCtaBuild: parsedBn.heroCtaBuild || "",
          tickerTitle: parsedBn.tickerTitle || "",
          tickerItems: parsedBn.tickerItems || [],
          demosSectionBadge: parsedBn.demosSectionBadge || "",
          demosSectionTitleHtml: parsedBn.demosSectionTitleHtml || "",
          demosSectionSub: parsedBn.demosSectionSub || "",
          demosSectionPlaceholder: parsedBn.demosSectionPlaceholder || "",
          demosSectionCatAll: parsedBn.demosSectionCatAll || "",
          demosSectionCatWordPress: parsedBn.demosSectionCatWordPress || "",
          demosSectionCatLaravel: parsedBn.demosSectionCatLaravel || "",
          demosSectionBtnLive: parsedBn.demosSectionBtnLive || "",
          demosSectionBtnAdmin: parsedBn.demosSectionBtnAdmin || "",
          compareSectionBadge: parsedBn.compareSectionBadge || "",
          compareSectionTitleHtml: parsedBn.compareSectionTitleHtml || "",
          compareSectionSub: parsedBn.compareSectionSub || "",
          compareSectionColFeatures: parsedBn.compareSectionColFeatures || "",
          compareSectionColWp: parsedBn.compareSectionColWp || "",
          compareSectionColLaravel: parsedBn.compareSectionColLaravel || "",
          compareSectionRows: parsedBn.compareSectionRows || [],
          finalCtaBadge: parsedBn.finalCtaBadge || "",
          finalCtaTitle: parsedBn.finalCtaTitle || "",
          finalCtaSub: parsedBn.finalCtaSub || "",
          finalCtaCtaDemo: parsedBn.finalCtaCtaDemo || "",
          finalCtaCtaExpert: parsedBn.finalCtaCtaExpert || "",
          finalCtaNote: parsedBn.finalCtaNote || ""
        });
      } catch (e) {
        console.error("Failed to parse ezycom content:", e);
      }
    } else if (page.key === "bkash_settings") {
      try {
        setBkashSettings(JSON.parse(page.content.en || "{}"));
      } catch (e) {
        setBkashSettings({
          apiUrl: "https://tokenized.sandbox.bka.sh/v1.2.0-beta",
          username: "",
          password: "",
          appKey: "",
          appSecret: ""
        });
      }
    } else if (page.key === "smtp_settings") {
      try {
        setSmtpSettings(JSON.parse(page.content.en || "{}"));
      } catch (e) {
        setSmtpSettings({
          host: "smtp.gmail.com",
          port: "465",
          secure: "true",
          authEmail: "",
          authPass: "",
          senderEmail: "no-reply@ecare.com",
          adminNoticeEmail: "admin@ecare.com"
        });
      }
    } else if (page.key === "gtm_settings") {
      try {
        setGtmSettings(JSON.parse(page.content.en || "{}"));
      } catch (e) {
        setGtmSettings({
          containerId: "",
          isEnabled: "false"
        });
      }
    } else if (page.key === "clarity_settings") {
      try {
        setClaritySettings(JSON.parse(page.content.en || "{}"));
      } catch (e) {
        setClaritySettings({
          projectId: "",
          isEnabled: "false"
        });
      }
    } else if (page.key === "elevenlabs_settings") {
      try {
        setElevenlabsSettings(JSON.parse(page.content.en || "{}"));
      } catch (e) {
        setElevenlabsSettings({
          agentId: "",
          isEnabled: "false"
        });
      }
    } else if (page.key === "home_consulting_cta") {
      try {
        setHomeCtaEn(JSON.parse(page.content.en || "{}"));
        setHomeCtaBn(JSON.parse(page.content.bn || "{}"));
      } catch (e) {
        setHomeCtaEn({ image: "", badge: "", title: "", description: "", trustText: "", btn1Text: "", btn1Url: "", btn2Text: "", btn2Url: "" });
        setHomeCtaBn({ image: "", badge: "", title: "", description: "", trustText: "", btn1Text: "", btn1Url: "", btn2Text: "", btn2Url: "" });
      }
    } else if (page.key === "offer_popup") {
      try {
        setOfferEn(JSON.parse(page.content.en || "{}"));
        setOfferBn(JSON.parse(page.content.bn || "{}"));
      } catch (e) {
        setOfferEn({ title: "", subtitle: "", discountPercent: "", discountCode: "", isActive: "true" });
        setOfferBn({ title: "", subtitle: "", discountPercent: "", discountCode: "", isActive: "true" });
      }
    } else if (page.key === "ezy_checkout" || isLandingPage(page)) {
      try {
        const parsedEn = JSON.parse(page.content.en || "{}");
        const parsedBn = JSON.parse(page.content.bn || "{}");
        
        setEzyCheckoutEn({
          heroBadge: parsedEn.heroBadge || "",
          heroTitle: parsedEn.heroTitle || "",
          heroSub: parsedEn.heroSub || "",
          heroCtaText: parsedEn.heroCtaText || "",
          heroCtaUrl: parsedEn.heroCtaUrl || "",
          heroSubCtaText: parsedEn.heroSubCtaText || "",
          heroSubCtaUrl: parsedEn.heroSubCtaUrl || "",
          heroImage: parsedEn.heroImage || "",
          featuresBadge: parsedEn.featuresBadge || "",
          featuresTitle: parsedEn.featuresTitle || "",
          featuresList: Array.isArray(parsedEn.featuresList) ? parsedEn.featuresList : [],
          aboutBadge: parsedEn.aboutBadge || "",
          aboutTitle: parsedEn.aboutTitle || "",
          aboutImage: parsedEn.aboutImage || "",
          servicesBadge: parsedEn.servicesBadge || "",
          servicesTitle: parsedEn.servicesTitle || "",
          sec3Badge: parsedEn.sec3Badge || "",
          sec3Title: parsedEn.sec3Title || "",
          sec3Desc: parsedEn.sec3Desc || "",
          sec3Feature1Title: parsedEn.sec3Feature1Title || "",
          sec3Feature1Desc: parsedEn.sec3Feature1Desc || "",
          sec3Feature2Title: parsedEn.sec3Feature2Title || "",
          sec3Feature2Desc: parsedEn.sec3Feature2Desc || "",
          sec3CtaText: parsedEn.sec3CtaText || "",
          sec3CtaUrl: parsedEn.sec3CtaUrl || "",
          sec3Image: parsedEn.sec3Image || "",
          sec4Badge: parsedEn.sec4Badge || "",
          sec4Title: parsedEn.sec4Title || "",
          sec4Desc: parsedEn.sec4Desc || "",
          sec4Point1: parsedEn.sec4Point1 || "",
          sec4Point2: parsedEn.sec4Point2 || "",
          sec4Point3: parsedEn.sec4Point3 || "",
          sec4CtaText: parsedEn.sec4CtaText || "",
          sec4CtaUrl: parsedEn.sec4CtaUrl || "",
          sec4Image: parsedEn.sec4Image || "",
          sec5Badge: parsedEn.sec5Badge || "",
          sec5Title: parsedEn.sec5Title || "",
          sec5Desc: parsedEn.sec5Desc || "",
          sec5Point1: parsedEn.sec5Point1 || "",
          sec5Point2: parsedEn.sec5Point2 || "",
          sec5Point3: parsedEn.sec5Point3 || "",
          sec5CtaText: parsedEn.sec5CtaText || "",
          sec5CtaUrl: parsedEn.sec5CtaUrl || "",
          sec5Image: parsedEn.sec5Image || "",
          pricingTitle: parsedEn.pricingTitle || "",
          pricingSub: parsedEn.pricingSub || "",
          planFree: parsedEn.planFree || "",
          planFreeDesc: parsedEn.planFreeDesc || "",
          freePrice: parsedEn.freePrice || "",
          freeLifetime: parsedEn.freeLifetime || "",
          freeFeature1: parsedEn.freeFeature1 || "",
          freeFeature2: parsedEn.freeFeature2 || "",
          freeFeature3: parsedEn.freeFeature3 || "",
          downloadNow: parsedEn.downloadNow || "",
          planPro: parsedEn.planPro || "",
          planProDesc: parsedEn.planProDesc || "",
          proPrice: parsedEn.proPrice || "",
          proLifetime: parsedEn.proLifetime || "",
          proFeature1: parsedEn.proFeature1 || "",
          proFeature2: parsedEn.proFeature2 || "",
          proFeature3: parsedEn.proFeature3 || "",
          proFeature4: parsedEn.proFeature4 || "",
          getPro: parsedEn.getPro || "",
          recTag: parsedEn.recTag || "",
          faqTitle: parsedEn.faqTitle || "",
          faqsList: Array.isArray(parsedEn.faqsList) ? parsedEn.faqsList : []
        });

        setEzyCheckoutBn({
          heroBadge: parsedBn.heroBadge || "",
          heroTitle: parsedBn.heroTitle || "",
          heroSub: parsedBn.heroSub || "",
          heroCtaText: parsedBn.heroCtaText || "",
          heroCtaUrl: parsedBn.heroCtaUrl || "",
          heroSubCtaText: parsedBn.heroSubCtaText || "",
          heroSubCtaUrl: parsedBn.heroSubCtaUrl || "",
          heroImage: parsedBn.heroImage || "",
          featuresBadge: parsedBn.featuresBadge || "",
          featuresTitle: parsedBn.featuresTitle || "",
          featuresList: Array.isArray(parsedBn.featuresList) ? parsedBn.featuresList : [],
          aboutBadge: parsedBn.aboutBadge || "",
          aboutTitle: parsedBn.aboutTitle || "",
          aboutImage: parsedBn.aboutImage || "",
          servicesBadge: parsedBn.servicesBadge || "",
          servicesTitle: parsedBn.servicesTitle || "",
          sec3Badge: parsedBn.sec3Badge || "",
          sec3Title: parsedBn.sec3Title || "",
          sec3Desc: parsedBn.sec3Desc || "",
          sec3Feature1Title: parsedBn.sec3Feature1Title || "",
          sec3Feature1Desc: parsedBn.sec3Feature1Desc || "",
          sec3Feature2Title: parsedBn.sec3Feature2Title || "",
          sec3Feature2Desc: parsedBn.sec3Feature2Desc || "",
          sec3CtaText: parsedBn.sec3CtaText || "",
          sec3CtaUrl: parsedBn.sec3CtaUrl || "",
          sec3Image: parsedBn.sec3Image || "",
          sec4Badge: parsedBn.sec4Badge || "",
          sec4Title: parsedBn.sec4Title || "",
          sec4Desc: parsedBn.sec4Desc || "",
          sec4Point1: parsedBn.sec4Point1 || "",
          sec4Point2: parsedBn.sec4Point2 || "",
          sec4Point3: parsedBn.sec4Point3 || "",
          sec4CtaText: parsedBn.sec4CtaText || "",
          sec4CtaUrl: parsedBn.sec4CtaUrl || "",
          sec4Image: parsedBn.sec4Image || "",
          sec5Badge: parsedBn.sec5Badge || "",
          sec5Title: parsedBn.sec5Title || "",
          sec5Desc: parsedBn.sec5Desc || "",
          sec5Point1: parsedBn.sec5Point1 || "",
          sec5Point2: parsedBn.sec5Point2 || "",
          sec5Point3: parsedBn.sec5Point3 || "",
          sec5CtaText: parsedBn.sec5CtaText || "",
          sec5CtaUrl: parsedBn.sec5CtaUrl || "",
          sec5Image: parsedBn.sec5Image || "",
          pricingTitle: parsedBn.pricingTitle || "",
          pricingSub: parsedBn.pricingSub || "",
          planFree: parsedBn.planFree || "",
          planFreeDesc: parsedBn.planFreeDesc || "",
          freePrice: parsedBn.freePrice || "",
          freeLifetime: parsedBn.freeLifetime || "",
          freeFeature1: parsedBn.freeFeature1 || "",
          freeFeature2: parsedBn.freeFeature2 || "",
          freeFeature3: parsedBn.freeFeature3 || "",
          downloadNow: parsedBn.downloadNow || "",
          planPro: parsedBn.planPro || "",
          planProDesc: parsedBn.planProDesc || "",
          proPrice: parsedBn.proPrice || "",
          proLifetime: parsedBn.proLifetime || "",
          proFeature1: parsedBn.proFeature1 || "",
          proFeature2: parsedBn.proFeature2 || "",
          proFeature3: parsedBn.proFeature3 || "",
          proFeature4: parsedBn.proFeature4 || "",
          getPro: parsedBn.getPro || "",
          recTag: parsedBn.recTag || "",
          faqTitle: parsedBn.faqTitle || "",
          faqsList: Array.isArray(parsedBn.faqsList) ? parsedBn.faqsList : []
        });
      } catch (e) {
        const defaultEzy = {
          heroBadge: "", heroTitle: "", heroSub: "", heroCtaText: "", heroCtaUrl: "", heroSubCtaText: "", heroSubCtaUrl: "", heroImage: "",
          featuresBadge: "", featuresTitle: "", featuresList: [],
          aboutBadge: "", aboutTitle: "", aboutImage: "",
          servicesBadge: "", servicesTitle: "",
          sec3Badge: "", sec3Title: "", sec3Desc: "", sec3Feature1Title: "", sec3Feature1Desc: "", sec3Feature2Title: "", sec3Feature2Desc: "", sec3CtaText: "", sec3CtaUrl: "", sec3Image: "",
          sec4Badge: "", sec4Title: "", sec4Desc: "", sec4Point1: "", sec4Point2: "", sec4Point3: "", sec4CtaText: "", sec4CtaUrl: "", sec4Image: "",
          sec5Badge: "", sec5Title: "", sec5Desc: "", sec5Point1: "", sec5Point2: "", sec5Point3: "", sec5CtaText: "", sec5CtaUrl: "", sec5Image: "",
          pricingTitle: "", pricingSub: "", planFree: "", planFreeDesc: "", freePrice: "", freeLifetime: "",
          freeFeature1: "", freeFeature2: "", freeFeature3: "", downloadNow: "", planPro: "", planProDesc: "",
          proPrice: "", proLifetime: "", proFeature1: "", proFeature2: "", proFeature3: "", proFeature4: "", getPro: "", recTag: "",
          faqTitle: "", faqsList: []
        };
        setEzyCheckoutEn(defaultEzy);
        setEzyCheckoutBn(defaultEzy);
      }
    } else if (page.key === "about") {
      try {
        const parsedEn = JSON.parse(page.content.en || "{}");
        const parsedBn = JSON.parse(page.content.bn || "{}");
        
        const parseMilestones = (parsed: any, defaultMilestones: Milestone[], fallbackYearBn = false) => {
          if (Array.isArray(parsed.journeyMilestones)) {
            return parsed.journeyMilestones;
          }
          const migrated: Milestone[] = [];
          if (parsed.journey2026Title) {
            migrated.push({ year: fallbackYearBn ? "২০২৬" : "2026", title: parsed.journey2026Title, desc: parsed.journey2026Desc || "" });
          }
          if (parsed.journey2025Title) {
            migrated.push({ year: fallbackYearBn ? "২০২৫" : "2025", title: parsed.journey2025Title, desc: parsed.journey2025Desc || "" });
          }
          if (parsed.journey2023Title) {
            migrated.push({ year: fallbackYearBn ? "২০২৩" : "2023", title: parsed.journey2023Title, desc: parsed.journey2023Desc || "" });
          }
          return migrated.length > 0 ? migrated : defaultMilestones;
        };

        setAboutEn({
          title: parsedEn.title || defaultAboutEn.title,
          subtitle: parsedEn.subtitle || defaultAboutEn.subtitle,
          ourStoryBody: parsedEn.ourStoryBody || defaultAboutEn.ourStoryBody,
          ourGoalBody: parsedEn.ourGoalBody || defaultAboutEn.ourGoalBody,
          journeySubtitle: parsedEn.journeySubtitle || defaultAboutEn.journeySubtitle,
          journeyMilestones: parseMilestones(parsedEn, defaultAboutEn.journeyMilestones, false),
          atGlanceSub: parsedEn.atGlanceSub || defaultAboutEn.atGlanceSub,
          whoWeAreImg: parsedEn.whoWeAreImg || defaultAboutEn.whoWeAreImg,
          ourGoalImg: parsedEn.ourGoalImg || defaultAboutEn.ourGoalImg,
          officeImgMain: parsedEn.officeImgMain || defaultAboutEn.officeImgMain,
          officeImgSub1: parsedEn.officeImgSub1 || defaultAboutEn.officeImgSub1,
          officeImgSub2: parsedEn.officeImgSub2 || defaultAboutEn.officeImgSub2,
        });
        setAboutBn({
          title: parsedBn.title || defaultAboutBn.title,
          subtitle: parsedBn.subtitle || defaultAboutBn.subtitle,
          ourStoryBody: parsedBn.ourStoryBody || defaultAboutBn.ourStoryBody,
          ourGoalBody: parsedBn.ourGoalBody || defaultAboutBn.ourGoalBody,
          journeySubtitle: parsedBn.journeySubtitle || defaultAboutBn.journeySubtitle,
          journeyMilestones: parseMilestones(parsedBn, defaultAboutBn.journeyMilestones, true),
          atGlanceSub: parsedBn.atGlanceSub || defaultAboutBn.atGlanceSub,
          whoWeAreImg: parsedBn.whoWeAreImg || defaultAboutBn.whoWeAreImg,
          ourGoalImg: parsedBn.ourGoalImg || defaultAboutBn.ourGoalImg,
          officeImgMain: parsedBn.officeImgMain || defaultAboutBn.officeImgMain,
          officeImgSub1: parsedBn.officeImgSub1 || defaultAboutBn.officeImgSub1,
          officeImgSub2: parsedBn.officeImgSub2 || defaultAboutBn.officeImgSub2,
        });
      } catch (e) {
        // Fallback for legacy string (uses markdown)
        setAboutEn({
          ...defaultAboutEn,
          ourStoryBody: page.content.en || defaultAboutEn.ourStoryBody,
        });
        setAboutBn({
          ...defaultAboutBn,
          ourStoryBody: page.content.bn || defaultAboutBn.ourStoryBody,
        });
      }
    } else if (page.key === "home_solutions") {
      try {
        const enList: any[] = JSON.parse(page.content.en || "[]");
        const bnList: any[] = JSON.parse(page.content.bn || "[]");
        const merged: SolutionFormItem[] = enList.map((enItem, idx) => {
          const bnItem = bnList[idx] || {};
          return {
            name: enItem.name || bnItem.name || "",
            descEn: enItem.desc || "",
            descBn: bnItem.desc || "",
            color: enItem.color || bnItem.color || "text-[#00a884] hover:text-[#008c6e]",
            logoUrl: enItem.logoUrl || bnItem.logoUrl || "",
            learnMoreUrl: enItem.learnMoreUrl || bnItem.learnMoreUrl || "/services"
          };
        });
        setSolutions(merged);
      } catch (e) {
        setSolutions([]);
      }
    } else if (page.key === "home_at_glance") {
      try {
        const enList: any[] = JSON.parse(page.content.en || "[]");
        const bnList: any[] = JSON.parse(page.content.bn || "[]");
        const merged: AtGlanceFormItem[] = enList.map((enItem, idx) => {
          const bnItem = bnList[idx] || {};
          return {
            valEn: enItem.val || "",
            valBn: bnItem.val || "",
            lblEn: enItem.lbl || "",
            lblBn: bnItem.lbl || "",
            icon: enItem.icon || bnItem.icon || "Users"
          };
        });
        setAtGlance(merged);
      } catch (e) {
        setAtGlance([]);
      }
    } else {
      setContentEn(page.content.en);
      setContentBn(page.content.bn);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKey) return;
    setSaving(true);
    setError("");
    setSuccess("");

    const getPayloadContent = (lang: "en" | "bn") => {
      if (selectedKey === "contact_info") {
        return JSON.stringify(lang === "en" ? contactEn : contactBn);
      }
      if (selectedKey === "bkash_settings") {
        return JSON.stringify(bkashSettings);
      }
      if (selectedKey === "smtp_settings") {
        return JSON.stringify(smtpSettings);
      }
      if (selectedKey === "gtm_settings") {
        return JSON.stringify(gtmSettings);
      }
      if (selectedKey === "clarity_settings") {
        return JSON.stringify(claritySettings);
      }
      if (selectedKey === "elevenlabs_settings") {
        return JSON.stringify(elevenlabsSettings);
      }
      if (selectedKey === "home_consulting_cta") {
        return JSON.stringify(lang === "en" ? homeCtaEn : homeCtaBn);
      }
      if (selectedKey === "offer_popup") {
        return JSON.stringify(lang === "en" ? offerEn : offerBn);
      }
      if (selectedKey === "ezycom") {
        return JSON.stringify(lang === "en" ? ezyComEn : ezyComBn);
      }
      if (selectedKey === "ezy_checkout" || (pages.find(p => p.key === selectedKey) && isLandingPage(pages.find(p => p.key === selectedKey)))) {
        return JSON.stringify(lang === "en" ? ezyCheckoutEn : ezyCheckoutBn);
      }
      if (selectedKey === "about") {
        return JSON.stringify(lang === "en" ? aboutEn : aboutBn);
      }
      if (selectedKey === "home_solutions") {
        const enList = solutions.map(item => ({
          name: item.name,
          desc: item.descEn,
          color: item.color,
          logoUrl: item.logoUrl,
          learnMoreUrl: item.learnMoreUrl
        }));
        const bnList = solutions.map(item => ({
          name: item.name,
          desc: item.descBn,
          color: item.color,
          logoUrl: item.logoUrl,
          learnMoreUrl: item.learnMoreUrl
        }));
        return JSON.stringify(lang === "en" ? enList : bnList);
      }
      if (selectedKey === "home_at_glance") {
        const enList = atGlance.map(item => ({
          val: item.valEn,
          lbl: item.lblEn,
          icon: item.icon
        }));
        const bnList = atGlance.map(item => ({
          val: item.valBn,
          lbl: item.lblBn,
          icon: item.icon
        }));
        return JSON.stringify(lang === "en" ? enList : bnList);
      }
      return lang === "en" ? contentEn : contentBn;
    };

    const payload = {
      content: {
        en: getPayloadContent("en"),
        bn: getPayloadContent("bn"),
      },
    };

    try {
      const res = await fetch(`/api/admin/pages/${selectedKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update content");
      }

      setSuccess("Content updated successfully!");
      setSelectedKey(null);
      fetchPages();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const getPageTitle = (key: string) => {
    switch (key) {
      case "about":
        return "About Us Content";
      case "terms":
        return "Terms & Conditions";
      case "privacy":
        return "Privacy Policy";
      case "contact_info":
        return "Global Contact Information";
      case "bkash_settings":
        return "bKash Payment Gateway Settings";
      case "smtp_settings":
        return "SMTP Server Settings";
      case "gtm_settings":
        return "Google Tag Manager (GTM) Settings";
      case "clarity_settings":
        return "Microsoft Clarity Settings";
      case "elevenlabs_settings":
        return "ElevenLabs Calling Agent Settings";
      case "home_consulting_cta":
        return "Technology Consulting CTA & Banner";
      case "offer_popup":
        return "Welcome Offer Popup";
      case "ezy_checkout":
        return "Ezy Checkout Landing Page";
      case "ezycom":
        return "EzyCom Landing Page";
      case "home_solutions":
        return "Homepage Solutions";
      case "home_at_glance":
        return "At A Glance Stats";
      default:
        return key.toUpperCase();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Pages & Settings Manager</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Dynamically manage multilingual content for About page, Policies, and Global Contact details.
        </p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-400 rounded-2xl text-sm font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          {success}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 rounded-2xl text-sm font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Editor Section */}
      {selectedKey && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-md">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
            Edit {getPageTitle(selectedKey)}
          </h2>
          <form onSubmit={handleSave} className="space-y-6">
            {selectedKey === "contact_info" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* English Contact Settings */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">English Info</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Phone</label>
                      <Input value={contactEn.phone} onChange={(e) => setContactEn({ ...contactEn, phone: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Email</label>
                      <Input value={contactEn.email} onChange={(e) => setContactEn({ ...contactEn, email: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Office Address</label>
                      <Input value={contactEn.address} onChange={(e) => setContactEn({ ...contactEn, address: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Working Hours</label>
                      <Input value={contactEn.hours} onChange={(e) => setContactEn({ ...contactEn, hours: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Google Map Embed URL</label>
                      <Input value={contactEn.mapUrl || ""} onChange={(e) => setContactEn({ ...contactEn, mapUrl: e.target.value })} placeholder="e.g. https://www.google.com/maps/embed?..." />
                    </div>
                  </div>
                </div>

                {/* Bengali Contact Settings */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">Bengali Info</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Phone</label>
                      <Input value={contactBn.phone} onChange={(e) => setContactBn({ ...contactBn, phone: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Email</label>
                      <Input value={contactBn.email} onChange={(e) => setContactBn({ ...contactBn, email: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Office Address</label>
                      <Input value={contactBn.address} onChange={(e) => setContactBn({ ...contactBn, address: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Working Hours</label>
                      <Input value={contactBn.hours} onChange={(e) => setContactBn({ ...contactBn, hours: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Google Map Embed URL</label>
                      <Input value={contactBn.mapUrl || ""} onChange={(e) => setContactBn({ ...contactBn, mapUrl: e.target.value })} placeholder="e.g. https://www.google.com/maps/embed?..." />
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedKey === "bkash_settings" ? (
              <div className="space-y-4 max-w-xl">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">bKash API URL Base</label>
                  <Input value={bkashSettings.apiUrl} onChange={(e) => setBkashSettings({ ...bkashSettings, apiUrl: e.target.value })} placeholder="e.g. https://tokenized.sandbox.bka.sh/v1.2.0-beta" />
                  <p className="text-[10px] text-slate-400">Sandbox: https://tokenized.sandbox.bka.sh/v1.2.0-beta, Production: https://tokenized.pay.bka.sh/v1.2.0-beta</p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Merchant Username</label>
                  <Input value={bkashSettings.username} onChange={(e) => setBkashSettings({ ...bkashSettings, username: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Merchant Password</label>
                  <Input type="password" value={bkashSettings.password} onChange={(e) => setBkashSettings({ ...bkashSettings, password: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">App Key</label>
                  <Input value={bkashSettings.appKey} onChange={(e) => setBkashSettings({ ...bkashSettings, appKey: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">App Secret</label>
                  <Input type="password" value={bkashSettings.appSecret} onChange={(e) => setBkashSettings({ ...bkashSettings, appSecret: e.target.value })} />
                </div>
              </div>
            ) : selectedKey === "gtm_settings" ? (
              <div className="space-y-4 max-w-xl">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">GTM Container ID</label>
                  <Input value={gtmSettings.containerId} onChange={(e) => setGtmSettings({ ...gtmSettings, containerId: e.target.value })} placeholder="e.g. GTM-XXXXXXX" />
                </div>
                <div className="space-y-1">
                  <Dropdown
                    label="Status"
                    value={gtmSettings.isEnabled}
                    onChange={(val) => setGtmSettings({ ...gtmSettings, isEnabled: val })}
                  >
                    <option value="true">Enabled (Track Visitors)</option>
                    <option value="false">Disabled</option>
                  </Dropdown>
                </div>
              </div>
            ) : selectedKey === "clarity_settings" ? (
              <div className="space-y-4 max-w-xl">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Clarity Project ID</label>
                  <Input value={claritySettings.projectId} onChange={(e) => setClaritySettings({ ...claritySettings, projectId: e.target.value })} placeholder="e.g. f3x9k2p8z1" />
                </div>
                <div className="space-y-1">
                  <Dropdown
                    label="Status"
                    value={claritySettings.isEnabled}
                    onChange={(val) => setClaritySettings({ ...claritySettings, isEnabled: val })}
                  >
                    <option value="true">Enabled (Track Visitors)</option>
                    <option value="false">Disabled</option>
                  </Dropdown>
                </div>
              </div>
            ) : selectedKey === "elevenlabs_settings" ? (
              <div className="space-y-4 max-w-xl">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">ElevenLabs Agent ID</label>
                  <Input value={elevenlabsSettings.agentId} onChange={(e) => setElevenlabsSettings({ ...elevenlabsSettings, agentId: e.target.value })} placeholder="e.g. 21m00Tcm4TlvDq8iF5fS" />
                </div>
                <div className="space-y-1">
                  <Dropdown
                    label="Status"
                    value={elevenlabsSettings.isEnabled}
                    onChange={(val) => setElevenlabsSettings({ ...elevenlabsSettings, isEnabled: val })}
                  >
                    <option value="true">Enabled (Show Voice Assistant)</option>
                    <option value="false">Disabled</option>
                  </Dropdown>
                </div>
              </div>
            ) : selectedKey === "smtp_settings" ? (
              <div className="space-y-4 max-w-xl">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">SMTP Host</label>
                  <Input value={smtpSettings.host} onChange={(e) => setSmtpSettings({ ...smtpSettings, host: e.target.value })} placeholder="e.g. smtp.gmail.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">SMTP Port</label>
                  <Input value={smtpSettings.port} onChange={(e) => setSmtpSettings({ ...smtpSettings, port: e.target.value })} placeholder="e.g. 465" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Secure (SSL/TLS)</label>
                  <Input value={smtpSettings.secure} onChange={(e) => setSmtpSettings({ ...smtpSettings, secure: e.target.value })} placeholder="e.g. true" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">SMTP Username</label>
                  <Input value={smtpSettings.authEmail} onChange={(e) => setSmtpSettings({ ...smtpSettings, authEmail: e.target.value })} placeholder="e.g. sender@gmail.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">SMTP Password</label>
                  <Input type="password" value={smtpSettings.authPass} onChange={(e) => setSmtpSettings({ ...smtpSettings, authPass: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Sender Email (From)</label>
                  <Input value={smtpSettings.senderEmail} onChange={(e) => setSmtpSettings({ ...smtpSettings, senderEmail: e.target.value })} placeholder="e.g. invoice@ecare.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Admin Notice Email (BCC/To Sales)</label>
                  <Input value={smtpSettings.adminNoticeEmail} onChange={(e) => setSmtpSettings({ ...smtpSettings, adminNoticeEmail: e.target.value })} placeholder="e.g. sales@ecare.com" />
                </div>
              </div>
            ) : selectedKey === "home_consulting_cta" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* English Consulting Settings */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">English Settings</h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Banner Image URL</label>
                        <div className="flex gap-2">
                          <Input value={homeCtaEn.image} onChange={(e) => setHomeCtaEn({ ...homeCtaEn, image: e.target.value })} className="flex-1 text-xs h-9" />
                          <ImageUploader value={homeCtaEn.image} onChange={(val) => setHomeCtaEn({ ...homeCtaEn, image: val })} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Badge / Subtitle Text</label>
                        <Input value={homeCtaEn.badge} onChange={(e) => setHomeCtaEn({ ...homeCtaEn, badge: e.target.value })} className="text-xs h-9" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Heading Title</label>
                        <Input value={homeCtaEn.title} onChange={(e) => setHomeCtaEn({ ...homeCtaEn, title: e.target.value })} className="text-xs h-9" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Description</label>
                        <textarea
                          rows={3}
                          value={homeCtaEn.description}
                          onChange={(e) => setHomeCtaEn({ ...homeCtaEn, description: e.target.value })}
                          className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Trust / Small Text</label>
                        <textarea
                          rows={3}
                          value={homeCtaEn.trustText}
                          onChange={(e) => setHomeCtaEn({ ...homeCtaEn, trustText: e.target.value })}
                          className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Button 1 Text</label>
                          <Input value={homeCtaEn.btn1Text} onChange={(e) => setHomeCtaEn({ ...homeCtaEn, btn1Text: e.target.value })} className="text-xs h-9" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Button 1 Link / URL</label>
                          <Input value={homeCtaEn.btn1Url} onChange={(e) => setHomeCtaEn({ ...homeCtaEn, btn1Url: e.target.value })} className="text-xs h-9" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Button 2 Text</label>
                          <Input value={homeCtaEn.btn2Text} onChange={(e) => setHomeCtaEn({ ...homeCtaEn, btn2Text: e.target.value })} className="text-xs h-9" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Button 2 Link / URL</label>
                          <Input value={homeCtaEn.btn2Url} onChange={(e) => setHomeCtaEn({ ...homeCtaEn, btn2Url: e.target.value })} className="text-xs h-9" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bengali Consulting Settings */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">Bengali Settings</h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Banner Image URL</label>
                        <div className="flex gap-2">
                          <Input value={homeCtaBn.image} onChange={(e) => setHomeCtaBn({ ...homeCtaBn, image: e.target.value })} className="flex-1 text-xs h-9" />
                          <ImageUploader value={homeCtaBn.image} onChange={(val) => setHomeCtaBn({ ...homeCtaBn, image: val })} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Badge / Subtitle Text</label>
                        <Input value={homeCtaBn.badge} onChange={(e) => setHomeCtaBn({ ...homeCtaBn, badge: e.target.value })} className="text-xs h-9" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Heading Title</label>
                        <Input value={homeCtaBn.title} onChange={(e) => setHomeCtaBn({ ...homeCtaBn, title: e.target.value })} className="text-xs h-9" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Description</label>
                        <textarea
                          rows={3}
                          value={homeCtaBn.description}
                          onChange={(e) => setHomeCtaBn({ ...homeCtaBn, description: e.target.value })}
                          className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Trust / Small Text</label>
                        <textarea
                          rows={3}
                          value={homeCtaBn.trustText}
                          onChange={(e) => setHomeCtaBn({ ...homeCtaBn, trustText: e.target.value })}
                          className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Button 1 Text</label>
                          <Input value={homeCtaBn.btn1Text} onChange={(e) => setHomeCtaBn({ ...homeCtaBn, btn1Text: e.target.value })} className="text-xs h-9" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Button 1 Link / URL</label>
                          <Input value={homeCtaBn.btn1Url} onChange={(e) => setHomeCtaBn({ ...homeCtaBn, btn1Url: e.target.value })} className="text-xs h-9" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Button 2 Text</label>
                          <Input value={homeCtaBn.btn2Text} onChange={(e) => setHomeCtaBn({ ...homeCtaBn, btn2Text: e.target.value })} className="text-xs h-9" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Button 2 Link / URL</label>
                          <Input value={homeCtaBn.btn2Url} onChange={(e) => setHomeCtaBn({ ...homeCtaBn, btn2Url: e.target.value })} className="text-xs h-9" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedKey === "offer_popup" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Dropdown
                    label="Popup Activation Status (Global)"
                    value={offerEn.isActive}
                    onChange={(val) => {
                      setOfferEn({ ...offerEn, isActive: val });
                      setOfferBn({ ...offerBn, isActive: val });
                    }}
                  >
                    <option value="true">Active (Display Popup)</option>
                    <option value="false">Inactive (Disable Popup)</option>
                  </Dropdown>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* English Offer Settings */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">English Promotion</h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Popup Title</label>
                        <Input value={offerEn.title} onChange={(e) => setOfferEn({ ...offerEn, title: e.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Subtitle Description</label>
                        <textarea
                          rows={3}
                          value={offerEn.subtitle}
                          onChange={(e) => setOfferEn({ ...offerEn, subtitle: e.target.value })}
                          className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Discount Percent (e.g. 20)</label>
                        <Input value={offerEn.discountPercent} onChange={(e) => setOfferEn({ ...offerEn, discountPercent: e.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Promo Code (e.g. GROWTH20)</label>
                        <Input value={offerEn.discountCode} onChange={(e) => setOfferEn({ ...offerEn, discountCode: e.target.value })} />
                      </div>
                    </div>
                  </div>

                  {/* Bengali Offer Settings */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">Bengali Promotion</h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Popup Title</label>
                        <Input value={offerBn.title} onChange={(e) => setOfferBn({ ...offerBn, title: e.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Subtitle Description</label>
                        <textarea
                          rows={3}
                          value={offerBn.subtitle}
                          onChange={(e) => setOfferBn({ ...offerBn, subtitle: e.target.value })}
                          className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Discount Percent (e.g. ২০)</label>
                        <Input value={offerBn.discountPercent} onChange={(e) => setOfferBn({ ...offerBn, discountPercent: e.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Promo Code (e.g. GROWTH20)</label>
                        <Input value={offerBn.discountCode} onChange={(e) => setOfferBn({ ...offerBn, discountCode: e.target.value })} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedKey === "ezycom" ? (
              <div className="space-y-6">
                {/* Builder Tabs Navigation */}
                <div className="flex flex-wrap gap-2 border-b border-border pb-4">
                  {["hero", "problems", "capabilities", "walkthrough", "nav_ticker", "demos", "compare", "final_cta"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setEzyComTab(tab)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all capitalize cursor-pointer ${
                        ezyComTab === tab
                          ? "bg-primary text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {tab === "nav_ticker" ? "Sticky Nav & Ticker" : tab === "compare" ? "Comparison Grid" : tab === "final_cta" ? "Final CTA" : tab === "problems" ? "The Reality Check" : tab === "capabilities" ? "Core Capabilities" : tab === "walkthrough" ? "Video Walkthrough" : tab}
                    </button>
                  ))}
                </div>

                {/* Hero Tab */}
                {ezyComTab === "hero" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">English Hero Settings</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Hero Badge</label>
                          <Input value={ezyComEn.heroBadge} onChange={(e) => setEzyComEn({ ...ezyComEn, heroBadge: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Hero Title (HTML)</label>
                          <Input value={ezyComEn.heroTitleHtml} onChange={(e) => setEzyComEn({ ...ezyComEn, heroTitleHtml: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Hero Subtitle</label>
                          <textarea
                            rows={3}
                            value={ezyComEn.heroSub}
                            onChange={(e) => setEzyComEn({ ...ezyComEn, heroSub: e.target.value })}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">CTA Free Trial Text</label>
                            <Input value={ezyComEn.heroCtaFree} onChange={(e) => setEzyComEn({ ...ezyComEn, heroCtaFree: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">CTA Build Store Text</label>
                            <Input value={ezyComEn.heroCtaBuild} onChange={(e) => setEzyComEn({ ...ezyComEn, heroCtaBuild: e.target.value })} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">Bengali Hero Settings</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Hero Badge</label>
                          <Input value={ezyComBn.heroBadge} onChange={(e) => setEzyComBn({ ...ezyComBn, heroBadge: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Hero Title (HTML)</label>
                          <Input value={ezyComBn.heroTitleHtml} onChange={(e) => setEzyComBn({ ...ezyComBn, heroTitleHtml: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Hero Subtitle</label>
                          <textarea
                            rows={3}
                            value={ezyComBn.heroSub}
                            onChange={(e) => setEzyComBn({ ...ezyComBn, heroSub: e.target.value })}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">CTA Free Trial Text</label>
                            <Input value={ezyComBn.heroCtaFree} onChange={(e) => setEzyComBn({ ...ezyComBn, heroCtaFree: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">CTA Build Store Text</label>
                            <Input value={ezyComBn.heroCtaBuild} onChange={(e) => setEzyComBn({ ...ezyComBn, heroCtaBuild: e.target.value })} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Slider Images Section */}
                    <div className="space-y-4 border-t border-border pt-6 col-span-1 lg:col-span-2">
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800 dark:text-white">Hero Slider Mockup Images</h3>
                          <p className="text-[11px] text-slate-400">Add or upload showcase mockup screenshots. Admins can add as many slides as they want.</p>
                        </div>
                        <Button
                          type="button"
                          onClick={() => {
                            const updatedEn = [...(ezyComEn.heroImages || [])];
                            updatedEn.push("");
                            setEzyComEn({ ...ezyComEn, heroImages: updatedEn });

                            const updatedBn = [...(ezyComBn.heroImages || [])];
                            updatedBn.push("");
                            setEzyComBn({ ...ezyComBn, heroImages: updatedBn });
                          }}
                          className="bg-primary text-white font-semibold text-xs py-1 px-3 rounded-lg cursor-pointer"
                        >
                          Add Slide Image
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(ezyComEn.heroImages || []).map((img, idx) => (
                          <div key={idx} className="p-4 border border-border rounded-2xl bg-slate-50/50 dark:bg-slate-800/10 space-y-3 relative flex flex-col justify-between">
                            <Button
                              type="button"
                              onClick={() => {
                                const updatedEn = (ezyComEn.heroImages || []).filter((_, i) => i !== idx);
                                setEzyComEn({ ...ezyComEn, heroImages: updatedEn });

                                const updatedBn = (ezyComBn.heroImages || []).filter((_, i) => i !== idx);
                                setEzyComBn({ ...ezyComBn, heroImages: updatedBn });
                              }}
                              className="absolute top-2 right-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold text-[10px] px-2 py-1 rounded-md cursor-pointer z-10"
                            >
                              Remove Slide
                            </Button>
                            
                            <div className="space-y-2 pt-4">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Slide #{idx + 1} Image</span>
                              <ImageUploader
                                value={img}
                                onChange={(val) => {
                                  const updatedEn = [...(ezyComEn.heroImages || [])];
                                  updatedEn[idx] = val;
                                  setEzyComEn({ ...ezyComEn, heroImages: updatedEn });

                                  const updatedBn = [...(ezyComBn.heroImages || [])];
                                  updatedBn[idx] = val;
                                  setEzyComBn({ ...ezyComBn, heroImages: updatedBn });
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* Problems Tab */}
                {ezyComTab === "problems" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">English Problems Section Header</h3>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Badge</label>
                            <Input value={ezyComEn.problemSectionBadge} onChange={(e) => setEzyComEn({ ...ezyComEn, problemSectionBadge: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Title (HTML)</label>
                            <Input value={ezyComEn.problemSectionTitleHtml} onChange={(e) => setEzyComEn({ ...ezyComEn, problemSectionTitleHtml: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Subtitle</label>
                            <textarea
                              rows={3}
                              value={ezyComEn.problemSectionSub}
                              onChange={(e) => setEzyComEn({ ...ezyComEn, problemSectionSub: e.target.value })}
                              className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">Bengali Problems Section Header</h3>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Badge</label>
                            <Input value={ezyComBn.problemSectionBadge} onChange={(e) => setEzyComBn({ ...ezyComBn, problemSectionBadge: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Title (HTML)</label>
                            <Input value={ezyComBn.problemSectionTitleHtml} onChange={(e) => setEzyComBn({ ...ezyComBn, problemSectionTitleHtml: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Subtitle</label>
                            <textarea
                              rows={3}
                              value={ezyComBn.problemSectionSub}
                              onChange={(e) => setEzyComBn({ ...ezyComBn, problemSectionSub: e.target.value })}
                              className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 border-t border-border pt-6">
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800 dark:text-white">Problem Cards List</h3>
                          <p className="text-[11px] text-slate-400">Add or manage failure points/reality check cards shown in the slider.</p>
                        </div>
                        <Button
                          type="button"
                          onClick={() => {
                            setEzyComEn({
                              ...ezyComEn,
                              problemSectionCards: [...(ezyComEn.problemSectionCards || []), { icon: "", title: "New Problem Card", desc: "Description", badge: "Badge Text" }]
                            });
                            setEzyComBn({
                              ...ezyComBn,
                              problemSectionCards: [...(ezyComBn.problemSectionCards || []), { icon: "", title: "নতুন সমস্যা কার্ড", desc: "বর্ণনা", badge: "ব্যাজ টেক্সট" }]
                            });
                          }}
                          className="bg-primary text-white font-semibold text-xs py-1 px-3 rounded-lg cursor-pointer"
                        >
                          Add Problem Card
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {(ezyComEn.problemSectionCards || []).map((card, idx) => (
                          <div key={idx} className="p-4 border border-border rounded-2xl bg-slate-50/50 dark:bg-slate-800/10 space-y-3 relative">
                            <Button
                              type="button"
                              onClick={() => {
                                const updatedEn = (ezyComEn.problemSectionCards || []).filter((_, i) => i !== idx);
                                setEzyComEn({ ...ezyComEn, problemSectionCards: updatedEn });

                                const updatedBn = (ezyComBn.problemSectionCards || []).filter((_, i) => i !== idx);
                                setEzyComBn({ ...ezyComBn, problemSectionCards: updatedBn });
                              }}
                              className="absolute top-2 right-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold text-[10px] px-2 py-1 rounded-md cursor-pointer z-10"
                            >
                              Delete Card
                            </Button>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pt-4">
                              <div className="md:col-span-3 space-y-2">
                                <span className="text-[10px] uppercase font-bold text-slate-400">Card Icon</span>
                                <ImageUploader
                                  value={card.icon}
                                  onChange={(val) => {
                                    const updatedEn = [...(ezyComEn.problemSectionCards || [])];
                                    updatedEn[idx].icon = val;
                                    setEzyComEn({ ...ezyComEn, problemSectionCards: updatedEn });

                                    const updatedBn = [...(ezyComBn.problemSectionCards || [])];
                                    updatedBn[idx].icon = val;
                                    setEzyComBn({ ...ezyComBn, problemSectionCards: updatedBn });
                                  }}
                                />
                              </div>

                              <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <span className="text-[10px] uppercase font-bold text-slate-400">English Text</span>
                                  <div className="space-y-2">
                                    <Input value={card.title} onChange={(e) => {
                                      const updated = [...(ezyComEn.problemSectionCards || [])];
                                      updated[idx].title = e.target.value;
                                      setEzyComEn({ ...ezyComEn, problemSectionCards: updated });
                                    }} placeholder="Title" />
                                    <Input value={card.badge} onChange={(e) => {
                                      const updated = [...(ezyComEn.problemSectionCards || [])];
                                      updated[idx].badge = e.target.value;
                                      setEzyComEn({ ...ezyComEn, problemSectionCards: updated });
                                    }} placeholder="Badge Text" />
                                    <textarea
                                      rows={2}
                                      value={card.desc}
                                      onChange={(e) => {
                                        const updated = [...(ezyComEn.problemSectionCards || [])];
                                        updated[idx].desc = e.target.value;
                                        setEzyComEn({ ...ezyComEn, problemSectionCards: updated });
                                      }}
                                      placeholder="Description Text"
                                      className="flex w-full rounded-md border border-border bg-background px-3 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <span className="text-[10px] uppercase font-bold text-slate-400">Bengali Text</span>
                                  <div className="space-y-2">
                                    <Input value={ezyComBn.problemSectionCards[idx]?.title || ""} onChange={(e) => {
                                      const updated = [...(ezyComBn.problemSectionCards || [])];
                                      if (!updated[idx]) updated[idx] = { icon: "", title: "", desc: "", badge: "" };
                                      updated[idx].title = e.target.value;
                                      setEzyComBn({ ...ezyComBn, problemSectionCards: updated });
                                    }} placeholder="শিরোনাম" />
                                    <Input value={ezyComBn.problemSectionCards[idx]?.badge || ""} onChange={(e) => {
                                      const updated = [...(ezyComBn.problemSectionCards || [])];
                                      if (!updated[idx]) updated[idx] = { icon: "", title: "", desc: "", badge: "" };
                                      updated[idx].badge = e.target.value;
                                      setEzyComBn({ ...ezyComBn, problemSectionCards: updated });
                                    }} placeholder="ব্যাজ টেক্সট" />
                                    <textarea
                                      rows={2}
                                      value={ezyComBn.problemSectionCards[idx]?.desc || ""}
                                      onChange={(e) => {
                                        const updated = [...(ezyComBn.problemSectionCards || [])];
                                        if (!updated[idx]) updated[idx] = { icon: "", title: "", desc: "", badge: "" };
                                        updated[idx].desc = e.target.value;
                                        setEzyComBn({ ...ezyComBn, problemSectionCards: updated });
                                      }}
                                      placeholder="বর্ণনা"
                                      className="flex w-full rounded-md border border-border bg-background px-3 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Capabilities Tab */}
                {ezyComTab === "capabilities" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">English Header Settings</h3>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Section Badge</label>
                            <Input value={ezyComEn.capabilitiesSectionBadge} onChange={(e) => setEzyComEn({ ...ezyComEn, capabilitiesSectionBadge: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Section Title (HTML)</label>
                            <Input value={ezyComEn.capabilitiesSectionTitleHtml} onChange={(e) => setEzyComEn({ ...ezyComEn, capabilitiesSectionTitleHtml: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Section Subtitle</label>
                            <textarea
                              rows={3}
                              value={ezyComEn.capabilitiesSectionSub}
                              onChange={(e) => setEzyComEn({ ...ezyComEn, capabilitiesSectionSub: e.target.value })}
                              className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">Bengali Header Settings</h3>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Section Badge</label>
                            <Input value={ezyComBn.capabilitiesSectionBadge} onChange={(e) => setEzyComBn({ ...ezyComBn, capabilitiesSectionBadge: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Section Title (HTML)</label>
                            <Input value={ezyComBn.capabilitiesSectionTitleHtml} onChange={(e) => setEzyComBn({ ...ezyComBn, capabilitiesSectionTitleHtml: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Section Subtitle</label>
                            <textarea
                              rows={3}
                              value={ezyComBn.capabilitiesSectionSub}
                              onChange={(e) => setEzyComBn({ ...ezyComBn, capabilitiesSectionSub: e.target.value })}
                              className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bento Grid Cards Section */}
                    <div className="space-y-4 border-t border-border pt-6">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white pb-2 border-b border-border">Bento Grid Cards (Exactly 5 Cards)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(ezyComEn.capabilitiesBentoCards || []).map((card, idx) => (
                          <div key={idx} className="p-4 border border-border rounded-2xl bg-slate-50/50 dark:bg-slate-800/10 space-y-3 relative flex flex-col justify-between">
                            <div className="space-y-2">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Bento Card #{idx + 1}</span>
                              <div className="space-y-2">
                                <ImageUploader
                                  value={card.image}
                                  onChange={(val) => {
                                    const updatedEn = [...(ezyComEn.capabilitiesBentoCards || [])];
                                    updatedEn[idx].image = val;
                                    setEzyComEn({ ...ezyComEn, capabilitiesBentoCards: updatedEn });

                                    const updatedBn = [...(ezyComBn.capabilitiesBentoCards || [])];
                                    updatedBn[idx].image = val;
                                    setEzyComBn({ ...ezyComBn, capabilitiesBentoCards: updatedBn });
                                  }}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-1">
                                    <span className="text-[9px] text-slate-400">EN Tag</span>
                                    <Input value={card.tag} onChange={(e) => {
                                      const updated = [...(ezyComEn.capabilitiesBentoCards || [])];
                                      updated[idx].tag = e.target.value;
                                      setEzyComEn({ ...ezyComEn, capabilitiesBentoCards: updated });
                                    }} placeholder="Tag" />
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-[9px] text-slate-400">BN Tag</span>
                                    <Input value={ezyComBn.capabilitiesBentoCards[idx]?.tag || ""} onChange={(e) => {
                                      const updated = [...(ezyComBn.capabilitiesBentoCards || [])];
                                      if (!updated[idx]) updated[idx] = { tag: "", title: "", desc: "", image: "" };
                                      updated[idx].tag = e.target.value;
                                      setEzyComBn({ ...ezyComBn, capabilitiesBentoCards: updated });
                                    }} placeholder="ট্যাগ" />
                                  </div>
                                </div>
                                
                                <div className="space-y-1">
                                  <span className="text-[9px] text-slate-400 font-bold">English Content</span>
                                  <Input value={card.title} onChange={(e) => {
                                    const updated = [...(ezyComEn.capabilitiesBentoCards || [])];
                                    updated[idx].title = e.target.value;
                                    setEzyComEn({ ...ezyComEn, capabilitiesBentoCards: updated });
                                  }} placeholder="EN Title" />
                                  <textarea
                                    rows={2}
                                    value={card.desc}
                                    onChange={(e) => {
                                      const updated = [...(ezyComEn.capabilitiesBentoCards || [])];
                                      updated[idx].desc = e.target.value;
                                      setEzyComEn({ ...ezyComEn, capabilitiesBentoCards: updated });
                                    }}
                                    placeholder="EN Description"
                                    className="flex w-full rounded-md border border-border bg-background px-3 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <span className="text-[9px] text-slate-400 font-bold">Bengali Content</span>
                                  <Input value={ezyComBn.capabilitiesBentoCards[idx]?.title || ""} onChange={(e) => {
                                    const updated = [...(ezyComBn.capabilitiesBentoCards || [])];
                                    if (!updated[idx]) updated[idx] = { tag: "", title: "", desc: "", image: "" };
                                    updated[idx].title = e.target.value;
                                    setEzyComBn({ ...ezyComBn, capabilitiesBentoCards: updated });
                                  }} placeholder="BN শিরোনাম" />
                                  <textarea
                                    rows={2}
                                    value={ezyComBn.capabilitiesBentoCards[idx]?.desc || ""}
                                    onChange={(e) => {
                                      const updated = [...(ezyComBn.capabilitiesBentoCards || [])];
                                      if (!updated[idx]) updated[idx] = { tag: "", title: "", desc: "", image: "" };
                                      updated[idx].desc = e.target.value;
                                      setEzyComBn({ ...ezyComBn, capabilitiesBentoCards: updated });
                                    }}
                                    placeholder="BN বিবরণ"
                                    className="flex w-full rounded-md border border-border bg-background px-3 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features List Section (Modal Features) */}
                    <div className="space-y-4 border-t border-border pt-6">
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800 dark:text-white">All Features list (Modal Box)</h3>
                          <p className="text-[11px] text-slate-400">Add or manage features listing shown inside the "View All Features" lightbox.</p>
                        </div>
                        <Button
                          type="button"
                          onClick={() => {
                            setEzyComEn({
                              ...ezyComEn,
                              capabilitiesFeatureItems: [...(ezyComEn.capabilitiesFeatureItems || []), { title: "New Feature", desc: "Description text" }]
                            });
                            setEzyComBn({
                              ...ezyComBn,
                              capabilitiesFeatureItems: [...(ezyComBn.capabilitiesFeatureItems || []), { title: "নতুন ফিচার", desc: "বর্ণনা টেক্সট" }]
                            });
                          }}
                          className="bg-primary text-white font-semibold text-xs py-1 px-3 rounded-lg cursor-pointer"
                        >
                          Add Feature Item
                        </Button>
                      </div>

                      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {(ezyComEn.capabilitiesFeatureItems || []).map((item, idx) => (
                          <div key={idx} className="p-4 border border-border rounded-2xl bg-slate-50/50 dark:bg-slate-800/10 space-y-3 relative">
                            <Button
                              type="button"
                              onClick={() => {
                                const updatedEn = (ezyComEn.capabilitiesFeatureItems || []).filter((_, i) => i !== idx);
                                setEzyComEn({ ...ezyComEn, capabilitiesFeatureItems: updatedEn });

                                const updatedBn = (ezyComBn.capabilitiesFeatureItems || []).filter((_, i) => i !== idx);
                                setEzyComBn({ ...ezyComBn, capabilitiesFeatureItems: updatedBn });
                              }}
                              className="absolute top-2 right-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold text-[10px] px-2 py-1 rounded-md cursor-pointer z-10"
                            >
                              Remove
                            </Button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                              <div className="space-y-2">
                                <span className="text-[10px] uppercase font-bold text-slate-400">English details #{idx + 1}</span>
                                <Input value={item.title} onChange={(e) => {
                                  const updated = [...(ezyComEn.capabilitiesFeatureItems || [])];
                                  updated[idx].title = e.target.value;
                                  setEzyComEn({ ...ezyComEn, capabilitiesFeatureItems: updated });
                                }} placeholder="Feature Title" />
                                <textarea
                                  rows={1.5}
                                  value={item.desc}
                                  onChange={(e) => {
                                    const updated = [...(ezyComEn.capabilitiesFeatureItems || [])];
                                    updated[idx].desc = e.target.value;
                                    setEzyComEn({ ...ezyComEn, capabilitiesFeatureItems: updated });
                                  }}
                                  placeholder="Feature Description"
                                  className="flex w-full rounded-md border border-border bg-background px-3 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                                />
                              </div>

                              <div className="space-y-2">
                                <span className="text-[10px] uppercase font-bold text-slate-400">Bengali details #{idx + 1}</span>
                                <Input value={ezyComBn.capabilitiesFeatureItems[idx]?.title || ""} onChange={(e) => {
                                  const updated = [...(ezyComBn.capabilitiesFeatureItems || [])];
                                  if (!updated[idx]) updated[idx] = { title: "", desc: "" };
                                  updated[idx].title = e.target.value;
                                  setEzyComBn({ ...ezyComBn, capabilitiesFeatureItems: updated });
                                }} placeholder="ফিচার শিরোনাম" />
                                <textarea
                                  rows={1.5}
                                  value={ezyComBn.capabilitiesFeatureItems[idx]?.desc || ""}
                                  onChange={(e) => {
                                    const updated = [...(ezyComBn.capabilitiesFeatureItems || [])];
                                    if (!updated[idx]) updated[idx] = { title: "", desc: "" };
                                    updated[idx].desc = e.target.value;
                                    setEzyComBn({ ...ezyComBn, capabilitiesFeatureItems: updated });
                                  }}
                                  placeholder="ফিচার বিবরণ"
                                  className="flex w-full rounded-md border border-border bg-background px-3 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Walkthrough Tab */}
                {ezyComTab === "walkthrough" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">English Walkthrough Header</h3>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Badge</label>
                            <Input value={ezyComEn.videoSectionBadge} onChange={(e) => setEzyComEn({ ...ezyComEn, videoSectionBadge: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Title (HTML)</label>
                            <Input value={ezyComEn.videoSectionTitleHtml} onChange={(e) => setEzyComEn({ ...ezyComEn, videoSectionTitleHtml: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Subtitle</label>
                            <textarea
                              rows={3}
                              value={ezyComEn.videoSectionSub}
                              onChange={(e) => setEzyComEn({ ...ezyComEn, videoSectionSub: e.target.value })}
                              className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">Bengali Walkthrough Header</h3>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Badge</label>
                            <Input value={ezyComBn.videoSectionBadge} onChange={(e) => setEzyComBn({ ...ezyComBn, videoSectionBadge: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Title (HTML)</label>
                            <Input value={ezyComBn.videoSectionTitleHtml} onChange={(e) => setEzyComBn({ ...ezyComBn, videoSectionTitleHtml: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Subtitle</label>
                            <textarea
                              rows={3}
                              value={ezyComBn.videoSectionSub}
                              onChange={(e) => setEzyComBn({ ...ezyComBn, videoSectionSub: e.target.value })}
                              className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Video playlist tabs */}
                    <div className="space-y-4 border-t border-border pt-6">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white pb-2 border-b border-border">Walkthrough Playlist Videos (Exactly 4 Videos)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(ezyComEn.videoSectionTabs || []).map((vTab, idx) => (
                          <div key={idx} className="p-4 border border-border rounded-2xl bg-slate-50/50 dark:bg-slate-800/10 space-y-3 relative">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Walkthrough Card #{idx + 1}</span>
                            
                            <div className="space-y-2">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] text-slate-400 font-bold uppercase">Video Thumbnail Image</label>
                                  <ImageUploader
                                    value={vTab.thumbnail}
                                    onChange={(val) => {
                                      const updatedEn = [...(ezyComEn.videoSectionTabs || [])];
                                      updatedEn[idx].thumbnail = val;
                                      setEzyComEn({ ...ezyComEn, videoSectionTabs: updatedEn });

                                      const updatedBn = [...(ezyComBn.videoSectionTabs || [])];
                                      updatedBn[idx].thumbnail = val;
                                      setEzyComBn({ ...ezyComBn, videoSectionTabs: updatedBn });
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-slate-400 font-bold uppercase">YouTube Video ID</label>
                                    <Input
                                      value={vTab.youtubeId}
                                      onChange={(e) => {
                                        const updatedEn = [...(ezyComEn.videoSectionTabs || [])];
                                        updatedEn[idx].youtubeId = e.target.value;
                                        setEzyComEn({ ...ezyComEn, videoSectionTabs: updatedEn });

                                        const updatedBn = [...(ezyComBn.videoSectionTabs || [])];
                                        updatedBn[idx].youtubeId = e.target.value;
                                        setEzyComBn({ ...ezyComBn, videoSectionTabs: updatedBn });
                                      }}
                                      placeholder="e.g. dQw4w9WgXcQ"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-slate-400 font-bold uppercase">English Tag/Label</label>
                                    <Input value={vTab.tag} onChange={(e) => {
                                      const updated = [...(ezyComEn.videoSectionTabs || [])];
                                      updated[idx].tag = e.target.value;
                                      setEzyComEn({ ...ezyComEn, videoSectionTabs: updated });
                                    }} placeholder="e.g. Part 01: Setup" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-slate-400 font-bold uppercase">Bengali Tag/Label</label>
                                    <Input value={ezyComBn.videoSectionTabs[idx]?.tag || ""} onChange={(e) => {
                                      const updated = [...(ezyComBn.videoSectionTabs || [])];
                                      if (!updated[idx]) updated[idx] = { tag: "", title: "", desc: "", thumbnail: "", youtubeId: "" };
                                      updated[idx].tag = e.target.value;
                                      setEzyComBn({ ...ezyComBn, videoSectionTabs: updated });
                                    }} placeholder="যেমন: পার্ট ০১: সেটিংস" />
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border/50 pt-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] text-slate-400 font-bold uppercase">English Card Content</label>
                                  <Input value={vTab.title} onChange={(e) => {
                                    const updated = [...(ezyComEn.videoSectionTabs || [])];
                                    updated[idx].title = e.target.value;
                                    setEzyComEn({ ...ezyComEn, videoSectionTabs: updated });
                                  }} placeholder="EN Title" className="mb-2" />
                                  <textarea
                                    rows={2}
                                    value={vTab.desc}
                                    onChange={(e) => {
                                      const updated = [...(ezyComEn.videoSectionTabs || [])];
                                      updated[idx].desc = e.target.value;
                                      setEzyComEn({ ...ezyComEn, videoSectionTabs: updated });
                                    }}
                                    placeholder="EN Description"
                                    className="flex w-full rounded-md border border-border bg-background px-3 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] text-slate-400 font-bold uppercase">Bengali Card Content</label>
                                  <Input value={ezyComBn.videoSectionTabs[idx]?.title || ""} onChange={(e) => {
                                    const updated = [...(ezyComBn.videoSectionTabs || [])];
                                    if (!updated[idx]) updated[idx] = { tag: "", title: "", desc: "", thumbnail: "", youtubeId: "" };
                                    updated[idx].title = e.target.value;
                                    setEzyComBn({ ...ezyComBn, videoSectionTabs: updated });
                                  }} placeholder="BN শিরোনাম" className="mb-2" />
                                  <textarea
                                    rows={2}
                                    value={ezyComBn.videoSectionTabs[idx]?.desc || ""}
                                    onChange={(e) => {
                                      const updated = [...(ezyComBn.videoSectionTabs || [])];
                                      if (!updated[idx]) updated[idx] = { tag: "", title: "", desc: "", thumbnail: "", youtubeId: "" };
                                      updated[idx].desc = e.target.value;
                                      setEzyComBn({ ...ezyComBn, videoSectionTabs: updated });
                                    }}
                                    placeholder="BN বিবরণ"
                                    className="flex w-full rounded-md border border-border bg-background px-3 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sticky Nav & Ticker Tab */}
                {ezyComTab === "nav_ticker" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">English Sticky Nav & Ticker</h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Nav Problem Label</label>
                            <Input value={ezyComEn.stickyNavLinks.problem} onChange={(e) => setEzyComEn({ ...ezyComEn, stickyNavLinks: { ...ezyComEn.stickyNavLinks, problem: e.target.value } })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Nav Features Label</label>
                            <Input value={ezyComEn.stickyNavLinks.features} onChange={(e) => setEzyComEn({ ...ezyComEn, stickyNavLinks: { ...ezyComEn.stickyNavLinks, features: e.target.value } })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Nav Demos Label</label>
                            <Input value={ezyComEn.stickyNavLinks.demos} onChange={(e) => setEzyComEn({ ...ezyComEn, stickyNavLinks: { ...ezyComEn.stickyNavLinks, demos: e.target.value } })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Nav Compare Label</label>
                            <Input value={ezyComEn.stickyNavLinks.compare} onChange={(e) => setEzyComEn({ ...ezyComEn, stickyNavLinks: { ...ezyComEn.stickyNavLinks, compare: e.target.value } })} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1 col-span-2">
                            <label className="text-xs font-semibold text-slate-500">Nav FAQ Label</label>
                            <Input value={ezyComEn.stickyNavLinks.faq} onChange={(e) => setEzyComEn({ ...ezyComEn, stickyNavLinks: { ...ezyComEn.stickyNavLinks, faq: e.target.value } })} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Nav Get Started CTA</label>
                          <Input value={ezyComEn.stickyNavCta} onChange={(e) => setEzyComEn({ ...ezyComEn, stickyNavCta: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Ticker Title</label>
                          <Input value={ezyComEn.tickerTitle} onChange={(e) => setEzyComEn({ ...ezyComEn, tickerTitle: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 flex justify-between">
                            <span>Ticker Items (One per line)</span>
                          </label>
                          <textarea
                            rows={4}
                            value={ezyComEn.tickerItems.join("\n")}
                            onChange={(e) => setEzyComEn({ ...ezyComEn, tickerItems: e.target.value.split("\n") })}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">Bengali Sticky Nav & Ticker</h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Nav Problem Label</label>
                            <Input value={ezyComBn.stickyNavLinks.problem} onChange={(e) => setEzyComBn({ ...ezyComBn, stickyNavLinks: { ...ezyComBn.stickyNavLinks, problem: e.target.value } })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Nav Features Label</label>
                            <Input value={ezyComBn.stickyNavLinks.features} onChange={(e) => setEzyComBn({ ...ezyComBn, stickyNavLinks: { ...ezyComBn.stickyNavLinks, features: e.target.value } })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Nav Demos Label</label>
                            <Input value={ezyComBn.stickyNavLinks.demos} onChange={(e) => setEzyComBn({ ...ezyComBn, stickyNavLinks: { ...ezyComBn.stickyNavLinks, demos: e.target.value } })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Nav Compare Label</label>
                            <Input value={ezyComBn.stickyNavLinks.compare} onChange={(e) => setEzyComBn({ ...ezyComBn, stickyNavLinks: { ...ezyComBn.stickyNavLinks, compare: e.target.value } })} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1 col-span-2">
                            <label className="text-xs font-semibold text-slate-500">Nav FAQ Label</label>
                            <Input value={ezyComBn.stickyNavLinks.faq} onChange={(e) => setEzyComBn({ ...ezyComBn, stickyNavLinks: { ...ezyComBn.stickyNavLinks, faq: e.target.value } })} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Nav Get Started CTA</label>
                          <Input value={ezyComBn.stickyNavCta} onChange={(e) => setEzyComBn({ ...ezyComBn, stickyNavCta: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Ticker Title</label>
                          <Input value={ezyComBn.tickerTitle} onChange={(e) => setEzyComBn({ ...ezyComBn, tickerTitle: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 flex justify-between">
                            <span>Ticker Items (One per line)</span>
                          </label>
                          <textarea
                            rows={4}
                            value={ezyComBn.tickerItems.join("\n")}
                            onChange={(e) => setEzyComBn({ ...ezyComBn, tickerItems: e.target.value.split("\n") })}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Demos Tab */}
                {ezyComTab === "demos" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">English Pre-Built Demos</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Section Badge</label>
                          <Input value={ezyComEn.demosSectionBadge} onChange={(e) => setEzyComEn({ ...ezyComEn, demosSectionBadge: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Section Title (HTML)</label>
                          <Input value={ezyComEn.demosSectionTitleHtml} onChange={(e) => setEzyComEn({ ...ezyComEn, demosSectionTitleHtml: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Section Subtitle</label>
                          <textarea
                            rows={2}
                            value={ezyComEn.demosSectionSub}
                            onChange={(e) => setEzyComEn({ ...ezyComEn, demosSectionSub: e.target.value })}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Search Box Placeholder</label>
                          <Input value={ezyComEn.demosSectionPlaceholder} onChange={(e) => setEzyComEn({ ...ezyComEn, demosSectionPlaceholder: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">All Cat</label>
                            <Input value={ezyComEn.demosSectionCatAll} onChange={(e) => setEzyComEn({ ...ezyComEn, demosSectionCatAll: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">WordPress Cat</label>
                            <Input value={ezyComEn.demosSectionCatWordPress} onChange={(e) => setEzyComEn({ ...ezyComEn, demosSectionCatWordPress: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Laravel Cat</label>
                            <Input value={ezyComEn.demosSectionCatLaravel} onChange={(e) => setEzyComEn({ ...ezyComEn, demosSectionCatLaravel: e.target.value })} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Live Button Label</label>
                            <Input value={ezyComEn.demosSectionBtnLive} onChange={(e) => setEzyComEn({ ...ezyComEn, demosSectionBtnLive: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Admin Button Label</label>
                            <Input value={ezyComEn.demosSectionBtnAdmin} onChange={(e) => setEzyComEn({ ...ezyComEn, demosSectionBtnAdmin: e.target.value })} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">Bengali Pre-Built Demos</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Section Badge</label>
                          <Input value={ezyComBn.demosSectionBadge} onChange={(e) => setEzyComBn({ ...ezyComBn, demosSectionBadge: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Section Title (HTML)</label>
                          <Input value={ezyComBn.demosSectionTitleHtml} onChange={(e) => setEzyComBn({ ...ezyComBn, demosSectionTitleHtml: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Section Subtitle</label>
                          <textarea
                            rows={2}
                            value={ezyComBn.demosSectionSub}
                            onChange={(e) => setEzyComBn({ ...ezyComBn, demosSectionSub: e.target.value })}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Search Box Placeholder</label>
                          <Input value={ezyComBn.demosSectionPlaceholder} onChange={(e) => setEzyComBn({ ...ezyComBn, demosSectionPlaceholder: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">All Cat</label>
                            <Input value={ezyComBn.demosSectionCatAll} onChange={(e) => setEzyComBn({ ...ezyComBn, demosSectionCatAll: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">WordPress Cat</label>
                            <Input value={ezyComBn.demosSectionCatWordPress} onChange={(e) => setEzyComBn({ ...ezyComBn, demosSectionCatWordPress: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Laravel Cat</label>
                            <Input value={ezyComBn.demosSectionCatLaravel} onChange={(e) => setEzyComBn({ ...ezyComBn, demosSectionCatLaravel: e.target.value })} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Live Button Label</label>
                            <Input value={ezyComBn.demosSectionBtnLive} onChange={(e) => setEzyComBn({ ...ezyComBn, demosSectionBtnLive: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Admin Button Label</label>
                            <Input value={ezyComBn.demosSectionBtnAdmin} onChange={(e) => setEzyComBn({ ...ezyComBn, demosSectionBtnAdmin: e.target.value })} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Comparison Tab */}
                {ezyComTab === "compare" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">English Comparison Header</h3>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Section Badge</label>
                            <Input value={ezyComEn.compareSectionBadge} onChange={(e) => setEzyComEn({ ...ezyComEn, compareSectionBadge: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Section Title (HTML)</label>
                            <Input value={ezyComEn.compareSectionTitleHtml} onChange={(e) => setEzyComEn({ ...ezyComEn, compareSectionTitleHtml: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Section Subtitle</label>
                            <textarea
                              rows={2}
                              value={ezyComEn.compareSectionSub}
                              onChange={(e) => setEzyComEn({ ...ezyComEn, compareSectionSub: e.target.value })}
                              className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Features Col</label>
                              <Input value={ezyComEn.compareSectionColFeatures} onChange={(e) => setEzyComEn({ ...ezyComEn, compareSectionColFeatures: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Woocom Col</label>
                              <Input value={ezyComEn.compareSectionColWp} onChange={(e) => setEzyComEn({ ...ezyComEn, compareSectionColWp: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Laracom Col</label>
                              <Input value={ezyComEn.compareSectionColLaravel} onChange={(e) => setEzyComEn({ ...ezyComEn, compareSectionColLaravel: e.target.value })} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">Bengali Comparison Header</h3>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Section Badge</label>
                            <Input value={ezyComBn.compareSectionBadge} onChange={(e) => setEzyComBn({ ...ezyComBn, compareSectionBadge: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Section Title (HTML)</label>
                            <Input value={ezyComBn.compareSectionTitleHtml} onChange={(e) => setEzyComBn({ ...ezyComBn, compareSectionTitleHtml: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Section Subtitle</label>
                            <textarea
                              rows={2}
                              value={ezyComBn.compareSectionSub}
                              onChange={(e) => setEzyComBn({ ...ezyComBn, compareSectionSub: e.target.value })}
                              className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Features Col</label>
                              <Input value={ezyComBn.compareSectionColFeatures} onChange={(e) => setEzyComBn({ ...ezyComBn, compareSectionColFeatures: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Woocom Col</label>
                              <Input value={ezyComBn.compareSectionColWp} onChange={(e) => setEzyComBn({ ...ezyComBn, compareSectionColWp: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Laracom Col</label>
                              <Input value={ezyComBn.compareSectionColLaravel} onChange={(e) => setEzyComBn({ ...ezyComBn, compareSectionColLaravel: e.target.value })} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 border-t border-border pt-6">
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white">Comparison Rows Matrix</h3>
                        <Button
                          type="button"
                          onClick={() => {
                            setEzyComEn({ ...ezyComEn, compareSectionRows: [...ezyComEn.compareSectionRows, { name: "New Feature", desc: "Description", wp: "WP Value", laravel: "Laravel Value" }] });
                            setEzyComBn({ ...ezyComBn, compareSectionRows: [...ezyComBn.compareSectionRows, { name: "নতুন ফিচার", desc: "বর্ণনা", wp: "ডব্লিউপি ভ্যালু", laravel: "লারাভেল ভ্যালু" }] });
                          }}
                          className="bg-primary text-white font-semibold text-xs py-1 px-3 rounded-lg cursor-pointer"
                        >
                          Add Comparison Row
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {ezyComEn.compareSectionRows.map((row, idx) => (
                          <div key={idx} className="p-4 border border-border rounded-2xl bg-slate-50/50 dark:bg-slate-800/10 space-y-3 relative">
                            <Button
                              type="button"
                              onClick={() => {
                                setEzyComEn({ ...ezyComEn, compareSectionRows: ezyComEn.compareSectionRows.filter((_, i) => i !== idx) });
                                setEzyComBn({ ...ezyComBn, compareSectionRows: ezyComBn.compareSectionRows.filter((_, i) => i !== idx) });
                              }}
                              className="absolute top-2 right-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold text-[10px] px-2 py-1 rounded-md cursor-pointer"
                            >
                              Delete
                            </Button>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* English Row Edit */}
                              <div className="space-y-2">
                                <span className="text-[10px] uppercase font-bold text-slate-400">English Details</span>
                                <div className="space-y-1.5">
                                  <Input value={row.name} onChange={(e) => {
                                    const updated = [...ezyComEn.compareSectionRows];
                                    updated[idx].name = e.target.value;
                                    setEzyComEn({ ...ezyComEn, compareSectionRows: updated });
                                  }} placeholder="Feature Name" />
                                  <textarea
                                    rows={1.5}
                                    value={row.desc}
                                    onChange={(e) => {
                                      const updated = [...ezyComEn.compareSectionRows];
                                      updated[idx].desc = e.target.value;
                                      setEzyComEn({ ...ezyComEn, compareSectionRows: updated });
                                    }}
                                    placeholder="Feature Description"
                                    className="flex w-full rounded-md border border-border bg-background px-3 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                                  />
                                  <div className="grid grid-cols-2 gap-2">
                                    <Input value={row.wp} onChange={(e) => {
                                      const updated = [...ezyComEn.compareSectionRows];
                                      updated[idx].wp = e.target.value;
                                      setEzyComEn({ ...ezyComEn, compareSectionRows: updated });
                                    }} placeholder="WordPress Value" />
                                    <Input value={row.laravel} onChange={(e) => {
                                      const updated = [...ezyComEn.compareSectionRows];
                                      updated[idx].laravel = e.target.value;
                                      setEzyComEn({ ...ezyComEn, compareSectionRows: updated });
                                    }} placeholder="Laravel Value" />
                                  </div>
                                </div>
                              </div>

                              {/* Bengali Row Edit */}
                              <div className="space-y-2">
                                <span className="text-[10px] uppercase font-bold text-slate-400">Bengali Details</span>
                                <div className="space-y-1.5">
                                  <Input value={ezyComBn.compareSectionRows[idx]?.name || ""} onChange={(e) => {
                                    const updated = [...ezyComBn.compareSectionRows];
                                    if(!updated[idx]) updated[idx] = { name: "", desc: "", wp: "", laravel: "" };
                                    updated[idx].name = e.target.value;
                                    setEzyComBn({ ...ezyComBn, compareSectionRows: updated });
                                  }} placeholder="ফিচারের নাম" />
                                  <textarea
                                    rows={1.5}
                                    value={ezyComBn.compareSectionRows[idx]?.desc || ""}
                                    onChange={(e) => {
                                      const updated = [...ezyComBn.compareSectionRows];
                                      if(!updated[idx]) updated[idx] = { name: "", desc: "", wp: "", laravel: "" };
                                      updated[idx].desc = e.target.value;
                                      setEzyComBn({ ...ezyComBn, compareSectionRows: updated });
                                    }}
                                    placeholder="ফিচারের বর্ণনা"
                                    className="flex w-full rounded-md border border-border bg-background px-3 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                                  />
                                  <div className="grid grid-cols-2 gap-2">
                                    <Input value={ezyComBn.compareSectionRows[idx]?.wp || ""} onChange={(e) => {
                                      const updated = [...ezyComBn.compareSectionRows];
                                      if(!updated[idx]) updated[idx] = { name: "", desc: "", wp: "", laravel: "" };
                                      updated[idx].wp = e.target.value;
                                      setEzyComBn({ ...ezyComBn, compareSectionRows: updated });
                                    }} placeholder="ডব্লিউপি ভ্যালু" />
                                    <Input value={ezyComBn.compareSectionRows[idx]?.laravel || ""} onChange={(e) => {
                                      const updated = [...ezyComBn.compareSectionRows];
                                      if(!updated[idx]) updated[idx] = { name: "", desc: "", wp: "", laravel: "" };
                                      updated[idx].laravel = e.target.value;
                                      setEzyComBn({ ...ezyComBn, compareSectionRows: updated });
                                    }} placeholder="লারাভেল ভ্যালু" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Final CTA Tab */}
                {ezyComTab === "final_cta" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">English Final CTA</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">CTA Section Badge</label>
                          <Input value={ezyComEn.finalCtaBadge} onChange={(e) => setEzyComEn({ ...ezyComEn, finalCtaBadge: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">CTA Main Title</label>
                          <Input value={ezyComEn.finalCtaTitle} onChange={(e) => setEzyComEn({ ...ezyComEn, finalCtaTitle: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">CTA Subtitle</label>
                          <textarea
                            rows={3}
                            value={ezyComEn.finalCtaSub}
                            onChange={(e) => setEzyComEn({ ...ezyComEn, finalCtaSub: e.target.value })}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Demo CTA Button</label>
                            <Input value={ezyComEn.finalCtaCtaDemo} onChange={(e) => setEzyComEn({ ...ezyComEn, finalCtaCtaDemo: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Expert CTA Button</label>
                            <Input value={ezyComEn.finalCtaCtaExpert} onChange={(e) => setEzyComEn({ ...ezyComEn, finalCtaCtaExpert: e.target.value })} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Footer License Note</label>
                          <Input value={ezyComEn.finalCtaNote} onChange={(e) => setEzyComEn({ ...ezyComEn, finalCtaNote: e.target.value })} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">Bengali Final CTA</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">CTA Section Badge</label>
                          <Input value={ezyComBn.finalCtaBadge} onChange={(e) => setEzyComBn({ ...ezyComBn, finalCtaBadge: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">CTA Main Title</label>
                          <Input value={ezyComBn.finalCtaTitle} onChange={(e) => setEzyComBn({ ...ezyComBn, finalCtaTitle: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">CTA Subtitle</label>
                          <textarea
                            rows={3}
                            value={ezyComBn.finalCtaSub}
                            onChange={(e) => setEzyComBn({ ...ezyComBn, finalCtaSub: e.target.value })}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Demo CTA Button</label>
                            <Input value={ezyComBn.finalCtaCtaDemo} onChange={(e) => setEzyComBn({ ...ezyComBn, finalCtaCtaDemo: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Expert CTA Button</label>
                            <Input value={ezyComBn.finalCtaCtaExpert} onChange={(e) => setEzyComBn({ ...ezyComBn, finalCtaCtaExpert: e.target.value })} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Footer License Note</label>
                          <Input value={ezyComBn.finalCtaNote} onChange={(e) => setEzyComBn({ ...ezyComBn, finalCtaNote: e.target.value })} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (selectedKey === "ezy_checkout" || (pages.find(p => p.key === selectedKey) && isLandingPage(pages.find(p => p.key === selectedKey)))) ? (
              <div className="space-y-6">
                {/* Builder Tabs Navigation */}
                <div className="flex flex-wrap gap-2 border-b border-border pb-4">
                  {["hero", "features", "features2", "overview", "pricing", "faqs"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setEzyTab(tab)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all capitalize cursor-pointer ${
                        ezyTab === tab
                          ? "bg-primary text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {tab === "faqs" ? "FAQs" : tab === "overview" ? "Product Showcase" : tab === "features2" ? "Feature Details" : tab}
                    </button>
                  ))}
                </div>

                {/* Hero Tab */}
                {ezyTab === "hero" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">English Hero Settings</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Hero Badge Title</label>
                          <Input value={ezyCheckoutEn.heroBadge} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, heroBadge: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Hero Main Title</label>
                          <Input value={ezyCheckoutEn.heroTitle} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, heroTitle: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Hero Subtitle</label>
                          <textarea
                            rows={3}
                            value={ezyCheckoutEn.heroSub}
                            onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, heroSub: e.target.value })}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Main CTA Button Text</label>
                            <Input value={ezyCheckoutEn.heroCtaText} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, heroCtaText: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Main CTA URL (Leave blank to trigger checkout popup)</label>
                            <Input value={ezyCheckoutEn.heroCtaUrl} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, heroCtaUrl: e.target.value })} placeholder="e.g. https://... or #checkout" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Sub CTA Button Text</label>
                            <Input value={ezyCheckoutEn.heroSubCtaText} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, heroSubCtaText: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Sub CTA URL (Leave blank to trigger checkout popup)</label>
                            <Input value={ezyCheckoutEn.heroSubCtaUrl} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, heroSubCtaUrl: e.target.value })} placeholder="e.g. https://... or #checkout" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Hero Preview Image URL</label>
                          <div className="flex gap-2">
                            <Input value={ezyCheckoutEn.heroImage} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, heroImage: e.target.value })} className="flex-1" />
                            <ImageUploader value={ezyCheckoutEn.heroImage} onChange={(val) => setEzyCheckoutEn({ ...ezyCheckoutEn, heroImage: val })} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">Bengali Hero Settings</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Hero Badge Title</label>
                          <Input value={ezyCheckoutBn.heroBadge} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, heroBadge: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Hero Main Title</label>
                          <Input value={ezyCheckoutBn.heroTitle} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, heroTitle: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Hero Subtitle</label>
                          <textarea
                            rows={3}
                            value={ezyCheckoutBn.heroSub}
                            onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, heroSub: e.target.value })}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Main CTA Button Text</label>
                            <Input value={ezyCheckoutBn.heroCtaText} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, heroCtaText: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Main CTA URL (Leave blank to trigger checkout popup)</label>
                            <Input value={ezyCheckoutBn.heroCtaUrl} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, heroCtaUrl: e.target.value })} placeholder="e.g. https://... or #checkout" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Sub CTA Button Text</label>
                            <Input value={ezyCheckoutBn.heroSubCtaText} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, heroSubCtaText: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Sub CTA URL (Leave blank to trigger checkout popup)</label>
                            <Input value={ezyCheckoutBn.heroSubCtaUrl} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, heroSubCtaUrl: e.target.value })} placeholder="e.g. https://... or #checkout" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Hero Preview Image URL</label>
                          <div className="flex gap-2">
                            <Input value={ezyCheckoutBn.heroImage} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, heroImage: e.target.value })} className="flex-1" />
                            <ImageUploader value={ezyCheckoutBn.heroImage} onChange={(val) => setEzyCheckoutBn({ ...ezyCheckoutBn, heroImage: val })} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features Tab */}
                {ezyTab === "features" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-b border-border pb-6">
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">English Feature Header</h4>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Features Badge</label>
                          <Input value={ezyCheckoutEn.featuresBadge} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, featuresBadge: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Section Main Title</label>
                          <Input value={ezyCheckoutEn.featuresTitle} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, featuresTitle: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Bengali Feature Header</h4>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Features Badge</label>
                          <Input value={ezyCheckoutBn.featuresBadge} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, featuresBadge: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Section Main Title</label>
                          <Input value={ezyCheckoutBn.featuresTitle} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, featuresTitle: e.target.value })} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white">Features List Builder</h3>
                        <Button
                          type="button"
                          onClick={() => {
                            const newEn = [...ezyCheckoutEn.featuresList, { title: "", desc: "", icon: "ShoppingBag" }];
                            const newBn = [...ezyCheckoutBn.featuresList, { title: "", desc: "", icon: "ShoppingBag" }];
                            setEzyCheckoutEn({ ...ezyCheckoutEn, featuresList: newEn });
                            setEzyCheckoutBn({ ...ezyCheckoutBn, featuresList: newBn });
                          }}
                          className="bg-primary text-white text-xs px-3 py-1.5 rounded-lg cursor-pointer"
                        >
                          + Add New Feature
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {ezyCheckoutEn.featuresList.map((item, idx) => (
                          <div key={idx} className="p-4 border border-border rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-primary">Feature #{idx + 1}</span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => {
                                    const listEn = [...ezyCheckoutEn.featuresList];
                                    const listBn = [...ezyCheckoutBn.featuresList];
                                    const tempEn = listEn[idx]; listEn[idx] = listEn[idx - 1]; listEn[idx - 1] = tempEn;
                                    const tempBn = listBn[idx]; listBn[idx] = listBn[idx - 1]; listBn[idx - 1] = tempBn;
                                    setEzyCheckoutEn({ ...ezyCheckoutEn, featuresList: listEn });
                                    setEzyCheckoutBn({ ...ezyCheckoutBn, featuresList: listBn });
                                  }}
                                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 cursor-pointer disabled:opacity-50 text-[10px]"
                                >
                                  ▲ Up
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === ezyCheckoutEn.featuresList.length - 1}
                                  onClick={() => {
                                    const listEn = [...ezyCheckoutEn.featuresList];
                                    const listBn = [...ezyCheckoutBn.featuresList];
                                    const tempEn = listEn[idx]; listEn[idx] = listEn[idx + 1]; listEn[idx + 1] = tempEn;
                                    const tempBn = listBn[idx]; listBn[idx] = listBn[idx + 1]; listBn[idx + 1] = tempBn;
                                    setEzyCheckoutEn({ ...ezyCheckoutEn, featuresList: listEn });
                                    setEzyCheckoutBn({ ...ezyCheckoutBn, featuresList: listBn });
                                  }}
                                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 cursor-pointer disabled:opacity-50 text-[10px]"
                                >
                                  ▼ Down
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const listEn = ezyCheckoutEn.featuresList.filter((_, i) => i !== idx);
                                    const listBn = ezyCheckoutBn.featuresList.filter((_, i) => i !== idx);
                                    setEzyCheckoutEn({ ...ezyCheckoutEn, featuresList: listEn });
                                    setEzyCheckoutBn({ ...ezyCheckoutBn, featuresList: listBn });
                                  }}
                                  className="p-1 rounded bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer text-[10px]"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-semibold text-slate-400">Lucide Icon Name</label>
                                <Dropdown
                                  value={item.icon || "ShoppingBag"}
                                  onChange={(val) => {
                                    const listEn = [...ezyCheckoutEn.featuresList];
                                    const listBn = [...ezyCheckoutBn.featuresList];
                                    listEn[idx].icon = val;
                                    listBn[idx].icon = val;
                                    setEzyCheckoutEn({ ...ezyCheckoutEn, featuresList: listEn });
                                    setEzyCheckoutBn({ ...ezyCheckoutBn, featuresList: listBn });
                                  }}
                                >
                                  <option value="ShoppingBag">ShoppingBag</option>
                                  <option value="Sparkles">Sparkles</option>
                                  <option value="ShieldCheck">ShieldCheck</option>
                                  <option value="Cpu">Cpu</option>
                                  <option value="Layers">Layers</option>
                                  <option value="Clock">Clock</option>
                                  <option value="Star">Star</option>
                                  <option value="HelpCircle">HelpCircle</option>
                                  <option value="Zap">Zap</option>
                                </Dropdown>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-semibold text-slate-400">English Title</label>
                                <Input
                                  value={item.title}
                                  onChange={(e) => {
                                    const list = [...ezyCheckoutEn.featuresList];
                                    list[idx].title = e.target.value;
                                    setEzyCheckoutEn({ ...ezyCheckoutEn, featuresList: list });
                                  }}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-semibold text-slate-400">Bengali Title</label>
                                <Input
                                  value={ezyCheckoutBn.featuresList[idx]?.title || ""}
                                  onChange={(e) => {
                                    const list = [...ezyCheckoutBn.featuresList];
                                    if (list[idx]) {
                                      list[idx].title = e.target.value;
                                      setEzyCheckoutBn({ ...ezyCheckoutBn, featuresList: list });
                                    }
                                  }}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-semibold text-slate-400">English Description</label>
                                <textarea
                                  rows={2}
                                  value={item.desc}
                                  onChange={(e) => {
                                    const list = [...ezyCheckoutEn.featuresList];
                                    list[idx].desc = e.target.value;
                                    setEzyCheckoutEn({ ...ezyCheckoutEn, featuresList: list });
                                  }}
                                  className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-semibold text-slate-400">Bengali Description</label>
                                <textarea
                                  rows={2}
                                  value={ezyCheckoutBn.featuresList[idx]?.desc || ""}
                                  onChange={(e) => {
                                    const list = [...ezyCheckoutBn.featuresList];
                                    if (list[idx]) {
                                      list[idx].desc = e.target.value;
                                      setEzyCheckoutBn({ ...ezyCheckoutBn, featuresList: list });
                                    }
                                  }}
                                  className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                  {/* Feature Details Tab */}
                {ezyTab === "features2" && (
                  <div className="space-y-12">
                    {/* Section 3: Popup Checkout */}
                    <div className="border border-border/60 dark:border-border/40 rounded-xl p-4 sm:p-6 bg-slate-50/30 dark:bg-slate-900/10 mb-6">
                      <button
                        type="button"
                        onClick={() => setShowcase1Expanded(!showcase1Expanded)}
                        className="w-full flex items-center justify-between font-black text-slate-800 dark:text-white border-b border-border pb-3 uppercase tracking-wider cursor-pointer hover:text-primary transition-colors text-left"
                      >
                        <span className="text-sm">Showcase Section 1</span>
                        {showcase1Expanded ? (
                          <ChevronDown className="w-5 h-5 text-slate-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-slate-500" />
                        )}
                      </button>
                      
                      {showcase1Expanded && (
                        <div className="mt-6 space-y-6">
                      
                      {/* Services section main header */}
                      <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl mb-6 border border-border/50">
                        <h5 className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wider">Section Title & Badge (Services)</h5>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h6 className="text-[10px] font-black text-slate-400 uppercase">English Header</h6>
                            <div className="space-y-2">
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Services Badge</label>
                                <Input value={ezyCheckoutEn.servicesBadge} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, servicesBadge: e.target.value })} placeholder="e.g. Services" />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Services Heading</label>
                                <Input value={ezyCheckoutEn.servicesTitle} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, servicesTitle: e.target.value })} placeholder="e.g. Premium services of our application" />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h6 className="text-[10px] font-black text-slate-400 uppercase">Bengali Header</h6>
                            <div className="space-y-2">
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Services Badge (Bengali)</label>
                                <Input value={ezyCheckoutBn.servicesBadge} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, servicesBadge: e.target.value })} placeholder="e.g. সার্ভিস সমূহ" />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Services Heading (Bengali)</label>
                                <Input value={ezyCheckoutBn.servicesTitle} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, servicesTitle: e.target.value })} placeholder="e.g. আমাদের অ্যাপ্লিকেশনের প্রিমিয়াম সার্ভিস সমূহ" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">English Details</h3>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Badge Title</label>
                              <Input value={ezyCheckoutEn.sec3Badge} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec3Badge: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Heading Title</label>
                              <Input value={ezyCheckoutEn.sec3Title} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec3Title: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Description</label>
                              <textarea
                                rows={3}
                                value={ezyCheckoutEn.sec3Desc}
                                onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec3Desc: e.target.value })}
                                className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature 1 Title</label>
                              <Input value={ezyCheckoutEn.sec3Feature1Title} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec3Feature1Title: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature 1 Description</label>
                              <Input value={ezyCheckoutEn.sec3Feature1Desc} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec3Feature1Desc: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature 2 Title</label>
                              <Input value={ezyCheckoutEn.sec3Feature2Title} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec3Feature2Title: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature 2 Description</label>
                              <Input value={ezyCheckoutEn.sec3Feature2Desc} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec3Feature2Desc: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">CTA Button Text</label>
                                <Input value={ezyCheckoutEn.sec3CtaText} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec3CtaText: e.target.value })} />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">CTA URL (Leave blank for checkout popup)</label>
                                <Input value={ezyCheckoutEn.sec3CtaUrl} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec3CtaUrl: e.target.value })} placeholder="e.g. https://..." />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Mockup Image</label>
                              <div className="flex gap-2">
                                <Input value={ezyCheckoutEn.sec3Image} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec3Image: e.target.value })} className="flex-1" />
                                <ImageUploader value={ezyCheckoutEn.sec3Image} onChange={(val) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec3Image: val })} />
                              </div>
                            </div>
                          </div>
                        </div>
 
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bengali Details</h3>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Badge Title</label>
                              <Input value={ezyCheckoutBn.sec3Badge} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec3Badge: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Heading Title</label>
                              <Input value={ezyCheckoutBn.sec3Title} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec3Title: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Description</label>
                              <textarea
                                rows={3}
                                value={ezyCheckoutBn.sec3Desc}
                                onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec3Desc: e.target.value })}
                                className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature 1 Title</label>
                              <Input value={ezyCheckoutBn.sec3Feature1Title} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec3Feature1Title: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature 1 Description</label>
                              <Input value={ezyCheckoutBn.sec3Feature1Desc} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec3Feature1Desc: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature 2 Title</label>
                              <Input value={ezyCheckoutBn.sec3Feature2Title} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec3Feature2Title: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature 2 Description</label>
                              <Input value={ezyCheckoutBn.sec3Feature2Desc} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec3Feature2Desc: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">CTA Button Text</label>
                                <Input value={ezyCheckoutBn.sec3CtaText} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec3CtaText: e.target.value })} />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">CTA URL (Leave blank for checkout popup)</label>
                                <Input value={ezyCheckoutBn.sec3CtaUrl} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec3CtaUrl: e.target.value })} placeholder="e.g. https://..." />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Mockup Image</label>
                              <div className="flex gap-2">
                                <Input value={ezyCheckoutBn.sec3Image} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec3Image: e.target.value })} className="flex-1" />
                                <ImageUploader value={ezyCheckoutBn.sec3Image} onChange={(val) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec3Image: val })} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                        </div>
                      )}
                    </div>
 
                    {/* Section 4: Project Management */}
                    <div className="border border-border/60 dark:border-border/40 rounded-xl p-4 sm:p-6 bg-slate-50/30 dark:bg-slate-900/10 mb-6">
                      <button
                        type="button"
                        onClick={() => setShowcase2Expanded(!showcase2Expanded)}
                        className="w-full flex items-center justify-between font-black text-slate-800 dark:text-white border-b border-border pb-3 uppercase tracking-wider cursor-pointer hover:text-primary transition-colors text-left"
                      >
                        <span className="text-sm">Showcase Section 2</span>
                        {showcase2Expanded ? (
                          <ChevronDown className="w-5 h-5 text-slate-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-slate-500" />
                        )}
                      </button>
                      
                      {showcase2Expanded && (
                        <div className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">English Details</h3>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Badge Title</label>
                              <Input value={ezyCheckoutEn.sec4Badge} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec4Badge: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Heading Title</label>
                              <Input value={ezyCheckoutEn.sec4Title} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec4Title: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Description</label>
                              <textarea
                                rows={3}
                                value={ezyCheckoutEn.sec4Desc}
                                onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec4Desc: e.target.value })}
                                className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature Point 1</label>
                              <Input value={ezyCheckoutEn.sec4Point1} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec4Point1: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature Point 2</label>
                              <Input value={ezyCheckoutEn.sec4Point2} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec4Point2: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature Point 3</label>
                              <Input value={ezyCheckoutEn.sec4Point3} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec4Point3: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">CTA Button Text</label>
                                <Input value={ezyCheckoutEn.sec4CtaText} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec4CtaText: e.target.value })} />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">CTA URL (Leave blank for checkout popup)</label>
                                <Input value={ezyCheckoutEn.sec4CtaUrl} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec4CtaUrl: e.target.value })} placeholder="e.g. https://..." />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Mockup Image</label>
                              <div className="flex gap-2">
                                <Input value={ezyCheckoutEn.sec4Image} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec4Image: e.target.value })} className="flex-1" />
                                <ImageUploader value={ezyCheckoutEn.sec4Image} onChange={(val) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec4Image: val })} />
                              </div>
                            </div>
                          </div>
                        </div>
 
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bengali Details</h3>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Badge Title</label>
                              <Input value={ezyCheckoutBn.sec4Badge} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec4Badge: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Heading Title</label>
                              <Input value={ezyCheckoutBn.sec4Title} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec4Title: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Description</label>
                              <textarea
                                rows={3}
                                value={ezyCheckoutBn.sec4Desc}
                                onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec4Desc: e.target.value })}
                                className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature Point 1</label>
                              <Input value={ezyCheckoutBn.sec4Point1} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec4Point1: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature Point 2</label>
                              <Input value={ezyCheckoutBn.sec4Point2} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec4Point2: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature Point 3</label>
                              <Input value={ezyCheckoutBn.sec4Point3} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec4Point3: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">CTA Button Text</label>
                                <Input value={ezyCheckoutBn.sec4CtaText} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec4CtaText: e.target.value })} />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">CTA URL (Leave blank for checkout popup)</label>
                                <Input value={ezyCheckoutBn.sec4CtaUrl} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec4CtaUrl: e.target.value })} placeholder="e.g. https://..." />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Mockup Image</label>
                              <div className="flex gap-2">
                                <Input value={ezyCheckoutBn.sec4Image} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec4Image: e.target.value })} className="flex-1" />
                                <ImageUploader value={ezyCheckoutBn.sec4Image} onChange={(val) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec4Image: val })} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                        </div>
                      )}
                    </div>
 
                    {/* Section 5: Transaction History */}
                    <div className="border border-border/60 dark:border-border/40 rounded-xl p-4 sm:p-6 bg-slate-50/30 dark:bg-slate-900/10 mb-6">
                      <button
                        type="button"
                        onClick={() => setShowcase3Expanded(!showcase3Expanded)}
                        className="w-full flex items-center justify-between font-black text-slate-800 dark:text-white border-b border-border pb-3 uppercase tracking-wider cursor-pointer hover:text-primary transition-colors text-left"
                      >
                        <span className="text-sm">Showcase Section 3</span>
                        {showcase3Expanded ? (
                          <ChevronDown className="w-5 h-5 text-slate-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-slate-500" />
                        )}
                      </button>
                      
                      {showcase3Expanded && (
                        <div className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">English Details</h3>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Badge Title</label>
                              <Input value={ezyCheckoutEn.sec5Badge} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec5Badge: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Heading Title</label>
                              <Input value={ezyCheckoutEn.sec5Title} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec5Title: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Description</label>
                              <textarea
                                rows={3}
                                value={ezyCheckoutEn.sec5Desc}
                                onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec5Desc: e.target.value })}
                                className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature Point 1</label>
                              <Input value={ezyCheckoutEn.sec5Point1} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec5Point1: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature Point 2</label>
                              <Input value={ezyCheckoutEn.sec5Point2} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec5Point2: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature Point 3</label>
                              <Input value={ezyCheckoutEn.sec5Point3} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec5Point3: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">CTA Button Text</label>
                                <Input value={ezyCheckoutEn.sec5CtaText} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec5CtaText: e.target.value })} />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">CTA URL (Leave blank for checkout popup)</label>
                                <Input value={ezyCheckoutEn.sec5CtaUrl} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec5CtaUrl: e.target.value })} placeholder="e.g. https://..." />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Mockup Image</label>
                              <div className="flex gap-2">
                                <Input value={ezyCheckoutEn.sec5Image} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec5Image: e.target.value })} className="flex-1" />
                                <ImageUploader value={ezyCheckoutEn.sec5Image} onChange={(val) => setEzyCheckoutEn({ ...ezyCheckoutEn, sec5Image: val })} />
                              </div>
                            </div>
                          </div>
                        </div>
 
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bengali Details</h3>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Badge Title</label>
                              <Input value={ezyCheckoutBn.sec5Badge} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec5Badge: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Heading Title</label>
                              <Input value={ezyCheckoutBn.sec5Title} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec5Title: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Description</label>
                              <textarea
                                rows={3}
                                value={ezyCheckoutBn.sec5Desc}
                                onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec5Desc: e.target.value })}
                                className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature Point 1</label>
                              <Input value={ezyCheckoutBn.sec5Point1} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec5Point1: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature Point 2</label>
                              <Input value={ezyCheckoutBn.sec5Point2} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec5Point2: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Feature Point 3</label>
                              <Input value={ezyCheckoutBn.sec5Point3} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec5Point3: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">CTA Button Text</label>
                                <Input value={ezyCheckoutBn.sec5CtaText} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec5CtaText: e.target.value })} />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">CTA URL (Leave blank for checkout popup)</label>
                                <Input value={ezyCheckoutBn.sec5CtaUrl} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec5CtaUrl: e.target.value })} placeholder="e.g. https://..." />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-slate-500">Mockup Image</label>
                              <div className="flex gap-2">
                                <Input value={ezyCheckoutBn.sec5Image} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec5Image: e.target.value })} className="flex-1" />
                                <ImageUploader value={ezyCheckoutBn.sec5Image} onChange={(val) => setEzyCheckoutBn({ ...ezyCheckoutBn, sec5Image: val })} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Overview Tab */}
                {ezyTab === "overview" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">English Overview Details</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Overview Badge Title</label>
                          <Input value={ezyCheckoutEn.aboutBadge} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, aboutBadge: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Overview Header Title</label>
                          <Input value={ezyCheckoutEn.aboutTitle} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, aboutTitle: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Preview Video/Image URL</label>
                          <div className="flex gap-2">
                            <Input value={ezyCheckoutEn.aboutImage} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, aboutImage: e.target.value })} className="flex-1" />
                            <ImageUploader value={ezyCheckoutEn.aboutImage} onChange={(val) => setEzyCheckoutEn({ ...ezyCheckoutEn, aboutImage: val })} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">Bengali Overview Details</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Overview Badge Title</label>
                          <Input value={ezyCheckoutBn.aboutBadge} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, aboutBadge: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Overview Header Title</label>
                          <Input value={ezyCheckoutBn.aboutTitle} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, aboutTitle: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Preview Video/Image URL</label>
                          <div className="flex gap-2">
                            <Input value={ezyCheckoutBn.aboutImage} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, aboutImage: e.target.value })} className="flex-1" />
                            <ImageUploader value={ezyCheckoutBn.aboutImage} onChange={(val) => setEzyCheckoutBn({ ...ezyCheckoutBn, aboutImage: val })} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pricing Tab */}
                {ezyTab === "pricing" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* English Pricing Settings */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">English Pricing Details</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pricing Title</label>
                          <Input value={ezyCheckoutEn.pricingTitle} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, pricingTitle: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pricing Subtitle</label>
                          <Input value={ezyCheckoutEn.pricingSub} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, pricingSub: e.target.value })} />
                        </div>
                        
                        <div className="border-t border-dashed border-border pt-3 mt-3">
                          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Free Version Card</h4>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Free Plan Name</label>
                          <Input value={ezyCheckoutEn.planFree} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, planFree: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Free Plan Description</label>
                          <textarea
                            rows={2}
                            value={ezyCheckoutEn.planFreeDesc}
                            onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, planFreeDesc: e.target.value })}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Free Price</label>
                            <Input value={ezyCheckoutEn.freePrice} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, freePrice: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Free Period (e.g. Lifetime)</label>
                            <Input value={ezyCheckoutEn.freeLifetime} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, freeLifetime: e.target.value })} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Free Feature 1</label>
                          <Input value={ezyCheckoutEn.freeFeature1} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, freeFeature1: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Free Feature 2</label>
                          <Input value={ezyCheckoutEn.freeFeature2} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, freeFeature2: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Free Feature 3</label>
                          <Input value={ezyCheckoutEn.freeFeature3} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, freeFeature3: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Free Button Text</label>
                          <Input value={ezyCheckoutEn.downloadNow} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, downloadNow: e.target.value })} />
                        </div>

                        <div className="border-t border-dashed border-border pt-3 mt-3">
                          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Pro Version Card</h4>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Plan Name</label>
                          <Input value={ezyCheckoutEn.planPro} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, planPro: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Plan Description</label>
                          <textarea
                            rows={2}
                            value={ezyCheckoutEn.planProDesc}
                            onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, planProDesc: e.target.value })}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Pro Price</label>
                            <Input value={ezyCheckoutEn.proPrice} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, proPrice: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Pro Period (e.g. Lifetime)</label>
                            <Input value={ezyCheckoutEn.proLifetime} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, proLifetime: e.target.value })} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Feature 1</label>
                          <Input value={ezyCheckoutEn.proFeature1} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, proFeature1: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Feature 2</label>
                          <Input value={ezyCheckoutEn.proFeature2} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, proFeature2: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Feature 3</label>
                          <Input value={ezyCheckoutEn.proFeature3} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, proFeature3: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Feature 4</label>
                          <Input value={ezyCheckoutEn.proFeature4} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, proFeature4: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Button Text</label>
                          <Input value={ezyCheckoutEn.getPro} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, getPro: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Recommended Tag</label>
                          <Input value={ezyCheckoutEn.recTag} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, recTag: e.target.value })} />
                        </div>
                      </div>
                    </div>

                    {/* Bengali Pricing Settings */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">Bengali Pricing Details</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pricing Title</label>
                          <Input value={ezyCheckoutBn.pricingTitle} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, pricingTitle: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pricing Subtitle</label>
                          <Input value={ezyCheckoutBn.pricingSub} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, pricingSub: e.target.value })} />
                        </div>
                        
                        <div className="border-t border-dashed border-border pt-3 mt-3">
                          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Free Version Card</h4>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Free Plan Name</label>
                          <Input value={ezyCheckoutBn.planFree} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, planFree: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Free Plan Description</label>
                          <textarea
                            rows={2}
                            value={ezyCheckoutBn.planFreeDesc}
                            onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, planFreeDesc: e.target.value })}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Free Price</label>
                            <Input value={ezyCheckoutBn.freePrice} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, freePrice: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Free Period (e.g. আজীবন)</label>
                            <Input value={ezyCheckoutBn.freeLifetime} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, freeLifetime: e.target.value })} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Free Feature 1</label>
                          <Input value={ezyCheckoutBn.freeFeature1} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, freeFeature1: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Free Feature 2</label>
                          <Input value={ezyCheckoutBn.freeFeature2} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, freeFeature2: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Free Feature 3</label>
                          <Input value={ezyCheckoutBn.freeFeature3} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, freeFeature3: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Free Button Text</label>
                          <Input value={ezyCheckoutBn.downloadNow} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, downloadNow: e.target.value })} />
                        </div>

                        <div className="border-t border-dashed border-border pt-3 mt-3">
                          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Pro Version Card</h4>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Plan Name</label>
                          <Input value={ezyCheckoutBn.planPro} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, planPro: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Plan Description</label>
                          <textarea
                            rows={2}
                            value={ezyCheckoutBn.planProDesc}
                            onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, planProDesc: e.target.value })}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Pro Price</label>
                            <Input value={ezyCheckoutBn.proPrice} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, proPrice: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Pro Period (e.g. আজীবন (৩টি সাইট))</label>
                            <Input value={ezyCheckoutBn.proLifetime} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, proLifetime: e.target.value })} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Feature 1</label>
                          <Input value={ezyCheckoutBn.proFeature1} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, proFeature1: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Feature 2</label>
                          <Input value={ezyCheckoutBn.proFeature2} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, proFeature2: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Feature 3</label>
                          <Input value={ezyCheckoutBn.proFeature3} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, proFeature3: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Feature 4</label>
                          <Input value={ezyCheckoutBn.proFeature4} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, proFeature4: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Button Text</label>
                          <Input value={ezyCheckoutBn.getPro} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, getPro: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500">Pro Recommended Tag</label>
                          <Input value={ezyCheckoutBn.recTag} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, recTag: e.target.value })} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* FAQs Tab */}
                {ezyTab === "faqs" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-b border-border pb-6">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">English FAQs Title</label>
                        <Input value={ezyCheckoutEn.faqTitle} onChange={(e) => setEzyCheckoutEn({ ...ezyCheckoutEn, faqTitle: e.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Bengali FAQs Title</label>
                        <Input value={ezyCheckoutBn.faqTitle} onChange={(e) => setEzyCheckoutBn({ ...ezyCheckoutBn, faqTitle: e.target.value })} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white">FAQs List Builder</h3>
                        <Button
                          type="button"
                          onClick={() => {
                            const newEn = [...ezyCheckoutEn.faqsList, { q: "", a: "" }];
                            const newBn = [...ezyCheckoutBn.faqsList, { q: "", a: "" }];
                            setEzyCheckoutEn({ ...ezyCheckoutEn, faqsList: newEn });
                            setEzyCheckoutBn({ ...ezyCheckoutBn, faqsList: newBn });
                          }}
                          className="bg-primary text-white text-xs px-3 py-1.5 rounded-lg cursor-pointer"
                        >
                          + Add New FAQ
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {ezyCheckoutEn.faqsList.map((item, idx) => (
                          <div key={idx} className="p-4 border border-border rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
                            <div className="flex justify-between items-center border-b border-border/60 pb-2">
                              <span className="text-xs font-bold text-primary">FAQ Item #{idx + 1}</span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => {
                                    const listEn = [...ezyCheckoutEn.faqsList];
                                    const listBn = [...ezyCheckoutBn.faqsList];
                                    const tempEn = listEn[idx]; listEn[idx] = listEn[idx - 1]; listEn[idx - 1] = tempEn;
                                    const tempBn = listBn[idx]; listBn[idx] = listBn[idx - 1]; listBn[idx - 1] = tempBn;
                                    setEzyCheckoutEn({ ...ezyCheckoutEn, faqsList: listEn });
                                    setEzyCheckoutBn({ ...ezyCheckoutBn, faqsList: listBn });
                                  }}
                                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 cursor-pointer disabled:opacity-50 text-[10px]"
                                >
                                  ▲ Up
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === ezyCheckoutEn.faqsList.length - 1}
                                  onClick={() => {
                                    const listEn = [...ezyCheckoutEn.faqsList];
                                    const listBn = [...ezyCheckoutBn.faqsList];
                                    const tempEn = listEn[idx]; listEn[idx] = listEn[idx + 1]; listEn[idx + 1] = tempEn;
                                    const tempBn = listBn[idx]; listBn[idx] = listBn[idx + 1]; listBn[idx + 1] = tempBn;
                                    setEzyCheckoutEn({ ...ezyCheckoutEn, faqsList: listEn });
                                    setEzyCheckoutBn({ ...ezyCheckoutBn, faqsList: listBn });
                                  }}
                                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 cursor-pointer disabled:opacity-50 text-[10px]"
                                >
                                  ▼ Down
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const listEn = ezyCheckoutEn.faqsList.filter((_, i) => i !== idx);
                                    const listBn = ezyCheckoutBn.faqsList.filter((_, i) => i !== idx);
                                    setEzyCheckoutEn({ ...ezyCheckoutEn, faqsList: listEn });
                                    setEzyCheckoutBn({ ...ezyCheckoutBn, faqsList: listBn });
                                  }}
                                  className="p-1 rounded bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer text-[10px]"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-semibold text-slate-400">English Question</label>
                                  <Input
                                    value={item.q}
                                    onChange={(e) => {
                                      const list = [...ezyCheckoutEn.faqsList];
                                      list[idx].q = e.target.value;
                                      setEzyCheckoutEn({ ...ezyCheckoutEn, faqsList: list });
                                    }}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-semibold text-slate-400">English Answer</label>
                                  <textarea
                                    rows={3}
                                    value={item.a}
                                    onChange={(e) => {
                                      const list = [...ezyCheckoutEn.faqsList];
                                      list[idx].a = e.target.value;
                                      setEzyCheckoutEn({ ...ezyCheckoutEn, faqsList: list });
                                    }}
                                    className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-semibold text-slate-400">Bengali Question</label>
                                  <Input
                                    value={ezyCheckoutBn.faqsList[idx]?.q || ""}
                                    onChange={(e) => {
                                      const list = [...ezyCheckoutBn.faqsList];
                                      if (list[idx]) {
                                        list[idx].q = e.target.value;
                                        setEzyCheckoutBn({ ...ezyCheckoutBn, faqsList: list });
                                      }
                                    }}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-semibold text-slate-400">Bengali Answer</label>
                                  <textarea
                                    rows={3}
                                    value={ezyCheckoutBn.faqsList[idx]?.a || ""}
                                    onChange={(e) => {
                                      const list = [...ezyCheckoutBn.faqsList];
                                      if (list[idx]) {
                                        list[idx].a = e.target.value;
                                        setEzyCheckoutBn({ ...ezyCheckoutBn, faqsList: list });
                                      }
                                    }}
                                    className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : selectedKey === "about" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* English About Fields */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">English Content</h3>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Hero Title</label>
                    <Input value={aboutEn.title} onChange={(e) => setAboutEn({ ...aboutEn, title: e.target.value })} />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Hero Subtitle</label>
                    <textarea
                      rows={2}
                      value={aboutEn.subtitle}
                      onChange={(e) => setAboutEn({ ...aboutEn, subtitle: e.target.value })}
                      className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Who We Are Body</label>
                    <textarea
                      rows={6}
                      value={aboutEn.ourStoryBody}
                      onChange={(e) => setAboutEn({ ...aboutEn, ourStoryBody: e.target.value })}
                      className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Who We Are Graphic Image</label>
                    <div className="flex gap-2 items-center">
                      <Input value={aboutEn.whoWeAreImg} onChange={(e) => setAboutEn({ ...aboutEn, whoWeAreImg: e.target.value })} className="flex-1" />
                      <ImageUploader value={aboutEn.whoWeAreImg} onChange={(val) => setAboutEn({ ...aboutEn, whoWeAreImg: val })} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Our Goal Body</label>
                    <textarea
                      rows={6}
                      value={aboutEn.ourGoalBody}
                      onChange={(e) => setAboutEn({ ...aboutEn, ourGoalBody: e.target.value })}
                      className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Our Goal Graphic Image</label>
                    <div className="flex gap-2 items-center">
                      <Input value={aboutEn.ourGoalImg} onChange={(e) => setAboutEn({ ...aboutEn, ourGoalImg: e.target.value })} className="flex-1" />
                      <ImageUploader value={aboutEn.ourGoalImg} onChange={(val) => setAboutEn({ ...aboutEn, ourGoalImg: val })} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Journey Section Subtitle</label>
                    <Input value={aboutEn.journeySubtitle} onChange={(e) => setAboutEn({ ...aboutEn, journeySubtitle: e.target.value })} />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-border pb-1">
                      <label className="text-xs font-bold text-slate-700">Journey Milestones</label>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setAboutEn({
                          ...aboutEn,
                          journeyMilestones: [...(aboutEn.journeyMilestones || []), { year: "", title: "", desc: "" }]
                        })}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white h-7 text-xs font-bold cursor-pointer"
                      >
                        + Add Milestone
                      </Button>
                    </div>

                    {(aboutEn.journeyMilestones || []).map((m, idx) => (
                      <div key={idx} className="border border-dashed border-border/80 rounded-xl p-4 space-y-3 relative bg-slate-50/50">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            const list = [...aboutEn.journeyMilestones];
                            list.splice(idx, 1);
                            setAboutEn({ ...aboutEn, journeyMilestones: list });
                          }}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0 rounded-full cursor-pointer"
                        >
                          ✕
                        </Button>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] font-semibold text-slate-500">Year</label>
                            <Input
                              value={m.year}
                              onChange={(e) => {
                                const list = [...aboutEn.journeyMilestones];
                                list[idx] = { ...list[idx], year: e.target.value };
                                setAboutEn({ ...aboutEn, journeyMilestones: list });
                              }}
                              placeholder="e.g. 2026"
                            />
                          </div>
                          <div className="space-y-1 col-span-2">
                            <label className="text-[10px] font-semibold text-slate-500">Title</label>
                            <Input
                              value={m.title}
                              onChange={(e) => {
                                const list = [...aboutEn.journeyMilestones];
                                list[idx] = { ...list[idx], title: e.target.value };
                                setAboutEn({ ...aboutEn, journeyMilestones: list });
                              }}
                              placeholder="AI integrations"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-slate-500">Description</label>
                          <textarea
                            rows={2}
                            value={m.desc}
                            onChange={(e) => {
                              const list = [...aboutEn.journeyMilestones];
                              list[idx] = { ...list[idx], desc: e.target.value };
                              setAboutEn({ ...aboutEn, journeyMilestones: list });
                            }}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none resize-none"
                            placeholder="Milestone description..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">At a Glance Subtitle</label>
                    <textarea
                      rows={3}
                      value={aboutEn.atGlanceSub}
                      onChange={(e) => setAboutEn({ ...aboutEn, atGlanceSub: e.target.value })}
                      className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                    />
                  </div>

                  <div className="border border-dashed border-border/80 rounded-xl p-4 space-y-4">
                    <h4 className="text-xs font-bold text-slate-600 uppercase">Office Collage Photos</h4>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-500">Main Office Image</label>
                      <div className="flex gap-2 items-center">
                        <Input value={aboutEn.officeImgMain} onChange={(e) => setAboutEn({ ...aboutEn, officeImgMain: e.target.value })} className="flex-1" />
                        <ImageUploader value={aboutEn.officeImgMain} onChange={(val) => setAboutEn({ ...aboutEn, officeImgMain: val })} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-500">Floating Image 1 (Work Collaboration)</label>
                      <div className="flex gap-2 items-center">
                        <Input value={aboutEn.officeImgSub1} onChange={(e) => setAboutEn({ ...aboutEn, officeImgSub1: e.target.value })} className="flex-1" />
                        <ImageUploader value={aboutEn.officeImgSub1} onChange={(val) => setAboutEn({ ...aboutEn, officeImgSub1: val })} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-500">Floating Image 2 (Office Recreation)</label>
                      <div className="flex gap-2 items-center">
                        <Input value={aboutEn.officeImgSub2} onChange={(e) => setAboutEn({ ...aboutEn, officeImgSub2: e.target.value })} className="flex-1" />
                        <ImageUploader value={aboutEn.officeImgSub2} onChange={(val) => setAboutEn({ ...aboutEn, officeImgSub2: val })} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bengali About Fields */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-border pb-2">Bengali Content</h3>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Hero Title</label>
                    <Input value={aboutBn.title} onChange={(e) => setAboutBn({ ...aboutBn, title: e.target.value })} />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Hero Subtitle</label>
                    <textarea
                      rows={2}
                      value={aboutBn.subtitle}
                      onChange={(e) => setAboutBn({ ...aboutBn, subtitle: e.target.value })}
                      className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Who We Are Body</label>
                    <textarea
                      rows={6}
                      value={aboutBn.ourStoryBody}
                      onChange={(e) => setAboutBn({ ...aboutBn, ourStoryBody: e.target.value })}
                      className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Who We Are Graphic Image</label>
                    <div className="flex gap-2 items-center">
                      <Input value={aboutBn.whoWeAreImg} onChange={(e) => setAboutBn({ ...aboutBn, whoWeAreImg: e.target.value })} className="flex-1" />
                      <ImageUploader value={aboutBn.whoWeAreImg} onChange={(val) => setAboutBn({ ...aboutBn, whoWeAreImg: val })} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Our Goal Body</label>
                    <textarea
                      rows={6}
                      value={aboutBn.ourGoalBody}
                      onChange={(e) => setAboutBn({ ...aboutBn, ourGoalBody: e.target.value })}
                      className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Our Goal Graphic Image</label>
                    <div className="flex gap-2 items-center">
                      <Input value={aboutBn.ourGoalImg} onChange={(e) => setAboutBn({ ...aboutBn, ourGoalImg: e.target.value })} className="flex-1" />
                      <ImageUploader value={aboutBn.ourGoalImg} onChange={(val) => setAboutBn({ ...aboutBn, ourGoalImg: val })} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Journey Section Subtitle</label>
                    <Input value={aboutBn.journeySubtitle} onChange={(e) => setAboutBn({ ...aboutBn, journeySubtitle: e.target.value })} />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-border pb-1">
                      <label className="text-xs font-bold text-slate-700">Journey Milestones</label>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setAboutBn({
                          ...aboutBn,
                          journeyMilestones: [...(aboutBn.journeyMilestones || []), { year: "", title: "", desc: "" }]
                        })}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white h-7 text-xs font-bold cursor-pointer"
                      >
                        + Add Milestone
                      </Button>
                    </div>

                    {(aboutBn.journeyMilestones || []).map((m, idx) => (
                      <div key={idx} className="border border-dashed border-border/80 rounded-xl p-4 space-y-3 relative bg-slate-50/50">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            const list = [...aboutBn.journeyMilestones];
                            list.splice(idx, 1);
                            setAboutBn({ ...aboutBn, journeyMilestones: list });
                          }}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0 rounded-full cursor-pointer"
                        >
                          ✕
                        </Button>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] font-semibold text-slate-500">Year</label>
                            <Input
                              value={m.year}
                              onChange={(e) => {
                                const list = [...aboutBn.journeyMilestones];
                                list[idx] = { ...list[idx], year: e.target.value };
                                setAboutBn({ ...aboutBn, journeyMilestones: list });
                              }}
                              placeholder="e.g. ২০২৩"
                            />
                          </div>
                          <div className="space-y-1 col-span-2">
                            <label className="text-[10px] font-semibold text-slate-500">Title</label>
                            <Input
                              value={m.title}
                              onChange={(e) => {
                                const list = [...aboutBn.journeyMilestones];
                                list[idx] = { ...list[idx], title: e.target.value };
                                setAboutBn({ ...aboutBn, journeyMilestones: list });
                              }}
                              placeholder="এআই ইন্টিগ্রেশন"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-slate-500">Description</label>
                          <textarea
                            rows={2}
                            value={m.desc}
                            onChange={(e) => {
                              const list = [...aboutBn.journeyMilestones];
                              list[idx] = { ...list[idx], desc: e.target.value };
                              setAboutBn({ ...aboutBn, journeyMilestones: list });
                            }}
                            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none resize-none"
                            placeholder="Milestone description..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border border-dashed border-border/80 rounded-xl p-4 space-y-4">
                    <h4 className="text-xs font-bold text-slate-600 uppercase">Office Collage Photos</h4>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-500">Main Office Image</label>
                      <div className="flex gap-2 items-center">
                        <Input value={aboutBn.officeImgMain} onChange={(e) => setAboutBn({ ...aboutBn, officeImgMain: e.target.value })} className="flex-1" />
                        <ImageUploader value={aboutBn.officeImgMain} onChange={(val) => setAboutBn({ ...aboutBn, officeImgMain: val })} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-500">Floating Image 1 (Work Collaboration)</label>
                      <div className="flex gap-2 items-center">
                        <Input value={aboutBn.officeImgSub1} onChange={(e) => setAboutBn({ ...aboutBn, officeImgSub1: e.target.value })} className="flex-1" />
                        <ImageUploader value={aboutBn.officeImgSub1} onChange={(val) => setAboutBn({ ...aboutBn, officeImgSub1: val })} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-500">Floating Image 2 (Office Recreation)</label>
                      <div className="flex gap-2 items-center">
                        <Input value={aboutBn.officeImgSub2} onChange={(e) => setAboutBn({ ...aboutBn, officeImgSub2: e.target.value })} className="flex-1" />
                        <ImageUploader value={aboutBn.officeImgSub2} onChange={(val) => setAboutBn({ ...aboutBn, officeImgSub2: val })} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedKey === "home_solutions" ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">Solutions Grid ({solutions.length} items)</h3>
                    <p className="text-xs text-slate-500 mt-1">Add, delete, re-order, and customize the solutions displayed on your homepage.</p>
                  </div>
                  <Button type="button" onClick={addSolution} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 rounded-xl">
                    <Plus className="w-4 h-4" /> Add New Solution
                  </Button>
                </div>

                <div className="space-y-6">
                  {solutions.map((sol, index) => (
                    <div key={index} className="p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl relative space-y-4">
                      {/* Header with action buttons */}
                      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800/80 pb-3">
                        <span className="text-xs font-bold text-slate-400">Solution #{index + 1}: <strong className="text-slate-700 dark:text-slate-200 ml-1">{sol.name || "Untitled"}</strong></span>
                        <div className="flex gap-2">
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            disabled={index === 0} 
                            onClick={() => moveSolution(index, "up")}
                            className="h-8 w-8 p-0 cursor-pointer"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            disabled={index === solutions.length - 1} 
                            onClick={() => moveSolution(index, "down")}
                            className="h-8 w-8 p-0 cursor-pointer"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                          <Button 
                            type="button" 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => removeSolution(index)}
                            className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 font-bold h-8 px-3 rounded-xl flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </Button>
                        </div>
                      </div>

                      {/* Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500">Solution Name</label>
                          <Input 
                            value={sol.name} 
                            onChange={(e) => {
                              const list = [...solutions];
                              list[index].name = e.target.value;
                              setSolutions(list);
                            }} 
                            placeholder="e.g. WP User Frontend"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500">Color Tailwind CSS Classes</label>
                          <Input 
                            value={sol.color} 
                            onChange={(e) => {
                              const list = [...solutions];
                              list[index].color = e.target.value;
                              setSolutions(list);
                            }} 
                            placeholder="e.g. text-[#00a884] hover:text-[#008c6e]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500">Learn More Redirect URL</label>
                          <Input 
                            value={sol.learnMoreUrl} 
                            onChange={(e) => {
                              const list = [...solutions];
                              list[index].learnMoreUrl = e.target.value;
                              setSolutions(list);
                            }} 
                            placeholder="e.g. /services"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500">Logo Image URL</label>
                        <div className="flex gap-2 items-center">
                          <Input 
                            value={sol.logoUrl} 
                            onChange={(e) => {
                              const list = [...solutions];
                              list[index].logoUrl = e.target.value;
                              setSolutions(list);
                            }} 
                            placeholder="e.g. /user-frontend-logo.svg" 
                            className="flex-1"
                          />
                          <ImageUploader 
                            value={sol.logoUrl} 
                            onChange={(val) => {
                              const list = [...solutions];
                              list[index].logoUrl = val;
                              setSolutions(list);
                            }} 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500">Description (English)</label>
                          <textarea
                            rows={2}
                            value={sol.descEn}
                            onChange={(e) => {
                              const list = [...solutions];
                              list[index].descEn = e.target.value;
                              setSolutions(list);
                            }}
                            className="flex min-h-[60px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                            placeholder="Ultimate Frontend Solution for WordPress"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500">Description (Bengali)</label>
                          <textarea
                            rows={2}
                            value={sol.descBn}
                            onChange={(e) => {
                              const list = [...solutions];
                              list[index].descBn = e.target.value;
                              setSolutions(list);
                            }}
                            className="flex min-h-[60px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                            placeholder="ওয়ার্ডপ্রেসের জন্য সেরা ফ্রন্টএন্ড সমাধান"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {solutions.length === 0 && (
                  <div className="p-8 text-center border border-dashed border-border rounded-3xl text-slate-500">
                    No solutions configured. Click "Add New Solution" to start.
                  </div>
                )}
              </div>
            ) : selectedKey === "home_at_glance" ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">At A Glance Stats Grid ({atGlance.length} items)</h3>
                    <p className="text-xs text-slate-500 mt-1">Add, delete, re-order, and customize the counters displayed on your homepage & about page.</p>
                  </div>
                  <Button type="button" onClick={addAtGlance} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 rounded-xl">
                    <Plus className="w-4 h-4" /> Add New Stat
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {atGlance.map((item, index) => (
                    <div key={index} className="p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl relative space-y-4">
                      {/* Header with action buttons */}
                      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800/80 pb-3">
                        <span className="text-xs font-bold text-slate-400">Stat #{index + 1}: <strong className="text-slate-700 dark:text-slate-200 ml-1">{item.lblEn || "Untitled"}</strong></span>
                        <div className="flex gap-2">
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            disabled={index === 0} 
                            onClick={() => moveAtGlance(index, "up")}
                            className="h-8 w-8 p-0 cursor-pointer"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            disabled={index === atGlance.length - 1} 
                            onClick={() => moveAtGlance(index, "down")}
                            className="h-8 w-8 p-0 cursor-pointer"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                          <Button 
                            type="button" 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => removeAtGlance(index)}
                            className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 font-bold h-8 px-3 rounded-xl flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </Button>
                        </div>
                      </div>

                      {/* Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500">Value (English)</label>
                          <Input 
                            value={item.valEn} 
                            onChange={(e) => {
                              const list = [...atGlance];
                              list[index].valEn = e.target.value;
                              setAtGlance(list);
                            }} 
                            placeholder="e.g. 98+"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500">Value (Bengali)</label>
                          <Input 
                            value={item.valBn} 
                            onChange={(e) => {
                              const list = [...atGlance];
                              list[index].valBn = e.target.value;
                              setAtGlance(list);
                            }} 
                            placeholder="e.g. ৯৮+"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500">Label (English)</label>
                          <Input 
                            value={item.lblEn} 
                            onChange={(e) => {
                              const list = [...atGlance];
                              list[index].lblEn = e.target.value;
                              setAtGlance(list);
                            }} 
                            placeholder="e.g. Team Members"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500">Label (Bengali)</label>
                          <Input 
                            value={item.lblBn} 
                            onChange={(e) => {
                              const list = [...atGlance];
                              list[index].lblBn = e.target.value;
                              setAtGlance(list);
                            }} 
                            placeholder="e.g. টিম মেম্বার"
                          />
                        </div>
                      </div>

                      <Dropdown
                        label="Lucide Icon"
                        value={item.icon}
                        onChange={(val) => {
                          const list = [...atGlance];
                          list[index].icon = val;
                          setAtGlance(list);
                        }}
                      >
                        <option value="Users">Users (Team Members)</option>
                        <option value="Puzzle">Puzzle (Amazing Products)</option>
                        <option value="Download">Download (Free Downloads)</option>
                        <option value="Smile">Smile (Happy Customers)</option>
                        <option value="Globe">Globe (Countries Worldwide)</option>
                        <option value="Award">Award (Years of Journey)</option>
                        <option value="Code">Code</option>
                        <option value="Sparkles">Sparkles</option>
                        <option value="TrendingUp">Trending Up</option>
                      </Dropdown>
                    </div>
                  ))}
                </div>

                {atGlance.length === 0 && (
                  <div className="p-8 text-center border border-dashed border-border rounded-3xl text-slate-500">
                    No stats configured. Click "Add New Stat" to start.
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* English Markdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">English Content (Markdown)</label>
                  <textarea
                    required
                    rows={15}
                    value={contentEn}
                    onChange={(e) => setContentEn(e.target.value)}
                    placeholder="English page content here..."
                    className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y font-mono"
                  />
                </div>

                {/* Bengali Markdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Bengali Content (Markdown)</label>
                  <textarea
                    required
                    rows={15}
                    value={contentBn}
                    onChange={(e) => setContentBn(e.target.value)}
                    placeholder="Bengali page content here..."
                    className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y font-mono"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end border-t border-slate-200 dark:border-slate-800 pt-4">
              <Button type="button" variant="outline" onClick={() => setSelectedKey(null)} className="cursor-pointer">
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-[#e8000e] hover:bg-[#e8000e]/90 text-white font-bold cursor-pointer">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Content"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Pages Cards Grid */}
      {loading ? (
        <div className="p-12 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        </div>
      ) : pages.length === 0 ? (
        <div className="p-12 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl">
          <FileText className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
          No pages seeded. Go to Dashboard and click "Populate Seed Data" to initialize.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pages.map((page) => (
            <div key={page._id} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-xs flex flex-col justify-between group hover:border-red-600/30 transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{getPageTitle(page.key)}</h3>
                {page.key === "contact_info" ? (
                  <p className="text-xs text-slate-400 line-clamp-3 mb-6">
                    Dynamic phone, email, working hours, and address metadata settings.
                  </p>
                ) : page.key === "bkash_settings" ? (
                  <p className="text-xs text-slate-400 line-clamp-3 mb-6">
                    Manage Merchant credentials, keys, app secrets, and target API endpoint environments for bKash.
                  </p>
                ) : page.key === "gtm_settings" ? (
                  <p className="text-xs text-slate-400 line-clamp-3 mb-6">
                    Configure Google Tag Manager (GTM) Container ID and toggle tracking script insertion.
                  </p>
                ) : page.key === "clarity_settings" ? (
                  <p className="text-xs text-slate-400 line-clamp-3 mb-6">
                    Configure Microsoft Clarity Project ID and toggle visitor session recording.
                  </p>
                ) : page.key === "elevenlabs_settings" ? (
                  <p className="text-xs text-slate-400 line-clamp-3 mb-6">
                    Configure ElevenLabs Agent ID and toggle the floating Conversational AI voice widget.
                  </p>
                ) : page.key === "smtp_settings" ? (
                  <p className="text-xs text-slate-400 line-clamp-3 mb-6">
                    Configure your outgoing mail server (SMTP), port, credentials, and default sender/recipient settings for transactional emails.
                  </p>
                ) : page.key === "ezy_checkout" ? (
                  <p className="text-xs text-slate-400 line-clamp-3 mb-6">
                    Manage the Ezy Checkout landing page pricing text, pricing plans details, and feature lists.
                  </p>
                ) : page.key === "ezycom" ? (
                  <p className="text-xs text-slate-400 line-clamp-3 mb-6">
                    Manage the EzyCom landing page hero section, sticky navigation labels, ticker subjects, demos, and comparison table.
                  </p>
                ) : page.key === "home_solutions" ? (
                  <p className="text-xs text-slate-400 line-clamp-3 mb-6">
                    List of solutions displayed on the homepage with custom icons, color tags, links, and titles.
                  </p>
                ) : page.key === "home_at_glance" ? (
                  <p className="text-xs text-slate-400 line-clamp-3 mb-6">
                    Key performance metrics and business stats displayed in the "At A Glance" section on the homepage and about page.
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 line-clamp-3 mb-6">
                    {page.content.en}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <Button onClick={() => handleEdit(page)} className="w-full bg-slate-100 hover:bg-[#e8000e] text-slate-800 hover:text-white dark:bg-slate-800 dark:text-slate-200 font-bold transition-all duration-300 cursor-pointer">
                  Edit Content
                </Button>
                <div className="flex gap-2">
                  {isLandingPage(page) && (
                    <Button
                      onClick={() => handleDuplicate(page)}
                      className="flex-1 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white font-bold transition-all duration-300 cursor-pointer"
                    >
                      Duplicate
                    </Button>
                  )}
                  {!["ezy_checkout", "ezycom", "about", "terms", "privacy", "contact_info", "bkash_settings", "smtp_settings", "home_solutions", "home_at_glance", "offer_popup", "home_consulting_cta", "gtm_settings", "clarity_settings", "elevenlabs_settings"].includes(page.key) && (
                    <Button
                      onClick={() => handleDelete(page)}
                      className="flex-1 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white font-bold transition-all duration-300 cursor-pointer"
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Duplicate Dialog */}
      <Dialog open={!!duplicateTarget} onOpenChange={(open) => { if (!open) setDuplicateTarget(null); }}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl p-6 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Duplicate Landing Page</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500">New URL Slug / Key</label>
              <Input
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="e.g. ezy-checkout-offer"
                className="w-full text-sm"
              />
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Only alphanumeric characters, hyphens, and underscores are allowed.
              </p>
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button variant="ghost" onClick={() => setDuplicateTarget(null)} className="cursor-pointer font-bold text-xs bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100">
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!duplicateTarget) return;
                const newKey = newSlug.trim();
                if (!newKey) return;

                const keyRegex = /^[a-z0-9-_]+$/i;
                if (!keyRegex.test(newKey)) {
                  alert("Invalid key format. Only alphanumeric characters, hyphens, and underscores are allowed.");
                  return;
                }

                const CORE_PAGES = ["ezy_checkout", "ezycom", "about", "terms", "privacy", "contact_info", "bkash_settings", "smtp_settings", "home_solutions", "home_at_glance", "offer_popup", "gtm_settings", "clarity_settings", "elevenlabs_settings"];
                if (CORE_PAGES.includes(newKey.toLowerCase())) {
                  alert("This key is reserved for system pages. Please choose a different key.");
                  return;
                }

                setSaving(true);
                try {
                  const res = await fetch("/api/admin/pages", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      key: newKey.toLowerCase(),
                      content: {
                        en: duplicateTarget.content.en,
                        bn: duplicateTarget.content.bn
                      }
                    })
                  });

                  const data = await res.json();
                  if (!res.ok) {
                    throw new Error(data.error || "Failed to duplicate page");
                  }

                  setSuccess(`Page duplicated successfully as "${newKey.toLowerCase()}"!`);
                  setDuplicateTarget(null);
                  setNewSlug("");
                  fetchPages();
                  setTimeout(() => setSuccess(""), 3000);
                } catch (err: any) {
                  setError(err.message);
                  setTimeout(() => setError(""), 4000);
                } finally {
                  setSaving(false);
                }
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
            >
              Duplicate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl p-6 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-red-600">Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to delete the duplicated landing page <strong className="text-red-600">"${deleteTarget?.key}"</strong>? This action cannot be undone.
            </p>
          </div>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button variant="ghost" onClick={() => setDeleteTarget(null)} className="cursor-pointer font-bold text-xs bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100">
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!deleteTarget) return;
                setSaving(true);
                try {
                  const res = await fetch(`/api/admin/pages/${deleteTarget.key}`, {
                    method: "DELETE"
                  });

                  const data = await res.json();
                  if (!res.ok) {
                    throw new Error(data.error || "Failed to delete page");
                  }

                  setSuccess(`Page "${deleteTarget.key}" deleted successfully!`);
                  setDeleteTarget(null);
                  fetchPages();
                  setTimeout(() => setSuccess(""), 3000);
                } catch (err: any) {
                  setError(err.message);
                  setTimeout(() => setError(""), 4000);
                } finally {
                  setSaving(false);
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer"
            >
              Delete Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
