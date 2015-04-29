import _ from "./utils";
import Inspector from "./utils/Inspector";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";
import AudioParam from "./AudioParam";
import Event from "./Event";

const OscillatorType = "enum { sine, square, sawtooth, triangle }";

export default class OscillatorNode extends AudioNode {
  constructor(admission, context) {
    super(admission, context, {
      name: "OscillatorNode",
      numberOfInputs  : 0,
      numberOfOutputs : 1,
      channelCount    : 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    let type = "sine";
    let frequency = _.immigration.apply(admission =>
      new AudioParam(admission, this, "frequency", 440, 0, 100000)
    );
    let detune = _.immigration.apply(admission =>
      new AudioParam(admission, this, "detune", 0, -4800, 4800)
    );
    let onended = null;

    Object.defineProperty(this, "type", {
      get: function() {
        return this._custom ? "custom" : this._type;
      },
      set: function(newValue) {
        if (_.typeCheck(newValue, OscillatorType )) {
          this._type = newValue;
        } else {
          let msg = "";

          msg += "type ";
          msg += _.formatter.shouldBeButGot(OscillatorType, newValue);

          throw new TypeError(_.formatter.concat(this, msg));
        }
      },
      enumerable: true,
    });
    _.defineAttribute(this, "frequency", "readonly", frequency, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "detune", "readonly", detune, (msg) => {
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
      $custom: {
        get: function() {
          return this._custom;
        },
      },
    });

    this._type = type;
    this._custom = null;
    this._startTime = Infinity;
    this._stopTime  = Infinity;
    this._firedOnEnded = false;
  }

  start(when) {
    let inspector = new Inspector(this, "start", [
      { name: "when", type: "optional number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });
    inspector.assert(this._startTime === Infinity, function() {
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
    inspector.assert(this._startTime !== Infinity, function() {
      throw new Error(inspector.form + "; cannot call stop without calling start first");
    });
    inspector.assert(this._stopTime === Infinity, function() {
      throw new Error(inspector.form + "; cannot stop more than once");
    });

    this._stopTime = _.defaults(when, 0);
  }

  setPeriodicWave(periodicWave) {
    let inspector = new Inspector(this, "setPeriodicWave", [
      { name: "periodicWave", type: "PeriodicWave" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    this._type = "custom";
    this._custom = periodicWave;
  }

  $stateAtTime(time) {
    time = _.toSeconds(time);

    if (this._startTime === Infinity) {
      return "UNSCHEDULED";
    }
    if (time < this._startTime) {
      return "SCHEDULED";
    }
    if (time < this._stopTime) {
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

OscillatorNode.jsonAttrs = [ "type", "frequency", "detune" ];

WebAudioTestAPI.OscillatorNode = OscillatorNode;
