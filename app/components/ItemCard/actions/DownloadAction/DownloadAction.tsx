import { useItemCardContext } from "../../ItemCardContext.tsx";

import { DirectDownloadAction } from "./DirectDownloadAction.tsx";
import { SelectFormatAction } from "./SelectFormatAction.tsx";

export type Props = {
  projectName?: string | undefined;
};

export function DownloadAction(props: Props) {
  const { item } = useItemCardContext();

  const hasDownloadFormats = (item.downloadFormats?.length ?? 0) > 0;

  return hasDownloadFormats ? (
    <SelectFormatAction {...props} />
  ) : (
    <DirectDownloadAction {...props} />
  );
}
