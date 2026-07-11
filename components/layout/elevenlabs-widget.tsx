"use client";

import { useEffect } from "react";

interface ElevenLabsWidgetProps {
  agentId: string;
  isEnabled: boolean;
}

export default function ElevenLabsWidget({ agentId, isEnabled }: ElevenLabsWidgetProps) {
  useEffect(() => {
    if (!isEnabled || !agentId) return;

    // Load the ElevenLabs convai widget script
    const script = document.createElement("script");
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    // Create and append the custom widget element
    const widget = document.createElement("elevenlabs-convai");
    widget.setAttribute("agent-id", agentId);
    document.body.appendChild(widget);

    return () => {
      // Cleanup on unmount/re-render
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.body.contains(widget)) {
        document.body.removeChild(widget);
      }
    };
  }, [agentId, isEnabled]);

  return null;
}
