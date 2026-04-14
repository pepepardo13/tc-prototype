import { Box } from "@envato/design-system/components";

import { VIEWBOX_WIDTH, VIEWBOX_HEIGHT } from "./constants.ts";
import { calculateProgressBarYPosition } from "./utils/utils.ts";

const LoadingLogoSVG = ({ progress }: { progress: number }) => {
  const progressBarYPositionCalculation =
    calculateProgressBarYPosition(progress);

  return (
    <Box height="full" width="full">
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        style={{ color: "var(--color-surface-interactive-primary)" }}
        data-testid="logo-svg"
      >
        {/* Logo shape mask - defines the Envato "E" logo silhouette */}
        <mask
          id="logo-silhouette-mask"
          x="0"
          y="0"
          data-testid="logo-silhouette-mask"
          style={{ maskType: "alpha" }}
        >
          {/* Main "E" logo shape path */}
          <path d="M58.6614 57.2627L36.4865 59.638C36.0809 59.6827 35.8712 59.1636 36.1943 58.9127L57.8949 42.0176C59.3043 40.8661 60.2014 39.0717 59.8164 37.1502C59.4314 34.2043 56.9977 32.2828 53.9247 32.6678L30.3472 36.119C29.9313 36.1809 29.7079 35.6481 30.0413 35.3937L53.4125 17.5499C58.0255 13.9647 58.4071 6.9179 54.1825 2.82047C50.3394 -1.02259 44.1898 -0.895407 40.3468 2.94765L2.68269 41.2511C1.27333 42.7876 0.633969 44.8363 1.01896 47.0157C1.65833 50.4737 5.1164 52.7803 8.5779 52.1409L28.8794 47.9988C29.3194 47.9094 29.5601 48.4972 29.1785 48.7378L6.65293 63.1545C3.83423 64.9488 2.5555 68.1491 3.44924 71.3528C4.34641 75.5808 8.57446 78.0145 12.6719 76.9902L46.3417 68.6956C46.7198 68.6028 46.9982 69.0428 46.7541 69.3453L41.4949 75.8352C40.0855 77.6295 42.392 80.0633 44.3136 78.6539L61.6073 64.4366C64.6804 61.8757 62.6317 56.8777 58.6614 57.2627Z" />
          {/* Small dot element at bottom of logo */}
          <path d="M36.0535 87.9997C38.2273 87.9997 39.9894 86.2375 39.9894 84.0638C39.9894 81.8901 38.2273 80.1279 36.0535 80.1279C33.8798 80.1279 32.1177 81.8901 32.1177 84.0638C32.1177 86.2375 33.8798 87.9997 36.0535 87.9997Z" />
        </mask>
        {/* Progress bar container - applies mask to show logo shape */}
        <g mask="url(#logo-silhouette-mask)" data-testid="progress-bar">
          {/* Background grey area - fills entire logo shape */}
          <rect
            fill="var(--color-content-disabled)"
            x="0"
            y="0"
            width="100%"
            height="100%"
          />
          {/* Animated wave container - moves vertically based on progress */}
          <g
            transform={`translate(0, ${progressBarYPositionCalculation})`}
            data-testid="animated-wave-group"
          >
            {/* Animated wave shape - creates liquid fill effect with smooth transitions */}
            <path
              d="M0,20 C80,5 120,35 200,20 S320,5 100,20 V100 H0 Z"
              fill="currentColor"
            >
              {/* Wave animation - creates organic wave motion */}
              <animate
                attributeName="d"
                dur="3s"
                repeatCount="indefinite"
                values="
                  M0,20 C80,5 120,35 200,20 S320,5 400,20 V400 H0 Z;
                  M0,20 C80,35 120,5 200,20 S320,35 400,20 V400 H0 Z;
                  M0,20 C80,5 120,35 200,20 S320,5 400,20 V400 H0 Z
                "
              />
            </path>
          </g>
        </g>
      </svg>
    </Box>
  );
};

export default LoadingLogoSVG;
