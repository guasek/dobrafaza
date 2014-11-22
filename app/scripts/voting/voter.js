/* global VoteCastEvent */
'use strict';

angular
    .module('voting')
    .factory('voter', ['$http', 'eventPublisher', 'votingDisablingSubscriber',
        function ($http, eventPublisher, votingDisablingSubscriber) {
            eventPublisher.subscribe(votingDisablingSubscriber);

            /**
             * Casts vote up on a given movie.
             *
             * @param video Video for the vote to be cast
             */
            var voteUp = function(video) {
                $http.post(
                    '/api/videos/' + video.videoId + '/votes',
                    {voteValue: 1}
                );
                eventPublisher.publish(new VoteCastEvent(video.videoId, 1));
            };

            /**
             * Casts vote down on a given movie.
             *
             * @param video Video for the vote to be cast
             */
            var voteDown = function(video) {
                $http.post(
                    '/api/videos/' + video.videoId + '/votes',
                    {voteValue: -1}
                );
                eventPublisher.publish(new VoteCastEvent(video.videoId, -1));
            };

            return {
                voteUp: voteUp,
                voteDown: voteDown
            };
        }
]);