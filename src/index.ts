// TODO: When importing, "Error: ENOENT: no such file or directory, open './test/data/05-versions-space.pdf'" occurred, so require was used.
import fs from 'fs';
const pdf = require('pdf-parse');
// import pdf from 'pdf-parse';
import {File, Media} from 'nodejs-shared';
import archiveThumbnails from '~/shared/archiveThumbnails';
import mergeThumbnails from '~/shared/mergeThumbnails';
import convert from '~/shared/convert';
import ThumbnailOptions from '~/interfaces/ThumbnailOptions';
import ThumbnailResult from '~/interfaces/ThumbnailResult';

/**
 * Validate thumbnail options.
 * @param {string} pdfPathOrDataUrl The path to the PDF file, DataURL.
 * @param {number} options.width Width of output thumbnail (px).
 * @param {number} options.xDensity? Horizontal resolution. The unit is dpi and default is 288.
 * @param {number} options.yDensity? Vertical resolution. The unit is dpi and default is 288.
 * @param {number} options.quality The quality of the thumbnail to output (1-100).
 * @param {number} options.start? Starting page position starting from 1.
 * @param {number} options.end? End page position starting from 1.
 * @param {number} options.offset Offset (in pixels) between merged images.
 * @throws {TypeError} PDF path is empty.
 * @throws {TypeError} Cannot find file in PDF path.
 * @throws {TypeError} The width option is not a number greater than 1.
 * @throws {TypeError} The quality option is not a number between 1 and 100.
 * @throws {TypeError} The start option is not a number greater than 1.
 * @throws {TypeError} The end option is not a number greater than 1.
 * @throws {TypeError} The offset option is not a number greater than 0.
 */
function validateOptions(pdfPath: string, options: Partial<ThumbnailOptions> = {}): void {
  if (!pdfPath)
    throw new TypeError('The PDF path parameter is required');
  else if (!File.existsFile(pdfPath))
    throw new TypeError(`${pdfPath} not found`);
  else if (!options.width || options.width < 1)
    throw new TypeError('The width option should be a number greater than or equal to 1');
  else if (options.xDensity != null && options.xDensity < 72)
    throw new TypeError('The horizontal resolution option should be a number greater than or equal to 72');
  else if (options.yDensity != null && options.yDensity < 72)
    throw new TypeError('The vertical resolution option should be a number greater than or equal to 72');
  else if (!options.quality || options.quality < 1 || options.quality > 100)
    throw new TypeError('The quality option should be a number between 1 and 100');
  else if (options.start != null && options.start < 1)
    throw new TypeError('The start option should be a number greater than or equal to 1');
  else if (options.end != null && options.end < 1)
    throw new TypeError('The end option should be a number greater than or equal to 1');
  else if (options.offset! < 0)
    throw new TypeError('The offset option should be a number greater than or equal to 0');
}

/**
 * Get the total number of pages in the PDF document.
 * @param  {string} pdfPathOrDataUrl The path to the PDF file, DataURL.
 * @return {Promise<number>} Total number of pages in the PDF document.
 * @throws {TypeError} PDF path is empty.
 * @throws {TypeError} Cannot find file in PDF path.
 */
export const getTotalNumberOfPages = async (pdfPathOrDataUrl: string): Promise<number> => {
  // If input data is DataURL, output DataURL to a temporary file.
  let pdfPath = pdfPathOrDataUrl;
  if (Media.isDataUrl(pdfPathOrDataUrl)) {
    pdfPath = File.getTmpPath('pdf');
    Media.writeDataUrlToFile(pdfPath, pdfPathOrDataUrl);
  } else if (!File.existsFile(pdfPathOrDataUrl))
    // If the file is not found.
    throw new Error(`${pdfPathOrDataUrl} File cannot be found`);

  // Document Content.
  const content = fs.readFileSync(pdfPath);

  // Return for total number of pages.
  const {numpages} = await pdf(content);
  return numpages as number;
}

