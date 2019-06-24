// import { initialPara, this.config.propNames.disable } from "@/constants";
import defaultConfig from "@/constants/defaultConfig";
import { checkParentExist, mergeAttr, parseElAttr, getParentBySelector } from "@/helpers";
import Screen from "./Screen";
import $ from "jquery";
import Item from "./Item";
import Group from "./Group";
import Container from "./Container";

export default class KeySystemFactory {
  constructor(config) {
    this.config = JSON.parse(JSON.stringify(Object.assign({}, defaultConfig, config)));
  }

  get screenSelector() {
    return "." + this.config.classNames.screen;
  }

  get groupSelector() {
    return "." + this.config.classNames.group;
    // return `.${this.config.groupClass}:not(.${this.config.propNames.disable})`;
  }

  get containerSelector() {
    return `.${this.config.classNames.container}:not(.${this.config.propNames.disable})`;
  }

  get boundarySelector() {
    return "." + this.config.classNames.boundary;
  }

  get itemSelector() {
    return `.${this.config.classNames.item}:not(.${this.config.propNames.disable})`;
  }

  get activeSelector() {
    return `.${this.config.classNames.item}` + `.${this.config.classNames.activeItem}`;
  }

  get focusSelector() {
    return `.${this.config.classNames.focus}`;
  }

  isScreen(el) {
    return $(el).get(0) === this.screen.element;
  }

  isGroup(el) {
    return $(el).is(this.screenSelector + " " + this.groupSelector);
  }

  isBoundary(el) {
    return $(el).is(this.containerSelector + ">" + this.boundarySelector);
  }

  isContainer(el) {
    return $(el).is(`${this.containerSelector}`) && $(el).find(`${this.itemSelector}`).length > 0 && $(el).attr(this.config.propNames.disable) === undefined;
  }

  isItem(el) {
    return $(el).is(this.containerSelector + " " + this.itemSelector) && $(el).attr(this.config.propNames.disable) === undefined;
  }

  get screen() {
    const el = $(this.screenSelector);
    return new Screen(this, el);
  }

  get group() {
    return this.item.container.group;
  }

  get container() {
    return this.item.container;
  }

  get boundary() {
    return this.item.container.boundary;
  }

  get item() {
    const el = $(this.activeSelector);
    const containerEl = getParentBySelector(el, this.containerSelector);
    const groupEl = getParentBySelector(containerEl, this.groupSelector);

    var screen = this.screen;
    var group = new Group(screen, groupEl);
    var container = new Container(group, containerEl);

    return new Item(container, el);
  }
}
