import { useSyncExternalStore } from "react";
import { Playlist } from "../../libs/music";

export const useMusic = (playlist: Playlist) => {
  const currentMusic = useSyncExternalStore(
    playlist.subscribeCurrentMusic,
    () => playlist.currentMusic,
    () => playlist.currentMusic
  );

  return {
    currentMusic,
    musics: playlist.musics,
  };
};
