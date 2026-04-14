import { VIEWBOX_HEIGHT, WAVE_BASE_OFFSET } from "../constants.ts";

/**
 * Calculate Y position for animated wave based on progress percentage (0-100)
 * Returns Y coordinate relative to SVG viewBox coordinate system
 * Wave animates from bottom (Y=88) at 0% to top (Y=-WAVE_BASE_OFFSET) at 100% for filling effect
 * The WAVE_BASE_OFFSET ensures complete visual fill by accounting for wave height
 */
export const calculateProgressBarYPosition = (progress: number) => {
  return (
    VIEWBOX_HEIGHT -
    (Math.max(0, Math.min(100, progress)) / 100) *
      (VIEWBOX_HEIGHT + WAVE_BASE_OFFSET)
  );
};
