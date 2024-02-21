import { getViewportSize } from "../utilities/GetViewportSize";

/**
 * Responsive video
 * reads mobile, tablet and desktop data attributes containing video url (source) and poster
 * serves the correct video and poster based on viewport width
 */
export default class ResponsiveVideo {
    constructor(container = document) {
        /**
         * DOM elements
         * @type {{lazy: string, video: string}}
         */
        this.DOM = {
            video: ".js-responsive-video",
            lazy: "js-lazy-load",
        };

        /**
         * Get list of video DOM elements
         * @type {NodeListOf<Element>}
         */
        this.videos = container.querySelectorAll(this.DOM.video);
    }

    /**
     * Init
     */
    init() {
        if (this.videos.length < 1) {
            return;
        }
        this.initVideo();
    }

    /**
     * Init video
     */
    initVideo() {
        this.videos.forEach((video) => {
            const source = video.querySelector("source");

            // check if video is lazy loaded
            if (video.classList.contains(this.DOM.lazy)) {
                // set data-poster attribute from video data for lazy loading
                video.setAttribute("data-poster", this.getVideoData(video).poster);
                // set data-src attribute from video data for lazy loading
                source.setAttribute("data-src", this.getVideoData(video).src);
            } else {
                // set video poster from video data
                video.setAttribute("poster", this.getVideoData(video).poster);
                // set video src from video data
                source.setAttribute("src", this.getVideoData(video).src);
            }
            // resets the media element to its initial state and begins the process of selecting a media source
            // and loading the media in preparation for playback to begin at the beginning.
            // the amount of media data that is prefetched is determined by the value of the element's preload attribute.
            video.load();
        });
    }

    /**
     * Get video data
     * returns video data object from data attributes (source and poster) based on viewport width
     * @param video
     * @returns {{src: string, poster: string}}
     */
    getVideoData(video) {
        if (
            video.hasAttribute("data-widescreen-video") &&
            video.getAttribute("data-widescreen-video") !== "" &&
            video.hasAttribute("data-widescreen-poster") &&
            video.getAttribute("data-widescreen-poster") !== "" &&
            getViewportSize() >= 1921
        ) {
            return {
                src: video.dataset.widescreenVideo,
                poster: video.dataset.widescreenPoster,
            };
        } else if (
            video.hasAttribute("data-desktop-video") &&
            video.getAttribute("data-desktop-video") !== "" &&
            video.hasAttribute("data-desktop-poster") &&
            video.getAttribute("data-desktop-poster") !== "" &&
            getViewportSize() <= 1920 &&
            getViewportSize() >= 1141
        ) {
            return {
                src: video.dataset.desktopVideo,
                poster: video.dataset.desktopPoster,
            };
        } else if (
            video.hasAttribute("data-tablet-video") &&
            video.getAttribute("data-tablet-video") !== "" &&
            video.hasAttribute("data-tablet-poster") &&
            video.getAttribute("data-tablet-poster") !== "" &&
            getViewportSize() <= 1140 &&
            getViewportSize() >= 641
        ) {
            return {
                src: video.dataset.tabletVideo,
                poster: video.dataset.tabletPoster,
            };
        } else if (
            video.hasAttribute("data-mobile-video") &&
            video.getAttribute("data-mobile-video") !== "" &&
            video.hasAttribute("data-mobile-poster") &&
            video.getAttribute("data-mobile-poster") !== "" &&
            getViewportSize() <= 640
        ) {
            return {
                src: video.dataset.mobileVideo,
                poster: video.dataset.mobilePoster,
            };
        } else {
            return {
                src: video.dataset.desktopVideo,
                poster: video.dataset.desktopPoster,
            };
        }
    }
}
