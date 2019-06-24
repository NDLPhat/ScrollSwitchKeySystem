import KeySystemEl from "./KeySystemEl";
import { getParentBySelector } from "@/helpers";
export default class Boundary extends KeySystemEl {
  constructor(fact, el) {
    // el is a boundary
    super(fact, el);
  }

  get width() {
    const itemLast = $(this.element)
      .find(this.factory.itemSelector)
      .sort((a, b) => a.offsetLeft < b.offsetLeft)
      .last();
    return itemLast.offset().left + itemLast.outerWidth() - this.left;
  }

  get height() {
    const itemLast = $(this.element)
      .find(this.factory.itemSelector)
      .sort((a, b) => a.offsetTop < b.offsetTop)
      .last();
    return itemLast.offset().top + itemLast.outerHeight() - $(this.element).offset().top;
  }
}
