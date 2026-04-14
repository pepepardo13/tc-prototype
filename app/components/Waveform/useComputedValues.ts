import { useEffect, useState } from "react";

import { useColorScheme } from "../../contexts/ColorSchemeContext.tsx";

function getComputedValue(
  node: HTMLElement | SVGElement | null,
  property: string,
  fallbackValue: string,
) {
  return node
    ? getComputedStyle(node).getPropertyValue(property).trim() || fallbackValue
    : fallbackValue;
}

function getComputedValues(node: HTMLElement | SVGElement | null) {
  let seekerFontSize = getComputedValue(node, "--font-size-micro", "12px");

  if (seekerFontSize.endsWith("em")) {
    const bodyFontSize =
      getComputedStyle(document.body).getPropertyValue("font-size").trim() ||
      "16px";

    seekerFontSize = `${parseFloat(bodyFontSize) * parseFloat(seekerFontSize)}px`;
  }

  return {
    secondaryColor: getComputedValue(
      node,
      "--color-surface-interactive-disabled",
      "#383838",
    ),
    interactiveColor: getComputedValue(
      node,
      "--color-surface-interactive-primary",
      "#87e64b",
    ),
    seekerColor: getComputedValue(node, "--color-content-primary", "#ffffff"),
    seekerFontFamily: getComputedValue(node, "--font-family-micro", "PolySans"),
    seekerFontSize,
  };
}

export function useComputedValues(node: HTMLElement | SVGElement | null) {
  const colorScheme = useColorScheme();

  const [computedValues, setComputedValues] = useState<{
    secondaryColor: string;
    interactiveColor: string;
    seekerColor: string;
    seekerFontFamily: string;
    seekerFontSize: string;
  }>(getComputedValues(node));

  useEffect(() => {
    setTimeout(() => {
      setComputedValues(getComputedValues(node));
    }, 150);
  }, [colorScheme, node]);

  return computedValues;
}
