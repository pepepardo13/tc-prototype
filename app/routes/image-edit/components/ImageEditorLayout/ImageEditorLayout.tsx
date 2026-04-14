import type { ImageReference } from "../../../../lib/types/generation.ts";
import type { UseBrushToolsReturn } from "../../hooks/useBrushTools.ts";
import type { ToolMode } from "../../types/ToolMode.ts";

import { Box, PageBlock, Stack } from "@envato/design-system/components";
import { useCallback, useEffect } from "react";

import { PromptBox } from "../../../../components/PromptBox/PromptBox.tsx";
import { useGlobalState } from "../../../../contexts/GlobalStateContext.tsx";
import { getExpandGeometry } from "../../utils/getExpandGeometry.ts";
import { ImageEditor } from "../ImageEditor/index.ts";
import { useImageEditorContext } from "../ImageEditorProvider.tsx";
import { Toolbar, BRUSH_SIZES } from "../Toolbar/Toolbar.tsx";

import styles from "./ImageEditorLayout.module.scss";

export type ImageEditorLayoutProps = {
  /** Brush tools state and callbacks from useBrushTools hook */
  brushTools: UseBrushToolsReturn;
  /** Image URL to display in the editor */
  imageUrl?: string | undefined;
  /** Whether the image is pending generation */
  isPending?: boolean;
  /** Form action URL for the prompt box */
  action: string;
  /** Whether the form is disabled (submitting) */
  disabled?: boolean;
  /** Source image for the next generation */
  sourceImage?: ImageReference | undefined;
  /** Default prompt text */
  defaultPrompt?: string | undefined;
  /** Reference images for style/content guidance */
  referenceImages?: Array<{ id: string; token: string; url: string | null }>;
  /** Callback when reference image changes */
  onReferenceImageChange?:
    | ((
        index: number,
        id: string | null,
        token: string | null,
        presignedUrl?: string | null,
      ) => void)
    | undefined;
  /** Callback when reference image is added */
  onAddReferenceImage?:
    | ((id: string, token: string, presignedUrl?: string | null) => void)
    | undefined;
  /** Error message to display */
  error?: string | undefined;
  /** Content to render between the editor and toolbar (e.g., task thumbnails) */
  children?: React.ReactNode;
};

const TOOL_MODES_WITH_PROMPT_BOX: ToolMode[] = ["brush", "eraser", "pan"];

/**
 * Shared layout for image editing pages.
 * Provides consistent structure for ImageEditor, BrushToolbar, and PromptBox.
 */
export function ImageEditorLayout({
  brushTools,
  imageUrl,
  isPending = false,
  action,
  disabled = false,
  sourceImage,
  defaultPrompt,
  referenceImages,
  onReferenceImageChange,
  onAddReferenceImage,
  error,
  children,
}: ImageEditorLayoutProps) {
  const { setNavPanelMinimized } = useGlobalState();
  const {
    pointerEvents,
    toolMode,
    setPointerEvents,
    imageDimensions,
    selection,
  } = useImageEditorContext();

  // Destructure brush tools to separate ref from state values
  const { imageEditorRef, brushSize, onBrushSizeChange, getExtraFormData } =
    brushTools;

  // Only show toolbar when we have an image to edit
  const showToolbar = Boolean(imageUrl);

  const expandGeometry = getExpandGeometry(imageDimensions, selection ?? null);

  /** When switching to expand, clear the mask (expand does not use a mask). */
  useEffect(() => {
    if (toolMode === "expand") {
      imageEditorRef.current?.clearMask?.();
    }
  }, [toolMode, imageEditorRef]);

  /** Minimize navigation when editor mounts. */
  useEffect(() => {
    setNavPanelMinimized(true);
  }, [setNavPanelMinimized]);

  const handleDragChange = useCallback(
    (dragging: boolean) => {
      setPointerEvents(dragging ? "none" : "auto");
    },
    [setPointerEvents],
  );

  return (
    <Box
      dangerouslySetClassName={styles["maxHeight"]}
      height="viewport"
      overflow="hidden"
      position="relative"
    >
      {/* Full viewport image editor - key by URL so state resets when image changes (avoids setState-in-effect) */}
      <ImageEditor
        key={imageUrl ?? ""}
        ref={imageEditorRef}
        imageUrl={imageUrl}
        brushSize={BRUSH_SIZES[brushSize]}
        isPending={isPending}
        onDragChange={handleDragChange}
      />

      {/* Optional content between editor and toolbar (e.g., task thumbnails) */}

      {children}

      {/* Floating toolbar and prompt box */}
      <PageBlock
        bottom="3x"
        left="none"
        pointerEvents="none"
        position="absolute"
        right="none"
        zIndex="1"
      >
        <Stack spacing="3x" alignItems="center">
          {/* Toolbar: wrap in Form when expand mode so "Expand & fill" submits */}
          {showToolbar &&
          toolMode === "expand" &&
          sourceImage &&
          expandGeometry ? (
            <form
              action={action}
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const extra = getExtraFormData?.();
                const maskValue = extra?.["source_mask"];
                const hasMask =
                  typeof maskValue === "string" && maskValue.trim() !== "";
                const existingMaskInput = form.querySelector<HTMLInputElement>(
                  'input[name="source_mask"]',
                );
                if (hasMask) {
                  if (!existingMaskInput) {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = "source_mask";
                    input.value = maskValue.trim();
                    form.appendChild(input);
                  } else {
                    existingMaskInput.value = maskValue.trim();
                  }
                } else if (existingMaskInput) {
                  existingMaskInput.remove();
                }
                form.submit();
              }}
              style={{ pointerEvents }}
            >
              <input type="hidden" name="operation" value="expand" />
              <input type="hidden" name="prompt" value="" />
              <input
                type="hidden"
                name="source_image_source"
                value={sourceImage.source}
              />
              <input
                type="hidden"
                name="source_image_id"
                value={sourceImage.id}
              />
              <input
                type="hidden"
                name="canvas_size"
                value={JSON.stringify(expandGeometry.canvasSize)}
              />
              <input
                type="hidden"
                name="original_image_size"
                value={JSON.stringify(expandGeometry.originalImageSize)}
              />
              <input
                type="hidden"
                name="original_image_location"
                value={JSON.stringify(expandGeometry.originalImageLocation)}
              />
              <Toolbar
                brushSize={brushSize}
                onBrushSizeChange={onBrushSizeChange}
                disabled={disabled || isPending}
              />
            </form>
          ) : showToolbar ? (
            <Toolbar
              brushSize={brushSize}
              onBrushSizeChange={onBrushSizeChange}
              disabled={disabled || isPending}
            />
          ) : null}

          {/* Prompt box */}
          {TOOL_MODES_WITH_PROMPT_BOX.includes(toolMode) && (
            <PromptBox
              action={action}
              disabled={disabled || isPending}
              defaultPrompt={defaultPrompt}
              referenceImages={referenceImages ?? []}
              getExtraFormData={getExtraFormData}
              pointerEvents={pointerEvents}
              {...(sourceImage && { sourceImage })}
              {...(onReferenceImageChange && { onReferenceImageChange })}
              {...(onAddReferenceImage && { onAddReferenceImage })}
              error={error}
            />
          )}
        </Stack>
      </PageBlock>
    </Box>
  );
}
