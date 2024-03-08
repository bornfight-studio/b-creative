const windowResizeDebounce = new Event("windowResizeDebounce");
const releaseDelay = 300;

/**
 * Usage
 *  window.addEventListener("windowResizeDebounce", () => {
 *    console.log("resize trigger");
 *  });
 */

/**
 * Listens for window resize event and dispatches debounced window resize event.
 *
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
 * Debounces a function, ensuring it is not called again until releaseDelay milliseconds have passed.
 *
 * @param {function} func - The function to be debounced.
 * @return {function} The debounced function.
 */
const debounce = (func) => {
    let timer;
    return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, releaseDelay);
    };
};
