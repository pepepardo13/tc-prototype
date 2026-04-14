import { useState, useEffect, useId } from "react";

import { useSharedAudio } from "../contexts/SharedAudioContext.tsx";

type UsePlayAudioProps = {
  audioUrl?: string;
  duration?: number;
};

type UsePlayAudioReturn = {
  isPlaying: boolean;
  audioLoaded: boolean;
  audioProgress: number | undefined;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  handlePlayPause: (e: React.MouseEvent) => void;
  handleSeek: (progress: number) => void;
};

export function usePlayAudio({
  audioUrl,
  duration,
}: UsePlayAudioProps): UsePlayAudioReturn {
  // Generate a unique instance ID for this audio instance
  const instanceId = useId();

  const {
    audioRef,
    setActiveInstance,
    clearActiveInstance,
    isActiveInstance,
    setInstanceProgress,
    setInstanceDuration,
    seek,
    play,
    pause,
    subscribeToStateChange,
    subscribeToEnded,
  } = useSharedAudio();

  // Local state updated imperatively via callbacks
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioProgress, setAudioProgress] = useState<number | undefined>(
    undefined,
  );

  const handlePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!audioUrl) return;

    if (isPlaying) {
      pause();
      // Notify subscribers that we've paused (but keep instance active for resume)
      // The pause() call will trigger a pause event that updates the state
    } else {
      // Ensure duration is set before activating instance
      if (duration !== undefined) {
        setInstanceDuration(instanceId, duration);
      }
      // Set this as the active instance and play
      setActiveInstance(instanceId, audioUrl);
      play();
    }
  };

  const handleSeek = (progress: number) => {
    if (!audioUrl || !duration) return;

    // Ensure duration is set before seeking
    setInstanceDuration(instanceId, duration);
    // Update progress state BEFORE seeking so restoration uses the new position
    setInstanceProgress(instanceId, progress);
    const newTime = (progress / 100) * duration;
    seek(instanceId, audioUrl, newTime);

    // Start playing if not already playing
    if (!isPlaying) {
      play();
    }
  };

  // Subscribe to state changes - imperative callback updates local state
  useEffect(() => {
    const unsubscribe = subscribeToStateChange(instanceId, (state) => {
      setIsPlaying(state.isPlaying);
      setAudioLoaded(state.loaded);
      setAudioProgress(state.progress);
    });

    return unsubscribe;
  }, [instanceId, subscribeToStateChange]);

  // Set duration when it's provided
  useEffect(() => {
    if (duration !== undefined) {
      setInstanceDuration(instanceId, duration);
    }
  }, [instanceId, duration, setInstanceDuration]);

  // Subscribe to ended event for this instance
  useEffect(() => {
    if (!audioUrl) return;

    const unsubscribeEnded = subscribeToEnded(instanceId, () => {
      setInstanceProgress(instanceId, undefined);
      clearActiveInstance(instanceId);
    });

    return unsubscribeEnded;
  }, [
    audioUrl,
    instanceId,
    subscribeToEnded,
    setInstanceProgress,
    clearActiveInstance,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isActiveInstance(instanceId)) {
        clearActiveInstance(instanceId);
      }
    };
  }, [instanceId, isActiveInstance, clearActiveInstance]);

  return {
    isPlaying,
    audioLoaded,
    audioProgress,
    audioRef,
    handlePlayPause,
    handleSeek,
  };
}
