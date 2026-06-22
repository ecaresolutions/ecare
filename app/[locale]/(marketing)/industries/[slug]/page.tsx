import { notFound } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ShoppingBag, Heart, DollarSign, Truck, ArrowLeft, CheckCircle } from "lucide-react";

export const dynamic = "force-static";

const INDUSTRIES_DETAIL = {
  ecommerce: {
    icon: ShoppingBag,
    titleEn: "E-commerce & Retail Solutions",
    titleBn: "ই-কমার্স ও খুচরা ব্যবসা সমাধান",
    descEn: "Optimize purchase conversion with edge cached content, localized assets, and headless API execution.",
    descBn: "এজ ক্যাশড কন্টেন্ট, স্থানীয় অ্যাসেট এবং হেডলেস এপিআই এক্সিকিউশন সহ ক্রয়ের রূপান্তর অপ্টিমাইজ করুন।",
    pointsEn: ["Headless Shopify/BigCommerce custom syncs", "Algolia fast product search indexes", "Static rendering checkout interfaces", "Secure Stripe payment tunnels"],
    pointsBn: ["হেডলেস শপিফাই/বিগকমার্স কাস্টম সিঙ্ক", "অ্যালগোলিয়া দ্রুত পণ্য অনুসন্ধান সূচক", "স্ট্যাটিক রেন্ডারিং চেকআউট ইন্টারফেস", "নিরাপদ স্ট্রাইপ পেমেন্ট টানেল"]
  },
  healthcare: {
    icon: Heart,
    titleEn: "Healthcare & Biotech Platforms",
    titleBn: "স্বাস্থ্যসেবা ও বায়োটেক প্ল্যাটফর্ম",
    descEn: "Compliant portals designed to safely connect patients, researchers, and administrators.",
    descBn: "রোগী, গবেষক এবং প্রশাসকদের নিরাপদে সংযুক্ত করার জন্য ডিজাইন করা উপযুক্ত পোর্টাল।"
  },
  finance: {
    icon: DollarSign,
    titleEn: "Fintech & Banking Systems",
    titleBn: "ফিনটেক ও ব্যাংকিং সিস্টেম",
    descEn: "Interactive real-time financial tracking and modern payment orchestration pipelines.",
    descBn: "ইন্টারেক্টিভ রিয়েল-টাইম আর্থিক ট্র্যাকিং এবং আধুনিক পেমেন্ট অর্কেস্ট্রেশন পাইপলাইন।"
  },
  logistics: {
    icon: Truck,
    titleEn: "Logistics & Supply Chain Software",
    titleBn: "লজিস্টিকস ও সরবরাহ চেইন সফটওয়্যার",
    descEn: "Responsive maps, status grids, and inventory calculations distributed globally.",
    descBn: "বিশ্বব্যাপী বিতরণ করা রেসপন্সিভ মানচিত্র, স্ট্যাটাস গ্রিড এবং ইনভেন্টরি গণনা।"
  }
};

export async function generateStaticParams() {
  return Object.keys(INDUSTRIES_DETAIL).map((slug) => ({ slug }));
}

interface IndustryDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function IndustryDetailPage({ params }: IndustryDetailPageProps) {
  const { locale, slug } = await params;
  const industry = INDUSTRIES_DETAIL[slug as keyof typeof INDUSTRIES_DETAIL];

  if (!industry) {
    notFound();
  }

  const title = locale === "bn" ? industry.titleBn : industry.titleEn;
  const desc = locale === "bn" ? industry.descBn : industry.descEn;
  const points = (industry as any)[locale === "bn" ? "pointsBn" : "pointsEn"] || ["High Availability Services", "Localized Copy Delivery", "Modern UI States", "Strict Performance Budget"];
  const Icon = industry.icon;

  return (
    <>
      <Header />
      <main className="flex-grow">
        <Section className="border-b border-border bg-muted/10">
          <Container className="space-y-6">
            <Link href="/industries" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Industries</span>
            </Link>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Icon className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
                <p className="text-lg text-muted-foreground max-w-3xl">{desc}</p>
              </div>
            </div>
          </Container>
        </Section>

        <Section padding="md">
          <Container className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Key Engineering Focus Areas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {points.map((feat: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 p-8 rounded-2xl bg-primary/5 border border-primary/10 text-center space-y-4">
              <h3 className="text-xl font-bold">Request a Tailored Industry Solution</h3>
              <p className="text-muted-foreground max-w-lg mx-auto">We build fully compliant systems aligned with your industry standard specifications.</p>
              <Button variant="glow" size="lg" asChild>
                <Link href="/contact">Contact Our Experts</Link>
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
