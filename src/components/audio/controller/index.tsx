import { useScroll } from "../../../hooks/document/use-scroll";
import { useMusic } from "../../../hooks/music/use-music";
import { remap } from "../../../utils/remap";
import { usePlaylist } from "../../music/playlist-provider/hooks";
import { useAudio } from "../audio-provider/hooks";
import styles from "./index.module.css";

import { Player } from "./player";
import { Timeline } from "./timeline";

export const Controller = () => {
  const audio = useAudio();
  const playlist = usePlaylist();

  const { currentMusic } = useMusic(playlist);

  useScroll({
    callback: ({ progressY }) => {
      const volume = Math.floor(remap(progressY, 0.15, 1) * 1000) / 1000;

      audio.gain.volume = volume;
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <p className={styles.summary__title}>{currentMusic.title}</p>
        <p className={styles.summary__artist}>{currentMusic.artist}</p>
      </div>

      <Timeline />
      <Player />
    </div>
  );
};
