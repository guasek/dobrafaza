/* global VideoPlaybackStarted */
/* exported SeenVideosSubscriber */
'use strict';

/**
 * Stores seen movies .
 *
 * @param cookieStore Cookie storage.
 *
 * @constructor
 */
function SeenVideos(maxStoredVideos, cookieStore) {
    this.maxStoredVideos = maxStoredVideos;
    this.cookieStore = cookieStore;
    this.cookieName = 'seenVideos';
    var seenVideos = this.cookieStore.get(this.cookieName);
    this.seenVideos = typeof seenVideos === 'undefined' ? [] : seenVideos;
}

/**
 * Adds given video id to seen videos.
 *
 * @param videoId Video id to be stored.
 */
SeenVideos.prototype.add = function (videoId) {
    if (this.contains(videoId)) {
        return;
    }

    if (this.seenVideos.length >= this.maxStoredVideos) {
        this.seenVideos = [];
    }
    this.seenVideos.push(videoId);
    this.cookieStore.put(this.cookieName, this.seenVideos);
};

/**
 * Tells whether seen videos object contains specified video id.
 *
 * @param videoId Video id to be checked.
 *
 * @return {boolean}
 */
SeenVideos.prototype.contains = function (videoId) {
    return this.seenVideos.indexOf(videoId) !== -1;
};

/**
 * Provides seen movie event handling.
 *
 * @constructor
 */
function SeenVideosSubscriber(seenVideos) {

    /**
     * Tells wheter subsciber subscribes to an event.
     *
     * @param event Event to be handled
     *
     * @return {boolean}
     */
    var isSubscribedTo = function (event) {
        return event instanceof VideoPlaybackStarted;
    };

    /**
     * Handles given event
     *
     * @param event Event to be handled
     */
    var handle = function (event) {
        seenVideos.add(event.videoId);
    };

    return {
        isSubscribedTo: isSubscribedTo,
        handle: handle
    };
}