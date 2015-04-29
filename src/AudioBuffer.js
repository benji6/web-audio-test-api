import _ from "./utils";
import Inspector from "./utils/Inspector";
import WebAudioTestAPI from "./WebAudioTestAPI";

export default class AudioBuffer {
  constructor(admission, context, numberOfChannels, length, sampleRate) {
    _.immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });

    _.defineAttribute(this, "sampleRate", "readonly", sampleRate, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "length", "readonly", length, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "duration", "readonly", length / sampleRate, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "numberOfChannels", "readonly", numberOfChannels, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });

    Object.defineProperties(this, {
      $name   : { value: "AudioBuffer" },
      $context: { value: context },
    });

    this._data = new Array(numberOfChannels);
    for (let i = 0; i < numberOfChannels; i++) {
      this._data[i] = new Float32Array(length);
    }
  }

  getChannelData(channel) {
    let inspector = new Inspector(this, "getChannelData", [
      { name: "channel", type: "number" },
    ]);
    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });
    inspector.assert(0 <= channel && channel < this._data.length, () => {
      throw new TypeError(
        inspector.form + "; channel index (" + channel + ") exceeds number of channels (#{" + this._data.length + "})"
      );
    });
    return this._data[channel];
  };

  toJSON() {
    let json = {
      name: this.$name,
      sampleRate: this.sampleRate,
      length: this.length,
      duration: this.duration,
      numberOfChannels: this.numberOfChannels,
    };

    if (this.$context.VERBOSE_JSON) {
      json.data = this._data.map(function(data) {
        return Array.prototype.slice.call(data);
      });
    }

    return json;
  }
}

WebAudioTestAPI.AudioBuffer = AudioBuffer;
