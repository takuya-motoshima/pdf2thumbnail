const fs = require('fs');
const path = require('path');
const express = require('express');
const pdf2thumbnail = require('pdf2thumbnail');

const router = express.Router();
router.post('/', async (req, res) => {
  try {
    if (!req.files || !req.files.length)
      throw new TypeError('files parameters are required');
    const file = req.files[0];
    if (file.mimetype !== 'application/pdf')
      throw new TypeError('Mime type of the unsupported file');
    const pdfPath = `${global.APP_DIR}/public/upload/${file.originalname}`;
    fs.writeFileSync(pdfPath, Buffer.from(file.buffer));
    const baseName = path.basename(file.originalname, path.extname(file.originalname));
    const outputDir = `${global.APP_DIR}/public/upload/${baseName}`;
    let {mergedPath, archivePath} = await pdf2thumbnail.writeThumbnails(pdfPath, outputDir, {
      offfset: 10,
      background: '#000',
      archive: true,
    });
    mergedPath = mergedPath.replace(`${global.APP_DIR}/public`, '');
    archivePath = archivePath.replace(`${global.APP_DIR}/public`, '');
    res.json({mergedPath, archivePath});
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;