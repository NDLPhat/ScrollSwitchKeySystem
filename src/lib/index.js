import KeySystemFactory from "./KeySystemFactory";

export default function keysystemInit(config) {
  return new KeySystemFactory(config);
}

// import { parseElAttr, mergeAttr } from "@/helpers";
// import defaultConfig from "@/constants/defaultConfig";
// import Key from "../helpers/key";

// const config = {
//   classNames: {
//     screen: "screen",
//     group: "group",
//     container: "container",
//     activeContainer: "active1",
//     boundary: "boundary",
//     item: "item",
//     activeItem: "active",
//     focus: "focus"
//   }
// };

// var factory = new KeySystemFactory(config);
// console.log(factory.container.boundary.width);

// var attrs = Object.assign({}, defaultConfig.propValues, parseElAttr(factory.group.container.element));

// console.log(factory.container.item, attrs, "<==");
// console.log(factory.container.items.pop(), "factory.container.items");

// var i = factory.container.items.length - 1;
// console.log(factory.group.containers);
// console.log(factory.group.containers[0].focus());

// console.log(factory.group.containers[3].focus());
// factory.container.items[i].makeVisibleCenter();
// factory.container.items[i].focus();
// factory.container.items[3].focus();
// factory.group.containers[0].focus();
// factory.group.containers[1].focus();
// console.log(factory.boundary.width, factory.group);

// console.log(factory.screen.group, "<==");
// console.log(factory.container.items[6].index, "<==");

// function switchItem(){
//   const { data_ks_force_center, data_ks_circle_scroll, activeItemClass, focus, data_ks_not_move_next_container } = this.factory.config;
// }

// function init(inopts) {
//   var factory = new KeySystemFactory(inopts);
//   // backup default value
//   // var optionBK = { ...option };
//   $(window).keydown(evt => {
//     evt.preventDefault();
//     var attrs = Object.assign({}, defaultConfig.propValues, parseElAttr(factory.group.container.element));

//     console.log(parseElAttr(factory.group.container.element));

//     const { href, next, prev, nextContainer, prevContainer, enter } = factory.config.propValues;

//     const KeyPrev = new Key(prev, evt.keyCode);
//     const KeyNext = new Key(next, evt.keyCode);
//     const KeyPrevContainer = new Key(prevContainer, evt.keyCode);
//     const KeyNextContainer = new Key(nextContainer, evt.keyCode);
//     const KeyEnter = new Key(enter, evt.keyCode);

//     if (KeyPrev.checkMap()) {
//       switchItem(-1);
//     } else if (KeyNext.checkMap()) {
//       switchItem(1);
//     } else if (KeyPrevContainer.checkMap()) {
//       switchContainer(-1);
//     } else if (KeyNextContainer.checkMap()) {
//       switchContainer(1);
//     } else if (KeyEnter.checkMap()) {
//       if (href !== undefined) {
//         console.log("HREF - Enter");
//         // actionItemEl();
//       } else {
//         // $(document).trigger(KEYENTER_EVENT);
//       }
//     }
//   });
// }
// init();
