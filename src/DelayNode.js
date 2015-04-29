import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";
import AudioParam from "./AudioParam";

var DelayNodeConstructor = function DelayNode() {
  throw new TypeError("Illegal constructor: use audioContext.createDelay([maxDelayTime: number])");
};
_.inherits(DelayNodeConstructor, AudioNode);

function DelayNode(context, maxDelayTime) {
  AudioNode.call(this, context, {
    name: "DelayNode",
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
  });

  var delayTime = new AudioParam(this, "delayTime", 0, 0, maxDelayTime);

  _.defineAttribute(this, "delayTime", "readonly", delayTime, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $maxDelayTime: { value: maxDelayTime },
  });
}
_.inherits(DelayNode, DelayNodeConstructor);

DelayNode.exports = DelayNodeConstructor;
DelayNode.jsonAttrs = [ "delayTime" ];

module.exports = WebAudioTestAPI.DelayNode = DelayNode;
