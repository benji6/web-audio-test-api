function _typeCheck(value, type) {
  switch (type) {
  case "boolean":
    return typeof value === "boolean";
  case "function":
    return typeof value === "function";
  case "number":
    return typeof value === "number" && !isNaN(value);
  case "string":
    return typeof value === "string";
  case "null":
    return value === null;
  }

  if (/[A-Z]/.test(type.charAt(0)) && typeof global[type] === "function") {
    return value instanceof global[type];
  }

  var matches = /^enum\s*{(.*?)}$/.exec(type);
  if (matches) {
    return enumCheck(value, matches[1].split(",").map(item => item.trim()));
  }

  return false;
}

function enumCheck(value, items) {
  return items.some(function(item) {
    if (/^\d+$/.test(item)) {
      return value === +item;
    }
    return value === item;
  });
}

export default function typeCheck(value, type) {
  return type.split("|").some(type => _typeCheck(value, type.trim()));
}
