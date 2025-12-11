import { Attachable } from "./attachable";

export class Analyser implements Attachable {
  private readonly node: AnalyserNode;

  constructor(context: AudioContext) {
    this.node = new AnalyserNode(context, { fftSize: 256 });
  }

  public analyze = (callback: (data: Uint8Array) => void): (() => void) => {
    const bufferLength = this.node.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let rafId: number;

    const retrieve = () => {
      this.node.getByteFrequencyData(dataArray);

      callback(dataArray);

      rafId = requestAnimationFrame(retrieve);
    };

    retrieve();

    return () => cancelAnimationFrame(rafId);
  };

  public attachTo = (node: AudioNode): AudioNode => {
    return node.connect(this.node);
  };
}
