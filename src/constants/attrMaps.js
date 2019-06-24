import { parseElAttrArray, parseElAttrBoolean, parseElAttrString, parseElAttrNumber } from "@/helpers";
// prettier-ignore
export default [
    ["data-ks-key-next", "next", parseElAttrArray], 
    ["data-ks-key-prev", "prev", parseElAttrArray], 
    ["data-ks-disable-key-next", "disableNext", parseElAttrArray], 
    ["data-ks-disable-key-prev", "disablePrev", parseElAttrArray], 

    ["data-ks-key-next-container", "nextContainer", parseElAttrArray], 
    ["data-ks-key-prev-container", "prevContainer", parseElAttrArray],
    ["data-ks-disable-key-next-container", "disableNextContainer", parseElAttrArray], 
    ["data-ks-disable-key-prev-container", "disablePrevContainer", parseElAttrArray],

    ["data-ks-key-enter", "enter", parseElAttrArray],

    ["data-ks-circle-scroll", "circle", parseElAttrBoolean],
    ["data-ks-transition-timeout", "transition", parseElAttrNumber],
    ["data-ks-disable", "disable", parseElAttrBoolean],
    ["data-ks-href", "href", parseElAttrString],
    ["data-ks-href-target", "hrefTarget", parseElAttrString],
    ["data-ks-force-nearest", "forceNearest", parseElAttrBoolean],
    ["data-ks-disable-scroll-x", "disableScrollX", parseElAttrBoolean],
    ["data-ks-disable-scroll-y", "disableScrollY", parseElAttrBoolean],
    ["data-ks-keep", "keep", parseElAttrBoolean],
    ["data-ks-force-center", "center", parseElAttrBoolean],
    ["data-ks-disable-scroll-group-x", "disableScrollGroupX", parseElAttrBoolean],
    ["data-ks-disable-scroll-group-y", "disableScrollGroupY", parseElAttrBoolean]
];
