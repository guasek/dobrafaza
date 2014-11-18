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
    this.currentItem = -1;
    this.videoList = videoList;
    this.filter = filter;
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
 * Shuffles videos on the list.
 */
PlayList.prototype.shuffle = function () {
    var currentIndex = this.videoList.length;
    var temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = this.videoList[currentIndex];
        this.videoList[currentIndex] = this.videoList[randomIndex];
        this.videoList[randomIndex] = temporaryValue;
    }
    this.currentItem = 0;
};

/**
 * Fetches next video from the list.
 *
 * @return {Video}
 */
PlayList.prototype.next = function () {
    var selectedMovie;
    do {
        this.currentItem++;
        selectedMovie = this.videoList[this.currentItem];
    } while(!this.filter.shouldPlay(selectedMovie));
    return selectedMovie;
};

/**
 *
 *
 * Fetches previous video from the list.
 *
 * @return {Video}
 */
PlayList.prototype.previous = function () {
    var selectedMovie;
    do {
        if (this.currentItem > 0) {
            this.currentItem--;
        } else {
            break;
        }
        selectedMovie = this.videoList[this.currentItem];
    } while(!this.filter.shouldPlay(selectedMovie));
    return selectedMovie;
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