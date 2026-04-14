import type { ItemType } from "../types/ItemType.ts";

import { useCallback, useState } from "react";

export function useDownloadItem(
  _itemUuid: string | undefined,
  _itemType: ItemType,
  _options?:
    | {
        pixelsquidFormat?: "png" | "psd" | undefined;
        pixelsquidAngle?: string | undefined;
        projectName?: string | undefined;
      }
    | undefined,
) {
  const [isDownloading] = useState(false);

  const handleDownload = useCallback((_overrideProjectName?: string) => {
    // No-op in standalone Storybook
  }, []);

  return {
    handleDownload,
    isDownloading,
  };
}
