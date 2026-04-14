import type { BrushSize } from "./BrushSize.ts";

import {
  Box,
  Button,
  Columns,
  Icon,
  TooltipGroup,
} from "@envato/design-system/components";

import { useTranslations } from "../../../../contexts/TranslationsContext.tsx";
import { ActionsModal } from "../Actions/ActionsModal.tsx";
import { useImageEditorContext } from "../ImageEditorProvider.tsx";

import { BrushSizeCircle } from "./BrushSizeCircle.tsx";
import { CameraAngleToolbar } from "./CameraAngleToolbar/CameraAngleToolbar.tsx";
import { SelectionToolbar } from "./SelectionToolbar/SelectionToolbar.tsx";
import { Tool } from "./Tool.tsx";
import { ToolGroup } from "./ToolGroup.tsx";
import styles from "./Toolbar.module.scss";

export type BrushToolbarProps = {
  /** Current brush size */
  brushSize: BrushSize;
  /** Callback when brush size changes */
  onBrushSizeChange: (size: BrushSize) => void;
  /** Whether the toolbar is disabled */
  disabled?: boolean;
};

// Map brush size names to pixel values
export const BRUSH_SIZES: Record<BrushSize, number> = {
  small: 16,
  medium: 32,
  large: 64,
};

/**
 * Hand/Pan icon
 */
function HandIcon() {
  return (
    <svg fill="none" height="20" viewBox="0 0 24 24" width="20">
      <path
        fill="currentColor"
        d="M19.5008 6.5837V14.842C19.5043 15.7187 19.2773 16.5808 18.8425 17.342L16.6508 21.167C16.3519 21.6848 15.7986 22.0027 15.2008 22.0004H10.7342C9.93541 21.9912 9.16653 21.6954 8.56749 21.167L5.12582 18.2504C4.20025 17.4587 3.66741 16.3017 3.66749 15.0837V10.3337C3.66573 9.90123 3.9951 9.53929 4.42582 9.50037C4.88069 9.47988 5.32415 9.64638 5.65312 9.96119C5.9821 10.276 6.16795 10.7117 6.16749 11.167V13.3754C6.16779 13.8583 6.37756 14.3174 6.74249 14.6337L7.00082 14.8587V4.0837C7.00082 3.39334 7.56046 2.8337 8.25082 2.8337C8.94118 2.8337 9.50082 3.39334 9.50082 4.0837V10.7504C9.50082 10.9805 9.68737 11.167 9.91749 11.167C10.1476 11.167 10.3342 10.9805 10.3342 10.7504V3.25037C10.3342 2.56001 10.8938 2.00037 11.5842 2.00037C12.2745 2.00037 12.8342 2.56001 12.8342 3.25037V10.7504C12.8342 10.9805 13.0207 11.167 13.2508 11.167C13.4809 11.167 13.6675 10.9805 13.6675 10.7504V4.0837C13.6675 3.39334 14.2271 2.8337 14.9175 2.8337C15.6078 2.8337 16.1675 3.39334 16.1675 4.0837V10.7504C16.1675 10.9805 16.354 11.167 16.5842 11.167C16.8143 11.167 17.0008 10.9805 17.0008 10.7504V6.5837C17.0008 5.89334 17.5605 5.3337 18.2508 5.3337C18.9412 5.3337 19.5008 5.89334 19.5008 6.5837Z"
      />
    </svg>
  );
}

/**
 * Brush icon
 */
function BrushIcon() {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
      <path
        fill="currentColor"
        d="M20.8568 5.29357L13.3623 13.4275C13.2682 13.5251 13.1383 13.5802 13.0026 13.5802C12.8669 13.5802 12.737 13.5251 12.6429 13.4275L10.5544 11.3416C10.4567 11.2476 10.4015 11.1179 10.4015 10.9823C10.4015 10.8468 10.4567 10.7171 10.5544 10.623L18.6984 3.13782C18.8914 2.95406 19.1949 2.95406 19.3879 3.13782L20.8268 4.57498C20.9286 4.66491 20.9893 4.79233 20.9949 4.9279C21.0006 5.06347 20.9507 5.1955 20.8568 5.29357ZM11.6836 14.9345L9.0755 12.3197C8.9175 12.1539 8.7112 12.0422 8.48593 12.0003C8.32288 11.9901 8.15935 11.9901 7.99629 12.0003C6.93589 11.9995 5.91861 12.4195 5.16838 13.168C3.16985 15.1641 4.69872 17.3498 3.07991 19.755C2.94766 19.9522 2.97273 20.2151 3.13987 20.3838C3.64983 20.7749 4.27557 20.9856 4.91856 20.9826C7.10358 21.1291 9.24876 20.3461 10.8242 18.8268C11.5761 18.0751 11.9968 17.055 11.9934 15.9924C11.9934 15.8327 11.9934 15.6631 11.9934 15.5034C11.9563 15.2847 11.8473 15.0845 11.6836 14.9345Z"
      />
    </svg>
  );
}

/**
 * Tools icon
 */
