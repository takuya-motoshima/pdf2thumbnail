import ThumbnailOptions from '~/interfaces/ThumbnailOptions';
import ThumbnailResult from '~/interfaces/ThumbnailResult';
/**
 * Get the total number of pages in the PDF document.
 *
 * @export
 * @param  {string} pdfPathOrDataUrl The path to the PDF file, DataURL.
 * @return {Promise<number>} Total number of pages in the PDF document.
 * @throws {TypeError} PDF path is empty.
 * @throws {TypeError} Cannot find file in PDF path.
 */
export declare const getTotalNumberOfPages: (pdfPathOrDataUrl: string) => Promise<number>;
/**
 * Write a thumbnail for each page of the PDF document.
 *
 * @export
 * @param {string}  pdfPathOrDataUrl The path to the PDF file, DataURL.
 * @param {string}  outputDir Directory path to output thumbnails.
 * @param {number}  options.width? Width of output thumbnail (px). Default is 595 (px).
 * @param {number}  options.quality? The quality of the thumbnail to output (1-100). Default is 100.
 * @param {string}  options.format? The format of the output thumbnail. Default is jpg.
 * @param {number}  options.start? Starting page position starting from 1.
 * @param {number}  options.end? End page position starting from 1.
 * @param {boolean} options.archive? If true, it generates an archive (.zip) containing all images with the same name as the output directory (outputDir). Default is false.
 * @param {string}  options.background? Background color of merged thumbnails.
 *                                      This option accepts a color name, a hex color, or a numerical RGB, RGBA, HSL, HSLA, CMYK, or CMYKA specification.
 *                                      For example, blue, #dddddff, rgb(255,255,255), etc.
 *                                      Default is white.
 * @param {number}  options.offset?     Offset (in pixels) between merged images. Default is 0.
 * @return {Promise<ThumbnailResult>} Thumbnail Result. This is an object with the following elements.
 *                                    - {string[]} thumbnailPaths Path list of output thumbnail files. For example, sample_1.jpg, sample_2.jpg.
 *                                    - {string} mergedPath The path of the image file from which the thumbnails for each page are merged. For example, sample.jpg.
 *                                    - {string} archivePath? The path to the archive containing all thumbnails. This is only set if the archive option is true when creating thumbnails.
 * @throws {TypeError} PDF path is empty.
 * @throws {TypeError} Cannot find file in PDF path.
 * @throws {TypeError} The width option is not a number greater than 1.
 * @throws {TypeError} The quality option is not a number between 1 and 100.
 * @throws {TypeError} The start option is not a number greater than 1.
 * @throws {TypeError} The end option is not a number greater than 1.
 * @throws {TypeError} The offset option is not a number greater than 0.
 */
export declare const writeThumbnails: (pdfPathOrDataUrl: string, outputDir: string, options?: Partial<ThumbnailOptions>) => Promise<ThumbnailResult>;
