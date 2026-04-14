/* eslint-disable react-hooks/set-state-in-effect -- Checks if image is already cached on mount */
import type { ImageData } from "../../types/ImageData.ts";

import { Box } from "@envato/design-system/components";
import { useEffect, useRef, useState } from "react";

import { ImagePlaceholder } from "../ImagePlaceholder.tsx";

import styles from "./LoadingImage.module.scss";

export type LoadingImageProps = {
  /** Image source URL (for backward compatibility) */
  src?: string;
  /** Image data with srcSet and fallbackSrc */
  image?: ImageData;
  /** Alt text for accessibility */
  alt?: string;
  /** Object fit style */
  objectFit?: "cover" | "contain";
  /** Border radius token */
  borderRadius?: "2x" | "3x" | "4x";
  /** Placeholder variant - "long" for animated, "default" for static */
  placeholderVariant?: "default" | "long";
};

/**
 * Image component that shows a placeholder until the image loads,
 * then fades in the image.
 * Follows the same pattern as item card Media component.
 */
export function LoadingImage({
  src,
  image,
  alt = "",
  objectFit = "cover",
  borderRadius,
  placeholderVariant = "default",
}: LoadingImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [hidePlaceholder, setHidePlaceholder] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Use image prop if provided, otherwise fall back to src for backward compatibility
  const imageSrc = image?.fallbackSrc ?? src;
  const imageSrcSet = image?.srcSet;

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  };

  // Check if image is already loaded from cache (same pattern as Media)
  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true);
      setHasAnimated(true);
    }
  }, [imageSrc, imageSrcSet]);

  // Hide placeholder after a short delay once image has loaded
  useEffect(() => {
    if (!imageLoaded) return;

    const timer = setTimeout(() => {
      setHidePlaceholder(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [imageLoaded]);

  if (!imageSrc) return null;

  return (
    <Box
      position="relative"
      width="full"
      height="full"
      {...(borderRadius && { borderRadius })}
      overflow="hidden"
    >
      {!hidePlaceholder && <ImagePlaceholder variant={placeholderVariant} />}

      <Box
        tagName="img"
        ref={imgRef}
        src={imageSrc}
        srcSet={imageSrcSet}
        alt={alt}
        width="full"
        height="full"
        position="absolute"
        left="none"
        top="none"
        objectFit={objectFit}
        onLoad={handleImageLoad}
        dangerouslySetClassName={
          hasAnimated && imageLoaded ? styles["imageFadeIn"] : undefined
        }
        dangerouslySetStyle={{
          opacity: imageLoaded ? 1 : 0,
        }}
      />
    </Box>
  );
}
