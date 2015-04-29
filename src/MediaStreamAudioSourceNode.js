import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";

export default class MediaStreamAudioSourceNode extends AudioNode {
  constructor(admission, context) {
    super(admission, context, {
      name: "MediaStreamAudioSourceNode",
      numberOfInputs  : 0,
      numberOfOutputs : 1,
      channelCount    : 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });
  }
}

WebAudioTestAPI.MediaStreamAudioSourceNode = MediaStreamAudioSourceNode;
