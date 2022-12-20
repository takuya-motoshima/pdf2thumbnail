import MergeThumbnailsOptions from '~/interfaces/MergeThumbnailsOptions';
/**
 * Merge thumbnails.
 *
 * @export
 * @param {string[]}  thumbnailPaths      Thumbnail path list.
 * @param {string}    outputPath          Output image path.
 * @param {string}    options.background  Background color of merged thumbnails.
 *                                        This option accepts a color name, a hex color, or a numerical RGB, RGBA, HSL, HSLA, CMYK, or CMYKA specification.
 *                                        For example, blue, #dddddff, rgb(255,255,255), etc.
 *                                        Default is white.
 * @param {number} options.offset         Offset (in pixels) between merged images. Default is 0.
 * @return {Promise<void>}
 */
declare const _default: (thumbnailPaths: string[], outputPath: string, options?: Partial<MergeThumbnailsOptions>) => Promise<void>;
export default _default;
