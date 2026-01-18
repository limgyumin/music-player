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

  public subscribeIsRepeat = (callback: () => void): (() => void) => {
    this.isRepeatListeners.add(callback);

    return () => this.isRepeatListeners.delete(callback);
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

  public register = (): (() => void) => {
    return this.audio.session.setActionHandlers({
      play: () => this.playback(),
      pause: () => this.playback(),
      nexttrack: () => this.next(),
      previoustrack: () => this.previous(),
      seekbackward: (e) => this.audio.timeline.seekBackward(e.seekOffset),
      seekforward: (e) => this.audio.timeline.seekForward(e.seekOffset),
    });
  };

  private play = async (music: Music): Promise<void> => {
    if (
      this.audio.session.metadata == null ||
      this.playlist.currentMusic.id !== music.id
    ) {
      this.audio.session.metadata = new MediaMetadata({
        title: music.title,
        artist: music.artists.join(", "),
        album: music.collection,
        artwork: [{ src: music.thumbnail }],
      });
    }

    if (
      this.playlist.currentMusic.id === music.id &&
      !this.audio.player.isPlaying
    ) {
      return this.audio.player.play();
    }

    this.playlist.currentMusic = music;

    try {
      await this.audio.source.load();
      await this.audio.player.play();
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
