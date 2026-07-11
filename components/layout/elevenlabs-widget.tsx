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
      {/* Render the custom element directly in the DOM using dangerouslySetInnerHTML to bypass TypeScript JSX checks */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<elevenlabs-convai agent-id="${agentId}"></elevenlabs-convai>`
        }}
      />
      
      {/* Load ElevenLabs script wrapper */}
      <Script
        src="https://elevenlabs.io/convai-widget/index.js"
        strategy="lazyOnload"
      />
    </>
  );
}
