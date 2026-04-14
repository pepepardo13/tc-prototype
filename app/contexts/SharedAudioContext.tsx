import { Box } from "@envato/design-system/components";
import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { useLocation } from "react-router";

type InstanceState = {
  progress: number | undefined;
  loaded: boolean;
  duration: number | undefined;
};

type SharedAudioContextValue = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setActiveInstance: (instanceId: string, audioUrl: string) => void;
  clearActiveInstance: (instanceId: string) => void;
  isActiveInstance: (instanceId: string) => boolean;
  setInstanceProgress: (
    instanceId: string,
    progress: number | undefined,
  ) => void;
  setInstanceLoaded: (instanceId: string, loaded: boolean) => void;
  setInstanceDuration: (
    instanceId: string,
    duration: number | undefined,
  ) => void;
  seek: (instanceId: string, audioUrl: string, time: number) => void;
  play: () => Promise<void>;
  pause: () => void;
  subscribeToStateChange: (
    instanceId: string,
    callback: (state: {
      isPlaying: boolean;
      progress: number | undefined;
      loaded: boolean;
    }) => void,
  ) => () => void;
  subscribeToEnded: (instanceId: string, callback: () => void) => () => void;
};

const SharedAudioContext = createContext<SharedAudioContextValue | null>(null);

