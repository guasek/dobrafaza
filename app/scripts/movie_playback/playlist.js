'use strict';
/* global Video */

function PlayList(videoList, filter) {
    this.currentItem = -1;
    this.videoList = videoList;
    this.filter = filter;
}

PlayList.create = function (rawVideos, filter) {
    var videos = rawVideos.map(function(video){
        return new Video.youtubeVideo(video._id, video.videoId, video.title, video.votesUp, video.votesDown);
    })
    return new PlayList(videos, filter);
};

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

PlayList.prototype.next = function () {
    this.currentItem++;
    var selectedMovie = this.videoList[this.currentItem];
    return selectedMovie;
};

PlayList.prototype.previous = function () {
    if (this.currentItem > 0) {
        this.currentItem--;
    }
    var selectedMovie = this.videoList[this.currentItem];
    return selectedMovie;
};

PlayList.prototype.bringVideoToFront = function(videoId) {
    for (var i = 0; i < this.videoList.length; i++) {
        if (videoId === this.videoList[i].videoId) {
            var toBeFirstVideo = this.videoList[i];
            var firstVideosPart = this.videoList.slice(0, i);
            var secondVideosPart = this.videoList.slice(i + 1);
            this.videoList = [].concat(toBeFirstVideo, firstVideosPart, secondVideosPart);
        }
    }
};