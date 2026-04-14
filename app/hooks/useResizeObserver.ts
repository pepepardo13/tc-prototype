import type { RefObject } from "react";

import { useEffect, useRef } from "react";

export default function useResizeObserver(
  elementRef: RefObject<HTMLElement | null>,
  callback: (entry: ResizeObserverEntry) => void,
) {
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        callbackRef.current(entry);
      }
    });

    resizeObserver.observe(element, { box: "border-box" });

    return () => {
      resizeObserver.disconnect();
    };
  }, [elementRef]);
}
