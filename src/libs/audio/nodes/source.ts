import { Attachable } from "./attachable";

class SourceNode extends MediaElementAudioSourceNode {
  private static instance: SourceNode;

  public static getInstance(
    context: AudioContext,
    options: MediaElementAudioSourceOptions
  ): SourceNode {
    if (!SourceNode.instance) {
      SourceNode.instance = new SourceNode(context, options);
    }

    return SourceNode.instance;
  }
}

export class Source {
  private readonly context: AudioContext;
  private readonly element: HTMLAudioElement;

  private readonly node: SourceNode;

  constructor(context: AudioContext, element: HTMLAudioElement) {
    this.element = element;
    this.context = context;

    this.node = SourceNode.getInstance(context, {
      mediaElement: element,
    });
  }

  public load = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const onLoad = () => {
        this.element.removeEventListener("loadeddata", onLoad);
        resolve();
      };

      const onError = () => {
        this.element.removeEventListener("error", onError);
        this.element.removeEventListener("loadeddata", onLoad);

        reject(new Error("Failed to load audio"));
      };

      this.element.addEventListener("loadeddata", onLoad);
      this.element.addEventListener("error", onError);
      this.element.load();
    });
  };

  public connect = (...nodes: Attachable[]): (() => void) => {
    nodes
      .reduce<AudioNode>((acc, node) => node.attachTo(acc), this.node)
      .connect(this.context.destination);

    return () => this.node.disconnect();
  };
}
