/**
 * Navigation class
 */
export default class NavigationController {
    constructor() {
        /**
         *
         * @type {{navigationSlideUp: string, navigation: string, activeClass: string, navigationScrolled: string, navigationFixed: string}}
         * @private
         */
        this.defaults = {
            //NAVIGATION
            navigation: ".js-navigation-wrapper",

            //CSS state classes
            activeClass: "is-active",
            navigationScrolled: "has-scrolled",
            navigationFixed: "is-fixed",
            navigationSlideUp: "slide-up",
        };

        //navigation controller config
        /**
         * Is scrolling state
         * @type {boolean}
         */
        this.scrolling = false;
        /**
         * Main navigation scroll offset
         * @type {number}
         */
        this.scrollNavigationOffset = 20;
        /**
         * Previous top offset
         * @type {number}
         */
        this.previousTop = 0;
        /**
         *
         * @type {number}
         */
        this.scrollDelta = 0;
        /**
         * Scroll offset
         * @type {number}
         */
        this.scrollOffset = 0;

        // Elements
        /**
         * Main navigation element
         * @type {Element}
         */
        this.navigation = document.querySelector(this.defaults.navigation);
    }

    //region methods
    /**
     * Navigation class init method and init flag
     */
    init() {
        console.log("Navigation init()");

        if (this.navigation) {
            this.navigationController();
        }
    }

    /**
     * Navigation controller - scroll event
     */
    navigationController() {
        document.addEventListener("scroll", () => {
            if (!this.scrolling) {
                this.scrolling = true;

                if (!window.requestAnimationFrame) {
                    setTimeout(this.checkScroll(), 250);
                } else {
                    requestAnimationFrame(() => this.checkScroll());
                }
            }
        });
    }

    /**
     * Current scroll checker
     */
    checkScroll() {
        /**
         *
         * @type {number}
         */
        let currentTop = window.pageYOffset | document.body.scrollTop;

        this.activateNavigation(currentTop);

        this.previousTop = currentTop;
        this.scrolling = false;
    }

    /**
     * Navigation active state checker
     * @param {number} currentTop - current scroll position
     */
    activateNavigation(currentTop) {
        if (currentTop > this.scrollNavigationOffset) {
            this.navigation.classList.add(this.defaults.navigationScrolled);
        } else {
            this.navigation.classList.remove(this.defaults.navigationScrolled);
        }

        /**
         *
         * @type {number}
         */
        let navOffsetTop = window.innerHeight / 4;

        if (this.previousTop >= currentTop) {
            //SCROLLING UP
            if (currentTop < navOffsetTop) {
                //secondary nav is not fixed
                this.navigation.classList.remove(
                    this.defaults.navigationSlideUp,
                );
            } else if (this.previousTop - currentTop > this.scrollDelta) {
                //secondary nav is fixed

                this.navigation.classList.remove(
                    this.defaults.navigationSlideUp,
                );
            }
        } else {
            //SCROLLING DOWN
            if (currentTop > navOffsetTop + this.scrollOffset) {
                //hide primary nav
                this.navigation.classList.add(this.defaults.navigationSlideUp);
            } else if (currentTop > navOffsetTop) {
                //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset
                this.navigation.classList.remove(
                    this.defaults.navigationSlideUp,
                );
            }
        }
    }

    //endregion
}
