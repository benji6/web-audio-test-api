import _ from "./utils";
import Inspector from "./utils/Inspector";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioParam from "./AudioParam";
import EventTarget from "./EventTarget";

const ChannelCountMode = "enum { max, clamped-max, explicit }";
const ChannelInterpretation = "enum { speakers, discrete }";

export default class AudioNode extends EventTarget {
  constructor(admission, context, spec = {}) {
    super();

    _.immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });

    let numberOfInputs = _.defaults(spec.numberOfInputs, 1);
    let numberOfOutputs = _.defaults(spec.numberOfOutputs, 1);
    let channelCount = _.defaults(spec.channelCount, 2);
    let channelCountMode = _.defaults(spec.channelCountMode, "max");
    let channelInterpretation = _.defaults(spec.channelInterpretation, "speakers");

    _.defineAttribute(this, "context", "readonly", context, function(msg) {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "numberOfInputs", "readonly", numberOfInputs, function(msg) {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "numberOfOutputs", "readonly", numberOfOutputs, function(msg) {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "channelCount", "number", channelCount, function(msg) {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "channelCountMode", ChannelCountMode, channelCountMode, function(msg) {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "channelInterpretation", ChannelInterpretation, channelInterpretation, function(msg) {
      throw new TypeError(_.formatter.concat(this, msg));
    });

    Object.defineProperties(this, {
      $name   : { value: _.defaults(spec.name, "AudioNode") },
      $context: { value: context },
      $inputs : { value: [] },
    });
    this._outputs = [];
    this._tick = -1;
  }

  connect(destination) {
    function sameContext(value) {
      if (this.$context !== value.$context) {
        return "cannot connect to a destination belonging to a different audio context";
      }
    }

    function checkNumberOfOutput(value, name) {
      if (value < 0 || this.numberOfOutputs <= value) {
        return name + " index (" + value + ") exceeds number of outputs (" + this.numberOfOutputs + ")";
      }
    }

    function checkNumberOfInput(value, name) {
      if (value < 0 || destination.numberOfInputs <= value) {
        return name + " index (" + value + ") exceeds number of inputs (" + destination.numberOfInputs + ")";
      }
    }

    let inspector = new Inspector(this, "connect", [
      { name: "destination", type: "AudioNode | AudioParam", validate: sameContext },
      { name: "output"     , type: "optional number", validate: checkNumberOfOutput },
      { name: "input"      , type: "optional number", validate: checkNumberOfInput },
    ]);

    inspector.validateArguments(arguments, function(msg) {
      throw new TypeError(inspector.form + "; " + msg);
    });

    let index = this._outputs.indexOf(destination);

    if (index === -1) {
      this._outputs.push(destination);
      destination.$inputs.push(this);
    }
  }

  disconnect() {
    function checkNumberOfOutput(value, name) {
      if (value < 0 || this.numberOfOutputs <= value) {
        return name + " index (" + value + ") exceeds number of outputs (" + this.numberOfOutputs + ")";
      }
    }

    let inspector = new Inspector(this, "connect", [
      { name: "output", type: "optional number", validate: checkNumberOfOutput },
    ]);

    inspector.validateArguments(arguments, function(msg) {
      throw new TypeError(inspector.form + "; " + msg);
    });

    this._outputs.splice(0).forEach(function(dst) {
      let index = dst.$inputs.indexOf(this);
      /* istanbul ignore else */
      if (index !== -1) {
        dst.$inputs.splice(index, 1);
      }
    }, this);
  }

  toJSON(memo) {
    return _.toJSON(this, function(node, memo) {
      let json = {};

      json.name = _.name(node);

      (node.constructor.jsonAttrs || []).forEach(function(key) {
        if (node[key] && node[key].toJSON) {
          json[key] = node[key].toJSON(memo);
        } else {
          json[key] = node[key];
        }
      });

      if (node.$context.VERBOSE_JSON) {
        json.numberOfInputs = node.numberOfInputs;
        json.numberOfOutputs = node.numberOfOutputs;
        json.channelCount = node.channelCount;
        json.channelCountMode = node.channelCountMode;
        json.channelInterpretation = node.channelInterpretation;
      }

      json.inputs = node.$inputs.map(function(node) {
        return node.toJSON(memo);
      });

      return json;
    }, memo);
  }

  $process(inNumSamples, tick) {
    if (this._tick !== tick) {
      this._tick = tick;
      this.$inputs.forEach(function(src) {
        src.$process(inNumSamples, tick);
      });
      Object.keys(this).forEach(function(key) {
        if (this[key] instanceof AudioParam) {
          this[key].$process(inNumSamples, tick);
        }
      }, this);
      if (this._process) {
        this._process(inNumSamples);
      }
    }
  }
}

WebAudioTestAPI.AudioNode = AudioNode;
