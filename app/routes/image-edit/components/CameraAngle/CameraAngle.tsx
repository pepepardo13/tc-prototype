import { Box } from "@envato/design-system/components";
import {
  useCallback,
  useEffect,
  type PropsWithChildren,
  type TransitionEvent,
} from "react";

import { useImageEditorContext } from "../ImageEditorProvider.tsx";

import { CubeSide } from "./CubeSide.tsx";

type Props = PropsWithChildren<{
  onDismissEnd?: (() => void) | undefined;
}>;

const VOLUME_DEPTH = 400 as const;
const DEPTH_PER_ZOOM_LEVEL = VOLUME_DEPTH / 5;

export function CameraAngle({ children, onDismissEnd }: Props) {
  const { cameraAngle, imageDimensions, setCameraAngle, toolMode } =
    useImageEditorContext();

  useEffect(() => {
    if (toolMode !== "camera-angle") {
      setCameraAngle({ pitch: 0, yaw: 0, zoom: 0 });
    }
  }, [toolMode, setCameraAngle]);

  const handleTransitionEnd = useCallback(
    (event: TransitionEvent) => {
      if (event.target !== event.currentTarget) return;

      if (typeof onDismissEnd === "function" && toolMode !== "camera-angle") {
        onDismissEnd();
      }
    },
    [onDismissEnd, toolMode],
  );

  if (imageDimensions === null) return children;

  const { pitch, yaw, zoom } = cameraAngle;

  const depth = zoom * DEPTH_PER_ZOOM_LEVEL;

  return (
    <Box
      dangerouslySetStyle={{
        height: imageDimensions.height,
        perspectiveOrigin: "50% 50%",
        transform:
          toolMode === "camera-angle"
            ? `perspective(2000px) translateZ(${depth}px)`
            : undefined,
        transformStyle: "preserve-3d",
        width: imageDimensions.width,
      }}
      onTransitionEnd={handleTransitionEnd}
      position="relative"
      transitionDuration="long"
      transitionProperty="transform"
      transitionTimingFunction="ease-out"
    >
      <Box
        dangerouslySetStyle={{
          backfaceVisibility: "hidden",
          transform: `rotateX(${pitch}deg) rotateY(${yaw}deg) translateZ(${-1 * VOLUME_DEPTH}px)`,
        }}
        transitionDuration="long"
        transitionProperty="transform"
        transitionTimingFunction="ease-out"
      >
        {children}
      </Box>
      <CubeSide depth={VOLUME_DEPTH} side="top" />
      <CubeSide depth={VOLUME_DEPTH} side="right" />
      <CubeSide depth={VOLUME_DEPTH} side="bottom" />
      <CubeSide depth={VOLUME_DEPTH} side="left" />
    </Box>
  );
}
