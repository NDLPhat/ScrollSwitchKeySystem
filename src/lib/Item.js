import KeysystemEl from "./KeysystemEl";
import {
  DATA_KS_DISABLE,
  DATA_KS_HREF,
  DATA_KS_HREF_TARGET,
  BEFORE_SCROLL_EVENT,
  AFTER_SCROLL_EVENT,
  BEFORE_SCROLL_CONTAINER_EVENT,
  AFTER_SCROLL_CONTAINER_EVENT,
  BEFORE_FOCUS_SCROLL_EVENT,
  AFTER_FOCUS_SCROLL_EVENT,
  BEFORE_BLUR_EVENT,
  AFTER_BLUR_EVENT,
  BEFORE_FOCUS_EVENT,
  AFTER_FOCUS_EVENT,
  BEFORE_FOCUS_CONTAINER_EVENT,
  AFTER_FOCUS_CONTAINER_EVENT,
  BEFORE_SWITCH_EVENT,
  AFTER_SWITCH_EVENT
} from "../constants";

export default class Item extends KeysystemEl {
  constructor(fact, el) {
    super(fact, el);
    this.curMargin = 0;
  }

  get index() {
    var items = [];
    this.container.items.map(item => {
      items.push(item.element);
    });
    return items.indexOf(this.element);
  }

  get container() {
    return this.owner;
    // const group = new Group(this.factory.screen, getParentBySelector(this.element, this.factory.groupSelector));
    // return new Container(group, getParentBySelector(this.element, this.factory.containerSelector));
  }

  focus() {
    const { activeItem, focus } = this.factory.config.classNames;
    $(this.factory.item.element).removeClass(`${activeItem} ${focus}`);
    $(this.element).addClass(`${activeItem} ${focus}`);
  }

  blur() {
    const { activeItem, focus } = this.factory.config.classNames;
    $(this.element).removeClass(`${activeItem} ${focus}`);
  }

  action() {
    const { href, hrefTarget } = this.factory.config.propNames;
    const hrefValue = $(this.element).attr(href);
    var href_selfValue = $(this.element).attr(hrefTarget);
    if (hrefValue !== undefined) window.open(hrefValue, href_selfValue || "_blank");
  }

  makeVisible() {
    if (!this.factory.isItem(this.element)) return false;
    const { disableScrollX, disableScrollY, transition } = this.factory.config.propValues;
    const { beforeScroll, afterScroll } = this.factory.config.events;

    const boundary = this.container.boundary;
    const container = this.container;

    var x = 0;
    var y = 0;

    if (this.left < container.left) {
      x = container.left - this.left;
    } else if (container.left + container.width < this.left + this.width) {
      x = container.left + container.width - this.left - this.width;
    }

    var cssObj = {};
    if (x) {
      x += boundary.left - container.left;
      cssObj.marginLeft = x + "px";

      // trigger event for x
      $(boundary.element).trigger(beforeScroll, this.curMargin);
      $(boundary.element).trigger(afterScroll, x);
      $(document).trigger(beforeScroll, this.curMargin);
      $(document).trigger(afterScroll, x);
      this.curMargin = x;
    }

    if (this.top + this.height > container.top + container.height) {
      y = (this.top + this.height - (container.top + container.height)) * -1;
    } else if (container.top > this.top) {
      y = container.top - this.top;
    }

    if (y) {
      y += boundary.top - container.top;
      cssObj.marginTop = y + "px";

      // // trigger event for y
      $(boundary.element).trigger(beforeScroll, this.curMargin);
      $(boundary.element).trigger(afterScroll, y);
      $(document).trigger(beforeScroll, this.curMargin);
      $(document).trigger(afterScroll, y);
      this.curMargin = y;
    }

    if (disableScrollX) cssObj.marginLeft = 0;
    if (disableScrollY) cssObj.marginTop = 0;

    if (transition !== 0) {
      if (cssObj.marginLeft || cssObj.marginTop) {
        $(boundary.element)
          .stop()
          .animate(cssObj, parseInt(transition) || 300, function() {});
      }
    } else {
      $(boundary.element).css(cssObj);
    }
  }

  makeVisibleCenter() {
    const { disableScrollX, disableScrollY, transition } = this.factory.config.propValues;
    const { beforeScroll, afterScroll } = this.factory.config.events;
    const boundary = this.container.boundary;
    const container = this.container;

    var x = 0;

    x = container.left + container.width / 2 - this.left - this.width / 2;
    const bWidth = boundary.width;
    var cssObj = {};

    if (x) {
      x += boundary.left - container.left;
      if (x > 0) {
        x = 0;
      } else if (x + bWidth < container.width) {
        x += container.width - x - bWidth;
      }
      console.log(x, container.left + container.width - bWidth, boundary.left, "center");
      x = Math.min(0, Math.max(x, container.width - bWidth));
      cssObj.marginLeft = x + "px";

      // trigger event for x
      $(boundary.element).trigger(beforeScroll, this.curMargin);
      $(boundary.element).trigger(afterScroll, x);
      $(document).trigger(beforeScroll, this.curMargin);
      $(document).trigger(afterScroll, x);
      this.curMargin = x;
    }

    if (disableScrollX) cssObj.marginLeft = 0;
    if (disableScrollY) cssObj.marginTop = 0;

    if (transition) {
      if (cssObj.marginLeft || cssObj.marginTop) {
        $(boundary.element)
          .stop()
          .animate(cssObj, parseInt(transition) || 300, function() {});
      }
    } else {
      // cssObj.transition = "all .3s";
      $(boundary.element).css(cssObj);
    }
  }
}