export function SharedAudioProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  // All state stored in refs for imperative access
  const activeInstanceIdRef = useRef<string | null>(null);
  const activeAudioUrlRef = useRef<string | null>(null);
  const instanceStatesRef = useRef<Map<string, InstanceState>>(new Map());

  // Subscribers for events
  const stateChangeSubscribers = useRef<
    Map<
      string,
      Set<
        (state: {
          isPlaying: boolean;
          progress: number | undefined;
          loaded: boolean;
        }) => void
      >
    >
  >(new Map());
  const endedSubscribers = useRef<Map<string, Set<() => void>>>(new Map());

  // Imperatively notify all subscribers for an instance
  const notifyStateChange = useCallback((instanceId: string) => {
    const state = instanceStatesRef.current.get(instanceId);
    const isActive = activeInstanceIdRef.current === instanceId;
    // Check actual playing state from audio element
    const isPlaying =
      isActive &&
      audioRef.current !== null &&
      !audioRef.current.paused &&
      !audioRef.current.ended;
    stateChangeSubscribers.current.get(instanceId)?.forEach((callback) => {
      callback({
        isPlaying,
        progress: state?.progress,
        loaded: state?.loaded ?? false,
      });
    });
  }, []);

  // Clear all audio state (called on route changes)
  const clearAllState = useCallback(() => {
    // Pause audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Notify all instances that they're no longer playing
    const previousActiveInstanceId = activeInstanceIdRef.current;
    if (previousActiveInstanceId) {
      notifyStateChange(previousActiveInstanceId);
    }

    // Clear all state
    activeInstanceIdRef.current = null;
    activeAudioUrlRef.current = null;
    instanceStatesRef.current.clear();
  }, [notifyStateChange]);

  // Helper to get or create instance state
  const getOrCreateInstanceState = useCallback(
    (instanceId: string): InstanceState => {
      if (!instanceStatesRef.current.has(instanceId)) {
        instanceStatesRef.current.set(instanceId, {
          progress: undefined,
          loaded: false,
          duration: undefined,
        });
      }
      return instanceStatesRef.current.get(instanceId)!;
    },
    [],
  );

  const setActiveInstance = useCallback(
    (instanceId: string, audioUrl: string) => {
      if (!audioRef.current) return;

      const previousInstanceId = activeInstanceIdRef.current;

      // Set new active instance FIRST so notifyStateChange sees correct state
      activeInstanceIdRef.current = instanceId;
      activeAudioUrlRef.current = audioUrl;

      // Save current position of previous instance before switching
      if (previousInstanceId && previousInstanceId !== instanceId) {
        const prevState = instanceStatesRef.current.get(previousInstanceId);
        if (prevState && audioRef.current.src) {
          // Save currentTime as progress before switching away
          const currentTime = audioRef.current.currentTime;
          if (prevState.duration && currentTime > 0) {
            const progress = (currentTime / prevState.duration) * 100;
            instanceStatesRef.current.set(previousInstanceId, {
              ...prevState,
              progress,
              loaded: false, // Reset loaded state when switching away
            });
          } else {
            // Preserve existing progress if we can't calculate new one
            instanceStatesRef.current.set(previousInstanceId, {
              ...prevState,
              loaded: false,
            });
          }
        }
        // Notify previous instance - it will see isPlaying: false since activeInstanceIdRef is now updated
        notifyStateChange(previousInstanceId);
      }

      // Ensure new instance state exists (preserving existing duration if set)
      const existingState = instanceStatesRef.current.get(instanceId);
      if (!existingState) {
        getOrCreateInstanceState(instanceId);
      }

      // Only update audio src if it's different or if we're switching to a different instance
      // This preserves currentTime when resuming the same instance after pausing
      const isResumingSameInstance =
        previousInstanceId === instanceId && audioRef.current.src === audioUrl;

      if (!isResumingSameInstance) {
        const instanceState = instanceStatesRef.current.get(instanceId);
        const shouldRestorePosition =
          instanceState?.progress !== undefined && instanceState.duration;

        audioRef.current.src = audioUrl;

        // Restore saved position if this instance was played before
        // Only restore if we're not in the middle of a seek operation
        // (seek operations will have already updated the progress)
        if (shouldRestorePosition) {
          const timeToRestore =
            (instanceState.progress! / 100) * instanceState.duration!;
          // Wait for metadata to load before setting currentTime
          audioRef.current.addEventListener(
            "loadedmetadata",
            () => {
              if (audioRef.current) {
                // Only restore if the currentTime hasn't been set by a seek operation
                // Check if currentTime is still 0 or very close to it
                if (audioRef.current.currentTime < 0.1) {
                  audioRef.current.currentTime = timeToRestore;
                }
              }
            },
            { once: true },
          );
        }
      }

      // Notify new instance of state change
      notifyStateChange(instanceId);
    },
    [notifyStateChange, getOrCreateInstanceState],
  );

  const clearActiveInstance = useCallback(
    (instanceId: string) => {
      if (activeInstanceIdRef.current === instanceId) {
        activeInstanceIdRef.current = null;
        activeAudioUrlRef.current = null;
        notifyStateChange(instanceId);
      }
    },
    [notifyStateChange],
  );

  const isActiveInstance = useCallback((instanceId: string) => {
    return activeInstanceIdRef.current === instanceId;
  }, []);

  const setInstanceProgress = useCallback(
    (instanceId: string, progress: number | undefined) => {
      const current = getOrCreateInstanceState(instanceId);
      instanceStatesRef.current.set(instanceId, { ...current, progress });
      notifyStateChange(instanceId);
    },
    [getOrCreateInstanceState, notifyStateChange],
  );

  const setInstanceLoaded = useCallback(
    (instanceId: string, loaded: boolean) => {
      const current = getOrCreateInstanceState(instanceId);
      instanceStatesRef.current.set(instanceId, { ...current, loaded });
      notifyStateChange(instanceId);
    },
    [getOrCreateInstanceState, notifyStateChange],
  );

  const setInstanceDuration = useCallback(
    (instanceId: string, duration: number | undefined) => {
      const current = getOrCreateInstanceState(instanceId);
      instanceStatesRef.current.set(instanceId, { ...current, duration });
      // Notify subscribers when duration is set so progress updates can proceed
      if (duration && duration > 0) {
        notifyStateChange(instanceId);
      }
    },
    [getOrCreateInstanceState, notifyStateChange],
  );

  const seek = useCallback(
    (instanceId: string, audioUrl: string, time: number) => {
      if (!audioRef.current) return;

      // Update progress in instance state BEFORE setting active instance
      // This prevents the restoration logic from overwriting the seek position
      const instanceState = instanceStatesRef.current.get(instanceId);
      if (instanceState?.duration) {
        const progress = (time / instanceState.duration) * 100;
        instanceStatesRef.current.set(instanceId, {
          ...instanceState,
          progress,
        });
      }

      // Set as active instance if not already
      if (activeInstanceIdRef.current !== instanceId) {
        setActiveInstance(instanceId, audioUrl);
      }

      // Wait for src to be set if needed
      if (audioRef.current.src !== audioUrl) {
        audioRef.current.src = audioUrl;
        audioRef.current.addEventListener(
          "loadedmetadata",
          () => {
            if (audioRef.current) {
              audioRef.current.currentTime = time;
            }
          },
          { once: true },
        );
      } else {
        audioRef.current.currentTime = time;
      }
    },
    [setActiveInstance],
  );

  const play = useCallback(async () => {
    if (audioRef.current) {
      await audioRef.current.play().catch(console.error);
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      // Notify subscribers immediately when pausing
      const currentInstanceId = activeInstanceIdRef.current;
      if (currentInstanceId) {
        notifyStateChange(currentInstanceId);
      }
    }
  }, [notifyStateChange]);

  const subscribeToStateChange = useCallback(
    (
      instanceId: string,
      callback: (state: {
        isPlaying: boolean;
        progress: number | undefined;
        loaded: boolean;
      }) => void,
    ) => {
      if (!stateChangeSubscribers.current.has(instanceId)) {
        stateChangeSubscribers.current.set(instanceId, new Set());
      }
      stateChangeSubscribers.current.get(instanceId)!.add(callback);

      // Immediately call with current state
      const state = instanceStatesRef.current.get(instanceId);
      callback({
        isPlaying: activeInstanceIdRef.current === instanceId,
        progress: state?.progress,
        loaded: state?.loaded ?? false,
      });

      return () => {
        stateChangeSubscribers.current.get(instanceId)?.delete(callback);
      };
    },
    [],
  );

  const subscribeToEnded = useCallback(
    (instanceId: string, callback: () => void) => {
      if (!endedSubscribers.current.has(instanceId)) {
        endedSubscribers.current.set(instanceId, new Set());
      }
      endedSubscribers.current.get(instanceId)!.add(callback);

      return () => {
        endedSubscribers.current.get(instanceId)?.delete(callback);
      };
    },
    [],
  );

  // Handle audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const currentInstanceId = activeInstanceIdRef.current;
      if (currentInstanceId) {
        // Update progress for active instance using stored duration
        let instanceState = instanceStatesRef.current.get(currentInstanceId);

        // Ensure state exists
        if (!instanceState) {
          instanceState = getOrCreateInstanceState(currentInstanceId);
        }

        const duration = instanceState.duration;

        if (duration && duration > 0 && audio.currentTime >= 0) {
          const progress = (audio.currentTime / duration) * 100;
          instanceStatesRef.current.set(currentInstanceId, {
            ...instanceState,
            progress,
          });
          notifyStateChange(currentInstanceId);
        }
      }
    };

    const handleEnded = () => {
      const currentInstanceId = activeInstanceIdRef.current;
      if (currentInstanceId) {
        // Reset progress for active instance
        const current = instanceStatesRef.current.get(currentInstanceId);
        if (current) {
          instanceStatesRef.current.set(currentInstanceId, {
            ...current,
            progress: undefined,
          });
        }

        // Notify subscribers
        endedSubscribers.current.get(currentInstanceId)?.forEach((callback) => {
          callback();
        });

        // Clear active instance
        activeInstanceIdRef.current = null;
        activeAudioUrlRef.current = null;
        notifyStateChange(currentInstanceId);
      }
    };

    const handleLoadedData = () => {
      const currentInstanceId = activeInstanceIdRef.current;
      if (currentInstanceId) {
        // Mark as loaded
        const current = getOrCreateInstanceState(currentInstanceId);
        instanceStatesRef.current.set(currentInstanceId, {
          ...current,
          loaded: true,
        });
        notifyStateChange(currentInstanceId);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadeddata", handleLoadedData);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [notifyStateChange, getOrCreateInstanceState]);

  // Clear all state when route changes (including search params changes)
  // This ensures audio stops when navigating, searching, or applying filters
  useEffect(() => {
    clearAllState();
  }, [location.pathname, location.search, clearAllState]);

  const value: SharedAudioContextValue = {
    audioRef,
    setActiveInstance,
    clearActiveInstance,
    isActiveInstance,
    setInstanceProgress,
    setInstanceLoaded,
    setInstanceDuration,
    seek,
    play,
    pause,
    subscribeToStateChange,
    subscribeToEnded,
  };

  return (
    <SharedAudioContext.Provider value={value}>
      {/* Hidden shared audio element */}
      <Box display="none" tagName="audio" ref={audioRef} preload="none" />
      {children}
    </SharedAudioContext.Provider>
  );
}

export function useSharedAudio() {
  const context = useContext(SharedAudioContext);
  if (!context) {
    throw new Error("useSharedAudio must be used within SharedAudioProvider");
  }
  return context;
}
