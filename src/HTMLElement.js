import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import Element from "./Element";

global.HTMLElement = global.HTMLElement || class HTMLElement extends Element {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

export default class HTMLElement extends _.preventSuperCall(global.HTMLElement) {
}

WebAudioTestAPI.HTMLElement = HTMLElement;
