import type { RefObject } from "react";

import { useState, useCallback, useRef } from "react";

import { useImageEditorContext } from "../ImageEditorProvider.tsx";

type UseBrushOptions = {
  /** Function to convert screen coordinates to image coordinates */
  screenToImage: (
    clientX: number,
    clientY: number,
    containerRect: DOMRect,
  ) => { x: number; y: number };
  /** Brush size in pixels */
  brushSize?: number;
  /** Ref to container element for reading CSS variables */
  containerRef?: RefObject<HTMLElement | null>;
};

type UseBrushReturn = {
  /** Whether brush stroke is active */
  isDrawing: boolean;
  /** Start drawing at position */
  startDraw: (
    ctx: CanvasRenderingContext2D,
    clientX: number,
    clientY: number,
    containerRect: DOMRect,
  ) => void;
  /** Continue drawing to position */
  continueDraw: (
    ctx: CanvasRenderingContext2D,
    clientX: number,
    clientY: number,
    containerRect: DOMRect,
  ) => void;
  /** End drawing */
  endDraw: () => void;
};

// Default mask color (fallback if CSS variable not set)
const DEFAULT_MASK_COLOR = "#87e64b";

/**
 * Get the mask color from CSS variable or fallback to default
 * Reads from the provided element to get the correct themed value
 */
function getMaskColor(element: HTMLElement | null): string {
  if (typeof window === "undefined" || !element) return DEFAULT_MASK_COLOR;
  const color = getComputedStyle(element).getPropertyValue(
    "--color-surface-interactive-primary",
  );
  return color.trim() || DEFAULT_MASK_COLOR;
}

/**
 * Hook for managing brush drawing state
 */
export function useBrush({
  screenToImage,
  brushSize = 32,
  containerRef,
}: UseBrushOptions): UseBrushReturn {
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const { toolMode } = useImageEditorContext();
  const isEraser = toolMode === "eraser";

  // Draw a circle at position (in image coordinates)
  const drawCircle = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      if (isEraser) {
        // Eraser mode: use destination-out to clear
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = getMaskColor(containerRef?.current ?? null);
      }
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    },
    [brushSize, isEraser, containerRef],
  );

  // Draw a line between two points (in image coordinates)
  const drawLine = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      from: { x: number; y: number },
      to: { x: number; y: number },
    ) => {
      if (isEraser) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = getMaskColor(containerRef?.current ?? null);
      }
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    },
    [brushSize, isEraser, containerRef],
  );

  // Start drawing
  const startDraw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      clientX: number,
      clientY: number,
      containerRect: DOMRect,
    ) => {
      const point = screenToImage(clientX, clientY, containerRect);
      setIsDrawing(true);
      lastPointRef.current = point;
      drawCircle(ctx, point.x, point.y);
    },
    [screenToImage, drawCircle],
  );

  // Continue drawing
  const continueDraw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      clientX: number,
      clientY: number,
      containerRect: DOMRect,
    ) => {
      if (!isDrawing || !lastPointRef.current) return;

      const point = screenToImage(clientX, clientY, containerRect);
      drawLine(ctx, lastPointRef.current, point);
      lastPointRef.current = point;
    },
    [isDrawing, screenToImage, drawLine],
  );

  // End drawing
  const endDraw = useCallback(() => {
    setIsDrawing(false);
    lastPointRef.current = null;
  }, []);

  return {
    isDrawing,
    startDraw,
    continueDraw,
    endDraw,
  };
}
