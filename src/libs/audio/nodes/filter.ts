import { Attachable } from "./attachable";

const MIN_FREQUENCY = 20;
const MAX_FREQUENCY = 20000;

const LOWPASS_MIN_FREQUENCY = 250;
const HIGHPASS_MAX_FREQUENCY = 2500;

const MAX_RESONANCE = 6;

const SMOOTHING = 0.03;

// 변화량을 고르게 하기 위해 곱하기 방식으로 증감시킨다.
const remapExponential = (value: number, from: number, to: number): number => {
  return from * Math.pow(to / from, value);
};

export class Filter implements Attachable {
  private readonly context: AudioContext;

  private readonly highpass: BiquadFilterNode;
  private readonly lowpass: BiquadFilterNode;

  private readonly maxFrequency: number;

  constructor(context: AudioContext) {
    this.context = context;
    this.maxFrequency = Math.min(MAX_FREQUENCY, context.sampleRate / 2);

    this.highpass = new BiquadFilterNode(context, {
      type: "highpass",
      frequency: MIN_FREQUENCY,
      Q: 0,
    });

    this.lowpass = new BiquadFilterNode(context, {
      type: "lowpass",
      frequency: this.maxFrequency,
      Q: 0,
    });
  }

  public set sweep(value: number) {
    const highpass = Math.max(value, 0);
    const lowpass = Math.max(-value, 0);

    const now = this.context.currentTime;

    this.highpass.frequency.setTargetAtTime(
      remapExponential(highpass, MIN_FREQUENCY, HIGHPASS_MAX_FREQUENCY),
      now,
      SMOOTHING,
    );
    this.highpass.Q.setTargetAtTime(highpass * MAX_RESONANCE, now, SMOOTHING);

    this.lowpass.frequency.setTargetAtTime(
      remapExponential(lowpass, this.maxFrequency, LOWPASS_MIN_FREQUENCY),
      now,
      SMOOTHING,
    );
    this.lowpass.Q.setTargetAtTime(lowpass * MAX_RESONANCE, now, SMOOTHING);
  }

  public attachTo = (node: AudioNode): AudioNode => {
    return node.connect(this.highpass).connect(this.lowpass);
  };
}
