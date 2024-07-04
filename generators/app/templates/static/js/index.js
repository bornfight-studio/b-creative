/**
 * MAIN JS FILE
 */

/**
 * Helpers
 */
import Grid from "./helpers/Grid";

/**
 * Components
 */
import "instant.page";
import Lazy from "./components/Lazy";
import ResponsiveVideo from "./components/ResponsiveVideo";
import VideoOnScroll from "./components/VideoOnScroll";
import VideoPlayButton from "./components/VideoPlayButton";
import Accordion from "@bornfight/b-accordion";
import ScrollToAnimation from "./components/animations/ScrollToAnimation";
import AcceptanceInput from "./components/inputs/AcceptanceInput";
import PasswordInput from "./components/inputs/PasswordInput";
import SearchInput from "./components/inputs/SearchInput";
import SelectInput from "./components/inputs/SelectInput";
import Navigation from "./components/Navigation";
import Slider from "./components/sliders/Slider";

/**
 * Check if document is ready cross-browser
 * @param callback
 */
const ready = (callback) => {
    if (document.readyState !== "loading") {
        /**
         * Document is already ready, call the callback directly
         */
        callback();
    } else if (document.addEventListener) {
        /**
         * All modern browsers to register DOMContentLoaded
         */
        document.addEventListener("DOMContentLoaded", callback);
    } else {
        /**
         * Old IE browsers
         */
        document.attachEvent("onreadystatechange", function () {
            if (document.readyState === "complete") {
                callback();
            }
        });
    }
};

/**
 * Document ready callback
 */
ready(() => {
    /**
     * CREDITS
     */
    const credits = [
        "background-color: #000000",
        "color: white",
        "display: block",
        "line-height: 24px",
        "text-align: center",
        "border: 1px solid #ffffff",
        "font-weight: bold",
    ].join(";");
    console.info("dev by: %c Bornfight Studio ", credits);

    /**
     * HELPERS
     */

    /**
     * Grid
     * @type {Grid}
     */
    const grid = new Grid();
    grid.init();

    /**
     * COMPONENTS
     */

    /**
     * Lazy
     * @type {Lazy}
     */
    const lazy = new Lazy();
    lazy.init();

    /**
     * Responsive video
     * @type {ResponsiveVideo}
     */
    const responsiveVideo = new ResponsiveVideo();
    responsiveVideo.init();

    /**
     * Video on scroll
     * @type {VideoOnScroll}
     */
    const videoOnScroll = new VideoOnScroll();
    videoOnScroll.init();

    /**
     * Video play button
     * @type {VideoPlayButton}
     */
    const videoPlayButton = new VideoPlayButton();
    videoPlayButton.init();

    /**
     * Accordion
     * @type {Accordion}
     */
    new Accordion(undefined, {
        openingEase: "power2.out",
        closingEase: "power2.in",
    });

    /**
     * Scroll to animation
     * @type {ScrollToAnimation}
     */
    const scrollToAnimation = new ScrollToAnimation();
    scrollToAnimation.init();

    /**
     * Acceptance input
     * @type {AcceptanceInput}
     */
    const acceptanceInput = new AcceptanceInput();
    acceptanceInput.init();

    /**
     * Password input
     * @type {PasswordInput}
     */
    const passwordInput = new PasswordInput();
    passwordInput.init();

    /**
     * Search input
     * @type {SearchInput}
     */
    const searchInput = new SearchInput();
    searchInput.init();

    /**
     * Select input
     * @type {SelectInput}
     */
    const selectInput = new SelectInput();
    selectInput.init();

    /**
     * Navigation
     * @type {Navigation}
     */
    const navigation = new Navigation();
    navigation.init();

    /**
     * Slider
     * @type {Slider}
     */
    const slider = new Slider();
    slider.init();
});
