import { useContext } from "react";
import { AudioContext } from "./contexts";

export const useAudio = () => {
  const audio = useContext(AudioContext);

  if (audio == null) {
    throw new Error("useAudio must be used within an AudioProvider");
  }

  return audio;
};
