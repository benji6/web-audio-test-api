import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";

export default class MediaElementAudioSourceNode extends AudioNode {
  constructor(admission, context) {
    super(admission, context, {
      name: "MediaElementAudioSourceNode",
      numberOfInputs  : 0,
      numberOfOutputs : 1,
      channelCount    : 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });
  }
}

WebAudioTestAPI.MediaElementAudioSourceNode = MediaElementAudioSourceNode;
