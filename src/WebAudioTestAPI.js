import utils from "./utils";
import WebAudioAPI from "./WebAudioAPI";

var WebAudioTestAPI = {};

WebAudioTestAPI.VERSION = "0.2.1";
WebAudioTestAPI.sampleRate = 44100;
WebAudioTestAPI.util = utils;

WebAudioTestAPI.use = function() {
  global.AnalyserNode = WebAudioTestAPI.AnalyserNode;
  global.AudioBuffer = WebAudioTestAPI.AudioBuffer;
  global.AudioBufferSourceNode = WebAudioTestAPI.AudioBufferSourceNode;
  global.AudioContext = WebAudioTestAPI.AudioContext;
  global.AudioDestinationNode = WebAudioTestAPI.AudioDestinationNode;
  global.AudioListener = WebAudioTestAPI.AudioListener;
  global.AudioNode = WebAudioTestAPI.AudioNode;
  global.AudioParam = WebAudioTestAPI.AudioParam;
  global.AudioProcessingEvent = WebAudioTestAPI.AudioProcessingEvent;
  global.BiquadFilterNode = WebAudioTestAPI.BiquadFilterNode;
  global.ChannelMergerNode = WebAudioTestAPI.ChannelMergerNode;
  global.ChannelSplitterNode = WebAudioTestAPI.ChannelSplitterNode;
  global.ConvolverNode = WebAudioTestAPI.ConvolverNode;
  global.DelayNode = WebAudioTestAPI.DelayNode;
  global.DynamicsCompressorNode = WebAudioTestAPI.DynamicsCompressorNode;
  global.GainNode = WebAudioTestAPI.GainNode;
  global.MediaElementAudioSourceNode = WebAudioTestAPI.MediaElementAudioSourceNode;
  global.MediaStreamAudioDestinationNode = WebAudioTestAPI.MediaStreamAudioDestinationNode;
  global.MediaStreamAudioSourceNode = WebAudioTestAPI.MediaStreamAudioSourceNode;
  global.OfflineAudioCompletionEvent = WebAudioTestAPI.OfflineAudioCompletionEvent;
  global.OfflineAudioContext = WebAudioTestAPI.OfflineAudioContext;
  global.OscillatorNode = WebAudioTestAPI.OscillatorNode;
  global.PannerNode = WebAudioTestAPI.PannerNode;
  global.PeriodicWave = WebAudioTestAPI.PeriodicWave;
  global.ScriptProcessorNode = WebAudioTestAPI.ScriptProcessorNode;
  global.WaveShaperNode = WebAudioTestAPI.WaveShaperNode;
};

WebAudioTestAPI.unuse = function() {
  global.AnalyserNode = WebAudioAPI.AnalyserNode;
  global.AudioBuffer = WebAudioAPI.AudioBuffer;
  global.AudioBufferSourceNode = WebAudioAPI.AudioBufferSourceNode;
  global.AudioContext = WebAudioAPI.AudioContext;
  global.AudioDestinationNode = WebAudioAPI.AudioDestinationNode;
  global.AudioListener = WebAudioAPI.AudioListener;
  global.AudioNode = WebAudioAPI.AudioNode;
  global.AudioParam = WebAudioAPI.AudioParam;
  global.AudioProcessingEvent = WebAudioAPI.AudioProcessingEvent;
  global.BiquadFilterNode = WebAudioAPI.BiquadFilterNode;
  global.ChannelMergerNode = WebAudioAPI.ChannelMergerNode;
  global.ChannelSplitterNode = WebAudioAPI.ChannelSplitterNode;
  global.ConvolverNode = WebAudioAPI.ConvolverNode;
  global.DelayNode = WebAudioAPI.DelayNode;
  global.DynamicsCompressorNode = WebAudioAPI.DynamicsCompressorNode;
  global.GainNode = WebAudioAPI.GainNode;
  global.MediaElementAudioSourceNode = WebAudioAPI.MediaElementAudioSourceNode;
  global.MediaStreamAudioDestinationNode = WebAudioAPI.MediaStreamAudioDestinationNode;
  global.MediaStreamAudioSourceNode = WebAudioAPI.MediaStreamAudioSourceNode;
  global.OfflineAudioCompletionEvent = WebAudioAPI.OfflineAudioCompletionEvent;
  global.OfflineAudioContext = WebAudioAPI.OfflineAudioContext;
  global.OscillatorNode = WebAudioAPI.OscillatorNode;
  global.PannerNode = WebAudioAPI.PannerNode;
  global.PeriodicWave = WebAudioAPI.PeriodicWave;
  global.ScriptProcessorNode = WebAudioAPI.ScriptProcessorNode;
  global.WaveShaperNode = WebAudioAPI.WaveShaperNode;
};

module.exports = WebAudioTestAPI;
