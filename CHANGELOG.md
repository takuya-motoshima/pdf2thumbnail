# Changelog
All notable changes to this project will be documented in this file.

## [1.0.5] - 2023/6/8
### Changed
- Fixed PDF image conversion method (pdf2thumbnail.writeThumbnails) not to delete output directory that already existed.
- The method to convert PDF to images (pdf2thumbnail.writeThumbnails) and the method to get the number of pages in a PDF (pdf2thumbnail.getTotalNumberOfPages) can now process PDF in DataURL format.

## [1.0.4] - 2022/12/21
### Changed
- Fix README.md.

## [1.0.3] - 2022/12/21
### Added
- Merged images of all page thumbnails have been added to the write-up results.  
    The merged image file will be written to the output directory with the same name as the PDF.  
    The following options related to images to be merged have been added.  
    - {string|{r: number, g: number, b: number, alpha: number}} options.background?  
        Background color of merged thumbnails.  
        This option accepts a color name, a hex color, or a numerical RGB, RGBA, HSL, HSLA, CMYK, or CMYKA specification.  
        For example, blue, #dddddff, rgb(255,255,255), etc.  
        Default is white.  
    - {number} options.offset? Offset (in pixels) between merged images. Default is 0.

    ```js
    const pdf2thumbnail = require('pdf2thumbnail');

    await pdf2thumbnail.writeThumbnails('sample.pdf', './result', {
      offset: 30,
      background: '#000'
    });
    ```
- Added thumbnail archive option.  
    If the archive option is true, an archive (zip) containing all thumbnails is created.  
    The archive file name will be &lt;output directory name&gt;.zip.
    ```js
    const pdf2thumbnail = require('pdf2thumbnail');

    await pdf2thumbnail.writeThumbnails('sample.pdf', './result', {archive: true});
    ```

    Check the written file.
    ```sh
    ll result*
    -rw-rw-rw- 1 ec2-user ec2-user 718211 Dec 20 18:04 result.zip

    result:
    -rw-rw-r-- 1 ec2-user ec2-user 101656 Dec 20 18:04 sample_1.jpg
    -rw-rw-r-- 1 ec2-user ec2-user 141934 Dec 20 18:04 sample_2.jpg
    -rw-rw-r-- 1 ec2-user ec2-user 128636 Dec 20 18:04 sample_3.jpg
    -rw-rw-r-- 1 ec2-user ec2-user 384545 Dec 20 18:04 sample.jpg
    ```
- Web demo added.  
    See [here](web-demo/README.md) for more information.

### Changed
- The thumbnail write function now returns the following generated thumbnail path information.  
    - {string[]} thumbnailPaths Path list of output thumbnail files.  
        For example, sample_1.jpg, sample_2.jpg.  
    - {string} mergedPath The path of the image file from which the thumbnails for each page are merged.  
        For example, sample.jpg.
    - {string} archivePath? The path to the archive containing all thumbnails.  
        This is only set if the archive option is true when creating thumbnails.

    ```js
    const pdf2thumbnail = require('pdf2thumbnail');

    const {thumbnailPaths, mergedPath} = await pdf2thumbnail.writeThumbnails('sample.pdf', './result');
    ```

## [1.0.2] - 2022/11/4
### Changed
- Cleaned up some of the README.

## [1.0.1] - 2022/11/4
### Changed
- Updated README to make it easier to read.

## [1.0.0] - 2022/8/5
### Added
- First release.

[1.0.1]: https://github.com/takuya-motoshima/pdf2thumbnail/compare/v1.0.0...v1.0.1
[1.0.2]: https://github.com/takuya-motoshima/pdf2thumbnail/compare/v1.0.1...v1.0.2
[1.0.3]: https://github.com/takuya-motoshima/pdf2thumbnail/compare/v1.0.2...v1.0.3
[1.0.4]: https://github.com/takuya-motoshima/pdf2thumbnail/compare/v1.0.3...v1.0.4
[1.0.5]: https://github.com/takuya-motoshima/pdf2thumbnail/compare/v1.0.4...v1.0.5