import { Box } from "@envato/design-system/components";
import {
  useCallback,
  useEffect,
  useState,
  type PointerEvent,
  type Ref,
} from "react";

export type Position = "top" | "right" | "bottom" | "left";

type Props = {
  onDragChange: (edge: "center", isDragging: boolean) => void;
  ref: Ref<HTMLDivElement>;
};

export function Center({ onDragChange, ref }: Props) {
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
    onDragChange("center", dragging);
  }, [dragging, onDragChange]);

  return (
    <Box
      inset="none"
      position="absolute"
      ref={ref}
      zIndex={dragging ? "1" : undefined}
    >
      <Box
        dangerouslySetStyle={{
          cursor: dragging ? "grabbing" : "grab",
          height: dragging ? "calc(100% + 4000px)" : undefined,
          transform: dragging ? "translate(-2000px, -2000px)" : undefined,
          width: dragging ? "calc(100% + 4000px)" : undefined,
        }}
        inset="none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        position="absolute"
      />
    </Box>
  );
}
