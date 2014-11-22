'use strict';

describe('Tests for event dispatcher', function () {

    // load the controller's module
    beforeEach(module('dobraFaza'));

    it('Should be able subscribe to and publish events', function () {
        function FirstEvent() {};

        function SecondEvent() {};

        function FirstSubscriber() {
            return {
                handle: function (event) {},
                isSubscribedTo: function (event) {
                    return event instanceof FirstEvent;
                }
            }
        };

        function SecondSubscriber() {
            return {
                handle: function (event) {},
                isSubscribedTo: function (event) {
                    return event instanceof FirstEvent;
                }
            }
        };

        function ThirdSubscriber() {
            return {
                handle: function (event) {},
                isSubscribedTo: function (event) {
                    return event instanceof SecondEvent;
                }
            }
        };


        var firstSubscriber = new FirstSubscriber();
        var secondSubscriber = new SecondSubscriber();
        var thirdSubscriber = new ThirdSubscriber();
        var firstEvent = new FirstEvent();
        var secondEvent = new SecondEvent();

        spyOn(firstSubscriber, 'handle');
        spyOn(secondSubscriber, 'handle');
        spyOn(thirdSubscriber, 'handle');

        var eventPublisher = new EventPublisher();

        eventPublisher.subscribe(firstSubscriber);
        eventPublisher.subscribe(secondSubscriber);
        eventPublisher.subscribe(thirdSubscriber);

        eventPublisher.publish(firstEvent);

        expect(firstSubscriber.handle).toHaveBeenCalledWith(firstEvent);
        expect(secondSubscriber.handle).toHaveBeenCalledWith(firstEvent);

        eventPublisher.publish(secondEvent);

        expect(thirdSubscriber.handle).toHaveBeenCalledWith(secondEvent);
    });
});