'use strict';

angular.module('voting', [])
    .controller('VotingController',
        [
            '$scope',
            'voter',
            function ($scope, voter) {
                $scope.voter = voter;
            }
        ]
    );
