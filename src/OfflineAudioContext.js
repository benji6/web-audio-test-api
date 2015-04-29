import _ from "./utils";
import Inspector from "./utils/Inspector";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioContext from "./AudioContext";
import AudioBuffer from "./AudioBuffer";
import OfflineAudioCompletionEvent from "./OfflineAudioCompletionEvent";

export default class OfflineAudioContext extends AudioContext {
  constructor(numberOfChannels, length, sampleRate) {
    // TODO: fix
    let savedSampleRate = WebAudioTestAPI.sampleRate;

    WebAudioTestAPI.sampleRate = sampleRate;

    super();

    WebAudioTestAPI.sampleRate = savedSampleRate;

    let inspector = new Inspector(this, null, [
      { name: "numberOfChannels", type: "number" },
      { name: "length"          , type: "number" },
      { name: "sampleRate"      , type: "number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    let oncomplete = null;

    _.defineAttribute(this, "oncomplete", "function|null", oncomplete, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });

    this._numberOfChannels = numberOfChannels;
    this._length = length;
    this._rendering = false;
  }

  startRendering() {
    let inspector = new Inspector(this, "startRendering", []);

    inspector.assert(!this._rendering, function() {
      throw Error(inspector.form + "; must only be called one time");
    });

    this._rendering = true;
  }

  _process(microseconds) {
    if (!this._rendering || this._length <= this._processedSamples) {
      return;
    }

    let nextMicroCurrentTime = this._microCurrentTime + microseconds;

    while (this._microCurrentTime < nextMicroCurrentTime) {
      let _nextMicroCurrentTime = Math.min(this._microCurrentTime + 1000, nextMicroCurrentTime);
      let _nextProcessedSamples = Math.floor(_nextMicroCurrentTime / (1000 * 1000) * this.sampleRate);
      let inNumSamples = _nextProcessedSamples - this._processedSamples;

      this.destination.$process(inNumSamples, ++this._tick);

      this._microCurrentTime = _nextMicroCurrentTime;
      this._processedSamples = _nextProcessedSamples;

      if (this._length <= this._processedSamples) {
        break;
      }
    }

    if (this._length <= this._processedSamples) {
      let event = _.immigration.apply(admission =>
        new OfflineAudioCompletionEvent(admission, this)
      );

      event.renderedBuffer = _.immigration.apply(admission =>
        new AudioBuffer(admission, this, this._numberOfChannels, this._length, this.sampleRate)
      );

      this.dispatchEvent(event);
    }
  }
}

WebAudioTestAPI.OfflineAudioContext = OfflineAudioContext;
