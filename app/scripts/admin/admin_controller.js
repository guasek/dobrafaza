'use strict';

angular.module('dobraFaza')
    .controller('AdminController', ['$scope', '$window', 'videoRepository', function ($scope, $window, videoRepository) {
        $scope.video = {
            title: '',
            url: '',
            addedVideoId: ''
        };
        $scope.videoRepository = videoRepository;
        $scope.baseUrl = $window.location.host;
    }]);