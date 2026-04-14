import type { ItemType } from "../types/ItemType.ts";

import { useCallback, useState } from "react";

export function useDownloadFormat(
  _itemUuid: string | undefined,
  _itemType: ItemType,
  _projectName?: string | undefined,
) {
  const [isDownloading] = useState(false);

  const handleDownload = useCallback(
    (_assetUuid: string, _overrideProjectName?: string) => {
      // No-op in standalone Storybook
    },
    [],
  );

  return {
    handleDownload,
    isDownloading,
  };
}
