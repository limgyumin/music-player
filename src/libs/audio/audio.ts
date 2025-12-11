import { Analyser } from "./nodes/analyser";
import { Source } from "./nodes/source";
import { Gain } from "./nodes/gain";
import { Panner } from "./nodes/panner";
import { Player } from "./player";
import { Timeline } from "./timeline";

export class Audio {
  private readonly context: AudioContext;
  private readonly _element: HTMLAudioElement;

  private readonly _player: Player;
  private readonly _timeline: Timeline;

  private readonly _source: Source;
  private readonly _gain: Gain;
  private readonly _panner: Panner;
  private readonly _analyser: Analyser;

  constructor(element: HTMLAudioElement) {
    this.context = new AudioContext();
    this._element = element;

    this._player = new Player(this.context, element);
    this._timeline = new Timeline(element);

    this._source = new Source(this.context, element);
    this._gain = new Gain(this.context);
    this._panner = new Panner(this.context);
    this._analyser = new Analyser(this.context);
  }

  public get element(): HTMLAudioElement {
    return this._element;
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

  public connect = (): (() => void) => {
    return this._source.connect(this._gain, this._panner, this._analyser);
  };
}
