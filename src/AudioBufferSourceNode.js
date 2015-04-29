import _ from "./utils";
import Inspector from "./utils/Inspector";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";
import AudioParam from "./AudioParam";
import Event from "./Event";

export default class AudioBufferSourceNode extends AudioNode {
  constructor(admission, context) {
    super(admission, context, {
      name: "AudioBufferSourceNode",
      numberOfInputs  : 0,
      numberOfOutputs : 1,
      channelCount    : 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    let buffer = null;
    let playbackRate = _.immigration.apply(admission =>
      new AudioParam(admission, this, "playbackRate", 1, 0, 1024)
    );
    let loop = false;
    let loopStart = 0;
    let loopEnd = 0;
    let onended = null;

    _.defineAttribute(this, "buffer", "AudioBuffer|null", buffer, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "playbackRate", "readonly", playbackRate, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "loop", "boolean", loop, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "loopStart", "number", loopStart, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "loopEnd", "number", loopEnd, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "onended", "function|null", onended, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });

    Object.defineProperties(this, {
      $state: {
        get: function() {
          return this.$stateAtTime(this.context.currentTime);
        },
      },
    });

    this._startTime = Infinity;
    this._stopTime  = Infinity;
    this._firedOnEnded = false;
  }

  start(when) {
    let inspector = new Inspector(this, "start", [
      { name: "when", type: "optional number" },
      { name: "offset", type: "optional number" },
      { name: "duration", type: "optional number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });
    inspector.assert(this._startTime === Infinity, () => {
      throw new Error(inspector.form + "; cannot start more than once");
    });

    this._startTime = _.defaults(when, 0);
  }

  stop(when) {
    let inspector = new Inspector(this, "stop", [
      { name: "when", type: "optional number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });
    inspector.assert(this._startTime !== Infinity, () => {
      throw new Error(inspector.form + "; cannot call stop without calling start first");
    });
    inspector.assert(this._stopTime === Infinity, () => {
      throw new Error(inspector.form + "; cannot stop more than once");
    });

    this._stopTime = when;
  }

  $stateAtTime(time) {
    time = _.toSeconds(time);

    if (this._startTime === Infinity) {
      return "UNSCHEDULED";
    }
    if (time < this._startTime) {
      return "SCHEDULED";
    }

    let stopTime = this._stopTime;

    if (!this.loop && this.buffer) {
      stopTime = Math.min(stopTime, this._startTime + this.buffer.duration);
    }

    if (time < stopTime) {
      return "PLAYING";
    }

    return "FINISHED";
  }

  _process() {
    if (!this._firedOnEnded && this.$stateAtTime(this.context.currentTime) === "FINISHED") {
      this.dispatchEvent(new Event("ended", this));
      this._firedOnEnded = true;
    }
  }
}

AudioBufferSourceNode.jsonAttrs = [ "buffer", "playbackRate", "loop", "loopStart", "loopEnd" ];

WebAudioTestAPI.AudioBufferSourceNode = AudioBufferSourceNode;
