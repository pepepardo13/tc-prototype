/**
 * Forked from @envato/design-system Checkbox component.
 *
 * This fork exists to support customizing the checkbox background color,
 * which is not possible with the design system's Checkbox component.
 *
 * The unchecked state uses overlay-light (semi-transparent) for visibility
 * on image overlays while maintaining a subtle appearance.
 */
import {
  colorSchemeVars,
  globalVars,
  internalVars,
} from "@envato/design-system";
import {
  Box,
  Columns,
  FieldLabel,
  FieldMessage,
  Icon,
  type FieldLabelProps,
} from "@envato/design-system/components";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  forwardRef,
  useCallback,
  useId,
  useState,
  type ChangeEvent,
} from "react";

type LabelProps =
  | {
      "aria-label": string;
      "aria-labelledby"?: never;
      label?: never;
      secondaryLabel?: never;
    }
  | {
      "aria-label"?: never;
      "aria-labelledby": string;
      label?: never;
      secondaryLabel?: never;
    }
  | {
      "aria-label"?: never;
      "aria-labelledby"?: never;
      label: FieldLabelProps["label"];
      secondaryLabel?: FieldLabelProps["secondaryLabel"] | undefined;
    };

export type CheckboxProps = LabelProps & {
  checked?: boolean | undefined;
  "data-testid"?: string | undefined;
  defaultChecked?: boolean | undefined;
  disabled?: boolean | undefined;
  /**
   * An error message to communicate the status of the `Checkbox`. The message will be announced
   * by a screen reader when the field is focused.
   */
  error?: string | undefined;
  id?: string | undefined;
  name?: string | undefined;
  onChange?: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;
  value?: string | undefined;
};

/**
 * Get CSS variables for checkbox styling based on checked state.
 */
function getCheckboxCssVars(isChecked: boolean) {
  const variant = isChecked ? "checked" : "unchecked";
  return assignInlineVars({
    // Use overlay-light for unchecked to provide subtle visibility on image overlays
    [internalVars.dsBackgroundColorVar]: isChecked
      ? colorSchemeVars["color-surface-checkbox-checked"]
      : colorSchemeVars["color-overlay-light"],
    [internalVars.dsBorderColorVar]:
      colorSchemeVars[`color-border-checkbox-${variant}`],
    [internalVars.dsBorderRadiusVar]: globalVars["border-radius-checkbox"],
    [internalVars.dsBorderWidthVar]:
      globalVars[`border-width-checkbox-${variant}`],
    [internalVars.dsColorVar]:
      colorSchemeVars[`color-content-checkbox-${variant}`],
  });
}

/**
 * Styles for the visually hidden input element.
 * These are applied inline since we can't use vanilla-extract CSS classes.
 */
const hiddenInputStyles: React.CSSProperties = {
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
};

export const OpaqueCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      "data-testid": testId,
      defaultChecked,
      disabled,
      error,
      id,
      label,
      name,
      onChange,
      secondaryLabel,
      value,
    },
    ref,
  ) => {
    const errorId = useId();

    const [internalCheckedState, setInternalCheckedState] = useState(
      defaultChecked ?? false,
    );

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setInternalCheckedState(event.currentTarget.checked);

        if (typeof onChange === "function") onChange(event);
      },
      [onChange],
    );

    const isUncontrolled = typeof checked === "undefined";
    const isChecked = isUncontrolled ? internalCheckedState : checked;

    return (
      <Box
        display="inline-flex"
        flexDirection="column"
        flexWrap="nowrap"
        width="fit-content"
      >
        <FieldLabel
          data-testid={testId}
          disabled={disabled}
          htmlFor={id}
          label={label}
          secondaryLabel={secondaryLabel}
          variant="checkbox"
        >
          <Box
            aria-checked={isChecked}
            aria-disabled={disabled}
            checked={isChecked}
            dangerouslySetStyle={hiddenInputStyles}
            disabled={disabled}
            id={id}
            name={name}
            onChange={handleChange}
            ref={ref}
            tagName="input"
            type="checkbox"
            value={value}
          />
          <Box
            alignItems="center"
            backgroundColor="css-vars"
            borderColor="css-vars"
            borderRadius="css-vars"
            borderStyle="solid"
            borderWidth="css-vars"
            color="css-vars"
            cssVariables={getCheckboxCssVars(isChecked)}
            display="flex"
            height="icon-2x"
            justifyContent="center"
            width="icon-2x"
          >
            {isChecked && <Icon name="done" size="1x" />}
          </Box>
        </FieldLabel>
        {error && (
          <Columns
            alignItems="center"
            dangerouslySetStyle={{
              marginTop: "calc(-1 * var(--ds-spacing-2x))",
            }}
            pointerEvents="none"
            role="alert"
            spacing="1x"
          >
            <Icon color="critical-default" name="warning" size="1x" />
            <FieldMessage
              color="critical-default"
              id={errorId}
              message={error}
            />
          </Columns>
        )}
      </Box>
    );
  },
);

OpaqueCheckbox.displayName = "OpaqueCheckbox";
