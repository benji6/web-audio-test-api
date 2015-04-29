import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";

export default class PeriodicWave {
  constructor(admission, real, imag) {
    _.immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });

    Object.defineProperties(this, {
      $name: { value: "PeriodicWave" },
      $real: { value: real },
      $imag: { value: imag },
    });
  }
}

WebAudioTestAPI.PeriodicWave = PeriodicWave;
