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
import EzyComStickyNav from "@/components/ezycom/sticky-nav";
import dbConnect from "@/lib/db";
import { Page } from "@/lib/models";

export const dynamic = "force-dynamic";

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

  // DB content initialization
  let dbData: any = null;
  try {
    await dbConnect();
    const pageDoc = await Page.findOne({ key: "ezycom" }).lean();
    if (pageDoc && pageDoc.content) {
      const rawContent = pageDoc.content[locale as "en" | "bn"] || pageDoc.content.en || "{}";
      dbData = JSON.parse(rawContent);
    }
  } catch (err) {
    console.error("Failed to load ezycom page from DB, falling back to JSON translations:", err);
  }

  const tickerItems: string[] = (dbData?.tickerItems && dbData.tickerItems.length > 0 && dbData.tickerItems[0] !== "")
    ? dbData.tickerItems
    : (t.raw("ticker.items") as string[]);
  const tTickerTitle = dbData?.tickerTitle || t("ticker.title");

  // --- Dynamic Translations (with database priority and JSON fallback) ---
  const fallbackProblemCards = [
    { icon: "/ezycom/form.png", title: t("problem.card1.title"), desc: t("problem.card1.desc"), badge: t("problem.card1.badge") },
    { icon: "/ezycom/no-smartphones.png", title: t("problem.card2.title"), desc: t("problem.card2.desc"), badge: t("problem.card2.badge") },
    { icon: "/ezycom/danger.png", title: t("problem.card3.title"), desc: t("problem.card3.desc"), badge: t("problem.card3.badge") },
    { icon: "/ezycom/spending.png", title: t("problem.card4.title"), desc: t("problem.card4.desc"), badge: t("problem.card4.badge") },
    { icon: "/ezycom/sand-clock.png", title: t("problem.card5.title"), desc: t("problem.card5.desc"), badge: t("problem.card5.badge") },
    { icon: "/ezycom/loss.png", title: t("problem.card6.title"), desc: t("problem.card6.desc"), badge: t("problem.card6.badge") }
  ];

  const tProblemBadge = dbData?.problemSectionBadge || t("problem.badge");
  const tProblemTitleHtml = dbData?.problemSectionTitleHtml || t.raw("problem.titleHtml");
  const tProblemSub = dbData?.problemSectionSub || t("problem.sub");
  const tProblemCards = dbData?.problemSectionCards || fallbackProblemCards;

  const tHeroImages: string[] = dbData?.heroImages || [];
  const tHeroBadge = dbData?.heroBadge || t("hero.badge");
  const tHeroTitleHtml = dbData?.heroTitleHtml || t.raw("hero.titleHtml");
  const tHeroSub = dbData?.heroSub || t("hero.sub");
  const tHeroCtaFree = dbData?.heroCtaFree || t("hero.ctaFree");
  const tHeroCtaBuild = dbData?.heroCtaBuild || t("hero.ctaBuild");

  const tStickyNavLinks = dbData?.stickyNavLinks || t.raw("stickyNav.links");
  const tStickyNavCta = dbData?.stickyNavCta || t("stickyNav.cta");

  const tCapabilitiesSectionBadge = dbData?.capabilitiesSectionBadge || (locale === "bn" ? "ফিচার সমূহ" : "Core Capabilities");
  const tCapabilitiesSectionTitleHtml = dbData?.capabilitiesSectionTitleHtml || (locale === "bn" ? "আমাদের কোর <span class=\"text-primary\">ক্যাপাবিলিটিজ</span>" : "Our Core <span class=\"text-primary\">Capabilities</span>");
  const tCapabilitiesSectionSub = dbData?.capabilitiesSectionSub || t("features.sub");
  const tCapabilitiesBentoCards = dbData?.capabilitiesBentoCards || [];
  const tCapabilitiesFeatureItems = dbData?.capabilitiesFeatureItems || (t.raw("features.items.all") as any[]);

  const tCompareSectionBadge = dbData?.compareSectionBadge || t("compareSection.badge");
  const tCompareSectionTitleHtml = dbData?.compareSectionTitleHtml || t.raw("compareSection.titleHtml");
  const tCompareSectionSub = dbData?.compareSectionSub || t("compareSection.sub");
  const tCompareSectionCols = dbData ? {
    features: dbData.compareSectionColFeatures,
    wp: dbData.compareSectionColWp,
    laravel: dbData.compareSectionColLaravel
  } : (t.raw("compareSection.cols") as { features: string; wp: string; laravel: string });
  
  const tCompareSectionRows = (dbData?.compareSectionRows || Object.values(t.raw("compareSection.rows"))) as { name: string; desc?: string; wp: string; laravel: string }[];

  const tDemosSectionBadge = dbData?.demosSectionBadge || t("demosSection.badge");
  const tDemosSectionTitleHtml = dbData?.demosSectionTitleHtml || t.raw("demosSection.titleHtml");
  const tDemosSectionSub = dbData?.demosSectionSub || t("demosSection.sub");
  const tDemosSectionPlaceholder = dbData?.demosSectionPlaceholder || t("demosSection.placeholder");
  const tDemosSectionCategories = dbData ? {
    all: dbData.demosSectionCatAll,
    wordpress: dbData.demosSectionCatWordPress,
    laravel: dbData.demosSectionCatLaravel
  } : (t.raw("demosSection.categories") as { all: string; wordpress: string; laravel: string });
  
  const tDemosSectionButtons = dbData ? {
    live: dbData.demosSectionBtnLive,
    admin: dbData.demosSectionBtnAdmin
  } : (t.raw("demosSection.buttons") as { live: string; admin: string });

  const tDemosList = dbData?.demosList || [];
  const tDemosSectionShowcaseImage = dbData?.demosSectionShowcaseImage || "/Outstanding Demo.webp";

  const tFinalCtaBadge = dbData?.finalCtaBadge || t("finalCta.badge");
  const tFinalCtaTitle = dbData?.finalCtaTitle || t("finalCta.title");

  const tVideoSectionBadge = dbData?.videoSectionBadge || (locale === "bn" ? "সিস্টেম ভিডিও ট্যুর" : "System Walkthrough");
  const tVideoSectionTitleHtml = dbData?.videoSectionTitleHtml || (locale === "bn" ? "সিস্টেম <span class=\"text-primary\">ভিডিও ট্যুর</span>" : "System <span class=\"text-primary\">Walkthrough</span>");
  const tVideoSectionSub = dbData?.videoSectionSub || t("videoSection.sub");
  const tVideoSectionTabs = dbData?.videoSectionTabs || [];
  const tFinalCtaSub = dbData?.finalCtaSub || t("finalCta.sub");
  const tFinalCtaCtaDemo = dbData?.finalCtaCtaDemo || t("finalCta.ctaDemo");
  const tFinalCtaCtaExpert = dbData?.finalCtaCtaExpert || t("finalCta.ctaExpert");
  const tFinalCtaNote = dbData?.finalCtaNote || t("finalCta.note");

  // --- FAQs Data ---
  const tFaqSectionBadge = dbData?.faqSectionBadge || t("faq.badge");
  const tFaqSectionTitleHtml = dbData?.faqSectionTitleHtml || t.raw("faq.titleHtml");
  const tFaqSectionSub = dbData?.faqSectionSub || t("faq.sub");
  const tFaqSectionItems = ((dbData?.faqSectionItems && dbData.faqSectionItems.length > 0) 
    ? dbData.faqSectionItems 
    : (t.raw("faq.items") as { q: string; a: string }[])) as { q: string; a: string }[];

  return (
    <div className="bg-[#FAFBFD] dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 font-sans selection:bg-primary/20 selection:text-primary min-h-screen overflow-x-hidden">
      <Header />

      {/* --- HERO SECTION OUTER WRAPPER --- */}
      <div className="w-full bg-[#FAFBFD] dark:bg-[#0b0f19] border-b border-slate-200/50 dark:border-slate-800/60 relative overflow-hidden bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] bg-[position:center_top]">
        {/* Radial and Linear Gradient Overlays with theme tint */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.04)_10%,#FAFBFD_80%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.04)_10%,#0b0f19_80%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAFBFD] dark:to-[#0b0f19] pointer-events-none" />

        {/* Glow Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="w-[500px] h-[500px] bg-rose-200/30 dark:bg-rose-950/10 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] blur-[120px] absolute -top-40 -left-20 animate-blob pointer-events-none" />
          <div className="w-[550px] h-[550px] bg-primary/8 dark:bg-primary/5 rounded-[50%_50%_30%_70%_/_50%_60%_40%_60%] blur-[130px] absolute top-20 right-[-10%] animate-blob [animation-delay:4s] pointer-events-none" />
          <div className="w-[400px] h-[400px] bg-pink-100/30 dark:bg-pink-950/10 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] blur-[100px] absolute bottom-10 left-[30%] animate-blob [animation-delay:2s] pointer-events-none" />
        </div>

        <section id="hero" className="relative pt-16 pb-12 md:pt-20 md:pb-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Hero Content */}
            <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
              {/* Crown Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-full text-slate-800 dark:text-slate-200 text-xs font-bold shadow-sm shadow-slate-100/5">
                <span className="text-base text-amber-500">👑</span>
                {tHeroBadge}
              </div>
              
              {/* Localized Headline */}
              <h1 
                className="text-4xl sm:text-5xl lg:text-[42px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.05] !font-sans"
                dangerouslySetInnerHTML={{ __html: tHeroTitleHtml }}
              />

              {/* Localized Subheadline */}
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {tHeroSub}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a href="#demos" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-95 text-white font-semibold text-base py-6 px-8 rounded-xl shadow-md shadow-primary/10 transition-all cursor-pointer flex items-center gap-2">
                    {tHeroCtaFree}
                    <Icons.ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <a href="#compare" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 hover:scale-[1.02] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-base py-6 px-8 rounded-xl backdrop-blur-sm transition-all cursor-pointer">
                    {tHeroCtaBuild}
                  </Button>
                </a>
              </div>
            </div>

            {/* Hero Visual Slider Mockup Grid */}
            <div className="lg:col-span-7 relative w-full flex justify-center items-center">
              <EzyComHeroSlider images={tHeroImages} />
            </div>
          </div>
        </section>
      </div>

      {/* --- PROBLEM SECTION --- */}
      <section id="problem" className="py-14 bg-[#FAFBFD] dark:bg-[#0b0f19]/40 border-y border-slate-200/50 dark:border-slate-800/60 px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="w-[400px] h-[400px] bg-rose-200/20 dark:bg-rose-950/10 rounded-full blur-[100px] absolute top-10 left-10" />
        </div>

        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black text-rose-600 dark:text-rose-455 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 px-4 py-1.5 rounded-full uppercase tracking-wider block w-fit mx-auto">
              {tProblemBadge}
            </span>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight relative z-10 font-sans"
              dangerouslySetInnerHTML={{ __html: tProblemTitleHtml }}
            />
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base max-w-xl mx-auto">
              {tProblemSub}
            </p>
          </div>

          <EzyComProblemSlider
            cards={tProblemCards}
          />
        </div>
      </section>

      {/* --- WHY BUILT FOR BANGLADESH (TABBED FEATURES) --- */}
      <section id="bangladesh" className="py-14 px-6 max-w-7xl mx-auto">
        <EzyComFeaturesTab
          locale={locale}
          itemsAll={tCapabilitiesFeatureItems}
          sectionBadge={tCapabilitiesSectionBadge}
          sectionTitleHtml={tCapabilitiesSectionTitleHtml}
          sectionSub={tCapabilitiesSectionSub}
          bentoCards={tCapabilitiesBentoCards}
        />
      </section>

      {/* --- TILTED TICKER BANNER SECTION --- */}
      <div className="relative py-14 overflow-hidden bg-[#FAFBFD] dark:bg-[#0b0f19]/40 select-none">
        {/* Marquee Strip Container */}
        <div className="w-[115%] -left-[7.5%] relative bg-slate-900 text-white py-5 sm:py-6.5 rotate-[-1.5deg] shadow-[0_15px_30px_rgba(0,0,0,0.12)] border-y border-white/5 flex items-center">
          {/* Tilted Theme Badge (Attached inside the rotated container to stay aligned) */}
          <div className="absolute top-[-16px] left-[10%] sm:left-[20%] z-20 bg-primary text-white text-[10px] sm:text-xs font-black tracking-wide px-4 py-1.5 rounded-full shadow-md shadow-primary/20 flex items-center gap-1.5 uppercase whitespace-nowrap">
            <span>{tTickerTitle}</span>
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
        locale={locale}
        tabs={videoTabs}
        sectionBadge={tVideoSectionBadge}
        sectionTitleHtml={tVideoSectionTitleHtml}
        sectionSub={tVideoSectionSub}
        videoSectionTabs={tVideoSectionTabs}
      />

      {/* --- PRE-BUILT DEMOS SECTION --- */}
      <section id="demos" className="py-14 bg-[#FAFBFD] dark:bg-[#0b0f19]/40 border-b border-slate-200/50 dark:border-slate-800/60 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <EzyComDemos
            locale={locale}
            tBadge={tDemosSectionBadge}
            tTitle={tDemosSectionTitleHtml}
            tSub={tDemosSectionSub}
            tSearchPlaceholder={tDemosSectionPlaceholder}
            tCategories={tDemosSectionCategories}
            tButtons={tDemosSectionButtons}
            demosList={tDemosList}
          />
        </div>
      </section>

      {/* --- OUTSTANDING DEMO IMAGE SECTION (Full Width) --- */}
      <section className="w-full overflow-hidden pt-12 bg-white dark:bg-[#0b0f19]">
        <img 
          src={tDemosSectionShowcaseImage} 
          alt={tDemosSectionBadge} 
          className="w-full h-auto block"
        />
      </section>

      {/* --- COMPARISON SECTION --- */}
      <section id="compare" className="py-14 bg-[#FAFBFD] dark:bg-[#0b0f19]/40 border-t border-slate-200/50 dark:border-slate-800/60 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black text-primary bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 px-4 py-1.5 rounded-full uppercase tracking-wider block w-fit mx-auto">
              {tCompareSectionBadge}
            </span>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight relative z-10 font-sans"
              dangerouslySetInnerHTML={{ __html: tCompareSectionTitleHtml }}
            />
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base max-w-xl mx-auto">
              {tCompareSectionSub}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-850/40 border-b border-slate-100 dark:border-slate-800">
                    <th className="p-6 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider w-[40%]">
                      {tCompareSectionCols.features}
                    </th>
                    <th className="p-6 text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider w-[30%] text-center bg-blue-50/20 dark:bg-blue-950/10">
                      {tCompareSectionCols.wp}
                    </th>
                    <th className="p-6 text-xs font-black text-primary uppercase tracking-wider w-[30%] text-center bg-primary/5 dark:bg-primary/10">
                      {tCompareSectionCols.laravel}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-600 dark:text-slate-300 font-medium text-xs sm:text-sm">
                  {tCompareSectionRows.map((row: any, idx) => {
                    return (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                        <td className="p-6">
                          <div className="space-y-1">
                            <p className="font-extrabold text-slate-800 dark:text-slate-200">{row.name}</p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-normal leading-relaxed">{row.desc}</p>
                          </div>
                        </td>
                        <td className="p-6 text-center bg-blue-50/10 dark:bg-blue-950/5 font-semibold text-slate-700 dark:text-slate-300">
                          {row.wp}
                        </td>
                        <td className="p-6 text-center bg-primary/2 dark:bg-primary/5 font-extrabold text-slate-800 dark:text-slate-200">
                          {row.laravel}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="block md:hidden divide-y divide-slate-100 dark:divide-slate-800 p-5 space-y-6">
              {tCompareSectionRows.map((row: any, idx) => {
                return (
                  <div key={idx} className="pt-5 first:pt-0 space-y-3">
                    <div className="space-y-1">
                      <p className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">{row.name}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed">{row.desc}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs font-bold">
                      <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block mb-1 uppercase">Woocom</span>
                        <span className="text-slate-700 dark:text-slate-300">{row.wp}</span>
                      </div>
                      <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-primary block mb-1 uppercase">Laracom</span>
                        <span className="text-slate-800 dark:text-slate-200 font-black">{row.laravel}</span>
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
      <section id="faq" className="py-14 bg-white dark:bg-[#0b0f19] border-y border-slate-100 dark:border-slate-800/60 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black text-primary bg-primary/5 border border-primary/10 px-4 py-1.5 rounded-full uppercase tracking-wider block w-fit mx-auto">
              {tFaqSectionBadge}
            </span>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight relative z-10 font-sans"
              dangerouslySetInnerHTML={{ __html: tFaqSectionTitleHtml }}
            />
            <p className="text-slate-500 font-medium text-sm sm:text-base max-w-xl mx-auto">
              {tFaqSectionSub}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {tFaqSectionItems.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`} className="border border-slate-100 dark:border-slate-800 rounded-xl px-4 bg-[#FAFBFD] dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-850 transition-colors duration-200">
                <AccordionTrigger className="text-left font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base hover:no-underline py-4 cursor-pointer">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed pb-4 pt-1">
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
          <div className="w-[600px] h-[600px] bg-primary rounded-full blur-[120px] absolute -bottom-80 left-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-xs font-bold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full uppercase tracking-widest">{tFinalCtaBadge}</span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-sans">
            {tFinalCtaTitle}
          </h2>
          
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base font-medium">
            {tFinalCtaSub}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/your-whatsapp-link" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-6 px-8 rounded-xl cursor-pointer">
                {tFinalCtaCtaDemo}
              </Button>
            </a>
            <a href="https://wa.me/your-whatsapp-link" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full border-white/20 hover:bg-white/10 text-white font-bold py-6 px-8 rounded-xl cursor-pointer">
                {tFinalCtaCtaExpert}
              </Button>
            </a>
          </div>

          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            {tFinalCtaNote}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
