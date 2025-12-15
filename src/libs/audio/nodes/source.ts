import { Attachable } from "./attachable";

const CACHE = new WeakMap<any, any>();

const cache = <K, V>(key: K, getter: () => V): V => {
  const cached = CACHE.get(key);

  if (cached != null) {
    return cached;
  }

  const value = getter();

  CACHE.set(key, value);

  return value;
};

export class Source {
  private readonly context: AudioContext;
  private readonly element: HTMLAudioElement;

  private readonly node: MediaElementAudioSourceNode;

  constructor(context: AudioContext, element: HTMLAudioElement) {
    this.element = element;
    this.context = context;

    this.node = cache(element, () => context.createMediaElementSource(element));
  }

  public load = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const onLoad = () => {
        this.element.removeEventListener("loadeddata", onLoad);
        resolve();
      };

      const onError = (e: ErrorEvent) => {
        this.element.removeEventListener("error", onError);
        this.element.removeEventListener("loadeddata", onLoad);

        reject(e.error);
      };

      this.element.addEventListener("loadeddata", onLoad);
      this.element.addEventListener("error", onError);
      this.element.load();
    });
  };

  public connect = (...nodes: Attachable[]): (() => void) => {
    nodes
      .reduce<AudioNode>((prev, node) => node.attachTo(prev), this.node)
      .connect(this.context.destination);

    return () => this.node.disconnect();
  };
}
