/**
 * Navigation class
 */
export default class NavigationController {
    /**
     *
     * @param options
     */
    constructor(options) {
        /**
         *
         * @type {{navigationSlideUp: string, navigation: string, activeClass: string, navigationScrolled: string, navigationFixed: string}}
         * @private
         */
        const _defaults = {
            //
            activeClass: "is-active",

            //NAVIGATION
            navigation: ".js-navigation-wrapper",

            //CSS state classes
            navigationScrolled: "has-scrolled",
            navigationFixed: "is-fixed",
            navigationSlideUp: "slide-up",
        };

        //navigation controller config
        /**
         *
         * @type {boolean}
         */
        this.scrolling = false;
        /**
         *
         * @type {number}
         */
        this.scrollNavigationOffset = 20; //main navigation scroll offset
        /**
         *
         * @type {number}
         */
        this.previousTop = 0;
        /**
         *
         * @type {number}
         */
        this.currentTop = 0;
        /**
         *
         * @type {number}
         */
        this.scrollDelta = 0;
        /**
         *
         * @type {number}
         */
        this.scrollOffset = 0;

        /**
         *
         * @type {{} & {navigationSlideUp: string, navigation: string, activeClass: string, navigationScrolled: string, navigationHidden: string, navigationSlideDown: string, navigationFixed: string, } & Object}
         */
        this.defaults = Object.assign({}, _defaults, options);
    }

    //region getters
    /**
     *
     * @returns {Element}
     */
    get navigation() {
        return document.querySelector(this.defaults.navigation);
    }

    //endregion

    //region methods
    /**
     *
     */
    init() {
        console.log("Navigation init()");

        if (this.navigation) {
            this.navigationController();
        }
    }

    //NAVIGATION
    /**
     *
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
     *
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
     *
     * @param currentTop
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
