
'use strict';

function Video(videoId, vendorVideoId, title, votesUp, votesDown) {
    this.title = title;
    this.videoId = videoId;
    this.vendorVideoId = vendorVideoId;
    this.votesUp = votesUp;
    this.votesDown = votesDown;
}

Video.youtubeVideo = function(videoId, youtubeId, title, votesUp, votesDown) {
    return new Video(videoId, youtubeId, title, votesUp, votesDown);
};

Video.prototype.playWith = function(videoPlayer) {
    videoPlayer.playYoutubeVideo(this.vendorVideoId);
};