const pdf2thumbnail = require('../dist/build.common');

const inputPath = `${__dirname}/sample.pdf`;
const outputDir = `${__dirname}/output/case-0`;

describe('Case of exception', () => {
  test('Should throw an error if the PDF path parameter is empty.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(null, outputDir)).rejects.toThrow();
  });

  test('Should throw an error if the PDF is not found.', async () => {
    await expect(pdf2thumbnail.writeThumbnails('unknown.pdf', outputDir)).rejects.toThrow();
  });

  test('Should throw an error if the width option is 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(inputPath, outputDir, {width: 0})).rejects.toThrow();
  });

  test('Should throw an error if width option is less than 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(inputPath, outputDir, {width: -1})).rejects.toThrow();
  });

  test('Should throw an error if quality option is 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(inputPath, outputDir, {quality: 0})).rejects.toThrow();
  });

  test('Should throw an error if quality option is less than 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(inputPath, outputDir, {quality: -1})).rejects.toThrow();
  });

  test('Should throw an error if quality option is greater than 100.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(inputPath, outputDir, {quality: 101})).rejects.toThrow();
  });

  test('Should throw an error if the start option is 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(inputPath, outputDir, {start: 0})).rejects.toThrow();
  });

  test('Should throw an error if start option is less than 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(inputPath, outputDir, {start: -1})).rejects.toThrow();
  });

  test('Should throw an error if end option is 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(inputPath, outputDir, {end: 0})).rejects.toThrow();
  });

  test('Should throw an error if end option is less than 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(inputPath, outputDir, {end: -1})).rejects.toThrow();
  });


  test('Should throw an error if offset option is less than 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(inputPath, outputDir, {offset: -1})).rejects.toThrow();
  });
});