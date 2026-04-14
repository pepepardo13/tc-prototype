import type { Action } from "~/components/ItemCard/actions/types.ts";
import type { CmsTemplateItemCardData } from "~/components/ItemCard/types/CmsTemplateItemCardData.ts";
import type { CreateItemCardProps } from "~/components/ItemCard/types/CreateItemCardProps.ts";
import type { FontItemCardData } from "~/components/ItemCard/types/FontItemCardData.ts";
import type { GenAIImageItemCardData } from "~/components/ItemCard/types/GenAIImageItemCardData.ts";
import type { GraphicItemCardData } from "~/components/ItemCard/types/GraphicItemCardData.ts";
import type { MusicItemCardData } from "~/components/ItemCard/types/MusicItemCardData.ts";
import type { PhotoItemCardData } from "~/components/ItemCard/types/PhotoItemCardData.ts";
import type { SoundEffectItemCardData } from "~/components/ItemCard/types/SoundEffectItemCardData.ts";
import type { StockVideoItemCardData } from "~/components/ItemCard/types/StockVideoItemCardData.ts";
import type { ThreeDItemCardData } from "~/components/ItemCard/types/ThreeDItemCardData.ts";
import type { VideoTemplateItemCardData } from "~/components/ItemCard/types/VideoTemplateItemCardData.ts";
import type { WebTemplateItemCardData } from "~/components/ItemCard/types/WebTemplateItemCardData.ts";
import type { WordpressItemCardData } from "~/components/ItemCard/types/WordpressItemCardData.ts";
import type { Job, Task, TaskResult } from "~/lib/types/generation.ts";
import type { WorkspaceData } from "~/routes/workspaces/types.ts";
import type { ImageData } from "~/types/ImageData.ts";

const ACTIONS: Action[] = [];

/**
 * Helper to create ImageData objects for Storybook stories.
 * Creates a simple srcSet with multiple sizes using the same URL.
 */
export function createItemImage(url: string): ImageData {
  return {
    fallbackSrc: url,
    srcSet: `${url} 200w, ${url} 400w, ${url} 800w`,
  };
}

/**
 * Base mock video item for Storybook stories
 */
export const mockVideoItem: CreateItemCardProps<StockVideoItemCardData> = {
  actions: ACTIONS,
  item: {
    itemUuid: "1",
    itemType: "stock-video",
    title: "Sample Video",
    authorUsername: "Test Author",
    aspectRatio: 16 / 9,
    image: {
      srcSet: "https://picsum.photos/600/338?random=1",
      fallbackSrc: "https://picsum.photos/600/338?random=1",
    },
    videoUrl:
      "https://assets.elements.envato.com/apps/storefront/stock-video-36d81febde9441b38f5f.webm",
    lengthSeconds: 10,
  },
};

/**
 * Base mock photo item for Storybook stories
 */
export const mockPhotoItem: CreateItemCardProps<PhotoItemCardData> = {
  actions: ACTIONS,
  item: {
    itemUuid: "1",
    itemType: "photos",
    title: "Sample Photo",
    authorUsername: "Test Author",
    image: {
      srcSet: "https://picsum.photos/300/200?random=1",
      fallbackSrc: "https://picsum.photos/300/200?random=1",
    },
    aspectRatio: 16 / 9,
  },
};

/**
 * Create multiple video items with variations
 */
export function createMockVideoItems(
  count: number = 6,
): CreateItemCardProps<StockVideoItemCardData>[] {
  const items: CreateItemCardProps<StockVideoItemCardData>[] = [];

  for (let i = 1; i <= count; i++) {
    items.push({
      ...mockVideoItem,
      item: {
        ...mockVideoItem.item,
        itemUuid: `video-${i}`,
        title: `Sample Video  ${i}`,
        authorUsername: `Author ${i}`,
        image: {
          srcSet: `https://picsum.photos/600/338?random=${i}`,
          fallbackSrc: `https://picsum.photos/600/338?random=${i}`,
        },
        aspectRatio: i % 5 === 0 ? 9 / 16 : 16 / 9,
        videoUrl:
          "https://assets.elements.envato.com/apps/storefront/stock-video-36d81febde9441b38f5f.webm",
        lengthSeconds: i * 10,
      },
    });
  }

  return items;
}

