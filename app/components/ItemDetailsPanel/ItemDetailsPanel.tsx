/**
 * Storybook-lab mirror of apps/web/app/components/ItemDetailsPanel.
 *
 * Key differences from the production component:
 * - Accepts an `onClose` callback prop instead of deriving close behaviour
 *   from React Router URL navigation.
 * - Scroll-reset is triggered by `open` changing rather than by route
 *   navigation events (no `useNavigation` dependency).
 * - All other behaviour and visuals are identical to production.
 */
import { Box } from "@envato/design-system/components";
import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent,
  type PropsWithChildren,
} from "react";

import { useGlobalState } from "../../contexts/GlobalStateContext.tsx";
import { useGlobalEscapeKeyHandler } from "../../hooks/useGlobalEscapeKeyHandler.ts";

import styles from "./ItemDetailsPanel.module.scss";

type Props = PropsWithChildren<{
  /** Whether the panel is visible */
  open: boolean;
  /** Called when the user dismisses the panel (close button, backdrop click, Escape) */
  onClose: () => void;
}>;

export function ItemDetailsPanel({ children, open, onClose }: Props) {
  const { setNavPanelMinimized, setItemDetailsPanelOpen } = useGlobalState();

  useEffect(() => {
    setItemDetailsPanelOpen(open);
    if (open) {
      document.body.setAttribute("data-details-panel-open", "");
      setNavPanelMinimized(true);
    } else {
      document.body.removeAttribute("data-details-panel-open");
    }
    return () => {
      document.body.removeAttribute("data-details-panel-open");
    };
  }, [open, setNavPanelMinimized, setItemDetailsPanelOpen]);

  const handleEscapeKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (!open) return;
      event.preventDefault();
      onClose();
    },
    [onClose, open],
  );

  useGlobalEscapeKeyHandler(handleEscapeKeydown);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) {
      ref.current?.scrollTo({ behavior: "smooth", top: 0 });
    }
  }, [open]);

  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.currentTarget !== event.target) {
        event.stopPropagation();
        return;
      }
      onClose();
    },
    [onClose],
  );

  return (
    <Box flexShrink="0" inert={!open} width="none">
      {/* Dimmed blur backdrop */}
      <Box
        backdropFilter="blur-popover"
        backgroundColor="overlay-dark"
        inset="none"
        opacity={open ? "1" : "0"}
        pointerEvents={open ? undefined : "none"}
        position="fixed"
        transitionDuration="short"
        transitionProperty="opacity"
        transitionTimingFunction="ease-out"
        zIndex="1"
      />

      {/* Scroll container — clicking the exposed backdrop area closes the panel */}
      <Box
        bottom="none"
        dangerouslySetClassName={styles["scrollContainer"]}
        insetX="none"
        onClick={handleBackdropClick}
        overflowX="hidden"
        overflowY={open ? "scroll" : "hidden"}
        pointerEvents={open ? undefined : "none"}
        position="fixed"
        ref={ref}
        zIndex="1"
      >
        {/* Sliding panel */}
        <Box
          backgroundColor="background"
          borderLeftColor="tertiary"
          borderLeftStyle="solid"
          borderLeftWidth="thin"
          containerType="inline-size"
          dangerouslySetClassName={styles["content"]}
          paddingX="4x"
          paddingY="5x"
          position="absolute"
          right="none"
          top="none"
          transform={open ? undefined : "right-full"}
          transitionDuration="short"
          transitionProperty="transform"
          transitionTimingFunction="ease-out"
        >
          <Box containerType="inline-size">{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
