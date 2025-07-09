/**
 * Video on scroll
 * Control the play state of the video based on its visibility using IntersectionObserver.
 * Play video if in view / pause video if not in view.
 */
export default class VideoOnScroll {
    constructor(container = document) {
        /**
         * Config
         * @type {{selectors: {wrapper: string, video: string}, states: {playing: string}}}
         */
        this.config = {
            selectors: {
                wrapper: ".js-video-on-scroll",
                video: ".js-responsive-video",
            },
            states: {
                playing: "is-playing",
            },
        };

        /**
         * Get a list of wrapper DOM elements
         * @type {NodeListOf<Element>}
         */
        this.wrappers = container.querySelectorAll(this.config.selectors.wrapper);

        /**
         * Bind video controller method
         */
        this.handleIntersect = this.handleIntersect.bind(this);
    }

    /**
     * Init
     */
    init() {
        if (this.wrappers.length < 1) {
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        this.observer = new IntersectionObserver(this.handleIntersect, observerOptions);

        this.wrappers.forEach((wrapper) => {
            const video = wrapper.querySelector(this.config.selectors.video);
            if (!video) return;
            wrapper._video = video;
            this.observer.observe(wrapper);
        });
    }

    /**
     * Intersection Observer handler
     * @param {IntersectionObserverEntry[]} entries
     */
    handleIntersect(entries) {
        entries.forEach((entry) => {
            const wrapper = entry.target;
            const video = wrapper._video;
            if (!video) return;
            if (entry.isIntersecting) {
                this.playVideo(video);
            } else {
                this.pauseVideo(video);
            }
        });
    }

    /**
     * Play video
     * @param {HTMLVideoElement} video
     */
    playVideo(video) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.warn("Video play failed:", error);
            });
        }
    }

    /**
     * Pause video
     * @param {HTMLVideoElement} video
     */
    pauseVideo(video) {
        video.pause();
    }
}
