/* global VideoPlaybackStarted, VoteCastEvent */
/* exported VotingEnablingSubscriber, VotingDisablingSubscriber */
'use strict';

/**
 * Voting enabling subscriber.
 *
 * @param animationService Provides animation to voting.
 * @param locationService  Allows to change url.
 *
 * @constructor
 */
function VotingEnablingSubscriber(animationService, locationService) {

    /**
     * Tells whether subscriber subscribes to an event.
     *
     * @param event Event to be handled
     *
     * @return {boolean}
     */
    var isSubscribedTo = function (event) {
        return event instanceof PreviousVideoPlaybackStarted;
    };

    /**
     * Handles given event
     *
     * @param event Event to be handled
     */
    var handle = function (event) {
        animationService.enableVoting();
        locationService.path('/play/' + event.videoId, false);
    };

    return {
        isSubscribedTo: isSubscribedTo,
        handle: handle
    };
}


/**
 * Voting disabling subscriber.
 *
 * @param animationService Provides animations for voting.
 *
 * @constructor
 */
function VotingDisablingSubscriber(animationService) {

    /**
     * Tells wheter subsciber subscribes to an event.
     *
     * @param event
     *
     * @return {boolean}
     */
    var isSubscribedTo = function (event) {
        return event instanceof VoteCastEvent;
    };

    /**
     * Handles given event
     *
     * @param event
     */
    var handle = function () {
        animationService.disableVoting();
    };

    return {
        isSubscribedTo: isSubscribedTo,
        handle: handle
    };
}
