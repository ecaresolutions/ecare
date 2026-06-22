"use client";

import Image from "next/image";

const companyLogos = [
  { src: "/company/Logo-1.png", alt: "Company Logo 1" },
  { src: "/company/Logo-2.png", alt: "Company Logo 2" },
  { src: "/company/Logo3.png", alt: "Company Logo 3" },
  { src: "/company/Logo4.png", alt: "Company Logo 4" },
  { src: "/company/Logo5.png", alt: "Company Logo 5" },
  { src: "/company/Logo6.png", alt: "Company Logo 6" },
  { src: "/company/Logo7.png", alt: "Company Logo 7" },
  { src: "/company/Logo8.png", alt: "Company Logo 8" },
  { src: "/company/Logo9.png", alt: "Company Logo 9" },
  { src: "/company/Logo10.png", alt: "Company Logo 10" },
  { src: "/company/Logo11.png", alt: "Company Logo 11" },
  { src: "/company/Logo12.png", alt: "Company Logo 12" },
  { src: "/company/Logo13.png", alt: "Company Logo 13" },
];

export default function CompanyMarquee() {
  return (
    <div className="w-full py-6 md:py-10 relative overflow-hidden">
      {/* Self-contained keyframes and animation utility for bulletproof sliding */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% - 1.25rem));
          }
        }
        .custom-marquee-run {
          animation: marquee-slide 35s linear infinite;
        }
        .custom-marquee-run:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Sleek fade mask overlay on left & right edges for premium look */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-36 bg-gradient-to-r from-background via-background/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-36 bg-gradient-to-l from-background via-background/90 to-transparent z-10 pointer-events-none" />

      {/* Marquee Wrapper */}
      <div className="flex gap-5 overflow-hidden">
        {/* Marquee content group 1 */}
        <div className="flex shrink-0 gap-5 items-center custom-marquee-run w-max">
          {companyLogos.map((logo, i) => (
            <div key={`logo-1-${i}`} className="relative h-16 w-32 md:w-40 flex-shrink-0 flex items-center justify-center filter grayscale opacity-50 dark:opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={50}
                className="object-contain max-h-10 md:max-h-12 w-auto"
                sizes="(max-width: 768px) 128px, 160px"
              />
            </div>
          ))}
        </div>

        {/* Marquee content group 2 (Duplicate for loop) */}
        <div className="flex shrink-0 gap-5 items-center custom-marquee-run w-max" aria-hidden="true">
          {companyLogos.map((logo, i) => (
            <div key={`logo-2-${i}`} className="relative h-16 w-32 md:w-40 flex-shrink-0 flex items-center justify-center filter grayscale opacity-50 dark:opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={50}
                className="object-contain max-h-10 md:max-h-12 w-auto"
                sizes="(max-width: 768px) 128px, 160px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
