import { Attachable } from "./attachable";

export class Gain implements Attachable {
  private readonly node: GainNode;

  private readonly volumeListeners: Set<() => void> = new Set();

  constructor(context: AudioContext) {
    this.node = new GainNode(context);
  }

  public get volume(): number {
    return this.node.gain.value;
  }

  public set volume(volume: number) {
    this.node.gain.value = volume;
    this.volumeListeners.forEach((listener) => listener());
  }

  public subscribeVolume = (callback: () => void): (() => void) => {
    this.volumeListeners.add(callback);

    return () => this.volumeListeners.delete(callback);
  };

  public attachTo = (node: AudioNode): AudioNode => {
    return node.connect(this.node);
  };
}
