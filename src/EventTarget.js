import _ from "./utils";
import Inspector from "./utils/Inspector";
import WebAudioTestAPI from "./WebAudioTestAPI";

global.EventTarget = global.EventTarget || class EventTarget {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
};

export default class EventTarget extends _.preventSuper(global.EventTarget) {
  constructor() {
    super();
    this._listeners = {};
  }

  addEventListener(type, listener) {
    var inspector = new Inspector(this, "addEventListener", [
      { name: "type", type: "string" },
      { name: "listener", type: "function" },
    ]);

    inspector.validateArguments(arguments, function(msg) {
      throw new TypeError(inspector.form + "; " + msg);
    });

    this._listeners[type] = this._listeners[type] || /* istanbul ignore next */ [];
    this._listeners[type].push(listener);
  }

  removeEventListener(type, listener) {
    var inspector = new Inspector(this, "addEventListener", [
      { name: "type", type: "string" },
      { name: "listener", type: "function" },
    ]);

    inspector.validateArguments(arguments, function(msg) {
      throw new TypeError(inspector.form + "; " + msg);
    });

    this._listeners[type] = this._listeners[type] || /* istanbul ignore next */ [];
    var index = this._listeners[type].indexOf(listener);
    if (index !== -1) {
      this._listeners[type].splice(index, 1);
    }
  }

  dispatchEvent(event) {
    var inspector = new Inspector(this, "addEventListener", [
      { name: "event", type: "Event" },
    ]);

    inspector.validateArguments(arguments, function(msg) {
      throw new TypeError(inspector.form + "; " + msg);
    });

    var type = event.type;

    /* istanbul ignore else */
    if (typeof this["on" + type] === "function") {
      this["on" + type].call(this, event);
    }

    this.$listeners(type).forEach(function(listener) {
      listener.call(this, event);
    }, this);

    return true;
  }

  $listeners(type) {
    return (this._listeners[type] || /* istanbul ignore next */ []).slice();
  }
}

WebAudioTestAPI.EventTarget = EventTarget;
