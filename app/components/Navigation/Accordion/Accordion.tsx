import type { DesignSystem } from "@envato/design-system";

import {
  Box,
  Columns,
  CustomButtonBase,
  Stack,
  Icon,
  type iconNames,
  Text,
  Tooltip,
  Bleed,
} from "@envato/design-system/components";
import { useMatchesMediaQuery } from "@envato/design-system/hooks";
import {
  useCallback,
  useId,
  useState,
  type MouseEvent,
  type TransitionEvent,
} from "react";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { NavItem, type Props as NavItemProps } from "../NavItem/NavItem.tsx";

export type Props = {
  /** Sets the data analytics target. */
  analyticsTarget: string;
  /** Collapses the space the icon would normally occupy when the accordion is not minimised. */
  collapseIcon?: boolean | undefined;
  /** Controls the initial state of the accordion. */
  defaultOpen?: boolean | undefined;
  /** Enables animation of the current icon, if an animation for it exists. */
  enableIconAnimation?: boolean | undefined;
  /** Enables transition animations when changing between icons. */
  enableIconTransition?: boolean | undefined;
  /** Displays an icon on the accordion toggle. */
  icon: (typeof iconNames)[number];
  /** Sets the data to render as NavItems or Accordions. */
  items: Array<Props | NavItemProps>;
  /** Sets the accordion toggle's text. */
  label: string;
  /** Minimises the accordion, displaying only icons. */
  minimized?: boolean | undefined;
  /** Registers an event handler to handle navigation item click events. */
  onItemClick?: ((event: MouseEvent<HTMLAnchorElement>) => void) | undefined;
  /** Sets a callback to handle changes to the accordion's open state. */
  onOpenChange?: ((open: boolean) => void) | undefined;
};

export function Accordion({
  analyticsTarget,
  collapseIcon = false,
  defaultOpen = false,
  enableIconAnimation = false,
  enableIconTransition = false,
  icon,
  items,
  label,
  minimized = false,
  onItemClick,
  onOpenChange,
}: Props) {
  const t = useTranslations();
  const toggleId = useId();
  const contentId = useId();
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const [hidden, setHidden] = useState<boolean>(!defaultOpen);

  const canHover = useMatchesMediaQuery("(hover: hover)");

  const handleTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (!open && event.nativeEvent.propertyName === "opacity") {
        setHidden(true);
      }
    },
    [open],
  );

  const handleToggle = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (typeof onOpenChange === "function") onOpenChange(!open);

      setOpen(!open);
    },
    [onOpenChange, open],
  );

  // When opening, immediately unhide content (during render, not in effect)
  if (open && hidden) {
    setHidden(false);
  }

  const textVariant = {
    default: "body-large",
    "can-hover": "body-small",
  } satisfies DesignSystem["fontFamily"];

  return (
    <Stack spacing="1x">
      <Tooltip
        placement="right"
        trigger={
          <CustomButtonBase
            aria-controls={contentId}
            aria-expanded={open}
            backgroundColor={{
              default: "transparent",
              hover: canHover ? "interactive-tertiary-hover" : "transparent",
              focusVisible: canHover
                ? "interactive-tertiary-hover"
                : "transparent",
            }}
            borderRadius="2x"
            boxShadow="none"
            color={{
              default: "secondary",
              hover: canHover ? "primary" : "secondary",
              focusVisible: canHover ? "primary" : "secondary",
            }}
            data-analytics
            data-analytics-target={`toggle-${analyticsTarget}-${open ? "open" : "closed"}`}
            fontFamily={textVariant}
            fontSize={textVariant}
            fontWeight={textVariant}
            id={toggleId}
            letterSpacing={textVariant}
            lineHeight={textVariant}
            minHeight={{
              default: "button-medium",
              "can-hover": "button-small",
            }}
            onClick={handleToggle}
            outlineStyle="none"
            paddingLeft={!collapseIcon || minimized ? "1x" : "2x"}
            paddingRight="2x"
            paddingY="1x"
            width="full"
          >
            <Box width="full">
              <Columns
                alignItems="center"
                justifyContent="space-between"
                spacing="2x"
              >
                {(!collapseIcon || minimized) && (
                  <Box
                    alignItems="center"
                    display="flex"
                    flexShrink="0"
                    height="icon-2x"
                    justifyContent="center"
                    width="icon-2x"
                  >
                    <Icon
                      enableAnimation={enableIconAnimation}
                      enableTransition={enableIconTransition}
                      name={icon}
                      size="1x"
                      title={t(label)}
                    />
                  </Box>
                )}
                <Box
                  marginRight="auto"
                  opacity={minimized ? "0" : "1"}
                  transitionDuration="medium"
                  transitionProperty="opacity"
                  transitionTimingFunction="ease-out"
                  whiteSpace="nowrap"
                >
                  <Text variant={textVariant}>{t(label)}</Text>
                </Box>
                <Icon name={open ? "chevron-up" : "chevron-down"} size="1x" />
              </Columns>
            </Box>
          </CustomButtonBase>
        }
      >
        {minimized ? t(label) : undefined}
      </Tooltip>
      <Bleed top={hidden ? "1x" : undefined}>
        <Box
          aria-hidden={hidden}
          aria-labelledby={toggleId}
          dangerouslySetStyle={{
            gridTemplateRows: open ? "1fr" : "0fr",
            transitionProperty: "grid-template-rows, opacity",
          }}
          display="grid"
          inert={hidden}
          onTransitionEnd={handleTransitionEnd}
          opacity={open ? "1" : "0"}
          role="region"
          transitionDuration="short"
          transitionTimingFunction="ease-out"
        >
          <Box overflow="hidden">
            <Stack spacing="1x">
              {items?.map((item) =>
                "items" in item ? (
                  <Accordion
                    {...item}
                    items={item.items.map((subItem) =>
                      "items" in subItem
                        ? subItem
                        : { ...subItem, hideIcon: true },
                    )}
                    key={item.label}
                    minimized={minimized}
                    onItemClick={onItemClick}
                  />
                ) : (
                  <NavItem
                    {...item}
                    key={item.label}
                    minimized={minimized}
                    onClick={onItemClick}
                  />
                ),
              )}
            </Stack>
          </Box>
        </Box>
      </Bleed>
    </Stack>
  );
}
