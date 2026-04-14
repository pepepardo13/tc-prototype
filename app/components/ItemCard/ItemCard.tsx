import {
  AddOnItemCard,
  type Props as AddOnsProps,
} from "./cards/AddOnItemCard.tsx";
import {
  CmsTemplateItemCard,
  type Props as CmsTemplateProps,
} from "./cards/CmsTemplateItemCard.tsx";
import {
  FontItemCard,
  type Props as FontProps,
} from "./cards/FontItemCard.tsx";
import {
  GenAIImageItemCard,
  type Props as GenAIImageProps,
} from "./cards/GenAIImageItemCard.tsx";
import {
  GenAIPendingItemCard,
  type Props as GenAIPendingProps,
} from "./cards/GenAIPendingItemCard.tsx";
import {
  GraphicItemCard,
  type Props as GraphicProps,
} from "./cards/GraphicItemCard.tsx";
import {
  GraphicTemplateItemCard,
  type Props as GraphicTemplatesProps,
} from "./cards/GraphicTemplateItemCard.tsx";
import {
  MusicItemCard,
  type Props as MusicProps,
} from "./cards/MusicItemCard/MusicItemCard.tsx";
import {
  PhotoItemCard,
  type Props as PhotoProps,
} from "./cards/PhotoItemCard.tsx";
import {
  PresentationTemplateItemCard,
  type Props as PresentationTemplateProps,
} from "./cards/PresentationTemplateItemCard.tsx";
import {
  SoundEffectItemCard,
  type Props as SoundEffectProps,
} from "./cards/SoundEffectItemCard.tsx";
import {
  StockVideoItemCard,
  type Props as StockVideoProps,
} from "./cards/StockVideoItemCard.tsx";
import {
  ThreeDItemCard,
  type Props as ThreeDProps,
} from "./cards/ThreeDItemCard.tsx";
import {
  VideoTemplateItemCard,
  type Props as VideoTemplatesProps,
} from "./cards/VideoTemplateItemCard.tsx";
import {
  WebTemplateItemCard,
  type Props as WebTemplateProps,
} from "./cards/WebTemplateItemCard.tsx";
import {
  WordpressItemCard,
  type Props as WordpressProps,
} from "./cards/WordpressItemCard.tsx";

export type Props =
  | AddOnsProps
  | CmsTemplateProps
  | FontProps
  | GenAIImageProps
  | GenAIPendingProps
  | GraphicProps
  | GraphicTemplatesProps
  | MusicProps
  | PhotoProps
  | PresentationTemplateProps
  | SoundEffectProps
  | StockVideoProps
  | ThreeDProps
  | VideoTemplatesProps
  | WebTemplateProps
  | WordpressProps;

export function ItemCard({ item, ...restProps }: Props) {
  switch (item.itemType) {
    case "3d": {
      return <ThreeDItemCard item={item} {...restProps} />;
    }

    case "add-ons": {
      return <AddOnItemCard item={item} {...restProps} />;
    }

    case "cms-templates": {
      return <CmsTemplateItemCard item={item} {...restProps} />;
    }

    case "fonts": {
      return <FontItemCard item={item} {...restProps} />;
    }

    case "genai-image": {
      return <GenAIImageItemCard item={item} {...restProps} />;
    }

    case "genai-pending": {
      return <GenAIPendingItemCard item={item} {...restProps} />;
    }

    case "graphic-templates": {
      return <GraphicTemplateItemCard item={item} {...restProps} />;
    }

    case "graphics": {
      return <GraphicItemCard item={item} {...restProps} />;
    }

    case "music": {
      return <MusicItemCard item={item} {...restProps} />;
    }

    case "photos": {
      return <PhotoItemCard item={item} {...restProps} />;
    }

    case "presentation-templates": {
      return <PresentationTemplateItemCard item={item} {...restProps} />;
    }

    case "sound-effects": {
      return <SoundEffectItemCard item={item} {...restProps} />;
    }

    case "stock-video": {
      return <StockVideoItemCard item={item} {...restProps} />;
    }

    case "video-templates": {
      return <VideoTemplateItemCard item={item} {...restProps} />;
    }

    case "web-templates": {
      return <WebTemplateItemCard item={item} {...restProps} />;
    }

    case "wordpress": {
      return <WordpressItemCard item={item} {...restProps} />;
    }
  }
}
