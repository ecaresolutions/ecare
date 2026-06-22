import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Percent, Gift, CheckSquare } from "lucide-react";

export const dynamic = "force-static";

interface AffiliatesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AffiliatesPage({ params }: AffiliatesPageProps) {
  const { locale } = await params;
  const t = await getTranslations("Affiliates");

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

        {/* Commission structure */}
        <Section padding="md" className="border-t border-border">
          <Container className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">{t("commission")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("commissionSub")}
                </p>
                <div className="pt-2">
                  <Button variant="glow" size="lg" asChild>
                    <Link href="/contact">Join Affiliate Program</Link>
                  </Button>
                </div>
              </div>
              <div className="p-8 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col items-center justify-center text-center space-y-4">
                <Percent className="w-16 h-16 text-primary" />
                <div className="text-5xl font-extrabold text-foreground">15%</div>
                <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recurring Payouts</div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Resources */}
        <Section padding="md" className="bg-muted/10 border-t border-border">
          <Container className="max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">{t("resources")}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="flex items-start gap-4 p-6">
                <CheckSquare className="w-8 h-8 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold">{t("resourceItem1")}</CardTitle>
                  <CardDescription>Get pre-approved badges, logos, and illustration layouts to maintain clean brand messaging.</CardDescription>
                </div>
              </Card>
              <Card className="flex items-start gap-4 p-6">
                <Gift className="w-8 h-8 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold">{t("resourceItem2")}</CardTitle>
                  <CardDescription>Access professional high-performing copy, banners, and ready-made email newsletters.</CardDescription>
                </div>
              </Card>
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section padding="md" className="border-t border-border">
          <Container className="max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">{t("faqTitle")}</h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="faq-1" className="border border-border rounded-xl px-4 bg-card">
                <AccordionTrigger className="font-semibold text-left">{t("faqQ1")}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {t("faqA1")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2" className="border border-border rounded-xl px-4 bg-card">
                <AccordionTrigger className="font-semibold text-left">{t("faqQ2")}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {t("faqA2")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
