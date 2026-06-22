import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShoppingBag, Heart, DollarSign, Truck } from "lucide-react";

export const dynamic = "force-static";

const INDUSTRIES_DATA = [
  {
    slug: "ecommerce",
    icon: ShoppingBag,
    titleEn: "E-commerce & Retail",
    titleBn: "ই-কমার্স ও খুচরা ব্যবসা",
    descEn: "Ultra-fast headless commerce platforms built to convert with sub-100ms load times.",
    descBn: "১০০ মিলি-সেকেন্ডের কম লোড টাইমে কনভার্ট করার জন্য নির্মিত অতি-দ্রুত হেডলেস কমার্স প্ল্যাটফর্ম।"
  },
  {
    slug: "healthcare",
    icon: Heart,
    titleEn: "Healthcare & Biotech",
    titleBn: "স্বাস্থ্যসেবা ও বায়োটেক",
    descEn: "Secure, compliant web applications ensuring data privacy and access security.",
    descBn: "উপাত্তের গোপনীয়তা এবং অ্যাক্সেস নিরাপত্তা নিশ্চিতকারী নিরাপদ ও নিয়ম মেনে চলা ওয়েব অ্যাপ্লিকেশন।"
  },
  {
    slug: "finance",
    icon: DollarSign,
    titleEn: "Fintech & Banking",
    titleBn: "ফিনটেক ও ব্যাংকিং",
    descEn: "Robust banking dashboards and APIs engineered with strict security headers.",
    descBn: "কঠোর নিরাপত্তা হেডারসহ নির্মিত শক্তিশালী ব্যাংকিং ড্যাশবোর্ড এবং এপিআই।"
  },
  {
    slug: "logistics",
    icon: Truck,
    titleEn: "Logistics & Supply Chain",
    titleBn: "লজিস্টিকস ও সরবরাহ চেইন",
    descEn: "Real-time tracking grids and mapping architectures deployed at the edge.",
    descBn: "এজ-এ ডেপ্লয় করা রিয়েল-টাইম ট্র্যাকিং গ্রিড এবং ম্যাপিং আর্কিটেকচার।"
  }
];

interface IndustriesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function IndustriesPage({ params }: IndustriesPageProps) {
  const { locale } = await params;
  const t = await getTranslations("Industries");

  return (
    <>
      <Header />
      <main className="flex-grow">
        <Section className="bg-radial from-primary/10 via-transparent to-transparent py-16 md:py-24">
          <Container className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{t("title")}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
          </Container>
        </Section>

        <Section padding="md">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {INDUSTRIES_DATA.map((ind) => {
                const Icon = ind.icon;
                const title = locale === "bn" ? ind.titleBn : ind.titleEn;
                const desc = locale === "bn" ? ind.descBn : ind.descEn;

                return (
                  <Card key={ind.slug} className="flex flex-col justify-between hover:border-primary/50 transition-all duration-300">
                    <CardHeader className="space-y-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                        <CardDescription className="text-base">{desc}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 pb-6 flex justify-between items-center">
                      <Button variant="outline" asChild>
                        <Link href={`/industries/${ind.slug}`}>{t("viewDetails")}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
