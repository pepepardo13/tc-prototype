import type { ReactNode } from "react";

import {
  Box,
  Icon,
  Text,
  TextButton,
  Tooltip,
} from "@envato/design-system/components";
import { useState } from "react";

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
  variants?: ReactNode[] | undefined;
  waveform: ReactNode;
};

export function MusicGrid({
  handlePlayPause,
  isPlaying,
  variants = [],
  waveform,
}: Props) {
  const { item } = useItemCardContext();
  const [showVariants, setShowVariants] = useState(false);

  const variantCount = variants.length;

  const handleVariantsToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowVariants(!showVariants);
  };

  // Type assertion for music-specific properties
  const musicItem = item as typeof item & {
    duration: number;
    bpm?: number | null | undefined;
    claimClearCompatible?: boolean;
  };
  const { duration, bpm, claimClearCompatible } = musicItem;
  const t = useTranslations();

  return (
    <Box
      dangerouslySetClassName={styles["musicGrid"]}
      dangerouslySetStyle={{
        viewTransitionName: `item-media-${item.itemUuid}`,
      }}
    >
      <Box dangerouslySetClassName={styles["musicTrackRow"]}>
        {/* Play Button */}
        <Box dangerouslySetClassName={styles["gridItemPlay"]}>
          <PlayButton isPlaying={isPlaying} onClick={handlePlayPause} />
        </Box>

        {/* Title and Author */}
        <Box dangerouslySetClassName={styles["gridItemTitle"]}>
          <Attribution />
        </Box>

        {/* Claim Clear Icon - dedicated column */}
        <Box dangerouslySetClassName={styles["gridItemClaimClear"]}>
          {claimClearCompatible && (
            <Tooltip
              placement="top"
              trigger={<Icon name="claim-clear" size="1x" />}
            >
              {t("music.claimClear.tooltip")}
            </Tooltip>
          )}
        </Box>

        {/* Variants Toggle - dedicated column */}
        <Box dangerouslySetClassName={styles["gridItemVariants"]}>
          {variantCount > 0 && (
            <TextButton
              size="medium"
              icon={showVariants ? "chevron-up" : "chevron-down"}
              iconPosition="trailing"
              onClick={handleVariantsToggle}
            >
              +{variantCount}
            </TextButton>
          )}
        </Box>

        {/* Waveform */}
        <Box dangerouslySetClassName={styles["gridItemWaveform"]}>
          {waveform}
        </Box>

        {/* Duration */}
        <Box dangerouslySetClassName={styles["gridItemDuration"]}>
          <Text variant="body-small">{formatDuration(duration)}</Text>
        </Box>

        {/* BPM */}
        <Box dangerouslySetClassName={styles["gridItemBpm"]}>
          {bpm && <Text variant="body-small">BPM {bpm}</Text>}
        </Box>

        {/* Action Buttons */}
        <Box dangerouslySetClassName={styles["musicGridItemActions"]}>
          <ActionsGroup />
        </Box>
      </Box>

      {/* Variant Rows - rendered inside grid to use subgrid */}
      {showVariants && variants}
    </Box>
  );
}
