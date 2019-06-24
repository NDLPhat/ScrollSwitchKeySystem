import Group from "./Group";
import KeysystemEl from "./KeysystemEl";

export default class Screen extends KeysystemEl {
  constructor(fact, el) {
    // el is a screen
    super(fact, el);
  }

  get groups() {
    var groups = [];
    $(this.factory.groupSelector).each((index, group) => {
      if (this.factory.isGroup(group)) {
        groups.push(new Group(this, group));
      }
    });
    return groups;
  }

  get group() {
    return this.factory.group;
  }
}
