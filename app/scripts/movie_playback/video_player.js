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
    .factory('videoPlayer', [
            'youtubePlayerApi',
            '$dfAnimate',
            '$rootScope',
            '$location',
            '$cookieStore',
            function(youtubeVideoPlayer, $dfAnimate, $rootScope, $location, $cookieStore) {

        var currentlyPlayed = null;
        var maxSeenMovies = 100;

        var setPlaylist = function (playList) {
            this.playList = playList;
        };

        var playNextVideo = function () {
            this.currentlyPlayed = this.playList.next();
            $rootScope.video = this.currentlyPlayed;

            this.currentlyPlayed.playWith(this);
            $location.path('/play/' + this.currentlyPlayed.videoId, false);

            $rootScope.$apply();
            $dfAnimate.enableVoting();

            var seenMovies = $cookieStore.get('seenMovies');
            if (typeof seenMovies === 'undefined' || seenMovies.length > maxSeenMovies) {
                seenMovies = [];
            }
            if (seenMovies.indexOf(this.currentlyPlayed.videoId) === -1) {
                seenMovies.push(this.currentlyPlayed.videoId);
                $cookieStore.put('seenMovies', seenMovies);
            }
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
