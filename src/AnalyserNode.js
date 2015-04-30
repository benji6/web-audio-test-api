import _ from "./utils";
import Inspector from "./utils/Inspector";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";

const FFTSize = "enum { 32, 64, 128, 256, 512, 1024, 2048 }";

export default class AnalyserNode extends AudioNode {
  constructor(admission, context) {
    super(admission, context, {
      name: "AnalyserNode",
      numberOfInputs  : 1,
      numberOfOutputs : 1,
      channelCount    : 1,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
    });

    let fftSize = 2048;
    let frequencyBinCount = () => this.fftSize >> 1;
    let minDecibels = -100;
    let maxDecibels = 30;
    let smoothingTimeConstant = 0.8;

    _.defineAttribute(this, "fftSize", FFTSize, fftSize, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "frequencyBinCount", "readonly", frequencyBinCount, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "minDecibels", "number", minDecibels, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "maxDecibels", "number", maxDecibels, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "smoothingTimeConstant", "number", smoothingTimeConstant, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
  }

  getFloatFrequencyData(array) {
    let inspector = new Inspector(this, "getFloatFrequencyData");

    inspector.assert(array instanceof Float32Array, () => {
      throw new TypeError(_.plain `
        ${inspector.form};
        array should be a Float32Array,
        but got ${array}
      `);
    });
  }

  getByteFrequencyData(array) {
    let inspector = new Inspector(this, "getByteFrequencyData");

    inspector.assert(array instanceof Uint8Array, () => {
      throw new TypeError(_.plain `
        ${inspector.form};
        array should be an Uint8Array,
        but got ${array}
      `);
    });
  }

  getByteTimeDomainData(array) {
    let inspector = new Inspector(this, "getByteTimeDomainData");

    inspector.assert(array instanceof Uint8Array, () => {
      throw new TypeError(_.plain `
        ${inspector.form};
        array should be an Uint8Array,
        but got ${array}
      `);
    });
  }
}

AnalyserNode.jsonAttrs = [ "fftSize", "minDecibels", "maxDecibels", "smoothingTimeConstant" ];

WebAudioTestAPI.AnalyserNode = AnalyserNode;
