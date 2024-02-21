/**
 * Acceptance input
 * blocks form submit without accepting terms and conditions etc
 */
export default class AcceptanceInput {
    constructor(container = document) {
        /**
         * DOM elements
         * @type {{input: string, submit: string}}
         */
        this.DOM = {
            input: ".js-acceptance-input",
            submit: "[type=submit]",
        };

        /**
         * Get list of acceptance input DOM elements
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
        this.inputs.forEach((input) => this.initForm(input));
    }

    /**
     * Init form
     * @param input
     */
    initForm(input) {
        const form = input.closest("form");
        if (!form) return;
        const submit = form.querySelector(this.DOM.submit);
        if (!submit) return;

        this.setSubmitState(input, submit);

        input.addEventListener("change", () => {
            this.setSubmitState(input, submit);
        });
    }

    /**
     * Set submit state
     * @param input
     * @param submit
     */
    setSubmitState(input, submit) {
        if (input.checked === true) {
            submit.removeAttribute("disabled");
        } else {
            submit.setAttribute("disabled", "disabled");
        }
    }
}
