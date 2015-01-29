/* exported VideoPlaybackStarted */
'use strict';

/**
 * Dispatched when video playback has begun.
 *
 * @param {string} eventType             Concrete type of the event.
 * @param {Video}  currentlyPlayedVideo  Currently played video object.
 * @param {Video}  previouslyPlayedVideo Previously played video object.
 *
 * @constructor
 */
function VideoPlaybackStarted(eventType, currentlyPlayedVideo, previouslyPlayedVideo){
    this.eventType = eventType;
    this.currentlyPlayedVideo = currentlyPlayedVideo;
    this.previouslyPlayedVideo = previouslyPlayedVideo;
}

/**
 * Creates next video playback started event.
 *
 * @param {Video}  currentlyPlayedVideo  Currently played video object.
 * @param {Video}  previouslyPlayedVideo Previously played video object.
 */
VideoPlaybackStarted.next = function (currentlyPlayedVideo, previouslyPlayedVideo) {
    return new VideoPlaybackStarted('nextVideoPlaybackStarted', currentlyPlayedVideo, previouslyPlayedVideo);
};

/**
 * Creates previous video playback started event.
 *
 * @param {Video}  currentlyPlayedVideo  Currently played video object.
 * @param {Video}  previouslyPlayedVideo Previously played video object.
 */
VideoPlaybackStarted.previous = function (currentlyPlayedVideo, previouslyPlayedVideo) {
    return new VideoPlaybackStarted('previousVideoPlaybackStarted', currentlyPlayedVideo, previouslyPlayedVideo);
};
