import _ from "./utils";
import Inspector from "./utils/Inspector";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioDestinationNode from "./AudioDestinationNode";
import AudioListener from "./AudioListener";
import AudioBuffer from "./AudioBuffer";
import AudioBufferSourceNode from "./AudioBufferSourceNode";
import MediaElementAudioSourceNode from "./MediaElementAudioSourceNode";
import MediaStreamAudioSourceNode from "./MediaStreamAudioSourceNode";
import MediaStreamAudioDestinationNode from "./MediaStreamAudioDestinationNode";
import ScriptProcessorNode from "./ScriptProcessorNode";
import AnalyserNode from "./AnalyserNode";
import GainNode from "./GainNode";
import DelayNode from "./DelayNode";
import BiquadFilterNode from "./BiquadFilterNode";
import WaveShaperNode from "./WaveShaperNode";
import PannerNode from "./PannerNode";
import ConvolverNode from "./ConvolverNode";
import ChannelSplitterNode from "./ChannelSplitterNode";
import ChannelMergerNode from "./ChannelMergerNode";
import DynamicsCompressorNode from "./DynamicsCompressorNode";
import OscillatorNode from "./OscillatorNode";
import PeriodicWave from "./PeriodicWave";
import EventTarget from "./EventTarget";

import "./MediaStream";
import "./HTMLMediaElement";

export default class AudioContext extends EventTarget {
  constructor() {
    super();

    let destination = _.immigration.apply(admission =>
      new AudioDestinationNode(admission, this)
    );
    let sampleRate = WebAudioTestAPI.sampleRate;
    let currentTime = () => this._microCurrentTime / (1000 * 1000);
    let listener = _.immigration.apply(admission =>
      new AudioListener(admission, this)
    );

    _.defineAttribute(this, "destination", "readonly", destination, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "sampleRate", "readonly", sampleRate, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "currentTime", "readonly", currentTime, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "listener", "readonly", listener, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });

    Object.defineProperties(this, {
      $name   : { value : "AudioContext" },
      $context: { value: this },
    });

