import type { ToolMode } from "../../types/ToolMode.ts";

import { Box } from "@envato/design-system/components";
import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useLocation } from "react-router";

import { ImagePlaceholder } from "../../../../components/ImagePlaceholder.tsx";
import { ActionsPopover } from "../Actions/ActionsPopover.tsx";
import { CameraAngle } from "../CameraAngle/CameraAngle.tsx";
import { useImageEditorContext } from "../ImageEditorProvider.tsx";
import { Selection } from "../Selection/Selection.tsx";

import styles from "./ImageEditor.module.scss";
import { useBrush } from "./useBrush.ts";
import { useViewport } from "./useViewport.ts";

const TOOL_MODES_WITH_SELECTION: ToolMode[] = ["crop", "expand"];

export type ImageEditorProps = {
  /** URL of the image to edit (optional - shows placeholder if not provided) */
  imageUrl?: string | undefined;
  /** Brush size in pixels */
  brushSize?: number | undefined;
  /** Whether image is pending generation (shows animated placeholder) */
  isPending?: boolean | undefined;
  /** Handles changes to dragging state. */
  onDragChange: (isDragging: boolean) => void;
};

export type ImageEditorRef = {
  /** Get the mask as a data URL (PNG with alpha), or null if mask is empty */
  getMaskDataUrl: () => string | null;
  /** Clear the mask canvas (e.g. when switching to expand, which does not use a mask) */
  clearMask: () => void;
};

/**
 * Image editor with pan/zoom viewport and brush mask overlay
 * Uses CSS transforms for smooth pan/zoom with native image rendering
 */