/**
 * Write a thumbnail for each page of the PDF document.
 * @param {string} pdfPathOrDataUrl The path to the PDF file, DataURL.
 * @param {string} outputDir Directory path to output thumbnails.
 * @param {number} options.width? Width of output thumbnail (px). Default is 595 (px).
 * @param {number} options.xDensity? Horizontal resolution. The unit is dpi and default is 288.
 * @param {number} options.yDensity? Vertical resolution. The unit is dpi and default is 288.
 * @param {number} options.quality? The quality of the thumbnail to output (1-100). Default is 100.
 * @param {string} options.format? The format of the output thumbnail. Default is jpg.
 * @param {number} options.start? Starting page position starting from 1.
 * @param {number} options.end? End page position starting from 1.
 * @param {boolean} options.archive? If true, it generates an archive (.zip) containing all images with the same name as the output directory (outputDir). Default is false.
 * @param {string} options.background? Background color of merged thumbnails.
 *                                     This option accepts a color name, a hex color, or a numerical RGB, RGBA, HSL, HSLA, CMYK, or CMYKA specification. 
 *                                     For example, blue, #dddddff, rgb(255,255,255), etc.
 *                                     Default is white.
 * @param {number} options.offset? Offset (in pixels) between merged images. Default is 0.
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
export const writeThumbnails = async (pdfPathOrDataUrl: string, outputDir: string, options: Partial<ThumbnailOptions> = {}): Promise<ThumbnailResult> => {
  // If input data is DataURL, output DataURL to a temporary file.
  let pdfPath = pdfPathOrDataUrl;
  if (Media.isDataUrl(pdfPathOrDataUrl)) {
    pdfPath = File.getTmpPath('pdf');
    Media.writeDataUrlToFile(pdfPath, pdfPathOrDataUrl);
  } else if (!File.existsFile(pdfPathOrDataUrl))
    // If the file is not found.
    throw new Error(`${pdfPathOrDataUrl} File cannot be found`);

  // The file name of the PDF without the extension.
  const basename = File.basename(pdfPath);

  // If the quality is not in the range of 1 to 100.
  if (options.quality && (options.quality < 1 || options.quality > 100))
    throw new Error('Quality is available from 1 to 100');

  // Initialize options.
  options = Object.assign({
    width: 595,
    xDensity: 288,
    yDensity: 288,
    quality: 100,
    format: 'jpg',
    archive: false,
    background: '#fff',
    offset: 0,
  }, options);

  // Validate thumbnail options.
  validateOptions(pdfPath, options);

  // If there is no output directory, create one.
  if (!File.existsFile(outputDir))
    File.makeDirectory(outputDir)

  // If there is a position option.
  if (options.start || options.end) {
    if (options.start && options.start < 1)
      // If the starting page number is less than 1.
      throw new Error('The starting page number must be at least 1');

    // Get total page numbers.
    const totalPages = await getTotalNumberOfPages(pdfPath);

    // If the end page number exceeds the maximum number of pages.
    if (options.end && options.end > totalPages)
      throw new Error(`The end page number must be ${totalPages} or less`);

    // Thumbnail the specified page.
    // Output command: convert sample.pdf[0] -thumbnail x595 -background white -alpha remove -quality 100 -scene 1 out/%d.jpg
    //                 convert sample.pdf[1] -thumbnail x595 -background white -alpha remove -quality 100 -scene 2 out/%d.jpg
    //                 ...
    for (let i=(options.start || 1)-1, end=options.end || totalPages; i<end; i++)
      await convert(`${pdfPath}[${i}]`, options.width!, options.xDensity!, options.yDensity!, options.quality!, i+1, `${outputDir.replace(/\/$/, '')}/${basename}_%d.${options.format}`);
  } else
    // Thumbnails of all pages.
    // Output command: convert sample.pdf -thumbnail x595 -background white -alpha remove -quality 100 -scene 1 out/%d.jpg
    await convert(pdfPath, options.width!, options.xDensity!, options.yDensity!, options.quality!, 1, `${outputDir.replace(/\/$/, '')}/${basename}_%d.${options.format}`);

  // Thumbnail path list.
  const thumbnailPaths = File.find(`${outputDir.replace(/\/$/, '')}/${basename}*.${options.format}`)
  // const thumbnailPaths = File.find(`${outputDir.replace(/\/$/, '')}/*`)
    .sort((a: string, b: string) => {
      return a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'})
    });

  // Merge thumbnails.
  const mergedPath = `${outputDir.replace(/\/$/, '')}/${basename}.${options.format}`;
  await mergeThumbnails(thumbnailPaths, mergedPath, {
    background: options.background,
    offset: options.offset,
  });

  // Return value.
  const result = {mergedPath, thumbnailPaths} as ThumbnailResult;

  // Archive Thumbnails.
  if (options.archive)
    result.archivePath = archiveThumbnails(outputDir);
  return result;
}