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

VideoPlayer.prototype.bringVideoToFront = function(videoId) {
    this.playList.bringVideoToFront(videoId);
};

angular.module('videoPlayback', [])
    .factory('videoRepository', ['$http', function ($http) {

        var fetchAll = function () {
            return $http.get('/api/videos');
        };

        var store = function (video) {
            var youtubeRegex = /^.*v=([^#\&\?]*).*/;
            var youtubeId = youtubeRegex.exec(video.url, 'i');
            $http.put('/api/videos', {videoId: youtubeId[1], vendorId: 1})
                .success(function (responseData){
                    video.addedVideoId = responseData._id;
                });
        }

        return {
            fetchAll: fetchAll,
            store: store
        };
    }])
    .factory('videoPlayer', ['youtubePlayerApi', function(youtubeVideoPlayer) {
        return new VideoPlayer(youtubeVideoPlayer);
    }]);
