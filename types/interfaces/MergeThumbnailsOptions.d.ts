export default interface MergeThumbnailsOptions {
    /**
      * Background color of merged thumbnails.
      * This option accepts a color name, a hex color, or a numerical RGB, RGBA, HSL, HSLA, CMYK, or CMYKA specification.
      * For example, blue, #dddddff, rgb(255,255,255), etc.
      * Default is white.
      */
    background: string;
    /**
      * Offset (in pixels) between merged images. Default is 0.
      */
    offset: number;
}
