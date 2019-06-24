import Item from "./Item";
import KeysystemEl from "./KeySystemEl";
import Group from "./Group";
import { getParentBySelector, parseElAttr } from "@/helpers";
import Boundary from "./Boundary";
import {
  DATA_KS_DISABLE,
  DATA_KS_FORCE_NEAREST,
  BEFORE_BLUR_CONTAINER_EVENT,
  AFTER_BLUR_CONTAINER_EVENT,
  BEFORE_FOCUS_CONTAINER_EVENT,
  AFTER_FOCUS_CONTAINER_EVENT,
  BEFORE_SWITCH_CONTAINER_EVENT,
  AFTER_SWITCH_CONTAINER_EVENT
} from "../constants";

export default class Container extends KeysystemEl {
  constructor(fact, el) {
    super(fact, el);
    this.curMargin = 0;
  }

  get index() {
    return this.factory.group.containers.findIndex(el => el.element === this.element);
  }

  get boundary() {
    return new Boundary(this, $(this.element).find("> " + this.factory.boundarySelector));
  }

  get group() {
    return this.owner;
  }

  get item() {
    const item = $(this.element).find(this.factory.itemSelector + this.factory.focusSelector);
    return new Item(this, item);
  }

  get items() {
    var items = [];
    $(this.element)
      .find(this.factory.itemSelector)
      .each((index, item) => {
        const group = new Group(this.factory.screen, getParentBySelector(item, this.factory.groupSelector));
        const container = new Container(group, getParentBySelector(item, this.factory.containerSelector));
        if (this.factory.isItem(item)) items.push(new Item(container, item));
      });
    return items;
  }

  get nearest() {
    const curItem = this.factory.item;
    const items = this.items;
    const itemsMiddle = [];
    const itemsLeft = [];
    const itemsRight = [];
    $.each(items, function(index, item) {
      if (item.left + item.width > curItem.left && item.left < curItem.left + curItem.width) itemsMiddle.push(item);
      if (item.left + item.width <= curItem.left) itemsLeft.push(item);
      if (item.left >= curItem.left + curItem.width) itemsRight.push(item);
    });

    if (itemsMiddle.length !== 0) {
      var itemSelected = [];
      $.each(itemsMiddle, function(index, item) {
        if (item.left >= curItem.left && item.left + item.width <= curItem.left + curItem.width) {
          itemSelected.push(item);
        }
      });
      if (itemSelected.length !== 0) return new Item(this, $(itemSelected[0].element));
      if (itemsMiddle.length === 1) return new Item(this, $(itemsMiddle[0].element));
      // prettier-ignore
      const lDistance = itemsMiddle[0].left + itemsMiddle[0].width -curItem.left;
      const rDistance = itemsMiddle[itemsMiddle.length - 1].left - curItem.left - curItem.width;
      if (Math.abs(lDistance) >= Math.abs(rDistance)) return new Item(this, $(itemsMiddle[itemsMiddle.length - 1].element));
      else return new Item(this, $(itemsMiddle[0].element));
    }
  }

  focus() {
    const { activeContainer, activeItem, focus } = this.factory.config.classNames;

    const curItem = this.factory.item.element;
    const curContainer = this.factory.container.element;

    $(curContainer).removeClass(activeContainer);

    const forceNearestAttr = parseElAttr(this.element).forceNearest;
    // const forceNearestAttr = false;
    if (forceNearestAttr) {
      if (this.item.element) this.item.blur();
      $(this.nearest.element).addClass(`${activeItem} ${focus}`);
    } else {
      this.item.element ? $(this.item.element).addClass(activeItem) : $(this.items[0].element).addClass(`${activeItem} ${focus}`);
    }
    $(curItem).removeClass(activeItem);
    $(this.element).addClass(activeContainer);
  }

  originParentOffset(el) {
    return $(el)
      .parent()
      .offset().top;
  }

  makeVisible() {
    if (this.factory.screen.element === undefined || this.group === undefined) return false;
    const { beforeScrollContainer, afterScrollContainer } = this.factory.config.events;

    const group = this.group;

    const body = $("body");
    const bodyOffset = body.offset();

    const screen = this.factory.screen;
    $(screen.element).css({ position: "relative" });

    var y = 0;
    var x = 0;

    if (group.top + group.height > bodyOffset.top + body.outerHeight()) {
      y = bodyOffset.top + body.outerHeight() - (group.top + group.height);
    } else if (group.top < bodyOffset.top) {
      y = bodyOffset.top - group.top;
    }
    if (group.left + group.width > bodyOffset.left + body.outerWidth()) {
      // x = bodyOffset.left + screen.width - (group.left + group.width);
      x = bodyOffset.left - group.left;
    } else if (group.left < bodyOffset.left) {
      x = bodyOffset.left - group.left;
    }

    var cssObj = {};

    const disableScrollGroupX = parseElAttr(group.element).disableScrollGroupX;
    const disableScrollGroupY = parseElAttr(group.element).disableScrollGroupY;

    if (disableScrollGroupY) y = 0;
    if (disableScrollGroupX) x = 0;

    if (y) {
      y += screen.top - bodyOffset.top - this.originParentOffset(screen.element);
      cssObj.top = y + "px";

      $(group.element).trigger(beforeScrollContainer, this.curMargin);
      $(group.element).trigger(afterScrollContainer, y);
      $(document).trigger(beforeScrollContainer, this.curMargin);
      $(document).trigger(afterScrollContainer, y);
      this.curMargin = y;
    }

    if (x) {
      x += screen.left - bodyOffset.left;
      cssObj.left = x + "px";

      $(group.element).trigger(beforeScrollContainer, this.curMargin);
      $(group.element).trigger(afterScrollContainer, x);
      $(document).trigger(beforeScrollContainer, this.curMargin);
      $(document).trigger(afterScrollContainer, x);
      this.curMargin = x;
    }

    const transition = parseElAttr(this.element).transition;

    if (transition !== 0) {
      if (cssObj) {
        $(screen.element)
          .stop()


          
          .animate(cssObj, parseInt(transition) || 300, function() {
            console.log("CONTAINER ANIMATION COMPLE TE ");
          });
      }
    } else {
      $(screen.element).css(cssObj);
    }
  }
}
