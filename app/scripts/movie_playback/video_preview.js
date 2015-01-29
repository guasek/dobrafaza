'use strict';

/**
 * Represents video preview.
 *
 * @param {string} title         Title of the video.
 * @param {string} vendorVideoId Vendor video id.
 *
 * @constructor
 */
function VideoPreview(title, thumbnailUrl) {
    this.title = title;
    this.thumbnail = thumbnailUrl;
}

/**
 * Returns url of the thumbnail.
 *
 * @return {string}
 */
VideoPreview.prototype.thumbnailUrl = function () {
    return this.thumbnail;
};

/**
 * Returns video title.
 *
 * @return {string}
 */
VideoPreview.prototype.showTitle = function () {
    return this.title;
};

/**
 * Factory method used to create video preview from youtube video.
 *
 * @param {Video} youtubeVideo Youtube video object.
 *
 * @return {VideoPreview}
 */
VideoPreview.youtubeVideoPreview = function (youtubeVideo) {
    return new VideoPreview(
        youtubeVideo.title, 'http://i1.ytimg.com/vi/' + youtubeVideo.vendorVideoId + '/hqdefault.jpg'
    );
};

/**
 * Factory method used to create default video preview.
 *
 * @return {VideoPreview}
 */
VideoPreview.defaultVideoPreview = function () {
    return new VideoPreview('Nie można cofnąć filmu', '');
};