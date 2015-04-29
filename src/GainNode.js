import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";
import AudioParam from "./AudioParam";

var GainNodeConstructor = function GainNode() {
  throw new TypeError("Illegal constructor: use audioContext.createGain()");
};
_.inherits(GainNodeConstructor, AudioNode);

function GainNode(context) {
  AudioNode.call(this, context, {
    name: "GainNode",
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
  });

  var gain = new AudioParam(this, "gain", 1.0, 0.0, 1.0);

  _.defineAttribute(this, "gain", "readonly", gain, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(GainNode, GainNodeConstructor);

GainNode.exports = GainNodeConstructor;
GainNode.jsonAttrs = [ "gain" ];

module.exports = WebAudioTestAPI.GainNode = GainNode;
