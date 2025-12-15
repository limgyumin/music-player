import { forwardRef } from "react";
import { useMusic } from "../../../hooks/music/use-music";
import { usePlaylist } from "../../music/playlist-provider/hooks";

export const MediaSource = forwardRef<HTMLAudioElement>((_, ref) => {
  const playlist = usePlaylist();

  const { currentMusic } = useMusic(playlist);

  return (
    <audio
      ref={ref}
      src={`${process.env.PUBLIC_URL}${currentMusic.source}`}
      preload="auto"
    />
  );
});
