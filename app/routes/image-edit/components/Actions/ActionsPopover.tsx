import type { ToolMode } from "../../types/ToolMode.ts";

import {
  Box,
  CustomPopoverBase,
  TooltipGroup,
} from "@envato/design-system/components";
import {
  useCallback,
  type PointerEvent,
  type ReactElement,
  type RefObject,
} from "react";

import { useImageEditorContext } from "../ImageEditorProvider.tsx";

import { Actions } from "./Actions.tsx";
import styles from "./ActionsPopover.module.scss";

type Props = {
  trigger: ReactElement<{ ref?: RefObject<HTMLDivElement> }>;
};

const TOOL_MODES_WITH_ACTIONS_POPOVER: ToolMode[] = ["brush", "eraser", "pan"];

export function ActionsPopover({ trigger }: Props) {
  const { toolMode } = useImageEditorContext();
  const visible = TOOL_MODES_WITH_ACTIONS_POPOVER.includes(toolMode);

  const handlePointerDown = useCallback((event: PointerEvent) => {
    event.stopPropagation();
  }, []);

  return (
    <CustomPopoverBase
      display={visible ? { default: "none", 700: "block" } : "none"}
      offset="2x"
      onPointerDown={handlePointerDown}
      open
      placement="right"
      trigger={trigger}
    >
      <TooltipGroup>
        <Box
          backdropFilter="blur-popover"
          backgroundColor={{
            default: "elevated-1x",
            "can-hover": "transparent",
            hover: "elevated-1x",
          }}
          borderRadius="4x"
          borderStyle="solid"
          borderColor="tertiary"
          borderWidth="thin"
          contain="layout"
          dangerouslySetClassName={styles["background"]}
          maxWidth="fit-content"
          padding="2x"
          transitionDuration="short"
          transitionProperty="dangerously-transition-background-color"
          transitionTimingFunction="ease-out"
        >
          <Actions />
        </Box>
      </TooltipGroup>
    </CustomPopoverBase>
  );
}
