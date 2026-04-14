import type { CreateItemCardProps } from "../types/CreateItemCardProps.ts";
import type { SoundEffectItemCardData } from "../types/SoundEffectItemCardData.ts";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import Waveform from "../../Waveform/Waveform.tsx";
import { AuralContainer } from "../AuralContainer/AuralContainer.tsx";
import { SoundEffectGrid } from "../AuralContainer/layouts/SoundEffectGrid.tsx";

export type Props = CreateItemCardProps<SoundEffectItemCardData>;

export function SoundEffectItemCard({ item, ...restProps }: Props) {
  const { audioWaveformUrl, audioClipDurations } = item;

  const t = useTranslations();

  const totalDuration =
    audioClipDurations && audioClipDurations.length > 0
      ? audioClipDurations.reduce((acc, curr) => acc + curr, 0)
      : undefined;

  return (
    <AuralContainer item={{ ...item, duration: totalDuration }} {...restProps}>
      {({ audioProgress, handlePlayPause, handleSeek, isPlaying }) => (
        <SoundEffectGrid
          handlePlayPause={handlePlayPause}
          isPlaying={isPlaying}
          waveform={
            <Waveform
              ariaLabel={t("sound-effects.waveform", {
                title: item.title || t("sound-effects.unknownTrack"),
              })}
              {...(totalDuration && {
                duration: totalDuration,
              })}
              onSeek={handleSeek}
              {...(audioProgress !== undefined && {
                progress: audioProgress,
              })}
              waveformDataUrl={audioWaveformUrl}
            />
          }
        />
      )}
    </AuralContainer>
  );
}
