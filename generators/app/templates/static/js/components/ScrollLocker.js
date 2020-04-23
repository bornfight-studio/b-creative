export default class ScrollLocker {
    constructor() {
        this.body = document.querySelector('body');
    }

    lockScroll() {
        if (this.body.classList.contains('is-fixed-scrolled')) {
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

    unlockScroll() {
        this.body.style.top = '0px';
        this.body.style.position = '';
        this.body.style.overflow = '';
        document.documentElement.scrollTop = this.offsetTop;
        this.body.classList.remove('is-fixed-scrolled');
    }
}
