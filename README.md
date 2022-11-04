# pdf2thumbnail
Generate PDF thumbnails.

You can install this module using npm:
```sh
npm i pdf2thumbnail
```

## Requirements
Requires imagemagick CLI tools to be installed.

There are numerous ways to install them.  
For instance, if you're on OS X you can use Homebrew.
```sh
brew install imagemagick
```

For Linux, use yum.  
```sh
sudo yum -y install ImageMagick
```

## Example
- Total pages of PDF.
    ```js
    const {getTotalNumberOfPages} = require('pdf2thumbnail');

    const totalNumberOfPages = await getTotalNumberOfPages('sample.pdf');
    console.log(totalNumberOfPages);// =>29
    ```
- Thumbnail all pages.  
    The thumbnail file name is &quot;&lt;original file name&gt;_&lt;page number&gt;.&lt;extension&gt;&quot;.
    ```js
    const {writeThumbnails} = require('pdf2thumbnail');

    writeThumbnails('sample.pdf', `${__dirname}/out1`);
    // $ ll out1/
    // -rw-rw-r-- 1 ec2-user ec2-user 43157 Aug  5 09:17 sample_1.jpg
    // -rw-rw-r-- 1 ec2-user ec2-user 24496 Aug  5 09:17 sample_2.jpg
    // ...
    ```
- Specify thumbnail width, quality, and format.
    ```js
    const {writeThumbnails} = require('pdf2thumbnail');

    writeThumbnails('sample.pdf', `${__dirname}/out2`, {
      width: 300,
      quality: 100,
      format: 'png'
    });
    // $ ll out2/
    // -rw-rw-r-- 1 ec2-user ec2-user 42722 Aug  5 09:17 sample_1.png
    // -rw-rw-r-- 1 ec2-user ec2-user 22411 Aug  5 09:17 sample_2.png
    // ...
    ```
- Thumbnail of the first page only.
    ```js
    const {writeThumbnails} = require('pdf2thumbnail');

    writeThumbnails('sample.pdf', `${__dirname}/out3`, {
      start: 1,
      end: 1
    });

    // $ll out3/
    // -rw-rw-r-- 1 ec2-user ec2-user 43157 Aug  5 09:17 sample_1.jpg
    ```
- Thumbnails for pages 2-5.
    ```js
    const {writeThumbnails} = require('pdf2thumbnail');

    writeThumbnails('sample.pdf', `${__dirname}/out4`, {
      start: 2,
      end: 5
    });

    // $ ll out4/
    // -rw-rw-r-- 1 ec2-user ec2-user 24496 Aug  5 09:17 sample_2.jpg
    // -rw-rw-r-- 1 ec2-user ec2-user 41054 Aug  5 09:17 sample_3.jpg
    // -rw-rw-r-- 1 ec2-user ec2-user 45361 Aug  5 09:17 sample_4.jpg
    // -rw-rw-r-- 1 ec2-user ec2-user 38269 Aug  5 09:17 sample_5.jpg
    ```

## API
- ### getTotalNumberOfPages(filePath: string): Promise&lt;number&gt;  
    Get the total number of pages in the PDF document.

    Parameters:  
    - `filePath: string`: Path of the PDF file.

    Return value:  
    - `{Promise&lt;number&gt;}`: Total number of pages in the PDF document.

- ### writeThumbnails(filePath: string, outDir: string, options: ThumbnailOptions = {}): Promise&lt;void&gt;  
    Write a thumbnail for each page of the PDF document.

    Parameters:  
    - `filePath: string`: Path of the PDF file.
    - `outDir: string`: Directory path to output thumbnails.
    - `options.width?: number`: Width of output thumbnail (px). Default is 300 (px).
    - `options.quality?: number`: The quality of the thumbnail to output (1-100). Default is 100.
    - `options.format?: string`: The format of the output thumbnail. Default is jpg.
    - `options.start?: number`: Start page position.
    - `options.end?: number`: End page position.

## Author
**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License
[MIT](LICENSE)