/**
 * Create multiple video template items with variations
 */
export function createMockVideoTemplatesItems(
  count: number = 6,
): CreateItemCardProps<VideoTemplateItemCardData>[] {
  const items: CreateItemCardProps<VideoTemplateItemCardData>[] = [];

  for (let i = 1; i <= count; i++) {
    items.push({
      ...mockVideoItem,
      item: {
        ...mockVideoItem.item,
        itemUuid: `video-template-${i}`,
        itemType: "video-templates",
        title: `Sample Video Template ${i}`,
        authorUsername: `Author ${i}`,
        image: {
          srcSet: `https://picsum.photos/600/338?random=${i + 100}`,
          fallbackSrc: `https://picsum.photos/600/338?random=${i + 100}`,
        },
        aspectRatio: i % 5 === 0 ? 9 / 16 : 16 / 9,
        videoUrl:
          "https://assets.elements.envato.com/apps/storefront/stock-video-36d81febde9441b38f5f.webm",
        lengthSeconds: i * 10,
      },
    });
  }

  return items;
}

/**
 * Create multiple photo items with variations
 */
export function createMockPhotoItems(
  count: number = 6,
): CreateItemCardProps<PhotoItemCardData>[] {
  const items: CreateItemCardProps<PhotoItemCardData>[] = [];

  for (let i = 1; i <= count; i++) {
    items.push({
      ...mockPhotoItem,
      item: {
        ...mockPhotoItem.item,
        itemUuid: `photo-${i}`,
        title: `Sample Photo ${i}`,
        authorUsername: `Author ${i}`,
        image: {
          srcSet: `https://picsum.photos/300/200?random=${i}`,
          fallbackSrc: `https://picsum.photos/300/200?random=${i}`,
        },
        aspectRatio: i % 5 === 0 ? 4 / 3 : 16 / 9,
      },
    });
  }

  return items;
}

/**
 * Base mock music item for Storybook stories
 */
export const mockMusicItem: CreateItemCardProps<MusicItemCardData> = {
  actions: ACTIONS,
  item: {
    itemUuid: "1",
    itemType: "music",
    title: "Sample Music",
    authorUsername: "Test Author",
    aspectRatio: 1,
    duration: 180,
    bpm: 120,
    audioWaveformUrl:
      "https://waveform-staging.envatousercontent.com/tsunami/variant/Web/87/c1/9b/72/ce/v1_E12/E12OWDQ.mp3",
    audioPreviewSourceUrl:
      "https://audio-variant-previews-staging.envatousercontent.com/M4A/51/5f/16/4f/9e/v1_E12/E12OWDQ.m4a",
    audioTracks: [
      {
        id: "225d7875-9370-4bd7-a43d-24021e1528a7",
        title: "Perfect Symphony",
        duration: 213,
        isPrimary: true,
        audioWaveformUrl:
          "https://waveform-staging.envatousercontent.com/tsunami/variant/Web/87/c1/9b/72/ce/v1_E12/E12OWDQ.mp3",
        audioPreviewSourceUrl:
          "https://audio-variant-previews-staging.envatousercontent.com/M4A/51/5f/16/4f/9e/v1_E12/E12OWDQ.m4a",
      },
      {
        id: "770f23d7-c96d-402a-866c-05550dfea600",
        title: "Perfect Symphony Chill",
        duration: 173.95,
        isPrimary: false,
        audioWaveformUrl:
          "https://waveform-staging.envatousercontent.com/tsunami/variant/Web/27/2f/57/d0/9a/v1_E12/E12OWDO.mp3",
        audioPreviewSourceUrl:
          "https://audio-variant-previews-staging.envatousercontent.com/M4A/85/e8/88/2b/cd/v1_E12/E12OWDO.m4a",
      },
    ],
  },
};

/**
 * Base mock music item details for Storybook stories
 */
