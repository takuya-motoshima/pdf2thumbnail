import AdmZip from 'adm-zip';

/**
 * Archive Thumbnails.
 *
 * @export
 * @param {string} archiveDir Directory to archive.
 * @return {string}           The archive path created.
 */
export default (archiveDir: string): string => {
  const zip = new AdmZip();
  zip.addLocalFolder(archiveDir);
  const outputPath = `${archiveDir.replace(/\/$/, '')}.zip`;
  zip.writeZip(outputPath);
  return outputPath;
}