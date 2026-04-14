import { Box, Text } from "@envato/design-system/components";

import { useTranslations } from "../../../../contexts/TranslationsContext.tsx";
import { usePlayAudio } from "../../../../hooks/usePlayAudio.ts";
import { formatDuration } from "../../../../utils/formatDuration.ts";
import { PlayButton } from "../../../PlayButton/PlayButton.tsx";
import Waveform from "../../../Waveform/Waveform.tsx";
import styles from "../../AuralContainer/layouts/AuralGrid.module.scss";

export type TrackVariantData = {
  audioPreviewSourceUrl: string;
  audioWaveformUrl: string;
  duration: number;
  id: string;
  title: string;
};

type Props = {
  showTitle?: boolean;
  track: TrackVariantData;
};

export function TrackVariant({ showTitle = true, track }: Props) {
  const t = useTranslations();
  const { audioProgress, handlePlayPause, handleSeek, isPlaying } =
    usePlayAudio({
      audioUrl: track.audioPreviewSourceUrl,
      duration: track.duration,
    });

  return (
    <>
      {/* Track Variant Row - uses subgrid to align with parent */}
      <Box dangerouslySetClassName={styles["trackVariantRow"]}>
        {/* Play Button */}
        <Box dangerouslySetClassName={styles["gridItemPlay"]}>
          <PlayButton isPlaying={isPlaying} onClick={handlePlayPause} />
        </Box>

        {/* Title */}
        <Box
          dangerouslySetClassName={styles["gridItemTitle"]}
          minWidth="none"
          whiteSpace="nowrap"
        >
          {showTitle && (
            <Text variant="body-small" truncate>
              {track.title}
            </Text>
          )}
        </Box>

        {/* Waveform */}
        <Box dangerouslySetClassName={styles["gridItemWaveform"]}>
          <Waveform
            ariaLabel={t("music.waveform", { title: track.title })}
            duration={track.duration}
            onSeek={handleSeek}
            {...(audioProgress !== undefined && { progress: audioProgress })}
            waveformDataUrl={track.audioWaveformUrl}
          />
        </Box>

        {/* Duration */}
        <Box dangerouslySetClassName={styles["gridItemDuration"]}>
          <Text variant="body-small">{formatDuration(track.duration)}</Text>
        </Box>

        {/* Empty BPM column to maintain grid alignment */}
        <Box dangerouslySetClassName={styles["gridItemBpm"]} />

        {/* Empty Actions column to maintain grid alignment */}
        <Box dangerouslySetClassName={styles["musicGridItemActions"]} />
      </Box>
    </>
  );
}
