'use strict';
/* global PlayList, RestVideoRepository */

function VideoPlayer(youtubeVideoPlayer) {
    this.playList = null;
    this.youtubeVideoPlayer = youtubeVideoPlayer;
}

VideoPlayer.prototype.setPlaylist = function (playList) {
    this.playList = playList;
};

VideoPlayer.prototype.startPlayback = function () {
    this.playNextVideo();
};

VideoPlayer.prototype.playNextVideo = function () {
    var video = this.playList.next();
    video.playWith(this);
};

VideoPlayer.prototype.shufflePlaylist = function() {
    this.playList.shuffle();
};

VideoPlayer.prototype.playYoutubeVideo = function(youtubeVideoId) {
    this.youtubeVideoPlayer.playVideo(youtubeVideoId, this);
};

angular.module('videoPlayback', [])
    .factory('videoRepository', ['$http', function ($http) {

        var fetchAll = function () {
            return $http.get('/api/videos');
        };

        return {
            fetchAll: fetchAll
        };
    }])
    .factory('videoPlayer', ['youtubePlayerApi', function(youtubeVideoPlayer) {
        return new VideoPlayer(youtubeVideoPlayer);
    }]);
