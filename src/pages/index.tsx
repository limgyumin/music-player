import { useState } from "react";
import { AudioProvider } from "../components/audio/audio-provider";
import { PlaylistProvider } from "../components/music/playlist-provider";
import { Visualizer } from "../components/audio/visualizer";
import { Controller } from "../components/audio/controller";
import { musics } from "../assets/data/musics";
import { Playlist } from "../components/music/playlist";
import styles from "./index.module.css";
import { MediaSource } from "../components/audio/media-source";
import { ControllerProvider } from "../components/music/controller-provider";

export const IndexPage = () => {
  const [ref, setRef] = useState<HTMLAudioElement | null>(null);

  return (
    <PlaylistProvider musics={musics}>
      <div className={styles.container}>
        <MediaSource ref={setRef} />

        {ref != null ? (
          <AudioProvider element={ref}>
            <ControllerProvider>
              <Visualizer />
              <Controller />
              <Playlist />
            </ControllerProvider>
          </AudioProvider>
        ) : null}
      </div>
    </PlaylistProvider>
  );
};
