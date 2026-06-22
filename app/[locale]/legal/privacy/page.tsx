import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { getPageContent } from "@/lib/content";
import { ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const content = await getPageContent("privacy", locale);

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
              <ShieldCheck className="w-3.5 h-3.5" />
              {locale === "bn" ? "নিরাপত্তা" : "Privacy"}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground via-foreground/90 to-primary/80 leading-none">
              {locale === "bn" ? "প্রাইভেসি পলিসি" : "Privacy Policy"}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {locale === "bn" 
                ? "আমাদের গ্রাহক ও ব্যবহারকারীদের তথ্যের গোপনীয়তা ও নিরাপত্তা নীতি।" 
                : "Learn how we collect, use, and protect your personal information."}
            </p>
          </Container>
        </Section>

        <Section padding="lg">
          <Container>
            <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-slate-600 dark:text-slate-300">
              {content || (locale === "bn" ? "প্রাইভেসি পলিসি লোড হচ্ছে..." : "Loading Privacy Policy...")}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
