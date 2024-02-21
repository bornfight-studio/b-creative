/**
 * Password input
 * turns password field in text field to reveal value
 */
export default class PasswordInput {
    constructor(container = document) {
        /**
         * DOM elements
         * @type {{triggers: string, states: {passwordVisible: string}}}
         */
        this.DOM = {
            triggers: ".js-password-reveal",
            states: {
                passwordVisible: "has-password-visible",
            },
        };

        /**
         * Get list of trigger DOM elements
         * @type {NodeListOf<Element>}
         */
        this.triggers = container.querySelectorAll(this.DOM.triggers);
    }

    /**
     * Init
     */
    init() {
        if (this.triggers.length < 1) {
            return;
        }
        this.initReveal();
    }

    /**
     * Init reveal
     * on trigger click finds the nearest input and toggles type=password/text
     */
    initReveal() {
        this.triggers.forEach((trigger) => {
            const fieldset = trigger.closest("fieldset");
            const input = fieldset.querySelector("input");

            trigger.addEventListener("click", (event) => {
                event.preventDefault();
                if (input.type === "password") {
                    input.type = "text";
                    fieldset.classList.add(this.DOM.states.passwordVisible);
                } else {
                    input.type = "password";
                    fieldset.classList.remove(this.DOM.states.passwordVisible);
                }
            });
        });
    }
}
