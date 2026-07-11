"use client";

import Script from "next/script";

interface ElevenLabsWidgetProps {
  agentId: string;
  isEnabled: boolean;
}

export default function ElevenLabsWidget({ agentId, isEnabled }: ElevenLabsWidgetProps) {
  if (!isEnabled || !agentId) return null;

  return (
    <>
      {/* Inject styling to position the widget to the bottom-left corner with enough margin to prevent clipping */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            elevenlabs-convai {
              position: fixed !important;
              bottom: 40px !important;
              left: 50px !important;
              right: auto !important;
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
