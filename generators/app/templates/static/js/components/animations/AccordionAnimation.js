/**
 * Accordion animation
 * @param {{ container?: HTMLElement | Document, onOpen?: Function, onClose?: Function }} options
 */
export default class AccordionAnimation {
    constructor({ container = document, onOpen = () => {}, onClose = () => {} } = {}) {
        /**
         * Config
         * @type {{selectors: {accordion: string, single: string, header: string, panel: string}, states: {active: string, initiallyActive: string}, attributes: {mono: string}}}
         */
        this.config = {
            selectors: {
                accordion: ".js-accordion",
                single: ".js-accordion-single",
                header: ".js-accordion-header",
                panel: ".js-accordion-panel",
            },
            states: {
                active: "is-active",
                initiallyActive: "is-initially-active",
            },
            attributes: {
                mono: "data-mono",
            },
        };

        /**
         * List of accordion elements found in the DOM.
         * @type {NodeListOf<Element>}
         */
        this.accordions = container.querySelectorAll(this.config.selectors.accordion);

        /**
         * Callback triggered when an accordion item is opened.
         * @type {(item: HTMLElement) => void}
         */
        this.onOpen = onOpen;

        /**
         * Callback triggered when an accordion item is closed.
         * @type {(item: HTMLElement) => void}
         */
        this.onClose = onClose;
    }

    /**
     * Initializes all accordion elements found in the container.
     */
    init() {
        if (!this.accordions.length) return;
        this.accordions.forEach((accordion) => this.initAccordion(accordion));
    }

    /**
     * Initializes a single accordion element.
     * @param {HTMLElement} accordion
     */
    initAccordion(accordion) {
        const singles = accordion.querySelectorAll(this.config.selectors.single);
        if (!singles.length) return;

        singles.forEach((single, index) => {
            const header = single.querySelector(this.config.selectors.header);
            const panel = single.querySelector(this.config.selectors.panel);
            if (!header || !panel) return;

            /**
             * Generate unique IDs for header and panel if not already present.
             * These IDs are needed for proper ARIA attributes.
             */
            const headerId = header.id || `accordion-header-${index}-${Math.random().toString(36).slice(2, 7)}`;
            const panelId = panel.id || `accordion-panel-${index}-${Math.random().toString(36).slice(2, 7)}`;
            header.id = headerId;
            panel.id = panelId;

            /**
             * Add ARIA roles and accessibility attributes to the header and panel.
             */
            header.setAttribute("role", "button");
            header.setAttribute("aria-controls", panelId);
            header.setAttribute("tabindex", "0");
            header.setAttribute("aria-expanded", "false");
            panel.setAttribute("role", "region");
            panel.setAttribute("aria-labelledby", headerId);
            panel.setAttribute("aria-hidden", "true");

            /**
             * Disable focus on all focusable elements inside the panel initially.
             */
            this.disableFocus(panel);

            /**
             * Handle initially active accordion.
             */
            if (single.classList.contains(this.config.states.initiallyActive)) {
                header.setAttribute("aria-expanded", "true");
                panel.setAttribute("aria-hidden", "false");
                this.enableFocus(panel);
                single.classList.add(this.config.states.active);
                panel.style.maxHeight = panel.scrollHeight + "px";
                single.classList.remove(this.config.states.initiallyActive);
                this.onOpen(single);
            }

            /**
             * Toggle accordion item on click.
             */
            header.addEventListener("click", (event) => {
                event.preventDefault();
                if (!single.classList.contains(this.config.states.active)) {
                    if (accordion.hasAttribute(this.config.attributes.mono)) this.handleMono(singles);
                    header.setAttribute("aria-expanded", "true");
                    panel.setAttribute("aria-hidden", "false");
                    this.enableFocus(panel);
                    single.classList.add(this.config.states.active);
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    panel.addEventListener(
                        "transitionend",
                        () => {
                            this.onOpen(single);
                        },
                        { once: true },
                    );
                } else {
                    header.setAttribute("aria-expanded", "false");
                    panel.setAttribute("aria-hidden", "true");
                    this.disableFocus(panel);
                    single.classList.remove(this.config.states.active);
                    panel.style.maxHeight = null;
                    panel.addEventListener(
                        "transitionend",
                        () => {
                            this.onClose(single);
                        },
                        { once: true },
                    );
                }
            });
        });
    }

    /**
     * Disable focus on elements inside the panel by removing their tabindex.
     * This prevents users from focusing on links, buttons, or other form elements inside the closed panel.
     * @param {HTMLElement} panel
     */
    disableFocus(panel) {
        const focusableElements = panel.querySelectorAll("a, button, input, select, textarea, [tabindex]");
        focusableElements.forEach((el) => {
            el.setAttribute("tabindex", "-1");
        });
    }

    /**
     * Enable focus on elements inside the panel by restoring their tabindex.
     * This makes sure focusable elements inside the open panel are reachable.
     * @param {HTMLElement} panel
     */
    enableFocus(panel) {
        const focusableElements = panel.querySelectorAll("a, button, input, select, textarea, [tabindex]");
        focusableElements.forEach((el) => {
            el.setAttribute("tabindex", "0");
        });
    }

    /**
     * Handles the mono (single-active) accordion behavior by closing the currently active panel.
     * @param {NodeListOf<Element>} accordions
     */
    handleMono(accordions) {
        const openItems = Array.from(accordions).filter((item) => item.classList.contains(this.config.states.active));
        if (!openItems.length) return;
        openItems.forEach((item) => {
            const header = item.querySelector(this.config.selectors.header);
            const panel = item.querySelector(this.config.selectors.panel);
            if (!header || !panel) return;
            header.setAttribute("aria-expanded", "false");
            panel.setAttribute("aria-hidden", "true");
            this.disableFocus(panel);
            item.classList.remove(this.config.states.active);
            panel.style.maxHeight = null;
            panel.addEventListener(
                "transitionend",
                () => {
                    this.onClose(item);
                },
                { once: true },
            );
        });
    }
}
