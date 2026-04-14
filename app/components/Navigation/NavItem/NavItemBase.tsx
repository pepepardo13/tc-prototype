import type { DesignSystem } from "@envato/design-system";

import {
  Badge,
  Box,
  Icon,
  LoadingSpinner,
  Text,
  type iconNames,
} from "@envato/design-system/components";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";

type Props = {
  badge?: string | undefined;
  enableIconAnimation?: boolean | undefined;
  enableIconTransition?: boolean | undefined;
  hideIcon?: boolean | undefined;
  icon?: (typeof iconNames)[number] | undefined;
  label: string;
  loading?: boolean | undefined;
  minimized?: boolean | undefined;
  trailingIcon?: (typeof iconNames)[number] | undefined;
};

export function NavItemBase({
  badge,
  enableIconAnimation,
  enableIconTransition,
  hideIcon = false,
  icon,
  label,
  loading = false,
  minimized = false,
  trailingIcon,
}: Props) {
  const t = useTranslations();

  return (
    <>
      {icon && (
        <Box
          alignItems="center"
          display="flex"
          flexShrink="0"
          height="icon-2x"
          justifyContent="center"
          opacity={!hideIcon || minimized ? "1" : "0"}
          transitionDuration="short"
          transitionProperty="opacity"
          transitionTimingFunction="ease-out"
          width="icon-2x"
        >
          {loading ? (
            <Text
              variant={{ default: "body-large", "can-hover": "body-small" }}
            >
              <LoadingSpinner />
            </Text>
          ) : (
            <Icon
              enableAnimation={enableIconAnimation}
              enableTransition={enableIconTransition}
              name={icon}
              color="inherit"
              size="1x"
              title={t(label)}
            />
          )}
        </Box>
      )}
      <Box
        opacity={minimized ? "0" : "1"}
        transitionDuration="medium"
        transitionProperty="opacity"
        transitionTimingFunction="ease-out"
        whiteSpace="nowrap"
        display="flex"
        alignItems="center"
        columnGap="2x"
        justifyContent="space-between"
        width="full"
      >
        <Text variant={{ default: "body-large", "can-hover": "body-small" }}>
          {t(label)}
        </Text>
        {badge && <Badge variant="positive">{badge}</Badge>}
        {trailingIcon && <Icon name={trailingIcon} size="1x" />}
      </Box>
    </>
  );
}

type GetBasePropsOptions = {
  canHover?: boolean | undefined;
  isActive?: boolean | undefined;
  isLoading?: boolean | undefined;
};

export function getBaseProps({
  canHover = false,
  isActive = false,
  isLoading = false,
}: GetBasePropsOptions) {
  return {
    alignItems: "center",
    backgroundColor: {
      default: isActive ? "interactive-tertiary-hover" : "transparent",
      hover: canHover ? "interactive-tertiary-hover" : "transparent",
      focusWithin: canHover ? "interactive-tertiary-hover" : "transparent",
    },
    borderRadius: "2x",
    borderWidth: "none",
    color: {
      default: isActive ? "primary" : "secondary",
      hover: canHover ? "primary" : "secondary",
      focusWithin: canHover ? "primary" : "secondary",
    },
    columnGap: "2x",
    cursor: isLoading ? "not-allowed" : "pointer",
    display: "flex",
    minHeight: { default: "button-medium", "can-hover": "button-small" },
    outlineStyle: "none",
    paddingY: "1x",
    transitionDuration: "short",
    transitionProperty: "button-properties",
    transitionTimingFunction: "ease-out",
    width: "full",
  } as const satisfies DesignSystem;
}
