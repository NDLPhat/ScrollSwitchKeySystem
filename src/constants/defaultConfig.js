export default {
  classNames: {
    screen: "screen",
    group: "group",
    container: "container",
    activeContainer: "active1",
    boundary: "boundary",
    item: "item",
    activeItem: "active",
    focus: "focus"
  },

  propNames: {
    keyNext: "data-ks-key-next",
    keyPrev: "data-ks-key-prev",
    keyNextContainer: "data-ks-key-next-container",
    keyPrevContainer: "data-ks-key-prev-container",
    keyEnter: "data-ks-key-enter",

    disableKeyNext: "data-ks-disable-key-next",
    disableKeyPrev: "data-ks-disable-key-prev",
    disableKeyNextContainer: "data-ks-disable-key-next-container",
    disableKeyPrevContainer: "data-ks-disable-key-prev-container",

    circle: "data-ks-circle-scroll",
    transition: "data-ks-transition-timeout",
    disable: "data-ks-disable",
    href: "data-ks-href",
    hrefTarget: "data-ks-href-target",
    forceNearest: "data-ks-force-nearest",
    disableScrollX: "data-ks-disable-scroll-x",
    disableScrollY: "data-ks-disable-scroll-y",
    keep: "data-ks-keep",
    center: "data-ks-force-center",
    disableScrollGroupX: "data-ks-disable-scroll-group-x",
    disableScrollGroupY: "data-ks-disable-scroll-group-y"
  },

  propValues: {
    next: [39],
    prev: [37],
    nextContainer: [40],
    prevContainer: [38],
    enter: [13],

    disableNext: [],
    disablePrev: [],
    disableNextContainer: [],
    disablePrevContainer: [],

    circle: false,
    transition: 0,
    disable: false,
    disableScrollX: false,
    disableScrollY: false,
    disableScrollGroupX: false,
    disableScrollGroupY: false,
    href: "",
    hrefTarget: "_blank",
    forceNearest: false,
    keep: false,
    center: false
  },

  events: {
    beforeSwitch: "ks:before_switch",
    afterSwitch: "ks:after_switch",
    beforeBlur: "ks:before_blur",
    afterBlur: "ks:after_blur",
    beforeFocus: "ks:before_focus",
    afterFocus: "ks:after_focus",

    beforeSwitchContainer: "ks:before_switch_container",
    afterSwitchContainer: "ks:after_switch_container",
    beforeBlurContainer: "ks:before_blur_container",
    afterBlurContainer: "ks:after_blur_container",
    beforeFocusContainer: "ks:before_focus_container",
    afterFocusContainer: "ks:after_focus_container",

    keyEvent: "ks:key",
    keyPress: "ks:keypress",

    beforeScroll: "ks:before_scroll",
    afterScroll: "ks:after_scroll",

    beforeScrollContainer: "ks:before_scroll_container",
    afterScrollContainer: "ks:after_scroll_container"
  }
};
