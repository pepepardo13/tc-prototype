import type { OverlayVisibility } from "./OverlayVisibility.ts";

import { Box } from "@envato/design-system/components";

import { useItemCardContext } from "../../ItemCardContext.tsx";
import { Actions } from "../../actions/Actions.tsx";

type Props = {
  show: OverlayVisibility;
};

export function ActionsOverlay({ show }: Props) {
  const { actions, isInteracting } = useItemCardContext();

  const shouldShow =
    actions.length > 0 &&
    (show === true ||
      (show === "idle" && !isInteracting) ||
      (show === "interaction" && isInteracting));

  return (
    <Box
      bottom="2x"
      colorScheme="light"
      display="flex"
      flexDirection="column-reverse"
      gap="1x"
      opacity={{ default: "1", "can-hover": shouldShow ? "1" : "0" }}
      position="absolute"
      right="2x"
      transitionDuration="short"
      transitionProperty="opacity"
      transitionTimingFunction="ease-out"
    >
      <Actions />
    </Box>
  );
}
