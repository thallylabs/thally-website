"use client";

import { useEffect, useRef } from "react";

import { createEmptyStateSceneController } from "./empty-state-scenes";

/**
 * The Thally Cloud growing-tree canvas scene (dashboard empty states),
 * pinned to the cloud app's olive palette so it renders identically on
 * the marketing site's cream cards regardless of theme tokens.
 */
export function GrowingTree({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const controller = createEmptyStateSceneController(canvas, "tree");
    return () => controller.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={
        {
          // Brightened olives so the scene reads on the dark card art.
          "--chart-1": "#c3d06e",
          "--chart-2": "#9aa35a",
          "--chart-4": "#aebb6a",
          "--chart-5": "#7fae74",
          "--muted-foreground": "#8a8f5a",
          "--border": "rgba(174, 187, 106, 0.25)",
          "--foreground": "#c6e278",
        } as React.CSSProperties
      }
    />
  );
}
