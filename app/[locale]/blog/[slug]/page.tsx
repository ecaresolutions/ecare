import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { getPostBySlug, getPosts } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, FolderOpen, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

interface BlogDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  
  const post = await getPostBySlug(locale, slug);
  if (!post) {
    notFound();
  }

  const allPosts = await getPosts(locale);

  // Get all unique categories across all posts for the sidebar count
  const allCategories = allPosts.reduce<Record<string, number>>((acc, p: any) => {
    if (p.categories && p.categories.length > 0) {
      p.categories.forEach((cat: string) => {
        acc[cat] = (acc[cat] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const categoryList = Object.entries(allCategories).map(([name, count]) => ({
    name,
    count,
  }));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Header />
      <main className="flex-grow overflow-hidden">
        {/* Main Content Area */}
        <Section padding="none" className="relative bg-[#f8fafc]/40 dark:bg-[#0b0f19]/10 pt-4 sm:pt-6 pb-8 sm:pb-12">
          {/* Glowing background blobs to maintain visual theme */}
          <div className="absolute top-[-10%] left-[-15%] w-[45%] aspect-square bg-cyan-200/20 dark:bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-[-5%] right-[-15%] w-[55%] aspect-square bg-purple-200/20 dark:bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

          <Container>
            {/* Back Button */}
            <div className="mb-4 relative z-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {t("back")}
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Post Details */}
              <article className="lg:col-span-8 order-2 lg:order-1 space-y-6">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-muted-foreground uppercase">
                  {post.categories && post.categories.length > 0 && (
                    <Link
                      href={`/blog?category=${post.categories[0]}`}
                      className="text-primary font-bold hover:underline"
                    >
                      {post.categories[0]}
                    </Link>
                  )}
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.date)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTime} min read
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                  {post.title}
                </h1>

                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-border/40 bg-muted shadow-sm">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 800px"
                    />
                  </div>
                )}

                {/* Excerpt */}
                <p className="text-lg leading-relaxed text-muted-foreground font-medium border-l-4 border-primary/50 pl-4 py-1 italic">
                  {post.excerpt}
                </p>

                {/* HTML Body content with robust CSS-in-JS selectors simulating Tailwind Typography */}
                <div 
                  className="prose-custom text-foreground/95 leading-relaxed space-y-6 font-sans
                    [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-foreground
                    [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-foreground
                    [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_p]:mb-4
                    [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-2 [&_ul]:text-muted-foreground [&_ul]:pl-4
                    [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-2 [&_ol]:text-muted-foreground [&_ol]:pl-4
                    [&_li]:text-muted-foreground
                    [&_pre]:p-5 [&_pre]:rounded-2xl [&_pre]:bg-muted/80 [&_pre]:border [&_pre]:border-border/50 [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre]:font-mono [&_pre]:text-sm
                    [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:bg-muted [&_code]:font-mono [&_code]:text-xs [&_code]:text-primary
                    [&_pre_code]:p-0 [&_pre_code]:bg-transparent [&_pre_code]:text-current [&_pre_code]:text-sm
                    [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
                    [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/30 hover:[&_a]:text-primary-hover"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>

              {/* Right Column: Category Sidebar linking back to List */}
              <div className="hidden lg:block lg:col-span-4 order-1 lg:order-2 space-y-6 sticky top-24">
                <div className="p-6 rounded-3xl border border-border/40 bg-card/60 dark:bg-card/30 backdrop-blur-xs shadow-xs space-y-4">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-primary" />
                    {t("categories")}
                  </h3>

                  <div className="h-[1px] bg-border/40 w-full" />

                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="/blog"
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 hover:bg-muted/80 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <span>{t("all")}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {allPosts.length}
                        </span>
                      </Link>
                    </li>
                    {categoryList.map((cat) => (
                      <li key={cat.name}>
                        <Link
                          href={`/blog?category=${cat.name}`}
                          className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 hover:bg-muted/80 text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          <span className="truncate">{cat.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            {cat.count}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
