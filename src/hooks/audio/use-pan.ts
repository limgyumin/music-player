import { useSyncExternalStore } from "react";
import { Audio } from "../../libs/audio";

export const usePan = (audio: Audio) => {
  return useSyncExternalStore(
    audio.panner.subscribePan,
    () => audio.panner.pan,
    () => audio.panner.pan
  );
};
