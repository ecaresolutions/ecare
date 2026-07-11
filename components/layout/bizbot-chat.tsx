"use client";

import { useEffect, useState } from "react";

export default function BizBotChat() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = "anw2-sdk-6-e41MzrljWed_hhVGDRog";
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

  return (
    <>
      {/* Custom floating chat button (renders behind the transparent native button) */}
      <div
        className="fixed bottom-6 left-6 z-[9998] w-16 h-16 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 pointer-events-none flex items-center justify-center"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="10" r="0.8" fill="white" stroke="none" />
          <circle cx="12" cy="10" r="0.8" fill="white" stroke="none" />
          <circle cx="15" cy="10" r="0.8" fill="white" stroke="none" />
        </svg>
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
      </div>

      {/* Reposition BizBot's native launcher to bottom-left and make it transparent but clickable on top of our custom button */}
      <style jsx global>{`
        #anw2-launcher-6-e41MzrljWed_hhVGDRog,
        [id*="anw2-launcher"],
        [class*="bizbot-launcher"],
        [id*="anw2"] > div[style*="position: fixed"],
        [class*="anw2-widget-button"],
        [class*="bizbot-widget-button"] {
          position: fixed !important;
          bottom: 24px !important;
          left: 24px !important;
          right: auto !important;
          width: 64px !important;
          height: 64px !important;
          opacity: 0.001 !important; /* Make it invisible but layouted */
          pointer-events: auto !important; /* Allow user clicks */
          visibility: visible !important;
          display: block !important;
          z-index: 9999 !important; /* Keep it on top of our custom button */
          cursor: pointer !important;
        }

        /* Align BizBot open chat window iframe to the left */
        iframe[src*="bizbot.one"],
        iframe[src*="api.bizbot.one"],
        [id*="anw2"] iframe,
        [class*="bizbot"] iframe {
          left: 24px !important;
          right: auto !important;
        }
      `}</style>
    </>
  );
}
