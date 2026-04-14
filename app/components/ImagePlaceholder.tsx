import { Box } from "@envato/design-system/components";

type Props = {
  /** Variant for the placeholder colors */
  variant?: "default" | "long";
};

export function ImagePlaceholder({ variant = "default" }: Props) {
  const colors =
    variant === "long"
      ? {
          primary: "var(--color-surface-promotion-default)",
          secondary: "var(--color-surface-sale)",
        }
      : {
          primary: "var(--color-surface-background)",
          secondary: "var(--color-surface-elevated-2x)",
        };

  return (
    <>
      <style>
        {`
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 0%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
      <Box
        width="full"
        height="full"
        dangerouslySetStyle={{
          backgroundImage: `
            radial-gradient(ellipse 200% 100% at 0% 50%, color-mix(in srgb, ${colors.primary} 95%, transparent) 0%, transparent 70%),
            radial-gradient(ellipse 200% 100% at 100% 50%, color-mix(in srgb, ${colors.secondary} 95%, transparent) 0%, transparent 70%),
            linear-gradient(45deg,
              ${colors.primary} 0%,
              color-mix(in srgb, ${colors.primary} 80%, ${colors.secondary} 20%) 29%,
              color-mix(in srgb, ${colors.primary} 40%, ${colors.secondary} 60%) 43%,
              color-mix(in srgb, ${colors.primary} 20%, ${colors.secondary} 80%) 57%,
              ${colors.secondary} 71%,
              ${colors.secondary} 100%,
              ${colors.secondary} 71%,
              color-mix(in srgb, ${colors.primary} 20%, ${colors.secondary} 80%) 57%,
              color-mix(in srgb, ${colors.primary} 40%, ${colors.secondary} 60%) 43%,
              color-mix(in srgb, ${colors.primary} 80%, ${colors.secondary} 20%) 29%
            )
          `,
          backgroundSize: "400% 400%",
          animation: `gradientShift ${variant === "long" ? "8s" : "2s"} ease-in-out infinite`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {variant === "long" && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
              mixBlendMode: "overlay",
            }}
          >
            <defs>
              <filter id="noise" x="0" y="0" width="100%" height="100%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency={1.5}
                  numOctaves={4}
                  seed={1}
                >
                  <animate
                    attributeName="seed"
                    from="0"
                    to="100"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feColorMatrix
                  type="matrix"
                  values="1 0 0 0 0
                          0 1 0 0 0
                          0 0 1 0 0
                          0 0 0 0.6 0"
                />
              </filter>
            </defs>
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              rx="3"
              fill="white"
              filter="url(#noise)"
            />
          </svg>
        )}
      </Box>
    </>
  );
}
