import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";
import AudioParam from "./AudioParam";

export default class DynamicsCompressorNode extends AudioNode {
  constructor(admission, context) {
    super(admission, context, {
      name: "DynamicsCompressorNode",
      numberOfInputs  : 1,
      numberOfOutputs : 1,
      channelCount    : 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
    });

    let threshold = _.immigration.apply(admission =>
      new AudioParam(admission, this, "threshold", -24, -100, 0)
    );
    let knee = _.immigration.apply(admission =>
      new AudioParam(admission, this, "knee", 30, 0, 40)
    );
    let ratio = _.immigration.apply(admission =>
      new AudioParam(admission, this, "ratio", 12, 1, 20)
    );
    let reduction = _.immigration.apply(admission =>
      new AudioParam(admission, this, "reduction", 0, -20, 0)
    );
    let attack = _.immigration.apply(admission =>
      new AudioParam(admission, this, "attack", 0.003, 0, 1.0)
    );
    let release = _.immigration.apply(admission =>
      new AudioParam(admission, this, "release", 0.250, 0, 1.0)
    );

    _.defineAttribute(this, "threshold", "readonly", threshold, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "knee", "readonly", knee, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "ratio", "readonly", ratio, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "reduction", "readonly", reduction, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "attack", "readonly", attack, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "release", "readonly", release, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
  }
}

DynamicsCompressorNode.jsonAttrs = [ "threshold", "knee", "ratio", "reduction", "attack", "release" ];

WebAudioTestAPI.DynamicsCompressorNode = DynamicsCompressorNode;
