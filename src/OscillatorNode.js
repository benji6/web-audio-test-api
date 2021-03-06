import * as util from "./util";
import Enumerator from "./util/Enumerator";
import AudioNode from "./AudioNode";
import AudioParam from "./AudioParam";
import Event from "./Event";

export default class OscillatorNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "OscillatorNode",
      context: context,
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    this._.type = "sine";
    this._.frequency = util.immigration.apply(admission =>
      new AudioParam(admission, this, "frequency", 440, 0, 100000)
    );
    this._.detune = util.immigration.apply(admission =>
      new AudioParam(admission, this, "detune", 0, -4800, 4800)
    );
    this._.onended = null;
    this._.custom = null;
    this._.startTime = Infinity;
    this._.stopTime  = Infinity;
    this._.firedOnEnded = false;
    this._.JSONKeys = OscillatorNode.$JSONKeys.slice();
  }

  get type() {
    return this._.custom ? "custom" : this._.type;
  }

  set type(value) {
    this._.inspector.describe("type", (assert) => {
      let enumOscillatorType = new Enumerator([
        "sine", "square", "sawtooth", "triangle",
      ]);

      assert(enumOscillatorType.contains(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "type", enumOscillatorType.toString())}
        `);
      });
    });

    this._.type = value;
  }

  get frequency() {
    return this._.frequency;
  }

  set frequency(value) {
    this._.inspector.describe("frequency", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get detune() {
    return this._.detune;
  }

  set detune(value) {
    this._.inspector.describe("detune", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get onended() {
    return this._.onended;
  }

  set onended(value) {
    this._.inspector.describe("onended", (assert) => {
      assert(util.isNullOrFunction(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "onended", "function")}
        `);
      });
    });

    this._.onended = value;
  }

  get $state() {
    return this.$stateAtTime(this.context.currentTime);
  }

  get $custom() {
    return this._.custom;
  }

  start(when = 0) {
    this._.inspector.describe("start", (assert) => {
      assert(util.isPositiveNumber(when), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(when, "when", "positive number")}
        `);
      });

      assert(this._.startTime === Infinity, (fmt) => {
        throw new Error(fmt.plain `
          ${fmt.form};
          cannot start more than once
        `);
      });
    });

    this._.startTime = when;
  }

  stop(when = 0) {
    this._.inspector.describe("stop", (assert) => {
      assert(util.isPositiveNumber(when), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(when, "when", "positive number")}
        `);
      });

      assert(this._.startTime !== Infinity, (fmt) => {
        throw new Error(fmt.plain `
          ${fmt.form};
          cannot call stop without calling start first
        `);
      });

      assert(this._.stopTime === Infinity, (fmt) => {
        throw new Error(fmt.plain `
          ${fmt.form};
          cannot stop more than once
        `);
      });
    });

    this._.stopTime = when;
  }

  setPeriodicWave(periodicWave) {
    this._.inspector.describe("setPeriodicWave", (assert) => {
      assert(util.isInstanceOf(periodicWave, global.PeriodicWave), (fmt) => {
        throw new TypeError(fmt.plain`
          ${fmt.form};
          ${fmt.butGot(periodicWave, "periodicWave", "PeriodicWave")}
        `);
      });
    });

    this._.type = "custom";
    this._.custom = periodicWave;
  }

  $stateAtTime(time) {
    time = util.toSeconds(time);

    if (this._.startTime === Infinity) {
      return "UNSCHEDULED";
    }
    if (time < this._.startTime) {
      return "SCHEDULED";
    }
    if (time < this._.stopTime) {
      return "PLAYING";
    }

    return "FINISHED";
  }

  _process() {
    if (!this._.firedOnEnded && this.$stateAtTime(this.context.currentTime) === "FINISHED") {
      this.dispatchEvent(new Event("ended", this));
      this._.firedOnEnded = true;
    }
  }
}

OscillatorNode.$JSONKeys = [
  "type",
  "frequency",
  "detune",
];
