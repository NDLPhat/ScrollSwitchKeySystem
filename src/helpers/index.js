// import { DATA_KS_DISABLE } from "../constants";
import map from "@/constants/attrMaps";
import defaultConfig from "@/constants/defaultConfig";
import Key from "./key";
import Item from "@/lib/Item";
import { keysystem } from "@/keysystem";

export function mergeConfig(defaultConfig, config) {
  return Object.assign({}, defaultConfig, config);
}

export function mergeAttr(defaultAttr, attr) {
  Object.keys(defaultAttr).map(key => {
    defaultAttr[key] = attr[key] || defaultAttr[key];
  });
  return defaultAttr;
}

export function getParentBySelector(el, selector) {
  var parent = $(el).parent();
  if ($(parent).get(0) === document.body) return null;
  if ($(parent).is(selector)) return parent;
  return getParentBySelector(parent, selector);
}

export function parseElAttrArray(el, keyName) {
  var attr = $(el).attr(keyName);
  if (attr) {
    var segs = attr.split(",");
    return segs.map(v => Number.parseInt(v));
  }
  return null;
}

export function parseElAttrNumber(el, keyName) {
  var attr = $(el).attr(keyName);
  if (attr !== undefined) return Number.parseInt(attr);
  return null;
}

export function parseElAttrBoolean(el, keyName) {
  var attr = $(el).attr(keyName);
  if (attr !== undefined) return true;
  return null;
}

export function parseElAttrString(el, keyName) {
  var attr = $(el).attr(keyName);
  if (attr !== undefined) return attr;
  return null;
}

export function parseElAttr(el) {
  var props = {};
  map.forEach(r => {
    var [keyName, target, parser] = r;
    var value = parser(el, keyName);
    props[target] = value;
  });
  return props;
}

export function mapKeyToFunction(factory, keyPress) {
  const { next, disableNext, prev, disablePrev, nextContainer, disableNextContainer, prevContainer, disablePrevContainer, enter } = factory.ksConfig.propValues;
  // prettier-ignore
  const keyChecks = [
    { key: prev, disable: disablePrev, callback: () => factory.switchItem(-1) },
    { key: next, disable: disableNext, callback: () => factory.switchItem(1) },
    { key: prevContainer, disable: disablePrevContainer, callback: () => factory.switchContainer(-1) },
    { key: nextContainer, disable: disableNextContainer, callback: () => factory.switchContainer(1) },
    {
      key: enter,
      disable: [],
      callback: () => {
        factory.item.action();
      }
    }
  ];
  for (var i = 0; i < keyChecks.length; i++) {
    const key = new Key(keyChecks[i], keyPress);
    if (key.checkMap()) {
      keyChecks[i].callback();
      break;
    }
  }
  // keyChecks.filter((keyCheck, index) => {
  //   console.log(keyCheck, "keyCheck");
  //   const key = new Key(keyCheck, keyPress);
  //   key.checkMap() ? console.log("MAP HERE: ", index) : "";
  // });
}
