import type { iconNames } from "@envato/design-system/components";

import { Box, Tooltip } from "@envato/design-system/components";
import { useMatchesMediaQuery } from "@envato/design-system/hooks";
import {
  forwardRef,
  useCallback,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from "react";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import {
  ANALYTICS_CONTEXTS,
  type AnalyticsContext,
} from "../../../types/analytics.ts";

import { getBaseProps, NavItemBase } from "./NavItemBase.tsx";

/** Additional data-analytics-* attributes to spread onto the element. */
export type AnalyticsAttributes = Record<`data-analytics-${string}`, string>;

export type Props = {
  /** Sets the data analytics context. Defaults to 'navigation'. */
  analyticsContext?: AnalyticsContext | undefined;
  /** Sets the data analytics target. */
  analyticsTarget: string;
  /** Optional badge element to display between the label and trailing icon. */
  badge?: string | undefined;
  /** Enables animation of the current icon, if an animation for it exists. */
  enableIconAnimation?: boolean | undefined;
  /** Enables transition animations when changing between icons. */
  enableIconTransition?: boolean | undefined;
  /** Hides the icon and reserves the space the icon would normally occupy when the item is not minimised. */
  hideIcon?: boolean | undefined;
  /** Displays an icon on the item. */
  icon?: (typeof iconNames)[number] | undefined;
  /** Sets the item's text. */
  label: string;
  /** Indicates the button is busy. */
  loading?: boolean | undefined;
  /** Minimises the item, displaying only its icon. */
  minimized?: boolean | undefined;
  /** Registers an event handler to handle click events. */
  onClick?: ((event: MouseEvent<HTMLButtonElement>) => void) | undefined;
  /** Optional trailing icon to display on the right. */
  trailingIcon?: (typeof iconNames)[number] | undefined;
  /** Sets the type of the button. Defaults to 'button'. */
  type?: ComponentPropsWithoutRef<"button">["type"] | undefined;
};

export const NavItemButton = forwardRef<HTMLButtonElement, Props>(
  function NavItemButton(
    {
      analyticsContext = ANALYTICS_CONTEXTS.NAVIGATION,
      analyticsTarget,
      badge,
      enableIconAnimation,
      enableIconTransition,
      hideIcon = false,
      icon,
      label,
      loading = false,
      minimized = false,
      onClick,
      trailingIcon,
      type = "button",
    },
    ref,
  ) {
    const t = useTranslations();

    const canHover = useMatchesMediaQuery("(hover: hover)");

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (typeof onClick === "function") onClick(event);
      },
      [onClick],
    );

    return (
      <Tooltip
        placement="right"
        trigger={
          <Box
            {...getBaseProps({ canHover, isLoading: loading })}
            dangerouslySetStyle={{ transitionProperty: "width" }}
            data-analytics
            data-analytics-target={analyticsTarget}
            data-analytics-context={analyticsContext}
            disabled={loading}
            onClick={handleClick}
            paddingLeft={icon ? "1x" : "2x"}
            paddingRight="2x"
            ref={ref}
            tagName="button"
            type={type}
          >
            <NavItemBase
              badge={badge}
              enableIconAnimation={enableIconAnimation}
              enableIconTransition={enableIconTransition}
              hideIcon={hideIcon}
              icon={icon}
              label={label}
              loading={loading}
              minimized={minimized}
              trailingIcon={trailingIcon}
            />
          </Box>
        }
      >
        {minimized ? t(label) : undefined}
      </Tooltip>
    );
  },
);
