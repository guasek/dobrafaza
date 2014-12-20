/* global VideoRepository, CategoryRepository, VideoPlaybackStarted, SeenVideos, SeenVideosSubscriber,
   UiRefreshSubscriber, UserSettings */
'use strict';

/**
 * Video player.
 *
 * @param youtubeVideoPlayer Youtube video player.
 * @param eventPublisher     Event publisher to tell about commands done.
 *
 * @constructor
 */
function VideoPlayer(youtubeVideoPlayer, eventPublisher) {

    var currentlyPlayed = null;

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
        var previouslyPlayedVideo = this.currentlyPlayed;
        this.currentlyPlayed = this.playList.next();
        this.currentlyPlayed.playWith(this);
        eventPublisher.publish(
            VideoPlaybackStarted.next(this.currentlyPlayed, previouslyPlayedVideo)
        );
    };

    /**
     * Plays previous video from playlist.
     */
    var playPreviousVideo = function () {
        var previouslyPlayedVideo = this.currentlyPlayed;
        this.currentlyPlayed = this.playList.previous();
        this.currentlyPlayed.playWith(this);
        eventPublisher.publish(
            VideoPlaybackStarted.next(this.currentlyPlayed, previouslyPlayedVideo)
        );
    };

    /**
     * Returns previous video preview.
     *
     * @return {VideoPreview}
     */
    var previousVideoPreview = function () {
        return this.playList.previousVideoPreview();
    }

    /**
     * Returns next video preview.
     *
     * @return {VideoPreview}
     */
    var nextVideoPreview = function () {
        return this.playList.nextVideoPreview();
    }

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
        playPreviousVideo: playPreviousVideo,
        nextVideoPreview: nextVideoPreview,
        previousVideoPreview: previousVideoPreview
    };
}

angular
    .module('videoPlayback', [])
    .factory('videoRepository', ['$http', '$q', VideoRepository])
    .factory('categoryRepository', ['$http', '$q', CategoryRepository])
    .factory('seenVideos', ['$cookieStore', function($cookieStore) { return new SeenVideos(100, $cookieStore); }])
    .factory('seenVideosSubscriber', ['seenVideos', SeenVideosSubscriber])
    .factory('uiRefreshSubscriber', ['$rootScope', '$location', UiRefreshSubscriber])
    .factory('videoPlayer',  ['youtubePlayerApi', 'eventPublisher', VideoPlayer])
    .factory('userSettings', ['$cookieStore', function($cookieStore) { return new UserSettings($cookieStore); }]);
