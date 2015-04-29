import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import EventTarget from "./EventTarget";

global.MediaStream = global.MediaStream || class MediaStream extends EventTarget {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

export default class MediaStream extends _.preventSuperCall(global.MediaStream) {
}

WebAudioTestAPI.MediaStream = MediaStream;
