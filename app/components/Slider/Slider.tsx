import type { ChangeHandlerFunction } from "./ChangeHandlerFunction.ts";
import type { Steps } from "./Steps.ts";
import type { FormatterFunction } from "~/lib/formatters.ts";

import { designSystem } from "@envato/design-system";
import { Box } from "@envato/design-system/components";
import ReactSlider from "react-slider";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

import styles from "./Slider.module.scss";

type Props = {
  activeStep: number;
  "aria-label": string;
  "aria-valuetext": string;
  disabled?: boolean | undefined;
  formatValue?: FormatterFunction | undefined;
  homeStep?: number | undefined;
  onAfterChange?: ChangeHandlerFunction | undefined;
  onBeforeChange?: ChangeHandlerFunction | undefined;
  onChange?: ChangeHandlerFunction | undefined;
  steps: Steps;
};

export function Slider({
  activeStep,
  "aria-label": ariaLabel,
  "aria-valuetext": ariaValuetext,
  disabled = false,
  formatValue,
  homeStep = 0,
  onAfterChange,
  onBeforeChange,
  onChange,
  steps,
}: Props) {
  const t = useTranslations();

  const trackHomePosition = 100 * (homeStep / (steps.length - 1));

  return (
    <ReactSlider<number>
      ariaLabel={t(ariaLabel)}
      ariaValuetext={(state) => {
        const actualValue = steps[state.valueNow] ?? steps[0];
        const formattedValue =
          formatValue?.(actualValue) ?? String(actualValue);
        return t(ariaValuetext, { value: formattedValue });
      }}
      className={designSystem({
        alignItems: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        flexDirection: "row",
        height: "icon-2x",
      })}
      disabled={disabled}
      max={steps.length - 1}
      min={0}
      minDistance={1}
      onAfterChange={onAfterChange}
      onBeforeChange={onBeforeChange}
      onChange={onChange}
      renderThumb={({ color, key, height, style, width, ...restProps }) => (
        <Box
          backgroundColor="inverse"
          borderRadius="8x"
          boxShadow="medium"
          dangerouslySetHeight={height}
          dangerouslySetStyle={{ ...style, color }}
          dangerouslySetWidth={width}
          height="icon-2x"
          width="icon-2x"
          key={key}
          {...restProps}
        />
      )}
      renderTrack={(
        { color, key, height, style, width, ...restProps },
        state,
      ) => {
        const { right, ...restStyle } = style ?? {};

        return (
          <Box
            backgroundColor={
              disabled
                ? "tint-hover"
                : state.index === 0
                  ? "interactive-primary"
                  : "tint"
            }
            dangerouslySetClassName={styles["track"]}
            dangerouslySetHeight={height}
            dangerouslySetStyle={{
              ...restStyle,
              left:
                state.index === 0
                  ? `min(${trackHomePosition}%, calc(100% - ${right}px))`
                  : 0,
              right:
                state.index === 0
                  ? `min(${100 - trackHomePosition}%, ${right}px)`
                  : 0,
              color,
            }}
            dangerouslySetWidth={width}
            key={key}
            {...restProps}
          />
        );
      }}
      step={1}
      value={activeStep}
    />
  );
}
