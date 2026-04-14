import type { CreateItemCardProps } from "../../types/CreateItemCardProps.ts";
import type { MusicItemCardData } from "../../types/MusicItemCardData.ts";

import { useTranslations } from "../../../../contexts/TranslationsContext.tsx";
import Waveform from "../../../Waveform/Waveform.tsx";
import { AuralContainer } from "../../AuralContainer/AuralContainer.tsx";
import { MusicGrid } from "../../AuralContainer/layouts/MusicGrid.tsx";

import { TrackVariant } from "./TrackVariant.tsx";

export type Props = CreateItemCardProps<MusicItemCardData>;

export function MusicItemCard({ item, ...restProps }: Props) {
  const { audioTracks, audioWaveformUrl, duration } = item;

  const t = useTranslations();

  const secondaryTracks =
    audioTracks?.filter((track) => !track.isPrimary) || [];

  return (
    <AuralContainer item={item} {...restProps}>
      {({ audioProgress, handlePlayPause, handleSeek, isPlaying }) => (
        <MusicGrid
          handlePlayPause={handlePlayPause}
          isPlaying={isPlaying}
          waveform={
            <Waveform
              ariaLabel={t("music.waveform", {
                title: item.title || t("music.unknownTrack"),
              })}
              duration={duration || 0}
              onSeek={handleSeek}
              {...(audioProgress !== undefined && {
                progress: audioProgress,
              })}
              waveformDataUrl={audioWaveformUrl}
            />
          }
          variants={secondaryTracks.map((track) => (
            <TrackVariant key={track.id} track={track} showTitle={true} />
          ))}
        />
      )}
    </AuralContainer>
  );
}
