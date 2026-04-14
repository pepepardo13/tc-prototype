import {
  Box,
  IconButton,
  Text,
} from "@envato/design-system/components";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

type VideoGenFullscreenPlayerProps = {
  /** Video thumbnail / poster URL */
  thumbnailUrl: string;
  /** Whether the video is currently playing */
  isPlaying?: boolean;
  /** Whether audio is muted */
  isMuted?: boolean;
  /** Current progress (0-1) */
  progress?: number;
  /** Current time display (e.g. "0:03") */
  currentTime?: string;
  /** Duration display (e.g. "0:05") */
  duration?: string;
  /** Called when play/pause is toggled */
  onPlayPause?: () => void;
  /** Called when mute is toggled */
  onMuteToggle?: () => void;
  /** Called when fullscreen is exited */
  onExitFullscreen?: () => void;
};

export function VideoGenFullscreenPlayer({
  thumbnailUrl,
  isPlaying = false,
  isMuted = false,
  progress = 0,
  currentTime = "0:00",
  duration = "0:05",
  onPlayPause,
  onMuteToggle,
  onExitFullscreen,
}: VideoGenFullscreenPlayerProps) {
  const t = useTranslations();

  return (
    <Box
      position="relative"
      dangerouslySetStyle={{
        width: "100%",
        height: "100vh",
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* Video frame */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        dangerouslySetStyle={{
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={thumbnailUrl}
          alt="Video fullscreen"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Center play/pause overlay (visible when paused) */}
      {!isPlaying && (
        <Box
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          dangerouslySetStyle={{
            inset: 0,
            cursor: "pointer",
          }}
          onClick={onPlayPause}
        >
          <Box
            dangerouslySetStyle={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </Box>
        </Box>
      )}

      {/* Bottom controls bar */}
      <Box
        position="absolute"
        dangerouslySetStyle={{
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
          padding: "24px 16px 16px",
        }}
      >
        {/* Progress bar */}
        <Box
          dangerouslySetStyle={{
            width: "100%",
            height: "4px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "2px",
            marginBottom: "12px",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <Box
            dangerouslySetStyle={{
              width: `${progress * 100}%`,
              height: "100%",
              background: "#78dc00",
              borderRadius: "2px",
              transition: "width 0.1s linear",
            }}
          />
          {/* Scrubber handle */}
          <Box
            dangerouslySetStyle={{
              position: "absolute",
              top: "-4px",
              left: `${progress * 100}%`,
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#78dc00",
              transform: "translateX(-50%)",
            }}
          />
        </Box>

        {/* Controls row */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left: play, time */}
          <Box
            display="flex"
            alignItems="center"
            dangerouslySetStyle={{ gap: "12px" }}
          >
            <IconButton
              icon={isPlaying ? "pause" : "play"}
              variant="secondary"
              size="medium"
              onClick={onPlayPause}
              aria-label={isPlaying ? t("videoGen.player.pause") : t("videoGen.player.play")}
            />
            <Text variant="body-small" color="inverse">
              {currentTime} / {duration}
            </Text>
          </Box>

          {/* Right: mute, fullscreen exit */}
          <Box
            display="flex"
            alignItems="center"
            dangerouslySetStyle={{ gap: "8px" }}
          >
            <IconButton
              icon={isMuted ? "volume-off" : "volume-on"}
              variant="secondary"
              size="medium"
              onClick={onMuteToggle}
              aria-label={isMuted ? t("videoGen.player.unmute") : t("videoGen.player.mute")}
            />
            <IconButton
              icon="fullscreen"
              variant="secondary"
              size="medium"
              onClick={onExitFullscreen}
              aria-label={t("videoGen.player.exitFullscreen")}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
