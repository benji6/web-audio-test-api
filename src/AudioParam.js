import _ from "./utils";
import Inspector from "./utils/Inspector";
import WebAudioTestAPI from "./WebAudioTestAPI";

function insertEvent(_this, event) {
  let time = event.time;
  let events = _this.$events;
  let replace = 0;
  let i, imax = events.length;

  for (i = 0; i < imax; ++i) {
    if (events[i].time === time && events[i].type === event.type) {
      replace = 1;
      break;
    }

    if (events[i].time > time) {
      break;
    }
  }

  events.splice(i, replace, event);
}

function linTo(v, v0, v1, t, t0, t1) {
  let dt = (t - t0) / (t1 - t0);
  return (1 - dt) * v0 + dt * v1;
}

function expTo(v, v0, v1, t, t0, t1) {
  let dt = (t - t0) / (t1 - t0);
  return 0 < v0 && 0 < v1 ? v0 * Math.pow(v1 / v0, dt) : /* istanbul ignore next */ v;
}

function setTarget(v0, v1, t, t0, timeConstant) {
  return v1 + (v0 - v1) * Math.exp((t0 - t) / timeConstant);
}

function setCurveValue(v, t, t0, t1, curve) {
  let dt = (t - t0) / (t1 - t0);

  if (dt <= 0) {
    return _.defaults(curve[0], v);
  }

  if (1 <= dt) {
    return _.defaults(curve[curve.length - 1], v);
  }

  return _.defaults(curve[(curve.length * dt)|0], v);
}

export default class AudioParam {
  constructor(admission, node, name, defaultValue, minValue, maxValue) {
    _.immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });

    var context = node.context;

    _.defineAttribute(this, "name", "readonly", name, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "defaultValue", "readonly", defaultValue, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "minValue", "readonly", minValue, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "maxValue", "readonly", maxValue, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    Object.defineProperty(this, "value", {
      get: function() {
        this._value = this.$valueAtTime(context.currentTime);
        return this._value;
      },
      set: function(newValue) {
        if (_.typeCheck(newValue, "number")) {
          this._value = newValue;
        } else {
          var msg = "";

          msg += "type ";
          msg += _.formatter.shouldBeButGot("number", newValue);

          throw new TypeError(_.formatter.concat(this, msg));
        }
      },
      enumerable: true,
    });

    Object.defineProperties(this, {
      $name   : { value: "AudioParam" },
      $context: { value: context },
      $node   : { value: node },
      $inputs : { value: [] },
      $events : { value: [] },
    });

    this._value = this.defaultValue;
    this._tick = -1;
  }

  setValueAtTime(value, startTime) {
    var inspector = new Inspector(this, "setValueTime", [
      { name: "value"    , type: "number" },
      { name: "startTime", type: "number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    insertEvent(this, {
      type : "SetValue",
      value: value,
      time : startTime,
    });
  }

  linearRampToValueAtTime(value, endTime) {
    var inspector = new Inspector(this, "linearRampToValueAtTime", [
      { name: "value"  , type: "number" },
      { name: "endTime", type: "number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    insertEvent(this, {
      type : "LinearRampToValue",
      value: value,
      time : endTime,
    });
  }

  exponentialRampToValueAtTime(value, endTime) {
    var inspector = new Inspector(this, "exponentialRampToValueAtTime", [
      { name: "value"  , type: "number" },
      { name: "endTime", type: "number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    insertEvent(this, {
      type : "ExponentialRampToValue",
      value: value,
      time : endTime,
    });
  }

  setTargetAtTime(target, startTime, timeConstant) {
    var inspector = new Inspector(this, "setTargetAtTime", [
      { name: "target"      , type: "number" },
      { name: "startTime"   , type: "number" },
      { name: "timeConstant", type: "number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    insertEvent(this, {
      type : "SetTarget",
      value: target,
      time : startTime,
      timeConstant: timeConstant,
    });
  }

  setValueCurveAtTime(values, startTime, duration) {
    var inspector = new Inspector(this, "setValueCurveAtTime", [
      { name: "values"   , type: "Float32Array" },
      { name: "startTime", type: "number" },
      { name: "duration" , type: "number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    insertEvent(this, {
      type : "SetValueCurve",
      time : startTime,
      duration: duration,
      curve: values,
    });
  }

  cancelScheduledValues(startTime) {
    var inspector = new Inspector(this, "cancelScheduledValues", [
      { name: "startTime", type: "number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    var events = this.$events;

    for (var i = 0, imax = events.length; i < imax; ++i) {
      if (events[i].time >= startTime) {
        return events.splice(i);
      }
    }
  }

  toJSON(memo) {
    return _.toJSON(this, (node, memo) => {
      var json = {};

      json.value = node.value;

      json.inputs = node.$inputs.map(node => node.toJSON(memo));

      return json;
    }, memo);
  }

  $valueAtTime(time) {
    time = _.toSeconds(time);

    var value  = this._value;
    var events = this.$events;
    var t0;

    for (var i = 0; i < events.length; i++) {
      var e0 = events[i];
      var e1 = events[i + 1];

      if (time < e0.time) {
        break;
      }
      t0 = Math.min(time, e1 ? e1.time : time);

      if (e1 && e1.type === "LinearRampToValue") {
        value = linTo(value, e0.value, e1.value, t0, e0.time, e1.time);
      } else if (e1 && e1.type === "ExponentialRampToValue") {
        value = expTo(value, e0.value, e1.value, t0, e0.time, e1.time);
      } else {
        switch (e0.type) {
        case "SetValue":
        case "LinearRampToValue":
        case "ExponentialRampToValue":
          value = e0.value;
          break;
        case "SetTarget":
          value = setTarget(value, e0.value, t0, e0.time, e0.timeConstant);
          break;
        case "SetValueCurve":
          value = setCurveValue(value, t0, e0.time, e0.time + e0.duration, e0.curve);
          break;
        }
      }
    }

    return value;
  }

  $process(inNumSamples, tick) {
    /* istanbul ignore else */
    if (this._tick !== tick) {
      this._tick = tick;
      this.$inputs.forEach((src) => {
        src.$process(inNumSamples, tick);
      });
    }
  }
}

WebAudioTestAPI.AudioParam = AudioParam;
