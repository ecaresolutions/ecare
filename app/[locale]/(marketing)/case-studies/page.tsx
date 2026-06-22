import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getCaseStudies } from "@/lib/content";

export const dynamic = "force-dynamic";

interface CaseStudiesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CaseStudiesPage({ params }: CaseStudiesPageProps) {
  const { locale } = await params;
  const t = await getTranslations("CaseStudies");
  const list = getCaseStudies(locale);

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
          <Container className="max-w-5xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {list.map((study) => (
                <Card key={study.slug} className="flex flex-col justify-between hover:border-primary/50 transition-all duration-300">
                  <CardHeader className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold text-primary uppercase">
                      <span>{study.client}</span>
                      <span>&bull;</span>
                      <span>{study.industry}</span>
                    </div>
                    <CardTitle className="text-2xl font-bold">{study.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">{study.challenge}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="outline" asChild className="w-full">
                      <Link href={`/case-studies/${study.slug}`}>{t("readMore")}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
