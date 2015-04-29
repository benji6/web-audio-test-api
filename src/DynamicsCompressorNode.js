var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

var DynamicsCompressorNodeConstructor = function DynamicsCompressorNode() {
  throw new TypeError("Illegal constructor: use audioContext.createDynamicsCompressor()");
};
_.inherits(DynamicsCompressorNodeConstructor, AudioNode);

function DynamicsCompressorNode(context) {
  AudioNode.call(this, context, {
    name: "DynamicsCompressorNode",
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers",
  });

  var threshold = new AudioParam(this, "threshold", -24, -100, 0);
  var knee = new AudioParam(this, "knee", 30, 0, 40);
  var ratio = new AudioParam(this, "ratio", 12, 1, 20);
  var reduction = new AudioParam(this, "reduction", 0, -20, 0);
  var attack = new AudioParam(this, "attack", 0.003, 0, 1.0);
  var release = new AudioParam(this, "release", 0.250, 0, 1.0);

  _.defineAttribute(this, "threshold", "readonly", threshold, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "knee", "readonly", knee, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "ratio", "readonly", ratio, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "reduction", "readonly", reduction, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "attack", "readonly", attack, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "release", "readonly", release, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(DynamicsCompressorNode, DynamicsCompressorNodeConstructor);

DynamicsCompressorNode.exports = DynamicsCompressorNodeConstructor;
DynamicsCompressorNode.jsonAttrs = [ "threshold", "knee", "ratio", "reduction", "attack", "release" ];

module.exports = WebAudioTestAPI.DynamicsCompressorNode = DynamicsCompressorNode;
