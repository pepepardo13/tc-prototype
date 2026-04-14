import type { ImageData } from "../../types/ImageData.ts";

import { Box } from "@envato/design-system/components";

type Props = {
  /** Image data with fallbackSrc and srcSet for responsive images */
  image: ImageData;
  /** Index of the image in the array (for alt text) */
  index: number;
};

/**
 * Reference image chip showing a thumbnail with responsive image support.
 * Matches the styling from PromptBox reference image display.
 */
export function ReferenceImageChip({ image, index }: Props) {
  return (
    <Box
      tagName="img"
      src={image.fallbackSrc}
      srcSet={image.srcSet}
      alt={`Reference image ${index + 1}`}
      dangerouslySetStyle={{
        width: "48px",
        height: "48px",
        objectFit: "cover",
        borderRadius: "4px",
      }}
    />
  );
}
