import { Box, Icon, type iconNames } from "@envato/design-system/components";

import { useImageEditorContext } from "../ImageEditorProvider.tsx";

type Side = "top" | "right" | "bottom" | "left";

const dimensionMap = {
  bottom: "width",
  left: "height",
  right: "height",
  top: "width",
} as const satisfies Record<Side, "height" | "width">;

const iconMap = {
  bottom: "chevron-down",
  left: "chevron-left",
  right: "chevron-right",
  top: "chevron-up",
} as const satisfies Record<Side, (typeof iconNames)[number]>;

const pitchMap = {
  bottom: 90,
  left: 0,
  right: 0,
  top: -90,
} as const satisfies Record<Side, number>;

const yawMap = {
  bottom: 0,
  left: 90,
  right: -90,
  top: 0,
} as const satisfies Record<Side, number>;

const yawSignMap = {
  bottom: -1,
  left: 1,
  right: 1,
  top: 1,
} as const satisfies Record<Side, 1 | -1>;

type Props = {
  depth: number;
  side: Side;
};

export function CubeSide({ depth, side }: Props) {
  const { cameraAngle, imageDimensions } = useImageEditorContext();

  if (imageDimensions === null) return null;

  const { pitch, yaw } = cameraAngle;

  const translateX =
    side === "left" || side === "right"
      ? `translateX(${imageDimensions.width / 2 - depth}px)`
      : undefined;

  const translateY =
    side === "top" || side === "bottom"
      ? `translateY(${imageDimensions.height / 2 - depth}px)`
      : undefined;

  const rotateX = `rotateX(${pitch + pitchMap[side]}deg)`;

  const rotateY =
    side === "left" || side === "right"
      ? `rotateY(${yawSignMap[side] * (yaw + yawMap[side])}deg)`
      : undefined;

  const rotateZ =
    side === "top" || side === "bottom"
      ? `rotateZ(${yawSignMap[side] * (yaw + yawMap[side])}deg)`
      : undefined;

  const translateZ = `translateZ(${-1 * (imageDimensions[dimensionMap[side]] / 2)}px)`;

  const transform = [
    translateX,
    translateY,
    rotateX,
    rotateY,
    rotateZ,
    translateZ,
  ]
    .filter(Boolean)
    .join(" ");

  const height = side === "top" || side === "bottom" ? depth * 2 : undefined;
  const width = side === "left" || side === "right" ? depth * 2 : undefined;

  return (
    <Box
      alignItems="center"
      dangerouslySetStyle={{
        backfaceVisibility: "hidden",
        borderColor: "var(--color-surface-inverse)",
        borderBlockStyle: "solid",
        borderWidth: "5px",
        boxShadow: "inset 0 0 48px 0 var(--color-surface-inverse)",
        height,
        transform,
        width,
      }}
      display="flex"
      height={typeof height === "undefined" ? "full" : undefined}
      justifyContent="center"
      left="none"
      position="absolute"
      transitionDuration="long"
      transitionProperty="transform"
      transitionTimingFunction="ease-out"
      top="none"
      width={typeof width === "undefined" ? "full" : undefined}
    >
      <Icon color="primary" height={depth} name={iconMap[side]} />
    </Box>
  );
}
