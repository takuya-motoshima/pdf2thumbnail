export default interface MergeOptions {
    /**
     * Background color of merged thumbnails.
     * This option accepts a color name, a hex color, or a numerical RGB, RGBA, HSL, HSLA, CMYK, or CMYKA specification.
     * For example, blue, #dddddff, rgb(255,255,255), etc.
     * Default is white.
     * @type {string}
     */
    background: string;
    /**
     * Offset (in pixels) between merged images. Default is 0.
     * @type {number}
     */
    offset: number;
}