function ToolsIcon() {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
      <path
        fill="currentColor"
        d="M3.3 18.6L9 12.9L11.1 15L5.4 20.7C5.2 20.9 5 21 4.7 21H4.5C4.3 21 4 20.9 3.8 20.7L3.3 20.2C3.1 20 3 19.8 3 19.5V19.3C3 19 3.1 18.8 3.3 18.6ZM17 11C16.5 11 15.9 10.9 15.5 10.7L13.8 12.4L15 13.6L15.5 13.1C15.7 12.9 16 12.9 16.2 13.1L20.7 17.6C20.9 17.8 21 18 21 18.3V19.5C21 19.8 20.9 20 20.7 20.2L20.2 20.7C20 20.9 19.8 21 19.5 21H18.3C18 21 17.8 20.9 17.6 20.7L13.1 16.2C12.9 16 12.9 15.7 13.1 15.5L13.6 15L6.8 8.2L5.2 7.3C4.9 7.2 4.6 7 4.5 6.6L3.1 4.6C3 4.4 3 4.2 3.2 4L4 3.2C4.2 3 4.4 3 4.6 3.1L6.7 4.4C7 4.6 7.2 4.9 7.3 5.2L8.2 6.8L11.6 10.3L13.3 8.6C13.1 8.1 13 7.5 13 7C13 4.8 14.8 3 17 3H17.3C17.5 3 17.6 3 17.7 3.1L17.9 3.3C18.1 3.5 18.1 3.8 17.9 4L16.3 5.6C16.1 5.8 16.1 6.1 16.3 6.3L17.7 7.7C17.9 7.9 18.2 7.9 18.4 7.7L20 6.1C20.2 6 20.5 6 20.7 6.1L20.9 6.3C20.9 6.4 21 6.6 21 6.7V7C21 9.2 19.2 11 17 11Z"
      />
    </svg>
  );
}

/**
 * Toolbar for brush/mask editing controls
 */
export function Toolbar({
  brushSize,
  onBrushSizeChange,
  disabled,
}: BrushToolbarProps) {
  const t = useTranslations();
  const { toolMode, setToolMode } = useImageEditorContext();

  switch (toolMode) {
    case "camera-angle": {
      return <CameraAngleToolbar />;
    }

    case "crop": {
      return (
        <SelectionToolbar>
          <Button
            disabled={disabled}
            onClick={() => setToolMode("pan")}
            size="medium"
            variant="secondary"
            type="button"
          >
            {t("imageEdit.cancel")}
          </Button>
          <Button
            disabled={disabled}
            loading={disabled}
            size="medium"
            variant="primary"
            type="button"
          >
            {t("imageEdit.done")}
          </Button>
        </SelectionToolbar>
      );
    }

    case "expand": {
      return (
        <SelectionToolbar>
          <Button
            disabled={disabled}
            onClick={() => setToolMode("pan")}
            size="medium"
            variant="secondary"
            type="button"
          >
            {t("imageEdit.cancel")}
          </Button>
          <Button
            disabled={disabled}
            loading={disabled}
            size="medium"
            variant="primary"
            type="submit"
          >
            {t("imageEdit.action.expand.done")}
          </Button>
        </SelectionToolbar>
      );
    }

    default: {
      return (
        <TooltipGroup>
          <Columns alignItems="center" collapseBelow={400} spacing="2x">
            {/* Tool selection group */}
            <ToolGroup>
              <Tool
                active={toolMode === "pan"}
                disabled={disabled}
                label={t("imageEdit.tool.pan")}
                onClick={() => setToolMode("pan")}
              >
                <HandIcon />
              </Tool>
              <Tool
                active={toolMode === "brush"}
                disabled={disabled}
                label={t("imageEdit.tool.brush")}
                onClick={() => setToolMode("brush")}
              >
                <BrushIcon />
              </Tool>
              <Box dangerouslySetClassName={styles["actionsPanelTrigger"]}>
                <ActionsModal
                  trigger={
                    <Tool
                      disabled={disabled}
                      label={t("imageEdit.tool.actionsPanel")}
                    >
                      <ToolsIcon />
                    </Tool>
                  }
                />
              </Box>
            </ToolGroup>

            {/* Brush size group */}
            <ToolGroup>
              {({ Divider }) => (
                <>
                  <Tool
                    active={brushSize === "small"}
                    disabled={disabled}
                    label={t("imageEdit.tool.brushSize.small")}
                    onClick={() => {
                      onBrushSizeChange("small");
                    }}
                  >
                    <BrushSizeCircle disabled={disabled} size="small" />
                  </Tool>
                  <Tool
                    active={brushSize === "medium"}
                    disabled={disabled}
                    label={t("imageEdit.tool.brushSize.medium")}
                    onClick={() => {
                      onBrushSizeChange("medium");
                    }}
                  >
                    <BrushSizeCircle disabled={disabled} size="medium" />
                  </Tool>
                  <Tool
                    active={brushSize === "large"}
                    disabled={disabled}
                    label={t("imageEdit.tool.brushSize.large")}
                    onClick={() => {
                      onBrushSizeChange("large");
                    }}
                  >
                    <BrushSizeCircle disabled={disabled} size="large" />
                  </Tool>

                  <Divider />

                  {/* Eraser */}
                  <Tool
                    active={toolMode === "eraser"}
                    disabled={disabled}
                    label={t("imageEdit.tool.eraser")}
                    onClick={() => setToolMode("eraser")}
                  >
                    <Icon name="eraser" />
                  </Tool>
                </>
              )}
            </ToolGroup>
          </Columns>
        </TooltipGroup>
      );
    }
  }
}
