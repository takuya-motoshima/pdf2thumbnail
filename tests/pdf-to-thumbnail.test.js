const pdf2thumbnail = require('../dist/build.common');
const {File, Media} = require('nodejs-shared');

const PDF_PATH = `${__dirname}/sample.pdf`;
const RESULTS_DIR = `${__dirname}/results`;

beforeAll(() => {
  if (File.existsFile(RESULTS_DIR))
    File.deleteDirectory(RESULTS_DIR);
});

describe('PDF to Thumbnail', () => {
  test('Should write thumbnails of all pages.', async () => {
    const outputDir  = `${RESULTS_DIR}/case-1`;
    await pdf2thumbnail.writeThumbnails(PDF_PATH, outputDir, {format: 'jpg'});
    const found = File.find(`${outputDir}/*.jpg`);
    const expected = [
      `${outputDir}/sample.jpg`,
      `${outputDir}/sample_1.jpg`,
      `${outputDir}/sample_2.jpg`,
      `${outputDir}/sample_3.jpg`
    ];
    expect(found.sort()).toEqual(expected.sort());
  });

  test('Should write thumbnails for pages 2-3.', async () => {
    const outputDir  = `${RESULTS_DIR}/case-2`;
    await pdf2thumbnail.writeThumbnails(PDF_PATH, outputDir, {format: 'jpg', start: 2, end: 3});
    const found = File.find(`${outputDir}/*.jpg`);
    const expected = [
      `${outputDir}/sample.jpg`,
      `${outputDir}/sample_2.jpg`,
      `${outputDir}/sample_3.jpg`
    ];
    expect(found.sort()).toEqual(expected.sort());
  });

  test('Should be a thumbnail of the specified width.', async () => {
    const outputDir  = `${RESULTS_DIR}/case-3`;
    const width = 210;
    await pdf2thumbnail.writeThumbnails(PDF_PATH, outputDir, {format: 'jpg', width});
    for (let filePath of File.find(`${outputDir}/*.jpg`)) {
      const {width: actualWidth} = Media.getDimensions(filePath);
      expect(actualWidth).toBe(width);
    }
  });

  test('An archive of thumbnails should be created.', async () => {
    const outputDir  = `${RESULTS_DIR}/case-4`;
    await pdf2thumbnail.writeThumbnails(PDF_PATH, outputDir, {format: 'jpg', archive: true});
    expect(File.existsFile(`${outputDir}.zip`)).toBe(true);
  });

  test('Each thumbnail in the merged image should be written at 30px intervals.', async () => {
    const outputDir  = `${RESULTS_DIR}/case-5`;
    const offset = 30;
    await pdf2thumbnail.writeThumbnails(PDF_PATH, outputDir, {format: 'jpg', offset, background: '#000'});
    const {height: thumbnailHeight} = Media.getDimensions(`${outputDir}/sample_1.jpg`);
    const {height: actualHeight} = Media.getDimensions(`${outputDir}/sample.jpg`);
    const totalPage = await pdf2thumbnail.getTotalNumberOfPages(PDF_PATH);
    const expectedHeight = thumbnailHeight * totalPage + offset * (totalPage - 1);
    expect(actualHeight).toBe(expectedHeight);
  });

  test('Should write thumbnails in png format.', async () => {
    const outputDir  = `${RESULTS_DIR}/case-6`;
    await pdf2thumbnail.writeThumbnails(PDF_PATH, outputDir, {format: 'png'});
    const found = File.find(`${outputDir}/*.png`);
    const expected = [
      `${outputDir}/sample.png`,
      `${outputDir}/sample_1.png`,
      `${outputDir}/sample_2.png`,
      `${outputDir}/sample_3.png`
    ];
    expect(found.sort()).toEqual(expected.sort());
  });
});