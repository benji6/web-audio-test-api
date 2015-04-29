import argsCheck from "./argsCheck";
import formatter from "./formatter";
import nth from "./nth";

export default class Inspector {
  constructor(instance, methodName, argsInfo) {
    this.instance = instance;
    this.argsInfo = argsInfo;
    this.form = formatter.methodForm(instance, methodName, argsInfo);
  }

  validateArguments(args, callback) {
    let errIndex = argsCheck(args, this.argsInfo.map(info => info.type));
    let msg = "";
    if (errIndex !== -1) {
      msg += `the ${nth(errIndex)} argument `;
      msg += formatter.shouldBeButGot(this.argsInfo[errIndex].type, args[errIndex]);
      callback.call(this.instance, msg);
    }
    this.argsInfo.forEach((info, index) => {
      let msg = info.validate && info.validate.call(this.instance, args[index], this.argsInfo[index].name);
      if (msg) {
        callback.call(this.instance, msg);
      }
    });
  }

  assert(test, callback) {
    if (!test) {
      callback.call(this.instance);
    }
  }
}
