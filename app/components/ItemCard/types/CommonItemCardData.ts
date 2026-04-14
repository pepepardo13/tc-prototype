import type { DownloadFormat } from "../../../types/DownloadFormat.ts";

export type CommonItemCardData = {
  aspectRatio: number;
  downloadFormats?: DownloadFormat[] | undefined;
  itemUuid: string;
};
