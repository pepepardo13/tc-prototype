import type { ImageEditorRef } from "../components/ImageEditor/ImageEditor.tsx";
import type { BrushSize } from "../components/Toolbar/BrushSize.ts";

import { useCallback, useRef, useState } from "react";

import { useImageEditorContext } from "../components/ImageEditorProvider.tsx";

export type UseBrushToolsReturn = {
  /** Current brush size */
  brushSize: BrushSize;
  /** Ref for the ImageEditor component */
  imageEditorRef: React.RefObject<ImageEditorRef | null>;
  /** Handler for brush size changes */
  onBrushSizeChange: (size: BrushSize) => void;
  /** Reset tools to default state */
  resetTools: () => void;
  /** Get extra form data (mask) for submission */
  getExtraFormData: () => Record<string, string> | undefined;
};

/**
 * Hook for managing brush/mask tool state for image editing.
 * Shared between landing page (pre-session) and job editor pages.
 */
export function useBrushTools(): UseBrushToolsReturn {
  const { setToolMode } = useImageEditorContext();
  const [brushSize, setBrushSize] = useState<BrushSize>("medium");
  const imageEditorRef = useRef<ImageEditorRef>(null);

  const onBrushSizeChange = useCallback((size: BrushSize) => {
    setBrushSize(size);
  }, []);

  const resetTools = useCallback(() => {
    setToolMode("pan");
  }, [setToolMode]);

  const getExtraFormData = useCallback(() => {
    const maskDataUrl = imageEditorRef.current?.getMaskDataUrl();
    if (maskDataUrl) {
      return { source_mask: maskDataUrl };
    }
    return undefined;
  }, []);

  return {
    brushSize,
    imageEditorRef,
    onBrushSizeChange,
    resetTools,
    getExtraFormData,
  };
}
