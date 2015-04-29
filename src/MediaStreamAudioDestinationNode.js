import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";

var MediaStreamAudioDestinationNodeConstructor = function MediaStreamAudioDestinationNode() {
  throw new TypeError("Illegal constructor: use audioContext.createMediaStreamDestination()");
};
_.inherits(MediaStreamAudioDestinationNodeConstructor, AudioNode);

function MediaStreamAudioDestinationNode(context) {
  AudioNode.call(this, context, {
    name: "MediaStreamAudioDestinationNode",
    numberOfInputs  : 1,
    numberOfOutputs : 0,
    channelCount    : 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers",
  });
}
_.inherits(MediaStreamAudioDestinationNode, MediaStreamAudioDestinationNodeConstructor);

MediaStreamAudioDestinationNode.exports = MediaStreamAudioDestinationNodeConstructor;

module.exports = WebAudioTestAPI.MediaStreamAudioDestinationNode = MediaStreamAudioDestinationNode;
