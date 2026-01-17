import { Analyser } from "./nodes/analyser";
import { Source } from "./nodes/source";
import { Gain } from "./nodes/gain";
import { Panner } from "./nodes/panner";
import { Player } from "./player";
import { Timeline } from "./timeline";
import { Session } from "./session";

export class Audio {
  private readonly _context: AudioContext;
  private readonly element: HTMLAudioElement;

  private readonly _session: Session;
  private readonly _player: Player;
  private readonly _timeline: Timeline;

  private readonly _source: Source;
  private readonly _gain: Gain;
  private readonly _panner: Panner;
  private readonly _analyser: Analyser;

  constructor(element: HTMLAudioElement) {
    this._context = new AudioContext();
    this.element = element;

    this._session = new Session();
    this._player = new Player(this._context, this._session, element);
    this._timeline = new Timeline(element);

    this._source = new Source(this._context, element);
    this._gain = new Gain(this._context);
    this._panner = new Panner(this._context);
    this._analyser = new Analyser(this._context);
  }

  public get context(): AudioContext {
    return this._context;
  }

  public get session(): Session {
    return this._session;
  }

  public get player(): Player {
    return this._player;
  }

  public get timeline(): Timeline {
    return this._timeline;
  }

  public get source(): Source {
    return this._source;
  }

  public get gain(): Gain {
    return this._gain;
  }

  public get panner(): Panner {
    return this._panner;
  }

  public get analyser(): Analyser {
    return this._analyser;
  }

  public on = <K extends keyof HTMLMediaElementEventMap>(
    event: K,
    listener: (this: HTMLMediaElement, ev: HTMLMediaElementEventMap[K]) => void
  ): (() => void) => {
    this.element.addEventListener(event, listener);

    return () => this.element.removeEventListener(event, listener);
  };

  public connect = (): (() => void) => {
    return this._source.connect(this._gain, this._panner, this._analyser);
  };
}
