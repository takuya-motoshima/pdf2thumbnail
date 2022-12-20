const pdf2thumbnail = require('../dist/build.common');

describe('Total number of PDF pages', () => {
  test('Should get the number of pages in the PDF.', async () => {
    const totalPages = await pdf2thumbnail.getTotalNumberOfPages(`${__dirname}/sample.pdf`);
    expect(totalPages).toBe(3);
  });
});