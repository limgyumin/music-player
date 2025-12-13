import { useEffect, useState } from "react";
import { Audio } from "../../../libs/audio";
import { amplifyAsymmetric, average } from "./helpers";

export const useVisualizer = (audio: Audio) => {
  const [low, setLow] = useState(1);
  const [mid, setMid] = useState(1);

  useEffect(() => {
    let rafId: number;

    const determineMovingFrequency = (
      frequency: Uint8Array
    ): [number, number] => {
      const lowAverage = average(frequency.slice(0, 64));
      const midAverage = average(frequency.slice(64, 128));

      return [
        amplifyAsymmetric(lowAverage, 110, 1.6, 1.1),
        amplifyAsymmetric(midAverage, 80, 1.5, 1.1),
      ];
    };

    const tick = () => {
      const frequency = audio.analyser.analyzeFrequency();

      const [low, mid] = determineMovingFrequency(frequency);

      setLow(1 + low / 1000);
      setMid(1 + mid / 1000);

      rafId = requestAnimationFrame(tick);
    };

    tick();

    return () => cancelAnimationFrame(rafId);
  }, [audio]);

  return { low, mid };
};
