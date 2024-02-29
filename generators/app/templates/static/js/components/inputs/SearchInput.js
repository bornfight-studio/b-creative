/**
 * Search input
 * controls search input states
 */
export default class SearchInput {
    constructor(container = document) {
        /**
         * DOM elements
         * @type {{input: string, form: string, submit: string, reset: string, states: {visible: string, disabled: string}}}
         */
        this.DOM = {
            form: ".js-search-form",
            input: ".js-search-input",
            submit: ".js-search-submit",
            reset: ".js-search-reset",
            states: {
                visible: "is-visible",
                disabled: "is-disabled",
            },
        };

        /**
         * Get list of search form DOM elements
         * @type {NodeListOf<Element>}
         */
        this.forms = container.querySelectorAll(this.DOM.form);
    }

    /**
     * Init
     */
    init() {
        if (this.forms.length < 1) {
            return;
        }
        this.initForms();
    }

    /**
     * Start events
     */
    initForms() {
        this.forms.forEach((form) => {
            const input = form.querySelector(this.DOM.input);
            const reset = form.querySelector(this.DOM.reset);
            const submit = form.querySelector(this.DOM.submit);

            if (!input || !submit || !reset) {
                return;
            }

            this.setSubmitButtonState(input, submit);
            this.setResetButtonState(input, reset);

            input.addEventListener("input", () => {
                this.setSubmitButtonState(input, submit);
                this.setResetButtonState(input, reset);
            });

            form.addEventListener("reset", (event) => {
                event.preventDefault();
                this.resetForm(form, input);
                this.setSubmitButtonState(input, submit);
                this.setResetButtonState(input, reset);
            });
        });
    }

    /**
     * Set submit button state
     * disable submit button if value is empty
     * @param input
     * @param submit
     */
    setSubmitButtonState(input, submit) {
        if (input.value === "") {
            submit.disabled = true;
            submit.classList.add(this.DOM.states.disabled);
        } else {
            submit.disabled = false;
            submit.classList.remove(this.DOM.states.disabled);
        }
    }

    /**
     * Set reset button state
     * show reset button if value is not empty
     * @param input
     * @param reset
     */
    setResetButtonState(input, reset) {
        if (input.value === "") {
            reset.classList.remove(this.DOM.states.visible);
        } else {
            reset.classList.add(this.DOM.states.visible);
        }
    }

    /**
     * Reset form
     * @param form
     * @param input
     */
    resetForm(form, input) {
        form.reset();
        input.value = "";
    }
}
