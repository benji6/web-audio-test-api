describe("PeriodicWave", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var wave = audioContext.createPeriodicWave(
        new Float32Array(1024),
        new Float32Array(1024)
      );

      assert(wave instanceof global.PeriodicWave);

      assert.throws(function() {
        return new global.PeriodicWave();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

});
