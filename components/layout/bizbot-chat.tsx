"use client";

import { useEffect, useState } from "react";

export default function BizBotChat() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = "anw2-sdk-6-e41MzrljWed_hhVGDRog";
    // Avoid loading the script twice
    if (document.getElementById(id)) {
      setIsLoaded(true);
      return;
    }

    const js = document.createElement("script");
    js.id = id;
    js.src =
      "https://api.bizbot.one/widget2/load?id=d4b8e7eb-ebcc-3596-9e77-f8615460d1a2&r=" +
      encodeURIComponent(window.location.href);
    js.async = true;
    js.onload = () => setIsLoaded(true);
    document.body.appendChild(js);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  const handleClick = () => {
    // Try to trigger BizBot widget open
    const bizBotBtn = document.querySelector(
      '[class*="bizbot"], [id*="bizbot"], [class*="anw2"], [id*="anw2"], iframe[src*="bizbot"]'
    ) as HTMLElement | null;

    if (bizBotBtn) {
      bizBotBtn.click();
    } else {
      // Fallback: find any floating widget button at bottom-right
      const allBtns = document.querySelectorAll(
        'div[style*="position: fixed"], button[style*="position: fixed"]'
      );
      allBtns.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > window.innerHeight - 120 && rect.right > window.innerWidth - 120) {
          (el as HTMLElement).click();
        }
      });
    }
  };

  return (
    <>
      {/* Custom floating chat button */}
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer group overflow-hidden border-0 p-0 flex items-center justify-center"
        style={{ backgroundColor: "var(--color-primary)" }}
        aria-label="Open Live Chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="10" r="0.8" fill="white" stroke="none" />
          <circle cx="12" cy="10" r="0.8" fill="white" stroke="none" />
          <circle cx="15" cy="10" r="0.8" fill="white" stroke="none" />
        </svg>
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full animate-ping bg-primary/20 pointer-events-none" />
      </button>

      {/* Hide BizBot's default button */}
      <style jsx global>{`
        #anw2-launcher-6-e41MzrljWed_hhVGDRog {
          background-color: transparent !important;
        }
        [id*="anw2"] > div[style*="position: fixed"],
        [class*="anw2-widget-button"],
        [class*="bizbot-widget-button"] {
          opacity: 0 !important;
          pointer-events: none !important;
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
        }
      `}</style>
    </>
  );
}
