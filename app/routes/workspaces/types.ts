// What the API returns (backend format with 'preview')
export type WorkspaceResponseData = {
  id: string;
  name: string;
  previewItemUuid: string | null;
  preview: {
    previewImageUrl: string;
    aspectRatio: number;
  } | null;
  isFull: boolean;
  itemCount: number;
};

// What components use (frontend format with 'previewItem')
export type PreviewItem = {
  previewImageUrl: string;
  aspectRatio: number;
};

export type WorkspaceData = {
  id: string;
  name: string;
  previewItem: PreviewItem | null;
  isFull: boolean;
};
