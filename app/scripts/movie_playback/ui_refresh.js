/* global VideoPlaybackStarted*/
/* exported UiRefreshSubscriber */
'use strict';

/**
 * Ui Refresher.
 *
 * @param $rootScope Root scope angular service.
 *
 * @constructor
 */
function UiRefreshSubscriber($rootScope) {

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
     */
    var handle = function () {
        if(!$rootScope.$$phase) {
            $rootScope.$apply();
        }
    };

    return {
        isSubscribedTo: isSubscribedTo,
        handle: handle
    };
}
