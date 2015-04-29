import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";

var MediaStreamAudioSourceNodeConstructor = function MediaStreamAudioSourceNode() {
  throw new TypeError("Illegal constructor: use audioContext.createMediaStreamSource(mediaStream: MediaStream)");
};
_.inherits(MediaStreamAudioSourceNodeConstructor, AudioNode);

function MediaStreamAudioSourceNode(context) {
  AudioNode.call(this, context, {
    name: "MediaStreamAudioSourceNode",
    numberOfInputs  : 0,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
  });
}
_.inherits(MediaStreamAudioSourceNode, MediaStreamAudioSourceNodeConstructor);

MediaStreamAudioSourceNode.exports = MediaStreamAudioSourceNodeConstructor;

module.exports = WebAudioTestAPI.MediaStreamAudioSourceNode = MediaStreamAudioSourceNode;
