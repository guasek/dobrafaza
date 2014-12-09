/* exported VideoPlaybackStarted */
'use strict';

/**
 * Dispatched when video playback has begun.
 *
 * @param videoId Id of played video.
 *
 * @constructor
 */
function VideoPlaybackStarted(videoId){
    this.name = 'videoPlaybackStarted';
    this.videoId = videoId;
}