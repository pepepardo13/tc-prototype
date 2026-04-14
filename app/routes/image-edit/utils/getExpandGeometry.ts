import type { Selection } from "../types/Selection.ts";

export type ExpandGeometry = {
  canvasSize: [number, number];
  originalImageSize: [number, number];
  originalImageLocation: [number, number];
};

const MAX_SIDE = 5000;

/**
 * Scale geometry so no side exceeds MAX_SIDE; keeps proportions consistent.
 */
function clampGeometry(
  canvasW: number,
  canvasH: number,
  x: number,
  y: number,
  imageW: number,
  imageH: number,
): ExpandGeometry {
  if (canvasW <= MAX_SIDE && canvasH <= MAX_SIDE) {
    return {
      canvasSize: [canvasW, canvasH],
      originalImageSize: [imageW, imageH],
      originalImageLocation: [x, y],
    };
  }
  const scale = Math.min(MAX_SIDE / canvasW, MAX_SIDE / canvasH);
  return {
    canvasSize: [Math.round(canvasW * scale), Math.round(canvasH * scale)],
    originalImageSize: [Math.round(imageW * scale), Math.round(imageH * scale)],
    originalImageLocation: [Math.round(x * scale), Math.round(y * scale)],
  };
}

/**
 * Compute expand geometry from image dimensions and selection box.
 * The selection defines the content region. Space outside the selection (left, top,
 * right, bottom of the image) is the area to expand into. The selection may extend
 * beyond the image (e.g. into empty canvas); that is treated as expansion in that
 * direction. Returns null only when there is no selection or the selection has no
 * area.
 */
export function getExpandGeometry(
  dimensions: { width: number; height: number } | null,
  selection: Selection | null,
): ExpandGeometry | null {
  if (!dimensions || dimensions.width <= 0 || dimensions.height <= 0) {
    return null;
  }

  if (
    !selection ||
    selection.right <= selection.left ||
    selection.bottom <= selection.top
  ) {
    return null;
  }

  const { width: imageW, height: imageH } = dimensions;

  // Selection can extend past the image (negative left/top, or right > imageW, bottom > imageH).
  // Treat as expansion in that direction.
  const expandLeft = Math.max(
    0,
    Math.round(selection.left < 0 ? -selection.left : selection.left),
  );
  const expandTop = Math.max(
    0,
    Math.round(selection.top < 0 ? -selection.top : selection.top),
  );
  const expandRight =
    selection.right >= imageW
      ? Math.max(0, Math.round(selection.right - imageW))
      : Math.max(0, Math.round(imageW - selection.right));
  const expandBottom =
    selection.bottom >= imageH
      ? Math.max(0, Math.round(selection.bottom - imageH))
      : Math.max(0, Math.round(imageH - selection.bottom));

  if (
    expandLeft === 0 &&
    expandTop === 0 &&
    expandRight === 0 &&
    expandBottom === 0
  ) {
    return null;
  }

  const canvasW = expandLeft + imageW + expandRight;
  const canvasH = expandTop + imageH + expandBottom;

  return clampGeometry(canvasW, canvasH, expandLeft, expandTop, imageW, imageH);
}
