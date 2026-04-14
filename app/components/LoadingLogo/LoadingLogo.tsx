import { Box, Stack } from "@envato/design-system/components";

import LoadingLogoSVG from "./LoadingLogoSVG/LoadingLogoSVG.tsx";
import LoadingText from "./LoadingLogoText/LoadingLogoText.tsx";
import useSmoothProgress from "./hooks/useSmoothProgress.ts";

const LoadingLogo = ({
  progress = 0,
  displayLoadingText = false,
  loadingText = "",
  size = 64,
}: {
  progress: number;
  displayLoadingText?: boolean;
  loadingText?: string;
  /** Width of the logo in pixels. Defaults to 64px. */
  size?: number;
}) => {
  const smoothAnimationProgress = useSmoothProgress(progress);

  return (
    <div
      role="progressbar"
      aria-label={`Loading progress: ${Math.round(progress)}%`}
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      data-testid="loading-logo-container"
    >
      <Stack spacing="2x" alignItems="center">
        <Box dangerouslySetStyle={{ width: `${size}px` }}>
          <LoadingLogoSVG progress={smoothAnimationProgress} />
        </Box>
        {displayLoadingText && (
          <LoadingText loadingText={loadingText} progress={progress} />
        )}
      </Stack>
    </div>
  );
};

export default LoadingLogo;
