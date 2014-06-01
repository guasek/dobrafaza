'use strict';
/* global Video */

function PlayList(movieList) {
    this.currentItem = 0;
    this.movieList = movieList;
}

PlayList.create = function (videos) {
    return new PlayList(videos.map(function(video){
        return new Video.youtubeVideo(video._id, video.videoId);
    }));
};

PlayList.prototype.shuffle = function () {
    var currentIndex = this.movieList.length;
    var temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = this.movieList[currentIndex];
        this.movieList[currentIndex] = this.movieList[randomIndex];
        this.movieList[randomIndex] = temporaryValue;
    }
    this.currentItem = 0;
};

PlayList.prototype.next = function () {
    var selectedMovie = this.movieList[this.currentItem];
    this.currentItem++;
    return selectedMovie;
};

PlayList.prototype.bringVideoToFront = function(videoId) {
    for (var i = 0; i < this.movieList.length; i++) {
        if (videoId == this.movieList[i].videoId) {
            var toBeFirstVideo = this.movieList[i];
            var firstVideosPart = this.movieList.slice(0, i);
            var secondVideosPart = this.movieList.slice(i + 1);
            this.movieList = [].concat(toBeFirstVideo, firstVideosPart, secondVideosPart);
        }
    }
};