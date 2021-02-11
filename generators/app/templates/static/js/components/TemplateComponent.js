/**
 * Template component
 * explain what this class is doing
 */
export default class TemplateComponent {
    constructor() {
        /**
         * Template component DOM selectors
         * @type {{templateComponentArray: string, templateComponent: string, states: {isActive: string}}}
         */
        this.DOM = {
            templateComponent: ".js-template-component",
            templateComponentArray: ".js-template-component-array",
            states: {
                isActive: "is-active",
            },
        };

        /**
         * Fetch template component DOM element
         * @type {Element}
         */
        this.templateComponent = document.querySelector(this.DOM.templateComponent);

        /**
         * Fetch template component list of DOM elements
         * @type {NodeListOf<Element>}
         */
        this.templateComponentArray = document.querySelectorAll(this.DOM.templateComponentArray);
    }

    /**
     * Init
     */
    init() {
        if (this.templateComponent === null) {
            return;
        }
        // if (this.templateComponentArray.length < 1) {
        //     return;
        // }
        console.log("Template component init");
        this.templateMethod();
    }

    /**
     * Template method
     * explain what this method is doing
     */
    templateMethod() {
        console.log("Template method init");
    }
}
