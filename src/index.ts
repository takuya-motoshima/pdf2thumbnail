// TODO: When importing, "Error: ENOENT: no such file or directory, open './test/data/05-versions-space.pdf'" occurred, so require was used.
const pdf = require('pdf-parse');
// import pdf from 'pdf-parse';
import im from 'imagemagick';
import {File} from 'nodejs-shared';
import fs from 'fs';

/**
 * Thumbnail output option.
 */
interface ThumbnailOptions {
  width?: number
  quality?: number
  format?: string
  start?: number
  end?: number
}

/**
 * Get the total number of pages in the PDF document.
 *
 * @param   {string}          filePath  Path of the PDF file.
 * @returns {Promise<number>}           Total number of pages in the PDF document.
 */
export async function getTotalNumberOfPages(filePath: string): Promise<number> {
  // If the file is not found.
  if (!File.existsFile(filePath))
    throw new Error(`${filePath} File cannot be found`);

  // Document Content.
  const content = fs.readFileSync(filePath);

  // Return for total number of pages.
  const {numpages} = await pdf(content);
  return numpages as number;
}

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
export async function writeThumbnails(filePath: string, outDir: string, options: ThumbnailOptions = {}): Promise<void> {
  // If the file is not found.
  if (!File.existsFile(filePath))
    throw new Error(`${filePath} File cannot be found`);

  // The file name of the PDF without the extension.
  const basename = File.basename(filePath);

  // If there is no output directory, create one.
  if (!fs.existsSync(outDir))
    File.makeDirectory(outDir)

  // If the quality is not in the range of 1 to 100.
  if (options.quality && (options.quality < 1 || options.quality > 100))
    throw new Error('Quality is available from 1 to 100');

  // Initialize options.
  options = Object.assign({
    width: 300,
    quality: 100,
    format: 'jpg'
  }, options);

  // If there is a position option.
  if (options.start || options.end) {
    if (options.start && options.start < 1)
      // If the starting page number is less than 1.
      throw new Error('The starting page number must be at least 1');

    // Get total page numbers.
    const totalNumberOfPages = await getTotalNumberOfPages(filePath);

    // If the end page number exceeds the maximum number of pages.
    if (options.end && options.end > totalNumberOfPages)
      throw new Error(`The end page number must be ${totalNumberOfPages} or less`);

    // Thumbnail the specified page.
    for (let i=(options.start || 1)-1, end=options.end || totalNumberOfPages; i<end; i++) {
      await new Promise<void>((rslv, rej) => {
        // convert sample.pdf[0] -thumbnail x300 -background white -alpha remove -quality 100 -scene 1 out/%d.jpg
        // convert sample.pdf[1] -thumbnail x300 -background white -alpha remove -quality 100 -scene 2 out/%d.jpg
        // ...
        im.convert([
          `${filePath}[${i}]`,
          '-thumbnail',
          `x${options.width}`,
          '-background',
          'white',
          '-alpha',
          'remove',
          '-quality',
          options.quality,
          '-scene',
          i+1,
          `${outDir.replace(/\/$/, '')}/${basename}_%d.${options.format}`
        ], (err: any) => {
          if (err)
            return void rej(err);
          rslv();
        });
      });
    }
  } else {
    // Thumbnails of all pages.
    return new Promise((rslv, rej) => {
      // convert sample.pdf -thumbnail x300 -background white -alpha remove -quality 100 -scene 1 out/%d.jpg
      im.convert([
        filePath,
        '-thumbnail',
        `x${options.width}`,
        '-background',
        'white',
        '-alpha',
        'remove',
        '-quality',
        options.quality,
        '-scene',
        '1',
        `${outDir.replace(/\/$/, '')}/${basename}_%d.${options.format}`
      ], (err: any) => {
        if (err)
          return void rej(err);
        rslv();
      });
    });
  }
}