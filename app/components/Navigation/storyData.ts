import type { Accordion } from "./Accordion/Accordion.tsx";
import type { NavItem } from "./NavItem/NavItem.tsx";
import type { ComponentPropsWithoutRef } from "react";

type AccordionProps = ComponentPropsWithoutRef<typeof Accordion>;
type NavItemProps = ComponentPropsWithoutRef<typeof NavItem>;

const MINIMIZED = false;
const ON_CLICK = () => {};

export const navItem1 = {
  analyticsTarget: "storybook",
  icon: "video-templates",
  label: "Lorem Ipsum",
  minimized: MINIMIZED,
  onClick: ON_CLICK,
  to: "#",
} as const satisfies NavItemProps;

export const navItem2 = {
  analyticsTarget: "storybook",
  icon: "music",
  label: "Dolor Sit Amet",
  minimized: MINIMIZED,
  onClick: ON_CLICK,
  to: "#",
} as const satisfies NavItemProps;

export const navItem3 = {
  analyticsTarget: "storybook",
  icon: "photo-landscape-outlined",
  label: "Consectetur",
  minimized: MINIMIZED,
  onClick: ON_CLICK,
  to: "#",
} as const satisfies NavItemProps;

export const navItem4 = {
  analyticsTarget: "storybook",
  icon: "heart",
  label: "Adipiscing",
  minimized: MINIMIZED,
  onClick: ON_CLICK,
  to: "#",
} as const satisfies NavItemProps;

export const navItem5 = {
  analyticsTarget: "storybook",
  icon: "canvas-text",
  label: "Elit Sed",
  minimized: MINIMIZED,
  onClick: ON_CLICK,
  to: "#",
} as const satisfies NavItemProps;

export const navItem6 = {
  analyticsTarget: "storybook",
  icon: "documents",
  label: "Eiusmod Tempor",
  minimized: MINIMIZED,
  onClick: ON_CLICK,
  to: "#",
} as const satisfies NavItemProps;

export const navItem7 = {
  analyticsTarget: "storybook",
  icon: "website",
  label: "Incididunt",
  minimized: MINIMIZED,
  onClick: ON_CLICK,
  to: "#",
} as const satisfies NavItemProps;

export const navItem8 = {
  analyticsTarget: "storybook",
  icon: "ai-graphics",
  label: "Ut Labore",
  minimized: MINIMIZED,
  onClick: ON_CLICK,
  to: "#",
} as const satisfies NavItemProps;

export const navItem9 = {
  analyticsTarget: "storybook",
  icon: "texture",
  label: "Dolore Magna",
  minimized: MINIMIZED,
  onClick: ON_CLICK,
  to: "#",
} as const satisfies NavItemProps;

export const navItem10 = {
  analyticsTarget: "storybook",
  icon: "canvas-graphics",
  label: "Aliqua",
  minimized: MINIMIZED,
  onClick: ON_CLICK,
  to: "#",
} as const satisfies NavItemProps;

export const navItem11 = {
  analyticsTarget: "storybook",
  icon: "ai-labs",
  label: "Enim Ad",
  minimized: MINIMIZED,
  onClick: ON_CLICK,
  to: "#",
} as const satisfies NavItemProps;

export const navItem12 = {
  analyticsTarget: "storybook",
  icon: "palette",
  label: "Minim Veniam",
  minimized: MINIMIZED,
  onClick: ON_CLICK,
  to: "#",
} as const satisfies NavItemProps;

export const navItem13 = {
  analyticsTarget: "storybook",
  icon: "video-horizontal",
  label: "Quis Nostrud",
  minimized: MINIMIZED,
  onClick: ON_CLICK,
  to: "#",
} as const satisfies NavItemProps;

export const accordion1 = {
  analyticsTarget: "storybook",
  icon: "cube",
  label: "Lorem Ipsum",
  minimized: MINIMIZED,
  onItemClick: ON_CLICK,
  items: [navItem1, navItem2, navItem3, navItem4, navItem5, navItem6, navItem7],
} as const satisfies AccordionProps;

export const accordion2 = {
  analyticsTarget: "storybook",
  defaultOpen: true,
  icon: "music",
  label: "Dolor Sit Amet",
  minimized: MINIMIZED,
  onItemClick: ON_CLICK,
  items: [
    navItem1,
    navItem2,
    navItem3,
    navItem4,
    navItem5,
    navItem6,
    navItem7,
    navItem8,
    navItem9,
    navItem10,
    navItem11,
    navItem12,
  ],
} as const satisfies AccordionProps;
