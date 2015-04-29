import _ from "./utils";
import Inspector from "./utils/Inspector";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";
import AudioParam from "./AudioParam";

const BiquadFilterType = "enum { lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass }";

export default class BiquadFilterNode extends AudioNode {
  constructor(admission, context) {
    super(admission, context, {
      name: "BiquadFilterNode",
      numberOfInputs  : 1,
      numberOfOutputs : 1,
      channelCount    : 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    let type = "lowpass";
    let frequency = _.immigration.apply(admission =>
      new AudioParam(admission, this, "frequency", 350, 10, context.sampleRate / 2)
    );
    let detune = _.immigration.apply(admission =>
      new AudioParam(admission, this, "detune", 0, -4800, 4800)
    );
    let Q = _.immigration.apply(admission =>
      new AudioParam(admission, this, "Q", 1, 0.0001, 1000)
    );
    let gain = _.immigration.apply(admission =>
      new AudioParam(admission, this, "gain", 0, -40, 40)
    );

    _.defineAttribute(this, "type", BiquadFilterType, type, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "frequency", "readonly", frequency, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "detune", "readonly", detune, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "Q", "readonly", Q, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "gain", "readonly", gain, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
  }

  getFrequencyResponse() {
    var inspector = new Inspector(this, "getFrequencyResponse", [
      { name: "frequencyHz"  , type: "Float32Array" },
      { name: "magResponse"  , type: "Float32Array" },
      { name: "phaseResponse", type: "Float32Array" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });
  }
}

BiquadFilterNode.jsonAttrs = [ "type", "frequency", "detune", "Q", "gain" ];

WebAudioTestAPI.BiquadFilterNode = BiquadFilterNode;
