import type { CommonItemCardData } from "./types/CommonItemCardData.ts";
import type { CreateItemCardProps } from "./types/CreateItemCardProps.ts";
import type { StockAttributionProps } from "./types/StockAttributionProps.ts";
import type { ImageData } from "../../types/ImageData.ts";
import type { ItemType } from "../../types/ItemType.ts";
import type {
  IconButtonProps,
  TooltipProps,
} from "@envato/design-system/components";
import type { PropsWithChildren } from "react";

import { createContext, useContext } from "react";

type CommonAudioTrackData = {
  id: string;
  title: string;
  duration: number;
  isPrimary: boolean;
  audioWaveformUrl: string;
  audioPreviewSourceUrl: string;
};

type AuralItemCardData = {
  audioTracks?: CommonAudioTrackData[] | undefined;
  audioWaveformUrl: string;
  image?: never;
};

type VisualItemCardData = {
  audioTracks?: never;
  audioWaveformUrl?: never;
  image: ImageData;
};

export type ContextData = CommonItemCardData & {
  itemType: ItemType;
} & (AuralItemCardData | VisualItemCardData);

type CardConfig = {
  actionsButtonVariant: Exclude<IconButtonProps["variant"], undefined>;
  actionsTooltipPlacement: Exclude<TooltipProps["placement"], undefined>;
  isInteracting: boolean;
  isSelected: boolean;
  isSelectionMode: boolean;
  analyticsSelectItemContextDetail?: string | null | undefined;
};

export type Context<T extends ContextData> = CreateItemCardProps<T> &
  CardConfig;

const ItemCardContext = createContext<Context<ContextData> | null>(null);

type Props<T extends ContextData> = PropsWithChildren<
  CreateItemCardProps<T> & {
    [K in keyof CardConfig]?: CardConfig[K] | undefined;
  }
>;

export function ItemCardContextProvider<T extends ContextData>({
  actionsButtonVariant = "overlay",
  actionsTooltipPlacement = "left",
  children,
  isInteracting = false,
  isSelected = false,
  isSelectionMode = false,
  analyticsSelectItemContextDetail = null,
  ...restProps
}: Props<T>) {
  return (
    <ItemCardContext.Provider
      value={{
        actionsButtonVariant,
        actionsTooltipPlacement,
        isInteracting,
        isSelected,
        isSelectionMode,
        analyticsSelectItemContextDetail,
        ...restProps,
      }}
    >
      {children}
    </ItemCardContext.Provider>
  );
}

export function useItemCardContext<T extends ContextData>(): Context<T> {
  const context = useContext(ItemCardContext);

  if (context === null) {
    throw new Error(
      "useItemCardContext must be used within ItemCardContextProvider",
    );
  }

  return context as Context<T>;
}

export function hasAttribution(
  item: ContextData,
): item is ContextData & StockAttributionProps {
  return "title" in item && "authorUsername" in item;
}
