import typeCheck from "./typeCheck";

export default function argsCheck(args, types) {
  types = types.filter((type, index) => {
    return !(/^optional/.test(type) && args.length <= index);
  });

  types = types.map((type) => {
    return type.replace(/^optional\s*/, "");
  });

  for (let i = 0, imax = types.length; i < imax; i++) {
    if (!typeCheck(args[i], types[i])) {
      return i;
    }
  }

  return -1;
}
