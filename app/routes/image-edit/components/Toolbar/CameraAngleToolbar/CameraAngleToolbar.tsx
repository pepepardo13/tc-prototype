import type { Steps } from "~/components/Slider/Steps.ts";
import type { CameraAngle } from "~/routes/image-edit/types/CameraAngle.ts";

import {
  Box,
  Button,
  Columns,
  Stack,
  Text,
} from "@envato/design-system/components";
import { useCallback } from "react";

import { Slider } from "../../../../../components/Slider/Slider.tsx";
import { useTranslations } from "../../../../../contexts/TranslationsContext.tsx";
import { useImageEditorContext } from "../../ImageEditorProvider.tsx";
import styles from "../Toolbar.module.scss";

const YAW_RANGE = Array(181)
  .fill(0)
  .map((value, index) => value + index - 90) as Steps;

const ZOOM_RANGE = Array(11)
  .fill(0)
  .map((value, index) => value + index) as Steps;

export function CameraAngleToolbar() {
  const t = useTranslations();

  const { cameraAngle, pointerEvents, setCameraAngle, setToolMode } =
    useImageEditorContext();

  const handleAngleChange = useCallback(
    (angle: Partial<CameraAngle>) => {
      setCameraAngle((state) => ({ ...state, ...angle }));
    },
    [setCameraAngle],
  );

  const yaw = YAW_RANGE.findIndex((yaw) => yaw === cameraAngle.yaw);
  const zoom = ZOOM_RANGE.findIndex((zoom) => zoom === cameraAngle.zoom);

  return (
    <Box
      alignItems="stretch"
      display="flex"
      flexDirection="column"
      pointerEvents={pointerEvents}
      gap="3x"
      maxWidth="breakpoint-wide"
      width="full"
    >
      <Box
        backdropFilter="blur-popover"
        borderColor="tertiary"
        borderRadius="4x"
        borderStyle="solid"
        borderWidth="thin"
        dangerouslySetClassName={styles["glass"]}
        gap="5x"
        display="flex"
        flexDirection={{ default: "column", 700: "row" }}
        padding="2x"
        transitionDuration="long"
        transitionProperty="dangerously-transition-background-color"
        transitionTimingFunction="ease-out"
      >
        <Box
          display="flex"
          flexBasis="half"
          flexDirection="column"
          flexGrow="1"
          gap="2x"
          justifyContent="center"
        >
          <Columns spacing="2x">
            <Box textAlign="right" width="half">
              <Text color="secondary" variant="label-large">
                {t("imageEdit.action.cameraAngle.yaw")}
              </Text>
            </Box>
            <Box width="half">
              <Text variant="label-large">
                {cameraAngle.yaw > 0 ? "+" : ""}
                {cameraAngle.yaw}°
              </Text>
            </Box>
          </Columns>
          <Stack justifyContent="center" minHeight="button-small">
            <Slider
              activeStep={yaw}
              aria-label={t("imageEdit.action.cameraAngle.yaw")}
              aria-valuetext={t("imageEdit.action.cameraAngle.yaw.value", {
                yaw: `${cameraAngle.yaw > 0 ? "+" : ""}${cameraAngle.yaw}°`,
              })}
              homeStep={90}
              onChange={(step) => {
                handleAngleChange({ yaw: YAW_RANGE[step] ?? 0 });
              }}
              steps={YAW_RANGE}
            />
          </Stack>
        </Box>
        <Box
          display="flex"
          flexBasis="content"
          flexDirection="column"
          flexGrow="0"
          gap="2x"
          justifyContent="center"
        >
          <Columns justifyContent="center" spacing="2x">
            <Box textAlign="right" width="half">
              <Text color="secondary" variant="label-large">
                Pitch
              </Text>
            </Box>
            <Box width="half">
              <Text variant="label-large">
                {cameraAngle.pitch > 0 ? "+" : ""}
                {cameraAngle.pitch}°
              </Text>
            </Box>
          </Columns>
          <Columns justifyContent="center" spacing="1x">
            <Button
              onClick={() => handleAngleChange({ pitch: -45 })}
              size="small"
            >
              -45°
            </Button>
            <Button
              onClick={() => handleAngleChange({ pitch: 0 })}
              size="small"
            >
              0°
            </Button>
            <Button
              onClick={() => handleAngleChange({ pitch: 45 })}
              size="small"
            >
              +45°
            </Button>
          </Columns>
        </Box>
        <Box
          display="flex"
          flexBasis="half"
          flexDirection="column"
          flexGrow="1"
          gap="2x"
          justifyContent="center"
        >
          <Columns spacing="2x">
            <Box textAlign="right" width="half">
              <Text color="secondary" variant="label-large">
                Zoom
              </Text>
            </Box>
            <Box width="half">
              <Text variant="label-large">{cameraAngle.zoom}</Text>
            </Box>
          </Columns>
          <Stack justifyContent="center" minHeight="button-small">
            <Slider
              activeStep={zoom}
              aria-label={t("imageEdit.action.cameraAngle.zoom")}
              aria-valuetext={t("imageEdit.action.cameraAngle.zoom.value", {
                zoom: cameraAngle.zoom,
              })}
              onChange={(step) => {
                handleAngleChange({ zoom: ZOOM_RANGE[step] ?? 0 });
              }}
              steps={ZOOM_RANGE}
            />
          </Stack>
        </Box>
      </Box>
      <Columns alignItems="center" justifyContent="center" spacing="2x">
        <Button
          onClick={() => setToolMode("pan")}
          size="medium"
          variant="secondary"
        >
          {t("imageEdit.cancel")}
        </Button>
        <Button
          onClick={() => handleAngleChange({ pitch: 0, yaw: 0, zoom: 0 })}
          size="medium"
          variant="secondary"
        >
          {t("imageEdit.reset")}
        </Button>
        <Button size="medium" variant="primary">
          {t("imageEdit.done")}
        </Button>
      </Columns>
    </Box>
  );
}
