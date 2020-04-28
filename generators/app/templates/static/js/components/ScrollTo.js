import gsap from "gsap";

/**
 * Animated scroll to target id
 * Link needs class .js-scroll-to and data-target
 * Optionally link can have data-offset
 */
export class ScrollTo {
    constructor() {
        /**
         * ScrollTo DOM selector
         * ScrollTo dataset
         */

        this.DOM = {
            link: ".js-scroll-to",
        };
        /**
         * default amount of pixels to scroll from top if no data-offset was set
         * @type {number}
         */
        this.defaultOffset = 0;

        /**
         * fetch link elements DOM element
         * @type {NodeListOf<Element>}
         */
        this.links = document.querySelectorAll(this.DOM.link);
    }

    init() {
        if (this.links.length !== null) {
            this.scrollToInit();
        } else {
            console.error(
                `${this.DOM.link} with dataset ${this.DOM.dataset.target} does not exist in the DOM!`,
            );
        }
    }

    scrollToInit() {
        this.links.forEach((link) => {
            if (link.hasAttribute("data-target")) {
                const target = document.querySelector(`${link.dataset.target}`);
                let offset = -parseInt(link.dataset.offset);
                if (!target) {
                    return;
                }
                if (!offset) {
                    offset = this.defaultOffset;
                }

                link.addEventListener("click", () => {
                    gsap.to([document.documentElement, document.body], 1, {
                        scrollTop:
                            -document.body.getBoundingClientRect().y +
                            target.getBoundingClientRect().y +
                            offset,
                        ease: "power3",
                    });
                });
            } else {
                console.error(link);
                console.error(
                    `link is missing data-${this.DOM.dataset.target}`,
                );
            }
        });
    }
}
