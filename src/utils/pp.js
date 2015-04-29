import article from "./article";

export default function pp(value) {
  if (!value) {
    return String(value);
  }
  var type = typeof value;

  if (type === "number" || type === "boolean") {
    return String(value);
  }

  if (type === "string") {
    return `'${value}'`;
  }

  if (Array.isArray(value)) {
    return `[ ${value.map(pp).join(", ")} ]`;
  }

  if (value.constructor === {}.constructor) {
    return "{ " + Object.keys(value).map((key) => {
      return key + ": " + pp(value[key]);
    }).join(", ") + "}";
  }

  let name = value.constructor.name || Object.prototype.toString.call(value).slice(8, -1);

  return `${article(name)} ${name}`;
}
