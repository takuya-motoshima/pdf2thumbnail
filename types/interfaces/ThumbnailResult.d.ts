export default interface ThumbnailResult {
    /**
     * Path list of output thumbnail files.
     */
    thumbnailPaths: string[];
    /**
     * The path of the image file from which the thumbnails for each page are merged.
     */
    mergedPath: string;
    /**
     * The path to the archive containing all thumbnails.
     * This is only set if the archive option is true when creating thumbnails.
     */
    archivePath?: string;
}
