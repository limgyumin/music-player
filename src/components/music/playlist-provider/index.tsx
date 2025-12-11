import { PropsWithChildren, useMemo } from "react";
import { PlaylistContext } from "./contexts";
import { Playlist } from "../../../libs/music";
import { Music } from "../../../models/music";

type Props = PropsWithChildren<{
  musics: Music[];
}>;

export const PlaylistProvider = ({ children, musics }: Props) => {
  const playlist = useMemo(() => new Playlist(musics), [musics]);

  return (
    <PlaylistContext.Provider value={playlist}>
      {children}
    </PlaylistContext.Provider>
  );
};
