import {gsap} from "gsap";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";

// Register the ScrollToPlugin with gsap
gsap.registerPlugin(ScrollToPlugin);

/**
 * CF7FormSuccess class
 * This class is used to handle the success message display for CF7 forms.
 */
export default class CF7FormSuccess {
    /**
     * Constructor for the CF7FormSuccess class.
     * Initializes the DOM elements and form wrappers.
     */
    constructor() {
        /**
         * Dom elements
         * @type {{form: string, cf7: string, successMsg: string, formWrapper: string}}
         */
        this.DOM = {
            formWrapper: ".js-form-wrapper",
            successMsg: ".js-form-success",
            cf7: ".wpcf7",
            form: ".js-form",
        };

        /**
         * @type {NodeListOf<HTMLElement>}
         * A NodeList of form wrapper elements.
         */
        this.formWrappers = document.querySelectorAll(this.DOM.formWrapper);
    }

    /**
     * Init method
     * Initializes the form wrappers if they exist.
     */
    init() {
        if (this.formWrappers.length > 0) {
            this.formWrappers.forEach((wrapper) => {
                this.handleForm(wrapper);
            });
        }
    }

    /**
     * singleFrom method
     * @param {HTMLElement} wrapper - The form wrapper element.
     * Handles the success message display for a single form.
     */
    handleForm(wrapper) {
        const successMsg = wrapper.querySelector(this.DOM.successMsg);
        const cf7form = wrapper.querySelector(this.DOM.cf7);
        const form = wrapper.querySelector(this.DOM.form);

        if (!cf7form) return;

        cf7form.addEventListener(
            "wpcf7mailsent",
            () => {
                if (form !== null) form.style.display = "none";
                if (successMsg != null) {
                    successMsg.style.display = "block";
                    gsap.to(window, {
                        duration: 0.3,
                        scrollTo: {
                            y: successMsg,
                            offsetY: window.innerHeight / 2 - 50,
                        },
                    });
                }
            },
            false,
        );
    }
}
