import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";

var ChannelMergerNodeConstructor = function ChannelMergerNode() {
  throw new TypeError("Illegal constructor: use audioContext.createChannelMerger([numberOfInputs: number])");
};
_.inherits(ChannelMergerNodeConstructor, AudioNode);

function ChannelMergerNode(context, numberOfInputs) {
  AudioNode.call(this, context, {
    name: "ChannelMergerNode",
    numberOfInputs  : numberOfInputs,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
  });
}
_.inherits(ChannelMergerNode, ChannelMergerNodeConstructor);

ChannelMergerNode.exports = ChannelMergerNodeConstructor;

module.exports = WebAudioTestAPI.ChannelMergerNode = ChannelMergerNode;
