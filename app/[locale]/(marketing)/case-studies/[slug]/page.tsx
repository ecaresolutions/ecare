import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getCaseStudyBySlug } from "@/lib/content";
import { ArrowLeft, CheckCircle2, Cpu, FileText, BarChart3 } from "lucide-react";

export const dynamic = "force-dynamic";

interface CaseStudyDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { locale, slug } = await params;
  const study = getCaseStudyBySlug(locale, slug);

  if (!study) {
    notFound();
  }

  const t = await getTranslations("CaseStudies");

  return (
    <>
      <Header />
      <main className="flex-grow">
        <Section className="border-b border-border bg-muted/10">
          <Container className="space-y-6">
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              <span>{t("backToList")}</span>
            </Link>
            <div className="space-y-3">
              <div className="flex gap-2 items-center text-xs font-bold text-primary uppercase tracking-wider">
                <span>{study.client}</span>
                <span>&bull;</span>
                <span>{study.industry}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{study.title}</h1>
            </div>
          </Container>
        </Section>

        <Section padding="md">
          <Container className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Columns: Challenge & Solution */}
            <div className="lg:col-span-2 space-y-8">
              {/* Challenge */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  {t("challenge")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  {t("solution")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {study.solution}
                </p>
              </div>

              {/* Full markdown detail */}
              {study.content && (
                <div className="prose dark:prose-invert border-t border-border pt-8" dangerouslySetInnerHTML={{ __html: study.content }} />
              )}
            </div>

            {/* Right Panel: Results & Metrics */}
            <div className="space-y-8">
              {/* Metrics block */}
              {study.metrics && Object.keys(study.metrics).length > 0 && (
                <div className="p-6 rounded-xl border border-border bg-card space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    {t("metrics")}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(study.metrics).map(([name, val]) => (
                      <div key={name} className="space-y-1 p-3 rounded-lg bg-muted/30">
                        <div className="text-2xl font-extrabold text-foreground">{val}</div>
                        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results points */}
              {study.results && study.results.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">{t("results")}</h3>
                  <ul className="space-y-3">
                    {study.results.map((res, i) => (
                      <li key={i} className="flex gap-2 items-start text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
