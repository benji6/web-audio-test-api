import typeCheck from "./typeCheck";
import formatter from "./formatter";

export default function defineAttribute(instance, name, type, value, callback) {
  let spec = { enumerable: true };

  if (typeof value === "function") {
    type = "readonly";
    spec.get = value;
  } else {
    spec.get = () => value;
  }

  if (type === "readonly") {
    spec.set = () => {
      callback.call(instance, name + " is readonly");
    };
  } else {
    spec.set = (newValue) => {
      if (!typeCheck(newValue, type)) {
        callback.call(instance, `${name} ${formatter.shouldBeButGot(type, newValue)}`);
      } else {
        value = newValue;
      }
    };
  }

  Object.defineProperty(instance, name, spec);
}
