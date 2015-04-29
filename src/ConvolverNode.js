import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";

export default class ConvolverNode extends AudioNode {
  constructor(admission, context) {
    super(admission, context, {
      name: "ConvolverNode",
      numberOfInputs  : 1,
      numberOfOutputs : 1,
      channelCount    : 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers",
    });

    let buffer = null;
    let normalize = true;

    _.defineAttribute(this, "buffer", "AudioBuffer|null", buffer, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "normalize", "boolean", normalize, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
  }
}

ConvolverNode.jsonAttrs = [ "normalize" ];

WebAudioTestAPI.ConvolverNode = ConvolverNode;