export const mockMusicItemDetails = {
  itemUuid: "1",
  itemType: "music" as const,
  authorUsername: "Test Author",
  title: "Sample Music Track",
  description: "A beautiful sample music track for your projects",
  aspectRatio: 1.5,
  image: {
    srcSet: "https://picsum.photos/300/300?random=1",
    fallbackSrc: "https://picsum.photos/300/300?random=1",
  },
  itemAttributes: {
    bpm: 120,
    claimClearCompatible: true,
    sampleRate: "44.1 kHz",
    bitRate: "320 kbps",
    isLooped: false,
    vocalsInAudio: ["Male Vocals", "Backing Vocals"],
    audioFilesIncluded: ["WAV", "MP3", "AIF"],
  },
  audioPreviewSourceUrl:
    "https://audio-variant-previews-staging.envatousercontent.com/M4A/51/5f/16/4f/9e/v1_E12/E12OWDQ.m4a",
  audioWaveformUrl:
    "https://waveform-staging.envatousercontent.com/tsunami/variant/Web/87/c1/9b/72/ce/v1_E12/E12OWDQ.mp3",
  duration: 213,
  audioTracks: [
    {
      id: "225d7875-9370-4bd7-a43d-24021e1528a7",
      title: "Perfect Symphony",
      duration: 213,
      isPrimary: true,
      audioWaveformUrl:
        "https://waveform-staging.envatousercontent.com/tsunami/variant/Web/87/c1/9b/72/ce/v1_E12/E12OWDQ.mp3",
      audioPreviewSourceUrl:
        "https://audio-variant-previews-staging.envatousercontent.com/M4A/51/5f/16/4f/9e/v1_E12/E12OWDQ.m4a",
    },
    {
      id: "770f23d7-c96d-402a-866c-05550dfea600",
      title: "Perfect Symphony Chill",
      duration: 173.95,
      isPrimary: false,
      audioWaveformUrl:
        "https://waveform-staging.envatousercontent.com/tsunami/variant/Web/27/2f/57/d0/9a/v1_E12/E12OWDO.mp3",
      audioPreviewSourceUrl:
        "https://audio-variant-previews-staging.envatousercontent.com/M4A/85/e8/88/2b/cd/v1_E12/E12OWDO.m4a",
    },
    {
      id: "c8d9e4f3-a21b-4c5d-9e8f-1234567890ab",
      title: "Perfect Symphony Bop",
      duration: 180,
      isPrimary: false,
      audioWaveformUrl:
        "https://waveform-staging.envatousercontent.com/tsunami/variant/Web/27/2f/57/d0/9a/v1_E12/E12OWDO.mp3",
      audioPreviewSourceUrl:
        "https://audio-variant-previews-staging.envatousercontent.com/M4A/85/e8/88/2b/cd/v1_E12/E12OWDO.m4a",
    },
  ],
  isInWorkspace: false,
};

/**
 * Base mock graphic item for Storybook stories
 */
export const mockGraphicItem: CreateItemCardProps<GraphicItemCardData> = {
  actions: ACTIONS,
  item: {
    itemUuid: "1",
    itemType: "graphics",
    title: "Sample Graphic",
    authorUsername: "Test Author",
    image: {
      srcSet: "https://picsum.photos/300/200?random=1",
      fallbackSrc: "https://picsum.photos/300/200?random=1",
    },
    aspectRatio: 1.5,
    isAnimated: false,
  },
};

/**
 * Create multiple graphic items with variations
 */
export function createMockGraphicItems(
  count: number = 6,
): CreateItemCardProps<GraphicItemCardData>[] {
  const items: CreateItemCardProps<GraphicItemCardData>[] = [];

  for (let i = 1; i <= count; i++) {
    const animated = i % 3 === 0;
    items.push({
      ...mockGraphicItem,
      item: {
        ...mockGraphicItem.item,
        itemUuid: `graphic-${i}`,
        title: `Sample Graphic ${i}`,
        authorUsername: `Author ${i}`,
        image: {
          srcSet: `https://picsum.photos/300/200?random=${i}`,
          fallbackSrc: `https://picsum.photos/300/200?random=${i}`,
        },
        aspectRatio: i % 5 === 0 ? 1.0 : 1.5,
        isAnimated: animated,
        ...(animated && {
          videoUrl:
            "https://assets.elements.envato.com/apps/storefront/stock-video-36d81febde9441b38f5f.webm",
        }),
      },
    });
  }

  return items;
}

