import type { DesignSystem } from "@envato/design-system";
import type { CustomPopoverBase } from "@envato/design-system/components";
import type { ComponentPropsWithoutRef } from "react";

type Placement = Exclude<
  ComponentPropsWithoutRef<typeof CustomPopoverBase>["placement"],
  undefined
>;

type TransformOrigin = Exclude<DesignSystem["transformOrigin"], undefined>;

export const transformOriginMap = {
  bottom: "center top",
  "bottom-end": "right top",
  "bottom-start": "left top",
  left: "right center",
  "left-end": "right bottom",
  "left-start": "right top",
  right: "left center",
  "right-end": "left bottom",
  "right-start": "left top",
  top: "center bottom",
  "top-end": "right bottom",
  "top-start": "left bottom",
} as const satisfies Record<Placement, TransformOrigin>;
