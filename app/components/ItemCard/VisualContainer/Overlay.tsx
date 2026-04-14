import type { OverlayVisibility } from "./overlays/OverlayVisibility.ts";

import { ActionsOverlay } from "./overlays/ActionsOverlay.tsx";
import { AttributionOverlay } from "./overlays/AttributionOverlay.tsx";

export type Props = {
  /** Shows the item card's action buttons. */
  showActions?: OverlayVisibility | undefined;
  /** Shows the item's title and author. */
  showAttribution?: OverlayVisibility | undefined;
};

export function Overlay({
  showActions = false,
  showAttribution = false,
}: Props) {
  return (
    <>
      <AttributionOverlay show={showAttribution} />
      <ActionsOverlay show={showActions} />
    </>
  );
}
