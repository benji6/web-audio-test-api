import _ from "./utils";
import WebAudioTestAPI from "./WebAudioTestAPI";
import AudioNode from "./AudioNode";
import AudioBuffer from "./AudioBuffer";
import AudioProcessingEvent from "./AudioProcessingEvent";

export default class ScriptProcessorNode extends AudioNode {
  constructor(admission, context, bufferSize, numberOfInputChannels, numberOfOutputChannels) {
    super(admission, context, {
      name: "ScriptProcessorNode",
      numberOfInputs  : 1,
      numberOfOutputs : 1,
      channelCount    : numberOfInputChannels,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    let onaudioprocess = null;

    _.defineAttribute(this, "numberOfInputChannels", "readonly", numberOfInputChannels, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "numberOfOutputChannels", "readonly", numberOfOutputChannels, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "bufferSize", "readonly", bufferSize, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });
    _.defineAttribute(this, "onaudioprocess", "function|null", onaudioprocess, (msg) => {
      throw new TypeError(_.formatter.concat(this, msg));
    });

    this._numSamples = 0;
  }

  _process(inNumSamples) {
    this._numSamples -= inNumSamples;

    if (this._numSamples <= 0) {
      this._numSamples += this.bufferSize;

      let event = _.immigration.apply(admission =>
        new AudioProcessingEvent(admission, this)
      );

      event.playbackTime = this.context.currentTime + this.bufferSize / this.context.sampleRate;
      event.inputBuffer = _.immigration.apply(admission =>
        new AudioBuffer(admission, this.context, this.numberOfInputChannels, this.bufferSize, this.context.sampleRate)
      );
      event.outputBuffer = _.immigration.apply(admission =>
        new AudioBuffer(admission, this.context, this.numberOfOutputChannels, this.bufferSize, this.context.sampleRate)
      );

      this.dispatchEvent(event);
    }
  }
}

WebAudioTestAPI.ScriptProcessorNode = ScriptProcessorNode;
