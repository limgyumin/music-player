import { useState } from "react";
import { AudioProvider } from "../../../components/audio/audio-provider";
import { PlaylistProvider } from "../../../components/music/playlist-provider";
import { Visualizer } from "../../../components/audio/visualizer";
import { Controller } from "../../../components/audio/controller";
import { Playlist } from "../../../components/music/playlist";
import styles from "./index.module.css";
import { MediaSource } from "../../../components/audio/media-source";
import { ControllerProvider } from "../../../components/music/controller-provider";
import { DragContainer, DragTarget } from "../../../components/ui/drag";
import { useLoaderData } from "react-router";
import { Collection } from "../../../models/collection";

export const CollectionPage = () => {
  const [ref, setRef] = useState<HTMLAudioElement | null>(null);

  const collection = useLoaderData<Collection>();

  return (
    <PlaylistProvider musics={collection.musics}>
      <DragContainer>
        <div className={styles.container}>
          <MediaSource ref={setRef} />

          {ref != null ? (
            <AudioProvider element={ref}>
              <ControllerProvider>
                <DragTarget>
                  <Visualizer />
                </DragTarget>

                <Controller />
                <Playlist />
              </ControllerProvider>
            </AudioProvider>
          ) : null}
        </div>
      </DragContainer>
    </PlaylistProvider>
  );
};
