'use strict';
/* global Video */

/**
 * Playlist object definition. Holds list of videos, can apply filters to them.
 *
 * @param {Array}       videoList List of videos for the playlist.
 * @param {VideoFilter} filter    Filter to be used on list.
 *
 * @constructor
 */
function PlayList(videoList, filter) {
    this.videoList = videoList;
    this.filter = filter;
    this.playback = new Playback();
}

/**
 * Creates playlist from raw videos with given filter.
 *
 * @param {Array}       rawVideos Array of videos from server.
 * @param {VideoFilter} filter    Filter to be used.
 *
 * @return {PlayList}
 */
PlayList.create = function (rawVideos, filter) {
    var videos = rawVideos.map(function(video){
        return new Video.youtubeVideo(
            video._id,
            video.videoId,
            video.title,
            video.votesUp,
            video.votesDown,
            video.categories
        );
    });
    return new PlayList(videos, filter);
};

/**
 * Fetches next video from the list.
 *
 * @return {Video}
 */
PlayList.prototype.next = function () {
    if (this.playback.isRewound()) {
        return this.playback.fastForward();
    }
    for (var i = 0; i < this.videoList.length; i++) {

        var currentVideo = this.videoList[i];
        if (this.filter.shouldPlay(currentVideo)) {

            var firstVideosPart = this.videoList.slice(0, i);
            var secondVideosPart = this.videoList.slice(i + 1);
            this.videoList = [].concat(firstVideosPart, secondVideosPart);

            this.playback.nowPlaying(currentVideo);
            return currentVideo;
        }
    }
};

/**
 * Fetches previous video from the list.
 *
 * @return {Video}
 */
PlayList.prototype.previous = function () {
    return this.playback.rewind();
};

/**
 * Brings video with given id to the front of playlist.
 *
 * @param {VideoId} videoId Video id to find.
 */
PlayList.prototype.bringVideoToFront = function(videoId) {
    for (var i = 0; i < this.videoList.length; i++) {
        if (this.videoList[i].idEquals(videoId)) {
            var toBeFirstVideo = this.videoList[i];
            var firstVideosPart = this.videoList.slice(0, i);
            var secondVideosPart = this.videoList.slice(i + 1);
            this.videoList = [].concat(toBeFirstVideo, firstVideosPart, secondVideosPart);
        }
    }
};

/**
 * Manages videos that has been played.
 *
 * @constructor
 */
function Playback() {
    this.playedVideos = [];
    this.currentlyWatched = -1;
}

/**
 * Adds given video to history.
 *
 * @param video Video to be managed in history.
 */
Playback.prototype.nowPlaying = function (video) {
    if (this.playedVideos.indexOf(video) === -1) {
        this.playedVideos.push(video);
        this.currentlyWatched += 1;
    }
}

/**
 * Tells whether history has been rewound.
 *
 * @return {boolean}
 */
Playback.prototype.isRewound = function () {
    return this.playedVideos.length - 1 !== this.currentlyWatched;
}

/**
 * Fetches video from history.
 *
 * @return {Video}
 */
Playback.prototype.rewind = function () {
    this.currentlyWatched -= 1;
    return this.playedVideos[this.currentlyWatched];
}

/**
 * Goes forward in playback history.
 *
 * @return {Video}
 */
Playback.prototype.fastForward = function () {
    this.currentlyWatched += 1;
    return this.playedVideos[this.currentlyWatched];
}