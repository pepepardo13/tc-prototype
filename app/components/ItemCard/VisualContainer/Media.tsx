/* eslint-disable react-hooks/set-state-in-effect -- Checks if image/video is already cached on mount */
import type { ImageData } from "../../../types/ImageData.ts";
import type { DesignSystem } from "@envato/design-system";

import { Box } from "@envato/design-system/components";
import { useState, useEffect, useRef } from "react";

import { ImagePlaceholder } from "../../ImagePlaceholder.tsx";
import { useItemCardContext } from "../ItemCardContext.tsx";

import styles from "./Media.module.scss";

export type Props = {
  backgroundColor?: DesignSystem["backgroundColor"] | undefined;
  image: ImageData;
  imageAlt: string;
  objectFit?: DesignSystem["objectFit"] | undefined;
  showVideo?: boolean | undefined;
  videoUrl?: string | undefined;
};

export function Media({
  backgroundColor,
  image,
  imageAlt,
  objectFit = "cover",
  showVideo = false,
  videoUrl,
}: Props) {
  const { isInteracting } = useItemCardContext();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasVideo = typeof videoUrl !== "undefined";

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setImageLoaded(true);
      setHasAnimated(true);
    }
  }, [image.fallbackSrc, image.srcSet]);

  // Check if video is already loaded from cache
  useEffect(() => {
    if (hasVideo && videoRef.current && videoRef.current.readyState >= 3) {
      setVideoLoaded(true);
    }
  }, [hasVideo, videoUrl]);

  // Handle video play/pause based on interaction
  useEffect(() => {
    if (hasVideo && videoRef.current && showVideo) {
      // Safari fix: Load video data on hover if not already loaded
      if (videoRef.current.readyState < 3) {
        videoRef.current.load();
      }

      if (isInteracting && videoLoaded) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [hasVideo, isInteracting, videoLoaded, showVideo]);

  const imageOpacity = !hasVideo
    ? imageLoaded
      ? "1"
      : "0"
    : imageLoaded && (!showVideo || !videoLoaded)
      ? "1"
      : "0";

  // Hide placeholder after image fade-in completes (200ms transition)
  const [hidePlaceholder, setHidePlaceholder] = useState(false);

  useEffect(() => {
    if (!imageLoaded) return;

    const timer = setTimeout(() => {
      setHidePlaceholder(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [imageLoaded]);

  if (!image.srcSet) return null;

  return (
    <Box position="relative" width="full" height="full">
      {!hidePlaceholder && <ImagePlaceholder />}

      <Box
        alt={imageAlt}
        backgroundColor={backgroundColor}
        dangerouslySetClassName={
          hasAnimated && imageLoaded ? styles["imageFadeIn"] : undefined
        }
        height="full"
        left="none"
        objectFit={objectFit}
        onLoad={handleImageLoad}
        opacity={imageOpacity}
        position="absolute"
        ref={imgRef}
        src={image.fallbackSrc}
        srcSet={image.srcSet}
        loading="lazy"
        fetchPriority="high"
        tagName="img"
        top="none"
        width="full"
      />

      {hasVideo && videoUrl && (
        <Box
          backgroundColor={backgroundColor}
          height="full"
          left="none"
          loop
          muted
          objectFit={objectFit}
          onLoadedData={handleVideoLoad}
          opacity={showVideo ? "1" : "0"}
          playsInline
          position="absolute"
          // Disable preloading as it'll create hundreds of instances of
          // WebMediaPlayer until browser gives up on you.
          // https://envato.slack.com/archives/C09DS6M449J/p1761723385233559?thread_ts=1761717341.796439&cid=C09DS6M449J
          preload="none"
          ref={videoRef}
          src={videoUrl}
          tagName="video"
          top="none"
          width="full"
        />
      )}
    </Box>
  );
}
