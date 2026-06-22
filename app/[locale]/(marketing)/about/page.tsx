import { getTranslations } from "next-intl/server";
import * as Icons from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getTeams, getPageContent } from "@/lib/content";
import TeamGrid from "./TeamGrid";
import Image from "next/image";
import { 
  ShieldAlert, 
  Award, 
  Target, 
  Compass, 
  Users, 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  ArrowRight,
  Puzzle,
  Download,
  Smile,
  Globe
} from "lucide-react";

export const dynamic = "force-dynamic";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  const tHome = await getTranslations({ locale, namespace: "Home" });
  const tTeam = await getTranslations({ locale, namespace: "Team" });
  const teamList = await getTeams(locale);
  const aboutContent = await getPageContent("about", locale);

  let dynamicAbout: any = {};
  if (aboutContent) {
    try {
      dynamicAbout = JSON.parse(aboutContent);
    } catch (e) {
      // Fallback if DB holds legacy plain text/markdown
      dynamicAbout = {
        ourStoryBody: aboutContent
      };
    }
  }
  // Load dynamic At A Glance from DB
  let atGlanceList: any[] = [];
  try {
    const rawAtGlance = await getPageContent("home_at_glance", locale);
    if (rawAtGlance) {
      atGlanceList = JSON.parse(rawAtGlance);
    }
  } catch (e) {
    console.error("Failed to parse about page at-a-glance stats:", e);
  }

  // Fallback to static list if empty
  if (!atGlanceList || atGlanceList.length === 0) {
    atGlanceList = locale === "bn" ? [
      { val: "৯৮+", lbl: "টিম মেম্বার", icon: "Users" },
      { val: "২০+", lbl: "অসাধারণ প্রোডাক্ট", icon: "Puzzle" },
      { val: "৮.৫ মি.+", lbl: "ফ্রি ডাউনলোড", icon: "Download" },
      { val: "৪২৪কে+", lbl: "সন্তুষ্ট কাস্টমার", icon: "Smile" },
      { val: "১৬০+", lbl: "বিশ্বজুড়ে দেশসমূহ", icon: "Globe" },
      { val: "১৫+", lbl: "বছরের পথচলা", icon: "Award" }
    ] : [
      { val: "98+", lbl: "Team Members", icon: "Users" },
      { val: "20+", lbl: "Amazing Products", icon: "Puzzle" },
      { val: "8.5 M+", lbl: "Free Downloads", icon: "Download" },
      { val: "424k+", lbl: "Happy Customers", icon: "Smile" },
      { val: "160+", lbl: "Countries Worldwide", icon: "Globe" },
      { val: "15+", lbl: "Years of Journey", icon: "Award" }
    ];
  }

  return (
    <>
      <Header />
      <main className="flex-grow overflow-hidden">
        <Section className="relative overflow-x-clip py-12 md:py-16 border-b border-border/50 bg-[#f8fafc]/60 dark:bg-[#0b0f19]/40">
          {/* Glowing background blobs to match homepage UI consistency */}
          <div className="absolute top-[-20%] left-[-15%] w-[45%] aspect-square bg-cyan-200/35 dark:bg-cyan-500/5 rounded-full blur-[120px] md:blur-[160px] pointer-events-none" />
          <div className="absolute top-[-10%] right-[-15%] w-[55%] aspect-square bg-purple-200/35 dark:bg-purple-500/5 rounded-full blur-[140px] md:blur-[180px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[25%] w-[35%] aspect-square bg-pink-200/25 dark:bg-pink-500/5 rounded-full blur-[100px] md:blur-[140px] pointer-events-none" />
          
          <Container className="text-center relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider animate-pulse-slow">
              <Zap className="w-3.5 h-3.5" />
              {dynamicAbout.title || t("title")}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground via-foreground/90 to-primary/80 leading-none">
              {dynamicAbout.title || t("title")}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {dynamicAbout.subtitle || t("subtitle")}
            </p>
          </Container>
        </Section>

        {/* Who We Are Section */}
        <Section padding="lg" className="relative bg-[#f8fafc]/40 dark:bg-[#0b0f19]/10">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Text Content */}
              <div className="lg:col-span-6 space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-tight text-foreground">
                  {locale === "bn" ? (
                    <>
                      <span className="text-[#e8000e]">আমরা</span> কারা
                    </>
                  ) : (
                    <>
                      <span className="text-[#e8000e]">Who</span> We Are
                    </>
                  )}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
                  {dynamicAbout.ourStoryBody || t("ourStoryBody")}
                </p>
              </div>

              {/* Right Column: Illustration with floating product logo badges */}
              <div className="lg:col-span-6 relative flex items-center justify-center min-h-[350px]">
                {/* Visual Glow background */}
                <div className="absolute w-[80%] aspect-square bg-primary/5 dark:bg-primary/10 rounded-full blur-[80px]" />
                
                {/* Main Illustration */}
                <div className="relative z-10 w-full max-w-[450px] aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-border/40">
                  <Image 
                    src={dynamicAbout.whoWeAreImg || "/static/images/who-we-are.png"}
                    alt="Who We Are"
                    fill
                    className="object-cover"
                    sizes="(max-w-768px) 100vw, 450px"
                  />
                </div>
                
                {/* Floating Badges styling matching the screenshot references */}
                <div className="absolute top-[10%] right-[5%] z-20 w-12 h-12 rounded-xl bg-white dark:bg-[#0d1321] border border-border shadow-lg p-2 flex items-center justify-center animate-float [animation-duration:5s]">
                  <Image src="/dokan-logo.svg" alt="Dokan" width={32} height={32} className="object-contain" />
                </div>
                <div className="absolute top-[20%] left-[2%] z-20 w-12 h-12 rounded-xl bg-white dark:bg-[#0d1321] border border-border shadow-lg p-2.5 flex items-center justify-center animate-float-delayed">
                  <Image src="/user-frontend-logo.svg" alt="User Frontend" width={30} height={30} className="object-contain" />
                </div>
                <div className="absolute bottom-[15%] right-[10%] z-20 w-12 h-12 rounded-xl bg-white dark:bg-[#0d1321] border border-border shadow-lg p-2 flex items-center justify-center animate-float">
                  <Image src="/wemail.png" alt="weMail" width={32} height={32} className="object-contain" />
                </div>
                <div className="absolute bottom-[25%] left-[5%] z-20 w-12 h-12 rounded-xl bg-white dark:bg-[#0d1321] border border-border shadow-lg p-2 flex items-center justify-center animate-float-delayed [animation-duration:6s]">
                  <Image src="/wepos-logo.png" alt="wePOS" width={32} height={32} className="object-contain" />
                </div>
              </div>
            </div>
          </Container>
        </Section>
        {/* Our Goal Section */}
        <Section padding="lg" className="relative border-t border-border/40 bg-[#f8fafc]/60 dark:bg-[#0b0f19]/40 overflow-hidden">
          {/* Glowing background blobs to match homepage UI consistency */}
          <div className="absolute top-[-20%] left-[-15%] w-[45%] aspect-square bg-cyan-200/30 dark:bg-cyan-500/5 rounded-full blur-[120px] md:blur-[160px] pointer-events-none" />
          <div className="absolute top-[-10%] right-[-15%] w-[55%] aspect-square bg-purple-200/30 dark:bg-purple-500/5 rounded-full blur-[140px] md:blur-[180px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[25%] w-[35%] aspect-square bg-pink-200/20 dark:bg-pink-500/5 rounded-full blur-[100px] md:blur-[140px] pointer-events-none" />
          
          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Illustration */}
              <div className="lg:col-span-6 order-2 lg:order-1 relative flex items-center justify-center min-h-[350px]">
                {/* Visual Glow background */}
                <div className="absolute w-[80%] aspect-square bg-primary/5 dark:bg-primary/10 rounded-full blur-[80px]" />
                
                {/* Main Illustration */}
                <div className="relative z-10 w-full max-w-[450px] aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-border/40">
                  <Image 
                    src={dynamicAbout.ourGoalImg || "/static/images/our-goal.png"}
                    alt="Our Goal"
                    fill
                    className="object-cover"
                    sizes="(max-w-768px) 100vw, 450px"
                  />
                </div>
              </div>

              {/* Right Column: Text Content */}
              <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-tight text-foreground">
                  {locale === "bn" ? (
                    <>
                      আমাদের <span className="text-[#e8000e]">লক্ষ্য</span>
                    </>
                  ) : (
                    <>
                      Our <span className="text-[#e8000e]">Goal</span>
                    </>
                  )}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
                  {dynamicAbout.ourGoalBody || t("ourGoalBody")}
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Journey Timeline Section */}
        <Section padding="lg" className="relative border-t border-border/40 bg-zinc-50/40 dark:bg-[#0b0f19]/20 overflow-hidden">
          {/* Subtle background gradient blob */}
          <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
          
          <Container className="relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                {locale === "bn" ? (
                  <>
                    <span className="text-[#e8000e]">আমাদের</span> পথচলা
                  </>
                ) : (
                  <>
                    <span className="text-[#e8000e]">Our Journey</span> So Far
                  </>
                )}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {dynamicAbout.journeySubtitle || t("journeySubtitle")}
              </p>
            </div>

            {/* Timeline Vertical Container */}
            <div className="relative max-w-5xl mx-auto">
              {/* Vertical line in center (desktop) / left (mobile) */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/80 -translate-x-1/2" />

              <div className="relative">
                {/* Milestone 2026 */}
                <div className="relative flex flex-col md:flex-row items-center mb-6 md:mb-0">
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-white dark:bg-[#0c101b] border-4 border-[#e8000e] -translate-x-1/2 z-10 shadow-sm" />
                  {/* Horizontal Connector Line */}
                  <div className="hidden md:block absolute left-[47%] right-[50%] h-0.5 bg-gradient-to-l from-[#e8000e]/70 to-transparent -translate-y-1/2 top-1/2 pointer-events-none" />
                  
                  {/* Left Column Card */}
                  <div className="w-full md:w-[47%] pl-7 md:pl-0 md:pr-6 text-left">
                    <div className="pt-5 pb-5 px-6 rounded-2xl border border-border bg-white dark:bg-card hover:border-primary/45 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3.5 gap-2">
                        <h3 className="text-base font-extrabold text-foreground tracking-tight text-left shrink">
                          {dynamicAbout.journey2026Title || t("journey2026Title")}
                        </h3>
                        <div className="flex-grow border-t border-dashed border-border/80 mx-3 relative flex items-center justify-center min-w-[20px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#e8000e] absolute" />
                        </div>
                        <span className="text-lg font-black text-foreground shrink-0 leading-none">
                          {t("journey2026")}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed text-left">{dynamicAbout.journey2026Desc || t("journey2026Desc")}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-[6%]" />
                  <div className="w-full md:w-[47%] pl-7 md:pl-6 hidden md:block" />
                </div>

                {/* Milestone 2025 */}
                <div className="relative flex flex-col md:flex-row items-center mb-16 md:mb-12 md:-mt-[110px]">
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-white dark:bg-[#0c101b] border-4 border-[#e8000e] -translate-x-1/2 z-10 shadow-sm" />
                  {/* Horizontal Connector Line */}
                  <div className="hidden md:block absolute left-[50%] right-[47%] h-0.5 bg-gradient-to-r from-[#e8000e]/70 to-transparent -translate-y-1/2 top-1/2 pointer-events-none" />
                  
                  <div className="w-full md:w-[47%] pl-7 md:pl-0 md:pr-6 hidden md:block" />
                  <div className="hidden md:block w-[6%]" />
                  
                  {/* Right Column Card */}
                  <div className="w-full md:w-[47%] pl-7 md:pl-6 text-left">
                    <div className="pt-5 pb-5 px-6 rounded-2xl border border-border bg-white dark:bg-card hover:border-primary/45 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3.5 gap-2">
                        <h3 className="text-base font-extrabold text-foreground tracking-tight text-left shrink">
                          {dynamicAbout.journey2025Title || t("journey2025Title")}
                        </h3>
                        <div className="flex-grow border-t border-dashed border-border/80 mx-3 relative flex items-center justify-center min-w-[20px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#e8000e] absolute" />
                        </div>
                        <span className="text-lg font-black text-foreground shrink-0 leading-none">
                          {t("journey2025")}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed text-left">{dynamicAbout.journey2025Desc || t("journey2025Desc")}</p>
                    </div>
                  </div>
                </div>

                {/* Milestone 2023 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-white dark:bg-[#0c101b] border-4 border-[#e8000e] -translate-x-1/2 z-10 shadow-sm" />
                  {/* Horizontal Connector Line */}
                  <div className="hidden md:block absolute left-[47%] right-[50%] h-0.5 bg-gradient-to-l from-[#e8000e]/70 to-transparent -translate-y-1/2 top-1/2 pointer-events-none" />
                  
                  {/* Left Column Card */}
                  <div className="w-full md:w-[47%] pl-7 md:pl-0 md:pr-6 text-left">
                    <div className="pt-5 pb-5 px-6 rounded-2xl border border-border bg-white dark:bg-card hover:border-primary/45 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3.5 gap-2">
                        <h3 className="text-base font-extrabold text-foreground tracking-tight text-left shrink">
                          {dynamicAbout.journey2023Title || t("journey2023Title")}
                        </h3>
                        <div className="flex-grow border-t border-dashed border-border/80 mx-3 relative flex items-center justify-center min-w-[20px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#e8000e] absolute" />
                        </div>
                        <span className="text-lg font-black text-foreground shrink-0 leading-none">
                          {t("journey2023")}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed text-left">{dynamicAbout.journey2023Desc || t("journey2023Desc")}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-[6%]" />
                  <div className="w-full md:w-[47%] pl-7 md:pl-6 hidden md:block" />
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* At a Glance Section */}
        <Section padding="lg" className="relative border-t border-border/40 bg-white dark:bg-transparent overflow-hidden">
          {/* Subtle background gradient blob for UI consistency */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl opacity-70 pointer-events-none" />
          
          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Text & Stats */}
              <div className="lg:col-span-6 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-tight text-foreground">
                    {locale === "bn" ? (
                      <>
                        <span className="text-[#e8000e]">ইকেয়ার</span> এক নজরে
                      </>
                    ) : (
                      <>
                        <span className="text-[#e8000e]">Ecare</span> at A Glance
                      </>
                    )}
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {dynamicAbout.atGlanceSub || t("atGlanceSub")}
                  </p>
                </div>

                {/* Stats Grid List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  {atGlanceList.map((stat, i) => {
                    const IconComponent = (Icons as any)[stat.icon] || Icons.HelpCircle;
                    const styleIndex = i % 6;
                    const styles = [
                      { color: "text-orange-500 bg-orange-500/10" },
                      { color: "text-purple-500 bg-purple-500/10" },
                      { color: "text-emerald-500 bg-emerald-500/10" },
                      { color: "text-rose-500 bg-rose-500/10" },
                      { color: "text-blue-500 bg-blue-500/10" },
                      { color: "text-amber-500 bg-amber-500/10" }
                    ];
                    const currentStyle = styles[styleIndex];
                    return (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-zinc-50/50 dark:bg-card hover:border-primary/30 transition-all duration-200">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${currentStyle.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xl font-extrabold text-foreground leading-tight">{stat.val}</div>
                          <div className="text-sm font-medium text-muted-foreground leading-tight mt-1">{stat.lbl}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Office Collage Gallery */}
              <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px]">
                {/* Visual Glow Background Blob */}
                <div className="absolute w-[85%] aspect-square bg-secondary/5 dark:bg-secondary/10 rounded-full blur-[80px]" />
                
                {/* Main Office Image */}
                <div className="relative z-10 w-[70%] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-white">
                  <Image 
                    src={dynamicAbout.officeImgMain || "/nextzen_team.webp"}
                    alt="Ecare Team Workspace"
                    fill
                    className="object-cover"
                    sizes="(max-w-768px) 100vw, 400px"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold">
                    {locale === "bn" ? "আমাদের অফিস" : "Our Office"}
                  </div>
                </div>

                {/* Floating Image 1 (Work Collaboration) */}
                <div className="absolute -top-6 right-2 z-0 w-[45%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-white transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={dynamicAbout.officeImgSub1 || "/static/images/office-work.png"}
                    alt="Work Collaboration"
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>

                {/* Floating Image 2 (Office Recreation) */}
                <div className="absolute -bottom-8 left-4 z-20 w-[42%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-white transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={dynamicAbout.officeImgSub2 || "/static/images/office-pingpong.png"}
                    alt="Office Recreation"
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Team Members List Section */}
        <Section padding="lg" className="border-t border-border/40 bg-zinc-50/30 dark:bg-transparent relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-75 pointer-events-none" />
          
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                {locale === "bn" ? (
                  <>
                    আমাদের <span className="text-[#e8000e]">টিম</span>
                  </>
                ) : (
                  <>
                    Meet Our <span className="text-[#e8000e]">Team</span>
                  </>
                )}
              </h2>
              <p className="text-muted-foreground text-lg">
                {tTeam("subtitle")}
              </p>
            </div>

            <TeamGrid 
              teamList={teamList} 
              translations={{
                skills: tTeam("skills"),
                connect: tTeam("connect"),
              }} 
            />
          </Container>
        </Section>

        {/* CTA SECTION */}
        <Section padding="none" className="relative overflow-hidden bg-white dark:bg-[#070b13] pb-16 border-t border-border">
          {/* Team Image Banner with Gradient Fade */}
          <div className="relative w-full h-[240px] sm:h-[320px] md:h-[400px]">
            <Image
              src="/nextzen_team.webp"
              alt="Ecare Team"
              fill
              className="object-cover object-top"
              priority
            />
            {/* Smooth mask to transition the image into the background */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-[#070b13] dark:via-[#070b13]/50 pointer-events-none" />
          </div>

          <Container className="relative z-10 -mt-12 md:-mt-20 text-center max-w-4xl mx-auto space-y-6">
            <div className="space-y-3.5">
              <span className="text-[10px] md:text-xs font-extrabold text-primary dark:text-white/85 tracking-widest uppercase block">
                {tHome("ctaGetToKnowUs")}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-[36px] font-extrabold text-primary dark:text-white tracking-tight leading-tight max-w-3xl mx-auto">
                {tHome("ctaTitle")}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
                {tHome("ctaSub")}
              </p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto pt-1">
              <p className="text-[12px] sm:text-xs text-muted-foreground leading-relaxed">
                {tHome("ctaTrustDescription")}
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
              <Button variant="outline" className="border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 text-[10px] sm:text-xs font-bold tracking-wider uppercase h-10 px-6 rounded shadow-sm" asChild>
                <Link href="/contact">{tHome("ctaBtn")}</Link>
              </Button>
              <Button variant="outline" className="border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 text-[10px] sm:text-xs font-bold tracking-wider uppercase h-10 px-6 rounded shadow-sm" asChild>
                <Link href="/contact">{tHome("ctaContactBtn")}</Link>
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
