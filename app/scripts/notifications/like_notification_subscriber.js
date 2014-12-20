/* global VideoPlaybackStarted*/
/* exported LikeNotificationSubscriber */
'use strict';

/**
 * Listens for next video playback started events and fires up like notification.
 *
 * @constructor
 */
function LikeNotificationSubscriber(notificationsService) {

    /**
     * Tells whether subscriber subscribes to an event.
     *
     * @param event Event to be handled
     *
     * @return {boolean}
     */
    var isSubscribedTo = function (event) {
        return (event instanceof VideoPlaybackStarted && event.eventType === 'nextVideoPlaybackStarted');
    };

    /**
     * Handles given event
     *
     * @param event Event to be handled.
     */
    var handle = function (event) {
        if (event.previouslyPlayedVideo === null) {
            return;
        }
        notificationsService.showLikeNotification(event.previouslyPlayedVideo);
    };

    return {
        isSubscribedTo: isSubscribedTo,
        handle: handle
    };
}
