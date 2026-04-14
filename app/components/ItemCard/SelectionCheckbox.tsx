import { Box } from "@envato/design-system/components";
import { memo, useCallback, type ChangeEvent, type MouseEvent } from "react";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

import { useItemCardContext } from "./ItemCardContext.tsx";
import { OpaqueCheckbox } from "./OpaqueCheckbox.tsx";

/**
 * Checkbox overlay for item card selection.
 * Positioned in top-right corner with dark color scheme for visibility.
 * Reads selection state from ItemCardContext.
 *
 * Parent should conditionally render based on showCheckbox logic:
 * ```tsx
 * {showCheckbox && <SelectionCheckbox />}
 * ```
 */
export const SelectionCheckbox = memo(function SelectionCheckbox() {
  const t = useTranslations();
  const { isSelected, item, onToggleSelect } = useItemCardContext();
  const { itemUuid } = item;

  // Handle keyboard interaction (Space/Enter keys) on the checkbox itself.
  // Keyboard events don't provide shiftKey in a useful way for range selection,
  // so we only support shift+click via mouse for range selection.
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      onToggleSelect?.(itemUuid, false);
    },
    [itemUuid, onToggleSelect],
  );

  // Handle mouse clicks on the wrapper to capture shiftKey for range selection.
  // This is separate from onChange because we need access to the MouseEvent's shiftKey property.
  const handleClick = useCallback(
    (e: MouseEvent) => {
      // Prevent the click from bubbling to the card link
      e.preventDefault();
      e.stopPropagation();
      onToggleSelect?.(itemUuid, e.shiftKey);
    },
    [itemUuid, onToggleSelect],
  );

  return (
    <Box
      colorScheme="dark"
      position="absolute"
      right="none"
      top="2x"
      onClick={handleClick}
    >
      <OpaqueCheckbox
        aria-label={t("workspace.bulkActions.selectItem")}
        checked={isSelected}
        name={`select-${itemUuid}`}
        value={itemUuid}
        onChange={handleChange}
      />
    </Box>
  );
});
