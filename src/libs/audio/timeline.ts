export class Timeline {
  private readonly element: HTMLAudioElement;

  private _time = 0;
  private isSeeking = false;

  private readonly timeListeners: Set<() => void> = new Set();

  constructor(element: HTMLAudioElement) {
    this.element = element;
  }

  public get time(): number {
    return this._time;
  }

  public set time(time: number) {
    this._time = time;
    this.timeListeners.forEach((listener) => listener());
  }

  public get duration(): number {
    return this.element.duration || 0;
  }

  public reset = () => {
    this.element.currentTime = 0;
  };

  public startSeek = (): void => {
    this.isSeeking = true;
  };

  public seekTo = (time: number): void => {
    this.element.currentTime = time;
    this.isSeeking = false;
  };

  public seekForward = (offset = 10): void => {
    this.element.currentTime = Math.min(
      this.element.currentTime + offset,
      this.element.duration
    );
    this.isSeeking = false;
  };

  public seekBackward = (offset = 10): void => {
    this.element.currentTime = Math.max(this.element.currentTime - offset, 0);
    this.isSeeking = false;
  };

  public subscribeDuration = (callback: () => void): (() => void) => {
    this.element.addEventListener("durationchange", callback);

    return () => this.element.removeEventListener("durationchange", callback);
  };

  public subscribeTime = (callback: () => void): (() => void) => {
    const onUpdate = () => {
      if (this.isSeeking) {
        return;
      }

      this.time = this.element.currentTime;
    };

    this.timeListeners.add(callback);
    this.element.addEventListener("timeupdate", onUpdate);

    return () => {
      this.timeListeners.delete(callback);
      this.element.removeEventListener("timeupdate", onUpdate);
    };
  };
}
