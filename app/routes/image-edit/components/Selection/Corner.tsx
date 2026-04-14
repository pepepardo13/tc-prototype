import type { DesignSystem } from "@envato/design-system";

import { Box } from "@envato/design-system/components";
import { useCallback, useEffect, useState, type PointerEvent } from "react";

export type Position =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

const OFFSET = 13;

const transformOriginMap = {
  "bottom-left": "left bottom",
  "bottom-right": "right bottom",
  "top-left": "left top",
  "top-right": "right top",
} as const satisfies Record<Position, DesignSystem["transformOrigin"]>;

const translateMap = {
  "bottom-left": `-${OFFSET}px, ${OFFSET}px`,
  "bottom-right": `${OFFSET}px, ${OFFSET}px`,
  "top-left": `-${OFFSET}px, -${OFFSET}px`,
  "top-right": `${OFFSET}px, -${OFFSET}px`,
} as const satisfies Record<Position, string>;

const rotateMap = {
  "bottom-left": "270deg",
  "bottom-right": "180deg",
  "top-left": "0deg",
  "top-right": "90deg",
} as const satisfies Record<Position, string>;

const cursorMap = {
  "bottom-left": "nesw-resize",
  "bottom-right": "nwse-resize",
  "top-left": "nwse-resize",
  "top-right": "nesw-resize",
} as const satisfies Record<Position, string>;

type Props = {
  onDragChange: (edge: Position, isDragging: boolean) => void;
  position: Position;
  scale: number;
};

export function Corner({ onDragChange, position, scale }: Props) {
  const [dragging, setDragging] = useState<boolean>(false);

  const handlePointerDown = useCallback((event: PointerEvent) => {
    event.stopPropagation();
    setDragging(true);
  }, []);

  const handlePointerUp = useCallback((event: PointerEvent) => {
    event.stopPropagation();
    setDragging(false);
  }, []);

  useEffect(() => {
    onDragChange(position, dragging);
  }, [dragging, onDragChange, position]);

  const top = position.startsWith("top") ? "none" : undefined;
  const right = position.endsWith("right") ? "none" : undefined;
  const bottom = position.startsWith("bottom") ? "none" : undefined;
  const left = position.endsWith("left") ? "none" : undefined;

  return (
    <Box
      alignItems="center"
      bottom={bottom}
      dangerouslySetStyle={{
        aspectRatio: 1,
        minHeight: "40px",
        transform: `scale(${1 / scale})`,
      }}
      display="flex"
      flexGrow="0"
      justifyContent="center"
      left={left}
      pointerEvents="none"
      position="absolute"
      right={right}
      top={top}
      transformOrigin={transformOriginMap[position]}
    >
      <Box
        dangerouslySetHeight="23"
        dangerouslySetStyle={{
          transform: `translate(${translateMap[position]}) rotate(${rotateMap[position]})`,
        }}
        dangerouslySetWidth="23"
        tagName="svg"
        viewBox="0 0 23 23"
      >
        <Box
          d="M0 0v16.5L6 23V6h17l-6.5-6z"
          fill="var(--color-content-primary)"
          tagName="path"
        />
        <Box
          d="M0 0h-1v-1h1zm0 16.5-.735.678-.265-.287V16.5zM6 23h1v2.558l-1.735-1.88zM6 6H5V5h1zm17 0 .678-.735L25.558 7H23zm-6.5-6v-1h.391l.287.265zM0 0h1v16.5h-2V0zm0 16.5.735-.678 6 6.5L6 23l-.735.678-6-6.5zM6 23H5V6h2v17zM6 6V5h17v2H6zm17 0-.678.735-6.5-6L16.5 0l.678-.735 6.5 6zm-6.5-6v1H0v-2h16.5z"
          fill="var(--color-content-inverse)"
          tagName="path"
        />
      </Box>
      <Box
        bottom={bottom}
        left={left}
        position="absolute"
        right={right}
        top={top}
      >
        <Box
          dangerouslySetStyle={{
            cursor: cursorMap[position],
            height: dragging ? "2000px" : "40px",
            width: dragging ? "2000px" : "40px",
            transform: `translate(-50%, -50%)`,
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          pointerEvents="auto"
          position="absolute"
        />
      </Box>
    </Box>
  );
}
