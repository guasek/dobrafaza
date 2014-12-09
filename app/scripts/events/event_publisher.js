'use strict';

/**
 * Event dispatcher responsible for implementing pubsub in app.
 *
 * @param dispatcherImplementation Library responsible for actual implementation of pubsub.
 *
 * @constructor
 */
function EventPublisher() {
    this.subscribers = [];
}

/**
 * Dispatches an event.
 *
 * @param event
 */
EventPublisher.prototype.publish = function(event) {
    for(var index = 0; index < this.subscribers.length; index++) {
        var subscriber = this.subscribers[index];
        if (subscriber.isSubscribedTo(event)) {
            subscriber.handle(event);
        }
    }
};

/**
 * Uses following user subscriber.
 *
 * @param eventSubscriber
 */
EventPublisher.prototype.subscribe = function(eventSubscriber) {
    this.subscribers.push(eventSubscriber);
};

angular
    .module('EventPublisher', [])
    .factory('eventPublisher', [function() { return new EventPublisher(); } ]);
