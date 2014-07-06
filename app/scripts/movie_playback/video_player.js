'use strict';

angular.module('videoPlayback', [])
    .factory('videoRepository', ['$http', function ($http) {

        var fetchAll = function () {
            return $http.get('/api/videos');
        };

        var store = function (video) {
            var youtubeRegex = /^.*v=([^#\&\?]*).*/;
            var youtubeId = youtubeRegex.exec(video.url, 'i');
            $http.put('/api/videos', {title: video.title, videoId: youtubeId[1], vendorId: 1})
                .success(function (responseData){
                    video.addedVideoId = responseData._id;
                });
        }

        return {
            fetchAll: fetchAll,
            store: store
        };
    }])
    .factory('videoPlayer', ['youtubePlayerApi', '$dfAnimate', '$rootScope', function(youtubeVideoPlayer, $dfAnimate, $rootScope) {

        var currentlyPlayed = null;

        var setPlaylist = function (playList) {
            this.playList = playList;
        };

        var playNextVideo = function () {
            this.currentlyPlayed = this.playList.next();
            this.currentlyPlayed.playWith(this);
            $rootScope.$apply();
            $dfAnimate.enableVoting();
        };

        var startPlayback = function () {
            this.playNextVideo();
        };

        var shufflePlaylist = function() {
            this.playList.shuffle();
        };

        var playYoutubeVideo = function(youtubeVideoId) {
            this.youtubeVideoPlayer.playVideo(youtubeVideoId, this);
        };

        var bringVideoToFront = function(videoId) {
            if (typeof videoId === 'undefined') {
                return;
            }
            this.playList.bringVideoToFront(videoId);
        };

        return {
            currentlyPlayed: currentlyPlayed,
            playList: null,
            youtubeVideoPlayer: youtubeVideoPlayer,
            setPlaylist: setPlaylist,
            playNextVideo: playNextVideo,
            startPlayback: startPlayback,
            shufflePlaylist: shufflePlaylist,
            playYoutubeVideo: playYoutubeVideo,
            bringVideoToFront: bringVideoToFront
        }
    }]);
