/**
 * Comparator helper
 * function returns a boolean based on the comparison result
 * @type {{"<=": (function(*, *): boolean), "<": (function(*, *): boolean), ">": (function(*, *): boolean), ">=": (function(*, *): boolean)}}
 * @return {boolean}
 */
const comparator = {
    "<": function (a, b) {
        return a < b;
    },
    "<=": function (a, b) {
        return a <= b;
    },
    ">": function (a, b) {
        return a > b;
    },
    ">=": function (a, b) {
        return a >= b;
    },
};

/**
 * Is input value window object
 * check if the input value is a window object
 * @param {any} value
 * @return {boolean}
 */
const isInputWindowObject = (value) => {
    return value != null && typeof value === "object" && "setInterval" in value;
};

/**
 * Version comparator
 * compares the given version with the specified range
 * @param {string} version
 * @param {string} range
 * @return {boolean}
 */
function compareVersion(version, range) {
    const string = range + "";
    const n = +(string.match(/\d+/) || NaN);
    const op = string.match(/^[<>]=?|/)[0];
    return comparator[op] ? comparator[op](version, n) : version == n || n !== n;
}

const freeSelf = isInputWindowObject(typeof self == "object" && self) && self;
const navigator = freeSelf && freeSelf.navigator;
const userAgent = ((navigator && navigator.userAgent) || "").toLowerCase();
const vendor = ((navigator && navigator.vendor) || "").toLowerCase();
const platform = ((navigator && navigator.platform) || "").toLowerCase();

/**
 * is_js selector
 * is_js contains various functions that determine the user agent's browser and device characteristics. These functions check for specific patterns in the user agent string to identify the type of device or browser being used, such as Android, iOS, Windows, Mac, mobile, tablet, etc
 * usage:
 * is_js.mobile();
 * is_js.desktop();
 * is_js.chrome();
 * is_js.safari();
 * @type {{androidTablet: (function(): *), opera: (function(*): *), operaMini: (function(*): *), windowsPhone: (function(): *), safari: (function(*): *), chrome: (function(*): *), android: (function(): boolean), firefox: (function(*): *), mobile: (function(): *), ios: (function(): *), windows: (function(): boolean), iphone: (function(*): *), ipod: (function(*): *), mac: (function(): boolean), tablet: (function(): *), edge: (function(*): *), desktop: (function(): *), windowsTablet: (function(): *), androidPhone: (function(): *), blackberry: (function(): *), linux: (function(): *), touchDevice: (function(): *), ipad: (function(*): *), ie: (function(*): *)}}
 * @returns {boolean}
 */
export const is_js = {
    android: function () {
        return /android/.test(userAgent);
    },
    androidPhone: function () {
        return /android/.test(userAgent) && /mobile/.test(userAgent);
    },
    androidTablet: function () {
        return /android/.test(userAgent) && !/mobile/.test(userAgent);
    },
    opera: function (range) {
        const match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    },
    operaMini: function (range) {
        const match = userAgent.match(/opera mini\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    },
    safari: function (range) {
        const match = userAgent.match(/version\/(\d+).+?safari/);
        return match !== null && compareVersion(match[1], range);
    },
    chrome: function (range) {
        const match = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : null;
        return match !== null && !is_js.opera() && compareVersion(match[1], range);
    },
    desktop: function () {
        return !is_js.mobile() && !is_js.tablet();
    },
    edge: function (range) {
        const match = userAgent.match(/edge\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    },
    firefox: function (range) {
        const match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    },
    ie: function (range) {
        const match = userAgent.match(/(?:msie |trident.+?; rv:)(\d+)/);
        return match !== null && compareVersion(match[1], range);
    },
    ios: function () {
        return is_js.iphone() || is_js.ipad() || is_js.ipod();
    },
    ipad: function (range) {
        const match = userAgent.match(/ipad.+?os (\d+)/);
        return match !== null && compareVersion(match[1], range);
    },
    iphone: function (range) {
        // avoid false positive for Facebook in-app browser on ipad;
        // original iphone doesn't have the OS portion of the UA
        const match = is_js.ipad() ? null : userAgent.match(/iphone(?:.+?os (\d+))?/);
        return match !== null && compareVersion(match[1] || 1, range);
    },
    ipod: function (range) {
        const match = userAgent.match(/ipod.+?os (\d+)/);
        return match !== null && compareVersion(match[1], range);
    },
    linux: function () {
        return /linux/.test(platform) && !is_js.android();
    },
    mac: function () {
        return /mac/.test(platform);
    },
    mobile: function () {
        return is_js.iphone() || is_js.ipod() || is_js.androidPhone() || is_js.blackberry() || is_js.windowsPhone();
    },
    tablet: function () {
        return is_js.ipad() || is_js.androidTablet() || is_js.windowsTablet();
    },
    touchDevice: function () {
        return !!document && ("ontouchstart" in freeSelf || ("DocumentTouch" in freeSelf && document instanceof DocumentTouch));
    },
    windows: function () {
        return /win/.test(platform);
    },
    windowsPhone: function () {
        return is_js.windows() && /phone/.test(userAgent);
    },
    windowsTablet: function () {
        return is_js.windows() && !is_js.windowsPhone() && /touch/.test(userAgent);
    },
    blackberry: function () {
        return /blackberry/.test(userAgent) || /bb10/.test(userAgent);
    },
};
