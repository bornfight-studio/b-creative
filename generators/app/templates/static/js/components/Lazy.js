import LazyLoad from "vanilla-lazyload";

/**
 * Lazy loading
 * lazy loads image, picture, background images and related media elements
 */
export default class Lazy {
    constructor(container = document) {
        /**
         * DOM elements
         * @type {{events: {jsDOMChange: string}, element: string, states: {loaded: string}}}
         */
        this.DOM = {
            element: ".js-lazy-load",
            states: {
                loaded: "is-loaded",
            },
            events: {
                jsDOMChange: "javascriptDOMChange",
            },
        };

        /**
         * Get list of DOM elements that will be lazy loaded
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
        this.lazyLoad();
    }

    /**
     * Init lazy load library
     * uses: https://github.com/verlok/vanilla-lazyload
     */
    lazyLoad() {
        const lazyLoadInstance = new LazyLoad({
            elements_selector: this.DOM.element,
            class_loaded: this.DOM.states.loaded,
        });

        // JS DOM change event
        // this event can be dispatched when Javascript changes the DOM and new images need to be loaded
        document.addEventListener(this.DOM.events.jsDOMChange, () => {
            lazyLoadInstance.update();
        });
    }
}
