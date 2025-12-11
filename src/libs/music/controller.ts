import { Music } from "../../models/music";
import { Audio } from "../audio";
import { Playlist } from "./playlist";

export class Controller {
  private audio: Audio;
  private playlist: Playlist;

  constructor(audio: Audio, playlist: Playlist) {
    this.audio = audio;
    this.playlist = playlist;
  }

  public previous = (): void => {
    this.play(this.playlist.previousMusic);
  };

  public next = (): void => {
    this.play(this.playlist.nextMusic);
  };

  public playback = (music?: Music): void => {
    const incoming = music ?? this.playlist.currentMusic;

    if (
      this.playlist.currentMusic.id === incoming.id &&
      this.audio.player.isPlaying
    ) {
      this.pause(incoming);
    } else {
      this.play(incoming);
    }
  };

  public playAutomatically = (): (() => void) => {
    const onEnded = () => {
      this.next();
    };

    this.audio.element.addEventListener("ended", onEnded);

    return () => this.audio.element.removeEventListener("ended", onEnded);
  };

  private play = async (music: Music): Promise<void> => {
    if (
      this.playlist.currentMusic.id === music.id &&
      !this.audio.player.isPlaying
    ) {
      this.audio.player.play();
      return;
    }

    this.playlist.currentMusic = music;

    try {
      await this.audio.source.load();

      this.audio.player.play();
    } catch (error) {
      // TODO: error handling
      console.error(error);
    }
  };

  private pause = (music: Music): void => {
    if (
      this.playlist.currentMusic.id !== music.id ||
      !this.audio.player.isPlaying
    ) {
      return;
    }

    this.audio.player.pause();
  };
}
