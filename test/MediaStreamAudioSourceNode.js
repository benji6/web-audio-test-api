describe("MediaStreamAudioSourceNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = audioContext.createMediaStreamSource(new WebAudioTestAPI.MediaStream());

      assert(node instanceof global.MediaStreamAudioSourceNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        return new global.MediaStreamAudioSourceNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createMediaStreamSource(new WebAudioTestAPI.MediaStream());

      assert.deepEqual(node.toJSON(), {
        name: "MediaStreamAudioSourceNode",
        inputs: [],
      });
    });
  });

});
