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
import Lazy from "./components/common/Lazy";
import ResponsiveVideo from "./components/common/ResponsiveVideo";
import VideoOnScroll from "./components/common/VideoOnScroll";
import VideoPlayButton from "./components/common/VideoPlayButton";
import ScrollToAnimation from "./components/animations/ScrollToAnimation";
import Navigation from "./components/common/Navigation";

/**
 * Check if the document is ready cross-browser
 * @param callback
 */
const ready = (callback) => {
    if (document.readyState !== "loading") {
        /**
         * The document is already ready, call the callback directly
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
     * Scroll to animation
     * @type {ScrollToAnimation}
     */
    const scrollToAnimation = new ScrollToAnimation();
    scrollToAnimation.init();

    /**
     * Navigation
     * @type {Navigation}
     */
    const navigation = new Navigation();
    navigation.init();
});
