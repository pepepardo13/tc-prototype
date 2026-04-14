import {
  colorSchemeVars,
  globalVars,
  internalVars,
} from "@envato/design-system";
import { CustomButtonBase, Icon } from "@envato/design-system/components";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

type Props = {
  isPlaying: boolean;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
};

export function PlayButton({ isPlaying, onClick, disabled = false }: Props) {
  const t = useTranslations();

  return (
    <CustomButtonBase
      onClick={onClick}
      disabled={disabled}
      aria-label={isPlaying ? t("music.pause") : t("music.play")}
      backgroundColor={{
        default: isPlaying ? "interactive-primary" : "interactive-secondary",
        hover: isPlaying ? "interactive-primary" : "interactive-primary",
        focusVisible: isPlaying ? "interactive-primary" : "interactive-primary",
        disabled: "elevated",
      }}
      color={{
        default: isPlaying ? "interactive" : "primary",
        hover: isPlaying ? "interactive" : "interactive",
        focusVisible: isPlaying ? "interactive" : "interactive",
        disabled: "disabled",
      }}
      cssVariables={assignInlineVars({
        [internalVars.dsBoxShadowColorVar]:
          colorSchemeVars["color-border-tertiary"],
        [internalVars.dsBoxShadowWidthVar]: globalVars["chunkiness-thin"],
      })}
      boxShadow={{
        default: isPlaying ? "none" : "none",
        hover: "none",
        focusVisible: isPlaying ? "none" : "css-vars",
        disabled: "none",
      }}
      borderRadius="circle"
      padding="2x"
    >
      <Icon name={isPlaying ? "pause" : "play"} size="3x" color="inherit" />
    </CustomButtonBase>
  );
}
