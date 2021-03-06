import * as util from "./util";
import Enumerator from "./util/Enumerator";
import AudioNode from "./AudioNode";
import AudioBuffer from "./AudioBuffer";
import AudioProcessingEvent from "./AudioProcessingEvent";

export default class ScriptProcessorNode extends AudioNode {
  constructor(admission, context, bufferSize, numberOfInputChannels = 2, numberOfOutputChannels = 2) {
    super(admission, {
      name: "ScriptProcessorNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: numberOfInputChannels,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    this._.inspector.describe("constructor", (assert) => {
      let enumBufferSize = new Enumerator([
        256, 512, 1024, 2048, 4096, 8192, 16384,
      ]);

      assert(enumBufferSize.contains(bufferSize), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(bufferSize, "bufferSize", enumBufferSize.toString())}
        `);
      });

      assert(util.isPositiveInteger(numberOfInputChannels), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(numberOfInputChannels, "numberOfInputChannels", "positive integer")}
        `);
      });

      assert(util.isPositiveInteger(numberOfOutputChannels), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(numberOfOutputChannels, "numberOfOutputChannels", "positive integer")}
        `);
      });
    });

    this._.bufferSize = bufferSize;
    this._.onaudioprocess = null;
    this._.numberOfInputChannels = numberOfInputChannels;
    this._.numberOfOutputChannels = numberOfOutputChannels;
    this._.numSamples = 0;
  }

  get bufferSize() {
    return this._.bufferSize;
  }

  set bufferSize(value) {
    this._.inspector.describe("bufferSize", (assert) => {
      assert.throwReadOnlyTypeError(value, "bufferSize");
    });
  }

  get onaudioprocess() {
    return this._.onaudioprocess;
  }

  set onaudioprocess(value) {
    this._.inspector.describe("onaudioprocess", (assert) => {
      assert(util.isNullOrFunction(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "onaudioprocess", "function")}
        `);
      });
    });

    this._.onaudioprocess = value;
  }

  _process(inNumSamples) {
    this._.numSamples -= inNumSamples;

    if (this._.numSamples <= 0) {
      this._.numSamples += this.bufferSize;

      let event = util.immigration.apply(admission =>
        new AudioProcessingEvent(admission, this)
      );

      event.playbackTime = this.context.currentTime + this.bufferSize / this.context.sampleRate;
      event.inputBuffer = util.immigration.apply(admission =>
        new AudioBuffer(admission, this.context, this._.numberOfInputChannels, this.bufferSize, this.context.sampleRate)
      );
      event.outputBuffer = util.immigration.apply(admission =>
        new AudioBuffer(admission, this.context, this._.numberOfOutputChannels, this.bufferSize, this.context.sampleRate)
      );

      this.dispatchEvent(event);
    }
  }
}
