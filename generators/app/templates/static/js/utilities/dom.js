/**
 * DOM utilities
 * usage:
 * import { $html, $body } from "../utilities/dom.js";
 */

/**
 * Get html element
 * @type {HTMLElement}
 */
const $html = document.documentElement;

/**
 * Get document body
 * @type {HTMLElement}
 */
const $body = document.body;

/**
 * DOM utilities export
 * @type {{
 * $html: HTMLElement,
 * $body: HTMLElement
 * }}
 */
export { $html, $body };
