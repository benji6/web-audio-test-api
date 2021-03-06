describe("MediaElementAudioSourceNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext, mediaElement;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
    mediaElement = new WebAudioTestAPI.HTMLMediaElement();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = audioContext.createMediaElementSource(mediaElement);

      assert(node instanceof global.MediaElementAudioSourceNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        audioContext.createMediaElementSource("INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a HTMLMediaElement/.test(e.message);
      });

      assert.throws(function() {
        return new global.MediaElementAudioSourceNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createMediaElementSource(mediaElement);

      assert.deepEqual(node.toJSON(), {
        name: "MediaElementAudioSourceNode",
        inputs: [],
      });
    });
  });

  describe("#$name", function() {
    it("get: string", function() {
      var node = audioContext.createMediaElementSource(mediaElement);

      assert(node.$name === "MediaElementAudioSourceNode");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.createMediaElementSource(mediaElement);

      assert(node.$context === audioContext);
    });
  });

});
