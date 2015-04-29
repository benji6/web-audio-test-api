import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";

export default class MediaStreamAudioDestinationNode extends AudioNode {
  constructor(admission, context) {
    super(admission, context, {
      name: "MediaStreamAudioDestinationNode",
      numberOfInputs  : 1,
      numberOfOutputs : 0,
      channelCount    : 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
    });
  }
}

WebAudioTestAPI.MediaStreamAudioDestinationNode = MediaStreamAudioDestinationNode;
