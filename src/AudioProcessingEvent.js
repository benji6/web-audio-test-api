import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import Event from "./Event";

var AudioProcessingEventConstructor = function AudioProcessingEvent() {
  throw new TypeError("Illegal constructor");
};
_.inherits(AudioProcessingEventConstructor, Event);

function AudioProcessingEvent(node) {
  Event.call(this, "audioprocess", node);
  Object.defineProperties(this, {
    $name: { value: "AudioProcessingEvent" },
    $node: { value: node },
  });
}
_.inherits(AudioProcessingEvent, AudioProcessingEventConstructor);

AudioProcessingEvent.exports = AudioProcessingEventConstructor;

module.exports = WebAudioTestAPI.AudioProcessingEvent = AudioProcessingEvent;
