import type { CreateItemCardData } from "./CreateItemCardData.ts";
import type { StockAttributionProps } from "./StockAttributionProps.ts";

export type MusicItemCardData = CreateItemCardData<
  "music",
  StockAttributionProps & {
    audioPreviewSourceUrl: string;
    audioTracks?:
      | Array<{
          id: string;
          title: string;
          duration: number;
          isPrimary: boolean;
          audioWaveformUrl: string;
          audioPreviewSourceUrl: string;
        }>
      | undefined;
    audioWaveformUrl: string;
    bpm?: number | undefined;
    claimClearCompatible?: boolean;
    duration: number;
  }
>;
