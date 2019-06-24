import KeySystemFactory from "./KeySystemFactory";
import { parseElAttr, mergeAttr, mapKeyToFunction } from "@/helpers";
import defaultConfig from "../constants/defaultConfig";

export default class KeySystemInterface extends KeySystemFactory {
  constructor(config) {
    super(config);
    this.ksConfig = JSON.parse(JSON.stringify({ ...this.config }));
    this.ksConfigBk = JSON.parse(JSON.stringify({ ...this.config }));
  }

  init() {
    const { keyEvent, keyPress } = this.ksConfig.events;
    $(document).keydown(evt => {
      evt.preventDefault();
      this.ksConfig = JSON.parse(JSON.stringify({ ...this.ksConfigBk }));
      mergeAttr(this.ksConfig.propValues, parseElAttr(this.container.element));
      this.config = this.ksConfig;
      mapKeyToFunction(this, evt.keyCode);

      $(document).trigger(keyEvent, evt);
      $(this.item.element).trigger(keyPress, evt);
    });
  }

  switchItem(steps) {
    const { beforeSwitch, afterSwitch, beforeBlur, afterBlur, beforeFocus, afterFocus, beforeFocusContainer, afterFocusContainer } = defaultConfig.events;
    // prettier-ignore
    const { circle, keep, center, disableNext, disablePrev } = this.ksConfig.propValues;
    // if (disableNext.length && disablePrev.length) return false;
    // if (disableNext.length && steps > 0) return false;
    // if (disablePrev.length && steps < 0) return false;

    const items = this.container.items;

    const curItem = this.item;
    const curItemIndex = this.item.index;
    const nextItemIndex = curItemIndex + steps;

    const containers = this.group.containers;
    const curContainer = this.container.element;

    var nextItem = null;

    if (nextItemIndex < 0 && curContainer === containers[0].element && !circle) return;
    if (nextItemIndex >= items.length && curContainer === containers[containers.length - 1].element && !circle) return;
    // prettier-ignore
    if (nextItemIndex < 0) {
      if (!circle) { if (keep) return false; return this.switchContainer(-1); } 
      else nextItem = items[items.length - 1];
    }
    // prettier-ignore
    if (nextItemIndex >= items.length) {
      if (!circle) { if (keep) return false; return this.switchContainer(1); } 
      else nextItem = items[0];
    }

    if (nextItem === null) nextItem = items[Math.max(0, nextItemIndex)];
    if (center) nextItem.makeVisibleCenter();
    else nextItem.makeVisible();
    nextItem.focus();
    $(curItem.element).trigger(beforeBlur);
    $(curItem.element).trigger(afterBlur);
    $(nextItem.element).trigger(beforeFocus);
    $(nextItem.element).trigger(afterFocus);
    $(curContainer).trigger(beforeFocusContainer);
    $(curContainer).trigger(afterFocusContainer);
    $(document).trigger(beforeSwitch, $(curItem.element));
    $(document).trigger(afterSwitch, $(nextItem.element));
  }

  switchContainer(steps) {
    const { beforeSwitchContainer, afterSwitchContainer, beforeBlurContainer, afterBlurContainer, beforeFocusContainer, afterFocusContainer } = defaultConfig.events;
    const containers = this.group.containers;
    const curContainer = this.container.element;
    var curContainerIndex = this.container.index;
    var nextContainerIndex = curContainerIndex + steps;

    if (nextContainerIndex < 0) return false;
    if (nextContainerIndex >= containers.length) return false;
    var nextContainer = containers[nextContainerIndex];
    nextContainer.focus();
    nextContainer.makeVisible();

    $(curContainer).trigger(beforeBlurContainer);
    $(curContainer).trigger(afterBlurContainer);
    $(nextContainer).trigger(beforeFocusContainer);
    $(nextContainer).trigger(afterFocusContainer);
    $(document).trigger(beforeSwitchContainer, $(curContainer));
    $(document).trigger(afterSwitchContainer, $(nextContainer));
  }
}
