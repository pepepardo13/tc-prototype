import type { CreateItemCardProps } from "../types/CreateItemCardProps.ts";
import type { MusicItemCardData } from "../types/MusicItemCardData.ts";
import type { SoundEffectItemCardData } from "../types/SoundEffectItemCardData.ts";
import type { ReactNode } from "react";

import { Box } from "@envato/design-system/components";
import { useState } from "react";

import { useInteractionHandlers } from "../../../hooks/useInteractionHandlers.ts";
import { usePlayAudio } from "../../../hooks/usePlayAudio.ts";
import { ItemCardContextProvider, type Context } from "../ItemCardContext.tsx";
import { SelectionCheckbox } from "../SelectionCheckbox.tsx";
import { SelectionOverlay } from "../SelectionOverlay.tsx";

export type AuralContext<
  T extends MusicItemCardData | SoundEffectItemCardData,
> = Context<T> & {
  audioLoaded: boolean;
  audioProgress: number | undefined;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  handlePlayPause: (e: React.MouseEvent) => void;
  handleSeek: (progress: number) => void;
  isPlaying: boolean;
};

type Props<T extends MusicItemCardData | SoundEffectItemCardData> =
  CreateItemCardProps<T> & {
    children: ReactNode | ((state: AuralContext<T>) => ReactNode);
  };

export function AuralContainer<
  T extends MusicItemCardData | SoundEffectItemCardData,
>({
  actions,
  children,
  item,
  linkBehavior,
  isSelected = false,
  isSelectionMode = false,
  onToggleSelect,
}: Props<T>) {
  const { audioPreviewSourceUrl, duration } = item;
  const [isHovering, setIsHovering] = useState(false);

  const interactionHandlers = useInteractionHandlers<HTMLDivElement>({
    onEnter: () => setIsHovering(true),
    onLeave: () => setIsHovering(false),
  });

  // Show checkbox: always when in selection mode, or on hover when selection is enabled
  const showCheckbox =
    isSelectionMode || (isHovering && onToggleSelect != null);

  const {
    isPlaying,
    audioLoaded,
    audioProgress,
    audioRef,
    handlePlayPause,
    handleSeek,
  } = usePlayAudio({
    audioUrl: audioPreviewSourceUrl,
    ...(duration !== undefined && { duration }),
  });

  return (
    <ItemCardContextProvider
      actions={actions}
      actionsButtonVariant="tertiary"
      actionsTooltipPlacement="top"
      item={item}
      isInteracting={isPlaying}
      isSelected={isSelected}
      isSelectionMode={isSelectionMode}
      linkBehavior={linkBehavior}
      onToggleSelect={onToggleSelect}
    >
      <Box
        backgroundColor={{
          default: "transparent",
          hover: "elevated-1x",
        }}
        borderRadius="extra-round"
        containerType="inline-size"
        flexGrow="1"
        height="full"
        padding="3x"
        position="relative"
        width="full"
        {...interactionHandlers}
      >
        {typeof children === "function"
          ? children({
              actions,
              actionsButtonVariant: "tertiary",
              actionsTooltipPlacement: "top",
              audioLoaded,
              audioProgress,
              audioRef,
              handlePlayPause,
              handleSeek,
              isInteracting: isPlaying,
              isPlaying,
              isSelected,
              isSelectionMode,
              item,
            })
          : children}
        {/* Selection elements rendered last so they stack on top of card content */}
        {isSelected && <SelectionOverlay variant="aural" />}
        {showCheckbox && <SelectionCheckbox />}
      </Box>
    </ItemCardContextProvider>
  );
}
