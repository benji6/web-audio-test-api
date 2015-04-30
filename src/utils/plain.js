import pp from "./pp";

export default function plain(strings, ...values) {
  let msg = strings[0];

  for (let i = 0; i < values.length; i++) {
    msg += pp(values[i]) + strings[i + 1];
  }

  return msg.trim().replace(/\s+/g, " ");
}
