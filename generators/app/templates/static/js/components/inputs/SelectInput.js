import SlimSelect from "slim-select";

/**
 * Select input
 * convert select input boxes to slim-select
 * add <option data-placeholder="true"></option> as first option to enable placeholder
 * add data-placeholder="Placeholder" to select input to change the default placeholder text
 * add data-search to select input to enable option search in dropdown
 * add data-allow-deselect to allow deselecting
 * add data-hide-selected to hide selected option
 * add multiple to select input to enable multiselect
 * add data-content-location="closest-parent-class-name" to set the parent where the content section of slim select is injected which is the closest parent with css class relative to the input
 */
export default class SelectInput {
    constructor(container = document) {
        /**
         * DOM elements
         * @type {{input: string, attributes: {search: string, hideSelected: string, allowDeselect: string, placeholder: string, contentLocation: string}}}
         */
        this.DOM = {
            input: ".js-select-input",
            attributes: {
                search: "data-search",
                placeholder: "data-placeholder",
                allowDeselect: "data-allow-deselect",
                hideSelected: "data-hide-selected",
                contentLocation: "data-content-location",
            },
        };

        /**
         * Get list of select input DOM elements
         * @type {NodeListOf<Element>}
         */
        this.inputs = container.querySelectorAll(this.DOM.input);
    }

    /**
     * Init
     */
    init() {
        if (this.inputs.length < 1) {
            return;
        }
        this.initSlimSelect();
    }

    /**
     * Init slim-select
     * uses: https://github.com/brianvoe/slim-select
     */
    initSlimSelect() {
        this.inputs.forEach((input) => {
            new SlimSelect({
                select: input,
                settings: {
                    placeholderText:
                        input.hasAttribute(this.DOM.attributes.placeholder) && input.getAttribute(this.DOM.attributes.placeholder) !== ""
                            ? input.getAttribute(this.DOM.attributes.placeholder)
                            : "",
                    showSearch: input.hasAttribute(this.DOM.attributes.search),
                    allowDeselect: input.hasAttribute(this.DOM.attributes.allowDeselect),
                    hideSelected: input.hasAttribute(this.DOM.attributes.hideSelected),
                    contentLocation:
                        input.hasAttribute(this.DOM.attributes.contentLocation) && input.getAttribute(this.DOM.attributes.contentLocation) !== ""
                            ? input.closest(`.${input.getAttribute(this.DOM.attributes.contentLocation)}`)
                            : "",
                },
            });
        });
    }
}
