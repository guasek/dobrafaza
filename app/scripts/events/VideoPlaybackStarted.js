/* exported VideoPlaybackStarted */
'use strict';

/**
 * Dispatched when video playback has begun.
 *
 * @param videoId       Id of played video.
 * @param vendorVideoId Foreign id.
 * @param title         Stared video's title.
 *
 * @constructor
 */
function VideoPlaybackStarted(videoId, vendorVideoId, title){
    this.name = 'videoPlaybackStarted';
    this.videoId = videoId;
    this.vendorVideoId = vendorVideoId;
    this.title = title;
}