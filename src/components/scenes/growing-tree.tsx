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
          "--chart-1": "#9aa35a",
          "--chart-2": "#737938",
          "--chart-4": "#868c46",
          "--chart-5": "#4a8a5c",
          "--muted-foreground": "#5a5f38",
          "--border": "rgba(90, 95, 56, 0.2)",
          "--foreground": "#2f3120",
        } as React.CSSProperties
      }
    />
  );
}
