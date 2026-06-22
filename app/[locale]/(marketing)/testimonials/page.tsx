import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { getTestimonials } from "@/lib/content";
import TestimonialsGrid from "@/components/blocks/testimonials-grid";
import { MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

interface TestimonialsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TestimonialsPage({ params }: TestimonialsPageProps) {
  const { locale } = await params;
  const t = await getTranslations("Testimonials");
  const testimonials = await getTestimonials(locale);

  // Convert mongoose document objects / fallbacks nicely for Client Component
  const formattedTestimonials = testimonials.map((test) => ({
    _id: test._id ? test._id.toString() : Math.random().toString(),
    author: test.author,
    company: test.company,
    quote: test.quote,
    rating: test.rating,
    avatar: test.avatar,
    videoUrl: test.videoUrl,
    content: test.content,
  }));

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Premium Hero Section with consistent style and glowing blobs */}
        <Section className="relative overflow-x-clip py-12 md:py-16 border-b border-border/50 bg-[#f8fafc]/60 dark:bg-[#0b0f19]/40">
          <div className="absolute top-[-20%] left-[-15%] w-[45%] aspect-square bg-cyan-200/35 dark:bg-cyan-500/5 rounded-full blur-[120px] md:blur-[160px] pointer-events-none" />
          <div className="absolute top-[-10%] right-[-15%] w-[55%] aspect-square bg-purple-200/35 dark:bg-purple-500/5 rounded-full blur-[140px] md:blur-[180px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[25%] w-[35%] aspect-square bg-pink-200/25 dark:bg-pink-500/5 rounded-full blur-[100px] md:blur-[140px] pointer-events-none" />
          
          <Container className="text-center relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              {locale === "bn" ? "রিভিউ" : "Testimonials"}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground via-foreground/90 to-primary/80 leading-none">
              {t("title")}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </Container>
        </Section>

        <Section padding="md">
          <Container className="space-y-12">
            <TestimonialsGrid testimonials={formattedTestimonials} />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
