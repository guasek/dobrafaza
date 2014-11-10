angular
    .module('voting')
    .factory('voter', ['$http', function ($http) {
        'use strict';

        var voteUp = function(video) {
            $http.post(
                '/api/videos/' + video.videoId + '/votes',
                {voteValue: 1}
            );
        };

        var voteDown = function(video) {
            $http.post(
                '/api/videos/' + video.videoId + '/votes',
                {voteValue: -1}
            );
        };

        return {
            voteUp: voteUp,
            voteDown: voteDown
        };
    }]);