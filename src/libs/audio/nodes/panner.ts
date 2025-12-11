import { Attachable } from "./attachable";

export class Panner implements Attachable {
  private readonly node: StereoPannerNode;

  private readonly panListeners: Set<() => void> = new Set();

  constructor(context: AudioContext) {
    this.node = new StereoPannerNode(context);
  }

  public get pan(): number {
    return this.node.pan.value;
  }

  public set pan(pan: number) {
    this.node.pan.value = pan;
    this.panListeners.forEach((listener) => listener());
  }

  public subscribePan = (callback: () => void): (() => void) => {
    this.panListeners.add(callback);

    return () => this.panListeners.delete(callback);
  };

  public attachTo = (node: AudioNode): AudioNode => {
    return node.connect(this.node);
  };
}
