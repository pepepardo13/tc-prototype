import type { RouterIntegrationProps } from "../../AppProvider/LinkComponent.tsx";
import type { MouseEvent } from "react";

import { Box, Link } from "@envato/design-system/components";

import { useColorScheme } from "../../../contexts/ColorSchemeContext.tsx";

import envatoDarkHref from "./envato-dark.svg";
import envatoHref from "./envato.svg";

type Props = {
  minimized?: boolean | undefined;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
};

const SVG_WIDTH = 105;

export function HomeLink({ minimized = false, onClick }: Props) {
  const colorScheme = useColorScheme();
  const width = minimized ? "0px" : `${SVG_WIDTH}px`;

  const src = colorScheme === "dark" ? envatoHref : envatoDarkHref;

  return (
    <Link<RouterIntegrationProps>
      alignItems="center"
      dangerouslySetStyle={{
        transitionProperty: "opacity, width",
        width,
      }}
      display="flex"
      inert={minimized}
      onClick={onClick}
      opacity={minimized ? "0" : "1"}
      overflow="hidden"
      paddingY="1x"
      transitionDuration="medium"
      transitionTimingFunction="ease-out"
      to="/"
    >
      <Box alt="" src={src} tagName="img" />
    </Link>
  );
}
