import { useSyncExternalStore } from "react";
import { Audio } from "../../libs/audio";

export const useIsPlaying = (audio: Audio) => {
  return useSyncExternalStore(
    audio.player.subscribeIsPlaying,
    () => audio.player.isPlaying,
    () => audio.player.isPlaying
  );
};
