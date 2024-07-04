import Swiper from "swiper";
import { Autoplay, EffectCreative, EffectFade, FreeMode, Navigation, Pagination, Parallax, Scrollbar } from "swiper/modules";
import { getViewportWidth } from "../../utilities/Viewport";

/**
 * Slider
 * customizable modular slider with swiper.js lib
 * automatic detection of navigation, pagination and scrollbar in DOM
 * DATA ATTRIBUTES (with defaults):
 * data-pagination-clickable="false"
 * data-pagination-type="bullets" | "fraction" | "progressbar" | "custom"
 * data-scrollbar-draggable="false"
 * data-slides-per-view="1"
 * data-slides-per-view-tablet="1"
 * data-slides-per-view-mobile="1"
 * data-space-between="60"
 * data-space-between-tablet="60"
 * data-space-between-mobile="30"
 * data-slides-per-group="1"
 * data-slides-per-group-tablet="1"
 * data-slides-per-group-mobile="1"
 * data-speed="300"
 * data-loop="false"
 * data-autoplay="false"
 * data-autoplay-speed="5000"
 * data-autoplay-disable-on-interaction="false"
 * data-autoplay-stop-on-last-slide="false"
 * data-autoplay-pause-on-mouse-enter="false"
 * data-effect="slide" | "fade" | "creative"
 * data-parallax="false"
 * data-free-mode="false"
 * data-free-mode-sticky="false"
 * data-centered-slides="false"
 * data-grab-cursor="false"
 * MINIMAL DEMO (without configuration):
 * <div class="js-slider">
 *     <div class="swiper js-slider-swiper">
 *         <div class="swiper-wrapper">
 *             <div class="swiper-slide js-slider-single"></div>
 *         </div>
 *     </div>
 * </div>
 */
export default class Slider {
    constructor(container = document) {
        /**
         * DOM elements
         * @type {{single: string, next: string, slider: string, scrollbar: string, navigation: string, pagination: string, prev: string, classes: {bulletClass: string, fractionNumberClass: string, dragClass: string, fractionDividerClass: string}, wrapper: string, states: {hidden: string, active: string, disabled: string}}}
         */
        this.DOM = {
            wrapper: ".js-slider",
            slider: ".js-slider-swiper",
            single: ".js-slider-single",
            navigation: ".js-slider-navigation",
            next: ".js-slider-next",
            prev: ".js-slider-prev",
            pagination: ".js-slider-pagination",
            scrollbar: ".js-slider-scrollbar",
            states: {
                active: "is-active",
                disabled: "is-disabled",
                hidden: "is-hidden",
            },
            classes: {
                bulletClass: "c-slider-pagination__bullet",
                dragClass: "c-slider-scrollbar__inner",
                fractionNumberClass: "c-slider-fraction__number",
                fractionDividerClass: "c-slider-fraction__divider",
            },
        };

        /**
         * Get list of wrapper DOM elements
         * @type {NodeListOf<Element>}
         */
        this.wrappers = container.querySelectorAll(this.DOM.wrapper);
    }

    /**
     * Init
     */
    init() {
        if (this.wrappers.length < 1) {
            return;
        }
        this.wrappers.forEach((wrapper) => {
            this.initSingleSlider(wrapper);
        });
    }

