import { useEffect, useState } from "react";
import { Audio } from "../../../libs/audio";
import { amplifyAsymmetric, average } from "./helpers";

export const useVisualizer = (audio: Audio) => {
  const [low, setLow] = useState(1);
  const [high, setHigh] = useState(1);

  useEffect(() => {
    return audio.analyser.analyze((data) => {
      const avgLowFrequency = average(data.slice(0, 64));
      const avgHighFrequency = average(data.slice(64, 128));

      setLow(1 + amplifyAsymmetric(avgLowFrequency, 110, 1.75, 1.1) / 1000);
      setHigh(1 + amplifyAsymmetric(avgHighFrequency, 20, 1.75, 1.1) / 1000);
    });
  }, [audio]);

  return { low, high };
};
