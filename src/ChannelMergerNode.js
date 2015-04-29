import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";

export default class ChannelMergerNode extends AudioNode {
  constructor(admission, context, numberOfInputs) {
    super(admission, context, {
      name: "ChannelMergerNode",
      numberOfInputs  : numberOfInputs,
      numberOfOutputs : 1,
      channelCount    : 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

  }
}

WebAudioTestAPI.ChannelMergerNode = ChannelMergerNode;
