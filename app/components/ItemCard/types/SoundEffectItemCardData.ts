import type { CreateItemCardData } from "./CreateItemCardData.ts";
import type { StockAttributionProps } from "./StockAttributionProps.ts";

export type SoundEffectItemCardData = CreateItemCardData<
  "sound-effects",
  StockAttributionProps & {
    audioClipDurations: number[];
    audioPreviewSourceUrl: string;
    audioWaveformUrl: string;
    duration?: number | undefined;
  }
>;
