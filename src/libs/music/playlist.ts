import { Music } from "../../models/music";

export class Playlist {
  private _currentMusic: Music;
  private readonly _musics: readonly Music[];

  private readonly currentMusicListeners: Set<() => void> = new Set();

  constructor(musics: readonly Music[]) {
    this._currentMusic = musics[0];
    this._musics = musics;
  }

  public get musics(): readonly Music[] {
    return this._musics;
  }

  public get currentMusic(): Music {
    return this._currentMusic;
  }

  public set currentMusic(music: Music) {
    this._currentMusic = music;
    this.currentMusicListeners.forEach((listener) => listener());
  }

  public get previousMusic(): Music {
    const index = this._musics.findIndex(
      (music) => music.id === this._currentMusic.id
    );

    if (this._musics.length === 0) {
      return this._currentMusic;
    }

    if (index === -1 || index - 1 < 0) {
      return this._musics[this._musics.length - 1];
    }

    return this._musics[index - 1];
  }

  public get nextMusic(): Music {
    const index = this._musics.findIndex(
      (music) => music.id === this._currentMusic.id
    );

    if (this._musics.length === 0) {
      return this._currentMusic;
    }

    if (index === -1 || index + 1 > this._musics.length - 1) {
      return this._musics[0];
    }

    return this._musics[index + 1];
  }

  public subscribeCurrentMusic = (callback: () => void): (() => void) => {
    this.currentMusicListeners.add(callback);

    return () => this.currentMusicListeners.delete(callback);
  };
}
