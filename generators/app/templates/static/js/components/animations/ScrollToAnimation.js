import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

/**
 * Scroll to animation
 * smooth scrolling to anchor links with gsap scroll to plugin
 */
export default class ScrollToAnimation {
    constructor(container = document) {
        /**
         * DOM elements
         * @type {{element: string}}
         */
        this.DOM = {
            element: "[data-scroll-to]",
        };

        /**
         * Get list of scroll to DOM elements
         * @type {NodeListOf<Element>}
         */
        this.elements = container.querySelectorAll(this.DOM.element);
    }

    /**
     * Init
     */
    init() {
        if (this.elements.length < 1) {
            return;
        }
        this.elements.forEach((element) => this.initScrollToElement(element));
    }

    /**
     * Init scroll to element
     * uses: https://gsap.com/docs/v3/Plugins/ScrollToPlugin/
     * @param element
     */
    initScrollToElement(element) {
        element.addEventListener("click", (event) => {
            event.preventDefault();
            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                    y: `#${element.dataset.scrollTo}`,
                    offsetY: parseInt(element.dataset.scrollToOffset) || 0,
                },
                ease: "expo.inOut",
            });
        });
    }
}
