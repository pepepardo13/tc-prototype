import { CustomPopoverBase, Stack } from "@envato/design-system/components";
import { useCallback } from "react";

import { useTranslations } from "../../../../contexts/TranslationsContext.tsx";
import { useImageEditorContext } from "../ImageEditorProvider.tsx";

import { Action } from "./Action.tsx";
import { MenuItem } from "./MenuItem.tsx";

type Props = {
  onActionClick?: () => void;
};

export function Actions({ onActionClick }: Props) {
  const t = useTranslations();
  const { setSelectionAspectRatio, setToolMode } = useImageEditorContext();

  const createClickHandler = useCallback(
    (callback: () => void) => () => {
      callback();
      if (typeof onActionClick === "function") onActionClick();
    },
    [onActionClick],
  );

  return (
    <Stack alignItems="flex-start" spacing="1x">
      <Action
        generations={1}
        icon="texture"
        label={t("imageEdit.action.removeBackground")}
        onClick={createClickHandler(() => {
          /** @todo */
        })}
      />
      <Action
        icon="crop"
        label={t("imageEdit.action.crop")}
        onClick={createClickHandler(() => {
          setSelectionAspectRatio("free");
          setToolMode("crop");
        })}
      />
      <Action
        generations={1}
        icon="map-zoom-out"
        label={t("imageEdit.action.expand")}
        onClick={createClickHandler(() => {
          setSelectionAspectRatio("free");
          setToolMode("expand");
        })}
      />
      <CustomPopoverBase
        backgroundColor={{ default: "elevated-2x", 700: "elevated-1x" }}
        borderColor="tertiary"
        borderRadius="4x"
        borderStyle="solid"
        borderWidth="thin"
        offset="3x"
        padding="2x"
        placement="right-start"
        trigger={
          <Action
            generations={1}
            icon="upscale"
            label={t("imageEdit.action.upscale")}
          />
        }
        width={{ default: "full", 700: "auto" }}
      >
        {({ setIsOpen }) => (
          <Stack spacing="1x">
            <MenuItem
              aria-label={`${t("imageEdit.action.upscale")} 2x`}
              onClick={createClickHandler(() => {
                setIsOpen(false);
                /** @todo */
              })}
            >
              <>{t("imageEdit.action.upscale")} 2x</>
            </MenuItem>
            <MenuItem
              aria-label={`${t("imageEdit.action.upscale")} 4x`}
              onClick={createClickHandler(() => {
                setIsOpen(false);
                /** @todo */
              })}
            >
              <>{t("imageEdit.action.upscale")} 4x</>
            </MenuItem>
          </Stack>
        )}
      </CustomPopoverBase>
      <Action
        icon="cube"
        label={t("imageEdit.action.cameraAngle")}
        onClick={createClickHandler(() => {
          setToolMode("camera-angle");
        })}
      />
      <Action
        icon="ai-video"
        label={t("imageEdit.action.createVideo")}
        onClick={createClickHandler(() => {
          /** @todo */
        })}
      />
    </Stack>
  );
}
