import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import ContactForm from "@/components/blocks/contact-form";
import { getContactInfo } from "@/lib/content";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  HelpCircle, 
  Zap, 
  ArrowRight,
  LifeBuoy
} from "lucide-react";

export const dynamic = "force-dynamic";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  const contactInfo = await getContactInfo(locale);

  return (
    <>
      <Header />
      <main className="flex-grow overflow-hidden">
        {/* Hero Section with Glowing background blobs for consistency */}
        <Section className="relative overflow-x-clip py-12 md:py-16 border-b border-border/50 bg-[#f8fafc]/60 dark:bg-[#0b0f19]/40">
          <div className="absolute top-[-20%] left-[-15%] w-[45%] aspect-square bg-cyan-200/35 dark:bg-cyan-500/5 rounded-full blur-[120px] md:blur-[160px] pointer-events-none" />
          <div className="absolute top-[-10%] right-[-15%] w-[55%] aspect-square bg-purple-200/35 dark:bg-purple-500/5 rounded-full blur-[140px] md:blur-[180px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[25%] w-[35%] aspect-square bg-pink-200/25 dark:bg-pink-500/5 rounded-full blur-[100px] md:blur-[140px] pointer-events-none" />
          
          <Container className="text-center relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider animate-pulse-slow">
              <Zap className="w-3.5 h-3.5" />
              {locale === "bn" ? "যোগাযোগ" : "Contact"}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground via-foreground/90 to-primary/80 leading-none">
              {t("title")}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </Container>
        </Section>

        {/* Dual-Column Info & Form Section */}
        <Section padding="lg" className="relative bg-[#f8fafc]/40 dark:bg-[#0b0f19]/10">
          {/* Subtle background gradient blob */}
          <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
          
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct Contact Info Cards */}
              <div className="lg:col-span-5 space-y-8">
                {/* Highlighted Support Ticket Section */}
                <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 relative overflow-hidden shadow-[0_4px_20px_rgba(232,0,14,0.02)]">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full filter blur-xl pointer-events-none" />
                  
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-wider w-fit mb-4 animate-pulse">
                    <LifeBuoy className="w-3.5 h-3.5" />
                    {t("supportTicketBadge")}
                  </div>

                  <h3 className="text-lg font-extrabold text-foreground mb-2">
                    {t("supportTicketTitle")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {t("supportTicketDesc")}
                  </p>
                  <Button asChild size="sm" className="font-semibold shadow-sm bg-[#e8000e] hover:bg-[#e8000e]/90 text-white border-transparent transition-all duration-300">
                    <Link href="/support" className="inline-flex items-center gap-1.5">
                      {t("supportTicketBtn")}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    {locale === "bn" ? (
                      <>
                        সরাসরি <span className="text-[#e8000e]">যোগাযোগ</span> করুন
                      </>
                    ) : (
                      <>
                        Get in <span className="text-[#e8000e]">Touch</span> Directly
                      </>
                    )}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {locale === "bn"
                      ? "আমাদের সাথে যোগাযোগ করার বিভিন্ন উপায় নিচে দেওয়া হলো। যেকোনো প্রয়োজনে আমাদের মেইল করতে বা সরাসরি অফিসে যোগাযোগ করতে পারেন।"
                      : "Here are the direct ways to reach out. Feel free to drop an email, give us a call, or visit our headquarters."}
                  </p>
                </div>

                {/* Direct Contact Cards Grid */}
                <div className="space-y-4">
                  {/* Phone Card */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl border border-border/60 bg-white dark:bg-card hover:border-primary/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-orange-500 bg-orange-500/10 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t("phoneLabel")}</div>
                      <a href={`tel:${contactInfo?.phone || t("phoneValue")}`} className="text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors mt-1 block">
                        {contactInfo?.phone || t("phoneValue")}
                      </a>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl border border-border/60 bg-white dark:bg-card hover:border-primary/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-[#e8000e] bg-[#e8000e]/10 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t("emailLabel")}</div>
                      <a href={`mailto:${contactInfo?.email || t("emailValue")}`} className="text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors mt-1 block">
                        {contactInfo?.email || t("emailValue")}
                      </a>
                    </div>
                  </div>

                  {/* Location Card */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl border border-border/60 bg-white dark:bg-card hover:border-primary/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-blue-500 bg-blue-500/10 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t("officeLabel")}</div>
                      <p className="text-sm sm:text-base font-bold text-foreground mt-1 leading-relaxed">
                        {contactInfo?.address || t("officeValue")}
                      </p>
                    </div>
                  </div>

                  {/* Hours Card */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl border border-border/60 bg-white dark:bg-card hover:border-primary/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-emerald-500 bg-emerald-500/10 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t("hoursLabel")}</div>
                      <p className="text-sm sm:text-base font-bold text-foreground mt-1 leading-relaxed">
                        {contactInfo?.hours || t("hoursValue")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7 w-full lg:sticky lg:top-24 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    {t("formTitle")}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {t("formSubtitle")}
                  </p>
                </div>
                
                <ContactForm 
                  nameLabel={t("nameLabel")}
                  emailLabel={t("emailLabel")}
                  subjectLabel={t("subjectLabel")}
                  messageLabel={t("messageLabel")}
                  submitBtn={t("submitBtn")}
                  submittingText={t("submitting")}
                  successMsg={t("successMsg")}
                  errorMsg={t("errorMsg")}
                  productLabel={t("productLabel")}
                  productSelectLabel={t("productSelect")}
                  supportTypeLabel={t("supportTypeLabel")}
                  supportTypeSelectLabel={t("supportTypeSelect")}
                  supportTypeGeneral={t("supportTypeGeneral")}
                  supportTypeSales={t("supportTypeSales")}
                  supportTypeTech={t("supportTypeTech")}
                  supportTypePartner={t("supportTypePartner")}
                  orderIdLabel={t("orderIdLabel")}
                  className="shadow-sm border-border/85"
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* Google Map Section */}
        <Section padding="none" className="relative border-t border-border/40 bg-zinc-50/10 dark:bg-transparent">
          <Container className="py-12 md:py-16">
            <div className="space-y-4 mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                {locale === "bn" ? (
                  <>
                    আমাদের <span className="text-[#e8000e]">অবস্থান</span>
                  </>
                ) : (
                  <>
                    Our <span className="text-[#e8000e]">Location</span>
                  </>
                )}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                {locale === "bn" 
                  ? "সরাসরি আমাদের অফিসে আসার জন্য নিচে দেওয়া মানচিত্রটি অনুসরণ করুন।" 
                  : "Find us on the map. Feel free to drop by our office during business hours."}
              </p>
            </div>
            
            <div className="w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden border border-border/80 shadow-md relative">
              <iframe 
                src={contactInfo?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.1702587788484!2d90.37050587606775!3d23.74130248908882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b33cffc3c7%3A0x8c575069af1c30e7!2sDhanmondi%2C%20Dhaka%201209!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"} 
                className="w-full h-full border-none grayscale-[20%] dark:invert-[90%] dark:hue-rotate-[180deg]" 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
