import im from 'imagemagick';

/**
 * Run the command to convert PDF to image.
 *
 * @param {string} pdfPath    Path of the PDF file.
 * @param {number} width      Width of output thumbnail (px).
 * @param {number} quality    The quality of the thumbnail to output (1-100).
 * @param {number} scene      PDF page number to be converted to image.
 * @param {string} outputPath Image file path to output.
 */
export default async (pdfPath: string, width: number, quality: number, scene: number, outputPath: string): Promise<void> => {
  return new Promise<void>((rslv, rej) => {
    im.convert([
      pdfPath,
      '-thumbnail',
      `${width}x`,
      '-background',
      'white',
      '-alpha',
      'remove',
      '-quality',
      quality,
      '-scene',
      scene,
      outputPath
    ], (err: any) => {
    // ], (err: any, stdout: any) => {
      if (err)
        return void rej(err);
      rslv();
    });
  });
}