    /**
     * Init single slider
     * uses: swiper.js lib -> https://github.com/nolimits4web/swiper
     * @param instance
     */
    initSingleSlider(instance) {
        const slider = instance.querySelector(this.DOM.slider);
        const single = instance.querySelectorAll(this.DOM.single);

        if (slider === null || single.length < 1) return;

        const navigation = instance.querySelector(this.DOM.navigation);
        const next = instance.querySelector(this.DOM.next);
        const prev = instance.querySelector(this.DOM.prev);

        const pagination = instance.querySelector(this.DOM.pagination);
        const paginationClickable = slider.dataset.paginationClickable;
        const paginationType = slider.dataset.paginationType;

        const scrollbar = instance.querySelector(this.DOM.scrollbar);
        const scrollbarDraggable = slider.dataset.scrollbarDraggable;

        const slidesPerView = parseFloat(slider.dataset.slidesPerView);
        const slidesPerViewTablet = parseFloat(slider.dataset.slidesPerViewTablet);
        const slidesPerViewMobile = parseFloat(slider.dataset.slidesPerViewMobile);
        const spaceBetween = parseFloat(slider.dataset.spaceBetween);
        const spaceBetweenTablet = parseFloat(slider.dataset.spaceBetweenTablet);
        const spaceBetweenMobile = parseFloat(slider.dataset.spaceBetweenMobile);
        const slidesPerGroup = parseFloat(slider.dataset.slidesPerGroup);
        const slidesPerGroupTablet = parseFloat(slider.dataset.slidesPerGroupTablet);
        const slidesPerGroupMobile = parseFloat(slider.dataset.slidesPerGroupMobile);
        const speed = parseFloat(slider.dataset.speed);
        const loop = slider.dataset.loop;
        const autoplay = slider.dataset.autoplay;
        const autoplaySpeed = parseFloat(slider.dataset.autoplaySpeed);
        const autoplayDisableOnInteraction = slider.dataset.autoplayDisableOnInteraction;
        const autoplayStopOnLastSlide = slider.dataset.autoplayStopOnLastSlide;
        const autoplayPauseOnMouseEnter = slider.dataset.autoplayPauseOnMouseEnter;
        const effect = slider.dataset.effect;
        const parallax = slider.dataset.parallax;
        const freeMode = slider.dataset.freeMode;
        const freeModeSticky = slider.dataset.freeModeSticky;
        const centeredSlides = slider.dataset.centeredSlides;
        const grabCursor = slider.dataset.grabCursor;

        const swiper = new Swiper(slider, {
            modules: [Autoplay, Navigation, Pagination, Scrollbar, FreeMode, EffectFade, EffectCreative, Parallax],
            touchEventsTarget: "container",
            effect: effect || "slide",
            speed: speed || 300,
            loop: loop === "true",
            allowTouchMove: single.length > slidesPerViewMobile || 1,
            slidesPerView: slidesPerViewMobile || 1,
            spaceBetween: !isNaN(spaceBetweenMobile) ? spaceBetweenMobile : 30,
            slidesPerGroup: slidesPerViewMobile > 1 ? slidesPerGroupMobile : 1,
            centeredSlides: centeredSlides === "true",
            parallax: parallax === "true",
            grabCursor: grabCursor === "true",
            breakpoints: {
                641: {
                    allowTouchMove: single.length > slidesPerViewTablet || 1,
                    slidesPerView: slidesPerViewTablet || 1,
                    spaceBetween: !isNaN(spaceBetweenTablet) ? spaceBetweenTablet : 60,
                    slidesPerGroup: slidesPerViewTablet > 1 ? slidesPerGroupTablet : 1,
                },
                1141: {
                    allowTouchMove: single.length > slidesPerView || 1,
                    slidesPerView: slidesPerView || 1,
                    spaceBetween: !isNaN(spaceBetween) ? spaceBetween : 60,
                    slidesPerGroup: slidesPerView > 1 ? slidesPerGroup : 1,
                },
                1441: {
                    allowTouchMove: single.length > slidesPerView || 1,
                    slidesPerView: slidesPerView || 1,
                    spaceBetween: !isNaN(spaceBetween) ? this.getResponsiveValue(spaceBetween) : this.getResponsiveValue(60),
                    slidesPerGroup: slidesPerView > 1 ? slidesPerGroup : 1,
                },
            },
            navigation:
                navigation !== null && next !== null && prev !== null
                    ? {
                          nextEl: next,
                          prevEl: prev,
                          disabledClass: this.DOM.states.disabled,
                          lockClass: this.DOM.states.hidden,
                      }
                    : false,
            pagination:
                pagination !== null
                    ? {
                          el: pagination,
                          clickable: paginationClickable === "true",
                          bulletClass: this.DOM.classes.bulletClass,
                          bulletActiveClass: this.DOM.states.active,
                          lockClass: this.DOM.states.hidden,
                          type: paginationType || "bullets",
                          renderFraction: (currentClass, totalClass) => {
                              return `
                                <span class="${this.DOM.classes.fractionNumberClass} ${currentClass}"></span>
                                <span class="${this.DOM.classes.fractionDividerClass}">&nbsp;//&nbsp;</span>
                                <span class="${this.DOM.classes.fractionNumberClass} ${totalClass}"></span>
                              `;
                          },
                          formatFractionCurrent: (number) => {
                              return ("0" + number).slice(-2);
                          },
                          formatFractionTotal: (number) => {
                              return ("0" + number).slice(-2);
                          },
                      }
                    : false,
            scrollbar:
                scrollbar !== null
                    ? {
                          draggable: scrollbarDraggable,
                          el: scrollbar,
                          dragClass: this.DOM.classes.dragClass,
                          lockClass: this.DOM.states.hidden,
                          scrollbarDisabledClass: this.DOM.states.disabled,
                      }
                    : false,
            autoplay:
                autoplay === "true"
                    ? {
                          delay: !isNaN(autoplaySpeed) ? autoplaySpeed : 5000,
                          disableOnInteraction: autoplayDisableOnInteraction === "true",
                          pauseOnMouseEnter: autoplayPauseOnMouseEnter === "true",
                          stopOnLastSlide: autoplayStopOnLastSlide === "true",
                      }
                    : false,
            freeMode:
                freeMode === "true"
                    ? {
                          enabled: true,
                          sticky: freeModeSticky === "true",
                      }
                    : false,
            fadeEffect: {
                crossFade: effect === "fade",
            },
            creativeEffect: {
                prev: {
                    translate: [0, 0, -100],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            },
        });

        // if next and previous buttons have disabled class
        // hide navigation
        if (
            navigation !== null &&
            next !== null &&
            next.classList.contains(this.DOM.states.hidden) &&
            prev !== null &&
            prev.classList.contains(this.DOM.states.hidden)
        ) {
            navigation.classList.add(this.DOM.states.hidden);
        }
    }

    /**
     * Get responsive value
     * @param value
     * @returns {number}
     */
    getResponsiveValue(value) {
        return Math.floor(((value / (1440 * 0.01)) * getViewportWidth()) / 100);
    }
}
