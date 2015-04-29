import name from "./name";

export default function toJSON(node, func, memo) {
  var result;

  memo = memo || [];

  if (memo.indexOf(node) !== -1) {
    return `<circular:${name(node)}>`;
  }
  memo.push(node);

  result = func(node, memo);

  memo.pop();

  return result;
}
