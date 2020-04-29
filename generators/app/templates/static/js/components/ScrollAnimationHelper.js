import "intersection-observer";
import scrollama from "scrollama";
import gsap from "gsap";

/**
 * Scroll animation helper class which uses data-animation for animating elements with json predefined animations
 * run npm i scrollama intersection-observer --save
 */

export default class ScrollAnimationHelper {
    constructor() {
        /**
         * Animation DOM selectors
         * Animation DOM state CSS class
         * JSON predefined animations for gsap
         */

        this.DOM = {
            navigation: ".js-animated-element",
            states: {
                animated: "is-animated",
            },
        };

        /**
         * fetch animtion elements
         * @type {NodeListOf<Element>}
         */
        this.animatedElements = document.querySelectorAll(
            ".js-animated-element",
        );

        this.animations = {
            "fade-down": {
                from: {
                    autoAlpha: 0,
                    duration: 1.2,
                    y: -50,
                },
                to: {
                    autoAlpha: 1,
                    y: 0,
                    ease: "power3.out",
                },
            },

            "fade-up": {
                from: {
                    autoAlpha: 0,
                    y: 50,
                },
                to: {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out",
                },
            },

            "scale-up": {
                from: {
                    autoAlpha: 0,
                    duration: 2,
                    scale: 0.3,
                },
                to: {
                    autoAlpha: 1,
                    scale: 1,
                    ease: "power3.out",
                },
            },

            "scale-down": {
                from: {
                    autoAlpha: 0,
                    duration: 2,
                    scale: 1.3,
                },
                to: {
                    autoAlpha: 1,
                    scale: 1,
                    ease: "power3.out",
                },
            },
        };

        console.log("constructor");
    }

    init() {
        if (this.animatedElements.length !== null) {
            this.animationInit();
            this.animationsReset();
        }
    }

    animationInit() {
        console.log("ScrollAnimationHelper");
        this.scroller = scrollama();
        /**
         * setup the scroller
         * this will also initialize trigger observations
         * bind scrollama event handlers
         */
        this.scroller
            .setup({
                step: this.animatedElements,
                // debug: true,
                offset: 0.7,
                once: true,
            })
            .onStepEnter((response) => {
                this.itemsInRowCalculation(response);
            });
    }

    /**
     *                 this method calculates if its single od multiple item in the row.
     *                 If there is more then one it will trigger them with delay (setTimeout)
     *                 -> 150ms * increment (increment is index in the row -> 0, 1, 2, 3, ...)
     *                 @param response - element which triggered animation
     */
    itemsInRowCalculation(response) {
        const indexes = [];
        for (let elem of this.animatedElements) {
            /**
             * make array of elements with same height from top of the window
             */
            if (
                elem.getBoundingClientRect().top ===
                response.element.getBoundingClientRect().top
            ) {
                indexes.push(elem.dataset.scrollamaIndex);
            }
        }

        const sum = indexes[indexes.length - 1] - indexes[0];

        for (let i = 0; i <= sum; i++) {
            if (indexes[i] === response.element.dataset.scrollamaIndex) {
                this.handleOnStepEnter(response, i);
            }
        }
    }

    /**
     * handle triggered animations
     * @param response
     * @param increment
     */
    handleOnStepEnter(response, increment) {
        if (response.element.hasAttribute("data-animation")) {
            response.element.classList.add("is-animated");

            /**
             * "data-animation" is set, use animation type from value
             */
            const animationType = response.element.getAttribute(
                "data-animation",
            );

            setTimeout(() => {
                gsap.fromTo(
                    response.element,
                    this.animations[animationType].from,
                    this.animations[animationType].to,
                );
            }, 150 * increment);
        } else {
            /**
             * fallback if "data-animation" attribute not set
             */
            response.element.classList.add("is-animated");

            gsap.fromTo(
                response.element,
                {
                    autoAlpha: 0,
                    duration: 0.3,
                    y: 20,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    ease: "power3.out",
                },
            );
        }
    }

    /**
     * Set initial state for animated elements
     */
    animationsReset() {
        for (const element of this.animatedElements) {
            const animationType = element.getAttribute("data-animation");

            if (animationType !== null) {
                gsap.set(element, this.animations[animationType].from);
            } else {
                gsap.set(element, {
                    autoAlpha: 0,
                });
            }
        }
    }
}
