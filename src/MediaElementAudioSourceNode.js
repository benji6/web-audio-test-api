import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";

var MediaElementAudioSourceNodeConstructor = function MediaElementAudioSourceNode() {
  throw new TypeError("Illegal constructor: use audioContext.createMediaElementSource(mediaElement: HTMLMediaElement)");
};
_.inherits(MediaElementAudioSourceNodeConstructor, AudioNode);

function MediaElementAudioSourceNode(context) {
  AudioNode.call(this, context, {
    name: "MediaElementAudioSourceNode",
    numberOfInputs  : 0,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
  });
}
_.inherits(MediaElementAudioSourceNode, MediaElementAudioSourceNodeConstructor);

MediaElementAudioSourceNode.exports = MediaElementAudioSourceNodeConstructor;

module.exports = WebAudioTestAPI.MediaElementAudioSourceNode = MediaElementAudioSourceNode;
