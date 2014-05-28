'use strict';

angular.module('dobraFaza')
    .controller('AdminController', ['$scope', 'videoRepository', function ($scope, videoRepository) {
        $scope.video = {
            url: ''
        };
        $scope.videoRepository = videoRepository;
    }]);
