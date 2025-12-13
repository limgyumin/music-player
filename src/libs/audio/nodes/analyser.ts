import { Attachable } from "./attachable";

export class Analyser implements Attachable {
  private readonly node: AnalyserNode;

  private frequency: Uint8Array;

  constructor(context: AudioContext) {
    this.node = new AnalyserNode(context, { fftSize: 2048 });

    this.frequency = new Uint8Array(this.node.frequencyBinCount);
  }

  public analyzeFrequency = (): Uint8Array => {
    this.node.getByteFrequencyData(this.frequency as any);

    return this.frequency;
  };

  public attachTo = (node: AudioNode): AudioNode => {
    return node.connect(this.node);
  };
}