/**
 * Base mock font item for Storybook stories
 */
export const mockFontItem: CreateItemCardProps<FontItemCardData> = {
  actions: ACTIONS,
  item: {
    itemUuid: "1",
    itemType: "fonts",
    title: "Sample Font",
    authorUsername: "Test Author",
    image: {
      srcSet: "https://picsum.photos/300/200?random=1",
      fallbackSrc: "https://picsum.photos/300/200?random=1",
    },
    aspectRatio: 1.5,
  },
};

/**
 * Create multiple font items with variations
 */
export function createMockFontItems(
  count: number = 6,
): CreateItemCardProps<FontItemCardData>[] {
  const items: CreateItemCardProps<FontItemCardData>[] = [];

  for (let i = 1; i <= count; i++) {
    items.push({
      ...mockFontItem,
      item: {
        ...mockFontItem.item,
        itemUuid: `font-${i}`,
        title: `Sample Font ${i}`,
        authorUsername: `Author ${i}`,
        image: {
          srcSet: `https://picsum.photos/300/200?random=${i}`,
          fallbackSrc: `https://picsum.photos/300/200?random=${i}`,
        },
        aspectRatio: i % 5 === 0 ? 1.0 : 1.5,
      },
    });
  }

  return items;
}

/**
 * Generate additional audio tracks for a music item
 */
export function generateAdditionalTracks(count: number, baseTitle: string) {
  const variants = [
    "Chill",
    "Upbeat",
    "Ambient",
    "Electronic",
    "Acoustic",
    "Orchestral",
    "Jazz",
    "Rock",
    "Hip Hop",
    "Classical",
    "Experimental",
    "Lo-fi",
    "Synthwave",
    "Funk",
    "Blues",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `variant-${i + 1}`,
    title: `${baseTitle} - ${variants[i % variants.length]}`,
    duration: 160 + i * 15,
    isPrimary: false,
    audioWaveformUrl:
      "https://waveform-staging.envatousercontent.com/tsunami/variant/Web/27/2f/57/d0/9a/v1_E12/E12OWDO.mp3",
    audioPreviewSourceUrl:
      "https://audio-variant-previews-staging.envatousercontent.com/M4A/85/e8/88/2b/cd/v1_E12/E12OWDO.m4a",
  }));
}

/**
 * Create multiple music items with variations
 */
export function createMockMusicItems(
  count: number = 6,
): CreateItemCardProps<MusicItemCardData>[] {
  const items: CreateItemCardProps<MusicItemCardData>[] = [];

  for (let i = 1; i <= count; i++) {
    // Make roughly 50% of items claim clear compatible
    const isClaimClearCompatible = i % 3 === 0 || i % 3 === 1;

    items.push({
      ...mockMusicItem,
      item: {
        ...mockMusicItem.item,
        itemUuid: `music-${i}`,
        title: `Sample Music ${i}`,
        authorUsername: `Author ${i}`,
        duration: 120 + i * 30,
        bpm: 100 + i * 10,
        claimClearCompatible: isClaimClearCompatible,
        audioTracks:
          i % 2 === 0
            ? [
                {
                  id: `track-${i}-1`,
                  title: `Sample Music ${i}`,
                  duration: 120 + i * 30,
                  isPrimary: true,
                  audioWaveformUrl:
                    "https://waveform-staging.envatousercontent.com/tsunami/variant/Web/87/c1/9b/72/ce/v1_E12/E12OWDQ.mp3",
                  audioPreviewSourceUrl:
                    "https://audio-variant-previews-staging.envatousercontent.com/M4A/51/5f/16/4f/9e/v1_E12/E12OWDQ.m4a",
                },
                {
                  id: `track-${i}-2`,
                  title: `Sample Music ${i} Chill`,
                  duration: 100 + i * 20,
                  isPrimary: false,
                  audioWaveformUrl:
                    "https://waveform-staging.envatousercontent.com/tsunami/variant/Web/27/2f/57/d0/9a/v1_E12/E12OWDO.mp3",
                  audioPreviewSourceUrl:
                    "https://audio-variant-previews-staging.envatousercontent.com/M4A/85/e8/88/2b/cd/v1_E12/E12OWDO.m4a",
                },
                {
                  id: `track-${i}-3`,
                  title: `Sample Music ${i} Chill`,
                  duration: 100 + i * 20,
                  isPrimary: false,
                  audioWaveformUrl:
                    "https://waveform-staging.envatousercontent.com/tsunami/variant/Web/27/2f/57/d0/9a/v1_E12/E12OWDO.mp3",
                  audioPreviewSourceUrl:
                    "https://audio-variant-previews-staging.envatousercontent.com/M4A/85/e8/88/2b/cd/v1_E12/E12OWDO.m4a",
                },
              ]
            : [
                {
                  id: `track-${i}-1`,
                  title: `Sample Music ${i}`,
                  duration: 120 + i * 30,
                  isPrimary: true,
                  audioWaveformUrl:
                    "https://waveform-staging.envatousercontent.com/tsunami/variant/Web/87/c1/9b/72/ce/v1_E12/E12OWDQ.mp3",
                  audioPreviewSourceUrl:
                    "https://audio-variant-previews-staging.envatousercontent.com/M4A/51/5f/16/4f/9e/v1_E12/E12OWDQ.m4a",
                },
              ],
      },
    });
  }

  return items;
}

