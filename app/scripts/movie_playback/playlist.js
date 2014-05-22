'use strict';
/* global Video */

function PlayList(movieList) {
    this.currentItem = 0;
    this.movieList = movieList;
}

PlayList.fromYoutubeIds = function (youtubeIds) {
    return new PlayList(youtubeIds.map(function(youtubeId){
        return new Video.youtubeVideo(youtubeId);
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