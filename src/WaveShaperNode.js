import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";

let OverSampleType = "enum { none, 2x, 4x }";

export default class WaveShaperNode extends AudioNode {
  constructor(admission, context) {
    super(admission, context, {
      name: "WaveShaperNode",
      numberOfInputs  : 1,
      numberOfOutputs : 1,
      channelCount    : 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    var curve = null;
    var oversample = "none";

    _.defineAttribute(this, "curve", "Float32Array|null", curve, function(msg) {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "oversample", OverSampleType, oversample, function(msg) {
      throw new TypeError(_.formatter.concat(this, msg));
    });
  }
}

WaveShaperNode.jsonAttrs = [ "oversample" ];

WebAudioTestAPI.WaveShaperNode = WaveShaperNode;
