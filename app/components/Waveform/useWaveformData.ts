/* eslint-disable react-hooks/set-state-in-effect -- Async waveform data fetching */
import { useState, useEffect } from "react";

type WaveformResponse = {
  version: number;
  channels: number;
  sample_rate: number;
  samples_per_pixel: number;
  bits: number;
  length: number;
  data: number[];
};

type WaveformStatus = "not-loaded" | "loading" | "ready";

export function useWaveformData(waveformUrl?: string) {
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [status, setStatus] = useState<WaveformStatus>("not-loaded");

  useEffect(() => {
    if (waveformUrl) {
      setStatus("loading");
      fetch(waveformUrl)
        .then((response) => response.json())
        .then((response: unknown) => {
          // Check if response has the expected waveform structure
          if (response && typeof response === "object" && "data" in response) {
            const waveformResponse = response as WaveformResponse;
            if (
              Array.isArray(waveformResponse.data) &&
              waveformResponse.data.every((item) => typeof item === "number")
            ) {
              setWaveformData(waveformResponse.data);
              setStatus("ready");
            } else {
              console.error(
                "Invalid waveform data format:",
                waveformResponse.data,
              );
              setStatus("not-loaded");
            }
          } else {
            console.error("Invalid waveform response format:", response);
            setStatus("not-loaded");
          }
        })
        .catch((error) => {
          console.error("Failed to load waveform data:", error);
          setStatus("not-loaded");
        });
    } else {
      setStatus("not-loaded");
    }
  }, [waveformUrl]);

  return { waveformData, status };
}
