export default class ScrollLocker {
    constructor() {
        this.body = document.querySelector('body');
    }

    /**
     * Lock scroll
     */

    lockScroll() {
        if (this.body.classList.contains('is-locked')) {
            return;
        }
        this.offsetTop = document.documentElement.scrollTop;
        this.body.style.overflow = 'hidden';
        this.body.style.top = `-${document.documentElement.scrollTop}px`;
        this.body.style.position = 'fixed';

        if (this.offsetTop > 100) {
            this.body.classList.add('is-fixed-scrolled');
        }
    }

    /**
     * Reset scroll, and scroll position
     */
    unlockScroll() {
        this.body.style.top = '0px';
        this.body.style.position = '';
        this.body.style.overflow = '';
        document.documentElement.scrollTop = this.offsetTop;
        this.body.classList.remove('is-locked');
    }
}
