import { Box } from "@envato/design-system/components";
import { useCallback, useRef, useMemo, useId } from "react";

import { formatDuration } from "../../utils/formatDuration.ts";

import { useComputedValues } from "./useComputedValues.ts";
import { useWaveformData } from "./useWaveformData.ts";

type Props = {
  ariaLabel?: string;
  progress?: number;
  duration?: number; // Duration in seconds
  waveformDataUrl?: string | undefined;
  onSeek?: (progress: number) => void;
};

/**
 * Waveform dimensions (SVG units - no retina scaling needed)
 * Layout: [20px seeker extension] [35px waveform] [5px seeker extension] = 60px total
 */
const WAVEFORM_HEIGHT = 35;
const SEEKER_BAR_TOP_EXTENSION = 20;
const SEEKER_BAR_BOTTOM_EXTENSION = 5;
const TOTAL_HEIGHT =
  SEEKER_BAR_TOP_EXTENSION + WAVEFORM_HEIGHT + SEEKER_BAR_BOTTOM_EXTENSION;
const BASELINE = TOTAL_HEIGHT / 2;

/**
 * Fixed viewBox width - SVG will scale automatically to fit container
 * Using a larger width provides more precision for path coordinates
 */
const VIEWBOX_WIDTH = 1000;

const Waveform = ({
  ariaLabel,
  progress,
  duration,
  waveformDataUrl,
  onSeek,
}: Props) => {
  const svg = useRef<SVGSVGElement>(null);
  const container = useRef<HTMLDivElement | null>(null);

  // Generate a unique ID for this component instance's clipPath
  const clipPathId = useId();

  const { waveformData, status } = useWaveformData(waveformDataUrl);

  // eslint-disable-next-line react-hooks/refs -- SVG ref passed to hook for computed CSS values (handles null)
  const svgElement = svg.current;
  const {
    secondaryColor,
    interactiveColor,
    seekerColor,
    seekerFontFamily,
    seekerFontSize,
  } = useComputedValues(svgElement);

  // Process waveform data: normalize to 0-100 range and split into top/bottom halves
  const normalisedWaveform = useMemo(() => {
    if (!waveformData || waveformData.length === 0) {
      return { topFromLeft: [], bottomFromRight: [] };
    }

    // Find max absolute value for normalization
    const maxAmplitude = Math.max(...waveformData.map(Math.abs));
    if (maxAmplitude === 0) {
      return { topFromLeft: [], bottomFromRight: [] };
    }

    // Split alternating data points into top (odd indices) and bottom (even indices)
    const topFromLeft: number[] = [];
    const bottomFromRight: number[] = [];

    waveformData.forEach((dataPoint, index) => {
      const normalized = (dataPoint / maxAmplitude) * 100;
      if (index % 2 === 0) {
        bottomFromRight.unshift(normalized); // Reverse order for right-to-left drawing
      } else {
        topFromLeft.push(normalized);
      }
    });

    return { topFromLeft, bottomFromRight };
  }, [waveformData]);

  // Generate SVG path from normalized waveform data
  const waveformPath = useMemo(() => {
    const { topFromLeft, bottomFromRight } = normalisedWaveform;
    if (topFromLeft.length === 0) return "";

    const xStep = VIEWBOX_WIDTH / topFromLeft.length;
    const lastX = VIEWBOX_WIDTH - xStep;
    // Scale normalized amplitude (0-100) to fit half the waveform height (divide by 200)
    const amplitudeScale = WAVEFORM_HEIGHT / 200;

    // Draw top half left-to-right, then bottom half right-to-left to create closed shape
    const topPath = topFromLeft
      .map(
        (amplitude, i) =>
          `${i === 0 ? "M" : "L"} ${i * xStep} ${BASELINE - amplitude * amplitudeScale}`,
      )
      .join(" ");

    const bottomPath = bottomFromRight
      .map(
        (amplitude, i) =>
          `L ${lastX - i * xStep} ${BASELINE - amplitude * amplitudeScale}`,
      )
      .join(" ");

    return `${topPath} ${bottomPath} Z`;
  }, [normalisedWaveform]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!onSeek || !container.current) return;

      const rect = container.current.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const progress = (clickX / rect.width) * 100;

      // Clamp progress between 0 and 100
      const clampedProgress = Math.max(0, Math.min(100, progress));
      onSeek(clampedProgress);
    },
    [onSeek],
  );

  const hasWaveformData = waveformData && waveformData.length > 0;
  const hasProgress = progress !== undefined && progress > 0;
  const progressWidth = ((progress ?? 0) / 100) * VIEWBOX_WIDTH;
  const progressPercent = progress ?? 0;

  return (
    <Box
      ref={container}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          // Create a synthetic mouse event for keyboard interaction
          const syntheticEvent = {
            clientX: container.current?.getBoundingClientRect().left || 0,
            clientY: 0,
          } as React.MouseEvent<HTMLDivElement>;
          handleClick(syntheticEvent);
        }
      }}
      role={onSeek ? "button" : undefined}
      width="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      cursor={onSeek ? "pointer" : "default"}
      position="relative"
      dangerouslySetStyle={{
        height: `${TOTAL_HEIGHT}px`,
        opacity: status === "not-loaded" ? 0.5 : 1,
      }}
    >
      <svg
        ref={svg}
        width="100%"
        height={TOTAL_HEIGHT}
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${TOTAL_HEIGHT}`}
        preserveAspectRatio="none"
        aria-label={ariaLabel}
        role={ariaLabel ? "img" : undefined}
        style={{ display: "block" }}
      >
        {hasWaveformData ? (
          <>
            {/* Full waveform in secondary color */}
            <path
              d={waveformPath}
              fill={secondaryColor}
              stroke={secondaryColor}
              strokeWidth="0.5"
            />

            {/* Progress overlay in interactive color */}
            {hasProgress && (
              <>
                <defs>
                  <clipPath id={clipPathId}>
                    <rect
                      x="0"
                      y="0"
                      width={progressWidth}
                      height={TOTAL_HEIGHT}
                    />
                  </clipPath>
                </defs>
                <path
                  d={waveformPath}
                  fill={interactiveColor}
                  stroke={interactiveColor}
                  strokeWidth="0.5"
                  clipPath={`url(#${clipPathId})`}
                />
              </>
            )}
          </>
        ) : (
          <>
            {/* Baseline when no waveform data */}
            <line
              x1="0"
              y1={BASELINE}
              x2={VIEWBOX_WIDTH}
              y2={BASELINE}
              stroke={secondaryColor}
              strokeWidth="1"
            />

            {/* Progress line */}
            {hasProgress && (
              <line
                x1="0"
                y1={BASELINE}
                x2={progressWidth}
                y2={BASELINE}
                stroke={interactiveColor}
                strokeWidth="1"
              />
            )}
          </>
        )}
      </svg>

      {/* Playhead UI overlay - positioned absolutely to avoid SVG scaling */}
      {hasProgress && (
        <Box
          position="absolute"
          top="none"
          height="full"
          dangerouslySetStyle={{
            left: `${progressPercent}%`,
            pointerEvents: "none",
            transform: "translateX(-1px)", // Center the 2px line on the position
          }}
        >
          {/* Seeker line */}
          <Box
            position="absolute"
            left="none"
            top="none"
            bottom="none"
            dangerouslySetStyle={{
              width: "2px",
              backgroundColor: seekerColor,
            }}
          />

          {/* Current time text */}
          {duration && (
            <Box
              position="absolute"
              left="2x"
              top="none"
              dangerouslySetStyle={{
                color: seekerColor,
                fontSize: seekerFontSize,
                fontFamily: seekerFontFamily,
                whiteSpace: "nowrap",
              }}
            >
              {formatDuration((progress / 100) * duration)}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Waveform;
