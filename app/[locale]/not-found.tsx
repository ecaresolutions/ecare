import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FileQuestion } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// Localized 404 Page
export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <Section className="py-20 md:py-32">
          <Container className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-error-background text-error-foreground mb-6 shadow-sm">
              <FileQuestion className="h-10 w-10 animate-pulse" />
            </div>
            
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mb-4">
              {t("title")}
            </h1>
            
            <p className="text-base text-muted-foreground mb-8">
              {t("description")}
            </p>
            
            <Button asChild variant="glow" size="lg" className="w-full sm:w-auto">
              <Link href="/">
                {t("button")}
              </Link>
            </Button>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
