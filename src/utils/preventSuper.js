export default function preventSuper(superClass) {
  if (!superClass) {
    superClass = () => {};
  }
  function ctor() {}
  ctor.prototype = Object.create(superClass.prototype, {
    constructor: { value: ctor, enumerable: false, writable: true, configurable: true },
  });
  return ctor;
}