/**
 * Base mock sound effect item for Storybook stories
 */
export const mockSoundEffectItem: CreateItemCardProps<SoundEffectItemCardData> =
  {
    actions: ACTIONS,
    item: {
      itemUuid: "1",
      itemType: "sound-effects",
      title: "Sample Sound Effect",
      authorUsername: "Test Author",
      aspectRatio: 1,
      audioWaveformUrl:
        "https://waveform-staging.envatousercontent.com/tsunami/preview/sfx/5eab9cc3-73e2-4fa3-a758-6be4e08acbbe/de424240-3110-456e-984e-380128f13d08/preview.mp3",
      audioPreviewSourceUrl:
        "https://public-assets-staging.content-platform.envatousercontent.com/5eab9cc3-73e2-4fa3-a758-6be4e08acbbe/c8208830-dbc6-412d-8ed5-7953c184b973/preview.m4a",
      audioClipDurations: [1.2, 5.5, 92.45],
    },
  };

/**
 * Base mock sound effect item details for Storybook stories
 */
export const mockSoundEffectItemDetails = {
  itemUuid: "1",
  itemType: "sound-effects" as const,
  authorUsername: "Test Author",
  title: "Sample Sound Effect",
  description: "A high-quality sound effect for your projects",
  aspectRatio: 1.5,
  audioWaveformUrl:
    "https://waveform-staging.envatousercontent.com/tsunami/preview/sfx/5eab9cc3-73e2-4fa3-a758-6be4e08acbbe/de424240-3110-456e-984e-380128f13d08/preview.mp3",
  audioPreviewSourceUrl:
    "https://public-assets-staging.content-platform.envatousercontent.com/5eab9cc3-73e2-4fa3-a758-6be4e08acbbe/c8208830-dbc6-412d-8ed5-7953c184b973/preview.m4a",
  audioClipDurations: [1.2, 5.5, 92.45],
  itemAttributes: {
    audioClipDurations: [1.2, 5.5, 92.45],
    sampleRate: "16-Bit Stereo, 44.1 kHz",
    bitRate: "320 kbps",
    isLooped: false,
    audioFilesIncluded: ["MP3", "WAV"],
  },
  isInWorkspace: false,
};

/**
 * Create multiple sound effect items with variations
 */
export function createMockSoundEffectItems(
  count: number = 6,
): CreateItemCardProps<SoundEffectItemCardData>[] {
  const items: CreateItemCardProps<SoundEffectItemCardData>[] = [];

  for (let i = 1; i <= count; i++) {
    items.push({
      ...mockSoundEffectItem,
      item: {
        ...mockSoundEffectItem.item,
        itemUuid: i.toString(),
        title: `Sample Sound Effect ${i}`,
        authorUsername: `Author ${i}`,
        audioClipDurations: i % 2 === 0 ? [1.2, 5.5, 92.45] : [2.09],
      },
    });
  }

  return items;
}

