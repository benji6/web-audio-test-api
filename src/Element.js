import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import EventTarget from "./EventTarget";

global.Element = global.Element || class Element extends EventTarget {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

export default class Element extends _.preventSuper(global.Element) {
}

WebAudioTestAPI.Element = Element;
