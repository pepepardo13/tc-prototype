import type { ContainerSizeCondition } from "@envato/design-system";
import type { MouseEvent, useId } from "react";

import {
  Box,
  CustomButtonBase,
  Tooltip,
} from "@envato/design-system/components";

import { HomeLink } from "../HomeLink/HomeLink.tsx";

import creativeSparkHref from "./creative-spark.svg";

type Props = {
  breakpoint: Exclude<ContainerSizeCondition, "default">;
  hideLogo?: boolean | undefined;
  minimized?: boolean | undefined;
  navStackId: ReturnType<typeof useId>;
  onHomeClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  onPanelToggle: (event: MouseEvent<HTMLButtonElement>) => void;
  showMenuLabel: string;
  toggleId: ReturnType<typeof useId>;
};

export function PanelHeader({
  breakpoint,
  hideLogo = false,
  minimized,
  navStackId,
  onHomeClick,
  onPanelToggle,
  showMenuLabel,
  toggleId,
}: Props) {
  return (
    <Box
      alignItems="center"
      dangerouslySetStyle={{ transitionProperty: "padding" }}
      display={{ default: "none", [breakpoint]: "flex" }}
      flexShrink="0"
      height="icon-4x"
      overflow="hidden"
      marginBottom="4x"
      paddingX={minimized ? "3x" : "4x"}
      position="relative"
      transitionDuration="medium"
      transitionTimingFunction="ease-out"
    >
      <HomeLink minimized={minimized} onClick={onHomeClick} />
      <Box
        dangerouslySetStyle={{
          transform: minimized
            ? "none"
            : "translateX(calc(-1 * var(--spacing-2x)))",
        }}
        position="absolute"
        right="2x"
        transitionProperty="transform"
        transitionDuration="medium"
      >
        <Tooltip
          placement="right"
          trigger={
            <CustomButtonBase
              aria-controls={navStackId}
              aria-expanded={!minimized}
              backgroundColor={{
                default: "transparent",
                hover: "interactive-tertiary-hover",
                focusWithin: "interactive-tertiary-hover",
              }}
              borderRadius="2x"
              boxShadow="none"
              color={{
                default: "secondary",
                hover: "primary",
                focusWithin: "primary",
              }}
              dangerouslySetStyle={{
                cursor: minimized && hideLogo ? "e-resize" : "pointer",
              }}
              id={toggleId}
              onClick={onPanelToggle}
              outlineStyle="none"
              padding="2x"
            >
              <Box
                alt=""
                backgroundColor="background"
                opacity={minimized && !hideLogo ? "1" : "0"}
                height="icon-3x"
                padding="1x"
                position="absolute"
                src={creativeSparkHref}
                tagName="img"
                transitionDuration="short"
                transitionProperty="opacity"
                transitionTimingFunction="ease-out"
                width="icon-3x"
              />
              <Box
                height="icon-1x"
                tagName="svg"
                viewBox="0 0 16 16"
                width="icon-1x"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Box
                  d="M2.49002 14.6025L2.83052 13.9343H2.83052L2.49002 14.6025ZM1.39748 13.51L0.729229 13.8505L0.729229 13.8505L1.39748 13.51ZM14.6025 13.51L13.9343 13.1695L14.6025 13.51ZM13.51 14.6025L13.1695 13.9343L13.51 14.6025ZM14.6025 2.49002L13.9343 2.83052L13.9343 2.83052L14.6025 2.49002ZM13.51 1.39748L13.8505 0.729229V0.729229L13.51 1.39748ZM1.39748 2.49002L2.06574 2.83052H2.06574L1.39748 2.49002ZM2.49002 1.39748L2.83052 2.06574V2.06574L2.49002 1.39748ZM9.125 14.875V15.625H10.625V14.875H9.875H9.125ZM10.625 1.125V0.375H9.125V1.125H9.875H10.625ZM14.875 5.125H14.125V10.875H14.875H15.625V5.125H14.875ZM10.875 14.875V14.125H5.125V14.875V15.625H10.875V14.875ZM1.125 10.875H1.875V5.125H1.125H0.375V10.875H1.125ZM5.125 1.125V1.875H10.875V1.125V0.375H5.125V1.125ZM5.125 14.875V14.125C4.41256 14.125 3.92333 14.1244 3.54408 14.0934C3.17358 14.0632 2.97456 14.0076 2.83052 13.9343L2.49002 14.6025L2.14953 15.2708C2.54027 15.4699 2.95867 15.5506 3.42193 15.5884C3.87644 15.6256 4.43731 15.625 5.125 15.625V14.875ZM1.125 10.875H0.375C0.375 11.5627 0.374417 12.1236 0.411551 12.5781C0.449401 13.0413 0.530137 13.4597 0.729229 13.8505L1.39748 13.51L2.06574 13.1695C1.99235 13.0254 1.93684 12.8264 1.90657 12.4559C1.87558 12.0767 1.875 11.5874 1.875 10.875H1.125ZM2.49002 14.6025L2.83052 13.9343C2.50123 13.7665 2.23352 13.4988 2.06574 13.1695L1.39748 13.51L0.729229 13.8505C1.04082 14.462 1.538 14.9592 2.14953 15.2708L2.49002 14.6025ZM14.875 10.875H14.125C14.125 11.5874 14.1244 12.0767 14.0934 12.4559C14.0632 12.8264 14.0077 13.0254 13.9343 13.1695L14.6025 13.51L15.2708 13.8505C15.4699 13.4597 15.5506 13.0413 15.5884 12.5781C15.6256 12.1236 15.625 11.5627 15.625 10.875H14.875ZM10.875 14.875V15.625C11.5627 15.625 12.1236 15.6256 12.5781 15.5884C13.0413 15.5506 13.4597 15.4699 13.8505 15.2708L13.51 14.6025L13.1695 13.9343C13.0254 14.0076 12.8264 14.0632 12.4559 14.0934C12.0767 14.1244 11.5874 14.125 10.875 14.125V14.875ZM14.6025 13.51L13.9343 13.1695C13.7665 13.4988 13.4988 13.7665 13.1695 13.9343L13.51 14.6025L13.8505 15.2708C14.462 14.9592 14.9592 14.462 15.2708 13.8505L14.6025 13.51ZM14.875 5.125H15.625C15.625 4.43731 15.6256 3.87644 15.5884 3.42193C15.5506 2.95867 15.4699 2.54027 15.2708 2.14953L14.6025 2.49002L13.9343 2.83052C14.0077 2.97456 14.0632 3.17358 14.0934 3.54408C14.1244 3.92333 14.125 4.41256 14.125 5.125H14.875ZM10.875 1.125V1.875C11.5874 1.875 12.0767 1.87558 12.4559 1.90657C12.8264 1.93684 13.0254 1.99235 13.1695 2.06574L13.51 1.39748L13.8505 0.729229C13.4597 0.530137 13.0413 0.449401 12.5781 0.411551C12.1236 0.374417 11.5627 0.375 10.875 0.375V1.125ZM14.6025 2.49002L15.2708 2.14953C14.9592 1.538 14.462 1.04082 13.8505 0.729229L13.51 1.39748L13.1695 2.06574C13.4988 2.23352 13.7665 2.50123 13.9343 2.83052L14.6025 2.49002ZM1.125 5.125H1.875C1.875 4.41256 1.87558 3.92333 1.90657 3.54408C1.93684 3.17358 1.99235 2.97456 2.06574 2.83052L1.39748 2.49002L0.729229 2.14953C0.530137 2.54027 0.449401 2.95867 0.411551 3.42193C0.374417 3.87644 0.375 4.43731 0.375 5.125H1.125ZM5.125 1.125V0.375C4.43731 0.375 3.87644 0.374417 3.42193 0.411551C2.95867 0.449401 2.54027 0.530137 2.14953 0.729229L2.49002 1.39748L2.83052 2.06574C2.97456 1.99235 3.17358 1.93684 3.54408 1.90657C3.92333 1.87558 4.41256 1.875 5.125 1.875V1.125ZM1.39748 2.49002L2.06574 2.83052C2.23352 2.50123 2.50123 2.23352 2.83052 2.06574L2.49002 1.39748L2.14953 0.729229C1.538 1.04082 1.04082 1.538 0.729229 2.14953L1.39748 2.49002ZM9.875 14.875H10.625V1.125H9.875H9.125V14.875H9.875Z"
                  fill="currentColor"
                  tagName="path"
                />
              </Box>
            </CustomButtonBase>
          }
        >
          {minimized ? showMenuLabel : undefined}
        </Tooltip>
      </Box>
    </Box>
  );
}
