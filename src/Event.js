import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";

global.Event = global.Event || class Event {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
};

export default class Event extends _.preventSuperCall(global.Event) {
  constructor(name, target) {
    super();

    this.type = name;
    this.target = _.defaults(target, null);
    this.timeStamp = Date.now();
  }
}

WebAudioTestAPI.Event = Event;
