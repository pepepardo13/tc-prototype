import type { ReactNode } from "react";

import { Box, Text, Tooltip } from "@envato/design-system/components";

import { useTranslations } from "../../../../contexts/TranslationsContext.tsx";
import { formatDuration } from "../../../../utils/formatDuration.ts";
import { PlayButton } from "../../../PlayButton/PlayButton.tsx";
import { useItemCardContext } from "../../ItemCardContext.tsx";
import { ActionsGroup } from "../ActionsGroup.tsx";
import { Attribution } from "../Attribution.tsx";

import styles from "./AuralGrid.module.scss";

type Props = {
  handlePlayPause: (e: React.MouseEvent) => void;
  isPlaying: boolean;
  waveform: ReactNode;
};

function TooltipContent({
  audioClipDurations,
  clipsCountText,
}: {
  audioClipDurations: number[];
  clipsCountText: string;
}) {
  // audioClipDurations is already sorted in ascending order
  if (audioClipDurations.length === 0) {
    return null;
  }

  let longestShortest = null;

  if (
    audioClipDurations.length === 1 ||
    audioClipDurations[0] === audioClipDurations[audioClipDurations.length - 1]
  ) {
    longestShortest = formatDuration(audioClipDurations[0]);
  } else {
    longestShortest = `${formatDuration(audioClipDurations[0])} → ${formatDuration(audioClipDurations[audioClipDurations.length - 1])}`;
  }

  return (
    <>
      <Box>
        <Text variant="body-small" color="secondary">
          {clipsCountText}
        </Text>
      </Box>
      <Box>
        <Text variant="body-small" color="secondary">
          {longestShortest}
        </Text>
      </Box>
    </>
  );
}

export function SoundEffectGrid({
  handlePlayPause,
  isPlaying,
  waveform,
}: Props) {
  const t = useTranslations();
  const { item } = useItemCardContext();

  // Type assertion for sound-effects-specific properties
  const soundEffectItem = item as typeof item & {
    audioClipDurations: number[];
  };
  const { audioClipDurations } = soundEffectItem;

  const clipsCount = audioClipDurations?.length || 0;

  return (
    <Box dangerouslySetClassName={styles["soundEffectGrid"]}>
      {/* Play Button */}
      <Box dangerouslySetClassName={styles["gridItemPlay"]}>
        <PlayButton isPlaying={isPlaying} onClick={handlePlayPause} />
      </Box>

      {/* Title and Author */}
      <Box dangerouslySetClassName={styles["gridItemTitle"]} minWidth="none">
        <Attribution />
      </Box>

      {/* Waveform */}
      <Box
        dangerouslySetClassName={styles["gridItemWaveform"]}
        dangerouslySetStyle={{
          viewTransitionName: `item-media-${item.itemUuid}`,
        }}
      >
        {waveform}
      </Box>

      {/* Clips Count */}
      <Box dangerouslySetClassName={styles["gridItemClips"]}>
        {clipsCount > 0 ? (
          <Tooltip
            trigger={
              <Text variant="body-small" color="secondary">
                {clipsCount} {clipsCount === 1 ? "clip" : "clips"}
              </Text>
            }
          >
            <TooltipContent
              clipsCountText={
                clipsCount === 1
                  ? t("sound-effects.clips.singular", {
                      count: clipsCount,
                    })
                  : t("sound-effects.clips.plural", {
                      count: clipsCount,
                    })
              }
              audioClipDurations={audioClipDurations || []}
            />
          </Tooltip>
        ) : null}
      </Box>

      {/* Action Buttons */}
      <Box dangerouslySetClassName={styles["soundEffectGridItemActions"]}>
        <ActionsGroup />
      </Box>
    </Box>
  );
}
