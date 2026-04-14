export type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4" | "21:9" | "9:21";

type Rect = { x: number; y: number; w: number; h: number };

/**
 * Rectangle dimensions for each aspect ratio, fitted within a 24×24 viewbox.
 * Proportions are visually representative — not pixel-perfect mathematical ratios.
 */
const RECTS: Record<AspectRatio, Rect> = {
  "1:1":  { x: 4,  y: 4,  w: 16, h: 16 },
  "16:9": { x: 2,  y: 7,  w: 20, h: 10 },
  "9:16": { x: 7,  y: 2,  w: 10, h: 20 },
  "4:3":  { x: 3,  y: 5,  w: 18, h: 14 },
  "3:4":  { x: 5,  y: 3,  w: 14, h: 18 },
  "21:9": { x: 1,  y: 8,  w: 22, h: 8  },
  "9:21": { x: 8,  y: 1,  w: 8,  h: 22 },
};

type Props = {
  ratio: AspectRatio;
  /** Defaults to 24 */
  size?: number;
  className?: string;
};

export function AspectRatioIcon({ ratio, size = 24, className }: Props) {
  const { x, y, w, h } = RECTS[ratio];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="2"
        ry="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
