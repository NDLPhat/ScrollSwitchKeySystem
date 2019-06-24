import KeySystemFactory from "./KeySystemFactory";

const OWNER = Symbol("owner");
const ELE = Symbol("element");
const FACT = Symbol("factory");

export default class KeysystemEl {
  constructor(owner, el) {
    this[ELE] = el;
    this[OWNER] = owner;
    if (owner instanceof KeySystemFactory) {
      this[FACT] = owner;
    } else {
      this[FACT] = owner.factory;
    }
  }

  get factory() {
    return this[FACT];
  }

  get owner() {
    return this[OWNER];
  }

  get element() {
    return $(this[ELE]).get(0);
  }

  get left() {
    return $(this.element).offset().left;
  }

  get right() {
    return this.left + this.width;
  }

  get top() {
    return $(this.element).offset().top;
  }

  get width() {
    return $(this.element).outerWidth();
  }

  get height() {
    return $(this.element).outerHeight();
  }
}
