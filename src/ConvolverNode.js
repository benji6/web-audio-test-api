import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";

var ConvolverNodeConstructor = function ConvolverNode() {
  throw new TypeError("Illegal constructor: use audioContext.createConvolver()");
};
_.inherits(ConvolverNodeConstructor, AudioNode);

function ConvolverNode(context) {
  AudioNode.call(this, context, {
    name: "ConvolverNode",
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers",
  });

  var buffer = null;
  var normalize = true;

  _.defineAttribute(this, "buffer", "AudioBuffer|null", buffer, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "normalize", "boolean", normalize, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(ConvolverNode, ConvolverNodeConstructor);

ConvolverNode.exports = ConvolverNodeConstructor;
ConvolverNode.jsonAttrs = [ "normalize" ];

module.exports = WebAudioTestAPI.ConvolverNode = ConvolverNode;
