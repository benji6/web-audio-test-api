import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import HTMLElement from "./HTMLElement";

global.HTMLMediaElement = global.HTMLMediaElement || class HTMLMediaElement extends HTMLElement {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

export default class HTMLMediaElement extends _.preventSuper(global.HTMLMediaElement) {
}

WebAudioTestAPI.HTMLMediaElement = HTMLMediaElement;
