import { useEffect, useState, useRef } from "react";

/**
 * Smoothly animates progress value transitions when the target progress changes.
 * Uses requestAnimationFrame for smooth 60fps animations.
 *
 * @param targetProgress - The target progress value (0-100)
 * @param duration - Duration of animation in milliseconds (default: 600ms)
 * @returns The smoothly animated progress value
 */
const useSmoothProgress = (
  targetProgress: number,
  duration: number = 600,
): number => {
  const [smoothedProgress, setSmoothedProgress] = useState(targetProgress);
  const animationFrameRef = useRef<number | null | undefined>(null);
  const startProgressRef = useRef(targetProgress);
  const startTimeRef = useRef<number | null>(null);
  const targetRef = useRef(targetProgress);

  useEffect(() => {
    targetRef.current = targetProgress;

    // If already at target (within small epsilon), don't animate
    if (Math.abs(targetProgress - smoothedProgress) < 0.01) {
      return undefined;
    }

    // Cancel any ongoing animation
    const animationFrameId = animationFrameRef.current;
    if (typeof animationFrameId === "number") {
      cancelAnimationFrame(animationFrameId);
    }

    // Set starting point for new animation
    startProgressRef.current = smoothedProgress;
    const target = targetProgress;
    startTimeRef.current = null;

    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progressValue = Math.min(elapsed / duration, 1);

      // Easing function: cubic-bezier(0.4, 0, 0.2, 1) equivalent
      const ease =
        progressValue < 0.5
          ? 4 * progressValue * progressValue * progressValue
          : 1 - (-2 * progressValue + 2) ** 3 / 2;

      const currentProgress =
        startProgressRef.current + (target - startProgressRef.current) * ease;

      setSmoothedProgress(currentProgress);

      if (progressValue < 1 && targetRef.current === target) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete or target changed, ensure we're at current target
        setSmoothedProgress(targetRef.current);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    const cleanup = () => {
      const frameId = animationFrameRef.current;
      if (typeof frameId === "number") {
        cancelAnimationFrame(frameId);
      }
    };
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetProgress, duration]);

  return smoothedProgress;
};

export default useSmoothProgress;
