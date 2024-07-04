/**
 * Video play button
 * control the play state of the video with play button
 */
export default class VideoPlayButton {
    constructor(container = document) {
        /**
         * DOM elements
         * @type {{wrapper: string, video: string, trigger: string, states: {playing: string}}}
         */
        this.DOM = {
            wrapper: ".js-video-play-button",
            video: ".js-video-play-button-video",
            trigger: ".js-video-play-button-trigger",
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
        const trigger = wrapper.querySelector(this.DOM.trigger);

        if (!video || !trigger) return;

        trigger.addEventListener("click", (event) => {
            event.preventDefault();
            this.playVideo(video);
        });

        video.addEventListener("click", (event) => {
            event.preventDefault();
            !video.paused ? this.pauseVideo(video) : this.playVideo(video);
        });

        video.addEventListener("playing", () => {
            wrapper.classList.add(this.DOM.states.playing);
        });

        video.addEventListener("pause", () => {
            wrapper.classList.remove(this.DOM.states.playing);
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
