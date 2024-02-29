import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Video on scroll
 * control the play state of the video based on current viewport with gsap ScrollTrigger
 * play video if in view / pause video if not in view
 */
export default class VideoOnScroll {
    constructor(container = document) {
        /**
         * DOM elements
         * @type {{wrapper: string, video: string, states: {playing: string}}}
         */
        this.DOM = {
            wrapper: ".js-video-on-scroll",
            video: ".js-video-on-scroll-video",
            states: {
                playing: "is-playing",
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
        this.wrappers.forEach((wrapper) => this.videoController(wrapper));
    }

    /**
     * Video controller
     * uses: https://greensock.com/scrolltrigger/
     * @param wrapper
     */
    videoController(wrapper) {
        const video = wrapper.querySelector(this.DOM.video);
        if (!video) return;

        // pause video on load
        this.pauseVideo(video);

        // use gsap ScrollTrigger to detect if wrapper is in view
        ScrollTrigger.create({
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            markers: false,
            onEnter: () => this.playVideo(video),
            onEnterBack: () => this.playVideo(video),
            onLeave: () => this.pauseVideo(video),
            onLeaveBack: () => this.pauseVideo(video),
        });
    }

    /**
     * Play video
     * @param video
     */
    playVideo(video) {
        video.play();
    }

    /**
     * Pause video
     * @param video
     */
    pauseVideo(video) {
        video.pause();
    }
}
