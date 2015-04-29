describe("MediaElementAudioSourceNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = audioContext.createMediaElementSource(new WebAudioTestAPI.HTMLMediaElement());

      assert(node instanceof global.MediaElementAudioSourceNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        return new global.MediaElementAudioSourceNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createMediaElementSource(new WebAudioTestAPI.HTMLMediaElement());

      assert.deepEqual(node.toJSON(), {
        name: "MediaElementAudioSourceNode",
        inputs: [],
      });
    });
  });

});
