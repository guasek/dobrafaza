/* global VideoRepository, CategoryRepository, VideoPlaybackStarted */
'use strict';

function VideoPlayer(youtubeVideoPlayer, $rootScope, $cookieStore, eventPublisher) {

    var currentlyPlayed = null;
    var maxSeenMovies = 100;

    var setPlaylist = function (playList) {
        this.playList = playList;
    };

    var playNextVideo = function () {
        this.currentlyPlayed = this.playList.next();
        this.currentlyPlayed.playWith(this);
        $rootScope.video = this.currentlyPlayed;

        var seenMovies = $cookieStore.get('seenMovies');
        if (typeof seenMovies === 'undefined' || seenMovies.length > maxSeenMovies) {
            seenMovies = [];
        }
        if (seenMovies.indexOf(this.currentlyPlayed.videoId) === -1) {
            seenMovies.push(this.currentlyPlayed.videoId);
            $cookieStore.put('seenMovies', seenMovies);
        }

        eventPublisher.publish(new VideoPlaybackStarted(this.currentlyPlayed.videoId));
    };

    var playPreviousVideo = function () {
        this.currentlyPlayed = this.playList.previous();
        this.currentlyPlayed.playWith(this);
        $rootScope.video = this.currentlyPlayed;
        eventPublisher.publish(new VideoPlaybackStarted(this.currentlyPlayed.videoId));
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
        bringVideoToFront: bringVideoToFront,
        playPreviousVideo: playPreviousVideo
    };
}

angular
    .module('videoPlayback', [])
    .factory('videoRepository', ['$http', '$q', VideoRepository])
    .factory('categoryRepository', ['$http', '$q', CategoryRepository])
    .factory('videoPlayer',
        ['youtubePlayerApi',
         '$rootScope',
         '$cookieStore',
         'eventPublisher',
         VideoPlayer]);
