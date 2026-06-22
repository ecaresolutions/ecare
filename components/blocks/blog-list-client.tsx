"use client";

import { useState, useEffect, Suspense } from "react";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Blog } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FolderOpen, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface BlogListClientProps {
  posts: Blog[];
  allLabel: string;
  categoriesLabel: string;
  readMoreLabel: string;
  noPostsLabel: string;
}

function BlogListInner({
  posts,
  allLabel,
  categoriesLabel,
  readMoreLabel,
  noPostsLabel,
}: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 4;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Sync state with URL search param
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      setSelectedCategory(catParam);
    } else {
      setSelectedCategory("ALL");
    }
    setCurrentPage(1);
  }, [searchParams]);

  // Get all unique categories across all posts
  const allCategories = posts.reduce<Record<string, number>>((acc, post) => {
    if (post.categories && post.categories.length > 0) {
      post.categories.forEach((cat) => {
        acc[cat] = (acc[cat] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const categoryList = Object.entries(allCategories).map(([name, count]) => ({
    name,
    count,
  }));

  // Update URL search parameters when category changes
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "ALL") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  // Filter posts by selected category
  const filteredPosts =
    selectedCategory === "ALL"
      ? posts
      : posts.filter(
          (post) =>
            post.categories && post.categories.includes(selectedCategory)
        );

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Mobile Category Sidebar (Horizontal Scroll) */}
      <div className="lg:hidden col-span-1 space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
          {categoriesLabel}
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none snap-x">
          <button
            onClick={() => handleCategoryChange("ALL")}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
              selectedCategory === "ALL"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-muted hover:bg-muted-hover text-muted-foreground"
            }`}
          >
            {allLabel} ({posts.length})
          </button>
          {categoryList.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryChange(cat.name)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.name
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted hover:bg-muted-hover text-muted-foreground"
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid (Left Side on Desktop) */}
      <div className="lg:col-span-8 order-2 lg:order-1 space-y-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card/30">
            <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 stroke-1" />
            <p className="text-muted-foreground font-medium">{noPostsLabel}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {paginatedPosts.map((post) => (
                <Card
                  key={post.slug}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/40 bg-card hover:bg-card-hover/20 hover:border-primary/30 shadow-xs transition-all duration-300"
                >
                  <Link href={`/blog/${post.slug}`} className="cursor-pointer relative w-full aspect-[4/3] overflow-hidden bg-muted block">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20">
                        <FolderOpen className="w-12 h-12 text-primary/30" />
                      </div>
                    )}
                  </Link>

                  <div className="flex flex-col flex-grow p-6">
                    {/* Meta info matching User design: Date, Category */}
                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold tracking-wider text-muted-foreground uppercase mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary/70" />
                        {formatDate(post.date)}
                      </span>
                      <span>•</span>
                      {post.categories && post.categories.length > 0 && (
                        <span className="text-primary font-semibold">
                          {post.categories[0]}
                        </span>
                      )}
                    </div>

                    <CardHeader className="p-0 mb-3">
                      <CardTitle className="text-xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        <Link href={`/blog/${post.slug}`} className="hover:underline decoration-primary/40 underline-offset-4">
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 flex-grow space-y-4">
                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        {/* Reading time */}
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground/80 font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readingTime} min read
                        </span>

                        {/* Read More button */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all duration-300 hover:opacity-90"
                        >
                          {readMoreLabel}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-6">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-full border border-border bg-card text-foreground hover:bg-muted/80 disabled:opacity-40 disabled:hover:bg-card disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[40px] h-[40px] rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "border border-border bg-card text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-full border border-border bg-card text-foreground hover:bg-muted/80 disabled:opacity-40 disabled:hover:bg-card disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Desktop Category Sidebar (Right Side) */}
      <div className="hidden lg:block lg:col-span-4 order-1 lg:order-2 space-y-6 sticky top-24">
        <div className="p-6 rounded-3xl border border-border/40 bg-card/60 dark:bg-card/30 backdrop-blur-xs shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-primary" />
            {categoriesLabel}
          </h3>

          <div className="h-[1px] bg-border/40 w-full" />

          <ul className="space-y-1">
            <li>
              <button
                onClick={() => handleCategoryChange("ALL")}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  selectedCategory === "ALL"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                <span>{allLabel}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedCategory === "ALL"
                      ? "bg-primary-foreground/25 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {posts.length}
                </span>
              </button>
            </li>
            {categoryList.map((cat) => (
              <li key={cat.name}>
                <button
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat.name
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === cat.name
                        ? "bg-primary-foreground/25 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function BlogListClient(props: BlogListClientProps) {
  return (
    <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading...</div>}>
      <BlogListInner {...props} />
    </Suspense>
  );
}