/**
 * Base mock 3D item for Storybook stories
 */
export const mockThreeDItem: CreateItemCardProps<ThreeDItemCardData> = {
  actions: ACTIONS,
  item: {
    itemUuid: "1",
    itemType: "3d",
    title: "Sample 3D Model",
    authorUsername: "Test Author",
    image: {
      srcSet: "https://picsum.photos/300/200?random=1",
      fallbackSrc: "https://picsum.photos/300/200?random=1",
    },
    aspectRatio: 1.5,
  },
};

/**
 * Create multiple 3D items with variations
 */
export function createMock3DItems(
  count: number = 6,
): CreateItemCardProps<ThreeDItemCardData>[] {
  const items: CreateItemCardProps<ThreeDItemCardData>[] = [];

  for (let i = 1; i <= count; i++) {
    items.push({
      ...mockThreeDItem,
      item: {
        ...mockThreeDItem.item,
        itemUuid: `3d-${i}`,
        title: `Sample 3D Model ${i}`,
        authorUsername: `Author ${i}`,
        image: {
          srcSet: `https://picsum.photos/300/200?random=${i}`,
          fallbackSrc: `https://picsum.photos/300/200?random=${i}`,
        },
        aspectRatio: 1.5,
      },
    });
  }

  return items;
}

/**
 * Base mock web template item for Storybook stories
 */
export const mockWebTemplateItem: CreateItemCardProps<WebTemplateItemCardData> =
  {
    actions: ACTIONS,
    item: {
      itemUuid: "1",
      itemType: "web-templates",
      title: "Sample Web Template",
      authorUsername: "Test Author",
      image: {
        srcSet: "https://picsum.photos/300/200?random=1",
        fallbackSrc: "https://picsum.photos/300/200?random=1",
      },
      aspectRatio: 1.5,
    },
  };

/**
 * Create multiple web template items with variations
 */
export function createMockWebTemplateItems(
  count: number = 6,
): CreateItemCardProps<WebTemplateItemCardData>[] {
  const items: CreateItemCardProps<WebTemplateItemCardData>[] = [];

  for (let i = 1; i <= count; i++) {
    items.push({
      ...mockWebTemplateItem,
      item: {
        ...mockWebTemplateItem.item,
        itemUuid: `web-template-${i}`,
        title: `Sample Web Template ${i}`,
        authorUsername: `Author ${i}`,
        image: {
          srcSet: `https://picsum.photos/300/200?random=${i + 500}`,
          fallbackSrc: `https://picsum.photos/300/200?random=${i + 500}`,
        },
        aspectRatio: i % 5 === 0 ? 1.0 : 1.5,
      },
    });
  }

  return items;
}

/**
 * Base mock CMS template item for Storybook stories
 */
export const mockCmsTemplateItem: CreateItemCardProps<CmsTemplateItemCardData> =
  {
    actions: ACTIONS,
    item: {
      itemUuid: "1",
      itemType: "cms-templates",
      title: "Sample CMS Template",
      authorUsername: "Test Author",
      image: {
        srcSet: "https://picsum.photos/300/200?random=1",
        fallbackSrc: "https://picsum.photos/300/200?random=1",
      },
      aspectRatio: 1.5,
    },
  };

/**
 * Create multiple CMS template items with variations
 */
export function createMockCmsTemplateItems(
  count: number = 6,
): CreateItemCardProps<CmsTemplateItemCardData>[] {
  const items: CreateItemCardProps<CmsTemplateItemCardData>[] = [];

  for (let i = 1; i <= count; i++) {
    items.push({
      ...mockCmsTemplateItem,
      item: {
        ...mockCmsTemplateItem.item,
        itemUuid: `cms-template-${i}`,
        title: `Sample CMS Template ${i}`,
        authorUsername: `Author ${i}`,
        image: {
          srcSet: `https://picsum.photos/300/200?random=${i + 600}`,
          fallbackSrc: `https://picsum.photos/300/200?random=${i + 600}`,
        },
        aspectRatio: i % 5 === 0 ? 1.0 : 1.5,
      },
    });
  }

  return items;
}

