import { getViewportWidth } from "../utilities/Viewport";

/**
 * Responsive video
 * reads sd, hd, fhd and qhd data attributes containing video posters
 * serves the correct poster based on viewport width
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
            // check if video is lazy loaded
            if (video.classList.contains(this.DOM.lazy)) {
                // set data-poster attribute from video data for lazy loading
                video.setAttribute("data-poster", this.getPoster(video));
            } else {
                // set video poster from video data
                video.setAttribute("poster", this.getPoster(video));
            }
            // resets the media element to its initial state and begins the process of selecting a media source
            // and loading the media in preparation for playback to begin at the beginning.
            // the amount of media data that is prefetched is determined by the value of the element's preload attribute.
            video.load();
        });
    }

    /**
     * Get poster
     * returns video poster based on viewport width
     * @param video
     * @returns {string}
     */
    getPoster(video) {
        const resolutions = [
            {
                type: "qhd",
                condition: getViewportWidth() >= 1921,
            },
            {
                type: "fhd",
                condition: getViewportWidth() <= 1920 && getViewportWidth() >= 1141,
            },
            {
                type: "hd",
                condition: getViewportWidth() <= 1140 && getViewportWidth() >= 641,
            },
            {
                type: "sd",
                condition: getViewportWidth() <= 640,
            },
        ];

        for (let resolution of resolutions) {
            if (
                video.hasAttribute(`data-${resolution.type}-poster`) &&
                video.getAttribute(`data-${resolution.type}-poster`) !== "" &&
                resolution.condition
            ) {
                return video.getAttribute(`data-${resolution.type}-poster`);
            }
        }

        return video.getAttribute("data-fhd-poster");
    }
}
