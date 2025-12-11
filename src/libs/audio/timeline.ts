export class Timeline {
  private readonly element: HTMLAudioElement;

  private _time = 0;
  private isJumping = false;

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

  public startJump = (): void => {
    this.isJumping = true;
  };

  public jumpTo = (time: number): void => {
    this.element.currentTime = time;
    this.isJumping = false;
  };

  public subscribeDuration = (callback: () => void): (() => void) => {
    this.element.addEventListener("durationchange", callback);

    return () => this.element.removeEventListener("durationchange", callback);
  };

  public subscribeTime = (callback: () => void): (() => void) => {
    const onUpdate = () => {
      if (this.isJumping) {
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
