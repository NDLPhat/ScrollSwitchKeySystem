export default class Key {
  constructor(keyList, key) {
    this.keyList = keyList;
    this.key = key;
  }
  checkMap() {
    if (this.key === "" || this.keyList.disable === [] || this.keyList.disable === undefined) return false;
    var differKey = this.keyList.key.filter(obj => this.keyList.disable.indexOf(obj) === -1);
    return differKey.some(item => parseInt(item) === this.key);
  }
}
