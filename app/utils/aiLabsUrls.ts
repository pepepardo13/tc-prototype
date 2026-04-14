import { useExternalUrls } from "../contexts/ExternalUrlsContext.tsx";

/**
 * Hook that returns the AI Labs Image Edit URL for a specific item
 *
 * @param itemUuid - The Elements item UUID to edit
 * @returns Complete URL with item UUID as a query parameter
 */
export function useAiLabsImageEditUrl(itemUuid: string): string {
  const { aiLabsImageEdit } = useExternalUrls();
  const url = new URL(aiLabsImageEdit);
  url.searchParams.set("elements_item_uuid", itemUuid);
  return url.toString();
}
