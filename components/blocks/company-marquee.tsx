"use client";

import Image from "next/image";

const companyLogos = [
  { src: "/company/Logo-1.png", alt: "Luxor Cosmetics" },
  { src: "/company/Logo-2.png", alt: "Saifex" },
  { src: "/company/Logo3.png", alt: "HBCI" },
  { src: "/company/Logo4.png", alt: "Nandanik" },
  { src: "/company/Logo5.png", alt: "Logo 5" },
  { src: "/company/Logo6.png", alt: "Logo 6" },
  { src: "/company/Logo7.png", alt: "Logo 7" },
  { src: "/company/Logo8.png", alt: "Logo 8" },
  { src: "/company/Logo9.png", alt: "Logo 9" },
  { src: "/company/Logo10.png", alt: "Logo 10" },
  { src: "/company/Logo11.png", alt: "Logo 11" },
  { src: "/company/Logo12.png", alt: "Logo 12" },
  { src: "/company/Logo13.png", alt: "Logo 13" },
];

export default function CompanyMarquee() {
  return (
    <div className="w-full py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
        {companyLogos.map((logo, i) => (
          <div 
            key={`logo-${i}`} 
            className="w-full h-20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs border border-slate-200/40 dark:border-slate-800/40 rounded-2xl p-4 flex items-center justify-center filter grayscale opacity-60 dark:opacity-40 hover:filter-none hover:opacity-100 hover:scale-105 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
          >
            <div className="relative w-full h-full">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 128px, 160px"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
