/**
 * Get viewport size
 * @returns {number}
 */
export const getViewportSize = () => {
    if (typeof window !== "undefined") {
        if (window.innerWidth !== undefined) {
            return window.innerWidth;
        } else {
            return document.documentElement.clientWidth;
        }
    }
};
