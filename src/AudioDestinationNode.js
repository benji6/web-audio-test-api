import _ from "./utils";
import AudioNode from "./AudioNode";
import WebAudioTestAPI from "./WebAudioTestAPI";

export default class AudioDestinationNode extends AudioNode {
  constructor(admission, context) {
    super(admission, context, {
      name: "AudioDestinationNode",
      numberOfInputs  : 1,
      numberOfOutputs : 0,
      channelCount    : 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
    });

    let maxChannelCount = 2;

    _.defineAttribute(this, "maxChannelCount", "readonly", maxChannelCount, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
  }
}

WebAudioTestAPI.AudioDestinationNode = AudioDestinationNode;
