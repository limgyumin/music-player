import { useSyncExternalStore } from "react";
import { Audio } from "../../libs/audio";

export const useTimeline = (audio: Audio) => {
  const time = useSyncExternalStore(
    audio.timeline.subscribeTime,
    () => audio.timeline.time,
    () => audio.timeline.time
  );

  const duration = useSyncExternalStore(
    audio.timeline.subscribeDuration,
    () => audio.timeline.duration,
    () => audio.timeline.duration
  );

  return {
    time,
    duration,
  };
};
