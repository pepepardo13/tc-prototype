import { useState, useCallback, useRef } from "react";

type ViewportState = {
  x: number;
  y: number;
  scale: number;
};

type UseViewportOptions = {
  minScale?: number;
  maxScale?: number;
};

type UseViewportReturn = {
  /** Current viewport transform state */
  viewport: ViewportState;
  /** Whether a pan drag is active */
  isPanning: boolean;
  /** Start panning from pointer position */
  startPan: (clientX: number, clientY: number) => void;
  /** Update pan position */
  updatePan: (clientX: number, clientY: number) => void;
  /** End panning */
  endPan: () => void;
  /** Handle wheel/trackpad zoom (zoom to cursor) */
  handleWheel: (event: WheelEvent, containerRect: DOMRect) => void;
  /** Convert screen coordinates to image coordinates */
  screenToImage: (
    clientX: number,
    clientY: number,
    containerRect: DOMRect,
  ) => { x: number; y: number };
  /** Reset viewport to fit image in container */
  resetViewport: (
    imageWidth: number,
    imageHeight: number,
    containerWidth: number,
    containerHeight: number,
  ) => void;
};

/**
 * Hook for managing pan/zoom viewport state
 */
export function useViewport(
  options: UseViewportOptions = {},
): UseViewportReturn {
  const { minScale = 0.1, maxScale = 5 } = options;

  const [viewport, setViewport] = useState<ViewportState>({
    x: 0,
    y: 0,
    scale: 1,
  });

  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0, viewportX: 0, viewportY: 0 });

  // Start panning
  const startPan = useCallback(
    (clientX: number, clientY: number) => {
      setIsPanning(true);
      panStartRef.current = {
        x: clientX,
        y: clientY,
        viewportX: viewport.x,
        viewportY: viewport.y,
      };
    },
    [viewport.x, viewport.y],
  );

  // Update pan position
  const updatePan = useCallback(
    (clientX: number, clientY: number) => {
      if (!isPanning) return;

      const dx = clientX - panStartRef.current.x;
      const dy = clientY - panStartRef.current.y;

      setViewport((prev) => ({
        ...prev,
        x: panStartRef.current.viewportX + dx,
        y: panStartRef.current.viewportY + dy,
      }));
    },
    [isPanning],
  );

  // End panning
  const endPan = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Handle wheel zoom (zoom to cursor)
  const handleWheel = useCallback(
    (event: WheelEvent, containerRect: DOMRect) => {
      event.preventDefault();

      const zoomFactor = event.deltaY > 0 ? 0.98 : 1.02;

      setViewport((prev) => {
        const newScale = Math.min(
          maxScale,
          Math.max(minScale, prev.scale * zoomFactor),
        );

        // Get cursor position relative to container
        const cursorX = event.clientX - containerRect.left;
        const cursorY = event.clientY - containerRect.top;

        // Calculate new position to zoom toward cursor
        const scaleRatio = newScale / prev.scale;
        const newX = cursorX - (cursorX - prev.x) * scaleRatio;
        const newY = cursorY - (cursorY - prev.y) * scaleRatio;

        return {
          x: newX,
          y: newY,
          scale: newScale,
        };
      });
    },
    [minScale, maxScale],
  );

  // Convert screen coordinates to image coordinates
  const screenToImage = useCallback(
    (
      clientX: number,
      clientY: number,
      containerRect: DOMRect,
    ): { x: number; y: number } => {
      const containerX = clientX - containerRect.left;
      const containerY = clientY - containerRect.top;

      // Convert from screen space to image space
      const imageX = (containerX - viewport.x) / viewport.scale;
      const imageY = (containerY - viewport.y) / viewport.scale;

      return { x: imageX, y: imageY };
    },
    [viewport],
  );

  // Reset viewport to fit image
  const resetViewport = useCallback(
    (
      imageWidth: number,
      imageHeight: number,
      containerWidth: number,
      containerHeight: number,
    ) => {
      // Calculate scale to fit image in container
      const scaleX = containerWidth / imageWidth;
      const scaleY = containerHeight / imageHeight;

      // Also cap at 50% viewport height to prevent oversized images
      const maxHeightScale = (containerHeight * 0.5) / imageHeight;

      // Use smallest scale: fit in container, 50vh max height, and cap at 1x
      const scale = Math.min(scaleX, scaleY, maxHeightScale, 1);

      // Center the image
      const scaledWidth = imageWidth * scale;
      const scaledHeight = imageHeight * scale;
      const x = (containerWidth - scaledWidth) / 2;
      const y = (containerHeight - scaledHeight) / 2;

      setViewport({ x, y, scale });
    },
    [],
  );

  return {
    viewport,
    isPanning,
    startPan,
    updatePan,
    endPan,
    handleWheel,
    screenToImage,
    resetViewport,
  };
}
