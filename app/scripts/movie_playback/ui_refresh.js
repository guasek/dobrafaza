/* global VideoPlaybackStarted*/
/* exported UiRefreshSubscriber */
'use strict';

/**
 * Ui Refresher.
 *
 * @param $rootScope Root scope angular service.
 * @param $location  Location service.
 *
 * @constructor
 */
function UiRefreshSubscriber($rootScope, $location) {

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
     * @param event Event to be handled.
     */
    var handle = function (event) {
        if(!$rootScope.$$phase) {
            $rootScope.$apply();
        }
        $rootScope.video = {
            videoId: event.videoId,
            vendorVideoId: event.vendorVideoId,
            title: event.title
        };
        $location.path('/play/' + event.videoId, false);
    };

    return {
        isSubscribedTo: isSubscribedTo,
        handle: handle
    };
}
