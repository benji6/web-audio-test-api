import _ from "./utils";
import Inspector from "./utils/Inspector";
import WebAudioTestAPI from "./WebAudioTestAPI";

export default class AudioListener {
  constructor(admission, context) {
    let dopplerFactor = 1;
    let speedOfSound = 343.3;

    _.immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });

    _.defineAttribute(this, "dopplerFactor", "number", dopplerFactor, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "speedOfSound", "number", speedOfSound, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });

    Object.defineProperties(this, {
      $name   : { value: "AudioListener" },
      $context: { value: context },
    });
  }

  setPosition() {
    let inspector = new Inspector(this, "setPosition", [
      { name: "x", type: "number" },
      { name: "y", type: "number" },
      { name: "z", type: "number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });
  }

  setOrientation() {
    let inspector = new Inspector(this, "setOrientation", [
      { name: "x"  , type: "number" },
      { name: "y"  , type: "number" },
      { name: "z"  , type: "number" },
      { name: "xUp", type: "number" },
      { name: "yUp", type: "number" },
      { name: "zUp", type: "number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });
  }

  setVelocity() {
    let inspector = new Inspector(this, "setVelocity", [
      { name: "x", type: "number" },
      { name: "y", type: "number" },
      { name: "z", type: "number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });
  }
}

WebAudioTestAPI.AudioListener = AudioListener;
