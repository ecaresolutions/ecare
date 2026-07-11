"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

interface ClarityInitializerProps {
  projectId: string;
  isEnabled: boolean;
}

export default function ClarityInitializer({ projectId, isEnabled }: ClarityInitializerProps) {
  useEffect(() => {
    if (isEnabled && projectId) {
      Clarity.init(projectId);
    }
  }, [projectId, isEnabled]);

  return null;
}
