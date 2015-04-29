import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";
import AudioParam from "./AudioParam";

export default class DelayNode extends AudioNode {
  constructor(admission, context, maxDelayTime) {
    super(admission, context, {
      name: "DelayNode",
      numberOfInputs  : 1,
      numberOfOutputs : 1,
      channelCount    : 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    let delayTime = _.immigration.apply(admission =>
      new AudioParam(admission, this, "delayTime", 0, 0, maxDelayTime)
    );

    _.defineAttribute(this, "delayTime", "readonly", delayTime, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });

    Object.defineProperties(this, {
      $maxDelayTime: { value: maxDelayTime },
    });
  }
}

DelayNode.jsonAttrs = [ "delayTime" ];

WebAudioTestAPI.DelayNode = DelayNode;
