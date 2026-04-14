import { useCallback, useRef, type FocusEvent, type MouseEvent } from "react";

type Props<T extends HTMLElement | SVGElement> = {
  onEnter?: (event: FocusEvent<T> | MouseEvent<T>) => void;
  onLeave?: (event: FocusEvent<T> | MouseEvent<T>) => void;
};

export function useInteractionHandlers<T extends HTMLElement | SVGElement>({
  onEnter,
  onLeave,
}: Props<T>) {
  const ref = useRef<T>(null);

  const handleEnter = useCallback(
    (event: FocusEvent<T> | MouseEvent<T>) => {
      if (typeof onEnter === "function") onEnter(event);
    },
    [onEnter],
  );

  const handleLeave = useCallback(
    (event: FocusEvent<T> | MouseEvent<T>) => {
      if (typeof onLeave !== "function") return;

      if (event.type !== "blur" || ref.current === null) return onLeave(event);

      const isDescendentFocused = ref.current.contains(
        (event as FocusEvent<T>).relatedTarget,
      );

      if (!isDescendentFocused) onLeave(event);
    },
    [onLeave],
  );

  return {
    onBlurCapture: handleLeave,
    onFocusCapture: handleEnter,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    ref,
  };
}
