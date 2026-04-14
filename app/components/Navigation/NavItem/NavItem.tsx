import type { RouterIntegrationProps } from "../../AppProvider/LinkComponent.tsx";

import {
  Link,
  Tooltip,
  type iconNames,
} from "@envato/design-system/components";
import { useMatchesMediaQuery } from "@envato/design-system/hooks";
import { forwardRef, useCallback, type MouseEvent } from "react";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import {
  ANALYTICS_CONTEXTS,
  type AnalyticsContext,
} from "../../../types/analytics.ts";

import { getBaseProps, NavItemBase } from "./NavItemBase.tsx";
import { useMatchesPath } from "./useMatchesPath.ts";

export type Props = Pick<
  RouterIntegrationProps,
  | "discover"
  | "download"
  | "hrefLang"
  | "prefetch"
  | "rel"
  | "reloadDocument"
  | "target"
  | "to"
> & {
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
  /** Minimises the item, displaying only its icon. */
  minimized?: boolean | undefined;
  /** Registers an event handler to handle click events. */
  onClick?: ((event: MouseEvent<HTMLAnchorElement>) => void) | undefined;
  /** Optional trailing icon to display on the right. */
  trailingIcon?: (typeof iconNames)[number] | undefined;
};

export const NavItem = forwardRef<HTMLAnchorElement, Props>(function NavItem(
  {
    analyticsContext = ANALYTICS_CONTEXTS.NAVIGATION,
    analyticsTarget,
    badge,
    enableIconAnimation,
    enableIconTransition,
    hideIcon = false,
    icon,
    label,
    minimized = false,
    onClick,
    to,
    trailingIcon,
    ...restProps
  },
  ref,
) {
  const t = useTranslations();
  const isActive = useMatchesPath(to);
  const canHover = useMatchesMediaQuery("(hover: hover)");

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.stopPropagation();
      if (typeof onClick === "function") onClick(event);
    },
    [onClick],
  );

  return (
    <Tooltip
      placement="right"
      trigger={
        <Link<RouterIntegrationProps>
          {...restProps}
          {...getBaseProps({ isActive, canHover })}
          dangerouslySetStyle={{ transitionProperty: "width" }}
          data-analytics
          data-analytics-target={analyticsTarget}
          data-analytics-context={analyticsContext}
          onClick={handleClick}
          paddingLeft={icon ? "1x" : "2x"}
          paddingRight="2x"
          ref={ref}
          to={to}
          viewTransition
        >
          <NavItemBase
            badge={badge}
            enableIconAnimation={enableIconAnimation}
            enableIconTransition={enableIconTransition}
            hideIcon={hideIcon}
            icon={icon}
            label={label}
            minimized={minimized}
            trailingIcon={trailingIcon}
          />
        </Link>
      }
    >
      {minimized ? t(label) : undefined}
    </Tooltip>
  );
});
