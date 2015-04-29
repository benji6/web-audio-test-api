import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import Event from "./Event";

export default class AudioProcessingEvent extends Event {
  constructor(admission, node) {
    super("audioprocess", node);

    _.immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });

    Object.defineProperties(this, {
      $name: { value: "AudioProcessingEvent" },
      $node: { value: node },
    });
  }
}

WebAudioTestAPI.AudioProcessingEvent = AudioProcessingEvent;
