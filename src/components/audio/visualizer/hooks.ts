import { useEffect, useState } from "react";
import { Audio } from "../../../libs/audio";
import { amplifyAsymmetric, average } from "./helpers";

export const useVisualizer = (audio: Audio) => {
  const [low, setLow] = useState(1);
  const [mid, setMid] = useState(1);

  useEffect(() => {
    let rafId: number;

    const tick = () => {
      const frequency = audio.analyser.analyzeFrequency();

      const low = amplifyAsymmetric(
        average(frequency.slice(0, 64)),
        120,
        1.4,
        1.1
      );

      const mid = amplifyAsymmetric(
        average(frequency.slice(64, 128)),
        90,
        1.4,
        1.1
      );

      setLow(1 + low / 1000);
      setMid(1 + mid / 1000);

      rafId = requestAnimationFrame(tick);
    };

    tick();

    return () => cancelAnimationFrame(rafId);
  }, [audio]);

  return { low, mid };
};
