import { useSyncExternalStore } from "react";
import { Audio } from "../../libs/audio";

export const useVolume = (audio: Audio) => {
  return useSyncExternalStore(
    audio.gain.subscribeVolume,
    () => audio.gain.volume,
    () => audio.gain.volume
  );
};
