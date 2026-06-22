import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { getTeamMember, getTeams } from "@/lib/content";
import { ArrowLeft, Mail } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface TeamDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function TeamDetailPage({ params }: TeamDetailPageProps) {
  const { locale, slug } = await params;
  const member = await getTeamMember(locale, slug);

  if (!member) {
    notFound();
  }

  const t = await getTranslations("Team");

  // Map of social icons returning inline SVGs for reliability and zero external deps
  const getSocialIcon = (key: string) => {
    switch (key.toLowerCase()) {
      case "github":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
          </svg>
        );
      case "twitter":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        );
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <>
      <Header />
      <main className="flex-grow">
        <Section className="border-b border-border bg-muted/10">
          <Container className="space-y-6">
            <Link href="/team" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              <span>{t("back")}</span>
            </Link>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden border border-border shrink-0">
                <Image 
                  src={member.avatar || "/static/images/team/default.jpg"} 
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{member.name}</h1>
                  <p className="text-xl text-primary font-semibold">{member.role}</p>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl">{member.bio}</p>
                
                {/* Socials */}
                {member.socials && Object.keys(member.socials).length > 0 && (
                  <div className="flex items-center gap-3 pt-2">
                    {Object.entries(member.socials).map(([platform, url]) => (
                      <Button key={platform} variant="outline" size="icon" asChild className="rounded-full">
                        <a href={url as string} target="_blank" rel="noopener noreferrer" aria-label={`Link to ${platform}`}>
                          {getSocialIcon(platform)}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Section>

        <Section padding="md">
          <Container className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left/Main Content: Biography/Write-up */}
            <div className="lg:col-span-2 space-y-6 prose dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: member.content }} />
            </div>

            {/* Right: Skills & Meta */}
            <div className="space-y-6 lg:border-l lg:border-border lg:pl-8">
              <h2 className="text-xl font-bold">{t("skills")}</h2>
              <div className="flex flex-wrap gap-2">
                {member.skills?.map((skill: string) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
