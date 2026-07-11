"use client";

import { useEffect } from "react";
import Script from "next/script";

interface ElevenLabsWidgetProps {
  agentId: string;
  isEnabled: boolean;
}

export default function ElevenLabsWidget({ agentId, isEnabled }: ElevenLabsWidgetProps) {
  useEffect(() => {
    if (!isEnabled || !agentId) return;

    // Periodically check for the shadow DOM of the ElevenLabs custom element to inject style overrides
    const interval = setInterval(() => {
      const host = document.querySelector("elevenlabs-convai");
      if (host && host.shadowRoot) {
        // Check if we have already injected our style overrides inside the shadow root
        if (!host.shadowRoot.querySelector("#elevenlabs-left-override")) {
          const style = document.createElement("style");
          style.id = "elevenlabs-left-override";
          style.textContent = `
            /* Force all container divs and buttons inside the shadow DOM to align left */
            div, button, .widget-button, .convai-widget-button {
              left: 20px !important;
              right: auto !important;
            }
          `;
          host.shadowRoot.appendChild(style);
          clearInterval(interval);
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [agentId, isEnabled]);

  if (!isEnabled || !agentId) return null;

  return (
    <>
      {/* Target the host custom element directly in global CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            elevenlabs-convai {
              position: fixed !important;
              bottom: 20px !important;
              left: 0px !important;
              right: auto !important;
              width: 300px !important; /* Give it enough width to fit the button and text */
              height: 120px !important;
              z-index: 9999 !important;
            }
          `
        }}
      />

      {/* Render the custom element directly in the DOM using dangerouslySetInnerHTML to bypass TypeScript JSX checks */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<elevenlabs-convai agent-id="${agentId}"></elevenlabs-convai>`
        }}
      />
      
      {/* Load the official ElevenLabs convai widget script from unpkg */}
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="lazyOnload"
      />
    </>
  );
}
