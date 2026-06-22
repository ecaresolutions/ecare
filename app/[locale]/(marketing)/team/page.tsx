import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getTeams } from "@/lib/content";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface TeamPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { locale } = await params;
  const t = await getTranslations("Team");
  const teamList = await getTeams(locale);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamList.map((member) => (
                <Card key={member.slug} className="flex flex-col justify-between hover:border-primary/50 transition-all duration-300">
                  <CardHeader className="space-y-4">
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border">
                      <Image 
                        src={member.avatar || "/static/images/team/default.jpg"} 
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-bold">{member.name}</CardTitle>
                      <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <p className="text-muted-foreground text-sm line-clamp-2">{member.bio}</p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/team/${member.slug}`}>{t("viewProfile")}</Link>
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
