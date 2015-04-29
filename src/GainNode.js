import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";
import AudioParam from "./AudioParam";

export default class GainNode extends AudioNode {
  constructor(admission, context) {
    super(admission, context, {
      name: "GainNode",
      numberOfInputs  : 1,
      numberOfOutputs : 1,
      channelCount    : 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    let gain = _.immigration.apply(admission =>
      new AudioParam(admission, this, "gain", 1.0, 0.0, 1.0)
    );

    _.defineAttribute(this, "gain", "readonly", gain, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
  }
}

GainNode.jsonAttrs = [ "gain" ];

WebAudioTestAPI.GainNode = GainNode;
