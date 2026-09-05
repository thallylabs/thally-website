"use client";

import { SiClaude, SiCursor, SiGithubcopilot, SiGooglegemini, SiPerplexity, SiWindsurf } from "react-icons/si";

import { PartnerStrip } from "@/components/feature-template/feature-template";

const AI_TOOLS = [
  { name: "Claude", icon: <SiClaude /> },
  { name: "Cursor", icon: <SiCursor /> },
  { name: "Copilot", icon: <SiGithubcopilot /> },
  { name: "Perplexity", icon: <SiPerplexity /> },
  { name: "Gemini", icon: <SiGooglegemini /> },
  { name: "Windsurf", icon: <SiWindsurf /> },
];

export function AiRisk() {
  return (
    <PartnerStrip
      title="Stale docs no longer mislead one reader at a time."
      description="When an old API or workflow remains documented, AI tools can recommend it, generate it into code, and repeat the mistake at scale. Thally serves people and AI tools from the same source, then updates that source when the product changes."
      items={AI_TOOLS}
    />
  );
}
