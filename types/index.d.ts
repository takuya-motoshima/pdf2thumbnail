/**
 * Thumbnail output option.
 */
interface ThumbnailOptions {
    width?: number;
    quality?: number;
    format?: string;
    start?: number;
    end?: number;
}
/**
 * Get the total number of pages in the PDF document.
 *
 * @param   {string}          filePath  Path of the PDF file.
 * @returns {Promise<number>}           Total number of pages in the PDF document.
 */
export declare function getTotalNumberOfPages(filePath: string): Promise<number>;
/**
 * Write a thumbnail for each page of the PDF document.
 *
 * @param {string} filePath         Path of the PDF file.
 * @param {string} outDir           Directory path to output thumbnails.
 * @param {number} options.width?   Width of output thumbnail (px). Default is 300 (px).
 * @param {number} options.quality? The quality of the thumbnail to output (1-100). Default is 100.
 * @param {string} options.format?  The format of the output thumbnail. Default is jpg.
 * @param {number} options.start?   Start page position.
 * @param {number} options.end?     End page position.
 * @returns
 */
export declare function writeThumbnails(filePath: string, outDir: string, options?: ThumbnailOptions): Promise<void>;
export {};
