const {getTotalNumberOfPages, writeThumbnails} = require('pdf2thumbnail');

(async () => {
  // Total pages of PDF.
  const totalNumberOfPages = await getTotalNumberOfPages(`${__dirname}/sample.pdf`);
  console.log(totalNumberOfPages);// =>29

  // Thumbnail all pages.
  writeThumbnails(`${__dirname}/sample.pdf`, `${__dirname}/out1`);

  // Specify thumbnail width, quality, and format.
  writeThumbnails(`${__dirname}/sample.pdf`, `${__dirname}/out2`, {
    width: 300,
    quality: 100,
    format: 'png'
  });

  // Thumbnail of the first page only.
  writeThumbnails(`${__dirname}/sample.pdf`, `${__dirname}/out3`, {
    start: 1,
    end: 1
  });

  // Thumbnails for pages 2-5.
  writeThumbnails(`${__dirname}/sample.pdf`, `${__dirname}/out4`, {
    start: 2,
    end: 5
  });
})();