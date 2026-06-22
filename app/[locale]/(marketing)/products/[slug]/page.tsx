import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { getPortfolioBySlug } from "@/lib/content";
import { ArrowLeft, BookOpen, Star, RefreshCw } from "lucide-react";
import Image from "next/image";
import EnvatoCheckoutCard from "./EnvatoCheckoutCard";
import ProductTabs from "./ProductTabs";

export const dynamic = "force-dynamic";

interface PortfolioDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { locale, slug } = await params;
  const item = await getPortfolioBySlug(locale, slug);

  if (!item) {
    notFound();
  }

  const t = await getTranslations("Portfolio");

  return (
    <>
      <Header />
      <main className="flex-grow bg-[#f5f6f7] dark:bg-transparent">
        {/* Envato-like Top Banner Info */}
        <div className="bg-white dark:bg-[#070b13] border-b border-[#e1e4e6] dark:border-slate-800/80 py-8">
          <Container className="space-y-4">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm text-[#007cf5] hover:underline">
              <ArrowLeft className="w-4 h-4" />
              <span>{t("backToList")}</span>
            </Link>

            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight leading-none">
                {item.title}
              </h1>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500 items-center">
                <span>By <strong className="text-slate-800 dark:text-white">Ecare</strong></span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <strong className="text-slate-700 dark:text-slate-200">{Number(item.rating || 5.0).toFixed(2)}</strong> ({item.ratingsCount || 101} ratings)
                </span>
                <span>{Number(item.sales || 1442).toLocaleString()} Sales</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500">
                  <RefreshCw className="w-3.5 h-3.5" /> Recently Updated
                </span>
              </div>
            </div>
          </Container>
        </div>

        <ProductTabs
          content={item.content || ""}
          cover={item.cover}
          title={item.title}
          demoUrl={item.demoUrl || "/services"}
          videoUrl={item.videoUrl || ""}
          overviewLabel={t("overview")}
          locale={locale}
          slug={slug}
        >
          {/* Checkout card */}
          <EnvatoCheckoutCard 
            itemTitle={item.title} 
            caseStudyUrl={item.caseStudy ? `/case-studies/${item.caseStudy}` : undefined}
            demoUrl={item.demoUrl || "/services"}
            price={item.price}
            supportPrice={item.supportPrice}
            features={item.features}
          />

          {/* Case Study alert */}
          {item.caseStudy && (
            <div className="p-6 bg-white dark:bg-[#121824] border border-[#e1e4e6] dark:border-slate-800 rounded-lg space-y-3">
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">Case Study Available</h3>
              <p className="text-xs text-muted-foreground leading-normal">Learn about the engineering challenges and results metrics behind this deployment.</p>
              <Button variant="outline" className="w-full text-xs font-bold uppercase tracking-wider h-10" asChild>
                <Link href={`/case-studies/${item.caseStudy}`}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t("caseStudyLink")}
                </Link>
              </Button>
            </div>
          )}

          {/* Gallery Screenshots */}
          {item.gallery && item.gallery.length > 0 && (
            <div className="bg-white dark:bg-[#121824] border border-[#e1e4e6] dark:border-slate-800 rounded-lg p-6 space-y-4">
              <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b border-border pb-2">
                {t("gallery")}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {item.gallery.map((img: string, index: number) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                    <Image 
                      src={img} 
                      alt={`${item.title} gallery screenshot ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </ProductTabs>
      </main>
      <Footer />
    </>
  );
}
