import { lock, unlock } from "tua-body-scroll-lock";

/**
 * Modal.js
 * Native <dialog>-based modal controller with accessibility support, lifecycle callbacks, and custom DOM events.
 */
export default class Modal {
    /**
     * Create a Modal instance.
     * @param {Object} options - Configuration options.
     * @param {HTMLElement | Document} [options.container=document] - The container element to scope modal and trigger queries.
     * @param {Object} [options.selectors] - Custom selectors for modal elements.
     * @param {Object} [options.attributes] - Custom selectors for modal elements.
     * @param {(modal: HTMLDialogElement, trigger: HTMLElement) => void} [options.beforeOpen] - Called just before a modal opens.
     * @param {(modal: HTMLDialogElement, trigger: HTMLElement) => void} [options.afterOpen] - Called immediately after a modal opens.
     * @param {(modal: HTMLDialogElement) => void} [options.beforeClose] - Called just before a modal closes.
     * @param {(modal: HTMLDialogElement) => void} [options.afterClose] - Called immediately after a modal closes.
     * @param {boolean} [options.debug=false] - Enables debug logging to the console.
     */
    constructor({ container = document, selectors = {}, attributes = {}, beforeOpen, afterOpen, beforeClose, afterClose, debug = false } = {}) {
        /**
         * Configuration for internal selectors, attributes, and state classes.
         * @type {{selectors: {modal: (HTMLDialogElement|string|string|*), closeButton: (string)}, attributes: {open: string}, states: {open: string, closing: string}, events: {beforeOpen: string, afterOpen: string, beforeClose: string, afterClose: string}}}
         */
        this.config = {
            selectors: {
                modal: selectors.modal || ".js-modal",
                closeButton: selectors.closeButton || ".js-modal-close",
            },
            attributes: {
                open: attributes.open || "data-modal-open",
            },
            states: {
                open: "is-open",
                closing: "is-closing",
            },
            events: {
                beforeOpen: "modal:beforeopen",
                afterOpen: "modal:afteropen",
                beforeClose: "modal:beforeclose",
                afterClose: "modal:afterclose",
            },
        };

        /**
         * The root element used to scope all DOM queries.
         * @type {HTMLElement | Document}
         */
        this.container = container;

        /**
         * Lifecycle callbacks for modal events.
         * @type {{
         *   beforeOpen?: (modal: HTMLDialogElement, trigger: HTMLElement) => void,
         *   afterOpen?: (modal: HTMLDialogElement, trigger: HTMLElement) => void,
         *   beforeClose?: (modal: HTMLDialogElement) => void,
         *   afterClose?: (modal: HTMLDialogElement) => void
         * }}
         */
        this.callbacks = {
            beforeOpen,
            afterOpen,
            beforeClose,
            afterClose,
        };

        /**
         * Enables debug messages to console.
         * @type {boolean}
         */
        this.debug = debug;

        /**
         * All modal elements within the container.
         * @type {HTMLDialogElement[]}
         */
        this.modals = Array.from(this.container.querySelectorAll(this.config.selectors.modal));

        /**
         * All trigger elements that open modals (buttons or links with [data-modal-open]).
         * @type {HTMLElement[]}
         */
        this.triggers = Array.from(this.container.querySelectorAll(`[${this.config.attributes.open}]`));

        /**
         * The last element focused before a modal opened, restored on close.
         * @type {HTMLElement | null}
         */
        this.lastFocusedElement = null;
    }

    /**
     * Initialize event listeners and accessibility setup.
     */
    init() {
        if (!this.modals.length) {
            this.logDebug("No modals found.");
            return;
        }
        if (this.triggers.length) {
            this.logDebug("Modal open triggers found.");
            this.triggers.forEach((trigger) => {
                trigger.addEventListener("click", (event) => {
                    event.preventDefault();
                    const modalId = trigger.getAttribute(this.config.attributes.open);
                    const modal = this.container.querySelector(`#${modalId}`);
                    if (modal) {
                        this.logDebug(`Trigger clicked for modal ID: ${modalId}`);
                        this.lastFocusedElement = trigger;
                        this.openModal(modal, trigger);
                    } else {
                        this.logDebug(`Modal with ID "${modalId}" not found.`);
                    }
                });
            });
        } else {
            this.logDebug("No modal open triggers found.");
        }
        this.modals.forEach((modal) => {
            this.setupAccessibility(modal);
            const closeButtons = modal.querySelectorAll(this.config.selectors.closeButton);
            if (closeButtons.length) {
                closeButtons.forEach((button) => {
                    button.addEventListener("click", (event) => {
                        event.preventDefault();
                        this.logDebug(`Close button clicked in modal: #${modal.id}`);
                        this.closeModal(modal);
                    });
                });
            }
            modal.addEventListener("cancel", (event) => {
                event.preventDefault();
                this.logDebug(`Native 'cancel' event on modal: #${modal.id}`);
                this.handleBeforeClose(modal);
                modal.classList.add(this.config.states.closing);
                this.logDebug(`Closing transition started: #${modal.id}`);
                this.onModalTransitionEnd(modal, () => {
                    this.logDebug(`Closing transition ended: #${modal.id}`);
                    modal.classList.remove(this.config.states.closing);
                    modal.close();
                });
            });
            modal.addEventListener("close", () => {
                this.logDebug(`Native 'close' event on modal: #${modal.id}`);
                this.handleAfterClose(modal);
                this.logDebug(`Modal closed: #${modal.id}`);
            });
        });
        this.logDebug("Modal initialized.");
    }

