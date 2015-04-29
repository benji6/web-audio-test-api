import _ from "./utils";
import AudioNode from "./AudioNode";
import WebAudioTestAPI from "./WebAudioTestAPI";

var AudioDestinationNodeConstructor = function AudioDestinationNode() {
  throw new TypeError("Illegal constructor");
};
_.inherits(AudioDestinationNodeConstructor, AudioNode);

function AudioDestinationNode(context) {
  AudioNode.call(this, context, {
    name: "AudioDestinationNode",
    numberOfInputs  : 1,
    numberOfOutputs : 0,
    channelCount    : 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers",
  });

  var maxChannelCount = 2;

  _.defineAttribute(this, "maxChannelCount", "readonly", maxChannelCount, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(AudioDestinationNode, AudioDestinationNodeConstructor);

AudioDestinationNode.exports = AudioDestinationNodeConstructor;

module.exports = WebAudioTestAPI.AudioDestinationNode = AudioDestinationNode;
