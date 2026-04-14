import { Box } from "@envato/design-system/components";
import { useCallback, useEffect, useState, type PointerEvent } from "react";

export type Position = "top" | "right" | "bottom" | "left";

const cursorMap = {
  top: "ns-resize",
  right: "ew-resize",
  bottom: "ns-resize",
  left: "ew-resize",
} as const satisfies Record<Position, string>;

type Props = {
  onDragChange: (edge: Position, isDragging: boolean) => void;
  position: Position;
  scale: number;
};

export function Edge({ onDragChange, position, scale }: Props) {
  const [active, setActive] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);

  const handlePointerDown = useCallback((event: PointerEvent) => {
    event.stopPropagation();
    setDragging(true);
  }, []);

  const handlePointerEnter = useCallback(() => {
    setActive(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (!dragging) setActive(false);
  }, [dragging]);

  const handlePointerUp = useCallback((event: PointerEvent) => {
    event.stopPropagation();
    setDragging(false);
  }, []);

  useEffect(() => {
    onDragChange(position, dragging);
  }, [dragging, onDragChange, position]);

  const horizontal = position === "top" || position === "bottom";

  const scaleX = horizontal ? 1 : 1 / scale;
  const scaleY = horizontal ? 1 / scale : 1;

  const translateX = horizontal ? (dragging ? "-2000px" : "0px") : "-50%";
  const translateY = horizontal ? "-50%" : dragging ? "-2000px" : "0px";

  return (
    <Box
      bottom={position === "bottom" ? "none" : undefined}
      insetX={horizontal ? "none" : undefined}
      insetY={horizontal ? undefined : "none"}
      left={position === "left" ? "none" : undefined}
      position="absolute"
      right={position === "right" ? "none" : undefined}
      top={position === "top" ? "none" : undefined}
      zIndex={dragging ? "1" : undefined}
    >
      <Box
        dangerouslySetStyle={{
          height: horizontal ? "1px" : "100%",
          transform: `scale(${scaleX}, ${scaleY}) `,
          width: horizontal ? "100%" : "1px",
          willChange: "transform",
        }}
      >
        <Box
          backgroundColor="inverse"
          bottom={position === "bottom" ? "none" : undefined}
          dangerouslySetStyle={{
            height: horizontal ? (active ? "2px" : "1px") : undefined,
            width: horizontal ? undefined : active ? "2px" : "1px",
          }}
          height="full"
          left={position === "left" ? "none" : undefined}
          position="absolute"
          right={position === "right" ? "none" : undefined}
          top={position === "top" ? "none" : undefined}
          transitionProperty="transform"
          width="full"
        />
        <Box
          dangerouslySetStyle={{
            cursor: cursorMap[position],
            height: horizontal
              ? dragging
                ? "2000px"
                : "40px"
              : dragging
                ? "calc(100% + 4000px)"
                : "100%",
            transform: `translate(${translateX}, ${translateY})`,
            width: horizontal
              ? dragging
                ? "calc(100% + 4000px)"
                : "100%"
              : dragging
                ? "2000px"
                : "40px",
          }}
          left="none"
          onPointerDown={handlePointerDown}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}
          position="absolute"
          top="none"
        />
      </Box>
    </Box>
  );
}
