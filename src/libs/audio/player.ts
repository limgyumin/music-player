import { Session } from "./session";

export class Player {
  private readonly context: AudioContext;
  private readonly session: Session;
  private readonly element: HTMLAudioElement;

  private _isPlaying = false;

  constructor(
    context: AudioContext,
    session: Session,
    element: HTMLAudioElement
  ) {
    this.context = context;
    this.session = session;
    this.element = element;
  }

  public get isPlaying(): boolean {
    return this._isPlaying;
  }

  public play = (): Promise<void> => {
    if (this.context.state === "suspended") {
      this.context.resume();
    }

    return this.element.play();
  };

  public pause = (): void => {
    this.element.pause();
  };

  public subscribeIsPlaying = (callback: () => void): (() => void) => {
    const setIsPlaying = (value: boolean) => {
      this._isPlaying = value;
      callback();
    };

    const onPlay = () => {
      setIsPlaying(true);
      this.session.playbackState = "playing";
    };

    const onPause = () => {
      setIsPlaying(false);
      this.session.playbackState = "paused";
    };

    this.element.addEventListener("play", onPlay);
    this.element.addEventListener("pause", onPause);
    this.element.addEventListener("ended", onPause);

    return () => {
      this.element.removeEventListener("play", onPlay);
      this.element.removeEventListener("pause", onPause);
      this.element.removeEventListener("ended", onPause);
    };
  };
}
