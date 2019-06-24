import Container from "./Container";
import KeysystemEl from "./KeySystemEl";
import { DATA_KS_DISABLE } from "../constants";
import { getParentBySelector } from "@/helpers";

export default class Group extends KeysystemEl {
  constructor(fact, el) {
    // el is current group
    super(fact, el);
  }

  get index() {
    return this.factory.screen.groups.findIndex(e => e.element === this.element);
  }

  get containers() {
    var containers = [];
    $(this.factory.containerSelector).each((index, container) => {
      if (this.factory.isContainer(container)) {
        containers.push(new Container(new Group(this.factory.screen, getParentBySelector(container, this.factory.groupSelector)), container));
      }
    });
    return containers;
  }

  // current container
  get container() {
    const container = $(this.element).find(this.factory.containerSelector);
    return new Container(this, this.factory.isContainer(container) ? container : null);
  }

  makeVisible() {}
}
