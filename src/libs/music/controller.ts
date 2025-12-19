import { Music } from "../../models/music";
import { Audio } from "../audio";
import { Playlist } from "./playlist";

export class Controller {
  private audio: Audio;
  private playlist: Playlist;

  private _isRepeat = false;

  private readonly isRepeatListeners: Set<() => void> = new Set();

  constructor(audio: Audio, playlist: Playlist) {
    this.audio = audio;
    this.playlist = playlist;
  }

  public get isRepeat(): boolean {
    return this._isRepeat;
  }

  public repeat = (): void => {
    this._isRepeat = !this._isRepeat;
    this.isRepeatListeners.forEach((listener) => listener());
  };

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

  public resume = (): (() => void) => {
    const onEnded = () => {
      if (this._isRepeat) {
        this.audio.timeline.reset();
        this.audio.player.play();
      } else {
        this.next();
      }
    };

    return this.audio.on("ended", onEnded);
  };

  public subscribeIsRepeat = (callback: () => void): (() => void) => {
    this.isRepeatListeners.add(callback);

    return () => this.isRepeatListeners.delete(callback);
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
