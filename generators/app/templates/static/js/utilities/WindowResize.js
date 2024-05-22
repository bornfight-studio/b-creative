const windowResizeDebounce = new Event("windowResizeDebounce");
const releaseDelay = 300;

/**
 * Watch for window resize
 * listens for window resize event and dispatches debounced window resize event
 * usage:
 * index.js
 * import { windowResize } from "./utilities/WindowResize";
 * windowResize();
 * anywhere in your code
 * window.addEventListener("windowResizeDebounce", () => {
 *   console.log("resize trigger");
 * });
 */
export const windowResize = () => {
    window.addEventListener(
        "resize",
        debounce(() => {
            window.dispatchEvent(windowResizeDebounce);
        }),
    );
};

/**
 * Debounce
 * de-bounces a function, ensuring it is not called again until releaseDelay milliseconds have passed
 * @param {function} func
 * @return {function}
 */
const debounce = (func) => {
    let timer;
    return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, releaseDelay);
    };
};
