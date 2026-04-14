import type { CreateRouterIntegrationProps } from "@envato/design-system/contexts";

import { useRestProps } from "@envato/design-system/hooks";
import { clsx } from "clsx";
import { forwardRef } from "react";
import { Link, type LinkProps } from "react-router";

export type RouterIntegrationProps = CreateRouterIntegrationProps<LinkProps>;

/**
 * Integrate client-side routing into the Design System.
 */
export const LinkComponent = forwardRef<
  HTMLAnchorElement,
  RouterIntegrationProps
>(
  (
    {
      children,
      dangerouslySetClassName: className,
      dangerouslySetHeight: height,
      dangerouslySetStyle: style,
      dangerouslySetTabIndex: tabIndex,
      dangerouslySetWidth: width,
      to,
      ...restProps
    },
    ref,
  ) => {
    const { designSystemClassNames, nativeProps } = useRestProps(restProps, {
      nativeProps: {
        height,
        style,
        tabIndex,
        width,
      },
    });

    const classNames = clsx(designSystemClassNames, className);

    return (
      <Link {...nativeProps} className={classNames} to={to} ref={ref}>
        {children}
      </Link>
    );
  },
);

LinkComponent.displayName = "ReactRouterLink";
