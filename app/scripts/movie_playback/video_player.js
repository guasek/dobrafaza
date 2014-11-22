/* global VideoRepository, CategoryRepository, VideoPlaybackStarted */
'use strict';

/**
 * Video player.
 *
 * @param youtubeVideoPlayer Youtube video player.
 * @param $rootScope         Rootscope object to pass data to template.
 * @param $cookieStore       Cookie store to update seen movies.
 * @param eventPublisher     Event publisher to tell about commands done.
 *
 * @constructor
 */
function VideoPlayer(youtubeVideoPlayer, $rootScope, $cookieStore, eventPublisher) {

    var currentlyPlayed = null;
    var maxSeenMovies = 100;

    /**
     * Allows to set playlist for the player.
     *
     * @param playList Contains videos, can filter them.
     */
    var setPlaylist = function (playList) {
        this.playList = playList;
    };

    /**
     * Plays next video from the playlist.
     */
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

    /**
     * Plays previous video from playlist.
     */
    var playPreviousVideo = function () {
        this.currentlyPlayed = this.playList.previous();
        this.currentlyPlayed.playWith(this);
        $rootScope.video = this.currentlyPlayed;
        eventPublisher.publish(new VideoPlaybackStarted(this.currentlyPlayed.videoId));
    };

    /**
     * Begins infinite video playback.
     */
    var startPlayback = function () {
        this.playNextVideo();
    };

    /**
     * Plays youtube video.
     *
     * @param youtubeVideoId Youtube video id.
     */
    var playYoutubeVideo = function(youtubeVideoId) {
        this.youtubeVideoPlayer.playVideo(youtubeVideoId, this);
    };

    /**
     * Brings video with given id to front.
     *
     * @param videoId
     */
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
