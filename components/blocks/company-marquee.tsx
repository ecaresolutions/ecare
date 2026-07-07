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
  const companyLogosReverse = [...companyLogos].reverse();

  return (
    <div className="w-full py-4 md:py-6 relative overflow-hidden space-y-4">
      {/* Self-contained keyframes and animation utility for dual-row reverse sliding */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-slide-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-slide-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .marquee-track-left {
          display: flex;
          width: max-content;
          gap: 0;
          animation: marquee-slide-left 45s linear infinite;
        }
        .marquee-track-right {
          display: flex;
          width: max-content;
          gap: 0;
          animation: marquee-slide-right 45s linear infinite;
        }
        .marquee-track-left:hover, .marquee-track-right:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Sleek fade mask overlay on left & right edges for premium look */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-36 bg-gradient-to-r from-background via-background/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-36 bg-gradient-to-l from-background via-background/90 to-transparent z-10 pointer-events-none" />

      {/* Row 1: Right to Left */}
      <div className="overflow-hidden py-1">
        <div className="marquee-track-left">
          {/* Group 1 */}
          <div className="flex shrink-0 gap-4 items-center pr-4">
            {companyLogos.map((logo, i) => (
              <div 
                key={`logo-left-1-${i}`} 
                className="relative w-28 h-12 md:w-36 md:h-16 flex-shrink-0 bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40 rounded-xl p-1.5 flex items-center justify-center filter grayscale opacity-60 dark:opacity-45 hover:filter-none hover:opacity-100 hover:scale-105 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Group 2 */}
          <div className="flex shrink-0 gap-4 items-center pr-4" aria-hidden="true">
            {companyLogos.map((logo, i) => (
              <div 
                key={`logo-left-2-${i}`} 
                className="relative w-28 h-12 md:w-36 md:h-16 flex-shrink-0 bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40 rounded-xl p-1.5 flex items-center justify-center filter grayscale opacity-60 dark:opacity-45 hover:filter-none hover:opacity-100 hover:scale-105 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Left to Right */}
      <div className="overflow-hidden py-1">
        <div className="marquee-track-right">
          {/* Group 1 */}
          <div className="flex shrink-0 gap-4 items-center pr-4">
            {companyLogosReverse.map((logo, i) => (
              <div 
                key={`logo-right-1-${i}`} 
                className="relative w-28 h-12 md:w-36 md:h-16 flex-shrink-0 bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40 rounded-xl p-1.5 flex items-center justify-center filter grayscale opacity-60 dark:opacity-45 hover:filter-none hover:opacity-100 hover:scale-105 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Group 2 */}
          <div className="flex shrink-0 gap-4 items-center pr-4" aria-hidden="true">
            {companyLogosReverse.map((logo, i) => (
              <div 
                key={`logo-right-2-${i}`} 
                className="relative w-28 h-12 md:w-36 md:h-16 flex-shrink-0 bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40 rounded-xl p-1.5 flex items-center justify-center filter grayscale opacity-60 dark:opacity-45 hover:filter-none hover:opacity-100 hover:scale-105 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
