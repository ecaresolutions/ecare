"use client";

import { useState } from "react";
import { ShoppingCart, Check, Plus, Minus, Shield, Award, Users, Globe, ExternalLink, Eye, Image as ImageIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";
import { useTranslations } from "next-intl";

interface EnvatoCheckoutCardProps {
  itemTitle: string;
  slug: string;
  image?: string;
  caseStudyUrl?: string;
  demoUrl?: string;
  price?: number;
  supportPrice?: number;
  features?: string[];
}

export default function EnvatoCheckoutCard({ 
  itemTitle, 
  slug,
  image,
  caseStudyUrl, 
  demoUrl,
  price,
  supportPrice,
  features 
}: EnvatoCheckoutCardProps) {
  const t = useTranslations("Cart");
  const [licenseType, setLicenseType] = useState<"regular" | "extended">("regular");
  const [quantity, setQuantity] = useState<number>(1);
  const [extendSupport, setExtendSupport] = useState<boolean>(false);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const regularPrice = price ?? 24;
  const extendedPrice = regularPrice * 35;
  const supportVal = supportPrice ?? 7.13;

  const getBasePrice = () => {
    return licenseType === "regular" ? regularPrice : extendedPrice;
  };

  const getPrice = () => {
    let base = getBasePrice();
    if (extendSupport) {
      base += supportVal;
    }
    return (base * quantity).toFixed(2);
  };

  const handleAddToCart = () => {
    addToCart({
      slug,
      title: itemTitle,
      price: getBasePrice(),
      licenseType,
      extendSupport,
      supportPrice: supportVal,
      quantity,
      image,
    });
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Main Buy Box */}
      <div className="bg-white dark:bg-[#121824] border border-[#e1e4e6] dark:border-slate-800 rounded-lg p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        {/* License Selector & Price Header */}
        <div className="flex justify-between items-start mb-6 border-b border-[#f0f2f3] dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <select
              value={licenseType}
              onChange={(e) => setLicenseType(e.target.value as "regular" | "extended")}
              className="font-bold text-slate-800 dark:text-white bg-transparent border-none focus:outline-none cursor-pointer text-lg p-0"
            >
              <option value="regular">Regular License</option>
              <option value="extended">Extended License</option>
            </select>
            <p className="text-xs text-muted-foreground underline cursor-pointer hover:text-foreground">
              License details
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-[#333] dark:text-white flex items-start justify-end">
              <span className="text-sm font-bold mt-1.5 mr-0.5">$</span>
              {getBasePrice()}
            </div>
          </div>
        </div>

        {/* Feature List */}
        <ul className="space-y-3 mb-6 text-sm text-[#545454] dark:text-[#98a3b3]">
          {features && features.length > 0 ? (
            features.map((feat, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E8000E] shrink-0" />
                <span>{feat}</span>
              </li>
            ))
          ) : (
            <>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E8000E] shrink-0" />
                <span>Quality checked by Ecare</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E8000E] shrink-0" />
                <span>Future updates included</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E8000E] shrink-0" />
                <span>6 months support from Ecare</span>
              </li>
            </>
          )}
        </ul>

        {/* Extend Support Checkbox */}
        <div className="border border-[#e1e4e6] dark:border-slate-800 rounded-lg p-4 mb-6 flex items-start gap-3 bg-[#fafafa] dark:bg-[#182030]/30">
          <input
            type="checkbox"
            id="extend"
            checked={extendSupport}
            onChange={(e) => setExtendSupport(e.target.checked)}
            className="mt-1 accent-[#E8000E] cursor-pointer"
          />
          <label htmlFor="extend" className="text-xs text-slate-600 dark:text-slate-300 leading-normal cursor-pointer flex-1">
            <div className="flex justify-between font-bold text-slate-700 dark:text-white">
              <span>Extend support to 12 months</span>
              <span className="text-[#E8000E]">+${supportVal}</span>
            </div>
            <p className="text-muted-foreground mt-0.5">Keep receiving updates and custom code assistance from our developer team.</p>
          </label>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Quantity:</span>
          <div className="flex items-center border border-[#e1e4e6] dark:border-slate-800 rounded-lg overflow-hidden bg-[#fafafa] dark:bg-[#182030]/20">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-4 text-sm font-bold text-slate-800 dark:text-white w-10 text-center select-none">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleAddToCart}
            className="w-full text-sm font-bold uppercase tracking-wider h-12 rounded-lg bg-[#E8000E] hover:bg-[#c6000c] text-white flex items-center justify-center gap-2 border-b-2 border-[#a0000a] cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            {addedToCart ? t("added") : t("add")}
          </Button>

          {demoUrl && (
            <Button
              variant="outline"
              asChild
              className="w-full text-sm font-bold uppercase tracking-wider h-12 rounded-lg border-[#e1e4e6] dark:border-slate-800 hover:bg-[#f5f6f7] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Preview
              </a>
            </Button>
          )}
        </div>

        <p className="text-[10px] text-center text-muted-foreground mt-4 italic">
          Price is in US dollars and excludes local sales tax
        </p>
      </div>
    </div>
  );
}
