export default function article(str) {
  return (/[aeiou]/i.test(str.charAt(0)) ? "an" : "a");
}