/**
 * Base mock WordPress item for Storybook stories
 */
export const mockWordpressItem: CreateItemCardProps<WordpressItemCardData> = {
  actions: ACTIONS,
  item: {
    itemUuid: "1",
    itemType: "wordpress",
    title: "Sample WordPress Theme",
    authorUsername: "Test Author",
    image: {
      srcSet: "https://picsum.photos/300/200?random=1",
      fallbackSrc: "https://picsum.photos/300/200?random=1",
    },
    aspectRatio: 1.5,
  },
};

/**
 * Create multiple WordPress items with variations
 */
export function createMockWordpressItems(
  count: number = 6,
): CreateItemCardProps<WordpressItemCardData>[] {
  const items: CreateItemCardProps<WordpressItemCardData>[] = [];

  for (let i = 1; i <= count; i++) {
    items.push({
      ...mockWordpressItem,
      item: {
        ...mockWordpressItem.item,
        itemUuid: `wordpress-${i}`,
        title: `Sample WordPress Theme ${i}`,
        authorUsername: `Author ${i}`,
        image: {
          srcSet: `https://picsum.photos/300/200?random=${i + 700}`,
          fallbackSrc: `https://picsum.photos/300/200?random=${i + 700}`,
        },
        aspectRatio: i % 5 === 0 ? 1.0 : 1.5,
      },
    });
  }

  return items;
}

/**
 * Create multiple workspace items with variations
 */
export function createMockWorkspaces(count: number = 6): WorkspaceData[] {
  const workspaceNames = [
    "Skateboard Documentary",
    "Homie poster",
    "Abstract Poster",
    "Nudie Jeans campaign",
    "Brand Identity Project",
    "Social Media Assets",
    "Product Photography",
    "Event Promotional Materials",
    "Website Redesign",
    "Marketing Campaign Q4",
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: `workspace-${index + 1}`,
    name:
      workspaceNames[index % workspaceNames.length] || `Workspace ${index + 1}`,
    previewItem:
      index % 3 === 0
        ? null
        : {
            previewImageUrl: `https://picsum.photos/400/400?random=${index}`,
            aspectRatio: 1.0,
          },
    isFull: false, // Default: most workspaces aren't full
  }));
}

/**
 * Create a successful task with a generated asset
 */
export function createSuccessfulTask(
  taskId: string,
  provider: string = "stability",
  seed?: string,
  isInWorkspace: boolean = false,
): Task {
  const randomSeed = seed || taskId;
  return {
    id: taskId,
    provider,
    taskType: "image_generation",
    status: "completed",
    assets: [
      {
        itemType: "genai-image",
        itemUuid: `asset-${taskId}`,
        aspectRatio: 1,
        image: createItemImage(
          `https://picsum.photos/512/512?random=${randomSeed}`,
        ),
        createdAt: new Date().toISOString(),
        isInWorkspace,
      },
    ],
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  };
}

/**
 * Create a failed task
 */
export function createFailedTask(
  taskId: string,
  provider: string = "gemini",
  error: string = "The generated image was blocked due to safety filters. Please try a different prompt.",
): Task {
  return {
    id: taskId,
    provider,
    taskType: "image_generation",
    status: "failed",
    error,
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  };
}

/**
 * Create a pending task
 */
export function createPendingTask(
  taskId: string,
  provider: string = "stability",
): Task {
  return {
    id: taskId,
    provider,
    taskType: "image_generation",
    status: "pending",
    createdAt: new Date().toISOString(),
  };
}

/**
 * Create a running task
 */
export function createRunningTask(
  taskId: string,
  provider: string = "stability",
): Task {
  return {
    id: taskId,
    provider,
    taskType: "image_generation",
    status: "running",
    createdAt: new Date().toISOString(),
  };
}

/**
 * Create a TaskResult from a Task (for WebSocket updates)
 */
