import { Columns } from "@envato/design-system/components";

import { useItemCardContext } from "../ItemCardContext.tsx";
import { Actions } from "../actions/Actions.tsx";

export function ActionsGroup() {
  const { actions, isSelectionMode } = useItemCardContext();

  // Hide actions when in selection mode to reduce clutter
  if (isSelectionMode || actions.length === 0) {
    return null;
  }

  return (
    <Columns order="reversed" spacing="1x">
      <Actions />
    </Columns>
  );
}
