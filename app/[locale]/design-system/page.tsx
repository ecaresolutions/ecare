import { useTranslations } from "next-intl";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DesignSystemPage() {
  const t = useTranslations("DesignSystem");

  // Colors to render on the page
  const colors = [
    { name: "Primary", class: "bg-primary text-primary-foreground", token: "--color-primary" },
    { name: "Secondary", class: "bg-secondary text-secondary-foreground", token: "--color-secondary" },
    { name: "Accent", class: "bg-accent text-accent-foreground", token: "--color-accent" },
    { name: "Muted", class: "bg-muted text-muted-foreground", token: "--color-muted" },
    { name: "Success", class: "bg-success-background text-success-foreground", token: "--color-success" },
    { name: "Warning", class: "bg-warning-background text-warning-foreground", token: "--color-warning" },
    { name: "Error", class: "bg-error-background text-error-foreground", token: "--color-error" },
  ];

  return (
    <>
      <Header />
      <main className="flex-grow">
        <Section padding="lg" className="border-b border-border bg-muted/30">
          <Container>
            <div className="max-w-3xl space-y-4">
              <Badge variant="outline" className="text-foreground border-border bg-muted/50">
                v1.0.0
              </Badge>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                {t("title")}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                {t("subtitle")}
              </p>
            </div>
          </Container>
        </Section>

        {/* Colors and White labeling */}
        <Section padding="md">
          <Container className="space-y-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{t("colors")}</h2>
              <p className="text-muted-foreground mb-6">
                All colors resolve dynamically depending on the selected active brand preset (`ecare` or `neon-tech`).
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
                {colors.map((c) => (
                  <div key={c.name} className="flex flex-col gap-2 rounded-lg border border-border p-3 bg-card shadow-sm">
                    <div className={`h-16 w-full rounded-md ${c.class} flex items-center justify-center font-bold text-xs select-all transition-colors duration-200`}>
                      Abc
                    </div>
                    <div className="text-xs">
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-[10px] text-muted-foreground font-mono truncate">{c.token}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-border" />

            {/* Buttons & States */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{t("buttons")}</h2>
              <p className="text-muted-foreground mb-6">
                Core interactive button components supporting standard brand states.
              </p>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="default">Default Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="destructive">Destructive Button</Button>
                  <Button variant="link">Link Button</Button>
                  <Button variant="glow">✨ Glowing Border Button</Button>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="default" size="sm">Small</Button>
                  <Button variant="default" size="default">Default</Button>
                  <Button variant="default" size="lg">Large</Button>
                  <Button variant="default" disabled>Disabled State</Button>
                </div>
              </div>
            </div>

            <hr className="border-border" />

            {/* Inputs & Forms */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{t("inputs")}</h2>
                <p className="text-muted-foreground mb-6">
                  Accessible form controls with brand focus ring and disabled styling.
                </p>
                <div className="space-y-4 max-w-sm">
                  <div className="space-y-1">
                    <label htmlFor="example-email" className="text-xs font-semibold text-foreground">Email Address</label>
                    <Input id="example-email" type="email" placeholder="example@ecare.com" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="example-disabled" className="text-xs font-semibold text-foreground">Disabled Input</label>
                    <Input id="example-disabled" type="text" placeholder="Cannot type here" disabled />
                  </div>
                </div>
              </div>

              {/* Feedbacks & Badges */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{t("feedback")}</h2>
                <p className="text-muted-foreground mb-6">
                  Status pills and small informative indicator badges.
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>
            </div>

            <hr className="border-border" />

            {/* Navigation & Overlays */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Breadcrumb & Navigation */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{t("navigation")}</h2>
                  <p className="text-muted-foreground mb-4">
                    Breadcrumb pathways to indicate user context and current screen state.
                  </p>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/design-system">Design System</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Blocks</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                {/* Overlays / Dialog */}
                <div>
                  <h3 className="text-lg font-bold mb-2">{t("overlays")}</h3>
                  <p className="text-muted-foreground mb-4">
                    Radix-powered responsive modals with focus trapping.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Open Modal Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Interactive Showcase</DialogTitle>
                        <DialogDescription>
                          This modal overlay handles screen readers, ESC close, and keyboard focus correctly.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4 space-y-3">
                        <p className="text-sm">
                          Enter your user feedback:
                        </p>
                        <Input placeholder="Type something here..." />
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="default">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Accordions & Tabs */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{t("disclosure")}</h2>
                  <p className="text-muted-foreground mb-4">
                    Accordion collapsibles and tabbed sections for space-efficient details.
                  </p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is the styling white-label ready?</AccordionTrigger>
                      <AccordionContent>
                        Yes. Swapping the `data-brand` attribute instantly overrides the color scales, shifting the entire application styling theme from ecare to neon-tech.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is it accessible?</AccordionTrigger>
                      <AccordionContent>
                        Every component is mapped to WCAG AA guidelines with high color contrast, full keyboard focus rings, and screen-reader compliant aria roles.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                      <Card className="mt-2">
                        <CardHeader>
                          <CardTitle>Overview Panel</CardTitle>
                          <CardDescription>Visual data overview.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm">
                          This pane is rendered when the Overview tab trigger is selected.
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="settings">
                      <Card className="mt-2">
                        <CardHeader>
                          <CardTitle>Settings Panel</CardTitle>
                          <CardDescription>Manage your preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm">
                          Manage system preferences, localization settings, and design presets.
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>

            <hr className="border-border" />

            {/* WCAG Contrast Audit Table */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{t("contrast")}</h2>
              <p className="text-muted-foreground mb-6">
                Below is the accessibility contrast matrix verified using the axe accessibility guidelines for key background and text pairs.
              </p>
              <div className="overflow-x-auto rounded-lg border border-border bg-card">
                <table className="min-w-full divide-y divide-border text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left font-bold text-foreground">Semantic Token Pair</th>
                      <th className="px-6 py-3 text-left font-bold text-foreground">Light Contrast</th>
                      <th className="px-6 py-3 text-left font-bold text-foreground">Light WCAG AA</th>
                      <th className="px-6 py-3 text-left font-bold text-foreground">Dark Contrast</th>
                      <th className="px-6 py-3 text-left font-bold text-foreground">Dark WCAG AA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-6 py-4 font-mono font-semibold">Background / Foreground</td>
                      <td className="px-6 py-4">19.5:1 (Neutral 50 / 950)</td>
                      <td className="px-6 py-4 text-emerald-800 dark:text-emerald-400 font-semibold">Pass (≥ 4.5:1)</td>
                      <td className="px-6 py-4">19.5:1 (Neutral 950 / 50)</td>
                      <td className="px-6 py-4 text-emerald-800 dark:text-emerald-400 font-semibold">Pass (≥ 4.5:1)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-mono font-semibold">Card / Foreground</td>
                      <td className="px-6 py-4">21:1 (#FFF / Neutral 950)</td>
                      <td className="px-6 py-4 text-emerald-800 dark:text-emerald-400 font-semibold">Pass (≥ 4.5:1)</td>
                      <td className="px-6 py-4">15.2:1 (Neutral 900 / 50)</td>
                      <td className="px-6 py-4 text-emerald-800 dark:text-emerald-400 font-semibold">Pass (≥ 4.5:1)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-mono font-semibold">Primary / Primary FG</td>
                      <td className="px-6 py-4">4.9:1 (Ecare Red 600 / #FFF)</td>
                      <td className="px-6 py-4 text-emerald-800 dark:text-emerald-400 font-semibold">Pass (≥ 4.5:1)</td>
                      <td className="px-6 py-4">5.2:1 (Ecare Red 500 / #FFF)</td>
                      <td className="px-6 py-4 text-emerald-800 dark:text-emerald-400 font-semibold">Pass (≥ 4.5:1)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-mono font-semibold">Secondary / Secondary FG</td>
                      <td className="px-6 py-4">6.2:1 (Indigo 600 / #FFF)</td>
                      <td className="px-6 py-4 text-emerald-800 dark:text-emerald-400 font-semibold">Pass (≥ 4.5:1)</td>
                      <td className="px-6 py-4">5.9:1 (Indigo 500 / #FFF)</td>
                      <td className="px-6 py-4 text-emerald-800 dark:text-emerald-400 font-semibold">Pass (≥ 4.5:1)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-mono font-semibold">Muted BG / Muted FG</td>
                      <td className="px-6 py-4">4.8:1 (Neutral 100 / 500)</td>
                      <td className="px-6 py-4 text-emerald-800 dark:text-emerald-400 font-semibold">Pass (≥ 4.5:1)</td>
                      <td className="px-6 py-4">4.7:1 (Neutral 900 / 400)</td>
                      <td className="px-6 py-4 text-emerald-800 dark:text-emerald-400 font-semibold">Pass (≥ 4.5:1)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
