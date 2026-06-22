"use client";

// Justification for Client Component:
// Interactive Category Filtering is performed client-side to ensure zero layout-shift and instant rendering performance 
// without requiring round-trips to the server or full page reloads, maximizing WCAG responsiveness.

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Portfolio as Product } from "@/lib/content";

interface ExtendedProduct extends Product {
  _id?: string;
  productType?: "internal" | "external";
  demoUrl?: string;
}

interface ProductFilterListProps {
  initialItems: Product[];
  allLabel: string;
  viewDetailsLabel: string;
  caseStudyLabel: string;
}

export default function ProductFilterList({
  initialItems,
  allLabel,
  viewDetailsLabel,
  caseStudyLabel,
}: ProductFilterListProps) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // Extract all categories dynamically
  const categories = ["ALL", ...Array.from(new Set(initialItems.map((item) => item.category)))];

  // Filter items based on chosen category
  const filteredItems =
    activeCategory === "ALL"
      ? initialItems
      : initialItems.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            onClick={() => setActiveCategory(cat)}
            className="rounded-full"
          >
            {cat === "ALL" ? allLabel : cat}
          </Button>
        ))}
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => {
          const extItem = item as ExtendedProduct;
          const isExternal = extItem.productType === "external" || (extItem._id && extItem.productType !== "internal");

          return (
            <Card key={item.slug} className="flex flex-col justify-between overflow-hidden hover:border-primary/50 transition-all duration-300">
              <div className="relative w-full aspect-video border-b border-border bg-muted">
                <Image
                  src={item.cover}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <CardHeader>
                <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  {item.category}
                </div>
                <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="outline" size="sm" asChild>
                    {isExternal ? (
                      <a href={extItem.demoUrl || "#"} target="_blank" rel="noopener noreferrer">
                        {viewDetailsLabel}
                      </a>
                    ) : (
                      <Link href={`/products/${item.slug}`}>{viewDetailsLabel}</Link>
                    )}
                  </Button>
                  {item.caseStudy && (
                    <Button variant="link" size="sm" asChild className="p-0">
                      <Link href={`/case-studies/${item.caseStudy}`}>{caseStudyLabel} &rarr;</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
