export default interface ThumbnailOptions {
    /**
     * Width of output thumbnail (px). Default is 595 (px).
     */
    width: number;
    /**
     * The quality of the thumbnail to output (1-100). Default is 100.
     */
    quality: number;
    /**
     * The format of the output thumbnail. Default is jpg.
     */
    format: string;
    /**
     * Starting page position starting from 1.
     */
    start: number;
    /**
     * End page position starting from 1.
     */
    end: number;
    /**
     * If true, it generates an archive (.zip) containing all images with the same name as the output directory (outputDir). Default is false.
     */
    archive: boolean;
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
