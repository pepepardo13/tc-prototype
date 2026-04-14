import type { ReactNode } from "react";

import { Box } from "@envato/design-system/components";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import useResizeObserver from "../../hooks/useResizeObserver.ts";

import styles from "./FannedCarousel.module.scss";

// Arc geometry uses fixed values. The arc center is positioned relative to
// the bottom of the container so cards always appear just above the PromptBox.
const CONFIG = {
  arcRadius: 1500,
  // Distance from bottom of container to arc center
  // Cards appear above this point on the arc
  bottomOffset: 340,
  cardSize: 200,
  degreesPerCard: 10.5,
  rotationSpeed: 0.003,
  // Speed animation: carousel starts fast and eases down to rotationSpeed
  initialRotationSpeed: 0.05,
  speedDecayDuration: 2000, // ms to slow down
  pauseEasing: 0.05,
};

type CarouselItem = {
  id: string;
  image: string;
};

type Props<T extends CarouselItem> = {
  items: T[];
  renderOverlay?: (item: T) => ReactNode;
  onItemClick?: (item: T) => void;
};

function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function FannedCarousel<T extends CarouselItem>({
  items,
  renderOverlay,
  onItemClick,
}: Props<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const animationRef = useRef<number | null>(null);
  const currentAngleRef = useRef(0);
  const currentSpeedRef = useRef(CONFIG.initialRotationSpeed);
  const targetSpeedRef = useRef(CONFIG.rotationSpeed);
  const lastTimeRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const carouselId = useId();

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Carousel is ready to show once container has been measured
  const isReady = containerSize.width > 0 && containerSize.height > 0;

  // Derived values from container size - memoized to prevent useCallback dependency churn
  const containerCenter = useMemo(
    () => ({
      x: containerSize.width / 2,
      y: containerSize.height / 2,
    }),
    [containerSize.width, containerSize.height],
  );

  // Arc center is positioned relative to the bottom of the container
  // This ensures cards always appear just above the PromptBox regardless of screen height
  // For shorter screens (below 998px), decrease the offset to push cards lower
  const bottomOffset =
    containerSize.height < 998
      ? CONFIG.bottomOffset - (998 - containerSize.height) * 0.3
      : CONFIG.bottomOffset;
  const arcCenterY = containerSize.height - bottomOffset + CONFIG.arcRadius;

  // Update container size on resize
  const handleResize = useCallback((entry: ResizeObserverEntry) => {
    const { width, height } = entry.contentRect;
    setContainerSize({ width, height });
  }, []);

  useResizeObserver(containerRef, handleResize);

  // Apply transforms to all cards
  const applyTransforms = useCallback(() => {
    if (!containerRef.current || containerSize.height === 0) return;

    const totalArc = items.length * CONFIG.degreesPerCard;

    items.forEach((item, index) => {
      const cardEl = cardRefs.current.get(item.id);
      if (!cardEl) return;

      let angle = index * CONFIG.degreesPerCard + currentAngleRef.current;

      // Wrap around for continuous loop
      while (angle > totalArc / 2) angle -= totalArc;
      while (angle < -totalArc / 2) angle += totalArc;

      const angleRad = degToRad(angle - 90);
      const x = containerCenter.x + CONFIG.arcRadius * Math.cos(angleRad);
      const y = arcCenterY + CONFIG.arcRadius * Math.sin(angleRad);

      const translateX = x - containerCenter.x;
      const translateY = y - containerCenter.y;
      const zIndex = Math.round(100 - Math.abs(angle));

      cardEl.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${angle}deg)`;
      cardEl.style.zIndex = String(zIndex);
    });
  }, [containerCenter, containerSize.height, arcCenterY, items]);

  // Start animation on mount
  useEffect(() => {
    // Animation loop
    const animate = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Calculate base target speed with initial decay
      const elapsed = timestamp - startTimeRef.current;
      const decayProgress = Math.min(1, elapsed / CONFIG.speedDecayDuration);
      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - decayProgress, 3);
      const baseTargetSpeed =
        CONFIG.initialRotationSpeed -
        (CONFIG.initialRotationSpeed - CONFIG.rotationSpeed) * eased;

      // Use 0 if paused (hover), otherwise use the decaying speed
      const effectiveTarget =
        targetSpeedRef.current === 0 ? 0 : baseTargetSpeed;

      // Ease speed towards target
      currentSpeedRef.current +=
        (effectiveTarget - currentSpeedRef.current) * CONFIG.pauseEasing;

      // Update angle
      currentAngleRef.current -= currentSpeedRef.current * deltaTime;

      applyTransforms();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initial transform application
    applyTransforms();

    // Start animation loop
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [applyTransforms]);

  // Re-apply transforms when container size changes
  useEffect(() => {
    applyTransforms();
  }, [applyTransforms, containerSize]);

  // Hover handlers
  const handleMouseEnter = useCallback(() => {
    targetSpeedRef.current = 0;
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetSpeedRef.current = CONFIG.rotationSpeed;
  }, []);

  // Card ref callback
  const setCardRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      if (el) {
        cardRefs.current.set(id, el);
      } else {
        cardRefs.current.delete(id);
      }
    },
    [],
  );

  return (
    <Box
      ref={containerRef}
      dangerouslySetClassName={styles["carousel"]}
      position="relative"
      dangerouslySetStyle={{ opacity: isReady ? 1 : 0 }}
    >
      {items.map((item) => (
        <div
          key={`${carouselId}-${item.id}`}
          ref={setCardRef(item.id)}
          className={styles["card"]}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => onItemClick?.(item)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onItemClick?.(item);
            }
          }}
        >
          <img
            src={item.image}
            alt=""
            className={styles["cardImage"]}
            draggable={false}
          />
          {renderOverlay && (
            <div className={styles["overlay"]}>{renderOverlay(item)}</div>
          )}
        </div>
      ))}
    </Box>
  );
}
