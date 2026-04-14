import type { SelectionAspectRatio } from "../../types/SelectionAspectRatio.ts";

import { Box } from "@envato/design-system/components";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";

import { useImageEditorContext } from "../ImageEditorProvider.tsx";

import { Center } from "./Center.tsx";
import { Corner, type Position as CornerPosition } from "./Corner.tsx";
import { Edge, type Position as EdgePosition } from "./Edge.tsx";

type Props = {
  initialHeight: number;
  initialWidth: number;
  scale: number;
};

const aspectRatioMap = {
  "16:9": 16 / 9,
  "2:3": 2 / 3,
  "3:2": 3 / 2,
  "3:4": 3 / 4,
  "4:3": 4 / 3,
  "9:16": 9 / 16,
  free: undefined,
  square: 1,
} as const satisfies Record<
  Exclude<SelectionAspectRatio, "original">,
  number | undefined
>;

export function Selection({ initialHeight, initialWidth, scale }: Props) {
  const topMax = useRef<number>(initialHeight);
  const rightMin = useRef<number>(0);
  const bottomMin = useRef<number>(0);
  const leftMax = useRef<number>(initialWidth);

  const centerOffsetX = useRef<number | null>(null);
  const centerOffsetY = useRef<number | null>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  const [activeNode, setActiveNode] = useState<
    CornerPosition | EdgePosition | "center" | null
  >(null);
  const [leftX, setLeftX] = useState<number>(0);
  const [topY, setTopY] = useState<number>(0);
  const [rightX, setRightX] = useState<number>(initialWidth);
  const [bottomY, setBottomY] = useState<number>(initialHeight);

  const { selectionAspectRatio, setPointerEvents, setSelection, toolMode } =
    useImageEditorContext();

  const [prevAspectRatio, setPrevAspectRatio] =
    useState<SelectionAspectRatio>(selectionAspectRatio);

  const clamped = toolMode === "crop";

  const handleDragChange = useCallback(
    (node: CornerPosition | EdgePosition | "center", isDragging: boolean) => {
      setActiveNode(isDragging ? node : null);
      setPointerEvents(isDragging ? "none" : "auto");
    },
    [setPointerEvents],
  );

  useEffect(() => {
    if (activeNode === null) {
      topMax.current = bottomY * scale;
      rightMin.current = leftX * scale;
      bottomMin.current = topY * scale;
      leftMax.current = rightX * scale;

      centerOffsetX.current = null;
      centerOffsetY.current = null;

      setSelection({
        bottom: bottomY,
        height: bottomY - topY,
        left: leftX,
        right: rightX,
        top: topY,
        width: rightX - leftX,
      });
    }
  }, [activeNode, bottomY, leftX, rightX, scale, setSelection, topY]);

  const aspectRatio =
    selectionAspectRatio === "original"
      ? initialWidth / initialHeight
      : aspectRatioMap[selectionAspectRatio];

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (activeNode === null) return;

      const element = event.currentTarget.getBoundingClientRect();
      const nodeLeft = event.clientX - element.left;
      const nodeTop = event.clientY - element.top;

      switch (activeNode) {
        case "center": {
          if (
            centerOffsetX.current === null &&
            centerOffsetY.current === null
          ) {
            if (centerRef.current === null) {
              centerOffsetX.current = 0;
              centerOffsetY.current = 0;
            } else {
              const center = centerRef.current.getBoundingClientRect();

              centerOffsetX.current = event.clientX - center.left;
              centerOffsetY.current = event.clientY - center.top;
            }
          }

          let top = topY * scale;
          let right = rightX * scale;
          let bottom = bottomY * scale;
          let left = leftX * scale;

          const selectionWidth = right - left;
          const selectionHeight = bottom - top;

          top = Math.max(
            Math.min(
              initialHeight * scale,
              nodeTop - (centerOffsetY.current ?? 0),
            ),
            -selectionHeight,
          );

          left = Math.max(
            Math.min(
              initialWidth * scale,
              nodeLeft - (centerOffsetX.current ?? 0),
            ),
            -selectionWidth,
          );

          if (clamped) {
            top = Math.max(0, top);
            left = Math.max(0, left);
          } else {
            top = Math.min(0, top);
            left = Math.min(0, left);
          }

          bottom = Math.max(0, top + selectionHeight);
          right = Math.max(0, left + selectionWidth);

          if (clamped) {
            bottom = Math.min(initialHeight * scale, bottom);
            right = Math.min(initialWidth * scale, right);
            top = bottom - selectionHeight;
            left = right - selectionWidth;
          } else {
            bottom = Math.max(initialHeight * scale, bottom);
            right = Math.max(initialWidth * scale, right);
            top = bottom - selectionHeight;
            left = right - selectionWidth;
          }

          setTopY(top * (1 / scale));
          setRightX(right * (1 / scale));
          setBottomY(bottom * (1 / scale));
          setLeftX(left * (1 / scale));
          break;
        }

        case "top": {
          let top = Math.min(initialHeight * scale, topMax.current, nodeTop);

          if (clamped) top = Math.max(0, top);
          else top = Math.min(0, top);

          if (typeof aspectRatio === "undefined") {
            setTopY(top * (1 / scale));
          } else {
            const bottom = bottomY * scale;
            let left = leftX * scale;
            let right = rightX * scale;
            let height = bottom - top;
            let width = height * aspectRatio;

            const deltaX = (right - left - width) / 2;

            if (
              (clamped && left + deltaX < 0) ||
              (!clamped && left + deltaX > 0)
            ) {
              left = 0;
            } else if (
              (clamped && right - deltaX > initialWidth * scale) ||
              (!clamped && right - deltaX < initialWidth * scale)
            ) {
              right = initialWidth * scale;
            } else {
              left = left + deltaX;
              right = right - deltaX;
            }

            width = right - left;
            height = width / aspectRatio;
            top = bottom - height;

            setTopY(top * (1 / scale));
            setLeftX(left * (1 / scale));
            setRightX(right * (1 / scale));
          }
          break;
        }

        case "right": {
          let right = Math.max(0, rightMin.current, nodeLeft);

          if (clamped) right = Math.min(initialWidth * scale, right);
          else right = Math.max(initialWidth * scale, right);

          if (typeof aspectRatio === "undefined") {
            setRightX(right * (1 / scale));
          } else {
            const left = leftX * scale;
            let top = topY * scale;
            let bottom = bottomY * scale;
            let width = right - left;
            let height = width / aspectRatio;

            const deltaY = (bottom - top - height) / 2;

            if (
              (clamped && top + deltaY < 0) ||
              (!clamped && top + deltaY > 0)
            ) {
              top = 0;
            } else if (
              (clamped && bottom - deltaY > initialHeight * scale) ||
              (!clamped && bottom - deltaY < initialHeight * scale)
            ) {
              bottom = initialHeight * scale;
            } else {
              top = top + deltaY;
              bottom = bottom - deltaY;
            }

            height = bottom - top;
            width = height * aspectRatio;
            right = left + width;

            setRightX(right * (1 / scale));
            setTopY(top * (1 / scale));
            setBottomY(bottom * (1 / scale));
          }
          break;
        }

        case "bottom": {
          let bottom = Math.max(0, bottomMin.current, nodeTop);

          if (clamped) bottom = Math.min(initialHeight * scale, bottom);
          else bottom = Math.max(initialHeight * scale, bottom);

          if (typeof aspectRatio === "undefined") {
            setBottomY(bottom * (1 / scale));
          } else {
            const top = topY * scale;
            let left = leftX * scale;
            let right = rightX * scale;
            let height = bottom - top;
            let width = height * aspectRatio;

            const deltaX = (right - left - width) / 2;

            if (
              (clamped && left + deltaX < 0) ||
              (!clamped && left + deltaX > 0)
            ) {
              left = 0;
            } else if (
              (clamped && right - deltaX > initialWidth * scale) ||
              (!clamped && right - deltaX < initialWidth * scale)
            ) {
              right = initialWidth * scale;
            } else {
              left = left + deltaX;
              right = right - deltaX;
            }

            width = right - left;
            height = width / aspectRatio;
            bottom = top + height;

            setBottomY(bottom * (1 / scale));
            setLeftX(left * (1 / scale));
            setRightX(right * (1 / scale));
          }
          break;
        }

        case "left": {
          let left = Math.min(initialWidth * scale, leftMax.current, nodeLeft);

          if (clamped) left = Math.max(0, left);
          else left = Math.min(0, left);

          setLeftX(left * (1 / scale));

          if (typeof aspectRatio === "undefined") {
            setLeftX(left * (1 / scale));
          } else {
            const right = rightX * scale;
            let top = topY * scale;
            let bottom = bottomY * scale;
            let width = right - left;
            let height = width / aspectRatio;

            const deltaY = (bottom - top - height) / 2;

            if (
              (clamped && top + deltaY < 0) ||
              (!clamped && top + deltaY > 0)
            ) {
              top = 0;
            } else if (
              (clamped && bottom - deltaY > initialHeight * scale) ||
              (!clamped && bottom - deltaY < initialHeight * scale)
            ) {
              bottom = initialHeight * scale;
            } else {
              top = top + deltaY;
              bottom = bottom - deltaY;
            }

            height = bottom - top;
            width = height * aspectRatio;
            left = right - width;

            setLeftX(left * (1 / scale));
            setTopY(top * (1 / scale));
            setBottomY(bottom * (1 / scale));
          }
          break;
        }

        case "top-left": {
          let top = Math.min(initialHeight * scale, topMax.current, nodeTop);
          let left = Math.min(initialWidth * scale, leftMax.current, nodeLeft);

          if (clamped) {
            top = Math.max(0, top);
            left = Math.max(0, left);
          } else {
            top = Math.min(0, top);
            left = Math.min(0, left);
          }

          if (typeof aspectRatio === "undefined") {
            setTopY(top * (1 / scale));
            setLeftX(left * (1 / scale));
          } else {
            const bottom = bottomY * scale;
            const right = rightX * scale;
            const height = bottom - top;
            const width = right - left;

            const forcedHeight = width / aspectRatio;
            const forcedWidth = height * aspectRatio;
            const forcedTop = bottom - forcedHeight;
            const forcedLeft = right - forcedWidth;

            if (clamped) {
              top = Math.max(forcedTop, top);
              left = Math.max(forcedLeft, left);
            } else {
              top = Math.min(forcedTop, top);
              left = Math.min(forcedLeft, left);
            }

            setTopY(top * (1 / scale));
            setLeftX(left * (1 / scale));
          }
          break;
        }

        case "top-right": {
          let top = Math.min(initialHeight * scale, topMax.current, nodeTop);
          let right = Math.max(0, rightMin.current, nodeLeft);

          if (clamped) {
            top = Math.max(0, top);
            right = Math.min(initialWidth * scale, right);
          } else {
            top = Math.min(0, top);
            right = Math.max(initialWidth * scale, right);
          }

          if (typeof aspectRatio === "undefined") {
            setTopY(top * (1 / scale));
            setRightX(right * (1 / scale));
          } else {
            const bottom = bottomY * scale;
            const left = leftX * scale;
            const height = bottom - top;
            const width = right - left;

            const forcedHeight = width / aspectRatio;
            const forcedWidth = height * aspectRatio;
            const forcedTop = bottom - forcedHeight;
            const forcedRight = left + forcedWidth;

            if (clamped) {
              top = Math.max(forcedTop, top);
              right = Math.min(forcedRight, right);
            } else {
              top = Math.min(forcedTop, top);
              right = Math.max(forcedRight, right);
            }

            setTopY(top * (1 / scale));
            setRightX(right * (1 / scale));
          }
          break;
        }

        case "bottom-right": {
          let bottom = Math.max(0, bottomMin.current, nodeTop);
          let right = Math.max(0, rightMin.current, nodeLeft);

          if (clamped) {
            bottom = Math.min(initialHeight * scale, bottom);
            right = Math.min(initialWidth * scale, right);
          } else {
            bottom = Math.max(initialHeight * scale, bottom);
            right = Math.max(initialWidth * scale, right);
          }

          if (typeof aspectRatio === "undefined") {
            setBottomY(bottom * (1 / scale));
            setRightX(right * (1 / scale));
          } else {
            const top = topY * scale;
            const left = leftX * scale;
            const height = bottom - top;
            const width = right - left;

            const forcedHeight = width / aspectRatio;
            const forcedWidth = height * aspectRatio;
            const forcedBottom = top + forcedHeight;
            const forcedRight = left + forcedWidth;

            if (clamped) {
              bottom = Math.min(forcedBottom, bottom);
              right = Math.min(forcedRight, right);
            } else {
              bottom = Math.max(forcedBottom, bottom);
              right = Math.max(forcedRight, right);
            }

            setBottomY(bottom * (1 / scale));
            setRightX(right * (1 / scale));
          }
          break;
        }

        case "bottom-left": {
          let bottom = Math.max(0, bottomMin.current, nodeTop);
          let left = Math.min(initialWidth * scale, leftMax.current, nodeLeft);

          if (clamped) {
            bottom = Math.min(initialHeight * scale, bottom);
            left = Math.max(0, left);
          } else {
            bottom = Math.max(initialHeight * scale, bottom);
            left = Math.min(0, left);
          }

          if (typeof aspectRatio === "undefined") {
            setBottomY(bottom * (1 / scale));
            setLeftX(left * (1 / scale));
          } else {
            const top = topY * scale;
            const right = rightX * scale;
            const height = bottom - top;
            const width = right - left;

            const forcedHeight = width / aspectRatio;
            const forcedWidth = height * aspectRatio;
            const forcedBottom = top + forcedHeight;
            const forcedLeft = right - forcedWidth;

            if (clamped) {
              bottom = Math.min(forcedBottom, bottom);
              left = Math.max(forcedLeft, left);
            } else {
              bottom = Math.max(forcedBottom, bottom);
              left = Math.min(forcedLeft, left);
            }

            setBottomY(bottom * (1 / scale));
            setLeftX(left * (1 / scale));
          }
          break;
        }
      }
    },
    [
      activeNode,
      aspectRatio,
      bottomY,
      clamped,
      initialHeight,
      initialWidth,
      leftX,
      rightX,
      scale,
      topY,
    ],
  );

  const width = rightX - leftX;
  const height = bottomY - topY;

  if (selectionAspectRatio !== prevAspectRatio) {
    setPrevAspectRatio(selectionAspectRatio);

    if (selectionAspectRatio === "free" || typeof aspectRatio === "undefined") {
      return;
    }

    if (selectionAspectRatio === "original") {
      setTopY(0);
      setRightX(initialWidth);
      setBottomY(initialHeight);
      setLeftX(0);
    } else if ((clamped && aspectRatio < 1) || (!clamped && aspectRatio > 1)) {
      const forcedWidth = initialHeight * aspectRatio;
      const offset = (initialWidth - forcedWidth) / 2;

      setTopY(0);
      setRightX(offset + forcedWidth);
      setBottomY(initialHeight);
      setLeftX(offset);
    } else if ((clamped && aspectRatio > 1) || (!clamped && aspectRatio < 1)) {
      const forcedHeight = initialWidth / aspectRatio;
      const offset = (initialHeight - forcedHeight) / 2;

      setTopY(offset);
      setRightX(initialWidth);
      setBottomY(offset + forcedHeight);
      setLeftX(0);
    } else {
      const originalAspectRatio = initialWidth / initialHeight;

      if (originalAspectRatio >= 1) {
        const forcedWidth = initialHeight * originalAspectRatio;
        const offset = (initialWidth - forcedWidth) / 2;

        setTopY(0);
        setRightX(offset + forcedWidth);
        setBottomY(initialHeight);
        setLeftX(offset);
      } else {
        const forcedHeight = initialWidth / originalAspectRatio;
        const offset = (initialHeight - forcedHeight) / 2;

        setTopY(offset);
        setRightX(initialWidth);
        setBottomY(offset + forcedHeight);
        setLeftX(0);
      }
    }
  }

  return (
    <Box onPointerMove={handlePointerMove} position="absolute" inset="none">
      <Box
        dangerouslySetStyle={{
          aspectRatio,
          boxShadow: "0 0 0 9999px var(--color-overlay-dark)",
          height,
          transform: `translate(${leftX}px, ${topY}px)`,
          width:
            typeof aspectRatio === "undefined" || activeNode !== null
              ? width
              : undefined,
        }}
        pointerEvents="auto"
        position="absolute"
        inset="none"
      >
        <Box colorScheme="dark" height="full" position="relative" width="full">
          <Center onDragChange={handleDragChange} ref={centerRef} />
          <Edge onDragChange={handleDragChange} position="top" scale={scale} />
          <Edge
            onDragChange={handleDragChange}
            position="right"
            scale={scale}
          />
          <Edge
            onDragChange={handleDragChange}
            position="bottom"
            scale={scale}
          />
          <Edge onDragChange={handleDragChange} position="left" scale={scale} />

          <Corner
            onDragChange={handleDragChange}
            position="top-left"
            scale={scale}
          />
          <Corner
            onDragChange={handleDragChange}
            position="top-right"
            scale={scale}
          />
          <Corner
            onDragChange={handleDragChange}
            position="bottom-right"
            scale={scale}
          />
          <Corner
            onDragChange={handleDragChange}
            position="bottom-left"
            scale={scale}
          />
        </Box>
      </Box>
    </Box>
  );
}
