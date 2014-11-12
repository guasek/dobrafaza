'use strict';

/**
 * Categories playlist filter.
 *
 * @param {Array} categoriesList
 *
 * @constructor
 */
function CategoryVideoFilter(categoriesList) {
    this.categories = categoriesList;
}

/**
 * Tells whether given video should be played by the player.
 *
 * @param {Video} video Video object to be checked.
 *
 * @return {boolean}
 */
CategoryVideoFilter.prototype.shouldPlay = function (video) {
    for(var index = 0; index < this.categories.length; index++) {
        var currentCategory = this.categories[index];
        if (video.belongsTo(currentCategory) &&
            currentCategory.isActive()) {
            return true;
        }
    }
    return false;
}

/**
 * Seen movies playlist filter. Can filter movies basing on the fact whether
 * they've been seen or not.
 *
 * @param {Array} seenMovies
 *
 * @constructor
 */
function SeenMoviesVideoFilter(seenMovies) {
    this.seenMoviesIds = seenMovies;
}

/**
 * Tells whether given video should be played by the player.
 *
 * @param {Video} video Video object to be checked.
 *
 * @return {boolean}
 */
SeenMoviesVideoFilter.prototype.shouldPlay = function (video) {
    for(var index = 0; index < this.seenMoviesIds.length; index++) {
        var comparedId = this.seenMoviesIds[index];
        if (video.idEquals(comparedId)) {
            return false;
        }
    }
    return true;
}

/**
 * Exclusive video filter. Responds true if checked video id is equal
 * to exclusive one.
 *
 * @param {Integer} exclusiveVideoId Video to be shown.
 *
 * @constructor
 */
function ExclusiveVideoFilter(exclusiveVideoId) {
    this.exclusiveVideoId = exclusiveVideoId;
}

/**
 * Checks whether given video id matches exclusive video id.
 *
 * @param {Video} video Video to be checked.
 *
 * @return {boolean}
 */
ExclusiveVideoFilter.prototype.shouldPlay = function (video) {
    return video.idEquals(this.exclusiveVideoId)
}

/**
 * Conjunction filter that checks whether both filter allows video to be played.
 *
 * @param firstFilter  First filter to be conjunct.
 * @param secondFilter Second filter to be conjunct.
 *
 * @constructor
 */
function ConjunctionVideoFilter(firstFilter, secondFilter) {
    this.firstFilter = firstFilter;
    this.secondFilter = secondFilter;
}

/**
 * Performs a conjunct filtering.
 *
 * @param {Video} video Video to be checked.
 *
 * @return {booleanshould}
 */
ConjunctionVideoFilter.prototype.shouldPlay = function (video) {
    return this.firstFilter.shouldPlay(video) && this.secondFilter.shouldPlay(video);
}

/**
 * Logical alternative video filter.
 *
 * @param firstFilter  First filter to be checked
 * @param secondFilter Second filter to be checked
 *
 * @constructor
 */
function AlternativeVideoFilter(firstFilter, secondFilter) {
    this.firstFilter = firstFilter;
    this.secondFilter = secondFilter;
}

/**
 * Returns true if one of the filters returns true.
 *
 * @param {Video} video Video to be checked.
 *
 * @returns {boolean}
 */
AlternativeVideoFilter.prototype.shouldPlay = function (video) {
    return this.firstFilter.shouldPlay(video) || this.secondFilter.shouldPlay(video);
}
