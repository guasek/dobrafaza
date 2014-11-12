'use strict';

function Video(videoId, vendorVideoId, title, votesUp, votesDown, categories) {
    this.title = title;
    this.videoId = videoId;
    this.vendorVideoId = vendorVideoId;
    this.votesUp = votesUp;
    this.votesDown = votesDown;
    this.categories = categories;
}

/**
 * Plays video with given video player.
 *
 * @param videoPlayer Video player to use.
 */
Video.prototype.playWith = function(videoPlayer) {
    videoPlayer.playYoutubeVideo(this.vendorVideoId);
};

/**
 * Tells whether video belongs to a given category.
 *
 * @param checkedCategory Category to be checked against.
 *
 * @return {boolean}
 */
Video.prototype.belongsTo = function(checkedCategory) {
    for(var index=0; index < this.categories.length; index++) {
        if (checkedCategory.idEquals(this.categories[index])) {
            return true;
        }
    }
    return false;
}

/**
 * Tells whether compared id equals video's one.
 *
 * @param {Integer} comparedId
 *
 * @return {boolean}
 */
Video.prototype.idEquals = function(comparedId) {
    return comparedId === this.videoId ? true : false;
}

/**
 * Factory method, creates youtube videos.
 *
 * @return {Video}
 */
Video.youtubeVideo = function(videoId, youtubeId, title, votesUp, votesDown, categories) {
    return new Video(videoId, youtubeId, title, votesUp, votesDown, categories);
};