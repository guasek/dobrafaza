
'use strict';

function Video(videoId, vendorVideoId) {
    this.videoId = videoId;
    this.vendorVideoId = vendorVideoId;
}

Video.youtubeVideo = function(videoId, youtubeId) {
    return new Video(videoId, youtubeId);
};

Video.prototype.playWith = function(videoPlayer) {
    videoPlayer.playYoutubeVideo(this.vendorVideoId);
};