    this._microCurrentTime = 0;
    this._processedSamples = 0;
    this._tick = 0;
  }

  createBuffer(numberOfChannels, length, sampleRate) {
    let inspector = new Inspector(this, null, [
      { name: "numberOfChannels", type: "number" },
      { name: "length"          , type: "number" },
      { name: "sampleRate"      , type: "number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    return _.immigration.apply(admission =>
      new AudioBuffer(admission, this, numberOfChannels, length, sampleRate)
    );
  }

  decodeAudioData(audioData, successCallback, errorCallback) {
    let inspector = new Inspector(this, "decodeAudioData", [
      { name: "audioData"      , type: "ArrayBuffer" },
      { name: "successCallback", type: "function" },
      { name: "errorCallback"  , type: "optional function" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    successCallback = _.defaults(successCallback, _.NOP);
    errorCallback   = _.defaults(errorCallback  , _.NOP);

    setTimeout(() => {
      if (this.DECODE_AUDIO_DATA_FAILED) {
        errorCallback();
      } else {
        successCallback(this.DECODE_AUDIO_DATA_RESULT || _.immigration.apply(admission =>
          new AudioBuffer(admission, this, 2, 1024, this.sampleRate)
        ));
      }
    }, 0);
  }

  createBufferSource() {
    return _.immigration.apply(admission =>
      new AudioBufferSourceNode(admission, this)
    );
  };

  createMediaElementSource(mediaElement) {
    let inspector = new Inspector(this, "createMediaElementSource", [
      { name: "mediaElement", type: "HTMLMediaElement" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    return _.immigration.apply(admission =>
      new MediaElementAudioSourceNode(admission, this, mediaElement)
    );
  };

  createMediaStreamSource(mediaStream) {
    let inspector = new Inspector(this, "createMediaStreamSource", [
      { name: "mediaStream", type: "MediaStream" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    return _.immigration.apply(admission =>
      new MediaStreamAudioSourceNode(admission, this, mediaStream)
    );
  };

  createMediaStreamDestination() {
    return _.immigration.apply(admission =>
      new MediaStreamAudioDestinationNode(admission, this)
    );
  };

  createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels) {
    let inspector = new Inspector(this, "createScriptProcessor", [
      { name: "bufferSize"            , type: /* optional */ "enum { 256, 512, 1024, 2048, 4096, 8192, 16384 }" },
      { name: "numberOfInputChannels" , type: "optional number" },
      { name: "numberOfOutputChannels", type: "optional number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    bufferSize = _.defaults(bufferSize, 0);
    numberOfInputChannels  = _.defaults(numberOfInputChannels , 2);
    numberOfOutputChannels = _.defaults(numberOfOutputChannels, 2);

    return _.immigration.apply(admission =>
      new ScriptProcessorNode(admission, this, bufferSize, numberOfInputChannels, numberOfOutputChannels)
    );
  };

  createAnalyser() {
    return _.immigration.apply(admission =>
      new AnalyserNode(admission, this)
    );
  };

  createGain() {
    return _.immigration.apply(admission =>
      new GainNode(admission, this)
    );
  };

  createDelay(maxDelayTime) {
    let inspector = new Inspector(this, "createDelay", [
      { name: "maxDelayTime", type: "optional number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    maxDelayTime = _.defaults(maxDelayTime, 1.0);

    return _.immigration.apply(admission =>
      new DelayNode(admission, this, maxDelayTime)
    );
  };

  createBiquadFilter() {
    return _.immigration.apply(admission =>
      new BiquadFilterNode(admission, this)
    );
  };

  createWaveShaper() {
    return _.immigration.apply(admission =>
      new WaveShaperNode(admission, this)
    );
  };

  createPanner() {
    return _.immigration.apply(admission =>
      new PannerNode(admission, this)
    );
  };

  createConvolver() {
    return _.immigration.apply(admission =>
      new ConvolverNode(admission, this)
    );
  };

  createChannelSplitter(numberOfOutputs) {
    let inspector = new Inspector(this, "createChannelSplitter", [
      { name: "numberOfOutputs", type: "optional number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    numberOfOutputs = _.defaults(numberOfOutputs, 6);

    return _.immigration.apply(admission =>
      new ChannelSplitterNode(admission, this, numberOfOutputs)
    );
  };

  createChannelMerger(numberOfInputs) {
    let inspector = new Inspector(this, "createChannelMerger", [
      { name: "numberOfInputs", type: "optional number" },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });

    numberOfInputs = _.defaults(numberOfInputs, 6);

    return _.immigration.apply(admission =>
      new ChannelMergerNode(admission, this, numberOfInputs)
    );
  };

  createDynamicsCompressor() {
    return _.immigration.apply(admission =>
      new DynamicsCompressorNode(admission, this)
    );
  };

  createOscillator() {
    return _.immigration.apply(admission =>
      new OscillatorNode(admission, this)
    );
  };

  createPeriodicWave(real, imag) {
    function over4096(value, name) {
      if (4096 < value.length) {
        return "length of " + name + " array (" + value.length + ") exceeds allow maximum of 4096";
      }
    }

    let inspector = new Inspector(this, "createPeriodicWave", [
      { name: "real", type: "Float32Array", validate: over4096 },
      { name: "imag", type: "Float32Array", validate: over4096 },
    ]);

    inspector.validateArguments(arguments, (msg) => {
      throw new TypeError(inspector.form + "; " + msg);
    });
    inspector.assert(real.length === imag.length, () => {
      throw new TypeError(
        inspector.form + "; length of real array (" + real.length + ") and length of imaginary array (" + imag.length + ") must match"
      );
    });

    return _.immigration.apply(admission =>
      new PeriodicWave(admission, real, imag)
    );
  };

  toJSON() {
    return this.destination.toJSON([]);
  };

  $process(time) {
    this._process(_.toMicroseconds(time));
  };

  $processTo(time) {
    time = _.toMicroseconds(time);
    if (this._microCurrentTime < time) {
      this._process(time - this._microCurrentTime);
    }
  };

  $reset() {
    this._microCurrentTime = 0;
    this._processedSamples = 0;
    this.destination.$inputs.forEach((node) => {
      node.disconnect();
    });
  };

  _process(microseconds) {
    let nextMicroCurrentTime = this._microCurrentTime + microseconds;

    while (this._microCurrentTime < nextMicroCurrentTime) {
      let _nextMicroCurrentTime = Math.min(this._microCurrentTime + 1000, nextMicroCurrentTime);
      let _nextProcessedSamples = Math.floor(_nextMicroCurrentTime / (1000 * 1000) * this.sampleRate);
      let inNumSamples = _nextProcessedSamples - this._processedSamples;

      this._microCurrentTime = _nextMicroCurrentTime;
      this._processedSamples = _nextProcessedSamples;

      this.destination.$process(inNumSamples, ++this._tick);
    }
  };
}

AudioContext.WEB_AUDIO_TEST_API_VERSION = WebAudioTestAPI.VERSION;

WebAudioTestAPI.AudioContext = AudioContext;