    /**
     * Set ARIA roles and attributes for accessibility.
     * @param {HTMLDialogElement} modal
     */
    setupAccessibility(modal) {
        if (!modal.hasAttribute("role")) {
            modal.setAttribute("role", "dialog");
        }
        modal.setAttribute("aria-modal", "true");
        this.logDebug(`Accessibility attributes set on modal: #${modal.id}`);
    }

    /**
     * Open the specified modal.
     * @param {HTMLDialogElement} modal
     * @param {HTMLElement} trigger
     */
    openModal(modal, trigger) {
        if (!modal) return;
        this.logDebug(`Opening modal: #${modal.id}`);
        this.dispatchEvent(modal, this.config.events.beforeOpen);
        if (typeof this.callbacks.beforeOpen === "function") {
            this.callbacks.beforeOpen(modal, trigger);
        }
        modal.showModal();
        this.logDebug(`The showModal() method of the dialog interface triggered for modal: #${modal.id}`);
        lock(modal);
        this.logDebug(`Scroll locked: #${modal.id}`);
        modal.classList.add(this.config.states.open);
        this.logDebug(`Opening transition started: #${modal.id}`);
        this.onModalTransitionEnd(modal, () => {
            this.logDebug(`Opening transition ended: #${modal.id}`);
            this.trapFocus(modal);
            this.dispatchEvent(modal, this.config.events.afterOpen);
            if (typeof this.callbacks.afterOpen === "function") {
                this.callbacks.afterOpen(modal, trigger);
            }
            this.logDebug(`Modal opened: #${modal.id}`);
        });
    }

    /**
     * Close the specified modal.
     * @param {HTMLDialogElement} modal
     */
    closeModal(modal) {
        if (!modal || !modal.open) return;
        this.logDebug(`Closing modal: #${modal.id}`);
        this.handleBeforeClose(modal);
        modal.classList.add(this.config.states.closing);
        this.logDebug(`Closing transition started: #${modal.id}`);
        this.onModalTransitionEnd(modal, () => {
            this.logDebug(`Closing transition ended: #${modal.id}`);
            modal.classList.remove(this.config.states.closing);
            modal.close();
        });
    }

    /**
     * Attach a one-shot transitionend listener that only fires for the modal's
     * own transition (ignoring transitions bubbling from descendants and from
     * the ::backdrop pseudo-element).
     * @param {HTMLDialogElement} modal
     * @param {() => void} callback
     */
    onModalTransitionEnd(modal, callback) {
        const handler = (event) => {
            if (event.target !== modal) return;
            modal.removeEventListener("transitionend", handler);
            callback();
        };
        modal.addEventListener("transitionend", handler);
    }

    /**
     * Handle beforeClose logic: callbacks and custom event.
     * @param {HTMLDialogElement} modal
     */
    handleBeforeClose(modal) {
        this.dispatchEvent(modal, this.config.events.beforeClose);
        if (typeof this.callbacks.beforeClose === "function") {
            this.callbacks.beforeClose(modal);
        }
        this.logDebug(`Handled beforeClose for modal: #${modal.id}`);
    }

    /**
     * Handle afterClose logic: cleanup, focus restore, callbacks, custom event.
     * @param {HTMLDialogElement} modal
     */
    handleAfterClose(modal) {
        modal.classList.remove(this.config.states.open);
        unlock(modal);
        this.logDebug(`Scroll unlocked: #${modal.id}`);
        if (this.lastFocusedElement instanceof HTMLElement) {
            this.lastFocusedElement.focus();
            this.logDebug("Restored focus to trigger element.");
            this.lastFocusedElement = null;
        }
        this.dispatchEvent(modal, this.config.events.afterClose);
        if (typeof this.callbacks.afterClose === "function") {
            this.callbacks.afterClose(modal);
        }
        this.logDebug(`Handled afterClose for modal: #${modal.id}`);
    }

    /**
     * Dispatch a custom DOM event from the container.
     * @param {HTMLElement} modal
     * @param {string} eventName
     */
    dispatchEvent(modal, eventName) {
        const event = new CustomEvent(eventName, {
            bubbles: true,
            detail: { modal },
        });
        this.container.dispatchEvent(event);
        this.logDebug(`Dispatched event: ${eventName} from #${modal.id}`);
    }

    /**
     * Focus the first focusable element inside the modal, or the modal itself.
     * @param {HTMLElement} modal
     */
    trapFocus(modal) {
        const focusable = modal.querySelector(
            'button, [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable) {
            focusable.focus();
            this.logDebug("Focused first focusable element in modal.");
        } else {
            modal.focus();
            this.logDebug("Focused modal itself (no focusable elements found).");
        }
    }

    /**
     * Log debug messages if enabled.
     * @param {string} message
     */
    logDebug(message) {
        if (this.debug) console.info(`[Modal Debug] ${message}`);
    }
}
