/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-mock");

describe("GainNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new AudioContext();
    node = ctx.createGain();
  });

  describe("#gain", function() {
    it("should be exist", function() {
      expect(node).to.have.property("gain");
    });
    it("should be readonly", function() {
      expect(function() {
        node.gain = 0;
      }).to.throw(Error, "readonly");
    });
    it("should be an instance of AudioParam", function() {
      expect(node.gain).to.be.instanceOf(AudioParam);
    });
  });

});
