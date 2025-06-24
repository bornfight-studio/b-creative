/**
 * ScrollToAnimation
 * Smoothly animates anchor links with native scrollIntoView JavaScript API.
 * Use scroll-margin-top: var(--height-navigation); property on the target element to offset scroll position.
 */
export default class ScrollToAnimation {
    constructor(container = document) {
        /**
         * Config
         * @type {{selectors: {element: string}}}
         */
        this.config = {
            selectors: {
                element: 'a[href^="#"]',
            },
        };

        /**
         * List of anchor elements matching the selector.
         * @type {NodeListOf<HTMLAnchorElement>}
         */
        this.elements = container.querySelectorAll(this.config.selectors.element);
    }

    /**
     * Initialize the class by checking required DOM elements and setting up event listeners.
     */
    init() {
        if (!this.elements.length) return;

        // Iterate through each element, get hash, find target and set up events
        this.elements.forEach((element) => {
            if (!element.hash) return;
            const target = document.getElementById(element.hash.substring(1));
            if (!target) return;

            element.addEventListener("click", (event) => this.handleClick(event, target));
        });
    }

    /**
     * Handles click event on anchor elements and scrolls to the target.
     * @param {Event} event - The click event object.
     * @param {HTMLElement} target - The target element to scroll to.
     */
    handleClick(event, target) {
        event.preventDefault();
        target.scrollIntoView({
            behavior: "smooth", // Determines whether scrolling is instant or animates smoothly
            block: "start", // Defines the vertical alignment of the element within the scrollable ancestor container
            inline: "nearest", // Defines the horizontal alignment of the element within the scrollable ancestor container
        });
    }
}
