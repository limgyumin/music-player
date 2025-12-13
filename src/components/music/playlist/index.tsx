import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useScroll } from "../../../hooks/dom/use-scroll";
import styles from "./index.module.css";
import { usePlaylist } from "../playlist-provider/hooks";
import { useMusic } from "../../../hooks/music/use-music";
import { FaPause, FaPlay } from "react-icons/fa6";
import { useController } from "../controller-provider/hooks";
import { useAudio } from "../../audio/audio-provider/hooks";
import { useIsPlaying } from "../../../hooks/audio";
import { Music } from "../../../models/music";

export const Playlist = () => {
  const audio = useAudio();
  const playlist = usePlaylist();
  const controller = useController();

  const { currentMusic, musics } = useMusic(playlist);

  const isPlaying = useIsPlaying(audio);

  const [focusedIndex, setFocusedIndex] = useState(0);

  const containerRef = useRef<HTMLUListElement | null>(null);

  useScroll({
    ref: containerRef,
    callback: ({ progressY }) => {
      setFocusedIndex(Math.round(progressY * (musics.length - 1)));
    },
  });

  const focusTo = useCallback(
    (index: number) => {
      const container = containerRef.current;

      if (container === null) {
        return;
      }

      const { scrollHeight, clientHeight } = container;

      const to = (scrollHeight - clientHeight) * (index / (musics.length - 1));

      container.scroll({ behavior: "smooth", top: to });
    },
    [musics.length]
  );

  const isCurrentPlaying = (music: Music): boolean => {
    return currentMusic.id === music.id && isPlaying;
  };

  const currentIndex = useMemo(
    () => musics.findIndex((music) => music.id === currentMusic.id),
    [currentMusic.id, musics]
  );

  useEffect(() => {
    focusTo(currentIndex);
  }, [currentIndex, focusTo]);

  return (
    <div className={styles.container}>
      <ul ref={containerRef} className={styles.musics}>
        {musics.map((music, index) => (
          <li
            key={music.id}
            className={styles.music}
            tabIndex={0}
            data-focused={index === focusedIndex}
            data-active={music.id === currentMusic.id}
          >
            <div className={styles["music__thumbnail-wrapper"]}>
              <img
                src={music.thumbnail}
                alt={music.title}
                className={styles.music__thumbnail}
              />

              <div className={styles["music__thumbnail-overlay"]}>
                <button
                  className={styles["music__thumbnail-playback-button"]}
                  onClick={() => controller.playback(music)}
                >
                  {isCurrentPlaying(music) ? (
                    <FaPause className={styles["music__thumbnail-icon"]} />
                  ) : (
                    <FaPlay className={styles["music__thumbnail-icon"]} />
                  )}
                </button>
              </div>
            </div>

            <div className={styles.music__summary}>
              <p className={styles.music__title}>{music.title}</p>
              <p className={styles.music__artist}>{music.artist}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
