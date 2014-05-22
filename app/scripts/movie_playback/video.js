'use strict';

function Video(videoId) {
    this.videoId = videoId;
}

Video.youtubeVideo = function(youtubeId) {
    return new Video(youtubeId);
};

Video.prototype.playWith = function(videoPlayer) {
    videoPlayer.playYoutubeVideo(this.videoId);
};