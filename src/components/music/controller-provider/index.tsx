import { PropsWithChildren, useMemo } from "react";
import { ControllerContext } from "./contexts";
import { Controller } from "../../../libs/music";
import { useAudio } from "../../audio/audio-provider/hooks";
import { usePlaylist } from "../playlist-provider/hooks";

export const ControllerProvider = ({ children }: PropsWithChildren) => {
  const audio = useAudio();
  const playlist = usePlaylist();

  const controller = useMemo(
    () => new Controller(audio, playlist),
    [audio, playlist]
  );

  return (
    <ControllerContext.Provider value={controller}>
      {children}
    </ControllerContext.Provider>
  );
};
