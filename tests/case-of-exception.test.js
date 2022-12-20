const pdf2thumbnail = require('../dist/build.common');

const PDF_PATH = `${__dirname}/sample.pdf`;
const OUTPUT_DIR = `${__dirname}/results/case-0`;

describe('Case of exception', () => {
  test('Should throw an error if the PDF path parameter is empty.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(null, OUTPUT_DIR)).rejects.toThrow();
  });

  test('Should throw an error if the PDF is not found.', async () => {
    await expect(pdf2thumbnail.writeThumbnails('unknown.pdf', OUTPUT_DIR)).rejects.toThrow();
  });

  test('Should throw an error if the width option is 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(PDF_PATH, OUTPUT_DIR, {width: 0})).rejects.toThrow();
  });

  test('Should throw an error if width option is less than 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(PDF_PATH, OUTPUT_DIR, {width: -1})).rejects.toThrow();
  });

  test('Should throw an error if quality option is 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(PDF_PATH, OUTPUT_DIR, {quality: 0})).rejects.toThrow();
  });

  test('Should throw an error if quality option is less than 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(PDF_PATH, OUTPUT_DIR, {quality: -1})).rejects.toThrow();
  });

  test('Should throw an error if quality option is greater than 100.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(PDF_PATH, OUTPUT_DIR, {quality: 101})).rejects.toThrow();
  });

  test('Should throw an error if the start option is 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(PDF_PATH, OUTPUT_DIR, {start: 0})).rejects.toThrow();
  });

  test('Should throw an error if start option is less than 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(PDF_PATH, OUTPUT_DIR, {start: -1})).rejects.toThrow();
  });

  test('Should throw an error if end option is 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(PDF_PATH, OUTPUT_DIR, {end: 0})).rejects.toThrow();
  });

  test('Should throw an error if end option is less than 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(PDF_PATH, OUTPUT_DIR, {end: -1})).rejects.toThrow();
  });


  test('Should throw an error if offset option is less than 0.', async () => {
    await expect(pdf2thumbnail.writeThumbnails(PDF_PATH, OUTPUT_DIR, {offset: -1})).rejects.toThrow();
  });
});