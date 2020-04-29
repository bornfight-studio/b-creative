export default class ScrollLocker {
    constructor() {
        /**
         * Scroll lock body selector
         * Scroll lock state CSS class
         * @type {{body: string, states: {scrollLocked: string}}}
         */
        this.DOM = {
            body: "body",
            states: {
                scrollLocked: "is-locked",
            },
        };

        /**
         * amount of pixels to scroll from top for adding "scrollLocked" state class
         * @type {number}
         */
        this.scrollLockedOffset = 100;

        /**
         * fetch body DOM element
         * @type {HTMLBodyElement}
         */
        this.body = document.querySelector(this.DOM.body);
        console.log(this.body);
    }

    /**
     * Lock scroll and save scroll position
     */
    lockScroll() {
        if (this.body.classList.contains(this.DOM.states.scrollLocked)) {
            return;
        }
        /**
         * variable for storing current scroll position value
         * @type {number}
         */
        this.offsetTop = document.documentElement.scrollTop;

        /**
         * Style attributes for locking scroll
         * @type {string}
         */
        this.body.style.overflow = "hidden";
        this.body.style.top = `-${document.documentElement.scrollTop}px`;
        this.body.style.position = "fixed";

        /**
         * add class if scrolled more than "scrollLockedOffset", for navigation styling when locked
         */
        if (this.offsetTop > this.scrollLockedOffset) {
            this.body.classList.add(this.DOM.states.scrollLocked);
        }
    }

    /**
     * Reset scroll, and scroll position
     */
    unlockScroll() {
        /**
         * Reset style attributes
         * @type {string}
         */
        this.body.style.top = "0px";
        this.body.style.position = "";
        this.body.style.overflow = "";

        /**
         * Reset current scroll position
         * @type {number}
         */
        document.documentElement.scrollTop = this.offsetTop;

        /**
         *  remove body class
         */
        this.body.classList.remove(this.DOM.states.scrollLocked);
    }
}
