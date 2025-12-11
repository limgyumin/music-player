import { PropsWithChildren, useEffect, useMemo } from "react";
import { AudioContext } from "./contexts";
import { Audio } from "../../../libs/audio";

type Props = PropsWithChildren<{
  element: HTMLAudioElement;
}>;

export const AudioProvider = ({ children, element }: Props) => {
  const audio = useMemo(() => new Audio(element), [element]);

  useEffect(() => {
    return audio.connect();
  }, [audio]);

  return (
    <AudioContext.Provider value={audio}>{children}</AudioContext.Provider>
  );
};
