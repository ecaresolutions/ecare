"use client";

import { useEffect, useState } from "react";
import { Check, Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function BrandSelector() {
  const [brand, setBrand] = useState<"ecare" | "neon-tech">("ecare");

  useEffect(() => {
    try {
      const savedBrand = localStorage.getItem("brand") as "ecare" | "neon-tech" | null;
      if (savedBrand) {
        setBrand(savedBrand);
        document.documentElement.setAttribute("data-brand", savedBrand);
      }
    } catch (e) {}
  }, []);

  const handleBrandChange = (newBrand: "ecare" | "neon-tech") => {
    setBrand(newBrand);
    try {
      localStorage.setItem("brand", newBrand);
    } catch (e) {}
    document.documentElement.setAttribute("data-brand", newBrand);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 select-none">
          <Palette className="h-4 w-4" />
          <span className="capitalize">{brand}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleBrandChange("ecare")} className="justify-between cursor-pointer">
          <span>Ecare (Red)</span>
          {brand === "ecare" && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleBrandChange("neon-tech")} className="justify-between cursor-pointer">
          <span>Neon Tech (Cyan)</span>
          {brand === "neon-tech" && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
