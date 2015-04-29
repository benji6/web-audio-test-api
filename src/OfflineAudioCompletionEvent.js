import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import Event from "./Event";

export default class OfflineAudioCompletionEvent extends Event {
  constructor(admission, node) {
    super("complete", node);

    _.immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });

    Object.defineProperties(this, {
      $name: { value: "OfflineAudioCompletionEvent" },
      $node: { value: node },
    });
  }
}

WebAudioTestAPI.OfflineAudioCompletionEvent = OfflineAudioCompletionEvent;
