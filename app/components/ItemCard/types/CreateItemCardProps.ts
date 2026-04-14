import type { CommonItemCardData } from "./CommonItemCardData.ts";
import type { Action } from "../actions/types.ts";

// Selection props for bulk select functionality
// Note: Using `| undefined` explicitly to support exactOptionalPropertyTypes
// when props flow through multiple component layers
export type SelectionProps = {
  isSelected?: boolean | undefined;
  isSelectionMode?: boolean | undefined;
  /**
   * Toggle selection for an item.
   * @param itemUuid - The UUID of the item to toggle
   * @param shiftKey - Whether shift was held during the click (for range selection)
   */
  onToggleSelect?: ((itemUuid: string, shiftKey?: boolean) => void) | undefined;
};

export type CreateItemCardProps<T extends CommonItemCardData> = {
  actions: Action[];
  item: T;
  linkBehavior?: "push" | "replace" | undefined;
  analyticsSelectItemContextDetail?: string | null | undefined;
} & SelectionProps;