export function createTaskResultFromTask(
  task: Task,
  responseTimeSeconds?: number,
): TaskResult {
  if (task.status === "completed" && task.assets) {
    return {
      taskId: task.id,
      provider: task.provider,
      status: "completed",
      results: task.assets.map((asset) => ({
        id: asset.itemUuid,
        type: asset.itemType,
        url: asset.image?.fallbackSrc ?? "",
        ...(asset.image && { image: asset.image }),
      })),
      ...(responseTimeSeconds !== undefined && { responseTimeSeconds }),
    };
  }

  if (task.status === "failed") {
    return {
      taskId: task.id,
      provider: task.provider,
      status: "failed",
      ...(task.error && { error: task.error }),
    };
  }

  return {
    taskId: task.id,
    provider: task.provider,
    status: task.status as "pending" | "running",
  };
}

/**
 * Create a job from tasks
 */
export function createJob(
  jobId: string,
  tasks: Task[],
  prompt?: string,
  status: string = "completed",
): Job {
  return {
    jobId,
    status,
    jobType: "image_generation",
    createdAt: new Date().toISOString(),
    ...(status === "completed" && { completedAt: new Date().toISOString() }),
    params: { ...(prompt && { prompt }) },
    tasks,
  };
}

/**
 * Create task results for a job
 */
export function createTaskResultsForJob(
  jobId: string,
  tasks: Task[],
): Record<string, TaskResult[]> {
  return {
    [jobId]: tasks.map((task) => createTaskResultFromTask(task)),
  };
}

/**
 * Helper function to create a job with 3 successful tasks
 */
export function createJobWithThreeTasks(
  jobId: string,
  prompt: string,
  baseTaskId: string,
): Job {
  const tasks = [
    createSuccessfulTask(`${baseTaskId}-1`, "stability", `${baseTaskId}1`),
    createSuccessfulTask(`${baseTaskId}-2`, "stability", `${baseTaskId}2`),
    createSuccessfulTask(`${baseTaskId}-3`, "stability", `${baseTaskId}3`),
  ];
  return createJob(jobId, tasks, prompt);
}

/**
 * Helper function to create multiple jobs (at least 3) with 3 tasks each
 */
export function createMultipleJobsWithTasks(
  count: number,
  baseJobId: string,
): { jobs: Job[]; taskResultsByJob: Record<string, TaskResult[]> } {
  const jobs: Job[] = [];
  const taskResultsByJob: Record<string, TaskResult[]> = {};

  const prompts = [
    "A serene mountain landscape at sunrise",
    "A bustling city street with vibrant colors",
    "An abstract geometric pattern with bold shapes",
    "A peaceful beach scene with palm trees",
    "A futuristic space station orbiting a planet",
    "A cozy coffee shop interior with warm lighting",
    "A dramatic storm over the ocean",
    "A magical forest with glowing mushrooms",
    "A vintage car on a country road",
    "A modern minimalist architecture design",
  ];

  for (let i = 0; i < count; i++) {
    const jobId = `${baseJobId}-${i + 1}`;
    const baseTaskId = `task-${baseJobId}-${i + 1}`;
    const prompt = prompts[i % prompts.length] || prompts[0]!;

    const tasks = [
      createSuccessfulTask(`${baseTaskId}-1`, "stability", `${baseTaskId}1`),
      createSuccessfulTask(`${baseTaskId}-2`, "stability", `${baseTaskId}2`),
      createSuccessfulTask(`${baseTaskId}-3`, "stability", `${baseTaskId}3`),
    ];
    jobs.push(createJob(jobId, tasks, prompt));
    Object.assign(taskResultsByJob, createTaskResultsForJob(jobId, tasks));
  }

  return { jobs, taskResultsByJob };
}

/**
 * Create mock generated asset items (genai-image) for workspace stories
 * These items are compatible with ItemCard and include workspace status
 */
export function createMockGenAIItems(
  count: number = 4,
): CreateItemCardProps<GenAIImageItemCardData>[] {
  const items: CreateItemCardProps<GenAIImageItemCardData>[] = [];

  for (let i = 0; i < count; i++) {
    items.push({
      actions: ACTIONS,
      item: {
        itemType: "genai-image" as const,
        itemUuid: `genai-asset-${i + 1}`,
        aspectRatio: i % 2 === 0 ? 16 / 9 : 1, // Mix of landscape and square
        image: createItemImage(
          `https://picsum.photos/512/512?random=genai-${i + 100}`,
        ),
      },
    });
  }

  return items;
}
