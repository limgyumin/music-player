export class Player {
  private readonly context: AudioContext;
  private readonly element: HTMLAudioElement;

  private _isPlaying = false;

  constructor(context: AudioContext, element: HTMLAudioElement) {
    this.context = context;
    this.element = element;
  }

  public get isPlaying(): boolean {
    return this._isPlaying;
  }

  public play = (): void => {
    if (this.context.state === "suspended") {
      this.context.resume();
    }

    this.element.play();
  };

  public pause = (): void => {
    this.element.pause();
  };

  public subscribeIsPlaying = (callback: () => void): (() => void) => {
    const setIsPlaying = (value: boolean) => {
      this._isPlaying = value;
      callback();
    };

    const onEnded = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    this.element.addEventListener("play", onPlay);
    this.element.addEventListener("pause", onPause);
    this.element.addEventListener("ended", onEnded);

    return () => {
      this.element.removeEventListener("ended", onEnded);
      this.element.removeEventListener("play", onPlay);
      this.element.removeEventListener("pause", onPause);
    };
  };
}
