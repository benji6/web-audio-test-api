import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";

export default class ChannelSplitterNode extends AudioNode {
  constructor(admission, context, numberOfOutputs) {
    super(admission, context, {
      name: "ChannelSplitterNode",
      numberOfInputs  : 1,
      numberOfOutputs : numberOfOutputs,
      channelCount    : 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });
  }
}

module.exports = WebAudioTestAPI.ChannelSplitterNode = ChannelSplitterNode;
