import type { PropsWithChildren } from "react";

import { Box, Columns, Inline, Stack } from "@envato/design-system/components";

import { useTranslations } from "../../../../../contexts/TranslationsContext.tsx";
import { useImageEditorContext } from "../../ImageEditorProvider.tsx";
import styles from "../Toolbar.module.scss";

import { AspectRatioTile } from "./AspectRatioTile.tsx";

type Props = PropsWithChildren;

export function SelectionToolbar({ children }: Props) {
  const t = useTranslations();
  const { pointerEvents, selectionAspectRatio, setSelectionAspectRatio } =
    useImageEditorContext();

  return (
    <Stack alignItems="center" pointerEvents={pointerEvents} spacing="3x">
      <Box
        backdropFilter="blur-popover"
        borderColor="tertiary"
        borderRadius="3x"
        borderStyle="solid"
        borderWidth="thin"
        dangerouslySetClassName={styles["glass"]}
        padding="1x"
        transitionDuration="long"
        transitionProperty="dangerously-transition-background-color"
        transitionTimingFunction="ease-out"
      >
        <Inline alignItems="center" justifyContent="center" spacing="1x">
          <AspectRatioTile
            active={selectionAspectRatio === "free"}
            icon="fullscreen"
            label={t("imageEdit.action.crop.aspectRatio.free")}
            onClick={() => setSelectionAspectRatio("free")}
          />
          <AspectRatioTile
            active={selectionAspectRatio === "original"}
            icon="photo-landscape-outlined"
            label={t("imageEdit.action.crop.aspectRatio.original")}
            onClick={() => setSelectionAspectRatio("original")}
          />
          <AspectRatioTile
            active={selectionAspectRatio === "square"}
            icon="square-outlined"
            label={t("imageEdit.action.crop.aspectRatio.square")}
            onClick={() => setSelectionAspectRatio("square")}
          />
          <AspectRatioTile
            active={selectionAspectRatio === "16:9"}
            icon="format-16-9"
            label="16:9"
            onClick={() => setSelectionAspectRatio("16:9")}
          />
          <AspectRatioTile
            active={selectionAspectRatio === "9:16"}
            icon="format-9-16"
            label="9:16"
            onClick={() => setSelectionAspectRatio("9:16")}
          />
          <AspectRatioTile
            active={selectionAspectRatio === "3:2"}
            icon="format-3-2"
            label="3:2"
            onClick={() => setSelectionAspectRatio("3:2")}
          />
          <AspectRatioTile
            active={selectionAspectRatio === "2:3"}
            icon="format-2-3"
            label="2:3"
            onClick={() => setSelectionAspectRatio("2:3")}
          />
          <AspectRatioTile
            active={selectionAspectRatio === "4:3"}
            icon="format-4-3"
            label="4:3"
            onClick={() => setSelectionAspectRatio("4:3")}
          />
          <AspectRatioTile
            active={selectionAspectRatio === "3:4"}
            icon="format-3-4"
            label="3:4"
            onClick={() => setSelectionAspectRatio("3:4")}
          />
        </Inline>
      </Box>
      <Box colorScheme="dark">
        <Columns alignItems="center" spacing="2x">
          {children}
        </Columns>
      </Box>
    </Stack>
  );
}
