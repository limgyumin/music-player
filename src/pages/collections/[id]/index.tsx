import { useState } from "react";
import { AudioProvider } from "../../../components/audio/audio-provider";
import { PlaylistProvider } from "../../../components/music/playlist-provider";
import { Visualizer } from "../../../components/audio/visualizer";
import { Controller } from "../../../components/audio/controller";
import { Playlist } from "../../../components/music/playlist";
import { MediaSource } from "../../../components/audio/media-source";
import { ControllerProvider } from "../../../components/music/controller-provider";
import { DragContainer, DragTarget } from "../../../components/ui/drag";
import { useLoaderData } from "react-router";
import { Collection } from "../../../models/collection";
import { Background } from "../../../components/music/background";
import { useFullscreen } from "../../../hooks/dom/use-fullscreen";

export const CollectionPage = () => {
  const [ref, setRef] = useState<HTMLAudioElement | null>(null);

  const collection = useLoaderData<Collection>();

  useFullscreen();

  return (
    <PlaylistProvider musics={collection.musics}>
      <DragContainer>
        <Background>
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
        </Background>
      </DragContainer>
    </PlaylistProvider>
  );
};
