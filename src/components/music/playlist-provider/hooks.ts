import { useContext } from "react";
import { PlaylistContext } from "./contexts";

export const usePlaylist = () => {
  const playlist = useContext(PlaylistContext);

  if (playlist == null) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }

  return playlist;
};
