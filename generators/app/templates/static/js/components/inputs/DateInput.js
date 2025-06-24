import AirDatepicker from "air-datepicker";
import localeEn from "air-datepicker/locale/en";

/**
 * DateInput.js class
 * Initializes AirDatepicker instances on inputs with defined data attributes.
 * Uses: https://github.com/t1m0n/air-datepicker.
 */
export default class DateInput {
    /**
     * @typedef {Object} Config
     * @property {Object} selectors - CSS selectors for target elements.
     * @property {Object} attributes - Data attributes controlling datepicker options.
     */

    /**
     * @typedef {Object} Defaults
     * @property {string} dateFormat - Default date format.
     * @property {string} position - Default popup position.
     * @property {string} multipleDatesSeparator - Default separator for multiple dates.
     * @property {string} dateTimeSeparator - Default separator between date and time.
     * @property {string} timeFormat - Default time format.
     */

    /**
     * @param {{ container?: HTMLElement | Document }} options
     */
    constructor({ container = document } = {}) {
        /**
         * Configuration for selectors and data attributes.
         * @type {Config}
         */
        this.config = {
            selectors: {
                input: ".js-date-input",
            },
            attributes: {
                classes: "data-classes",
                inline: "data-inline",
                mobile: "data-mobile",
                visible: "data-visible",
                dateFormat: "data-date-format",
                container: "data-container",
                position: "data-position",
                multipleDatesSeparator: "data-multiple-dates-separator",
                range: "data-range",
                autoClose: "data-auto-close",
                timePicker: "data-time-picker",
                onlyTimepicker: "data-only-time-picker",
                dateTimeSeparator: "data-date-time-separator",
                timeFormat: "data-time-format",
            },
        };

        /**
         * Default values for optional AirDatepicker config.
         * @type {Defaults}
         */
        this.defaults = {
            dateFormat: "dd.MM.yyyy.",
            position: "bottom left",
            multipleDatesSeparator: ", ",
            dateTimeSeparator: " - ",
            timeFormat: "H.mm",
        };

        /**
         * All matching date input elements in the container.
         * @type {NodeListOf<HTMLInputElement>}
         */
        this.dateInputs = container.querySelectorAll(this.config.selectors.input);
    }

    /**
     * Initializes all date inputs if any exist.
     * @returns {void}
     */
    init() {
        if (!this.dateInputs.length) return;
        this.initAirDatePickers();
    }

    /**
     * Initialize AirDatepicker for all matched input elements.
     * @private
     * @returns {void}
     */
    initAirDatePickers() {
        this.dateInputs.forEach((input) => {
            new AirDatepicker(input, {
                classes: this.getAttributeOrDefault(input, this.config.attributes.classes),
                inline: this.hasBooleanAttribute(input, this.config.attributes.inline),
                locale: localeEn,
                isMobile: this.hasBooleanAttribute(input, this.config.attributes.mobile),
                visible: this.hasBooleanAttribute(input, this.config.attributes.visible),
                dateFormat: this.getAttributeOrDefault(input, this.config.attributes.dateFormat, this.defaults.dateFormat),
                container: this.getAttributeOrDefault(input, this.config.attributes.container),
                position: this.getAttributeOrDefault(input, this.config.attributes.position, this.defaults.position),
                multipleDatesSeparator: this.getAttributeOrDefault(
                    input,
                    this.config.attributes.multipleDatesSeparator,
                    this.defaults.multipleDatesSeparator,
                ),
                range: this.hasBooleanAttribute(input, this.config.attributes.range),
                autoClose: this.hasBooleanAttribute(input, this.config.attributes.autoClose),
                timepicker: this.hasBooleanAttribute(input, this.config.attributes.timePicker),
                onlyTimepicker: this.hasBooleanAttribute(input, this.config.attributes.onlyTimepicker),
                dateTimeSeparator: this.getAttributeOrDefault(input, this.config.attributes.dateTimeSeparator, this.defaults.dateTimeSeparator),
                timeFormat: this.getAttributeOrDefault(input, this.config.attributes.timeFormat, this.defaults.timeFormat),
            });
        });
    }

    /**
     * Returns the value of a data attribute or a fallback default.
     * @param {HTMLElement} el - The input element.
     * @param {string} attr - The attribute name.
     * @param {string} [defaultValue=""] - Fallback value if attribute is missing or empty.
     * @returns {string}
     */
    getAttributeOrDefault(el, attr, defaultValue = "") {
        const val = el.getAttribute(attr);
        return val && val.trim() !== "" ? val : defaultValue;
    }

    /**
     * Checks if a boolean attribute is present on an element.
     * @param {HTMLElement} el - The input element.
     * @param {string} attr - The attribute name.
     * @returns {boolean}
     */
    hasBooleanAttribute(el, attr) {
        return el.hasAttribute(attr);
    }
}