export const ImageEditor = forwardRef<ImageEditorRef, ImageEditorProps>(
  function ImageEditor(
    { imageUrl = null, brushSize = 32, isPending = false, onDragChange },
    ref,
  ) {
    const location = useLocation();
    const { setToolMode, toolMode } = useImageEditorContext();

    useEffect(() => {
      setToolMode("pan");
    }, [location, setToolMode]);

    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hasMaskContentRef = useRef(false);

    // Track container element for wheel event attachment
    // Using state instead of just ref so changes trigger re-render and effect re-runs
    const [containerElement, setContainerElement] =
      useState<HTMLDivElement | null>(null);

    // Callback ref that updates both the ref and state
    const setContainerRef = useCallback((node: HTMLDivElement | null) => {
      containerRef.current = node;
      setContainerElement(node);
    }, []);

    const [hidePlaceholder, setHidePlaceholder] = useState(false);
    const [popoverKey, setPopoverKey] = useState(0);

    // Get image dimensions from context (imageUrl is from prop only; we key by it so state resets on change)
    const { imageDimensions, setImageDimensions } = useImageEditorContext();

    // Clear shared dimensions when image source changes so load state reflects the new image (provider state
    // is not reset by keying ImageEditor, so we must clear it here to avoid stale dimensions and premature placeholder dismissal).
    useEffect(() => {
      setImageDimensions(null);
    }, [imageUrl, setImageDimensions]);

    const {
      viewport,
      isPanning,
      startPan,
      updatePan,
      endPan,
      handleWheel,
      resetViewport,
    } = useViewport();

    // Convert screen coordinates to image coordinates
    const screenToImage = useCallback(
      (clientX: number, clientY: number, containerRect: DOMRect) => {
        const screenX = clientX - containerRect.left;
        const screenY = clientY - containerRect.top;

        // Reverse the viewport transform
        const imageX = (screenX - viewport.x) / viewport.scale;
        const imageY = (screenY - viewport.y) / viewport.scale;

        return { x: imageX, y: imageY };
      },
      [viewport],
    );

    const brush = useBrush({
      screenToImage,
      brushSize,
      containerRef,
    });

    // Expose methods via ref
    useImperativeHandle(
      ref,
      () => ({
        getMaskDataUrl: () => {
          if (!hasMaskContentRef.current) return null;
          const canvas = canvasRef.current;
          if (!canvas) return null;
          return canvas.toDataURL("image/png");
        },
        clearMask: () => {
          hasMaskContentRef.current = false;
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        },
      }),
      [],
    );

    // Handle image load - get dimensions and reset viewport
    const handleImageLoad = useCallback(() => {
      const img = imageRef.current;
      if (!img || !img.naturalWidth || !img.naturalHeight) return;

      const width = img.naturalWidth;
      const height = img.naturalHeight;
      setImageDimensions({ width, height });
    }, [setImageDimensions]);

    // Reset viewport when dimensions change
    useEffect(() => {
      if (!imageDimensions || !containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();

      resetViewport(
        imageDimensions.width,
        imageDimensions.height,
        containerRect.width,
        containerRect.height,
      );
    }, [imageDimensions, resetViewport]);

    // Hide placeholder after image loads
    useEffect(() => {
      if (!imageDimensions) return;

      const timer = setTimeout(() => {
        setHidePlaceholder(true);
      }, 200);
      return () => clearTimeout(timer);
    }, [imageDimensions]);

    // Handle cached images when ref is attached
    const setImageRef = useCallback(
      (img: HTMLImageElement | null) => {
        imageRef.current = img;
        if (img?.complete && img.naturalWidth) {
          handleImageLoad();
        }
      },
      [handleImageLoad],
    );

    // Check if image is already loaded from cache (e.g. direct navigation / refresh)
    useEffect(() => {
      if (imageRef.current?.complete && imageRef.current.naturalWidth) {
        handleImageLoad();
      }
    }, [imageUrl, handleImageLoad]);

    // Pointer event handlers
    const handlePointerDown = useCallback(
      (e: React.PointerEvent) => {
        e.preventDefault();
        const container = containerRef.current;
        if (!container) return;

        if (["camera-angle", "crop", "expand", "pan"].includes(toolMode)) {
          startPan(e.clientX, e.clientY);
        } else if (
          (toolMode === "brush" || toolMode === "eraser") &&
          canvasRef.current
        ) {
          hasMaskContentRef.current = true;
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            const rect = container.getBoundingClientRect();
            brush.startDraw(ctx, e.clientX, e.clientY, rect);
          }
        }
      },
      [toolMode, startPan, brush],
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent) => {
        const container = containerRef.current;
        if (!container) return;

        if (
          isPanning &&
          ["camera-angle", "crop", "expand", "pan"].includes(toolMode)
        ) {
          updatePan(e.clientX, e.clientY);
        } else if (
          (toolMode === "brush" || toolMode === "eraser") &&
          brush.isDrawing &&
          canvasRef.current
        ) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            const rect = container.getBoundingClientRect();
            brush.continueDraw(ctx, e.clientX, e.clientY, rect);
          }
        }
      },
      [toolMode, isPanning, updatePan, brush],
    );

    const handlePointerUp = useCallback(() => {
      if (["camera-angle", "crop", "expand", "pan"].includes(toolMode)) {
        endPan();
      } else {
        brush.endDraw();
      }
    }, [toolMode, endPan, brush]);

    const handlePointerLeave = useCallback(() => {
      if (isPanning) {
        endPan();
      }
      if (brush.isDrawing) {
        brush.endDraw();
      }
    }, [isPanning, endPan, brush]);

    const handleCameraAnglesDismissEnd = useCallback(() => {
      setPopoverKey((state) => ++state);
    }, []);

    useEffect(() => {
      onDragChange(brush.isDrawing || isPanning);
    }, [brush.isDrawing, isPanning, onDragChange]);

    // Wheel event handler (zoom always works regardless of tool)
    // Uses containerElement state so effect re-runs when container mounts
    useEffect(() => {
      if (!containerElement) return;

      const onWheel = (e: WheelEvent) => {
        const rect = containerElement.getBoundingClientRect();
        handleWheel(e, rect);
      };

      containerElement.addEventListener("wheel", onWheel, { passive: false });
      return () => containerElement.removeEventListener("wheel", onWheel);
    }, [containerElement, handleWheel]);

    // Compute transform style
    const transformStyle = {
      transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.scale})`,
    };

    const imageBorderRadius =
      toolMode === "camera-angle" ? undefined : ("4x" as const);

    // Determine cursor based on tool mode
    const getCursor = () => {
      switch (toolMode) {
        case "camera-angle":
        case "crop":
        case "expand":
        case "pan": {
          return isPanning ? "grabbing" : "grab";
        }

        case "brush":
        case "eraser": {
          return "crosshair";
        }

        default: {
          return "auto";
        }
      }
    };

    // If no image URL, just show the background with a centered placeholder
    if (!imageUrl) {
      return (
        <Box
          backgroundColor="background"
          dangerouslySetClassName={styles["container"]}
          height="full"
          overflow="hidden"
          position="relative"
          transitionDuration="long"
          transitionProperty="dangerously-transition-background-color"
          transitionTimingFunction="ease-out"
          width="full"
        >
          <Box
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="full"
            height="full"
            dangerouslySetStyle={{ paddingBottom: "180px" }}
          >
            <Box
              borderRadius="4x"
              overflow="hidden"
              dangerouslySetStyle={{
                width: "min(500px, 50vh)",
                height: "min(500px, 50vh)",
              }}
            >
              <ImagePlaceholder variant={isPending ? "long" : "default"} />
            </Box>
          </Box>
        </Box>
      );
    }

    return (
      <Box
        dangerouslySetClassName={styles["container"]}
        dangerouslySetStyle={{
          cursor: getCursor(),
        }}
        height="full"
        overflow="hidden"
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        position="relative"
        ref={setContainerRef}
        width="full"
      >
        {/* Centered placeholder while image loads */}
        {!hidePlaceholder && (
          <Box
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="full"
            height="full"
          >
            <Box
              borderRadius="4x"
              overflow="hidden"
              dangerouslySetStyle={{
                width: "min(500px, 50vh)",
                height: "min(500px, 50vh)",
              }}
            >
              <ImagePlaceholder />
            </Box>
          </Box>
        )}

        {/* Image and mask canvas container - shares transform */}
        <Box
          opacity={imageDimensions ? "1" : "0"}
          transformOrigin="left top"
          transitionDuration="long"
          transitionProperty="opacity"
          transitionTimingFunction="ease-out"
          dangerouslySetStyle={{ ...transformStyle, willChange: "transform" }}
        >
          <CameraAngle onDismissEnd={handleCameraAnglesDismissEnd}>
            {/* The actual image */}
            <Box
              alt=""
              borderRadius={imageBorderRadius}
              display="block"
              draggable={false}
              onLoad={handleImageLoad}
              ref={setImageRef}
              src={imageUrl}
              tagName="img"
            />

            {imageDimensions && (
              <>
                <Box
                  borderRadius={imageBorderRadius}
                  dangerouslySetHeight={imageDimensions.height}
                  dangerouslySetWidth={imageDimensions.width}
                  dangerouslySetStyle={{ opacity: 0.7 }}
                  left="none"
                  pointerEvents="none"
                  position="absolute"
                  ref={canvasRef}
                  tagName="canvas"
                  top="none"
                />

                {TOOL_MODES_WITH_SELECTION.includes(toolMode) && (
                  <Selection
                    initialHeight={imageDimensions.height}
                    initialWidth={imageDimensions.width}
                    scale={viewport.scale}
                  />
                )}

                <ActionsPopover
                  key={`${transformStyle.transform.toString()}-${popoverKey}`}
                  trigger={
                    <Box
                      dangerouslySetStyle={{
                        height: imageDimensions.height,
                        width: imageDimensions.width,
                      }}
                      left="none"
                      pointerEvents="none"
                      position="absolute"
                      top="none"
                    />
                  }
                />
              </>
            )}
          </CameraAngle>
        </Box>
      </Box>
    );
  },
);
