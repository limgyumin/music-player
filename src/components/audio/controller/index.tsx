import { useScroll } from "../../../hooks/dom/use-scroll";
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
      audio.gain.volume = remap(progressY, 0.5, 1.5);
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.summary}>
          <p className={styles.summary__title}>{currentMusic.title}</p>
          <p className={styles.summary__artist}>{currentMusic.artist}</p>
        </div>

        <Timeline />
        <Player />
      </div>
    </div>
  );
};
